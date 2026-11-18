import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Shield, Award, Star } from 'lucide-react';
import QuickQuoteForm from '@/components/shared/QuickQuoteForm';
import googleReviewsData from '@/data/googleReviews.json';
import { FIRST_SCREEN_COPY as COPY, PENDING_CLAIMS } from './firstScreenCopy';

/**
 * Roof Replacement page hero.
 * Custom hero (replaces the generic ServicePageHero) so we can:
 *   - showcase a real Pacific Northwest craftsman with a prominent dark roof
 *   - keep ONE booking CTA + ONE phone CTA
 *   - lead with the WA-specific value (GAF + 2,000 roofs + 30+ years)
 *
 * 2026-11-17: the tracked lead form now sits in the hero so that at 390px the
 * first screen shows the headline, tap-to-call and the top of the form.
 * Mobile order: badge → headline → buttons → form → proof → financing →
 * subheadline → trust badges. Desktop: text left, form + proof right.
 * All first-screen text lives in ./firstScreenCopy.ts.
 */

const reviews = googleReviewsData as { rating: number | null; userRatingCount: number | null };
const ratingText =
  reviews.rating != null && reviews.userRatingCount != null
    ? `${reviews.rating.toFixed(1)} stars from ${reviews.userRatingCount} Google reviews`
    : null;

// Pending claims (hidden until Thea confirms) lead their line when shown,
// matching Product Marketer's order ("Woman-owned · Free drone inspections · …").
const withPending = (items: readonly string[], line: 1 | 2) => [
  ...Object.values(PENDING_CLAIMS)
    .filter((c) => c.show && c.line === line)
    .map((c) => c.text),
  ...items.map((t) => (t === '{rating}' ? ratingText : t)).filter((t): t is string => !!t),
];
const proofLine1 = withPending(COPY.proofLine1, 1);
const proofLine2 = withPending(COPY.proofLine2, 2);

const HeroSection = () => {
  return (
    <section
      id="roof-replacement-hero"
      className="relative overflow-hidden pt-[8.5rem] md:pt-32 pb-12 md:pb-20"
    >
      {/* Background image with dark overlay.
          Lighter re-encodes of /roof-replacement-hero.webp (481 KB): 1440px
          desktop copy and a 480px-wide centre crop for phones (only the centre
          strip is visible in the tall mobile hero). Preloaded per media in
          scripts/prerender.mjs (LCP_PRELOAD_OVERRIDES). */}
      <div className="absolute inset-0">
        <picture className="block w-full h-full">
          <source
            media="(max-width: 480px)"
            srcSet="/roof-replacement-hero-mobile.webp"
            type="image/webp"
            width={480}
            height={1040}
          />
          <img
            src="/roof-replacement-hero-1440.webp"
            alt="Pacific Northwest craftsman home with new GAF roof installed by Stark Roofing"
            className="w-full h-full object-cover object-center"
            width={1440}
            height={975}
            loading="eager"
            {...{ fetchpriority: 'high' }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/35" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          className="text-white/50 text-xs tracking-widest uppercase mb-4 md:mb-6 text-center lg:text-left"
          style={{ whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" className="hover:text-white/80 transition-colors">Home</a>
          <ChevronRight className="inline-block w-3 h-3 mx-2 align-middle" />
          <span className="text-white/70">Roof Replacement</span>
        </motion.div>

        {/* Mobile: one column, ordered with order-*. Desktop (lg): text in
            columns 1-7 (rows 1-3), form + proof in columns 8-12 (rows 1-4). */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_1fr] gap-x-12 gap-y-5 text-white">
          {/* Badge + headline */}
          <div className="order-1 lg:col-span-7 lg:row-start-1 text-center lg:text-left">
            {/* GAF certified badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/20 border border-stark-red/40 backdrop-blur-sm mb-4 md:mb-6">
              <Award size={13} className="text-stark-red" />
              GAF Certified Installer
            </div>

            {/* Headline — no entrance animation: it is the mobile LCP text. */}
            <h1 className="font-heading font-extrabold leading-[1.1] tracking-tight">
              <span className="block text-[1.65rem] md:text-4xl lg:text-5xl">
                {COPY.headlineLead}
              </span>
              <span className="block text-[1.65rem] md:text-4xl lg:text-5xl text-stark-red">
                {COPY.headlineAccent}
              </span>
            </h1>

            {/* Accent bar */}
            <div className="h-1 w-16 bg-stark-red rounded-full mt-4 md:mt-6 mx-auto lg:mx-0" />
          </div>

          {/* CTAs */}
          <div className="order-2 lg:col-span-7 lg:col-start-1 lg:row-start-3">
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#estimate-form"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stark-red hover:bg-stark-redHover text-white font-bold text-base rounded-full shadow-2xl transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
              >
                {COPY.primaryButton}
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={COPY.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-base rounded-full border border-white/25 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {COPY.phoneDisplay}
              </a>
            </div>
            <p className="text-sm text-white/80 mt-3 text-center lg:text-left">{COPY.underButton}</p>
          </div>

          {/* Form + proof + financing */}
          <div className="order-3 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-4">
            {/* Keeps heading order h1 → h2 → h3 (the form card's own heading is an h3). */}
            <h2 className="sr-only">Get Your Free Roof Replacement Estimate</h2>
            <div
              id="estimate-form"
              className="scroll-mt-36 bg-white text-charcoal rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <QuickQuoteForm
                variant="short"
                defaultService="roof-replacement"
                subtitle={COPY.formSubtitle}
                footnote={COPY.formFootnote}
              />
            </div>

            {/* Proof */}
            <ul className="mt-4 space-y-1.5 text-center lg:text-left text-sm text-white/90" aria-label="Why homeowners choose Stark">
              {[proofLine1, proofLine2].map((line, i) => (
                <li key={i}>{line.join(' · ')}</li>
              ))}
            </ul>

            {/* Financing */}
            <div className="mt-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm p-4 text-sm text-white/90 text-center lg:text-left">
              <p>
                {COPY.financingLine} {COPY.financingNoPayments}{' '}
                <a
                  href={COPY.financingHref}
                  className="font-semibold text-white underline underline-offset-2 hover:text-white/80 whitespace-nowrap"
                >
                  {COPY.financingLinkLabel}
                </a>
              </p>
              <p className="text-[11px] text-white/70 leading-snug mt-2">{COPY.financingFootnote}</p>
            </div>
          </div>

          {/* Subheadline + trust badges (existing copy, unchanged) */}
          <div className="order-4 lg:col-span-7 lg:col-start-1 lg:row-start-2 text-center lg:text-left">
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
              GAF Timberline HDZ. Synthetic underlayment. Ice &amp; water shield where it
              counts. Installed by a crew that's done this 2,000+ times across the Puget
              Sound. One trip up the ladder, decades of peace of mind.
            </p>
          </div>

          <div className="order-5 lg:col-span-7 lg:col-start-1 lg:row-start-4">
            {/* Trust badges row (existing, unchanged) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 justify-center sm:justify-start">
                <Award size={18} className="text-stark-red flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium leading-tight">
                  GAF Certified
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 justify-center sm:justify-start">
                <Star size={18} className="text-stark-red fill-stark-red flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium leading-tight">
                  2,000+ Roofs · 30+ Yrs
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 justify-center sm:justify-start">
                <Shield size={18} className="text-stark-red flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium leading-tight">
                  Lifetime Ltd Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
