import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Award, Sun, Shield } from 'lucide-react';

/**
 * Window Replacement page hero.
 * Custom hero (replaces the previous generic one) with:
 *   - WA-specific framing (1950s aluminum frames, condensation, single-pane homes)
 *   - Andersen-certified positioning
 *   - ONE booking CTA + ONE phone CTA
 */
const WindowHeroSection = () => {
  return (
    <section
      id="window-hero"
      className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/4c26975e-74ad-41ad-a63f-356d7b6c7aeb.webp"
          alt="Modern Andersen window replacement on a Western Washington home"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/35" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          className="text-white/50 text-xs tracking-widest uppercase mb-6 text-center"
          style={{ whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" className="hover:text-white/80 transition-colors">Home</a>
          <ChevronRight className="inline-block w-3 h-3 mx-2 align-middle" />
          <span className="text-white/70">Window Replacement</span>
        </motion.div>

        <div className="max-w-2xl text-white text-center mx-auto">
          {/* Brand pulse badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/20 border border-stark-red/40 backdrop-blur-sm mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Award size={13} className="text-stark-red" />
            Milgard · Ply Gem · Pella
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading font-extrabold leading-[1.05] tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              Drafty, Foggy,
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-stark-red">
              30 Years Old?
            </span>
          </motion.h1>

          {/* Accent bar */}
          <motion.div
            className="h-1 bg-stark-red rounded-full mb-5 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          />

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-lg text-white/85 mb-7 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55 }}
          >
            Most Seattle-area aluminum-frame and single-pane windows from the 1960s–80s
            are bleeding heat, sweating in winter, and rotting your sills. We replace
            them with Energy Star vinyl windows from the brands that actually hold up in
            our marine climate — Milgard, Ply Gem, and Pella. Energy Star says you'll
            save up to <strong>$583 a year</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-8 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55 }}
          >
            <motion.a
              href="#book-windows"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stark-red text-white font-bold text-base rounded-full shadow-2xl"
              whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(220,38,38,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Book My Free Consultation
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

          {/* Trust badges */}
          <motion.div
            className="flex flex-col items-center gap-3 sm:grid sm:grid-cols-3 sm:items-stretch max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            <div className="inline-flex sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 text-left">
              <Award size={18} className="text-stark-red flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium leading-tight">
                3 Top WA Brands
              </span>
            </div>
            <div className="inline-flex sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 text-left">
              <Sun size={18} className="text-stark-red flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium leading-tight">
                Energy Star V7.0
              </span>
            </div>
            <div className="inline-flex sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 text-left">
              <Shield size={18} className="text-stark-red flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium leading-tight">
                $600 Federal Tax Credit
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WindowHeroSection;
