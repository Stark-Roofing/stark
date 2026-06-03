/**
 * QuickQuoteForm — site-wide lead capture (1 step, simple).
 *
 * Cloned from AdsLeadForm (the /ads paid LP form) to unify the conversion
 * experience across home, services, dialogs, and paid traffic. The old
 * multi-step (service → address → date/time → contact) caused ~80% drop-off
 * at the calendar step; Brenda follows up by phone to schedule.
 *
 * Submit flow:
 *   1. POST to GHL webhook (Vant CRM) — best-effort.
 *   2. CAPI Lead to Vant worker — best-effort, pre-navigate.
 *   3. sendLeadEmailAndSms — instant email + SMS to Brenda (must succeed).
 *   4. Customer confirmation email — best-effort.
 *   5. navigate('/thank-you') — fires Google Ads conversion + Meta Pixel
 *      Lead + UET form goal + GA4 generate_lead with the SAME event_id.
 */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sendLeadEmailAndSms, sendCustomerConfirmation } from '@/utils/emailjs';
import {
  getOrCreateExternalId,
  getFbp,
  getFbc,
  savePIIForReuse,
  postLeadToCapiWorker,
} from '@/utils/metaTracking';

const SERVICES = [
  { value: 'roof-replacement', label: 'Roof Replacement' },
  { value: 'roof-repair', label: 'Roof Repair' },
  { value: 'storm-damage', label: 'Storm / Hail Damage' },
  { value: 'gutters', label: 'Gutters' },
  { value: 'siding', label: 'Siding' },
  { value: 'skylight', label: 'Skylight' },
  { value: 'other', label: 'Other' },
];

import { formatPhoneInput, PHONE_REGEX as phoneRegex } from '@/lib/phone';

const schema = z.object({
  service: z.string().min(1, { message: 'Pick a service' }),
  name: z.string().min(2, { message: 'Your full name' }),
  phone: z.string().regex(phoneRegex, { message: '10-digit phone number' }),
  email: z.string().email({ message: 'A valid email' }),
  address: z.string().min(5, { message: 'Street address' }),
  zip: z.string().regex(/^\d{5}$/, { message: '5-digit ZIP code' }),
});

type FormValues = z.infer<typeof schema>;

interface QuickQuoteFormProps {
  defaultService?: string;
  /** Called right before /thank-you navigation. Used by QuickQuoteDialog to close the modal. */
  onSuccess?: () => void;
}

// Vant GHL webhook — receives leads, fires workflow (create contact + WhatsApp to Brenda).
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/Rc0vimjpYEKR7LCj48Qb/webhook-trigger/c03bd80e-513d-4215-b97a-ce820830ca67';

async function postToGhlWebhook(payload: Record<string, string>) {
  try {
    await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('GHL webhook post failed (non-blocking):', err);
  }
}

/** Lead value for Smart Bidding — match values used in src/utils/tracking.ts. */
function getLeadValue(service: string): number {
  const s = service.toLowerCase();
  if (s.includes('replacement')) return 150;
  if (s.includes('repair') || s.includes('leak')) return 75;
  if (s.includes('storm') || s.includes('commercial') || s.includes('tpo')) return 100;
  if (s.includes('gutter') || s.includes('siding') || s.includes('skylight')) return 80;
  return 100;
}

const QuickQuoteForm: React.FC<QuickQuoteFormProps> = ({ defaultService, onSuccess }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      service: defaultService || '',
      name: '',
      phone: '',
      email: '',
      address: '',
      zip: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const serviceLabel = SERVICES.find((s) => s.value === values.service)?.label || values.service;
      const leadValue = getLeadValue(serviceLabel);
      const eventId = (crypto as Crypto).randomUUID();
      const externalId = getOrCreateExternalId();
      const [firstName, ...rest] = values.name.trim().split(/\s+/);
      const lastName = rest.join(' ');

      savePIIForReuse({
        email: values.email,
        phone: values.phone,
        first_name: firstName,
        last_name: lastName,
        zip: values.zip,
      });

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: serviceLabel,
        address: values.address,
        zip: values.zip,
        source: window.location.pathname,
        landing_page: window.location.pathname,
        submitted_at: new Date().toISOString(),
      };

      (window as unknown as { dataLayer?: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'lead_form_submit',
        event_id: eventId,
        lead_value: leadValue,
        currency: 'USD',
        service: serviceLabel,
        am_em: values.email.trim().toLowerCase(),
        am_ph: values.phone.replace(/\D/g, ''),
        am_fn: firstName?.toLowerCase(),
        am_ln: lastName?.toLowerCase(),
        am_zp: values.zip,
        am_country: 'us',
        am_external_id: externalId,
      });

      postLeadToCapiWorker({
        event_id: eventId,
        event_source_url: window.location.href,
        external_id: externalId,
        email: values.email,
        phone: values.phone,
        first_name: firstName,
        last_name: lastName,
        zip: values.zip,
        value: leadValue,
        currency: 'USD',
        content_name: serviceLabel,
        content_category: 'organic',
        country: 'us',
        fbp: getFbp(),
        fbc: getFbc(),
      });

      postToGhlWebhook(payload);

      await sendLeadEmailAndSms(payload);

      try {
        await sendCustomerConfirmation(payload);
      } catch (custErr) {
        console.warn('Customer confirmation email failed (lead still saved):', custErr);
      }

      toast.success("Got it! We'll reach out shortly.");

      onSuccess?.();

      navigate('/thank-you', {
        state: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: serviceLabel,
          address: values.address,
          zip: values.zip,
          event_id: eventId,
        },
      });
    } catch (err) {
      console.error('Lead submission error:', err);
      toast.error('Something went wrong. Please call (206) 739-8232 — we answer right away.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-7">
      <div className="mb-5">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-navy mb-1">
          Get Your Free Quote
        </h3>
        <p className="text-sm text-charcoal/70">
          Same-day reply. No pressure, no obligation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-charcoal text-sm">What do you need?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-charcoal text-sm">Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Jane Smith" autoComplete="name" className="h-11" />
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
                <FormLabel className="text-charcoal text-sm">Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(206) 555-1234"
                    className="h-11"
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
                <FormLabel className="text-charcoal text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-charcoal text-sm">Street Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="street-address"
                    placeholder="123 Alder St"
                    className="h-11"
                  />
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
                <FormLabel className="text-charcoal text-sm">ZIP Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="98074"
                    maxLength={5}
                    className="h-11"
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-stark-red hover:bg-stark-red/90 text-white font-bold text-base mt-2"
          >
            {submitting ? 'Sending…' : 'Get My Free Quote'}
          </Button>

          <p className="text-[11px] text-charcoal/60 text-center pt-1">
            We'll call you within 24 hours. No spam, ever.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default QuickQuoteForm;
