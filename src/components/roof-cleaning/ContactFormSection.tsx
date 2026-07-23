import React from 'react';
import QuickQuoteSection from '@/components/shared/QuickQuoteSection';

/**
 * Roof cleaning lead-capture section.
 * Defaults to "inspection" since the booking form doesn't have a dedicated
 * cleaning service value.
 */
const ContactFormSection = () => {
  return (
    <QuickQuoteSection
      title="Schedule Your Roof Cleaning"
      subtitle="Free inspection first — we'll show you exactly what needs cleaning."
      defaultService="inspection"
      background="gray"
      padding="section"
      id="schedule-form"
    />
  );
};

export default ContactFormSection;
