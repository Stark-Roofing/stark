/**
 * The internal lead-alert email + Google Fi SMS notification (formerly sent
 * from here via sendLeadEmailAndSms) has been replaced by the Zapier webhook
 * in src/utils/submitLead.ts, which fans out to Leap CRM and an email
 * notification to Brenda from inside the Zap itself. This file now only
 * handles the customer-facing "we got your request" auto-reply, which is
 * unrelated to that internal notification.
 */
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = 'ZRltQQTK2lkYAspj3';
const EMAILJS_SERVICE_ID = 'service_74bf6sl';

// ── Customer auto-reply ──
// Brenda already has this template set up in the EmailJS dashboard as
// "Customer Auto-Reply". It's the friendly "we got your request" email the
// customer receives. If the variable names below ever drift from what the
// template uses, the email still sends — the unmatched variables just stay
// blank in the rendered output.
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_7111g1d';

let initialized = false;

function ensureInit() {
  if (!initialized) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    initialized = true;
  }
}

// ============================================================================
// CUSTOMER CONFIRMATION EMAIL — sent TO the customer's inbox
// ----------------------------------------------------------------------------
// This is the friendly "we got your request" email the customer receives
// after submitting the booking form. It uses a separate EmailJS template
// (EMAILJS_CUSTOMER_TEMPLATE_ID) so its tone, branding, and "from" name
// can be customer-facing rather than internal.
//
// Variables consumed by the template:
//   {{to_email}}         — customer's email (set automatically below)
//   {{customer_name}}    — customer's first name (used for greeting)
//   {{customer_full}}    — customer's full name
//   {{service}}          — chosen service (e.g., "Roof Repair")
//   {{appointment_date}} — pretty date string
//   {{appointment_time}} — time slot string
//   {{address}}          — full street/city/zip
//   {{message}}          — the customer's optional notes
//   {{office_phone}}     — Brenda's office line
//   {{office_email}}     — Brenda's office inbox
//   {{owner_name}}       — "Brenda Scarllet"
//   {{logo_url}}         — absolute URL of the logo (works in any inbox)
//   {{mascot_url}}       — absolute URL of the mascot
//
// Best-effort: if the template doesn't exist yet (because Brenda hasn't
// created it in the EmailJS dashboard), the call fails silently and the
// rest of the form submission continues normally.
// ============================================================================
function buildCustomerParams(params: Record<string, string>) {
  const fullName = params.name || params.fullName || '';
  const firstName = fullName.trim().split(/\s+/)[0] || 'there';
  const dateStr = params.appointmentDate || params.appointment_date || '';
  const timeStr = params.appointmentTime || params.appointment_time || '';
  const fullAddress = [params.street, params.city, params.zip, params.zipCode, params.address]
    .filter(Boolean)
    .join(', ');
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'https://starkroofingrenovation.com';

  // We send a SUPERSET of variable names because we don't know exactly which
  // ones Brenda's "Customer Auto-Reply" template uses. Any unused vars are
  // simply ignored by EmailJS. This way the email renders correctly whether
  // her template references {{name}}, {{customer_name}}, {{from_name}}, etc.
  return {
    // Routing
    to_email: params.email || '',
    reply_to: 'office@starkroofingrenovation.com',

    // Customer name — every common variant
    name: fullName,
    full_name: fullName,
    customer_name: firstName,
    customer_full: fullName,
    first_name: firstName,
    from_name: fullName,

    // Service
    service: params.service || 'Free Inspection',

    // Appointment date — every common variant
    date: dateStr,
    time: timeStr,
    appointment: dateStr ? `${dateStr} at ${timeStr}` : '',
    appointment_date: dateStr || 'to be confirmed',
    appointment_time: timeStr || '',

    // Address
    address: fullAddress,
    street: params.street || '',
    city: params.city || '',
    zip: params.zip || params.zipCode || '',

    // Notes / message
    message: params.message || '',
    notes: params.message || '',

    // Office details
    phone: '(206) 739-8232',
    office_phone: '(206) 739-8232',
    office_email: 'office@starkroofingrenovation.com',
    company: 'Stark Roofing & Renovation',
    owner: 'Brenda Scarllet',
    owner_name: 'Brenda Scarllet',

    // Image URLs (absolute, work in any inbox)
    logo_url: `${origin}/stark-logo-rebrand.png`,
    mascot_url: `${origin}/stark_mascot.png`,
  };
}

export async function sendCustomerConfirmation(params: Record<string, string>) {
  if (!params.email) return null; // no inbox, nothing to send
  ensureInit();
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_CUSTOMER_TEMPLATE_ID,
    buildCustomerParams(params),
  );
}
