
import React from 'react';
import QuickQuoteForm from '@/components/shared/QuickQuoteForm';
import { FIRST_SCREEN_COPY as COPY } from './firstScreenCopy';

/**
 * Bottom-of-page form on /roof-replacement. Uses the SAME short QuickQuoteForm
 * as the hero (name, phone, email, ZIP, optional service) so the page never
 * shows two different forms. Previously rendered the shared
 * services/ContactForm (QuickQuoteSection, full form incl. street address,
 * "Pick a service and a time" subtitle); that shared component is untouched
 * and still used by the other pages that import it.
 */
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-navy">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 text-center max-w-2xl mx-auto">
            Get Your Free Roof Replacement Estimate
          </h2>
          <p className="text-white/80 mb-10 text-center max-w-2xl mx-auto leading-relaxed">
            Fill out the form below and one of our roofing experts will contact you to schedule your free inspection and estimate.
          </p>

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
            <QuickQuoteForm
              variant="short"
              defaultService="roof-replacement"
              subtitle={COPY.formSubtitle}
              footnote={COPY.formFootnote}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
