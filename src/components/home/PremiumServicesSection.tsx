import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { motion } from 'framer-motion';

const PremiumServicesSection: React.FC = () => {
  return <section className="section-padding premium-services-section">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        <h2 className="section-title text-center text-stark-red">Our Services</h2>
        <p className="section-subtitle text-center">
          GAF-certified roofing and exterior protection trusted by Pacific Northwest homeowners for over 30 years.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="animate-fade-in" style={{
          animationDelay: '100ms'
        }}>
            <ServiceCard title="Roofing" description="GAF Timberline HDZ shingles installed by certified pros. Lifetime warranty available, financing in minutes, built for Seattle weather." imageUrl="/lovable-uploads/home-premium-roofing.jpg" link="/roof-replacement" />
          </div>
          <div className="animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            <ServiceCard title="Gutter Systems" description={'Seamless 5" gutters with leaf-guard protection and our exclusive lifetime clog-free guarantee. Never climb a ladder again.'} imageUrl="/lovable-uploads/home-premium-gutters.jpg" link="/gutter-replacement" />
          </div>
          <div className="animate-fade-in" style={{
          animationDelay: '300ms'
        }}>
            <ServiceCard title="Storm Damage Repair" description="Wind, hail, or fallen tree? Same-week inspections, full insurance claim support, and emergency tarp service across King, Snohomish & Pierce counties." imageUrl="/lovable-uploads/home-storm-damage.jpg" link="/storm-damage" />
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Link to="/services" className="flex items-center bg-stark-red hover:bg-stark-red/80 text-white rounded-lg shadow-lg transition-all py-[23px] px-[40px]">
              <Grid size={18} className="mr-2" />
              <span className="font-medium">View All Services</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default PremiumServicesSection;
