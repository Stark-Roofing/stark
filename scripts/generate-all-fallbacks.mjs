#!/usr/bin/env node
/**
 * Safety net: ensure every URL in sitemap.xml has a matching static HTML file
 * in dist/ with SEO-quality content. Runs AFTER prerender.mjs.
 *
 * Pre-2026-05-09 behavior: generated minimal "shell" HTML with empty <body>
 *   → Googlebot saw <body> with only 90 chars of text (just GTM noscript).
 *   → SEO problem: search engines indexed metadata but no content.
 *
 * Post-2026-05-09 behavior:
 *   → Generates HTML with title, description, H1, schema, body text (~250+
 *     words) per route, mapped from URL_METADATA below.
 *   → Wraps the SEO content in <noscript> so it ONLY renders for crawlers
 *     and users with JS disabled. The React SPA hydrates inside #root for
 *     real users — no visible regression to UX.
 *   → Now also includes the homepage (/) since vite build alone produces a
 *     content-empty index.html.
 *   → For URLs already prerendered (Puppeteer succeeded), files are skipped
 *     intact. Only fills gaps.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const SITEMAP = resolve(ROOT, 'public', 'sitemap.xml');
const INDEX_HTML = resolve(DIST, 'index.html');

const log = (msg) => console.log(`[all-fallback] ${msg}`);

const BIZ = {
  name: 'Stark Roofing & Renovation',
  phone: '(206) 739-8232',
  phoneRaw: '12067398232',
  email: 'info@starkroofingrenovation.com',
  origin: 'https://starkroofingrenovation.com',
  cities: 'Sammamish, Bellevue, Redmond, Kirkland, Issaquah, Seattle, Eastside King County WA',
  diff: 'GAF Master Elite™ Certified Contractor (top 2% nationwide) · Golden Pledge® Warranty (50 years material, 25 years workmanship) · Bilingual team',
  defaultImage: 'https://starkroofingrenovation.com/og-share.png',
};

const URL_METADATA = {
  '/': {
    title: 'Stark Roofing & Renovation | Roofer Near Me | Seattle, Bellevue, Eastside WA',
    description: `Bilingual GAF Master Elite roofing contractor serving Seattle, Bellevue, Sammamish, Redmond, Kirkland & all of Puget Sound. Free estimates: ${BIZ.phone}.`,
    h1: 'Trusted Roofing Contractor for Seattle, Bellevue & the Eastside',
    intro: `${BIZ.name} is a bilingual, family-run roofing company serving the Puget Sound region from our Sammamish HQ. We are GAF Master Elite™ Certified — a recognition held by only the top 2% of contractors nationwide — and every roof we install qualifies for the GAF Golden Pledge® warranty (50 years material, 25 years workmanship). Our crews handle complete roof replacement, emergency repair, gutters, siding, skylights, and TPO commercial roofing.`,
    services: ['Roof Replacement', 'Roof Repair', 'Gutter Replacement', 'Siding Installation', 'Skylight Installation', 'Storm Damage Repair', 'TPO Commercial Roofing'],
  },
  '/services': {
    title: 'Roofing Services | Stark Roofing & Renovation Eastside WA',
    description: `Roof replacement, repair, gutters, siding, skylights, and commercial roofing across Seattle and the Eastside. Free quotes: ${BIZ.phone}.`,
    h1: 'Complete Roofing & Exterior Services for Eastside Homeowners',
    intro: `Whether you need a brand-new roof, an emergency leak fix after a Puget Sound storm, or premium gutters that stop the moss-soaking water from harming your fascia, our team handles it. Stark Roofing & Renovation is a single-source contractor for residential roofing, repair, gutters, siding, and skylight installation. We are GAF Master Elite™ Certified and Velux 5 Star Skylight Specialists.`,
    services: ['Roof Replacement', 'Roof Repair', 'Roof Cleaning', 'Gutter Replacement', 'Gutter Repair', 'Siding Installation', 'Skylight Installation', 'Storm Damage Repair', 'TPO Commercial Roofing', 'Window Replacement'],
  },
  '/about': {
    title: 'About Stark Roofing & Renovation | Bilingual GAF Master Elite Contractor',
    description: `Family-run, bilingual roofing contractor based in Sammamish WA. GAF Master Elite Certified. Serving Seattle & Eastside since 2018.`,
    h1: 'A Family Roofing Business Built on Quality, Trust, and Bilingual Service',
    intro: `Stark Roofing & Renovation was founded by Brenda S. Mendes, a Brazilian-American homeowner who saw a gap in the Puget Sound roofing market: too many contractors over-promising, under-delivering, and leaving homeowners with unanswered questions. We are bilingual (English + Spanish + Portuguese), GAF Master Elite™ Certified, and licensed in Washington State. Every quote is written, every crew is in-house, and every project comes with the GAF Golden Pledge® warranty.`,
    services: [],
  },
  '/contact': {
    title: 'Contact Stark Roofing | Free Roof Inspection Eastside WA',
    description: `Call ${BIZ.phone} for a free roof inspection. Serving Seattle, Bellevue, Sammamish, Redmond, Kirkland, Issaquah & all of the Eastside.`,
    h1: 'Schedule Your Free Roof Inspection',
    intro: `Call ${BIZ.phone} or fill out our short form to book a no-obligation, free inspection of your roof. We typically schedule within 48 hours and arrive in clearly marked trucks. Our team speaks English, Spanish, and Portuguese. Service area: ${BIZ.cities}.`,
    services: [],
  },
  '/finance': {
    title: 'Roof Financing | Stark Roofing & Renovation Seattle Eastside',
    description: `Affordable roof financing options through GreenSky and Hearth. Apply online — get an answer in minutes. Call ${BIZ.phone}.`,
    h1: 'Roof Financing Options for Eastside Homeowners',
    intro: `A new roof is a major investment, but it does not have to drain your savings. Stark Roofing & Renovation partners with GreenSky and Hearth to offer monthly payment plans for roof replacement, repair, and gutters. Apply online and get an answer in minutes — no impact to your credit score for the initial estimate.`,
    services: [],
  },
  '/warranty': {
    title: 'GAF Golden Pledge Warranty | Stark Roofing Master Elite',
    description: `Stark Roofing is GAF Master Elite™ Certified — the top 2% of contractors nationwide. Every roof qualifies for the 50-year Golden Pledge® warranty.`,
    h1: 'GAF Golden Pledge® — 50 Years Material, 25 Years Workmanship',
    intro: `As GAF Master Elite™ Certified Contractors (a designation held by only the top 2% of roofing contractors in the United States), Stark Roofing & Renovation is authorized to register every new roof we install for the Golden Pledge® warranty. This is the strongest warranty in the asphalt shingle industry — 50 years on materials and a non-prorated 25 years on workmanship.`,
    services: [],
  },
  '/roof-replacement': {
    title: 'Roof Replacement Seattle & Eastside WA | Stark Roofing',
    description: `Full roof replacement by GAF Master Elite™ contractors. Asphalt, metal, TPO. Free estimate: ${BIZ.phone}.`,
    h1: 'Roof Replacement for Seattle, Bellevue & the Eastside',
    intro: `When your roof reaches the end of its useful life, partial repairs only buy time. A full replacement by Stark Roofing & Renovation rebuilds the entire system — decking, underlayment, drip edge, ice & water shield, ridge venting, flashing, and shingles or panels. We install GAF asphalt systems, standing seam metal, and TPO for commercial. Every replacement qualifies for the Golden Pledge® warranty.`,
    services: [],
  },
  '/roof-repair': {
    title: 'Roof Repair Seattle Eastside | Emergency Leak Fix',
    description: `Same-day emergency roof repair. Storm damage, leaks, missing shingles. Bilingual crews. Call ${BIZ.phone}.`,
    h1: 'Emergency & Standard Roof Repair Across the Eastside',
    intro: `A leak does not wait for a convenient day. Stark Roofing & Renovation dispatches repair crews across the Eastside year-round, with emergency response after Puget Sound storm events. We handle missing shingles, flashing failures, valley repairs, vent boots, ice-dam damage, and skylight reseals. All repairs come with our 20-year workmanship guarantee.`,
    services: [],
  },
  '/storm-damage': {
    title: 'Storm Damage Roof Repair | Insurance Claims Eastside WA',
    description: `Wind & hail damage roof repair across Eastside WA. Insurance-claim experience. Bilingual support. Call ${BIZ.phone}.`,
    h1: 'Storm Damage Roof Repair & Insurance Claim Support',
    intro: `After every Puget Sound atmospheric river or windstorm, our phones light up. Stark Roofing & Renovation has handled hundreds of storm damage claims across King and Snohomish counties. We document the damage, provide certified repair estimates, and work directly with insurance adjusters. If your roof was damaged by wind, hail, or a fallen tree, call us before the next rain.`,
    services: [],
  },
};

function makeServicePageMeta(slug, name, description) {
  return {
    title: `${name} | Stark Roofing & Renovation Eastside WA`,
    description: description || `Professional ${name.toLowerCase()} by GAF Master Elite contractors. Free quote: ${BIZ.phone}.`,
    h1: `${name} for Seattle, Bellevue & the Eastside`,
    intro: `Stark Roofing & Renovation provides professional ${name.toLowerCase()} services across the Puget Sound region. As GAF Master Elite™ Certified contractors with bilingual crews, we combine technical expertise with clear communication. Every project comes with our 20-year workmanship guarantee.`,
    services: [],
  };
}

function makeCityPageMeta(slug, cityName) {
  return {
    title: `${cityName} Roofing Contractor | Stark Roofing & Renovation`,
    description: `Trusted roofing contractor for ${cityName}, WA homeowners. Roof replacement, repair, gutters, skylights. Free estimate: ${BIZ.phone}.`,
    h1: `Roofing Contractor for ${cityName}, Washington`,
    intro: `Stark Roofing & Renovation serves homeowners across ${cityName}, Washington with full-service roofing, repair, gutter installation, and skylight services. We are GAF Master Elite™ Certified — a designation held by only the top 2% of contractors nationwide — and bilingual. Service area also includes ${BIZ.cities}.`,
    services: [],
  };
}

function metadataForPath(pathname) {
  if (URL_METADATA[pathname]) return URL_METADATA[pathname];

  const serviceMap = {
    '/gutter-replacement': ['Gutter Replacement', 'Seamless aluminum gutter installation across Eastside WA. Bilingual crews. Free estimate: ' + BIZ.phone + '.'],
    '/gutter-repair': ['Gutter Repair', 'Sagging or leaking gutters? Stark Roofing repairs gutters across Eastside WA. Free estimate: ' + BIZ.phone + '.'],
    '/skylights': ['Skylight Installation', 'Velux 5 Star Skylight Specialists serving Eastside WA. Free quote: ' + BIZ.phone + '.'],
    '/skylights/velux-lineup': ['Velux Skylight Models', 'Browse the Velux skylight lineup — solar-powered, fixed, venting. Installed by Velux 5 Star specialists.'],
    '/siding-installation': ['Siding Installation', 'James Hardie, vinyl, and engineered wood siding installation across Eastside WA.'],
    '/commercial-roofing': ['Commercial Roofing', 'TPO, EPDM, and metal commercial roofing for Eastside businesses. Insured & licensed.'],
    '/roof-cleaning': ['Roof Cleaning', 'Soft-wash roof cleaning, moss treatment, and gutter cleaning across Eastside WA.'],
    '/window-replacement': ['Window Replacement', 'Energy-efficient window replacement for Eastside homes. Free quote: ' + BIZ.phone + '.'],
    '/tpo-roofing': ['TPO Commercial Roofing', 'TPO membrane installation for Eastside commercial buildings. Cost-effective and durable.'],
    '/metal-roofing': ['Metal Roofing', 'Standing seam and metal roof installation for Eastside homes. 50+ year lifespan.'],
    '/asphalt-shingles': ['Asphalt Shingle Roofing', 'GAF asphalt shingle systems by Master Elite contractors. Golden Pledge warranty included.'],
  };
  if (serviceMap[pathname]) {
    return makeServicePageMeta(pathname, ...serviceMap[pathname]);
  }

  const cityMatch = pathname.match(/^\/service-area\/([a-z-]+)\/?$/);
  if (cityMatch) {
    const slug = cityMatch[1];
    const cityName = slug.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');
    return makeCityPageMeta(slug, cityName);
  }

  if (pathname === '/blog') {
    return {
      title: 'Roofing Blog | Stark Roofing & Renovation',
      description: `Pacific Northwest roofing articles: cost guides, storm damage, materials, and seasonal maintenance for Eastside homeowners.`,
      h1: 'Roofing Articles for Eastside Homeowners',
      intro: `Practical guidance for Pacific Northwest homeowners — from understanding roof replacement cost in Bellevue to handling moss in Bridle Trails. Written by the Stark Roofing & Renovation team.`,
      services: [],
    };
  }
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    const titleized = slug.split('-').map(s => s[0]?.toUpperCase() + s.slice(1)).join(' ');
    return {
      title: `${titleized} | Stark Roofing & Renovation Blog`,
      description: `${titleized}: practical roofing guidance for Eastside Washington homeowners from Stark Roofing & Renovation.`,
      h1: titleized,
      intro: `This article from Stark Roofing & Renovation covers ${titleized.toLowerCase()} for Pacific Northwest homeowners. Our team is GAF Master Elite™ Certified and bilingual, serving the entire Eastside region.`,
      services: [],
    };
  }

  const shortCityMatch = pathname.match(/^\/([a-z-]+)\/?$/);
  if (shortCityMatch) {
    const knownCities = ['seattle', 'bellevue', 'redmond', 'kirkland', 'sammamish', 'issaquah',
                          'woodinville', 'renton', 'everett', 'lynnwood', 'bothell', 'tacoma', 'maple-valley'];
    if (knownCities.includes(shortCityMatch[1])) {
      const cityName = shortCityMatch[1].split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');
      return makeCityPageMeta(shortCityMatch[1], cityName);
    }
  }

  return {
    title: `${BIZ.name} | Roofer Near Me | Seattle Eastside`,
    description: `${BIZ.name} — GAF Master Elite roofing contractor serving Seattle, Bellevue & the Eastside. Free estimate: ${BIZ.phone}.`,
    h1: 'Stark Roofing & Renovation',
    intro: `${BIZ.name} provides full roofing services across the Puget Sound region. Call ${BIZ.phone} for a free estimate.`,
    services: [],
  };
}

function localBusinessSchema(canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: BIZ.name,
    url: canonical,
    telephone: BIZ.phone,
    email: BIZ.email,
    areaServed: BIZ.cities.split(', '),
    image: BIZ.defaultImage,
    description: 'Bilingual GAF Master Elite roofing contractor serving Seattle, Bellevue, Sammamish, Redmond, Kirkland & all of Puget Sound.',
    priceRange: '$$',
  };
}

// Extract CSS/JS asset references from the SPA shell.
// CRITICAL: includes <link rel="modulepreload"> tags Vite injects when build
// splits vendor chunks — without these, the entry script fails to resolve
// imports and the React app shows a blank screen.
// Also includes <link rel="preload"> (LCP hints for hero media) so perf wins
// from index.html survive into fallback-templated pages.
function getAssetTags() {
  const html = readFileSync(INDEX_HTML, 'utf8');
  const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map(m => m[0]);
  const modulePreloads = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]*>/g)].map(m => m[0]);
  const resourceHints = [...html.matchAll(/<link[^>]+rel="preload"[^>]*>/g)].map(m => m[0]);
  const scripts = [...html.matchAll(/<script[^>]+src="[^"]*"[^>]*><\/script>/g)].map(m => m[0]);
  return { cssLinks: [...cssLinks, ...modulePreloads, ...resourceHints], scripts };
}

function generatePageHtml(pathname, assets) {
  const meta = metadataForPath(pathname);
  const canonical = `${BIZ.origin}${pathname === '/' ? '' : pathname}`;
  const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const servicesList = meta.services && meta.services.length
    ? `<ul>${meta.services.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>`
    : '';

  const schema = localBusinessSchema(canonical);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="facebook-domain-verification" content="5fg2daaf5j2x14pgsyffs82z8x7wku" />
  <meta name="google-site-verification" content="IN4aCXSU5A4hMI1licThIVemS1rB0S7t404kw2Ppi4U" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${BIZ.defaultImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W69Q5BP8');</script>
  <!-- End Google Tag Manager -->
  ${assets.cssLinks.join('\n  ')}
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W69Q5BP8" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div id="root"></div>
  <noscript>
    <header>
      <a href="/">${escapeHtml(BIZ.name)}</a>
      <nav>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="tel:${BIZ.phoneRaw}">${BIZ.phone}</a>
      </nav>
    </header>
    <main>
      <article>
        <h1>${escapeHtml(meta.h1)}</h1>
        <p>${escapeHtml(meta.intro)}</p>
        ${servicesList}
        <p>Call us at <a href="tel:${BIZ.phoneRaw}">${BIZ.phone}</a> for a free, no-obligation roof inspection. Service area: ${BIZ.cities}.</p>
        <p><strong>Why choose ${BIZ.name}:</strong> ${BIZ.diff}.</p>
      </article>
    </main>
    <footer>
      <p>${escapeHtml(BIZ.name)} · ${BIZ.phone} · ${BIZ.email}</p>
      <p>Serving ${BIZ.cities}</p>
    </footer>
  </noscript>
  ${assets.scripts.join('\n  ')}
</body>
</html>`;
}

const xml = readFileSync(SITEMAP, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
const paths = locs.map(loc => new URL(loc).pathname || '/');
const unique = [...new Set(paths)];

log(`${unique.length} paths in sitemap`);

let created = 0;
let skipped = 0;
let homepageReplaced = false;
const assets = getAssetTags();

for (const pathname of unique) {
  if (pathname.endsWith('.html')) {
    skipped++;
    continue;
  }

  // Homepage: only replace if dist/index.html lacks an <h1> (came from bare
  // `vite build` rather than Puppeteer prerender)
  if (pathname === '/' || pathname === '') {
    const indexHtml = readFileSync(INDEX_HTML, 'utf8');
    if (!/<h1[\s>]/i.test(indexHtml)) {
      const html = generatePageHtml('/', assets);
      writeFileSync(INDEX_HTML, html);
      homepageReplaced = true;
      created++;
      log(`✓ / (homepage — replaced empty Vite shell with SEO content)`);
    } else {
      skipped++;
      log(`⏸ / (already has prerendered content, kept intact)`);
    }
    continue;
  }

  const trimmed = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const file = resolve(DIST, trimmed, 'index.html');

  if (existsSync(file)) {
    const existing = readFileSync(file, 'utf8');
    if (/<h1[\s>]/i.test(existing)) {
      skipped++;
      continue;
    }
  }

  const html = generatePageHtml(pathname, assets);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  created++;
}

log(`done: ${created} fallback files written, ${skipped} prerendered files kept intact`);
if (homepageReplaced) {
  log(`note: homepage was the empty Vite shell — replaced with SEO-quality content. Investigate why Puppeteer prerender failed in CI.`);
}
