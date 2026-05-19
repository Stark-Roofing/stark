/**
 * AdsLeadForm — 1-step lead capture for the paid LP /ads.
 *
 * Trimmed-down version of QuickQuoteForm: collects only what's required to
 * follow up (service + name + phone + email + ZIP). No address, no calendar.
 * Brenda follows up by phone to schedule.
 *
 * Submit flow:
 *   1. POST to GHL webhook (Vant CRM) for routing/automation (best-effort).
 *   2. sendLeadEmailAndSms — instant email + SMS to Brenda.
 *   3. navigate('/thank-you') — fires all pixels (Lead, Phone Click, UET).
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

const SERVICES = [
  { value: 'roof-replacement', label: 'Roof Replacement' },
  { value: 'roof-repair', label: 'Roof Repair' },
  { value: 'storm-damage', label: 'Storm / Hail Damage' },
  { value: 'gutters', label: 'Gutters' },
  { value: 'siding', label: 'Siding' },
  { value: 'skylight', label: 'Skylight' },
  { value: 'other', label: 'Other' },
];

const phoneRegex = /^[\d\s()+\-.]{10,}$/;

function formatPhoneInput(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const schema = z.object({
  service: z.string().min(1, { message: 'Pick a service' }),
  name: z.string().min(2, { message: 'Your full name' }),
  phone: z.string().regex(phoneRegex, { message: '10-digit phone number' }),
  email: z.string().email({ message: 'A valid email' }),
  zip: z.string().regex(/^\d{5}$/, { message: '5-digit ZIP code' }),
});

type FormValues = z.infer<typeof schema>;

interface AdsLeadFormProps {
  defaultService?: string;
}

// Vant GHL webhook — receives leads, fires workflow (create contact + WhatsApp to Brenda).
// Public endpoint (anyone can POST) — dedup + spam mitigation lives in the GHL workflow.
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/Rc0vimjpYEKR7LCj48Qb/webhook-trigger/c03bd80e-513d-4215-b97a-ce820830ca67';

// Vant tracking-edge Worker — Meta Conversions API server-side proxy.
// Browser fires Pixel via GTM with the SAME event_id → Meta dedupes the two
// signals. The "secret" header is rate-limit/sanity surface, not a real key.
const CAPI_WORKER_URL = 'https://vant-dash-tracking-edge.agencia-vant-ads.workers.dev/capi/stark/lead';
const CAPI_SHARED_SECRET = 'ff6ccf9f26d4319b2369058a1536d854';

function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

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

async function postToCapiWorker(payload: {
  event_id: string;
  email: string;
  phone: string;
  first_name?: string;
  last_name?: string;
  zip: string;
  value: number;
  content_name: string;
}) {
  try {
    await fetch(CAPI_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Capi-Secret': CAPI_SHARED_SECRET,
      },
      body: JSON.stringify({
        ...payload,
        event_source_url: window.location.href,
        currency: 'USD',
        content_category: 'paid_ads',
        country: 'us',
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      }),
    });
  } catch (err) {
    console.warn('CAPI worker post failed (non-blocking):', err);
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

const AdsLeadForm: React.FC<AdsLeadFormProps> = ({ defaultService }) => {
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
      zip: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const serviceLabel = SERVICES.find((s) => s.value === values.service)?.label || values.service;
      const leadValue = getLeadValue(serviceLabel);
      // Same event_id used by the browser Pixel via dataLayer → Meta dedupes the
      // server-side CAPI hit against the Pixel one.
      const eventId = (crypto as Crypto).randomUUID();
      const [firstName, ...rest] = values.name.trim().split(/\s+/);
      const lastName = rest.join(' ');

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: serviceLabel,
        zip: values.zip,
        source: window.location.pathname,
        landing_page: '/ads',
        submitted_at: new Date().toISOString(),
      };

      // Push event_id to dataLayer so GTM Meta Pixel tag picks it up for dedup
      // with the CAPI hit below. (Pixel tag must reference dataLayer.event_id —
      // configure in GTM if not already.)
      (window as unknown as { dataLayer?: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'lead_form_submit',
        event_id: eventId,
        lead_value: leadValue,
        currency: 'USD',
        service: serviceLabel,
      });

      // Best-effort: Meta CAPI server-side via Vant worker. Same event_id as Pixel.
      postToCapiWorker({
        event_id: eventId,
        email: values.email,
        phone: values.phone,
        first_name: firstName,
        last_name: lastName,
        zip: values.zip,
        value: leadValue,
        content_name: serviceLabel,
      });

      // Best-effort GHL routing (Vant CRM + WhatsApp automation).
      postToGhlWebhook(payload);

      // Instant email + SMS to Brenda — must succeed for lead to land.
      await sendLeadEmailAndSms(payload);

      // Best-effort customer confirmation email.
      try {
        await sendCustomerConfirmation(payload);
      } catch (custErr) {
        console.warn('Customer confirmation email failed (lead still saved):', custErr);
      }

      toast.success("Got it! We'll reach out shortly.");

      // /thank-you fires Lead pixel + Google Ads conversion + UET form goal.
      navigate('/thank-you', {
        state: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: serviceLabel,
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

export default AdsLeadForm;
