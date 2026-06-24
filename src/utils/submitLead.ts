/**
 * submitLead — single lead sink for every site form.
 *
 * GHL is the reliable source of truth (the CRM that creates the contact, routes
 * it, and notifies Brenda). The legacy EmailJS alert runs on an account we do
 * NOT control and has gone down before, so it must never block a submission or
 * surface an error — if EmailJS is down the lead is already safe in GHL.
 *
 * Before this helper, 6 of the site's 8 forms posted ONLY to EmailJS, so an
 * EmailJS outage silently dropped those leads (and showed the visitor an error).
 * Routing every form through here guarantees the GHL webhook always receives the
 * lead and decouples the UX from EmailJS.
 */
import { sendLeadEmailAndSms } from './emailjs';

// Stark GHL inbound webhook — same trigger used by AdsLeadForm / QuickQuoteForm.
// Public endpoint; dedup + routing live in the GHL workflow.
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/Rc0vimjpYEKR7LCj48Qb/webhook-trigger/0b5885e6-4734-4d2b-8484-4f0e6ff3d4ff';

/**
 * POST the lead to the GHL workflow webhook. Returns true when the request was
 * delivered (no network error), false otherwise. Never throws.
 *
 * GHL responds with CORS (Access-Control-Allow-Origin: *), so we use the default
 * 'cors' mode — under 'no-cors' the browser downgrades Content-Type to
 * text/plain and GHL fails to parse the JSON, so the contact is never created.
 */
export async function postLeadToGhl(payload: Record<string, string>): Promise<boolean> {
  try {
    await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (err) {
    console.warn('GHL webhook post failed:', err);
    return false;
  }
}

/**
 * Submit a lead from any form. Normalizes the common field-name variants
 * (fullName / zipCode / phoneNumber) so the GHL workflow always receives
 * consistent name/email/phone/zip.
 *
 * Throws ONLY if the GHL webhook itself could not be reached — i.e. the lead
 * truly did not land — so a caller's catch should show the "please call us"
 * fallback only in that genuine case. EmailJS failures are swallowed.
 */
export async function submitLead(raw: Record<string, unknown>): Promise<void> {
  const s = (v: unknown) => (v == null ? '' : String(v));

  const payload: Record<string, string> = {
    // pass through anything the form already provided (stringified)
    ...Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, s(v)])),
    // normalize the canonical fields the GHL workflow maps on
    name: s(raw.name ?? raw.fullName),
    email: s(raw.email),
    phone: s(raw.phone ?? raw.phoneNumber),
    zip: s(raw.zip ?? raw.zipCode),
    source: s(raw.source) || window.location.pathname,
    landing_page: s(raw.landing_page) || window.location.pathname,
    submitted_at: s(raw.submitted_at) || new Date().toISOString(),
  };

  // Primary sink — the lead must land here.
  const ghlOk = await postLeadToGhl(payload);

  // Best-effort notification on a legacy account we don't control. Never blocks.
  try {
    await sendLeadEmailAndSms(payload);
  } catch (err) {
    console.warn('EmailJS lead alert failed (lead already in GHL):', err);
  }

  if (!ghlOk) {
    throw new Error('Lead submission failed: GHL webhook unreachable');
  }
}
