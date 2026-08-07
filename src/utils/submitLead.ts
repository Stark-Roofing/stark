/**
 * submitLead — single lead sink for every site form.
 *
 * Zapier is the source of truth: one Catch Hook webhook that fans out, inside
 * the Zap itself, to (a) Leap CRM and (b) an email notification to Brenda. This
 * replaced a dead GoHighLevel webhook (that CRM is no longer in use) and a
 * legacy EmailJS integration nobody had login access to — both were silently
 * failing with no way to diagnose or fix them from this codebase.
 *
 * Before the original version of this helper, 6 of the site's 8 forms posted
 * ONLY to EmailJS, so an EmailJS outage silently dropped those leads (and
 * showed the visitor an error). Routing every form through here guarantees
 * the Zapier webhook always receives the lead.
 */
import { getAttributionPayload } from './attribution';
import { trackLeadSubmission } from './tracking';

/** Human-readable lead source from a page path: "/" -> "Home Page", else the path. */
export function readableSource(path: string = window.location.pathname): string {
  const p = (path || '').trim();
  if (!p || p === '/') return 'Home Page';
  return p;
}

// Zapier Catch Hook — same trigger used by AdsLeadForm / QuickQuoteForm. The
// Zap itself fans this out to Leap CRM and an email notification to Brenda.
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/28190331/46f6oyc/';

/**
 * POST the lead to the Zapier Catch Hook. Returns true when the request was
 * delivered (no network error), false otherwise. Never throws.
 *
 * Content-Type is deliberately 'text/plain', NOT 'application/json': a real
 * application/json header forces the browser to send a CORS preflight
 * (OPTIONS) request first, and Zapier's Catch Hook doesn't allow the
 * Content-Type header in its preflight response — the browser blocks the
 * whole request before it's ever sent (confirmed live: leads silently never
 * reached Zapier despite this returning "success" client-side). text/plain
 * is a CORS-safelisted header, so the browser sends the POST directly with
 * no preflight, and Zapier parses the JSON body fine regardless of the
 * declared Content-Type. Same workaround already used in bookingBackend.ts
 * for the same reason against a different endpoint.
 */
export async function postLeadToZapier(payload: Record<string, string>): Promise<boolean> {
  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (err) {
    console.warn('Zapier webhook post failed:', err);
    return false;
  }
}

/**
 * Submit a lead from any form. Normalizes the common field-name variants
 * (fullName / zipCode / phoneNumber) so the Zap always receives consistent
 * name/email/phone/zip fields to map into Leap CRM and Brenda's email.
 *
 * Throws ONLY if the Zapier webhook itself could not be reached — i.e. the
 * lead truly did not land — so a caller's catch should show the "please call
 * us" fallback only in that genuine case.
 */
export async function submitLead(raw: Record<string, unknown>): Promise<void> {
  const s = (v: unknown) => (v == null ? '' : String(v));

  const payload: Record<string, string> = {
    // origin snapshot (SEO vs Ads vs GBP)
    ...getAttributionPayload(),
    // pass through anything the form already provided (stringified)
    ...Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, s(v)])),
    // normalize the canonical fields the Zap maps on
    name: s(raw.name ?? raw.fullName),
    email: s(raw.email),
    phone: s(raw.phone ?? raw.phoneNumber),
    zip: s(raw.zip ?? raw.zipCode),
    source: readableSource(s(raw.source) || window.location.pathname),
    landing_page: s(raw.landing_page) || window.location.pathname,
    submitted_at: s(raw.submitted_at) || new Date().toISOString(),
  };

  const ok = await postLeadToZapier(payload);

  // GA4 funnel-analytics event (NOT an ad conversion — those fire on
  // /thank-you). Fires regardless of the Zapier post's outcome so this
  // signal no longer depends on a third-party email service being up.
  trackLeadSubmission(payload.service);

  if (!ok) {
    throw new Error('Lead submission failed: Zapier webhook unreachable');
  }
}
