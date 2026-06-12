
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/services/ContactForm';
import { MessageSquare, Phone } from 'lucide-react';

const WindowContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-1 bg-stark-red mb-6 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Get Your Free Window Consultation
            </h2>
            <p className="text-charcoal/80 max-w-2xl mx-auto">
              Fill out the form below and one of our window experts will contact you to schedule your free consultation and estimate.
            </p>
          </motion.div>
          
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <ContactForm />
            </div>

            <div className="bg-navy text-white p-6 rounded-xl shadow-lg text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="mb-6 text-white/80">Our window experts are ready to answer your questions and provide guidance.</p>
              
              <div className="space-y-4">
                <a href="tel:206-739-8232" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-left">
                  <div className="bg-stark-red p-2 rounded-full">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Call Now</p>
                    <p className="font-bold">206-739-8232</p>
                  </div>
                </a>

                <a href="mailto:office@starkroofingrenovation.com" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-left">
                  <div className="bg-stark-red p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Email Us</p>
                    <p className="font-bold">office@starkroofingrenovation.com</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg text-left">
                <h4 className="font-bold mb-2">Our Promise</h4>
                <ul className="text-sm space-y-2 text-white/80">
                  <li>• Free, no-obligation consultation</li>
                  <li>• Detailed quotes with no hidden costs</li>
                  <li>• Expert installation by certified professionals</li>
                  <li>• Industry-leading warranties</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WindowContactSection;
