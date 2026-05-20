/**
 * Meta tracking helpers — shared across AdsLeadForm, ThankYou page, and the
 * global phone-click tracker. Centralizes:
 *   - external_id generation + localStorage persistence
 *   - cookie helpers (_fbp / _fbc capture)
 *   - fbclid → _fbc polyfill (for SPA timing race against Pixel)
 *   - POSTs to the Vant tracking-edge Worker for CAPI Lead + Contact
 *
 * The browser Pixel still fires via GTM (with the same event_id pushed to
 * dataLayer). Meta dedupes Pixel ↔ CAPI by event_id.
 */

// Vant tracking-edge Worker — endpoints per Meta standard event.
const CAPI_BASE = 'https://vant-dash-tracking-edge.agencia-vant-ads.workers.dev/capi/stark';
const CAPI_SHARED_SECRET = 'ff6ccf9f26d4319b2369058a1536d854';

export function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** Persistent UUID per user (Meta external_id) — same value across all sessions
 *  of the same browser. Critical for EMQ — Meta cross-references the same user
 *  across Pixel + CAPI + sessions. */
export function getOrCreateExternalId(): string {
  const KEY = 'stark_ext_id';
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = (crypto as Crypto).randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return (crypto as Crypto).randomUUID();
  }
}

/** If user landed with ?fbclid=XXX and the Pixel hasn't set _fbc yet (SPA
 *  timing race), build it ourselves. Format per Meta CAPI spec:
 *  fb.<subdomain_index>.<creation_time>.<fbclid> */
export function deriveFbcFromUrlIfMissing(): string | undefined {
  const existing = getCookie('_fbc');
  if (existing) return existing;
  try {
    const url = new URL(window.location.href);
    const fbclid = url.searchParams.get('fbclid');
    if (!fbclid) return undefined;
    return `fb.1.${Date.now()}.${fbclid}`;
  } catch {
    return undefined;
  }
}

type CapiPayloadBase = {
  event_id: string;
  event_source_url: string;
  external_id: string;
  fbp?: string;
  fbc?: string;
  country: string;
};

type LeadPayload = CapiPayloadBase & {
  email: string;
  phone: string;
  first_name?: string;
  last_name?: string;
  zip: string;
  value: number;
  currency: string;
  content_name: string;
  content_category: string;
};

type ContactPayload = CapiPayloadBase & {
  // PII not available for phone clicks (cold visitor). external_id + fbp/fbc
  // are the main matching signals. Value approximates lead worth.
  value: number;
  currency: string;
  content_name: string;
  content_category: string;
};

async function postCapi(path: string, payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch(`${CAPI_BASE}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Capi-Secret': CAPI_SHARED_SECRET,
      },
      body: JSON.stringify(payload),
      // keepalive: critical for phone clicks (tel: links open the dialer app
      // and kill the JS context before the request completes). With keepalive,
      // the browser keeps the request in-flight even after the page unloads.
      keepalive: true,
    });
  } catch (err) {
    console.warn(`CAPI ${path} post failed (non-blocking):`, err);
  }
}

export async function postLeadToCapiWorker(payload: LeadPayload): Promise<void> {
  return postCapi('lead', payload);
}

export async function postContactToCapiWorker(payload: ContactPayload): Promise<void> {
  return postCapi('contact', payload);
}
