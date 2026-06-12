import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, MapPin, Clock, ShieldCheck } from 'lucide-react';

/**
 * O Bee Credit Union — Stark Roofing contractor-channel financing.
 *
 * Program details (contractor channel, per O Bee April 2026):
 *  - Rates from 8.24% APR (no dealer fee) or 4.24% APR (with 6% dealer fee)
 *  - Terms up to 120 months (10 years)
 *  - Loans up to $75,000
 *  - No payments for 3 months available on all loans if requested prior to funding
 *
 * The application URL below is the Stark-specific O Bee Link portal that routes
 * all applications to our business. Do not swap in the public obee.com consumer
 * loan URL — that product is not available through this channel.
 */

const OBEE_APPLY_URL =
  'https://obee.merchantlinq.com/customer?t=anRPeVpHdU5lZzdNdHFrZ0FkWUI3cFdVbk5ZWkVvSmRmMGpjbzQ1ZW93bXNnbXYxb2l4MEhWKjF4OEdMN3JvY0k1Y2ljRTJjMXNlWVRBTGZXMUQ5c05Sb05Jb1dMa1h4UURDMUtJa2g4WVhOVzV4OUJBOU1HRXVWREF6TEJ3dXBkUkIxNypTQ2dNSEhENUVyR3FIZGptTkgqUzkqUzUqMWNUTEJ4dWZSVTRlQWVhRURxbGM4ME53UmxWeWV4azBaeGg5UU9zNWRzb2RnRGlIUSpTMm1MQllJN3Y4Z3hGdHQ4SmJtN1FEOXFNVklBYW5OND0=';

const OBeePartnerSection = () => {
  return (
    <section
      id="obee-partner"
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e8eef4 100%)' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* ── Section header ── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/10 text-stark-red mb-4">
              Our Financing Partner
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Financing Through O Bee Credit Union
            </h2>
            <p className="text-base md:text-lg text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              Stark Roofing &amp; Renovation finances roofs, gutters, windows, and siding
              through O Bee Credit Union — a Washington State credit union with branches
              in Pierce County. Not a national fintech. Not a high-interest "buy now pay
              later" gimmick. A real local credit union that understands home
              improvement.
            </p>
          </div>

          {/* ── Main partner card ── */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-10">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Left: Summary / apply CTA */}
              <div className="md:col-span-2 p-8 md:p-10 flex flex-col items-center justify-center bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 text-center">
                <div className="text-[11px] uppercase tracking-wide text-charcoal/55 font-bold mb-2">
                  Apply Through Stark
                </div>
                <div className="font-heading text-2xl font-extrabold text-navy mb-3 leading-tight">
                  Home Improvement Financing
                </div>
                <p className="text-sm text-charcoal/70 mb-5 leading-snug">
                  Apply in minutes through our O Bee partner portal. Your application
                  routes directly to Stark.
                </p>
                <a
                  href={OBEE_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-stark-red hover:bg-stark-red/90 shadow-lg hover:shadow-xl transition-all w-full"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
                <div className="mt-5 flex items-center justify-center gap-3 text-[10px] text-charcoal/60">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} /> Lacey · Tacoma · WA
                  </span>
                </div>
              </div>

              {/* Right: Program facts */}
              <div className="md:col-span-3 p-8 md:p-10 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-navy mb-2 text-center md:text-left">
                  Program Details
                </h3>
                <p className="text-sm text-charcoal/70 mb-5 text-center md:text-left">
                  Loans sized for roofing and exterior projects — roof replacements,
                  gutters, windows, and siding.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-1">
                      Rates from
                    </div>
                    <div className="text-2xl font-extrabold text-navy">
                      8.24<span className="text-base font-bold">%</span>
                    </div>
                    <div className="text-[10px] text-charcoal/55">APR*</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-1">
                      Terms up to
                    </div>
                    <div className="text-2xl font-extrabold text-navy">
                      10<span className="text-base font-bold"> yrs</span>
                    </div>
                    <div className="text-[10px] text-charcoal/55">120 months</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-1">
                      Loans up to
                    </div>
                    <div className="text-2xl font-extrabold text-navy">$75K</div>
                    <div className="text-[10px] text-charcoal/55">Per project</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 inline-block text-left mx-auto md:mx-0 md:block">
                  {[
                    'No payments for the first 3 months (if requested prior to funding)',
                    'No prepayment penalty — pay it off early, save the interest',
                    'Fast decisions — most applications get answered the same day',
                    'Rates as low as 4.24% APR available with a 6% dealer fee option',
                    'Stark handles the application process with you, start to finish',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2
                        className="flex-shrink-0 mt-0.5 text-stark-red"
                        size={18}
                      />
                      <span className="text-sm text-charcoal/85 leading-snug">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start">
                  <a
                    href={OBEE_APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-stark-red hover:bg-stark-red/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    Apply at O Bee
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href="tel:+12067398232"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-stark-red border-2 border-stark-red hover:bg-stark-red/5 transition-colors"
                  >
                    Talk to Stark First
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Three-column proof strip ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm">
              <Clock size={22} className="mx-auto mb-2 text-stark-red" />
              <div className="text-3xl font-extrabold text-navy">$75K</div>
              <div className="text-xs text-charcoal/70 font-medium mt-1">
                Maximum loan amount
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm">
              <ShieldCheck size={22} className="mx-auto mb-2 text-stark-red" />
              <div className="text-3xl font-extrabold text-navy">120</div>
              <div className="text-xs text-charcoal/70 font-medium mt-1">
                Months — terms up to 10 years
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm">
              <CheckCircle2 size={22} className="mx-auto mb-2 text-stark-red" />
              <div className="text-3xl font-extrabold text-navy">3 mo.</div>
              <div className="text-xs text-charcoal/70 font-medium mt-1">
                No payments at start of loan
              </div>
            </div>
          </motion.div>

          {/* ── Disclaimer ── */}
          <p className="text-[11px] text-charcoal/50 leading-snug mt-6 max-w-3xl mx-auto text-center">
            * APR (Annual Percentage Rate) from 8.24% with no dealer fee; from 4.24%
            with a 6% dealer fee. Rates subject to change and credit approval. All
            loans are made by O Bee Credit Union. Loan terms, maximum amount, and
            final APR are determined solely by O Bee Credit Union based on your credit
            profile and the project scope. Stark Roofing &amp; Renovation is a
            participating O Bee Link contractor partner.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OBeePartnerSection;
