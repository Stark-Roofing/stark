
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import { Shield, ArrowRight, CheckCircle2, Zap, Leaf, Sun } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import HorizontalContactForm from '@/components/home/HorizontalContactForm';
import ContactSection from '@/components/roof-replacement/ContactSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceSchema from '@/components/shared/ServiceSchema';

const TPORoofing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useSEOMeta({
    title: 'TPO Flat Roof Systems | Commercial & Residential | Seattle',
    description: 'Professional TPO roofing for flat roofs. Durable, energy-efficient solutions. Commercial & residential. Free estimates. Sammamish to Seattle. 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/tpo-roofing',
    keywords: 'TPO roofing, flat roof installation, TPO membranes, commercial roofing, energy efficient roofing',
    ogTitle: 'TPO Roofing Systems - Flat Roof Solutions | Stark Roofing',
    ogDescription: 'Durable and energy-efficient TPO roofing for commercial and residential properties.',
    ogImage: 'https://starkroofingrenovation.com/lovable-uploads/4e22b510-288f-4fd5-934c-4d533af06eec.webp',
  });
  
  return (
    <>
      <ServiceSchema
        name="TPO Roofing"
        description="Professional TPO roofing for flat roofs. Durable, energy-efficient solutions. Commercial & residential. Free estimates. Sammamish to Seattle. 206-739-8232."
        url="https://starkroofingrenovation.com/tpo-roofing"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="hero-overlay relative pt-32 pb-20 md:py-32">
        <img 
          src="/lovable-uploads/4e22b510-288f-4fd5-934c-4d533af06eec.webp" 
          alt="TPO flat roof membrane installation on a commercial building near Seattle, WA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 animate-fade-in">
              TPO Roofing Solutions
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Energy-efficient, durable thermoplastic membrane roofing ideal for commercial properties and flat residential roofs.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <a href="#contact" className="btn-primary">
                Get a Free Estimate →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                What is TPO Roofing?
              </h2>
              <p className="text-lg text-charcoal/80 mb-6">
                TPO (Thermoplastic Polyolefin) is a single-ply reflective roofing membrane made from polypropylene and ethylene-propylene rubber. This innovative material has become increasingly popular for commercial buildings and flat residential roofs due to its excellent balance of performance and affordability.
              </p>
              <p className="text-lg text-charcoal/80 mb-6">
                Unlike traditional roofing materials, TPO provides superior resistance to ultraviolet radiation, ozone, and chemical exposure while maintaining flexibility in extreme temperatures. Its light-colored surface reflects sunlight, reducing cooling costs and urban heat island effects.
              </p>
              <p className="text-lg text-charcoal/80">
                Our professional TPO installation ensures watertight seams and proper attachment, providing you with a long-lasting, energy-efficient roofing solution backed by manufacturer warranties of up to 30 years.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/4e22b510-288f-4fd5-934c-4d533af06eec.webp" 
                alt="Close-up of a TPO thermoplastic roofing membrane installed by Stark Roofing & Renovation"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Benefits of TPO Roofing
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
              Why TPO has become the fastest growing commercial roofing system
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
                <Sun className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Energy Efficient</h3>
              <p className="text-charcoal/80">
                White TPO membrane reflects up to 85% of solar heat, reducing cooling costs by 20-30% during summer months and helping meet energy code requirements.
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
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Durable & Long-Lasting</h3>
              <p className="text-charcoal/80">
                Resistant to UV degradation, punctures, tears, and extreme weather conditions. TPO roofing can last 20-30 years with proper installation and maintenance.
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
                <Leaf className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Environmentally Friendly</h3>
              <p className="text-charcoal/80">
                TPO doesn't contain chlorine and can be recycled at the end of its lifespan. Its energy-saving properties also help reduce carbon footprint and contribute to green building certifications.
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
                TPO's smooth surface resists dirt buildup and mold growth, making it easy to clean with simple washing. It requires minimal upkeep compared to other roofing systems.
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
                <CheckCircle2 className="h-7 w-7 text-stark-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Cost-Effective</h3>
              <p className="text-charcoal/80">
                TPO offers an excellent balance of performance and affordability. Installation costs less than many comparable systems while delivering similar or better long-term performance.
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
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Versatile Application</h3>
              <p className="text-charcoal/80">
                Can be installed on various substrates using different attachment methods: mechanically fastened, fully adhered, or ballasted. Ideal for both new construction and roof replacements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead-capture form — placed AFTER benefits so visitors are warmed up. */}
      <HorizontalContactForm />

      {/* Installation Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Our TPO Installation Process
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
              Professional installation by certified technicians ensures your TPO roof performs at its best
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-xl relative text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-stark-red text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 md:mx-0 md:mb-0 md:absolute md:-top-3 md:-left-3">1</div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3 md:mt-3">Inspection & Preparation</h3>
              <p className="text-charcoal/80">
                We thoroughly assess your existing roof structure, repair any damage to the deck, and ensure proper drainage patterns before installation begins.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl relative text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-stark-red text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 md:mx-0 md:mb-0 md:absolute md:-top-3 md:-left-3">2</div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3 md:mt-3">Insulation Installation</h3>
              <p className="text-charcoal/80">
                We install high-R-value insulation boards to improve energy efficiency and create a smooth surface for the TPO membrane attachment.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl relative text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-stark-red text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 md:mx-0 md:mb-0 md:absolute md:-top-3 md:-left-3">3</div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3 md:mt-3">Membrane Application</h3>
              <p className="text-charcoal/80">
                TPO sheets are rolled out, overlapped, and heat-welded to create a monolithic, watertight surface across the entire roof area.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl relative text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-stark-red text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 md:mx-0 md:mb-0 md:absolute md:-top-3 md:-left-3">4</div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3 md:mt-3">Detail Work & Inspection</h3>
              <p className="text-charcoal/80">
                We carefully seal all penetrations, flashings, and edges, then perform a thorough inspection including seam testing to ensure complete waterproofing.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Install a TPO Roof?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and estimate. Our experts will help you determine if TPO roofing is the right solution for your property.
            </p>
            <Link to="#contact" className="btn-primary">
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
      <FloatingCTA label="Free TPO Roof Estimate" />
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default TPORoofing;
