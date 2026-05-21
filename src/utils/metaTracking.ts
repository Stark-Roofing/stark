/**
 * Meta tracking helpers — shared across AdsLeadForm, ThankYou page, and the
 * global phone-click tracker. Centralizes:
 *   - external_id generation + localStorage persistence
 *   - cookie helpers (_fbp / _fbc capture)
 *   - fbp / fbc polyfill (writes cookie ourselves if Pixel hasn't loaded yet
 *     so Pixel adopts our value when it does — solves the SPA timing race)
 *   - localStorage backup for fbp/fbc/PII (survives cookie expiration / clearing)
 *   - POSTs to the Vant tracking-edge Worker for CAPI Lead + Contact
 *
 * The browser Pixel still fires via GTM (with the same event_id pushed to
 * dataLayer). Meta dedupes Pixel ↔ CAPI by event_id.
 */

// Vant tracking-edge Worker — endpoints per Meta standard event.
const CAPI_BASE = 'https://vant-dash-tracking-edge.agencia-vant-ads.workers.dev/capi/stark';
const CAPI_SHARED_SECRET = 'ff6ccf9f26d4319b2369058a1536d854';

const EXT_ID_LS_KEY = 'stark_ext_id';
const FBP_LS_KEY = 'stark_fbp';
const FBC_LS_KEY = 'stark_fbc';
const PII_LS_KEY = 'stark_last_pii';
const NINETY_DAYS_SECS = 60 * 60 * 24 * 90;

export function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

function setCookie(name: string, value: string, maxAgeSecs: number): void {
  try {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSecs}; SameSite=Lax`;
  } catch {
    /* noop */
  }
}

function lsGet(key: string): string | undefined {
  try {
    return localStorage.getItem(key) || undefined;
  } catch {
    return undefined;
  }
}

function lsSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* noop */
  }
}

/** Persistent UUID per user (Meta external_id) — same value across all sessions
 *  of the same browser. Critical for EMQ — Meta cross-references the same user
 *  across Pixel + CAPI + sessions. */
export function getOrCreateExternalId(): string {
  try {
    let id = localStorage.getItem(EXT_ID_LS_KEY);
    if (!id) {
      id = (crypto as Crypto).randomUUID();
      localStorage.setItem(EXT_ID_LS_KEY, id);
    }
    return id;
  } catch {
    return (crypto as Crypto).randomUUID();
  }
}

/** Format Meta-compliant fbp cookie value: `fb.1.<ms>.<10-digit-random>`.
 *  Pixel adopts the cookie value if it exists when init runs — so writing
 *  this ourselves before Pixel loads gives both Pixel + CAPI the same value. */
function generateFbp(): string {
  const random = Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000;
  return `fb.1.${Date.now()}.${random}`;
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

/** Returns the _fbp value. Order: cookie → localStorage backup → newly generated.
 *  Always persists the resolved value back to both cookie + localStorage so
 *  every subsequent read (and the Pixel itself) agrees. */
export function getFbp(): string {
  let value = getCookie('_fbp') || lsGet(FBP_LS_KEY);
  if (!value) {
    value = generateFbp();
  }
  setCookie('_fbp', value, NINETY_DAYS_SECS);
  lsSet(FBP_LS_KEY, value);
  return value;
}

/** Returns the _fbc value if the user arrived via an ad (or once did and we
 *  persisted it). Order: cookie → localStorage backup → derive from fbclid URL.
 *  Returns undefined for organic visitors who never clicked an ad. */
export function getFbc(): string | undefined {
  const value = getCookie('_fbc') || lsGet(FBC_LS_KEY) || deriveFbcFromUrlIfMissing();
  if (!value) return undefined;
  setCookie('_fbc', value, NINETY_DAYS_SECS);
  lsSet(FBC_LS_KEY, value);
  return value;
}

/** Bootstrap call — run once on app mount BEFORE any tracking event can fire.
 *  Guarantees _fbp exists (so Pixel adopts ours) and captures fbclid into _fbc
 *  cookie + localStorage so subsequent SPA navigations don't lose attribution. */
export function initMetaTracking(): void {
  if (typeof document === 'undefined') return;
  getFbp();
  getFbc();
}

export type StoredPII = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  zip?: string;
};

/** Persist last form-submitted PII to localStorage. Subsequent tel: clicks
 *  from the same visitor reuse these in Contact CAPI for better EMQ — without
 *  it, a phone click is a fully anonymous event (only IP + UA + external_id). */
export function savePIIForReuse(pii: StoredPII): void {
  const clean: StoredPII = {};
  if (pii.email) clean.email = pii.email.trim().toLowerCase();
  if (pii.phone) clean.phone = pii.phone.replace(/\D/g, '');
  if (pii.first_name) clean.first_name = pii.first_name.trim().toLowerCase();
  if (pii.last_name) clean.last_name = pii.last_name.trim().toLowerCase();
  if (pii.zip) clean.zip = pii.zip.trim();
  lsSet(PII_LS_KEY, JSON.stringify(clean));
}

export function getStoredPII(): StoredPII {
  const raw = lsGet(PII_LS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as StoredPII;
  } catch {
    return {};
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
  value: number;
  currency: string;
  content_name: string;
  content_category: string;
  // Reuse PII from a previous form submit, if available, to lift EMQ on
  // otherwise-anonymous phone clicks. All optional — worker hashes server-side.
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  zip?: string;
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
