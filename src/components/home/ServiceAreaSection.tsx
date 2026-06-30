
import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ServiceAreaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <motion.div 
            className="flex-1 order-last md:order-first"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src="/lovable-uploads/1fdb5c0c-5cfa-4535-9e2b-5cdadff4d44a.webp" 
                alt="Stark Roofing Service Area Map - Greater Seattle Area"
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
          
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <MapPin size={20} className="text-stark-red" />
              <span className="text-sm font-medium text-stark-red uppercase tracking-wider">Our Service Areas</span>
            </div>
            <h2 className="section-title mb-4 text-center md:text-left">Proudly Serving the Greater Seattle Area</h2>
            <h3 className="text-xl text-navy font-medium mb-4 text-center md:text-left">Wherever You Are, We've Got You Covered</h3>
            <p className="text-lg text-charcoal/80 mb-6 text-center md:text-left leading-relaxed">
              We've built our reputation on trust, reliability, and delivering exceptional results for homeowners throughout the region. Whether you're in Seattle, Tacoma, Bellevue, or anywhere in between — we're just a call away and ready to help with roofing, gutters, and remodeling services.
            </p>

            <div className="mt-6">
              <Link to="/contact" className="inline-block">
                <Button
                  className="bg-stark-red hover:bg-stark-redHover text-white font-semibold px-8 py-3"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
