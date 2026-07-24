
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import GutterHero from '@/components/gutter-replacement/GutterHero';
import WhyGuttersProtectionSection from '@/components/gutter-replacement/WhyGuttersProtectionSection';
import PremiumSystemsSection from '@/components/gutter-replacement/PremiumSystemsSection';
import BenefitsSection from '@/components/gutter-replacement/BenefitsSection';
import InstallationProcess from '@/components/gutter-replacement/InstallationProcess';
import CTASection from '@/components/gutter-replacement/CTASection';
import ContactFormSection from '@/components/gutter-replacement/ContactFormSection';
import ServiceSchema from '@/components/shared/ServiceSchema';
import AnswerFirstBlock from '@/components/shared/AnswerFirstBlock';

const GutterReplacement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Gutter Replacement Seattle WA | Stark Roofing & Renovation',
    description:
      'Seamless gutter replacement built for Seattle rain and pine needles. Custom aluminum, lifetime no-clog warranty. Free quote: (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/gutter-replacement',
    keywords:
      'gutter replacement seattle, seamless gutters bellevue, leaf protection seattle, gutter installation snohomish, ice dam prevention',
    ogTitle: 'Gutter Replacement | Stark Roofing & Renovation',
    ogDescription:
      'Custom seamless aluminum gutters sized for Seattle rain and pine needles. Lifetime no-clog warranty.',
    ogImage: 'https://starkroofingrenovation.com/drone-4.webp',
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Gutter Replacement"
        description="Custom seamless aluminum gutters built for Western Washington — pine needles, atmospheric river rain, ice dams. Lifetime no-clog warranty. Free quote. (206) 739-8232."
        url="https://starkroofingrenovation.com/gutter-replacement"
      />
      <Navbar />
      <GutterHero />
      <AnswerFirstBlock
        heading="Seamless Gutter Replacement in Greater Seattle"
        answer="Stark Roofing & Renovation installs custom seamless aluminum gutters formed on site to fit your home, built for Western Washington's pine-needle load, atmospheric-river rain, and ice dams. Every install includes proper sizing, downspout routing, and a lifetime no-clog workmanship warranty. We are a GAF Master Elite contractor with 30-plus years serving the Eastside. Free quote at (206) 739-8232."
      />
      <WhyGuttersProtectionSection />
      <PremiumSystemsSection />
      <BenefitsSection />
      <InstallationProcess />
      <CTASection />
      {/* Hero / mid-page CTAs anchor to #book-gutters → now lands on the single
          contact section at the bottom (form duplication removed 2026-05-28). */}
      <ContactFormSection />
      <FloatingCTA label="Free Gutter Estimate" />
      <Footer />
    </div>
  );
};

export default GutterReplacement;
