
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import HeroSection from '@/components/roof-replacement/HeroSection';
import OverviewSection from '@/components/roof-replacement/OverviewSection';
import ProcessSection from '@/components/sections/ProcessSection';
import MaterialsSection from '@/components/roof-replacement/MaterialsSection';
import GallerySection from '@/components/roof-replacement/GallerySection';
import ContactSection from '@/components/roof-replacement/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import PremiumRoofingSection from '@/components/roof-replacement/PremiumRoofingSection';
import RoofingComparison from '@/components/roof-replacement/RoofingComparison';
import FinancingOptionsSection from '@/components/home/FinancingOptionsSection';
import { useEntranceAnimations } from '@/hooks/useEntranceAnimations';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import AnimatedSection from '@/components/AnimatedSection';
import EmergencyServiceBar from '@/components/navigation/EmergencyServiceBar';
import FAQSection from '@/components/roof-replacement/FAQSection';
import ServiceSchema from '@/components/shared/ServiceSchema';
import AnswerFirstBlock from '@/components/shared/AnswerFirstBlock';

const RoofReplacement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Set SEO meta tags
  useSEOMeta({
    title: 'Roof Replacement Seattle WA | Stark Roofing & Renovation',
    description:
      'Full roof replacement across the Seattle area. GAF Timberline HDZ shingles, 20-year labor warranty, 2,000+ roofs done. (206) 739-8232 for a quote.',
    canonical: 'https://starkroofingrenovation.com/roof-replacement',
    keywords:
      'roof replacement seattle, GAF certified installer, new roof bellevue, gaf timberline HDZ, residential roof replacement puget sound',
    ogTitle: 'Roof Replacement | Stark Roofing & Renovation',
    ogDescription:
      'GAF Timberline HDZ shingles, 20-year labor warranty, 2,000+ roofs across the Seattle area and Eastside.',
    ogImage: 'https://starkroofingrenovation.com/roof-replacement-hero.webp',
  });
  
  // Initialize animations
  useEntranceAnimations();
  
  return (
    <>
      <ServiceSchema
        name="Roof Replacement"
        description="GAF Timberline HDZ roof replacement across Greater Seattle & Puget Sound. 30+ years, 2,000+ roofs, lifetime limited warranty. Free in-home estimate. (206) 739-8232."
        url="https://starkroofingrenovation.com/roof-replacement"
      />
      <div id="stark-master-header">
        <Navbar />
        <EmergencyServiceBar />
      </div>

      <HeroSection />

      <AnswerFirstBlock
        heading="Roof Replacement in Greater Seattle & Puget Sound"
        answer="Stark Roofing & Renovation installs full GAF Timberline HDZ roof replacements across Greater Seattle and Puget Sound, typically completed in one to two days for a standard home after a free drone inspection and a written, line-item estimate. A replacement is the right call when your roof is near the end of its life, has leaks in more than one spot, or shows widespread curling, granule loss, or a soft deck. We are a GAF Master Elite contractor (top 2 percent nationwide) with a lifetime limited warranty, 30-plus years in business, and 2,000-plus roofs completed. Call (206) 739-8232."
      />

      <AnimatedSection
        animation="slide-up"
        className="relative z-10"
      >
        <OverviewSection />
      </AnimatedSection>

      <AnimatedSection
        animation="fade"
        delay={200}
        className="relative z-10"
      >
        <PremiumRoofingSection />
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ProcessSection />
      </motion.div>
      
      <AnimatedSection animation="slide-up">
        <MaterialsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fade" delay={200}>
        <RoofingComparison />
      </AnimatedSection>
      
      <AnimatedSection animation="slide-up" delay={300}>
        <FinancingOptionsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fade">
        <GallerySection />
      </AnimatedSection>

      <AnimatedSection animation="slide-up">
        <FAQSection />
      </AnimatedSection>
      
      <AnimatedSection animation="slide-up">
        <ContactSection />
      </AnimatedSection>
      
      <VirtualAssistant />
      <FloatingCTA label="Free Roof Estimate" />
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default RoofReplacement;
