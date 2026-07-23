
import React from 'react';
import GetStartedForm from '@/components/shared/GetStartedForm';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-stark-red">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-6 text-center text-white md:text-4xl">
            Ready for a Cleaner, Healthier Roof?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-16 text-center max-w-2xl mx-auto leading-relaxed">
            Contact us today to schedule your professional roof cleaning service and restore your roof's appearance.
          </p>

          <GetStartedForm
            title="Schedule Roof Cleaning"
            buttonText="Get Free Quote"
            formColor="red"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
