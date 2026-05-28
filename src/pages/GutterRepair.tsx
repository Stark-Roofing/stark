
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/PageTransition';
import { useSEOMeta } from '@/hooks/useSEOMeta';

// Import the refactored components
import HeroSection from '@/components/gutter-repair/HeroSection';
import FilterDetailsSection from '@/components/gutter-repair/FilterDetailsSection';
import FilterBenefitsSection from '@/components/gutter-repair/FilterBenefitsSection';
import CommonProblems from '@/components/gutter-repair/CommonProblems';
import ProcessSection from '@/components/gutter-repair/ProcessSection';
import CTASection from '@/components/gutter-repair/CTASection';
import EmergencySection from '@/components/gutter-repair/EmergencySection';
import FAQSection from '@/components/gutter-repair/FAQSection';
import FloatingContactBar from '@/components/gutter-repair/FloatingContactBar';
import QuickQuoteSection from '@/components/shared/QuickQuoteSection';
import ServiceSchema from '@/components/shared/ServiceSchema';

const GutterRepair = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Gutter Repair Services | Fix Leaking Gutters | Seattle',
    description: 'Professional gutter repair in Seattle & Puget Sound. Fix leaks, clogs, sagging gutters. Same-week service. Free estimates. Call 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/gutter-repair',
    keywords: 'gutter repair Seattle, fix leaking gutter, gutter cleaning, gutter maintenance, gutter services',
    ogTitle: 'Gutter Repair - Fast & Professional | Stark Roofing',
    ogDescription: 'Expert gutter repair and cleaning. Fix leaks and protect your foundation.',
    ogImage: 'https://starkroofingrenovation.com/stark-crew-team.jpg',
  });

  return (
    <PageTransition>
      <ServiceSchema
        name="Gutter Repair"
        description="Professional gutter repair in Seattle & Puget Sound. Fix leaks, clogs, sagging gutters. Same-week service. Free estimates. Call 206-739-8232."
        url="https://starkroofingrenovation.com/gutter-repair"
      />
      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Single lead-capture section — replaces the old ContactSection +
            HeroContactForm duplicate plus the bottom ContactSection (cleanup 2026-05-28). */}
        <QuickQuoteSection defaultService="gutters" />

        {/* Filter Details Section */}
        <FilterDetailsSection />

        {/* Filter Benefits Section */}
        <FilterBenefitsSection />

        {/* Common Problems Section */}
        <CommonProblems />

        {/* Process Section */}
        <ProcessSection />

        {/* Emergency Section */}
        <EmergencySection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />

        {/* Floating Contact Bar */}
        <FloatingContactBar />
        
        <VirtualAssistant />
        <ScrollToTop />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default GutterRepair;
