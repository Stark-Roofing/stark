
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import ServiceHero from '@/components/services/ServiceHero';
import GAFHighlight from '@/components/services/GAFHighlight';
import ServiceGrid from '@/components/services/ServiceGrid';
import ContactForm from '@/components/services/ContactForm';
import ItemListSchema from '@/components/shared/ItemListSchema';
import { roofingServices, exteriorServices } from '@/data/serviceData';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Roofing & Renovation Services | Stark Roofing | Seattle',
    description: 'Complete roofing & renovation services. Roof replacement, repair, gutters, siding, windows. GAF certified. Free estimates. Seattle to Tacoma. 206-739-8232.',
    canonical: 'https://starkroofingrenovation.com/services',
    keywords: 'roofing services Seattle, home renovation, gutter services, siding installation, window replacement',
    ogTitle: 'Our Services - Roofing & Renovation | Stark Roofing',
    ogDescription: 'Complete roofing and renovation services. GAF certified professionals.',
    ogImage: 'https://starkroofingrenovation.com/og-share.png',
  });

  return (
    <div className="min-h-screen">
      <ItemListSchema
        name="Stark Roofing & Renovation Services"
        description="Complete roofing & renovation services. Roof replacement, repair, gutters, siding, windows. GAF certified. Free estimates. Seattle to Tacoma."
        url="https://starkroofingrenovation.com/services"
        items={[...roofingServices, ...exteriorServices].map((service) => ({
          name: service.title,
          url: `https://starkroofingrenovation.com${service.link}`,
          description: service.description,
        }))}
      />
      <Navbar />
      <ServiceHero />
      <GAFHighlight />
      <ServiceGrid 
        title="Roofing Services" 
        subtitle="Our comprehensive roofing services ensure your home is protected with quality materials and expert craftsmanship."
        services={roofingServices}
      />
      <ServiceGrid 
        title="Exterior Services" 
        subtitle="Enhance your home's appearance and energy efficiency with our premium exterior renovation services."
        services={exteriorServices}
        className="bg-gray-100"
      />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Services;
