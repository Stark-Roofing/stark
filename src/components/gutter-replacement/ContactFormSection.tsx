
import React from 'react';
import ContactForm from '@/components/services/ContactForm';

const ContactFormSection = () => {
  return (
    <section id="book-gutters" className="section-padding bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
