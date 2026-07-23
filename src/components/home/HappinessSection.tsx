
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const HappinessSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-stark-red mb-2 text-center md:text-left">
              Your Peace of Mind Is Our #1 Priority
            </h2>
            <p className="text-base md:text-lg font-semibold text-stark-red/80 mb-4 text-center md:text-left">
              A personal note from Brenda Scarllet — Owner, Stark Roofing &amp; Renovation
            </p>
            <p className="text-lg text-[#333333] mb-4 text-center md:text-left leading-relaxed">
              Hi, I'm Brenda. When you invite us onto your property, you're trusting us with the place you call home — and I don't take that lightly. My family and I built Stark Roofing &amp; Renovation on a simple promise: treat every house like it's our own, and every homeowner like a neighbor.
            </p>
            <p className="text-lg text-[#333333] mb-6 text-center md:text-left leading-relaxed">
              With over 30 years of experience and more than 2,000 roofs completed across King, Snohomish, and Pierce counties, our crew shows up on time, communicates clearly, and stands behind every nail we drive. Whether you're weathering a Pacific Northwest storm or finally giving your home the upgrade it deserves, you'll have my word — and my number — every step of the way.
            </p>

            <div className="mt-6">
              <Link to="/contact" className="inline-block">
                <Button
                  className="bg-stark-red hover:bg-stark-redHover text-white font-semibold px-8 py-3 flex items-center gap-2"
                >
                  <Calendar size={18} />
                  Get In Touch With Brenda
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 h-full relative bg-gray-100">
              {isMobile ? (
                <div className="w-full h-[460px] relative">
                  <img
                    src="/lovable-uploads/brenda-scarllet-owner.jpg"
                    alt="Brenda Scarllet, Owner of Stark Roofing & Renovation"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="w-full relative" style={{ height: "560px" }}>
                  <img
                    src="/lovable-uploads/brenda-scarllet-owner.jpg"
                    alt="Brenda Scarllet, Owner of Stark Roofing & Renovation"
                    className="absolute w-full h-full object-cover"
                    style={{ objectPosition: "center 32%" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-5 py-4">
                <p className="text-white font-bold text-lg leading-tight">Brenda Scarllet</p>
                <p className="text-white/90 text-sm">Owner &amp; Founder · Stark Roofing &amp; Renovation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HappinessSection;
