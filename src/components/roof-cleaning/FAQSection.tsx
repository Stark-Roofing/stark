
import React from 'react';
import FAQList from './faq/FAQList';
import { faqData } from './faq/faqData';
import FAQSchema from '@/components/shared/FAQSchema';

const FAQSection = () => {
  return (
    <section className="section-padding bg-white">
      <FAQSchema faqs={faqData} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal/80 max-w-3xl mx-auto">
            Get answers to common questions about our professional roof cleaning services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
          <FAQList faqs={faqData} />
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <a href="#contact" className="bg-stark-red hover:bg-stark-redHover text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 ease-in-out">
            Contact Our Experts
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
