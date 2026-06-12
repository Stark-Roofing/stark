import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Shield, Phone } from 'lucide-react';

/**
 * Storm Damage page hero.
 * Two-column layout: bold headline + booking CTA on the left,
 * the Stark mascot promo graphic on the right.
 *
 * Replaces the generic ServicePageHero on the storm-damage page so we can:
 *   - showcase Brenda's branded mascot art instead of a stock drone shot
 *   - keep ONE primary booking CTA + ONE phone CTA (no triple-call clutter)
 *   - lead with WA-specific threats (windstorms, falling trees) instead of "hail"
 */
const StormHero = () => {
  return (
    <section
      id="storm-hero"
      className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-[#0a1530] pt-28 md:pt-32 pb-20 md:pb-28"
    >
      {/* Background pattern accents */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      {/* Red diagonal accent on the right edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, #dc2626 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          className="text-white/50 text-xs tracking-widest uppercase mb-6 text-center md:text-left"
          style={{ whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" className="hover:text-white/80 transition-colors">
            Home
          </a>
          <ChevronRight className="inline-block w-3 h-3 mx-2 align-middle" />
          <span className="text-white/70">Storm Damage</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* ── LEFT: Copy + CTAs ── */}
          <div className="text-white text-center md:text-left">
            {/* Pulsing live alert badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/20 border border-stark-red/40 backdrop-blur-sm mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-stark-red animate-pulse" />
              24/7 Emergency Response
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-heading font-extrabold leading-[1.05] tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="block text-4xl md:text-5xl lg:text-6xl">
                Tree Down on
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-stark-red">
                Your Roof?
              </span>
            </motion.h1>

            {/* Accent line */}
            <motion.div
              className="h-1 bg-stark-red rounded-full mb-5 mx-auto md:mx-0"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            />

            {/* Subheadline */}
            <motion.p
              className="text-base md:text-lg text-white/85 mb-7 max-w-xl leading-relaxed mx-auto md:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              Windstorms drop trees and limbs on Seattle roofs every winter. We tarp
              fast, document everything for your insurance, and rebuild it right —
              no out-of-pocket on most claims.
            </motion.p>

            {/* CTAs — ONE primary, ONE phone. No triple-call clutter. */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-7 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.55 }}
            >
              <motion.a
                href="#book-inspection"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stark-red text-white font-bold text-base rounded-full shadow-2xl"
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(220,38,38,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Book My Free Inspection
                <ChevronRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="tel:+12067398232"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-base rounded-full border border-white/25 backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-5 h-5" />
                (206) 739-8232
              </motion.a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-stark-red" /> 24/7 Tarp & Stabilize
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={16} className="text-stark-red" /> We Handle Insurance
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={16} className="text-stark-red" /> GAF Certified
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Stark mascot promo image ── */}
          <motion.div
            className="relative max-w-lg lg:max-w-none mx-auto w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <img
                src="/storm-stark-mascot.jpg"
                alt="Stark Roofing & Renovation — Free drone inspection, free estimates"
                className="w-full h-auto block"
                loading="eager"
              />
            </div>
            {/* Floating $ saved badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-left-6 bg-white text-navy px-4 py-3 rounded-xl shadow-2xl border-2 border-stark-red"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <div className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold">
                Average claim
              </div>
              <div className="text-2xl font-bold text-stark-red">$0 out of pocket</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StormHero;
