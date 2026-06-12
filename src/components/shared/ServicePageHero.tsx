/**
 * ServicePageHero
 * ───────────────
 * Reusable cinematic hero for ALL service pages.
 * Uses the same dark/dramatic style as the homepage.
 *
 * Props:
 *   title      — Main service name  e.g. "Roof Replacement"
 *   subtitle   — Short tagline      e.g. "Done Right. Done Fast."
 *   badge      — Trust chip text    e.g. "GAF Certified"
 *   bgImage    — Path from /public  e.g. "/drone-1.webp"
 *   ctaLabel   — Button text        e.g. "Get a Free Estimate"
 *   ctaHref    — Button target      e.g. "#contact"
 *   breadcrumb — Page name for breadcrumb
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ServicePageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  bgImage: string;
  ctaLabel?: string;
  ctaHref?: string;
  breadcrumb?: string;
  /** Optional second call-to-action */
  secondaryCta?: { label: string; href: string };
  /** Overlay darkness 0–1 (default 0.55) */
  overlayOpacity?: number;
  /** Accent colour (default red-600) */
  accentColor?: string;
  /** Horizontal alignment of all hero content (default 'left') */
  align?: 'left' | 'center';
}

const ServicePageHero: React.FC<ServicePageHeroProps> = ({
  title,
  subtitle,
  badge,
  bgImage,
  ctaLabel = 'Get a Free Estimate',
  ctaHref = '#contact',
  breadcrumb,
  secondaryCta,
  overlayOpacity = 0.55,
  accentColor = '#dc2626',
  align = 'left',
}) => {
  const isCenter = align === 'center';
  // Split title for animated word-by-word reveal
  const words = title.split(' ');

  return (
    <section className="relative w-full overflow-hidden h-[72vh] md:h-[82vh] min-h-[520px]">

      {/* ── Background image with Ken Burns slow zoom ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(0,0,0,${overlayOpacity * 0.8}) 0%,
              rgba(0,0,0,${overlayOpacity * 0.4}) 40%,
              rgba(0,0,0,${overlayOpacity}) 100%)`,
          }}
        />
        {/* Side vignette */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)' }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className={`absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 ${isCenter ? 'items-center text-center' : ''}`}>

        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div
            className={`text-white/60 text-sm tracking-widest uppercase mb-6 ${isCenter ? 'text-center' : 'text-center md:text-left'}`}
            style={{ whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <ChevronRight className="inline-block w-3 h-3 mx-2 align-middle" />
            <span className="text-white/70">{breadcrumb}</span>
          </motion.div>
        )}

        {/* Badge chip */}
        {badge && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider text-white border border-white/20 backdrop-blur-sm"
              style={{ backgroundColor: `${accentColor}33` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title — word-by-word reveal */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1 mb-4 max-w-4xl ${isCenter ? 'justify-center' : ''}`}>
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="block text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold text-white leading-none tracking-tight font-heading"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Accent line */}
        <motion.div
          className={`h-[3px] rounded-full mb-5 ${isCenter ? 'mx-auto' : ''}`}
          style={{ backgroundColor: accentColor }}
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className={`text-lg md:text-xl text-white/80 font-medium mb-8 max-w-xl ${isCenter ? 'mx-auto' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA buttons */}
        <motion.div
          className={`flex flex-wrap gap-3 ${isCenter ? 'justify-center' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
        >
          <motion.a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-bold text-sm md:text-base rounded-full shadow-2xl tracking-wide transition-colors duration-300"
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 35px ${accentColor}66` }}
            whileTap={{ scale: 0.97 }}
          >
            🏠 {ctaLabel}
          </motion.a>

          {secondaryCta && (
            <motion.a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm md:text-base rounded-full border border-white/25 transition-colors duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {secondaryCta.label}
            </motion.a>
          )}

          <motion.a
            href="tel:2067398232"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm md:text-base rounded-full border border-white/25 transition-colors duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            📞 (206) 739-8232
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scroll indicator line ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </section>
  );
};

export default ServicePageHero;
