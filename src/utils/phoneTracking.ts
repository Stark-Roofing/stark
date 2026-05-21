/**
 * Global phone-click tracking.
 *
 * Listens for clicks on any <a href="tel:..."> in the document and fires:
 *   1. Meta Pixel "Contact" via GTM Custom HTML (browser, with Advanced Matching).
 *      Pushed to dataLayer here; GTM custom-event trigger handles the fbq call.
 *   2. Meta CAPI "Contact" server-to-server via Vant Worker (same event_id →
 *      Meta dedupes against the Pixel hit).
 *
 * Google Ads conversion + GA4 phone_click event are handled by GTM tags ("Conv -
 * Phone Click" + "GA4 - Phone Click") on the Phone Clicks trigger — not duplicated
 * here.
 *
 * Idempotent — calling initPhoneTracking() multiple times only attaches once.
 */
import {
  getOrCreateExternalId,
  getFbp,
  getFbc,
  getStoredPII,
  postContactToCapiWorker,
} from './metaTracking';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const PHONE_LEAD_VALUE = 100;

let attached = false;
let currentHandler: ((e: Event) => void) | null = null;

export function initPhoneTracking(): () => void {
  if (typeof document === 'undefined' || attached) return () => {};
  attached = true;

  const handler = (e: Event) => {
    const target = e.target as Element | null;
    if (!target) return;
    const link = target.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
    if (!link) return;

    try {
      const eventId = (crypto as Crypto).randomUUID();
      const externalId = getOrCreateExternalId();
      const fbp = getFbp();
      const fbc = getFbc();
      // If the visitor previously submitted a form, reuse that PII to lift EMQ
      // on this Contact (otherwise it's fully anonymous beyond IP + UA + ext_id).
      const pii = getStoredPII();

      // 1) Push to dataLayer — GTM Custom Event trigger ("phone_click") can
      // fire fbq Contact with same event_id for Pixel/CAPI dedup. Advanced
      // Matching params (am_*) are auto-hashed by the Pixel.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'phone_click',
        event_id: eventId,
        am_external_id: externalId,
        am_em: pii.email,
        am_ph: pii.phone,
        am_fn: pii.first_name,
        am_ln: pii.last_name,
        am_zp: pii.zip,
        am_country: 'us',
        phone_number: link.getAttribute('href'),
      });

      // 2) CAPI server-side Contact event — same event_id as Pixel.
      postContactToCapiWorker({
        event_id: eventId,
        event_source_url: window.location.href,
        external_id: externalId,
        value: PHONE_LEAD_VALUE,
        currency: 'USD',
        content_name: 'Phone Click',
        content_category: 'phone_call',
        country: 'us',
        fbp,
        fbc,
        email: pii.email,
        phone: pii.phone,
        first_name: pii.first_name,
        last_name: pii.last_name,
        zip: pii.zip,
      });
    } catch (err) {
      console.warn('Phone tracking error:', err);
    }
  };

  currentHandler = handler;
  document.addEventListener('click', handler, { capture: true });

  return () => {
    if (currentHandler) {
      document.removeEventListener('click', currentHandler, { capture: true });
    }
    currentHandler = null;
    attached = false;
  };
}
