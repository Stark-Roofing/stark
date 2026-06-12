
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const WarrantyCTA = () => {
  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-custom-redmond.webp"
          alt="Pacific Northwest neighborhood with quality shingle roofs and Mt. Rainier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready for Lasting Protection?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our industry-leading warranty and schedule your free roof inspection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/services" className="btn-primary inline-flex items-center justify-center h-12">
                Get Free Inspection
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
            >
              <a href="tel:+12067398232" className="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20 inline-flex items-center justify-center h-12">
                <Phone size={16} className="mr-2" />
                Call (206) 739-8232
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantyCTA;
