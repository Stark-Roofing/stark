import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
const MaterialsSection = () => {
  return <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.7
      }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-navy">Premium Roofing Materials</h2>
          <p className="text-lg md:text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            We exclusively use industry-leading materials to ensure your new roof provides superior protection, lasting beauty, and enhanced curb appeal.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="rounded-xl overflow-hidden shadow-lg">
            <img loading="lazy" decoding="async" src="/lovable-uploads/76a0726c-7d0d-46bf-9197-61dd7784b64b.webp" alt="Complete GAF roofing system components" className="w-full h-auto object-cover" />
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="text-center md:text-left self-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-stark-red mb-6 text-center md:text-left">Complete Roofing System</h3>
            <p className="text-charcoal/80 mb-6 text-center md:text-left leading-relaxed">
              Our premium roof replacement includes a complete system of components that work together to provide maximum protection for your home:
            </p>
            <ul className="grid grid-cols-1 gap-4 mb-6 text-left">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-stark-red/10 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-stark-red" />
                </div>
                <span className="text-charcoal/80">Premium architectural shingles with enhanced wind resistance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-stark-red/10 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-stark-red" />
                </div>
                <span className="text-charcoal/80">Advanced synthetic underlayment for moisture protection</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-stark-red/10 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-stark-red" />
                </div>
                <span className="text-charcoal/80">Ice and water shield barriers for vulnerable areas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-stark-red/10 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-stark-red" />
                </div>
                <span className="text-charcoal/80">Proper attic ventilation system for temperature regulation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-stark-red/10 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-stark-red" />
                </div>
                <span className="text-charcoal/80">Quality ridge cap shingles for added protection and aesthetic appeal</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-stark-red/10 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-stark-red" />
                </div>
                <span className="text-charcoal/80">Proper flashing installation around roof penetrations</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
              <Link to="/warranty">
                <Button variant="outline" className="border-stark-red text-stark-red hover:bg-stark-red hover:text-white">
                  Learn About Our Warranty
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-stark-red text-white hover:bg-stark-red/90">
                  Get a Free Estimate
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default MaterialsSection;