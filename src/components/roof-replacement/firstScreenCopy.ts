/**
 * /roof-replacement first-screen copy — ONE place to swap it.
 *
 * Source: Product Marketer, /workspace/marketing/stark/roof-replacement-first-screen.md
 * (rev 5, 2026-11-17; "take out lifetime ltd" 5:30 PM PT), with Thea's answers of Nov 17, 5:27 PM PT.
 * Headline, button and "30+ years" are FINAL (Thea, 5:31–5:33 PM PT).
 *
 * Every claim rendered here was checked against the repo / live site. Claims
 * that are NOT yet on the site are listed in PENDING_CLAIMS and are hidden
 * (`show: false`) until Thea confirms them.
 */

export const FIRST_SCREEN_COPY = {
  /** Headline — final (Thea picked it 2026-11-17, 5:31 PM PT). Two lines, second in red. */
  headlineLead: 'Sammamish & Eastside Roof Replacement:',
  headlineAccent: 'Your Last Roof, Done Right',

  /** Primary button (scrolls to the form) — final (Thea, 5:33 PM PT; the page's existing label). */
  primaryButton: 'Book My Free Estimate',
  underButton: "Free, no obligation. We'll get back to you within 24 hours.",

  phoneHref: 'tel:+12067398232',
  phoneDisplay: '(206) 739-8232',

  /** Form card text — one response promise only (within 24 hours). */
  formSubtitle: 'No pressure, no obligation.',
  formFootnote: "We'll get back to you within 24 hours. No spam, ever.",

  /**
   * Proof under the form. `{rating}` is filled from src/data/googleReviews.json
   * (the same data the homepage "x stars from N Google reviews" line uses; the
   * deploy workflow refreshes it from the Google Business Profile).
   */
  proofLine1: [
    'GAF Master Elite', // /roof-replacement body + Thea confirmed 2026-11-17
    '30+ years experience', // /roof-replacement hero strip "30+ Yrs"; Thea: keep (5:31 PM PT)
    '25-year labor warranty', // owner-confirmed, /warranty
    '{rating}', // live homepage: "5.0 stars from 57 Google reviews"
  ],
  proofLine2: [
    'Free drone inspections', // /roof-replacement AnswerFirstBlock, location pages
    'We speak English, Portuguese, and Spanish', // live /ads/: "Bilingual team (EN/PT/ES)"
  ],

  financingLine:
    'Finance through O Bee Credit Union: up to $75K, terms up to 120 months, rates from 8.24% APR*.',
  /** Verbatim from /finance (OBeePartnerSection). */
  financingNoPayments: 'No payments for the first 3 months (if requested prior to funding).',
  financingLinkLabel: 'See Our Options',
  financingHref: '/finance/',
  /** Verbatim from /finance — keep BOTH rates (8.24% and 4.24%). */
  financingFootnote:
    '* APR (Annual Percentage Rate) from 8.24% with no dealer fee; from 4.24% with a 6% dealer fee. Rates subject to change and credit approval. All loans are made by O Bee Credit Union.',
} as const;

/**
 * Needs Thea's confirmation before showing. Flip `show` to true only after
 * she confirms the claim in her own words.
 */
export const PENDING_CLAIMS = {
  womanOwned: { text: 'Woman-owned', line: 2, show: false },
} as const;
