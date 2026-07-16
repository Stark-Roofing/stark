
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import { useSEOMeta } from '@/hooks/useSEOMeta';

// Import the refactored components
import HeroSection from '@/components/roof-repair/HeroSection';
import HorizontalContactForm from '@/components/roof-repair/HorizontalContactForm';
import OverviewSection from '@/components/roof-repair/OverviewSection';
import CommonIssuesSection from '@/components/roof-repair/CommonIssuesSection';
import ProcessSection from '@/components/roof-repair/ProcessSection';
import EmergencySection from '@/components/roof-repair/EmergencySection';
import FAQSection from '@/components/roof-repair/FAQSection';
import CTASection from '@/components/roof-repair/CTASection';
import SectionEmergencyBanner from '@/components/roof-repair/SectionEmergencyBanner';
import FloatingContactBar from '@/components/roof-repair/FloatingContactBar';
import ScrollToTop from '@/components/ScrollToTop';
import ServiceSchema from '@/components/shared/ServiceSchema';
import AnswerFirstBlock from '@/components/shared/AnswerFirstBlock';

const RoofRepair = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Roof Repair Seattle WA | Stark Roofing & Renovation',
    description: 'Roof leak or storm damage in Seattle? We fix it the same week. Shingles, flashing, emergency tarps. GAF certified crew. Call (206) 739-8232 now.',
    canonical: 'https://starkroofingrenovation.com/roof-repair',
    keywords: 'roof repair Seattle, fix leaky roof, emergency roof repair, roof leak repair, roof damage repair',
    ogTitle: 'Roof Repair | Stark Roofing & Renovation',
    ogDescription: 'Same-week roof repairs in Seattle. Leaks, storm damage, missing shingles. GAF certified crew.',
    ogImage: 'https://starkroofingrenovation.com/stark-crew-team.jpg',
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Roof Repair"
        serviceType="Roofing Repair"
        description="Professional roof repair in Seattle & Puget Sound. Leaks, missing shingles, storm damage. Same-week service available. GAF certified. Call 206-739-8232."
        url="https://starkroofingrenovation.com/roof-repair"
      />
      <Navbar />

      {/* Repair-specific Hero (split layout, urgency-forward) */}
      <HeroSection />

      <AnswerFirstBlock
        heading="Roof Repair in Seattle & the Eastside"
        answer="Stark Roofing & Renovation handles roof leaks, missing or wind-lifted shingles, flashing failures, and storm damage across Seattle and the Eastside, with same-week service on most repairs and same-day emergency tarping for active leaks. Minor repairs typically run a few hundred dollars, while complex leaks or storm damage cost more; every job starts with a free drone inspection and a written, line-item estimate. We are a GAF Master Elite contractor with 30-plus years in business and 2,000-plus roofs completed. Call (206) 739-8232."
      />

      {/* Overview Section */}
      <OverviewSection />

      {/* Common Repair Issues */}
      <CommonIssuesSection />

      {/* Lead-capture form moved BELOW the overview + common issues so visitors
          first understand what we fix, then are asked to book. */}
      <HorizontalContactForm />

      {/* Process Section */}
      <ProcessSection />

      {/* Section Emergency Banner */}
      <SectionEmergencyBanner />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Emergency Services - Moved to the end of the page */}
      <EmergencySection />
      
      {/* Floating Contact Bar */}
      <FloatingContactBar />
      
      <VirtualAssistant />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default RoofRepair;
