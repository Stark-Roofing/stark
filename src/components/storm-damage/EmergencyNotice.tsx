import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';

/**
 * Thin emergency strip rendered between the hero and the booking form.
 * One job: catch the homeowner with an active leak who needs to call NOW
 * instead of filling out a form.
 */
const EmergencyNotice = () => {
  return (
    <section className="bg-stark-red text-white py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center text-center">
            <AlertCircle className="mr-3 flex-shrink-0" size={22} />
            <p className="font-medium text-sm md:text-base">
              <strong>Active leak right now?</strong> Don't wait — call us for same-day emergency tarping.
            </p>
          </div>
          <a
            href="tel:+12067398232"
            className="inline-flex items-center gap-2 bg-white text-stark-red font-bold py-2.5 px-5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap shadow-md"
          >
            <Phone size={18} />
            (206) 739-8232
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmergencyNotice;
