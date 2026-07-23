
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import HorizontalContactForm from '@/components/home/HorizontalContactForm';
import PremiumServicesSection from '@/components/home/PremiumServicesSection';
import StormDamageSection from '@/components/home/StormDamageSection';
import ComparisonSection from '@/components/home/ComparisonSection';
import CTASection from '@/components/home/CTASection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';
import HappinessSection from '@/components/home/HappinessSection';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedSection from '@/components/AnimatedSection';
import HomeFAQSection from '@/components/home/FAQSection';
import { motion } from 'framer-motion';

const Index = () => {
  const { hash, key } = useLocation();

  useSEOMeta({
    title: 'Stark Roofing & Renovation | GAF Roofer Seattle & Eastside WA',
    description: 'GAF Master Elite roofer with 5-star reviews across Seattle and the Eastside. Free estimates on roofing, gutters, siding, and more. (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/',
    ogTitle: 'Stark Roofing & Renovation',
    ogDescription: 'GAF Master Elite roofing contractor serving Seattle, Bellevue, and all Eastside cities.',
    ogImage: 'https://starkroofingrenovation.com/og-share.png',
  });

  // Hash links (e.g. "/#services") need manual handling — React Router does not
  // scroll to anchors on its own.
  //
  // Keyed on `key` as well as `hash`: clicking the same hash link again does not
  // change `hash`, so keying on it alone left the link dead after the first use.
  // `key` is unique per navigation, so every click re-fires this.
  //
  // Retries briefly because the target can render after this first runs when
  // arriving from another page, and offsets by the fixed navbar so the section
  // heading doesn't land hidden underneath it.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        const navbar = document.querySelector('.fixed.top-0.z-50');
        const offset = navbar ? navbar.getBoundingClientRect().height : 0;
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth',
        });
      } else if (attempts++ < 20) {
        timer = setTimeout(scrollToTarget, 100);
      }
    };

    timer = setTimeout(scrollToTarget, 100);
    return () => clearTimeout(timer);
  }, [hash, key]);

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      {/* ── Cinematic hero (drone video + 3-second slides + music) ── */}
      <HeroSection />

      <AnimatedSection animation="slide-up">
        <PremiumServicesSection />
      </AnimatedSection>

      <StormDamageSection />

      <AnimatedSection animation="fade">
        <ProcessSection />
      </AnimatedSection>

      {/* Lead-capture form — placed AFTER the cinematic story + services overview
          so visitors see what we offer before we ask them to book. */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <HorizontalContactForm />
      </motion.div>

      <AnimatedSection animation="slide-up">
        <ComparisonSection />
      </AnimatedSection>

      <AnimatedSection animation="slide-up">
        <CTASection />
      </AnimatedSection>

      <AnimatedSection animation="slide-up">
        <ServiceAreaSection />
      </AnimatedSection>

      <AnimatedSection animation="slide-up">
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection animation="fade">
        <HappinessSection />
      </AnimatedSection>

      <AnimatedSection animation="slide-up">
        <HomeFAQSection />
      </AnimatedSection>

      <VirtualAssistant />
      <ScrollToTop />

      <Footer />
    </motion.div>
  );
};

export default Index;
