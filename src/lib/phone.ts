/**
 * Phone helpers — US-aware formatting for form inputs.
 *
 * Why this exists: forms were formatting "+1 425 213 0784" as "(142) 521-3078"
 * because they were taking the first 10 digits without stripping the country
 * code "1". Centralize the parsing here so every form uses the same logic.
 */

/** Regex for zod validation — accepts common US phone characters. */
export const PHONE_REGEX = /^[\d\s()+\-.]{10,}$/;

/**
 * Format a raw phone string into "(XXX) XXX-XXXX".
 * Strips the US country code "1" if the user typed it (11 digits starting with 1).
 *
 * Examples:
 *   "+1 425 213 0784" → "(425) 213-0784"
 *   "14252130784"     → "(425) 213-0784"
 *   "425.213.0784"    → "(425) 213-0784"
 *   "4252130784"      → "(425) 213-0784"
 *   "425"             → "(425"
 *   ""                → ""
 */
export function formatPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, '');

  // Strip US country code if present (11 digits starting with "1")
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Strip all non-digit characters from a phone string.
 * Used when sending to CRMs / CAPI where E.164-ish digits are expected.
 *
 * Examples:
 *   "(425) 213-0784" → "4252130784"
 *   "+1 425 213 0784" → "4252130784" (country code stripped first)
 */
export function phoneDigitsOnly(formatted: string): string {
  let digits = formatted.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  return digits;
}
