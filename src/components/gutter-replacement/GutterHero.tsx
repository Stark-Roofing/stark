import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Shield, CloudRain, TreePine } from 'lucide-react';

/**
 * Gutter Replacement page hero.
 * Custom hero (replaces the generic ServicePageHero) so we can:
 *   - frame the WA-specific pain (pine needles, atmospheric rivers, ice dams)
 *   - keep ONE clear booking CTA that scrolls to the form
 *   - use the stark-red brand color (the old generic hero used green)
 */
const GutterHero = () => {
  return (
    <section
      id="gutter-hero"
      className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20"
    >
      {/* Background image with dark overlay.
          gutter-hero.jpg = close-up of seamless black gutters with micro-mesh
          leaf protection on a wood-sided WA home, fir trees in background. */}
      <div className="absolute inset-0">
        <img
          src="/gutter-hero.webp"
          alt="Custom seamless black gutters with leaf protection on a Western Washington home"
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
          <span className="text-white/70">Gutter Replacement</span>
        </motion.div>

        <div className="max-w-2xl mx-auto text-white text-center">
          {/* Pulse badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/20 border border-stark-red/40 backdrop-blur-sm mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-stark-red animate-pulse" />
            Free Measure &amp; Quote
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading font-extrabold leading-[1.05] tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              Gutters That Survive
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-stark-red">
              Seattle Winters.
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
            Pine needles, fir cones, atmospheric river rain, ice dams — Western Washington
            destroys cheap gutters. We install custom-fabricated seamless aluminum with
            real leaf protection, sized to handle a 3-inch downpour.
          </motion.p>

          {/* CTAs — ONE primary, ONE phone */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-8 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55 }}
          >
            <motion.a
              href="#book-gutters"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stark-red text-white font-bold text-base rounded-full shadow-2xl"
              whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(220,38,38,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Book My Free Quote
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

          {/* Trust badges row */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 justify-center sm:justify-start">
              <TreePine size={18} className="text-stark-red flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium leading-tight">
                Pine-needle proof
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 justify-center sm:justify-start">
              <CloudRain size={18} className="text-stark-red flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium leading-tight">
                Atmospheric river ready
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 justify-center sm:justify-start">
              <Shield size={18} className="text-stark-red flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium leading-tight">
                Lifetime no-clog warranty
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GutterHero;