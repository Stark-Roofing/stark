import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, ShieldCheck, Clock, Star, Award } from 'lucide-react';

/**
 * Roof Repair — purpose-built hero.
 * Split layout: emergency-forward copy on the left, photo with floating
 * trust card on the right. Replaces the generic ServicePageHero on this
 * page so the repair message can lead with urgency + same-week promise.
 */
const HeroSection = () => {
  const trustPoints = [
    { icon: Clock, text: 'Same-week service across Puget Sound' },
    { icon: ShieldCheck, text: 'GAF Certified — leak-stop guarantee' },
    { icon: Award, text: '30+ years, 2,000+ roofs repaired' },
    { icon: Star, text: 'Free, no-obligation inspection' },
  ];

  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-16 md:pt-32 md:pb-24">
      {/* Background image — full-bleed on mobile, right-side on desktop */}
      <div className="absolute inset-0">
        <img
          src="/hero-custom-6.webp"
          alt="Brenda Scarllet inspecting a completed roof installation"
          className="w-full h-full object-cover object-center opacity-30 md:opacity-20"
        />
        {/* Navy gradient — heavier on the left so copy stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
        {/* Subtle red accent glow bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center max-w-6xl mx-auto">
          {/* ── Left: Copy ── */}
          <div className="lg:col-span-6 text-center md:text-left">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white/50 text-xs tracking-widest uppercase mb-6 text-center md:text-left"
              style={{ whiteSpace: 'nowrap' }}
            >
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <ChevronRight className="inline-block w-3 h-3 mx-2 align-middle" />
              <span className="text-white/80">Roof Repair</span>
            </motion.div>

            {/* Emergency badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stark-red/15 border border-stark-red/40 backdrop-blur-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stark-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-stark-red" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-white uppercase">
                Same-Week Service Available
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.05] tracking-tight mb-6 text-center md:text-left"
            >
              Roof Leaking?
              <span className="block text-stark-red mt-2">We'll Fix It This Week.</span>
            </motion.h1>

            {/* Accent bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="h-[3px] bg-stark-red rounded-full mb-8 mx-auto md:mx-0"
            />

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed text-center md:text-left mx-auto md:mx-0"
            >
              Permanent fixes for leaks, missing shingles, flashing failures, and storm damage —
              done by a GAF-certified Seattle crew who actually shows up.
            </motion.p>

            {/* Trust bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10 max-w-xl mx-auto md:mx-0"
            >
              {trustPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-white/85 text-sm justify-center sm:justify-start">
                  <Icon size={18} className="text-stark-red flex-shrink-0 mt-0.5" />
                  <span className="text-left">{text}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <motion.a
                href="#schedule-form"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stark-red hover:bg-stark-red/90 text-white font-bold rounded-full shadow-2xl shadow-stark-red/30 transition-colors"
              >
                Get My Free Inspection
                <ChevronRight size={18} />
              </motion.a>

              <motion.a
                href="tel:+12067398232"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/25 transition-colors"
              >
                <Phone size={18} />
                (206) 739-8232
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: Photo card with floating trust badge ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            className="hidden lg:block lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img
                src="/hero-custom-everett.webp"
                alt="Pacific Northwest craftsman home with quality shingle roof"
                className="w-full h-[560px] object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/stark-crew-team.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            </div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl px-5 py-4 max-w-[260px]"
            >
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-1 text-sm font-bold text-navy">5.0</span>
              </div>
              <p className="text-xs text-charcoal/80 leading-snug">
                Trusted by <span className="font-bold text-navy">2,000+ Seattle homeowners</span> across King, Snohomish & Pierce counties.
              </p>
            </motion.div>

            {/* Floating "since" badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-stark-red text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-xl border-4 border-navy"
            >
              <span className="text-2xl font-extrabold leading-none">30+</span>
              <span className="text-[10px] uppercase tracking-wider mt-1">Years</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, #dc2626, transparent)' }}
      />
    </section>
  );
};

export default HeroSection;
