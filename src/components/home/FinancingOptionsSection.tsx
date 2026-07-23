
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FinancingOptionsSection: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-6 text-center md:text-left">Unlock Financing Options</h2>
            <p className="text-lg text-charcoal/80 mb-8 text-center md:text-left leading-relaxed">
              Applying for financing is a breeze with our user-friendly application process. Whether you're eyeing a full roof replacement or a smaller gutter installation project, our financing process makes it hassle-free.
            </p>
            <p className="text-lg text-charcoal/80 mb-8 text-center md:text-left leading-relaxed">
              Through our O Bee Credit Union partnership, you can request loans up to $75,000 with terms up to 120 months and rates starting at 8.24% APR. Most applications get a same-day decision, and financing is typically secured within 2–3 business days. No need to delay your home improvement!
            </p>
            <div className="mt-8">
              <Link
                to="/finance"
                className="btn-primary inline-flex items-center justify-center text-lg px-8 py-3"
              >
                See Our Options
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 order-first md:order-last"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/9169ba8d-6805-4020-bba5-be0113bfc881.webp" 
                alt="Mother and child applying for home financing online"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinancingOptionsSection;
