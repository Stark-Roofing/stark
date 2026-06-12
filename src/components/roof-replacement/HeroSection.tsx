import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Shield, Award, Star } from 'lucide-react';

/**
 * Roof Replacement page hero.
 * Custom hero (replaces the generic ServicePageHero) so we can:
 *   - showcase a real Pacific Northwest craftsman with a prominent dark roof
 *   - keep ONE booking CTA + ONE phone CTA
 *   - lead with the WA-specific value (GAF + 2,000 roofs + 30+ years)
 */
const HeroSection = () => {
  return (
    <section
      id="roof-replacement-hero"
      className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20"
    >
      {/* Background image with dark overlay.
          roof-replacement-hero.jpg = craftsman home with prominent dark gabled
          roof, surrounded by Douglas fir trees, classic Pacific NW. */}
      <div className="absolute inset-0">
        <img
          src="/roof-replacement-hero.webp"
          alt="Pacific Northwest craftsman home with new GAF roof installed by Stark Roofing"
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
          <span className="text-white/70">Roof Replacement</span>
        </motion.div>

        <div className="max-w-2xl mx-auto text-white text-center">
          {/* GAF certified badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/20 border border-stark-red/40 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Award size={13} className="text-stark-red" />
            GAF Certified Installer
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading font-extrabold leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              Your Last Roof.
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-stark-red">
              Done Right.
            </span>
          </motion.h1>

          {/* Accent bar */}
          <motion.div
            className="h-1 bg-stark-red rounded-full mb-8 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          />

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-lg text-white/85 mb-10 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55 }}
          >
            GAF Timberline HDZ. Synthetic underlayment. Ice &amp; water shield where it
            counts. Installed by a crew that's done this 2,000+ times across the Puget
            Sound. One trip up the ladder, decades of peace of mind.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55 }}
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stark-red text-white font-bold text-base rounded-full shadow-2xl"
              whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(220,38,38,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Book My Free Estimate
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
