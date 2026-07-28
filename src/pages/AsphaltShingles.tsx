
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import ScrollToTop from '@/components/ScrollToTop';
import HorizontalContactForm from '@/components/home/HorizontalContactForm';
import ContactSection from '@/components/roof-replacement/ContactSection';
import FinancingSection from '@/components/asphalt-shingles/FinancingSection';
import HeroSection from '@/components/asphalt-shingles/HeroSection';
import OverviewSection from '@/components/asphalt-shingles/OverviewSection';
import FeaturesSection from '@/components/asphalt-shingles/FeaturesSection';
import CTASection from '@/components/asphalt-shingles/CTASection';
import ServiceSchema from '@/components/shared/ServiceSchema';

const AsphaltShingles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Asphalt Shingle Roofing | GAF Timberline | Seattle',
    description: 'Professional asphalt shingle roofing. GAF Timberline HDZ and premium materials. Reliable & affordable. Free estimates. Seattle & Puget Sound. 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/asphalt-shingles/',
    keywords: 'asphalt shingle roofing, GAF shingles, roof replacement asphalt, new roof installation, roofing materials',
    ogTitle: 'Asphalt Shingle Roofing - GAF Certified | Stark Roofing',
    ogDescription: 'Premium asphalt shingles with GAF certification. Reliable, affordable roofing solutions.',
    ogImage: 'https://starkroofingrenovation.com/drone-3.webp',
  });

  return (
    <>
      <ServiceSchema
        name="Asphalt Shingle Roofing"
        description="Professional asphalt shingle roofing. GAF Timberline HDZ and premium materials. Reliable & affordable. Free estimates. Seattle & Puget Sound. 206-739-8232."
        url="https://starkroofingrenovation.com/asphalt-shingles/"
      />
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Overview Section */}
      <OverviewSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Lead-capture form moved BELOW the overview + features so visitors
          first understand the product, then are asked to book. */}
      <HorizontalContactForm />

      {/* CTA Section */}
      <CTASection />

      {/* Financing Section */}
      <FinancingSection />
      
      {/* Contact Section */}
      <ContactSection />
      <FloatingCTA label="Free Roof Estimate" />
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default AsphaltShingles;
