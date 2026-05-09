#!/usr/bin/env node
/**
 * Safety net: ensure every URL in sitemap.xml has a matching static HTML file
 * in dist/. Runs AFTER prerender and blog-fallbacks — only fills gaps.
 *
 * If Puppeteer prerendering fails in CI, this guarantees GitHub Pages still
 * serves HTTP 200 (not 404) for every route. The page loads the SPA bundle
 * so the React app hydrates on the client.
 *
 * This is the fix for Google Ads "Destination not working" disapprovals
 * caused by GitHub Pages returning 404 for unprerendered routes.
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

// Extract CSS/JS asset references from the SPA shell
function getAssetTags() {
  const html = readFileSync(INDEX_HTML, 'utf8');
  const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map(m => m[0]);
  const scripts = [...html.matchAll(/<script[^>]+src="[^"]*"[^>]*><\/script>/g)].map(m => m[0]);
  return { cssLinks, scripts };
}

// Generate a minimal HTML shell that loads the SPA
function generateShell(pathname, assets) {
  const canonical = `https://starkroofingrenovation.com${pathname}`;
  const title = 'Stark Roofing & Renovation — Seattle & Eastside';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="canonical" href="${canonical}" />
  ${assets.cssLinks.join('\n  ')}
</head>
<body>
  <div id="root"></div>
  ${assets.scripts.join('\n  ')}
</body>
</html>`;
}

// Parse sitemap for all paths
const xml = readFileSync(SITEMAP, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
const paths = locs.map(loc => new URL(loc).pathname || '/');
const unique = [...new Set(paths)];

log(`${unique.length} paths in sitemap`);

let created = 0;
let skipped = 0;
const assets = getAssetTags();

for (const pathname of unique) {
  // Skip the homepage — it always exists from Vite build
  if (pathname === '/' || pathname === '') {
    skipped++;
    continue;
  }

  // Skip .html files — they're static files in public/, not SPA routes
  if (pathname.endsWith('.html')) {
    skipped++;
    continue;
  }

  const trimmed = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const file = resolve(DIST, trimmed, 'index.html');

  if (existsSync(file)) {
    skipped++;
    continue;
  }

  const html = generateShell(pathname, assets);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  created++;
  log(`✓ ${pathname}`);
}

log(`done: ${created} fallback shells created, ${skipped} already existed`);
