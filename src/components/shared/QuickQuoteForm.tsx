import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Home,
  Wrench,
  CloudLightning,
  Sun,
  Layers,
  HelpCircle,
  ArrowLeft,
  Check,
  Shield,
  Calendar as CalendarIcon,
  Clock,
} from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { sendLeadEmailAndSms, sendCustomerConfirmation } from '@/utils/emailjs';
import { submitBooking, fetchBusySlots, type BusySlot } from '@/utils/bookingBackend';

const SERVICES = [
  { value: 'roof-replacement', label: 'Roof Replacement', icon: Home, sub: 'Full re-roof — 25 to 50 yr warranty' },
  { value: 'roof-repair', label: 'Roof Repair', icon: Wrench, sub: 'Leaks, missing shingles, flashing' },
  { value: 'storm-damage', label: 'Storm Damage / Insurance', icon: CloudLightning, sub: "We deal with your insurance for you" },
  { value: 'skylight', label: 'Skylight Install or Replace', icon: Sun, sub: 'VELUX certified — no leaks guaranteed' },
  { value: 'gutters-siding', label: 'Gutters / Siding / Windows', icon: Layers, sub: 'James Hardie & Andersen certified' },
  { value: 'inspection', label: "Not Sure — Free Inspection", icon: HelpCircle, sub: "We'll come look, no pressure" },
] as const;

// Available appointment slots. Anything outside this range simply doesn't
// appear, which is what makes earlier hours look "already booked".
// - Mon–Fri: 10am–5pm (8 one-hour slots, last appointment ends at 6pm)
// - Saturday: 10am–3pm only (anything after 3pm = customer must call)
// - Sunday: blocked entirely (customer must call)
const ALL_TIME_SLOTS = [
  { value: '10:00 AM', label: '10:00 AM', hour: 10 },
  { value: '11:00 AM', label: '11:00 AM', hour: 11 },
  { value: '12:00 PM', label: '12:00 PM', hour: 12 },
  { value: '1:00 PM', label: '1:00 PM', hour: 13 },
  { value: '2:00 PM', label: '2:00 PM', hour: 14 },
  { value: '3:00 PM', label: '3:00 PM', hour: 15 },
  { value: '4:00 PM', label: '4:00 PM', hour: 16 },
  { value: '5:00 PM', label: '5:00 PM', hour: 17 },
] as const;

// Saturday cap: last bookable slot is 3:00 PM. After that, customer calls.
const SATURDAY_LAST_HOUR = 15;

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function getSlotsForDate(date: Date | undefined) {
  if (!date) return ALL_TIME_SLOTS;
  // Saturday = 6
  if (date.getDay() === 6) {
    return ALL_TIME_SLOTS.filter((s) => s.hour <= SATURDAY_LAST_HOUR);
  }
  return ALL_TIME_SLOTS;
}

const phoneRegex = /^[\d\s()+\-.]{10,}$/;

