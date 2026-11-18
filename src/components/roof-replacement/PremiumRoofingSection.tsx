
import React from 'react';
import { Shield, ArrowRight, Award, Layers, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PremiumRoofingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4"
          >
            Premium Roofing Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-charcoal/80 max-w-3xl mx-auto"
          >
            Elevate your home's protection and curb appeal with our selection of premium roofing materials
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl hover-card flex flex-col h-full">
            <div className="flex items-center mb-6 justify-center md:justify-start">
              <div className="bg-stark-red/10 p-3 rounded-full mr-4">
                <Award className="h-6 w-6 text-stark-red" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy">GAF Timberline HDZ</h3>
            </div>
            
            <div className="mb-8 rounded-xl overflow-hidden aspect-[4/3]">
              <img
                loading="lazy" decoding="async" src="/lovable-uploads/45d75592-5471-4973-9d9e-e96c41b8ac16.webp"
                alt="GAF Timberline HDZ Shingles Color Options"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-charcoal/80 mb-6">
              As America's #1 shingle brand, GAF Timberline HDZ architectural shingles offer exceptional protection and beauty with:
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Limited lifetime warranty protection</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">130 MPH wind resistance</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">StainGuard Plus™ algae protection</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">LayerLock™ Technology for secure installation</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Link to="/asphalt-shingles" className="btn-primary inline-block">
                Learn About Asphalt Shingles
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover-card flex flex-col h-full">
            <div className="flex items-center mb-6 justify-center md:justify-start">
              <div className="bg-stark-red/10 p-3 rounded-full mr-4">
                <Layers className="h-6 w-6 text-stark-red" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy">Metal Roofing</h3>
            </div>
            
            <div className="mb-8 rounded-xl overflow-hidden aspect-[4/3]">
              <img
                loading="lazy" decoding="async" src="/lovable-uploads/5ea5b3b8-72f3-4e18-b9c5-0ce95d7896c9.webp"
                alt="Premium Standing Seam Metal Roofing"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-charcoal/80 mb-6">
              Our premium metal roofing options provide exceptional durability and modern aesthetics for discerning homeowners:
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">50+ year lifespan with minimal maintenance</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Superior energy efficiency reducing cooling costs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Class A fire rating for enhanced safety</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Environmentally friendly and recyclable material</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Link to="/metal-roofing" className="btn-primary inline-block">
                Learn About Metal Roofing
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover-card flex flex-col h-full">
            <div className="flex items-center mb-6 justify-center md:justify-start">
              <div className="bg-stark-red/10 p-3 rounded-full mr-4">
                <Building2 className="h-6 w-6 text-stark-red" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy">TPO Roofing</h3>
            </div>
            
            <div className="mb-8 rounded-xl overflow-hidden aspect-[4/3]">
              <img
                loading="lazy" decoding="async" src="/lovable-uploads/4e22b510-288f-4fd5-934c-4d533af06eec.webp"
                alt="TPO Commercial Roofing"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-charcoal/80 mb-6">
              TPO (Thermoplastic Polyolefin) membrane roofing is ideal for flat or low-slope applications, offering excellent performance:
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Energy-efficient white reflective surface</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Resistant to UV radiation and chemical exposure</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">Flexible material that resists punctures and tears</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-stark-red flex-shrink-0 mt-1" size={18} />
                <span className="ml-2">20-30 year warranty options available</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Link to="/tpo-roofing" className="btn-primary inline-block">
                Learn About TPO Roofing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumRoofingSection;
