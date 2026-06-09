import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Thin emergency strip rendered between the hero and the booking form.
 * One job: catch the homeowner with an active leak who needs same-day
 * emergency tarping.
 */
const EmergencyNotice = () => {
  return (
    <section className="bg-stark-red text-white py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center text-center">
            <AlertCircle className="mr-3 flex-shrink-0" size={22} />
            <p className="font-medium text-sm md:text-base">
              <strong>Active leak right now?</strong> Don't wait — request same-day emergency tarping.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-stark-red font-bold py-2.5 px-5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap shadow-md"
          >
            Request Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmergencyNotice;
