import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloudLightning, ArrowRight } from 'lucide-react';

const StormDamageSection: React.FC = () => {
  return (
    <section className="bg-stark-red py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 text-center md:text-left">
            <CloudLightning size={28} className="text-white shrink-0 animate-pulse" />
            <div>
              <h2 className="text-white font-heading font-bold text-lg md:text-xl">
                Storm Damage? We Respond Fast.
              </h2>
              <p className="text-white/85 text-sm md:text-base">
                Same-week inspections and full insurance claim support across Seattle and surrounding areas.
              </p>
            </div>
          </div>

          <Link
            to="/storm-damage"
            className="inline-flex items-center gap-2 bg-white text-stark-red font-semibold px-5 py-2.5 rounded-full text-sm md:text-base hover:bg-white/90 transition-colors shrink-0"
          >
            Learn More
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StormDamageSection;
