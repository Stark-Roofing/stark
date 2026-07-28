
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import HeroSection from '@/components/roof-cleaning/HeroSection';
import BenefitsSection from '@/components/roof-cleaning/BenefitsSection';
import ProcessSection from '@/components/roof-cleaning/ProcessSection';
import BeforeAfterSection from '@/components/roof-cleaning/BeforeAfterSection';
import FAQSection from '@/components/roof-cleaning/FAQSection';
import ContactSection from '@/components/roof-cleaning/ContactSection';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/PageTransition';
import HeroContactForm from '@/components/roof-cleaning/HeroContactForm';
import ContactFormSection from '@/components/roof-cleaning/ContactFormSection';
import ServiceSchema from '@/components/shared/ServiceSchema';

const RoofCleaning = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Professional Roof Cleaning Services | Seattle & Puget Sound',
    description: 'Professional roof cleaning to remove moss, algae, and debris. Extends roof life. Improves curb appeal. Free estimates. Sammamish to Seattle. 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/roof-cleaning/',
    keywords: 'roof cleaning Seattle, moss removal, roof algae cleaning, professional roof cleaning, roof maintenance',
    ogTitle: 'Roof Cleaning - Extend Your Roof Life | Stark Roofing',
    ogDescription: 'Professional roof cleaning removes moss and algae. Extends roof lifespan and improves curb appeal.',
    ogImage: 'https://starkroofingrenovation.com/drone-5.webp',
  });

  return (
    <PageTransition>
      <ServiceSchema
        name="Roof Cleaning"
        description="Professional roof cleaning to remove moss, algae, and debris. Extends roof life. Improves curb appeal. Free estimates. Sammamish to Seattle. 206-739-8232."
        url="https://starkroofingrenovation.com/roof-cleaning/"
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        {/* Hero contact form directly after hero section */}
        <div className="container mx-auto px-4 relative">
          <HeroContactForm />
        </div>
        <div className="py-6"></div>
        <BenefitsSection />
        <ProcessSection />
        <BeforeAfterSection />
        <ContactFormSection />
        <FAQSection />
        {/* Main contact section at the end */}
        <ContactSection />
        <VirtualAssistant />
        <FloatingCTA label="Free Roof Cleaning Estimate" />
        <ScrollToTop />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default RoofCleaning;
