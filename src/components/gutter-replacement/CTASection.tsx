import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-navy relative overflow-hidden">
      {/* subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Stop Worrying About Your Gutters?
          </motion.h2>
          <motion.p
            className="text-white/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Free measurement, free written quote, and no high-pressure sales pitch. We come
            out, walk your roofline, and email you the numbers — usually the same day.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#book-gutters"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stark-red hover:bg-stark-red/90 text-white font-bold rounded-full shadow-2xl transition-all hover:scale-[1.03]"
            >
              Book My Free Quote
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+12067398232"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/25 backdrop-blur-sm transition-colors"
            >
              <Phone className="w-5 h-5" />
              (206) 739-8232
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
