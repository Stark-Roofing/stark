
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import AboutHeroWithForm from '@/components/about/AboutHeroWithForm';
import OurStory from '@/components/about/OurStory';
import CoreValues from '@/components/about/CoreValues';
import Certifications from '@/components/about/Certifications';
import AboutCTA from '@/components/about/AboutCTA';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'About Us | Stark Roofing & Renovation Seattle WA',
    description: 'Family-owned roofing company based in Sammamish, serving Seattle and the Eastside. GAF Master Elite certified. We show up when we say and finish on time.',
    canonical: 'https://starkroofingrenovation.com/about/',
    keywords: 'about Stark Roofing, GAF certified roofer, family business, roofing contractor Seattle',
    ogTitle: 'About Stark Roofing & Renovation',
    ogDescription: 'Family-owned, GAF Master Elite certified roofing contractor based in Sammamish, serving Seattle and the Eastside.',
    ogImage: 'https://starkroofingrenovation.com/brenda-scarllet-owner.jpg',
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutHeroWithForm />
      <OurStory />
      <CoreValues />
      <Certifications />
      <AboutCTA />
      <VirtualAssistant />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default About;
