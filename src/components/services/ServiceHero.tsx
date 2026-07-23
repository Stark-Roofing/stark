
import React from 'react';

const ServiceHero = () => {
  return (
    <section className="hero-overlay relative pt-32 pb-20 md:py-32">
      <img 
        src="/lovable-uploads/914cc0c5-2671-4ac1-9f5b-ba2bf58fb412.webp" 
        alt="Professional Asphalt Shingle Roof" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      <div className="absolute inset-0 bg-navy/60"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 animate-fade-in">
            Our Roofing Services
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Premium roofing solutions including asphalt, metal, TPO, slate, clay tile, and cedar shake options, all installed by certified professionals for lasting protection.
          </p>
          <div className="animate-fade-in flex justify-center" style={{ animationDelay: '400ms' }}>
            <a href="/contact" className="btn-primary">
              Get a Free Estimate →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
