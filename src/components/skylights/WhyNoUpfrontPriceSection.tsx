import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Ruler, Layers, Settings } from 'lucide-react';
import QuickQuoteButton from '@/components/shared/QuickQuoteButton';

const FACTORS = [
  {
    icon: HelpCircle,
    title: 'New install or replacement?',
    body: 'Replacing an existing skylight (curb, flashing, drywall already there) is a totally different job from cutting a brand-new opening through your roof and ceiling. Different cost, different timeline.',
  },
  {
    icon: Ruler,
    title: 'Size and model',
    body: "A small fixed skylight in a stairwell vs. a large solar-powered \"Fresh Air\" model in a vaulted kitchen — those are different products at different price points. We don't pretend they're the same.",
  },
  {
    icon: Layers,
    title: 'Roof type and pitch',
    body: 'Composition shingle, metal, tile, low-slope — each requires different flashing kits and labor. Your roof pitch and the framing underneath also affect how much carpentry is involved.',
  },
  {
    icon: Settings,
    title: 'Interior finish work',
    body: "Some installs need a drywall light shaft built down through the attic. Some don't. Whether you want it painted to match, trimmed out, or left clean — all of that changes the quote.",
  },
];

const WhyNoUpfrontPriceSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title text-center">"How Much Does a Skylight Cost?"</h2>
            <p className="section-subtitle text-center">
              The honest answer: it depends — and any contractor who quotes you a flat number over the phone before seeing your roof is guessing. Here's what actually moves the price.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {FACTORS.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-amber-100 p-2.5 rounded-lg h-fit flex-shrink-0">
                    <Icon size={20} className="text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">{f.title}</h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed">{f.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-navy text-white rounded-2xl p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Free Estimate. No Pressure. No Surprises.</h3>
            <p className="text-white/85 mb-6 max-w-2xl mx-auto">
              We come out, look at the actual spot, measure, and give you a clear written quote with the model, the labor, and the warranty all spelled out. Takes about 30 minutes — and you'll know exactly what your project costs before we lift a hammer.
            </p>
            <QuickQuoteButton
              defaultService="skylight"
              label="Get My Free Skylight Quote"
              dialogTitle="Free Skylight Estimate"
              size="lg"
              className="shadow-xl"
            />
            <p className="text-xs text-white/60 mt-4">
              Or call <a href="tel:+12067398232" className="text-amber-300 font-semibold">(206) 739-8232</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNoUpfrontPriceSection;
