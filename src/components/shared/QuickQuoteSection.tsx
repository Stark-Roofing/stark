import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Award, CheckCircle2 } from 'lucide-react';
import QuickQuoteForm from './QuickQuoteForm';

interface QuickQuoteSectionProps {
  /** Big headline above the form. Defaults to a strong booking-oriented CTA. */
  title?: string;
  /** Optional subline rendered between title and form. */
  subtitle?: string;
  /** Pre-select a service in step 1 (e.g. "roof-repair", "storm-damage"). */
  defaultService?: string;
  /** Section background. */
  background?: 'white' | 'gray' | 'gradient';
  /** Vertical padding. Defaults to a comfortable section size.
   *  'section' opts into the site-wide .section-padding scale so this
   *  section matches surrounding homepage sections exactly. */
  padding?: 'compact' | 'normal' | 'large' | 'section';
  /** Optional id so anchor links (#schedule-form) keep working. */
  id?: string;
}

/**
 * Standardized lead-capture section: title + reassurance + the full
 * 4-step QuickQuoteForm (service → address → date/time → contact).
 *
 * Use this anywhere you want customers to actually BOOK an appointment,
 * not just leave a phone number. Replaces the old GetStartedForm /
 * HorizontalContactForm 5-field forms across the site.
 */
const QuickQuoteSection: React.FC<QuickQuoteSectionProps> = ({
  title = 'Get Your Free Roof Estimate',
  subtitle = 'Same-day reply. No pressure, no obligation — we confirm by text within minutes.',
  defaultService,
  background = 'gradient',
  padding = 'normal',
  id,
}) => {
  const bgClass =
    background === 'white'
      ? 'bg-white'
      : background === 'gray'
      ? 'bg-gray-50'
      : 'bg-gradient-to-b from-gray-50 to-white';

  const padClass =
    padding === 'compact'
      ? 'py-8 md:py-10'
      : padding === 'large'
      ? 'py-16 md:py-24'
      : padding === 'section'
      ? 'section-padding'
      : 'py-12 md:py-16';

  return (
    <section id={id} className={`relative z-30 ${bgClass} ${padClass}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-2">
              {title}
            </h2>
            <p className="text-charcoal/75 text-base md:text-lg">{subtitle}</p>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs md:text-sm text-charcoal/70 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-stark-red" /> GAF Certified
              </span>
              <span className="text-charcoal/30">•</span>
              <span className="flex items-center gap-1.5">
                <Award size={14} className="text-stark-red" /> 30+ Years
              </span>
              <span className="text-charcoal/30">•</span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-stark-red fill-stark-red" /> 2,000+ Roofs
              </span>
              <span className="text-charcoal/30">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-stark-red" /> Licensed &amp; Bonded WA
              </span>
            </div>
          </div>

          {/* The form card — single-step form, natural height. */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
            <QuickQuoteForm defaultService={defaultService} />
          </div>

          {/* Below-form reassurance */}
          <p className="text-center text-xs text-charcoal/60 mt-4">
            Prefer to talk? Call{' '}
            <a href="tel:+12067398232" className="text-stark-red font-semibold">
              (206) 739-8232
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickQuoteSection;
