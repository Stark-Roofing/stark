
import React from 'react';
import { Link } from 'react-router-dom';
import { OBEE_APPLY_URL } from './obeeConfig';

const HeroSection = () => {
  return (
    <section className="pt-40 pb-20 md:py-32 relative">
      <img 
        src="/lovable-uploads/134c865a-a179-4974-9b1d-84bf099ee456.webp" 
        alt="Modern home with blue metal roof" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-navy/70"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-stark-red text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Financing Options</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
            Affordable Financing Solutions
          </h1>
          <p className="text-xl text-white/80 mb-8 mx-auto max-w-2xl">
            Upgrade your home with flexible payment options that fit your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#payment-options" className="btn-primary">
              View Payment Options
            </a>
            <a
              href={OBEE_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
