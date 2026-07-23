
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import ContactForm from '@/components/services/ContactForm';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ServiceSchema from '@/components/shared/ServiceSchema';

const SidingInstallation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Siding Installation Seattle WA | Stark Roofing & Renovation',
    description: 'James Hardie and fiber cement siding installation for Seattle area homes. Built for PNW rain and moisture. Free estimate today: (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/siding-installation',
    keywords: 'siding installation Seattle, siding replacement, James Hardie siding, fiber cement siding, home exterior',
    ogTitle: 'Siding Installation | Stark Roofing & Renovation',
    ogDescription: 'James Hardie fiber cement siding for Seattle area homes. Built for PNW rain and moisture.',
    ogImage: 'https://starkroofingrenovation.com/lovable-uploads/18812f3e-7163-4286-8680-afe230724e99.webp',
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Siding Installation"
        description="Professional siding installation in Seattle & Puget Sound. James Hardie & premium materials. Transform your home. Free estimates. Call 206-739-8232."
        url="https://starkroofingrenovation.com/siding-installation"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="hero-overlay relative pt-32 pb-20 md:py-32">
        <img 
          src="/lovable-uploads/18812f3e-7163-4286-8680-afe230724e99.webp" 
          alt="Professional siding installation" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 animate-fade-in">
              Professional Siding Installation
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Transform your home's appearance and enhance its protection with our premium siding installation services.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <a href="#contact" className="btn-primary">
                Get a Free Estimate →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-title text-center">Why Install New Siding?</h2>
          <p className="section-subtitle text-center">
            New siding does much more than just improve your home's appearance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="glass-card p-6 text-center flex flex-col items-center">
              <div className="bg-stark-red/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stark-red">
                  <path d="M12 3v12"/>
                  <path d="m8 11 4 4 4-4"/>
                  <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Energy Efficiency</h3>
              <p className="text-charcoal/80">
                Modern siding with proper insulation can reduce energy costs by up to 20% by maintaining consistent indoor temperatures year-round.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center flex flex-col items-center">
              <div className="bg-stark-red/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stark-red">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8"/>
                  <path d="M15 18h-5"/>
                  <path d="M10 6h8v4h-8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Increased Home Value</h3>
              <p className="text-charcoal/80">
                New siding provides one of the highest returns on investment of any home improvement project, recovering up to 80% of its cost in added home value.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center flex flex-col items-center">
              <div className="bg-stark-red/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stark-red">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Weather Protection</h3>
              <p className="text-charcoal/80">
                Quality siding forms a protective barrier against moisture, wind, and extreme temperatures, preventing structural damage and mold growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-title text-center">Our Installation Process</h2>
          <p className="section-subtitle text-center">
            We follow a proven process to ensure high-quality results and minimal disruption to your daily life
          </p>
          
          <div className="mt-12 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="md:flex items-center mb-12 relative">
              <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-stark-red flex items-center justify-center text-white font-bold">1</div>
              </div>
              
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                <div className="md:flex md:justify-end">
                  <div className="md:max-w-md glass-card p-6 text-center md:text-left">
                    <h3 className="text-xl font-heading font-bold text-navy mb-3">Consultation & Assessment</h3>
                    <p className="text-charcoal/80">
                      Our experts will meet with you to discuss your needs, preferences, and budget. We'll perform a thorough assessment of your home's exterior to identify any underlying issues.
                    </p>
                    <div className="md:hidden flex items-center justify-center mt-4">
                      <div className="w-8 h-8 rounded-full bg-stark-red flex items-center justify-center text-white font-bold mr-3">1</div>
                      <span className="text-navy font-medium">First Step</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="md:hidden h-8 w-1 bg-gray-200 mx-auto mb-6"></div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="md:flex items-center mb-12 relative">
              <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-stark-red flex items-center justify-center text-white font-bold">2</div>
              </div>
              
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:order-2">
                <div className="md:flex md:justify-start">
                  <div className="md:max-w-md glass-card p-6 text-center md:text-left">
                    <h3 className="text-xl font-heading font-bold text-navy mb-3">Design & Material Selection</h3>
                    <p className="text-charcoal/80">
                      Choose from our wide selection of high-quality siding materials, colors, and styles. Our team will provide samples and digital renderings to help you visualize the final result.
                    </p>
                    <div className="md:hidden flex items-center justify-center mt-4">
                      <div className="w-8 h-8 rounded-full bg-stark-red flex items-center justify-center text-white font-bold mr-3">2</div>
                      <span className="text-navy font-medium">Second Step</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 md:order-1">
                <div className="md:hidden h-8 w-1 bg-gray-200 mx-auto mb-6"></div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="md:flex items-center mb-12 relative">
              <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-stark-red flex items-center justify-center text-white font-bold">3</div>
              </div>
              
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                <div className="md:flex md:justify-end">
                  <div className="md:max-w-md glass-card p-6 text-center md:text-left">
                    <h3 className="text-xl font-heading font-bold text-navy mb-3">Removal & Preparation</h3>
                    <p className="text-charcoal/80">
                      We'll carefully remove old siding, inspect for and repair any structural damage, and prepare the surface with proper moisture barriers and insulation for optimal performance.
                    </p>
                    <div className="md:hidden flex items-center justify-center mt-4">
                      <div className="w-8 h-8 rounded-full bg-stark-red flex items-center justify-center text-white font-bold mr-3">3</div>
                      <span className="text-navy font-medium">Third Step</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="md:hidden h-8 w-1 bg-gray-200 mx-auto mb-6"></div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="md:flex items-center relative">
              <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-stark-red flex items-center justify-center text-white font-bold">4</div>
              </div>
              
              <div className="md:w-1/2 md:pr-12 md:order-2">
                <div className="md:flex md:justify-start">
                  <div className="md:max-w-md glass-card p-6 text-center md:text-left">
                    <h3 className="text-xl font-heading font-bold text-navy mb-3">Professional Installation & Cleanup</h3>
                    <p className="text-charcoal/80">
                      Our certified installers will expertly install your new siding according to manufacturer specifications and industry best practices. We'll conduct a thorough cleanup, leaving your property spotless.
                    </p>
                    <div className="md:hidden flex items-center justify-center mt-4">
                      <div className="w-8 h-8 rounded-full bg-stark-red flex items-center justify-center text-white font-bold mr-3">4</div>
                      <span className="text-navy font-medium">Final Step</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 md:order-1">
                <div className="md:hidden h-8 w-1 bg-gray-200 mx-auto mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and estimate on your siding installation project. Our experts are ready to help you choose the perfect siding solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-stark-red hover:bg-stark-red/90 text-white">
                <a href="#contact">Get a Free Estimate</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section-padding bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 text-center">
              Contact Us for a Free Estimate
            </h2>
            <p className="text-charcoal/80 mb-8 text-center">
              Fill out the form below and one of our siding experts will contact you to schedule your free consultation and estimate.
            </p>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <FloatingCTA label="Free Siding Estimate" />
      <Footer />
    </div>
  );
};

export default SidingInstallation;
