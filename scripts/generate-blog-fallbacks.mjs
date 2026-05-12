#!/usr/bin/env node
/**
 * Fallback: generate basic static HTML for any blog pages that the
 * Puppeteer prerender missed. Runs AFTER prerender so it only fills gaps.
 *
 * Reads public/sitemap.xml for blog URLs, checks if dist/<path>/index.html
 * already exists, and generates a minimal SEO-friendly HTML page for any
 * that are missing. The page loads the SPA bundle so the full React app
 * hydrates on the client — but Googlebot gets a 200 with real content
 * instead of a 404.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const SITEMAP = resolve(ROOT, 'public', 'sitemap.xml');
const INDEX_HTML = resolve(DIST, 'index.html');

const log = (msg) => console.log(`[blog-fallback] ${msg}`);

// Blog metadata — slug → { title, description }
// Kept here so this script has zero TS/build dependencies.
const BLOG_META = {
  'roofing-guide-bellevue-wa': {
    title: 'Complete Roofing Guide for Bellevue, WA Homeowners',
    description: 'Everything Bellevue homeowners need to know about roof replacement, repair, and maintenance. Local weather challenges, material recommendations, and what to expect.',
  },
  'roofing-guide-redmond-wa': {
    title: 'Redmond, WA Roofing Guide: Protecting Your Home in Tech City',
    description: 'Redmond homeowners face unique roofing challenges from PNW weather. Learn about the best materials, maintenance tips, and when to replace your roof.',
  },
  'roofing-guide-kirkland-wa': {
    title: 'Kirkland, WA Roofing Guide: Lakeside Homes & Weather Protection',
    description: 'Kirkland roofing guide covering local weather, best materials for lakeside homes, maintenance tips, and choosing a qualified roofer.',
  },
  'cedar-shake-conversion-kirkland': {
    title: 'Cedar Shake Conversion in Kirkland: What Homeowners Need to Know',
    description: 'Cedar shake roofs from the 80s and 90s are at end of life across Kirkland. Skip sheathing replacement, full deck rebuild, GAF architectural shingle conversion. Cost ranges $22,000 to $38,000.',
  },
  'gaf-master-elite-certification': {
    title: 'GAF Master Elite Certification: What It Means and Why Only 2% of Roofers Have It',
    description: 'Only about 2% of roofing contractors hold GAF Master Elite status. Requirements, what the Golden Pledge warranty covers (50 years materials, 25 years workmanship), and how to verify a contractor claim.',
  },
  'roofing-guide-woodinville-wa': {
    title: 'Woodinville, WA Roofing Guide: Wine Country Home Protection',
    description: 'Woodinville roofing guide for homeowners. Local climate challenges, recommended materials, and tips for maintaining your roof in wine country.',
  },
  'roofing-guide-renton-wa': {
    title: 'Renton, WA Roofing Guide: Protecting Your Home in the Valley',
    description: 'Complete roofing guide for Renton homeowners covering local weather challenges, best materials, costs, and maintenance tips.',
  },
  'roofing-guide-maple-valley-wa': {
    title: 'Maple Valley, WA Roofing Guide: Rural & Suburban Home Protection',
    description: 'Maple Valley roofing guide covering unique challenges of foothills living, recommended materials, and maintenance schedules.',
  },
  'roofing-guide-snoqualmie-wa': {
    title: 'Snoqualmie, WA Roofing Guide: Mountain-Adjacent Home Protection',
    description: 'Snoqualmie roofing guide for homeowners near the Cascades. Snow loads, heavy rain, and the best materials for mountain-adjacent living.',
  },
  'roofing-guide-mercer-island-wa': {
    title: 'Mercer Island, WA Roofing Guide: Island Living & Roof Protection',
    description: 'Mercer Island roofing guide for premium island homes. Lake-effect weather, premium material options, and maintaining your investment.',
  },
  'roofing-guide-newcastle-wa': {
    title: 'Newcastle, WA Roofing Guide: Hillside Homes & Weather Challenges',
    description: 'Newcastle roofing guide covering hillside home challenges, wind exposure, material recommendations, and maintenance tips.',
  },
  'roofing-guide-north-bend-wa': {
    title: 'North Bend, WA Roofing Guide: Gateway to the Cascades',
    description: 'North Bend roofing guide for homeowners near the mountains. Heavy snow, rain, and the toughest materials for Cascade foothills living.',
  },
};

// ---------------------------------------------------------------------------
// Parse the SPA shell to extract CSS/JS asset references
// ---------------------------------------------------------------------------
function getAssetTags() {
  const html = readFileSync(INDEX_HTML, 'utf8');
  // Extract all <link rel="stylesheet" ...> and <script ...> from <head>
  const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map(m => m[0]);
  const scripts = [...html.matchAll(/<script[^>]+src="[^"]*"[^>]*><\/script>/g)].map(m => m[0]);
  return { cssLinks, scripts };
}

// ---------------------------------------------------------------------------
// Generate a minimal SEO page that also boots the SPA
// ---------------------------------------------------------------------------
function generatePage(slug, meta, assets) {
  const canonical = `https://starkroofingrenovation.com/blog/${slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title} | Stark Roofing & Renovation</title>
  <meta name="description" content="${meta.description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="article" />
  ${assets.cssLinks.join('\n  ')}
</head>
<body>
  <div id="root"></div>
  ${assets.scripts.join('\n  ')}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const blogPaths = [];
const xml = readFileSync(SITEMAP, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
for (const loc of locs) {
  const pathname = new URL(loc).pathname;
  if (pathname.startsWith('/blog/') && pathname !== '/blog/') {
    blogPaths.push(pathname);
  }
}

log(`${blogPaths.length} blog paths in sitemap`);

let created = 0;
let skipped = 0;
const assets = getAssetTags();

for (const pathname of blogPaths) {
  const trimmed = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const file = resolve(DIST, trimmed, 'index.html');

  if (existsSync(file)) {
    skipped++;
    continue;
  }

  const slug = trimmed.replace('blog/', '');
  const meta = BLOG_META[slug];
  if (!meta) {
    log(`⚠ no metadata for ${slug} — skipping fallback`);
    continue;
  }

  const html = generatePage(slug, meta, assets);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  created++;
  log(`✓ created fallback: ${pathname}`);
}

log(`done: ${created} fallbacks created, ${skipped} already existed`);
