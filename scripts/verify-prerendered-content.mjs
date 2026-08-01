#!/usr/bin/env node
/**
 * Post-prerender content gate: fail the build if ANY sitemap page shipped
 * fallback/boilerplate content instead of real Puppeteer-rendered content.
 *
 * Why this works for every page, with no per-page maintenance:
 *   Both scripts/generate-all-fallbacks.mjs and scripts/generate-blog-fallbacks.mjs
 *   write `<div id="root"></div>` LITERALLY EMPTY — their SEO copy lives in a
 *   <noscript> block instead, so the real React app can still hydrate #root for
 *   actual visitors. Those two scripts already use "#root is empty" as their own
 *   signal for "prerender didn't produce this page, I need to fill the gap"
 *   (see the existsSync/regex checks in each). A genuinely successful Puppeteer
 *   render captures page.content() AFTER React mounted, so #root is always full.
 *
 *   So for every dist/<path>/index.html: empty #root == fallback content,
 *   full #root == real prerendered content. This is a hard, deterministic
 *   signal — not a guess — and it automatically covers every page in the
 *   sitemap, including ones added after this script was written.
 *
 * Defense-in-depth: also flags pages with a non-empty #root that are still
 * suspiciously thin (under MIN_WORDS), in case a future bug produces "real"
 * but broken/truncated content that never throws and never leaves #root empty.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const SITEMAP = resolve(ROOT, 'public', 'sitemap.xml');

const MIN_WORDS = 150;
const EMPTY_ROOT = /<div id="root">\s*<\/div>/i;

const log = (msg) => console.log(`[verify-content] ${msg}`);
const fail = (path, reason) => console.log(`::error::${path} — ${reason}`);

function pathToFile(pathname) {
  if (pathname === '/' || pathname === '') return resolve(DIST, 'index.html');
  const trimmed = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return resolve(DIST, trimmed, 'index.html');
}

function wordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

const xml = readFileSync(SITEMAP, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const paths = [...new Set(locs.map((loc) => new URL(loc).pathname || '/'))]
  // Static files (e.g. /quiz.html) are shipped as-is, not React routes —
  // they never go through prerender/fallback and have no #root at all.
  .filter((p) => !p.toLowerCase().endsWith('.html'));

log(`checking ${paths.length} sitemap page(s) against dist/ output...`);

const failures = [];

for (const pathname of paths) {
  const file = pathToFile(pathname);

  if (!existsSync(file)) {
    failures.push([pathname, 'file missing entirely from dist/ — neither prerender nor the fallback generators produced it']);
    continue;
  }

  const html = readFileSync(file, 'utf8');

  if (EMPTY_ROOT.test(html)) {
    failures.push([pathname, 'empty #root — Puppeteer prerender failed for this page and generic fallback content shipped instead']);
    continue;
  }

  const words = wordCount(html);
  if (words < MIN_WORDS) {
    failures.push([pathname, `suspiciously thin rendered content (${words} words, expected at least ${MIN_WORDS})`]);
  }
}

if (failures.length > 0) {
  console.log('');
  console.log(`::error::${failures.length} of ${paths.length} page(s) failed content validation:`);
  for (const [pathname, reason] of failures) fail(pathname, reason);
  console.log('');
  log('Deployment blocked. Check the "Prerender static HTML" step log above for the real ✗ error and stack trace on each failed page.');
  process.exit(1);
}

log(`all ${paths.length} pages verified as real, page-specific prerendered content.`);
