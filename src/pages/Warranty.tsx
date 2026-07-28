
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import WarrantyHero from '@/components/warranty/WarrantyHero';
import WarrantyOverview from '@/components/warranty/WarrantyOverview';
import WarrantyComparison from '@/components/warranty/WarrantyComparison';
import WarrantyDetails from '@/components/warranty/WarrantyDetails';
import WarrantyFAQ from '@/components/warranty/WarrantyFAQ';
import WarrantyCTA from '@/components/warranty/WarrantyCTA';

const Warranty = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Warranty Coverage | GAF Certified | Stark Roofing',
    description: 'Comprehensive warranty coverage on all roofing work. GAF certification + manufacturer warranty. Peace of mind guaranteed. Contact us at 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/warranty/',
    keywords: 'roofing warranty, GAF warranty, manufacturer warranty, warranty coverage, roof protection',
    ogTitle: 'Warranty Coverage - Complete Protection | Stark Roofing',
    ogDescription: 'Comprehensive warranty coverage backed by GAF certification and manufacturer guarantees.',
    ogImage: 'https://starkroofingrenovation.com/stark-logo-transparent.png',
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <WarrantyHero />
      <WarrantyOverview />
      <WarrantyComparison />
      <WarrantyDetails />
      <WarrantyFAQ />
      <WarrantyCTA />
      
      <Footer />
    </div>
  );
};

export default Warranty;
