
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6 text-center">
            Request Your Free Roof Inspection
          </h2>
          <p className="text-charcoal/80 mb-8 text-center">
            Our expert team will thoroughly inspect your roof and provide a detailed assessment of any issues and repair options.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">Contact Us Today</h3>
                <p className="text-charcoal/80 mb-6">
                  Fill out the form and one of our roofing specialists will contact you within 24 hours to schedule your free inspection.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <ChevronRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                    <span className="ml-2">No obligation consultation</span>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                    <span className="ml-2">Detailed digital roof analysis</span>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                    <span className="ml-2">Clear repair recommendations</span>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                    <span className="ml-2">Transparent pricing with no hidden costs</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield className="text-stark-red mr-2" size={24} />
                  <span className="text-navy font-medium">GAF Certified Contractor</span>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <Button asChild className="w-full bg-stark-red hover:bg-navy text-white font-medium py-3 mb-4">
                  <Link to="/contact">Schedule Free Inspection</Link>
                </Button>
                
                <div className="text-center">
                  <p className="text-charcoal/80 mb-2">Or call us directly:</p>
                  <a 
                    href="tel:+12067398232" 
                    className="text-xl font-bold text-navy hover:text-stark-red transition-colors"
                  >
                    (206) 739-8232
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
