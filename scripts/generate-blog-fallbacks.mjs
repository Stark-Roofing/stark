#!/usr/bin/env node
/**
 * Blog SEO safety net — single source of truth is src/data/*.ts.
 *
 * For EVERY blog post defined in blogPosts.ts / cityBlogPosts.ts this script:
 *   1. Ensures the post URL is present in public/sitemap.xml (so Google can
 *      discover it). Adds any missing /blog/<slug> entries.
 *   2. Generates a static dist/blog/<slug>/index.html fallback if the
 *      Puppeteer prerender didn't already produce one — so Googlebot gets a
 *      200 with real <title>/<meta>/canonical instead of a 404, while the SPA
 *      still hydrates for users.
 *
 * Why this exists: previously slugs + metadata were hardcoded in this file AND
 * had to be hand-added to sitemap.xml. New posts that skipped either step were
 * served as 404 to Google. Now both are derived automatically from the post
 * data, so publishing a post (adding it to the .ts file) is enough.
 *
 * Runs AFTER `vite build` (needs dist/index.html for asset tags) and is safe
 * to run locally too — re-running only fills gaps (idempotent).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const SITEMAP_SRC = resolve(ROOT, 'public', 'sitemap.xml');
const SITEMAP_DIST = resolve(DIST, 'sitemap.xml');
const INDEX_HTML = resolve(DIST, 'index.html');
const ORIGIN = 'https://starkroofingrenovation.com';

const log = (msg) => console.log(`[blog-fallback] ${msg}`);

// ---------------------------------------------------------------------------
// Single source of truth: extract every blog post (slug, title, excerpt, date)
// from the TS data files. slug/title/excerpt/date are plain double-quoted
// strings; only `content` is a template literal, which we ignore here.
// ---------------------------------------------------------------------------
function extractPosts() {
  const files = [
    resolve(ROOT, 'src', 'data', 'blogPosts.ts'),
    resolve(ROOT, 'src', 'data', 'cityBlogPosts.ts'),
  ];
  const posts = [];
  const seen = new Set();
  for (const f of files) {
    if (!existsSync(f)) continue;
    const src = readFileSync(f, 'utf8');
    const slugMatches = [...src.matchAll(/slug:\s*"((?:[^"\\]|\\.)*)"/g)];
    for (let i = 0; i < slugMatches.length; i++) {
      const slug = slugMatches[i][1];
      if (seen.has(slug)) continue;
      const start = slugMatches[i].index;
      const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : src.length;
      const chunk = src.slice(start, end);
      const t = chunk.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
      const e = chunk.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/);
      const d = chunk.match(/date:\s*"([^"]+)"/);
      if (!t) continue; // not a real post object
      seen.add(slug);
      posts.push({
        slug,
        title: t[1].replace(/\\"/g, '"'),
        description: (e ? e[1] : '').replace(/\\"/g, '"'),
        date: d ? d[1] : '',
      });
    }
  }
  return posts;
}

// ---------------------------------------------------------------------------
// Ensure every post is in the sitemap. Writes both the source (so git stays in
// sync when run locally) and the dist copy (so this build serves it).
// ---------------------------------------------------------------------------
function syncSitemap(posts) {
  if (!existsSync(SITEMAP_SRC)) {
    log(`⚠ ${SITEMAP_SRC} not found — skipping sitemap sync`);
    return;
  }
  let xml = readFileSync(SITEMAP_SRC, 'utf8');
  const present = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()));
  const additions = [];
  for (const p of posts) {
    const loc = `${ORIGIN}/blog/${p.slug}`;
    if (present.has(loc)) continue;
    const lastmod = p.date || new Date().toISOString().slice(0, 10);
    additions.push(`  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  if (additions.length === 0) {
    log('sitemap already covers all posts');
    return;
  }
  xml = xml.replace(/\s*<\/urlset>/, '\n' + additions.join('\n') + '\n</urlset>');
  writeFileSync(SITEMAP_SRC, xml);
  if (existsSync(DIST)) writeFileSync(SITEMAP_DIST, xml);
  log(`sitemap: added ${additions.length} missing blog URL(s)`);
  additions.forEach((a) => log(`  + ${a.match(/<loc>([^<]+)</)[1]}`));
}

// ---------------------------------------------------------------------------
// Parse the SPA shell to extract CSS/JS asset references + perf hints, so the
// fallback HTML matches dist/index.html (preconnects, manifest, favicons...).
// ---------------------------------------------------------------------------
function getAssetTags() {
  const html = readFileSync(INDEX_HTML, 'utf8');
  const preconnects = [...html.matchAll(/<link[^>]+rel="preconnect"[^>]*>/g)].map((m) => m[0]);
  const dnsPrefetch = [...html.matchAll(/<link[^>]+rel="dns-prefetch"[^>]*>/g)].map((m) => m[0]);
  const manifest = [...html.matchAll(/<link[^>]+rel="manifest"[^>]*>/g)].map((m) => m[0]);
  const icons = [...html.matchAll(/<link[^>]+rel="(?:icon|apple-touch-icon|mask-icon)"[^>]*>/g)].map((m) => m[0]);
  const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map((m) => m[0]);
  const modulePreloads = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]*>/g)].map((m) => m[0]);
  const resourceHints = [...html.matchAll(/<link[^>]+rel="preload"[^>]*>/g)].map((m) => m[0]);
  const scripts = [...html.matchAll(/<script[^>]+src="[^"]*"[^>]*><\/script>/g)].map((m) => m[0]);
  const speculationRules = [...html.matchAll(/<script[^>]+type="speculationrules"[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]);
  return {
    headHints: [...preconnects, ...dnsPrefetch, ...manifest, ...icons, ...speculationRules],
    cssLinks: [...cssLinks, ...modulePreloads, ...resourceHints],
    scripts,
  };
}

// ---------------------------------------------------------------------------
// Generate a minimal SEO page that also boots the SPA
// ---------------------------------------------------------------------------
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generatePage(post, assets) {
  const canonical = `${ORIGIN}/blog/${post.slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(post.title)} | Stark Roofing &amp; Renovation</title>
  <meta name="description" content="${esc(post.description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${esc(post.title)}" />
  <meta property="og:description" content="${esc(post.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="article" />
  ${(assets.headHints || []).join('\n  ')}
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
const posts = extractPosts();
log(`${posts.length} posts in blogPosts.ts / cityBlogPosts.ts`);

syncSitemap(posts);

if (!existsSync(INDEX_HTML)) {
  log('⚠ dist/index.html not found — run after `vite build`. Skipping fallback HTML.');
  process.exit(0);
}

const assets = getAssetTags();
let created = 0;
let skipped = 0;
for (const post of posts) {
  const file = resolve(DIST, 'blog', post.slug, 'index.html');
  if (existsSync(file)) {
    skipped++;
    continue;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, generatePage(post, assets));
  created++;
  log(`✓ created fallback: /blog/${post.slug}`);
}

log(`done: ${created} fallbacks created, ${skipped} already existed`);
