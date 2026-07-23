import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicePageHero from '@/components/shared/ServicePageHero';
import HorizontalContactForm from '@/components/home/HorizontalContactForm';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import BreadcrumbSchema from '@/components/shared/BreadcrumbSchema';

interface LocationPageProps {
  city: string;
  state: string;
  region: string;
  description: string;
  content: React.ReactNode;
  heroImage: string;
  keywords: string;
  metaTitle?: string;
  metaDescription?: string;
}

const LocationPage: React.FC<LocationPageProps> = ({
  city,
  state,
  region,
  description,
  content,
  heroImage,
  keywords,
  metaTitle,
  metaDescription,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = `https://starkroofingrenovation.com/service-area/${city.toLowerCase().replace(/\s+/g, '-')}`;
  const pageTitle = metaTitle || `Roofing Services in ${city}, ${state} | Stark Roofing`;
  const pageDescription = metaDescription || `Professional roofing, gutter & renovation services in ${city}, ${state}. ${description} Serving the ${region}. GAF Certified. Call 206-739-8232 for a free estimate.`;

  useSEOMeta({
    title: pageTitle,
    description: pageDescription,
    canonical: canonicalUrl,
    keywords: keywords,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: `https://starkroofingrenovation.com/${heroImage}`,
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: `https://starkroofingrenovation.com/${heroImage}`,
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Stark Roofing & Renovation - ${city}`,
      "image": `https://starkroofingrenovation.com/${heroImage}`,
      "description": pageDescription,
      "telephone": "+1-206-739-8232",
      "email": "office@starkroofingrenovation.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city,
        "addressRegion": state,
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "City",
        "name": city
      },
      "priceRange": "$$",
      "url": canonicalUrl
    }
  });

  return (
    <div className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://starkroofingrenovation.com/' },
        { name: 'Service Areas', url: 'https://starkroofingrenovation.com/services' },
        { name: city, url: canonicalUrl },
      ]} />
      <Navbar />
      <ServicePageHero
        title={`Roofing & Renovation Services in ${city}`}
        subtitle={`Expert roofing, gutters, siding & renovation services for ${city} and ${region}`}
        badge={`${city}, ${state} Local Experts`}
        bgImage={heroImage}
        breadcrumb={city}
        ctaLabel="Get Free Estimate"
        ctaHref="/contact"
        accentColor="#CC0000"
        align="center"
      />
      <div className="w-full py-12 lg:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {content}
        </div>
      </div>
      {/* Lead-capture form — placed AFTER the local content so visitors first
          see why we serve their area, then are asked to book. */}
      <HorizontalContactForm />
      <VirtualAssistant />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default LocationPage;