// Auto-format US phone as (206) 555-1234 while user types.
function formatPhoneInput(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const schema = z.object({
  service: z.string().min(1, { message: 'Pick a service to continue' }),
  // Service-specific extras (all optional at the schema level — UI shows them conditionally)
  skylightCount: z.string().optional(),
  skylightType: z.string().optional(), // 'replace' | 'new'
  insuranceClaimStatus: z.string().optional(), // 'filed' | 'not-filed' | 'need-help'
  street: z.string().min(3, { message: "What's the street address?" }),
  city: z.string().min(2, { message: 'Which city?' }),
  zip: z.string().min(5, { message: 'A 5-digit ZIP, please' }),
  appointmentDate: z.date({ required_error: 'Pick a day that works' }),
  appointmentTime: z.string().min(1, { message: 'Pick a time slot' }),
  name: z.string().min(2, { message: 'Your full name' }),
  phone: z.string().regex(phoneRegex, { message: 'A 10-digit phone number' }),
  email: z.string().email({ message: 'A valid email so we can confirm' }),
  okToText: z.boolean().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface QuickQuoteFormProps {
  /** Pre-select a service (e.g. "skylight" when opened from the Skylights page) */
  defaultService?: string;
  /** Called after a successful submission so the parent can close the modal */
  onSuccess?: () => void;
}

const QuickQuoteForm: React.FC<QuickQuoteFormProps> = ({ defaultService, onSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  // Slots already booked on Brenda's Google Calendar — fetched once when the
  // user reaches the schedule step. Falls back to empty (= all slots free)
  // if no backend is configured.
  const [busySlots, setBusySlots] = useState<BusySlot[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      service: defaultService || '',
      skylightCount: '',
      skylightType: '',
      insuranceClaimStatus: '',
      street: '',
      city: '',
      zip: '',
      appointmentDate: undefined,
      appointmentTime: '',
      name: '',
      phone: '',
      email: '',
      okToText: true,
      message: '',
    },
  });

  const watchedService = form.watch('service');
  const watchedDate = form.watch('appointmentDate');
  const watchedStreet = form.watch('street');
  const watchedCity = form.watch('city');
  const watchedZip = form.watch('zip');
  const watchedTime = form.watch('appointmentTime');

  // Per-step field lists for partial validation
  const stepFields: Record<number, (keyof FormValues)[]> = {
    1: ['service'],
    2: ['street', 'city', 'zip'],
    3: ['appointmentDate', 'appointmentTime'],
    4: ['name', 'phone', 'email'],
  };

  const TOTAL_STEPS = 4;

  const goNext = async () => {
    const valid = await form.trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  // ── AUTO-ADVANCE — no "Next" button needed ──
  // Step 1: when the user picks a service, jump to step 2 (short delay so they
  // see the red highlight first).
  // Step 3: when the user picks a time slot, jump to step 4.
  // We track the *value that triggered* the last auto-advance so going Back
  // and looking around doesn't immediately bounce them forward again — only a
  // *new* selection will advance.
  const lastAdvancedService = useRef<string | null>(null);
  const lastAdvancedTime = useRef<string | null>(null);

  useEffect(() => {
    if (step !== 1) return;
    if (!watchedService) return;
    if (lastAdvancedService.current === watchedService) return;
    lastAdvancedService.current = watchedService;
    const t = setTimeout(() => setStep(2), 280);
    return () => clearTimeout(t);
  }, [step, watchedService]);

  useEffect(() => {
    if (step !== 3) return;
    if (!watchedDate || !watchedTime) return;
    const key = `${watchedDate?.toISOString()}|${watchedTime}`;
    if (lastAdvancedTime.current === key) return;
    lastAdvancedTime.current = key;
    const t = setTimeout(() => setStep(4), 280);
    return () => clearTimeout(t);
  }, [step, watchedDate, watchedTime]);

  // Step 2 has 3 text fields, so it can't auto-advance on a single click.
  // Instead, when all 3 address fields are clearly valid (street ≥ 3, city ≥ 2,
  // zip = 5 digits), surface a single big "Continue" button at the bottom of
  // step 2 — it's not a "Next" button in the wizard footer, it's a CTA.
  const step2Valid =
    (watchedStreet || '').trim().length >= 3 &&
    (watchedCity || '').trim().length >= 2 &&
    /^\d{5}$/.test((watchedZip || '').trim());

  // ── Fetch already-booked slots from Google Calendar when the user reaches
  // the schedule step. Single fetch per form lifecycle. If the backend isn't
  // configured yet (APPS_SCRIPT_URL empty), this just returns []. ──
  const busyFetched = useRef(false);
  useEffect(() => {
    if (step !== 3) return;
    if (busyFetched.current) return;
    busyFetched.current = true;
    fetchBusySlots(21).then((slots) => setBusySlots(slots));
  }, [step]);

  // Helper: is this date+time slot already booked on the calendar?
  const isSlotBusy = (date: Date | undefined, timeLabel: string) => {
    if (!date || busySlots.length === 0) return false;
    const ymd = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
    return busySlots.some((s) => s.date === ymd && s.time === timeLabel);
  };

  // Disable past dates, today (no same-day bookings), and Sundays
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    if (checkDate <= today) return true; // past + today
    if (date.getDay() === 0) return true; // Sunday
    return false;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const serviceLabel = SERVICES.find((s) => s.value === values.service)?.label || values.service;

      // Compose extra context into the message field so it lands in the email/SMS
      const extras: string[] = [];
      if (values.service === 'skylight') {
        if (values.skylightCount) extras.push(`Skylights: ${values.skylightCount}`);
        if (values.skylightType) extras.push(`Type: ${values.skylightType}`);
      }
      if (values.service === 'storm-damage' && values.insuranceClaimStatus) {
        extras.push(`Insurance claim: ${values.insuranceClaimStatus}`);
      }
      if (values.okToText) extras.push('OK to text');
      if (values.message) extras.push(`Notes: ${values.message}`);

      const appointmentDateStr = values.appointmentDate
        ? format(values.appointmentDate, 'EEEE, MMM d, yyyy')
        : '';

      const sharedPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: serviceLabel,
        street: values.street,
        city: values.city,
        zip: values.zip,
        appointmentDate: appointmentDateStr,
        appointmentTime: values.appointmentTime,
        message: extras.join(' | '),
        source: window.location.pathname,
      };

      // ── 1. Try the calendar backend FIRST so we can detect a double booking ──
      // and refuse to submit if the slot is already taken.
      const bookingResult = await submitBooking({
        ...sharedPayload,
        appointmentDate: values.appointmentDate
          ? values.appointmentDate.toISOString()
          : appointmentDateStr,
      });

      if (bookingResult.conflict) {
        toast.error('That time slot was just booked by someone else — please pick another.');
        // Bounce them back to the schedule step and clear the time
        form.setValue('appointmentTime', '');
        // Refresh busy list so the slot disappears immediately
        fetchBusySlots(21).then(setBusySlots);
        setStep(3);
        return;
      }

      // ── 2. Send the office lead alert (email + Brenda's SMS) — must succeed ──
      await sendLeadEmailAndSms(sharedPayload);

      // ── 3. Send the customer their friendly confirmation email — best-effort ──
      try {
        await sendCustomerConfirmation(sharedPayload);
      } catch (custErr) {
        console.warn(
          'Customer confirmation email failed (lead still saved):',
          custErr,
        );
      }

      setSubmitted(true);
      toast.success("Got it! We'll reach out shortly.");

      // Same event_id flows to /thank-you so its Pixel push + CAPI fire share
      // it (Meta dedupes by event_id). Without this, the two arms generated
      // separate IDs and dedup coverage collapsed.
      const eventId = (crypto as Crypto).randomUUID();

      // Close any parent modal first, then navigate to the dedicated
      // /thank-you landing page (with the appointment details in router state).
      onSuccess?.();
      navigate('/thank-you', {
        state: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: serviceLabel,
          street: values.street,
          city: values.city,
          zip: values.zip,
          appointmentDate: appointmentDateStr,
          appointmentTime: values.appointmentTime,
          event_id: eventId,
        },
      });
    } catch (err) {
      console.error('QuickQuoteForm submission error:', err);
      toast.error('Something went wrong. Please call (206) 739-8232 or try again.');
    }
  };

  // ============ SUCCESS STATE ============
  if (submitted) {
    const apptDate = form.getValues('appointmentDate');
    const apptTime = form.getValues('appointmentTime');
    const apptStr = apptDate ? `${format(apptDate, 'EEEE, MMM d')} at ${apptTime}` : '';
    return (
      <div className="flex flex-col items-center text-center py-10 px-6">
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <Check size={40} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-2">You're booked!</h3>
        <p className="text-charcoal/80 mb-1">
          Thanks {form.getValues('name').split(' ')[0]} — we got your request.
        </p>
        {apptStr && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 my-4">
            <p className="text-xs uppercase tracking-wide text-amber-800 font-semibold mb-1">Your appointment</p>
            <p className="text-navy font-semibold">{apptStr}</p>
          </div>
        )}
        <p className="text-charcoal/80 mb-6">
          We'll text you to confirm shortly. If anything changes, just reply to the text.
        </p>
        <p className="text-sm text-charcoal/60">
          Need us sooner? Call <a href="tel:+12067398232" className="text-stark-red font-semibold">(206) 739-8232</a>
        </p>
      </div>
    );
  }

  // ============ FORM ============
  // Note: layout uses natural content height (no h-full / flex-1) so the
  // form works in BOTH the modal context AND when rendered inline inside
  // QuickQuoteSection. Modal scrolling is handled by DialogContent itself.
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        {/* Persistent reassurance strip — shown on every step */}
        <div className="flex items-center justify-center gap-3 px-6 pt-3 pb-1 text-[11px] text-charcoal/70 font-medium flex-wrap">
          <span className="flex items-center gap-1"><Check size={12} className="text-green-600" /> 100% Free</span>
          <span className="text-charcoal/30">•</span>
          <span className="flex items-center gap-1"><Check size={12} className="text-green-600" /> No obligation</span>
          <span className="text-charcoal/30">•</span>
          <span className="flex items-center gap-1"><Check size={12} className="text-green-600" /> Same-week openings</span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 px-6 pt-2 pb-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === step ? 'w-8 bg-stark-red' : n < step ? 'w-6 bg-stark-red/50' : 'w-6 bg-gray-200'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-charcoal/60 font-medium">Step {step} of {TOTAL_STEPS}</span>
        </div>

        <div className="px-6 pb-4">
          {/* ============ STEP 1: SERVICE ============ */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">What do you need?</h3>
                <p className="text-sm text-charcoal/70">Pick the closest match — we'll figure out the rest on the call.</p>
              </div>
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 gap-2">
                      {SERVICES.map(({ value, label, icon: Icon, sub }) => {
                        const selected = field.value === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => field.onChange(value)}
                            className={`flex items-center gap-3 text-left p-4 rounded-lg border-2 transition-all ${
                              selected
                                ? 'border-stark-red bg-stark-red/5'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-md ${
                                selected ? 'bg-stark-red text-white' : 'bg-gray-100 text-charcoal/70'
                              }`}
                            >
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-navy text-sm">{label}</div>
                              <div className="text-xs text-charcoal/60 truncate">{sub}</div>
                            </div>
                            {selected && <Check size={18} className="text-stark-red flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* ============ STEP 2: ADDRESS + SERVICE EXTRAS ============ */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">Where's the property?</h3>
                <p className="text-sm text-charcoal/70">We serve King, Snohomish, and Pierce counties.</p>
              </div>

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" autoComplete="street-address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Bellevue" autoComplete="address-level2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP</FormLabel>
                      <FormControl>
                        <Input placeholder="98004" inputMode="numeric" autoComplete="postal-code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service-aware extras */}
              {watchedService === 'skylight' && (
                <div className="space-y-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-xs font-semibold text-amber-900 uppercase tracking-wide">Skylight details</div>
                  <FormField
                    control={form.control}
                    name="skylightCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">How many skylights?</FormLabel>
                        <div className="flex gap-2 flex-wrap">
                          {['1', '2', '3', '4+'].map((n) => {
                            const selected = field.value === n;
                            return (
                              <button
                                key={n}
                                type="button"
                                onClick={() => field.onChange(n)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${
                                  selected ? 'border-stark-red bg-stark-red/5 text-stark-red' : 'border-gray-200 bg-white'
                                }`}
                              >
                                {n}
                              </button>
                            );
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skylightType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">New or replacement?</FormLabel>
                        <div className="flex gap-2">
                          {[
                            { v: 'new', l: 'New install' },
                            { v: 'replace', l: 'Replace existing' },
                            { v: 'unsure', l: 'Not sure' },
                          ].map(({ v, l }) => {
                            const selected = field.value === v;
                            return (
                              <button
                                key={v}
                                type="button"
                                onClick={() => field.onChange(v)}
                                className={`px-3 py-2 rounded-lg border-2 text-sm font-medium ${
                                  selected ? 'border-stark-red bg-stark-red/5 text-stark-red' : 'border-gray-200 bg-white'
                                }`}
                              >
                                {l}
                              </button>
                            );
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {watchedService === 'storm-damage' && (
                <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Insurance status</div>
                  <FormField
                    control={form.control}
                    name="insuranceClaimStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Have you filed a claim yet?</FormLabel>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            { v: 'filed', l: 'Yes, filed' },
                            { v: 'not-filed', l: 'Not yet' },
                            { v: 'need-help', l: 'I need help with it' },
                          ].map(({ v, l }) => {
                            const selected = field.value === v;
                            return (
                              <button
                                key={v}
                                type="button"
                                onClick={() => field.onChange(v)}
                                className={`px-3 py-2 rounded-lg border-2 text-sm font-medium ${
                                  selected ? 'border-stark-red bg-stark-red/5 text-stark-red' : 'border-gray-200 bg-white'
                                }`}
                              >
                                {l}
                              </button>
                            );
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          )}

          {/* ============ STEP 3: SCHEDULE ============ */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">Pick a day &amp; time</h3>
                <p className="text-sm text-charcoal/70">
                  About 30 minutes. We measure, take photos, and email you a written quote — no high-pressure pitch.
                </p>
              </div>

              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <CalendarIcon size={14} /> Choose a day
                    </FormLabel>
                    <div className="rounded-lg border bg-white p-2 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          // reset time when day changes
                          form.setValue('appointmentTime', '');
                        }}
                        disabled={disabledDays}
                        fromDate={new Date()}
                        className="pointer-events-auto"
                      />
                    </div>
                    <p className="text-[11px] text-charcoal/60 mt-1">
                      Mon–Fri until 6 PM · Sat until 4 PM · Sun by phone only
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchedDate && (
                <FormField
                  control={form.control}
                  name="appointmentTime"
                  render={({ field }) => {
                    const slots = getSlotsForDate(watchedDate);
                    const isSaturday = watchedDate.getDay() === 6;
                    return (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          <Clock size={14} /> Pick a time slot
                        </FormLabel>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {slots.map(({ value, label }) => {
                            const selected = field.value === value;
                            const busy = isSlotBusy(watchedDate, value);
                            return (
                              <button
                                key={value}
                                type="button"
                                disabled={busy}
                                onClick={() => !busy && field.onChange(value)}
                                title={busy ? 'Already booked — pick another time' : undefined}
                                className={`px-2 py-2 rounded-lg border-2 text-sm font-medium transition-all relative ${
                                  busy
                                    ? 'border-gray-200 bg-gray-100 text-gray-400 line-through cursor-not-allowed'
                                    : selected
                                    ? 'border-stark-red bg-stark-red/5 text-stark-red'
                                    : 'border-gray-200 bg-white text-charcoal/80 hover:border-gray-300'
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                        {busySlots.length > 0 && watchedDate &&
                         slots.every(({ value }) => isSlotBusy(watchedDate, value)) && (
                          <p className="text-[11px] text-amber-700 mt-1.5 bg-amber-50 border border-amber-200 rounded px-2 py-1.5">
                            All times are taken on this day. Please pick another day or call{' '}
                            <a href="tel:+12067398232" className="font-semibold underline">(206) 739-8232</a>
                          </p>
                        )}
                        {isSaturday ? (
                          <p className="text-[11px] text-amber-700 mt-1.5 bg-amber-50 border border-amber-200 rounded px-2 py-1.5">
                            <strong>Saturday:</strong> only morning slots online. For after 3 PM, please call{' '}
                            <a href="tel:+12067398232" className="font-semibold underline">(206) 739-8232</a>
                          </p>
                        ) : (
                          <p className="text-[11px] text-charcoal/60 mt-1">
                            Available 10:00 AM – 6:00 PM
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>
          )}

          {/* ============ STEP 4: CONTACT ============ */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">How do we reach you?</h3>
                <p className="text-sm text-charcoal/70">We'll text first — quicker than playing phone tag.</p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(206) 555-1234"
                        inputMode="tel"
                        autoComplete="tel"
                        {...field}
                        onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@email.com" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="okToText"
                render={({ field }) => (
                  <FormItem>
                    <label className="flex items-center gap-2 text-sm text-charcoal/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 rounded accent-stark-red"
                      />
                      OK to text me at this number
                    </label>
                  </FormItem>
                )}
              />

              <p className="text-[11px] text-charcoal/60 leading-snug">
                <Shield size={11} className="inline mr-1 -mt-0.5" />
                We never share or sell your info. Used only to confirm your appointment.
              </p>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-charcoal/70">Anything else? (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us anything that helps — gate code, photos to expect, etc."
                        className="min-h-[70px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* ── Step-2 inline Continue button (only when address is fully valid) ──
            Step 1 and 3 auto-advance on click, so they don't need a button.
            Step 4 has the final Submit button below. */}
        {step === 2 && (
          <div className="px-6 pb-4">
            <Button
              type="button"
              variant="stark-red"
              onClick={goNext}
              disabled={!step2Valid}
              className="w-full text-base py-6"
            >
              {step2Valid ? 'Continue to Pick a Time' : 'Fill in your address to continue'}
            </Button>
          </div>
        )}

        {/* ── Step-4 final submit button ── */}
        {step === 4 && (
          <div className="px-6 pb-4">
            <Button
              type="submit"
              variant="stark-red"
              className="w-full text-base py-6"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Confirm My Appointment'}
            </Button>
          </div>
        )}

        {/* ── Footer: small Back link + trust strip. No "Next" button anywhere. ── */}
        <div className="border-t bg-white px-6 py-3 space-y-2">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1 text-xs text-charcoal/60 hover:text-charcoal mx-auto"
            >
              <ArrowLeft size={12} /> Back
            </button>
          )}

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-3 text-[11px] text-charcoal/60 flex-wrap">
            <span className="flex items-center gap-1"><Shield size={12} /> Licensed WA</span>
            <span>•</span>
            <span>30+ Years</span>
            <span>•</span>
            <span>2,000+ Roofs</span>
            <span>•</span>
            <span>20-Yr Warranty</span>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default QuickQuoteForm;
