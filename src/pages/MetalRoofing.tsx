import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import ServicePageHero from '@/components/shared/ServicePageHero';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import { Shield, ArrowRight, Construction, Clock, Droplets, Zap } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import HorizontalContactForm from '@/components/home/HorizontalContactForm';
import ContactSection from '@/components/roof-replacement/ContactSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroCarousel from '@/components/HeroCarousel';
import { metalRoofingHeroMedia } from '@/components/metal-roofing/HeroCarouselMedia';
import FinancingSection from '@/components/metal-roofing/FinancingSection';
import EmergencyServiceBar from '@/components/navigation/EmergencyServiceBar';
import ServiceSchema from '@/components/shared/ServiceSchema';

const MetalRoofing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useSEOMeta({
    title: 'Metal Roofing Installation | Durable & Modern | Seattle',
    description: 'Professional metal roofing installation. Durable, energy-efficient, and beautiful. 30+ year lifespan. Free estimates. Seattle & Puget Sound. 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/metal-roofing',
    keywords: 'metal roofing, metal roof installation, standing seam roofing, durable roofing, modern roofing',
    ogTitle: 'Metal Roofing - Durable & Long-Lasting | Stark Roofing',
    ogDescription: 'Premium metal roofing systems. Durable, energy-efficient, and built to last 30+ years.',
    ogImage: 'https://starkroofingrenovation.com/metal-roofing-hero.webp',
  });
  
  return (
    <>
      <ServiceSchema
        name="Metal Roofing"
        description="Professional metal roofing installation. Durable, energy-efficient, and beautiful. 30+ year lifespan. Free estimates. Seattle & Puget Sound. 206-739-8232."
        url="https://starkroofingrenovation.com/metal-roofing"
      />
      <div id="stark-master-header">
        <Navbar />
        <EmergencyServiceBar />
      </div>

      <ServicePageHero
        title="Premium Metal Roofing"
        subtitle="Modern, energy-efficient metal roofing that outlasts Pacific NW weather for 50+ years with minimal maintenance."
        badge="50-Year Warranty Available"
        bgImage="/metal-roofing-hero.webp"
        breadcrumb="Metal Roofing"
        secondaryCta={{ label: "View Metal Options", href: "#materials" }}
        align="center"
      />

      {/* Overview Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                Why Choose Metal Roofing?
              </h2>
              <p className="text-lg text-charcoal/80 mb-6">
                Metal roofing has become increasingly popular among homeowners seeking long-lasting, sustainable roofing options. Unlike traditional asphalt shingles that typically last 15-20 years, our premium metal roofing systems can protect your home for 50+ years with minimal maintenance.
              </p>
              <p className="text-lg text-charcoal/80 mb-6">
                Today's metal roofing comes in a variety of styles, colors, and finishes that can complement any architectural style—from contemporary to traditional. Whether you prefer the sleek, clean lines of standing seam metal or metal shingles that mimic the appearance of slate, tile, or wood shake, we offer options to enhance your home's curb appeal.
              </p>
              <p className="text-lg text-charcoal/80">
                Our professional installation ensures your metal roof is properly secured to withstand extreme weather conditions while maximizing energy efficiency and performance.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/5ea5b3b8-72f3-4e18-b9c5-0ce95d7896c9.webp" 
                alt="Standing seam metal roof installation on a home near Seattle, WA"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Benefits of Metal Roofing
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
              Why more homeowners are choosing metal for their roofing needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="glass-card p-6 rounded-xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-stark-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Clock className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Exceptional Longevity</h3>
              <p className="text-charcoal/80">
                Metal roofing can last 50+ years—2-3 times longer than traditional roofing materials, making it a smart long-term investment for your home.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-stark-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Zap className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Energy Efficiency</h3>
              <p className="text-charcoal/80">
                Metal roofs reflect solar heat rather than absorbing it, reducing cooling costs by up to 25% and helping maintain comfortable indoor temperatures.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-stark-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Construction className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Extreme Durability</h3>
              <p className="text-charcoal/80">
                Engineered to withstand extreme weather including 140+ mph winds, hail, snow loads, and will not crack, split, rot or burn like traditional materials.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-stark-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Shield className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Low Maintenance</h3>
              <p className="text-charcoal/80">
                Metal roofing requires minimal upkeep, with no need for regular replacement of shingles or tiles. Simple periodic cleaning is typically all that's needed.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-stark-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Droplets className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">All-Weather Protection</h3>
              <p className="text-charcoal/80">
                Metal roofing provides superior water shedding in heavy rain, is impervious to freeze-thaw cycles, and prevents snow and ice accumulation.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bg-stark-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <ArrowRight className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Environmentally Friendly</h3>
              <p className="text-charcoal/80">
                Metal roofing is 100% recyclable at the end of its life and often contains recycled content. It reduces landfill waste and environmental impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead-capture form — placed AFTER benefits so visitors are warmed up. */}
      <HorizontalContactForm />

      {/* New Financing Section */}
      <FinancingSection />
      
      {/* CTA Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Upgrade to Metal Roofing?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and estimate. Our experts will help you choose the perfect metal roofing solution for your home's style and your budget.
            </p>
            <Link to="#contact" className="btn-primary">
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
      <FloatingCTA label="Free Roof Estimate" />
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default MetalRoofing;
