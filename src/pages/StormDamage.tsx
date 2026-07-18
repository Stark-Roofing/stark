
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import StormHero from '@/components/storm-damage/StormHero';
import EmergencyNotice from '@/components/storm-damage/EmergencyNotice';
import StormThreatsSection from '@/components/storm-damage/StormThreatsSection';
import TrustTriggers from '@/components/storm-damage/TrustTriggers';
import WhyChooseStark from '@/components/storm-damage/WhyChooseStark';
import StormDamageRestoration from '@/components/storm-damage/StormDamageRestoration';
import StormContactSection from '@/components/storm-damage/StormContactSection';
import StormTestimonialsSection from '@/components/storm-damage/StormTestimonialsSection';
import StormFAQSection from '@/components/storm-damage/StormFAQSection';
import StormDamageProcess from '@/components/storm-damage/StormDamageProcess';
import StormCTA from '@/components/storm-damage/StormCTA';
import StormInsuranceSection from '@/components/storm-damage/StormInsuranceSection';
import StormServiceAreas from '@/components/storm-damage/StormServiceAreas';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import ServiceSchema from '@/components/shared/ServiceSchema';
import AnswerFirstBlock from '@/components/shared/AnswerFirstBlock';

const StormDamage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Storm Damage Roof Repair Seattle | 24/7 Emergency | Stark Roofing',
    description:
      'Tree down on your roof? Wind damage? We tarp fast, handle your insurance claim, and rebuild it right. 24/7 emergency response across Greater Seattle. (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/storm-damage',
    keywords:
      'storm damage roof repair seattle, tree fell on roof seattle, wind damage roof, emergency roof tarp, insurance claim roof seattle',
    ogTitle: 'Storm Damage Roof Repair — 24/7 Emergency Service | Stark Roofing',
    ogDescription:
      "We tarp fast, document for your insurance, and rebuild it right. Most claims = $0 out of pocket.",
    ogImage: 'https://starkroofingrenovation.com/storm-stark-mascot.jpg',
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Storm Damage Roof Repair"
        serviceType="Emergency Roofing Service"
        description="Tree down on your roof? Wind damage? We tarp fast, handle your insurance claim, and rebuild it right. 24/7 emergency response across Greater Seattle. (206) 739-8232."
        url="https://starkroofingrenovation.com/storm-damage"
      />
      <Navbar />
      <StormHero />
      <AnswerFirstBlock
        heading="Storm Damage Roof Repair Across Greater Seattle"
        answer="After a windstorm or atmospheric river drops a tree or tears shingles off your roof, Stark Roofing & Renovation responds fast with same-day emergency tarping to stop the water, then documents the damage for your insurance and rebuilds it right. Storm, wind, and tree-strike damage is usually covered by homeowners insurance; we work directly with your adjuster. GAF Master Elite, 24/7 emergency response. Call (206) 739-8232."
      />
      <EmergencyNotice />
      {/* Booking form anchored right under the hero/emergency strip so the
          hero CTA "Book My Free Inspection" actually scrolls to a form. */}
      <div id="book-inspection">
        <StormContactSection />
      </div>
      <StormThreatsSection />
      <StormDamageProcess />
      <StormDamageRestoration />
      <StormInsuranceSection />
      <TrustTriggers />
      <WhyChooseStark />
      <StormServiceAreas />
      <StormTestimonialsSection />
      <StormFAQSection />
      <StormCTA />
      <VirtualAssistant />
      <FloatingCTA label="Free Storm Damage Estimate" />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default StormDamage;
