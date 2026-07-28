
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import WindowHeroSection from '@/components/window-replacement/WindowHeroSection';
import WindowOverviewSection from '@/components/window-replacement/WindowOverviewSection';
import WindowTypesSection from '@/components/window-replacement/WindowTypesSection';
import WindowBenefitsSection from '@/components/window-replacement/WindowBenefitsSection';
import WindowProcessSection from '@/components/window-replacement/WindowProcessSection';
import WindowFAQSection from '@/components/window-replacement/WindowFAQSection';
import WindowContactSection from '@/components/window-replacement/WindowContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import ServiceSchema from '@/components/shared/ServiceSchema';
import { motion } from 'framer-motion';

const WindowReplacement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Andersen Window Replacement Seattle | Energy Star | Stark Roofing',
    description:
      'Andersen window replacement across Greater Seattle. We replace 1960s aluminum and single-pane with Energy Star Most Efficient units. Save up to $583/yr + $600 federal tax credit. (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/window-replacement/',
    keywords:
      'andersen window replacement seattle, energy star windows bellevue, replace single pane windows, andersen 100 series, andersen 400 series, washington bedroom egress code',
    ogTitle: 'Andersen Window Replacement — Built for Seattle Winters | Stark Roofing',
    ogDescription:
      'Andersen Energy Star windows installed by certified Stark Roofing crews. Stop the condensation, the drafts, and the heat loss.',
    ogImage: 'https://starkroofingrenovation.com/stark-crew-team.jpg',
  });

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ServiceSchema
        name="Window Replacement"
        description="Andersen window replacement across Greater Seattle. We replace 1960s aluminum and single-pane with Energy Star Most Efficient units. Save up to $583/yr + $600 federal tax credit. (206) 739-8232."
        url="https://starkroofingrenovation.com/window-replacement/"
      />
      <Navbar />
      <WindowHeroSection />
      <WindowOverviewSection />
      <WindowTypesSection />
      <WindowBenefitsSection />
      <WindowProcessSection />
      <WindowFAQSection />
      {/* Booking form anchored so the hero CTA scrolls here. */}
      <div id="book-windows">
        <WindowContactSection />
      </div>
      <FloatingCTA label="Free Window Estimate" />
      <ScrollToTop />
      <Footer />
    </motion.div>
  );
};

export default WindowReplacement;
