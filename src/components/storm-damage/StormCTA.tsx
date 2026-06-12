
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const StormCTA = () => {
  return (
    <section id="assessment" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f2d778a8-6a06-4b67-b818-0efd8075593e.webp"
          alt="Seattle skyline with Space Needle and Mount Rainier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/70"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Don't Play Roof Detective—Get a Free Storm Damage Inspection
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Schedule your free storm damage assessment today. Our experts will thoroughly inspect your property and provide honest recommendations.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a href="tel:+12067398232" className="btn-primary flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Call for Emergency Service
            </a>
            <Link to="/services" className="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20 flex items-center justify-center">
              <CalendarCheck className="mr-2 h-5 w-5" />
              Schedule Free Inspection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StormCTA;
