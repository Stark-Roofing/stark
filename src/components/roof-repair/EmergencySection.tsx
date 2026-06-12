
import React from 'react';
import { Clock, Calendar, Phone } from 'lucide-react';

const EmergencySection = () => {
  return <section className="py-12 md:py-16 bg-stark-red text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            24/7 Emergency Roof Repair
          </h2>
          <p className="text-white/90 mb-8 leading-relaxed max-w-xl">
            When storms or unexpected damage threaten your home, our emergency repair team is ready to respond quickly to protect your property.
          </p>
          <div className="flex items-center mb-4">
            <Clock className="mr-3" size={24} />
            <span className="font-medium">Fast response times to minimize damage</span>
          </div>
          <div className="flex items-center mb-8">
            <Calendar className="mr-3" size={24} />
            <span className="font-medium">Available nights, weekends, and holidays</span>
          </div>
          <a href="tel:+12067398232" className="inline-flex items-center bg-white text-stark-red font-bold px-6 py-3 rounded-md hover:bg-navy hover:text-white transition-colors">
            <Phone size={18} className="mr-2" />
            Call our emergency line
          </a>
        </div>
      </div>
    </section>;
};

export default EmergencySection;
