import React from 'react';
import { Sun, Phone } from 'lucide-react';
import QuickQuoteButton from '@/components/shared/QuickQuoteButton';

const ContactCTA = () => {
  return (
    <section
      id="contact"
      className="relative section-padding bg-gradient-to-br from-navy via-navy to-slate-900 text-white overflow-hidden"
    >
      {/* decorative sun */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-stark-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-200 text-sm font-semibold mb-5">
            <Sun size={16} /> VELUX Certified Installer
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5">
            Ready to Bring in the Light?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            Tell us where you'd like the skylight and we'll come measure for free. 60 seconds to start — we'll text you back fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <QuickQuoteButton
              defaultService="skylight"
              label="Get My Free Skylight Quote"
              dialogTitle="Free Skylight Estimate"
              size="lg"
              className="shadow-2xl"
            />
            <a
              href="tel:+12067398232"
              className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 font-semibold text-lg"
            >
              <Phone size={20} /> (206) 739-8232
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-white/60 flex-wrap">
            <span>✓ Free in-home estimate</span>
            <span>✓ No obligation</span>
            <span>✓ Written quote, no surprises</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
