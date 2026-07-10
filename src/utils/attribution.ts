/**
 * attribution — first-touch source capture for GHL lead attribution.
 *
 * Answers "did this lead come from SEO, Google Ads, Meta, GBP or direct?" so
 * the GHL workflow can fill the contact's "Origem do Lead" field. Without this
 * every site-form lead lands in GHL with no origin at all — organic and paid
 * are indistinguishable in the CRM.
 *
 * How: on first page load we read the URL params + referrer, classify the
 * visit, and persist it in localStorage. Any later form submit (even days
 * later, on another page) sends that stored snapshot to the GHL webhook as
 * attr_* fields. First touch wins, with one exception: a NEW paid click id
 * (gclid/fbclid/msclkid) overwrites a stored organic touch — the ad platform
 * paid for that visit and the workflow needs the click id for offline
 * conversion uploads later.
 *
 * Safari/iOS caps script-writable storage at ~7 days without a site visit
 * (ITP), so on iPhone the memory is shorter — accepted limitation; a same-week
 * conversion (the roofing norm) is unaffected.
 */

const STORAGE_KEY = 'stark_attribution_v1';

export interface Attribution {
  /** Classified source: google-ads | meta-ads | gbp | bing-ads | seo | referral | direct | utm-other */
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  landing_page: string;
  first_seen: string;
}

const SEARCH_ENGINES = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./i;

/** classify() slug -> exact option label of the GHL "Origem do Lead" dropdown. */
const SOURCE_LABELS: Record<string, string> = {
  'google-ads': 'Google',
  'meta-ads': 'Meta',
  'bing-ads': 'Bing',
  gbp: 'GBP',
  seo: 'SEO',
  referral: 'Referral',
  direct: 'Direto',
  'utm-other': 'Outro',
};

function classify(p: URLSearchParams, referrer: string): string {
  const source = (p.get('utm_source') || '').toLowerCase();
  const medium = (p.get('utm_medium') || '').toLowerCase();

  if (p.get('gclid') || (source.includes('google') && /cpc|paid|ppc/.test(medium)))
    return 'google-ads';
  if (p.get('fbclid') || /facebook|instagram|^fb$|^meta$/.test(source)) return 'meta-ads';
  if (p.get('msclkid') || source.includes('bing')) return 'bing-ads';
  // GBP links carry our cross-client convention: ?utm_source=gbp&utm_medium=organic
  if (source === 'gbp') return 'gbp';
  if (source) return 'utm-other';

  let refHost = '';
  try {
    refHost = referrer ? new URL(referrer).hostname : '';
  } catch {
    /* malformed referrer — treat as none */
  }
  if (refHost && refHost.includes(window.location.hostname)) return 'direct'; // internal nav
  if (SEARCH_ENGINES.test(refHost)) return 'seo';
  if (refHost) return 'referral';
  return 'direct';
}

/**
 * Capture the visit's attribution once per session. Call before React mounts
 * (same pattern as initMetaTracking). Never throws — prerender/puppeteer and
 * storage-blocked browsers just skip silently (lead still submits, only the
 * attr_* fields arrive as 'direct'/empty).
 */
export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const hasPaidClick = !!(params.get('gclid') || params.get('fbclid') || params.get('msclkid'));

    const stored = localStorage.getItem(STORAGE_KEY);
    // First touch wins — except a fresh PAID click, which overwrites.
    if (stored && !hasPaidClick) return;

    const attr: Attribution = {
      source: classify(params, document.referrer || ''),
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      gclid: params.get('gclid') || '',
      fbclid: params.get('fbclid') || '',
      referrer: document.referrer || '',
      landing_page: window.location.pathname + window.location.search,
      first_seen: new Date().toISOString(),
    };
    // A stored paid touch is never downgraded by a later plain revisit.
    if (stored && hasPaidClick) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attr));
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attr));
  } catch {
    /* storage unavailable — attribution simply not captured */
  }
}

/**
 * Flat attr_* fields for the GHL webhook payload. Falls back to classifying
 * the current page on the fly if nothing was stored (e.g. storage blocked).
 */
export function getAttributionPayload(): Record<string, string> {
  let attr: Attribution | null = null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) attr = JSON.parse(stored) as Attribution;
  } catch {
    /* fall through to live classification */
  }
  if (!attr) {
    try {
      const params = new URLSearchParams(window.location.search);
      attr = {
        source: classify(params, document.referrer || ''),
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        gclid: params.get('gclid') || '',
        fbclid: params.get('fbclid') || '',
        referrer: document.referrer || '',
        landing_page: window.location.pathname,
        first_seen: new Date().toISOString(),
      };
    } catch {
      return {};
    }
  }
  return {
    attr_source: attr.source,
    // Same classification, but as the exact option labels of GHL's
    // "Origem do Lead" dropdown — lets the workflow map the field directly
    // in "Criar contato" with no If/Else branching.
    attr_source_label: SOURCE_LABELS[attr.source] || 'Outro',
    attr_utm_source: attr.utm_source,
    attr_utm_medium: attr.utm_medium,
    attr_utm_campaign: attr.utm_campaign,
    attr_gclid: attr.gclid,
    attr_fbclid: attr.fbclid,
    attr_referrer: attr.referrer,
    attr_landing_page: attr.landing_page,
    attr_first_seen: attr.first_seen,
  };
}
