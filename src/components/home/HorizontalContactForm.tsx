import React from 'react';
import QuickQuoteSection from '@/components/shared/QuickQuoteSection';

/**
 * Home page lead-capture section.
 * Now powered by QuickQuoteSection (4-step booking form with date/time picker).
 */
const HorizontalContactForm = () => {
  return (
    <QuickQuoteSection
      title="Book Your Free Roof Estimate"
      subtitle="Pick a day & time that works — we confirm by text within minutes."
      background="white"
      padding="section"
      id="quote-form"
    />
  );
};

export default HorizontalContactForm;
