
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import HeroSection from '@/components/finance/HeroSection';
import OBeePartnerSection from '@/components/finance/OBeePartnerSection';
import BenefitsSection from '@/components/finance/BenefitsSection';
import PaymentOptionsSection from '@/components/finance/PaymentOptionsSection';
import CalculatorSection from '@/components/finance/CalculatorSection';
import FAQSection from '@/components/finance/FAQSection';
import HowToApplySection from '@/components/finance/HowToApplySection';
import ContactSection from '@/components/finance/ContactSection';
import VirtualAssistant from '@/components/finance/VirtualAssistant';

const Finance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useSEOMeta({
    title: 'Roofing Financing Seattle WA | Stark Roofing & Renovation',
    description:
      'Finance your new roof through O Bee Credit Union. Rates from 8.24% APR, terms to 120 months, loans to $75k. Apply through Stark Roofing today.',
    canonical: 'https://starkroofingrenovation.com/finance',
    keywords:
      'roofing financing seattle, obee credit union home improvement loan, roof financing washington, stark roofing financing, home improvement loan puget sound',
    ogTitle: 'Roofing Financing | Stark Roofing & Renovation',
    ogDescription:
      'Finance your roof through O Bee Credit Union. Rates from 8.24% APR, terms to 120 months, loans to $75k.',
    ogImage: 'https://starkroofingrenovation.com/og-share.png',
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />
      <OBeePartnerSection />
      <BenefitsSection />
      <PaymentOptionsSection />
      <CalculatorSection />
      <FAQSection />
      <HowToApplySection />
      <ContactSection />
      <VirtualAssistant />
      
      <Footer />
    </div>
  );
};

export default Finance;
