
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicePageHero from '@/components/shared/ServicePageHero';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import OverviewSection from '@/components/skylights/OverviewSection';
import BenefitsSection from '@/components/skylights/BenefitsSection';
import FeaturedFixedSkylight from '@/components/skylights/FeaturedFixedSkylight';
import SkylightTypes from '@/components/skylights/SkylightTypes';
import BeforeAfterShowcase from '@/components/skylights/BeforeAfterShowcase';
import AutomaticSkylightsSection from '@/components/skylights/AutomaticSkylightsSection';
import InstallationProcess from '@/components/skylights/InstallationProcess';
import WarrantySection from '@/components/skylights/WarrantySection';
import PricingComparison from '@/components/skylights/PricingComparison';
import SkylightFAQSection from '@/components/skylights/SkylightFAQSection';
import ContactCTA from '@/components/skylights/ContactCTA';
import QuickQuoteButton from '@/components/shared/QuickQuoteButton';
import ServiceSchema from '@/components/shared/ServiceSchema';

const Skylights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Skylight Installation Seattle | Stark Roofing & Renovation',
    description: 'Velux skylight installation across the Seattle area. We handle the flashing so it never leaks. Free estimate on new or replacement: (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/skylights/',
    keywords: 'skylight installation Seattle, Velux skylights, skylight repair, natural light windows, roof windows',
    ogTitle: 'Skylight Installation | Stark Roofing & Renovation',
    ogDescription: 'Velux skylight installation with leak-proof flashing across the Seattle area.',
    ogImage: 'https://starkroofingrenovation.com/skylight-hero.webp',
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Skylight Installation"
        description="Professional skylight installation in Seattle & Puget Sound. Velux certified. Bring natural light safely. Expert flashing. Free estimates. 206-739-8232."
        url="https://starkroofingrenovation.com/skylights/"
      />
      <Navbar />
      <ServicePageHero
        title="Skylight Installation"
        subtitle="Bring natural light into your home with professional Velux skylight installation and expert flashing."
        badge="Velux Certified Installer"
        bgImage="/skylight-hero.webp"
        breadcrumb="Skylights"
        ctaLabel="Get a Free Estimate"
        ctaHref="#contact"
        secondaryCta={{ label: 'View All VELUX Models', href: '/skylights/velux-lineup' }}
        accentColor="#f59e0b"
        align="center"
      />
      <OverviewSection />
      <FeaturedFixedSkylight />
      <SkylightTypes />
      <BeforeAfterShowcase />
      <AutomaticSkylightsSection />
      <BenefitsSection />
      <WarrantySection />
      <InstallationProcess />
      <PricingComparison />
      <SkylightFAQSection />
      <ContactCTA />
      <Footer />
      {/* Mobile-only sticky CTA so the form is always one tap away */}
      <QuickQuoteButton
        sticky
        defaultService="skylight"
        label="Get My Free Skylight Quote"
        dialogTitle="Free Skylight Estimate"
      />
    </div>
  );
};

export default Skylights;
