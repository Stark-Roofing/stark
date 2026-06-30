#!/usr/bin/env node
/**
 * Prerender every URL listed in public/sitemap.xml into a real static HTML
 * file under dist/, so GitHub Pages serves them with HTTP 200 (not the SPA
 * 404.html fallback). This is the fix for "Not found (404)" warnings in
 * Google Search Console for pages that exist in the React app but had no
 * matching static file.
 *
 * Pipeline:
 *   1. vite build (run before this script) produces dist/
 *   2. spawn `vite preview` to serve dist/ locally with SPA fallback
 *   3. parse public/sitemap.xml for the canonical list of URLs
 *   4. for each path, drive puppeteer to that URL, wait for the React app
 *      to settle, capture full rendered HTML
 *   5. after every page is captured, flush each one to dist/<path>/index.html
 *      (buffered so a freshly written file can't pollute later renders)
 *   6. tear down preview server
 */

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const PORT = 4173;
const HOST = '127.0.0.1';
const ORIGIN = `http://${HOST}:${PORT}`;
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const SITEMAP = resolve(ROOT, 'public', 'sitemap.xml');

const log = (msg) => console.log(`[prerender] ${msg}`);

// ---------------------------------------------------------------------------
// 1. Parse sitemap → list of pathnames to prerender
// ---------------------------------------------------------------------------
function getPathsFromSitemap() {
  const xml = readFileSync(SITEMAP, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const paths = locs.map((loc) => new URL(loc).pathname || '/');
  // Skip static .html files (e.g. /quiz.html) — they are real files shipped in
  // dist/ and served as-is, NOT React routes. Driving puppeteer at them fails
  // the "#root has content" sanity check and aborts the whole build (exit 1),
  // which silently froze the live deploy on an old CSR shell.
  const renderable = paths.filter((p) => !p.toLowerCase().endsWith('.html'));
  // Deduplicate while preserving order
  return [...new Set(renderable)];
}

// ---------------------------------------------------------------------------
// 2. Spawn vite preview and wait until it's accepting connections
// ---------------------------------------------------------------------------
function startServer() {
  return new Promise((resolvePromise, rejectPromise) => {
    // Cross-platform: on Windows `npx` is a .cmd shim — bare spawn() throws
    // ENOENT/EINVAL. Running through the shell resolves it. POSIX (Linux CI)
    // keeps the plain, shell-less spawn.
    const isWin = process.platform === 'win32';
    const proc = spawn(
      'npx',
      ['vite', 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'],
      { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: isWin }
    );

    let resolved = false;
    const onData = (chunk) => {
      const text = chunk.toString();
      process.stdout.write(text);
      // Strip ANSI color codes before matching — vite preview emits colored
      // output (e.g. "Local\x1b[22m:") which breaks a naive substring check.
      const clean = text.replace(/\x1b\[[0-9;]*m/g, '');
      if (!resolved && (clean.includes('Local:') || clean.includes(`${HOST}:${PORT}`))) {
        resolved = true;
        resolvePromise(proc);
      }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', (chunk) => process.stderr.write(chunk));
    proc.on('exit', (code) => {
      if (!resolved) rejectPromise(new Error(`vite preview exited early with code ${code}`));
    });

    // Hard timeout — if it never says "Local:" within 30s, give up
    setTimeout(() => {
      if (!resolved) {
        proc.kill('SIGTERM');
        rejectPromise(new Error('vite preview did not start within 30s'));
      }
    }, 30_000);
  });
}

// ---------------------------------------------------------------------------
// 2b. Extract head tags from source dist/index.html that Chromium strips
//     when serializing via page.content() (preconnects after execution,
//     icons/manifest sometimes deduped, etc). These tags are perf-critical
//     (DNS/TLS handshake hints, PWA hooks, favicons for SERP/social) and
//     must be present in every prerendered file.
// ---------------------------------------------------------------------------
function extractHeadPreservationTags(distIndexPath) {
  const html = readFileSync(distIndexPath, 'utf8');
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return '';
  const head = headMatch[1];
  // Patterns to preserve: preconnect / dns-prefetch / icon / apple-touch-icon
  // / manifest / mask-icon. We intentionally do NOT preserve <link rel="preload">
  // and <link rel="modulepreload"> because Vite-built versions are already in
  // the prerendered HTML (and they reference hashed asset filenames that change
  // per build — re-injecting stale ones would 404).
  const tagPattern = /<link\b[^>]*\brel\s*=\s*["'](?:preconnect|dns-prefetch|icon|apple-touch-icon|manifest|mask-icon)["'][^>]*>/gi;
  return [...head.matchAll(tagPattern)].map((m) => m[0]).join('\n    ');
}

// Idempotent injection: only adds tags whose `href` is not already present in
// the served HTML. This prevents duplicates if Chromium happens to retain a
// subset of the tags on some routes.
function reinjectMissingHeadTags(html, preservationBlock) {
  if (!preservationBlock) return html;
  const tagsToInject = [];
  const tagMatches = preservationBlock.matchAll(/<link[^>]*href=["']([^"']+)["'][^>]*>/gi);
  for (const m of tagMatches) {
    const href = m[1];
    // Escape href for regex use in the duplicate check
    const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const alreadyPresent = new RegExp(`href=["']${escaped}["']`, 'i').test(html);
    if (!alreadyPresent) tagsToInject.push(m[0]);
  }
  if (tagsToInject.length === 0) return html;
  return html.replace(/<\/head>/i, `    ${tagsToInject.join('\n    ')}\n  </head>`);
}

// ---------------------------------------------------------------------------
// 3. Render a single path with puppeteer
// ---------------------------------------------------------------------------
async function renderPath(browser, pathname) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Block heavy media + 3rd-party trackers during the crawl. We only need the
  // rendered HTML (not visuals), and a streaming hero <video> never lets
  // networkidle settle — that was making each page hang ~60s. Images/fonts stay
  // in the DOM with their src/href, so the static HTML is unaffected.
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    const url = req.url();
    const blocked =
      type === 'image' || type === 'media' || type === 'font' ||
      url.includes('googletagmanager.com') ||
      url.includes('google-analytics.com') ||
      url.includes('connect.facebook.net') ||
      url.includes('facebook.com/tr') ||
      url.includes('cdn.gpteng.co');
    if (blocked) req.abort();
    else req.continue();
  });

  // Surface JS errors so a broken page fails the build instead of silently
  // shipping an empty prerendered shell.
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  // Load the DOM, then wait for React to actually mount content into #root.
  // This replaces the fragile networkidle2 wait (which never settled with the
  // streaming hero video) — robust and ~2s/page instead of a 60s timeout.
  await page.goto(ORIGIN + pathname, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForFunction(
    () => {
      const r = document.getElementById('root');
      return !!r && r.children.length > 0;
    },
    { timeout: 20_000 }
  );
  // useEffect-driven meta tags need a moment to settle after mount
  await new Promise((r) => setTimeout(r, 600));

  const html = await page.content();
  await page.close();

  if (errors.length) {
    throw new Error(`page errors on ${pathname}:\n  ${errors.join('\n  ')}`);
  }
  // Sanity check: every prerendered page should have content inside #root
  if (!/<div id="root">[\s\S]*?<\S/.test(html)) {
    throw new Error(`empty #root on ${pathname} — did the React app render?`);
  }
  return html;
}

// ---------------------------------------------------------------------------
// 4. Map a pathname to its on-disk index.html location
// ---------------------------------------------------------------------------
function pathToFile(pathname) {
  if (pathname === '/' || pathname === '') return resolve(DIST, 'index.html');
  const trimmed = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return resolve(DIST, trimmed, 'index.html');
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
const paths = getPathsFromSitemap();
log(`${paths.length} paths to render`);

log('starting vite preview…');
const server = await startServer();

let browser;
const renders = new Map(); // path → html (buffered, flushed after crawl)
let failed = 0;

try {
  browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  for (const pathname of paths) {
    try {
      const html = await renderPath(browser, pathname);
      renders.set(pathname, html);
      log(`✓ ${pathname}`);
    } catch (err) {
      failed++;
      console.error(`[prerender] ✗ ${pathname}: ${err.message}`);
      console.error(`[prerender]   stack: ${err.stack?.split('\n').slice(1, 3).join(' | ')}`);
    }
  }
} finally {
  if (browser) await browser.close().catch(() => {});
  server.kill('SIGTERM');
}

// Extract perf-critical head tags that Chromium strips during page.content()
// (preconnects after execution, manifest/icons sometimes deduped). We re-inject
// them into every prerendered file so the served HTML matches dist/index.html
// for these signals.
const preservationBlock = extractHeadPreservationTags(resolve(DIST, 'index.html'));
if (preservationBlock) {
  log(`will re-inject ${preservationBlock.split('\n').length} head tag(s) preserved from dist/index.html`);
}

// Flush captured HTML to disk only after the crawl is complete, so that a
// freshly written /foo/index.html cannot affect a later render.
for (const [pathname, html] of renders) {
  const file = pathToFile(pathname);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, reinjectMissingHeadTags(html, preservationBlock));
}

log(`wrote ${renders.size} files; ${failed} failed`);
// Force exit. On Linux CI the spawned `vite preview` child keeps the event loop
// alive (server.kill('SIGTERM') doesn't always reap it), so node hangs forever
// AFTER the work is done — the prerender finished in ~57s but the step never
// ended. Windows reaps it fine locally. Explicit exit ends the step immediately.
process.exit(failed > 0 ? 1 : 0);
