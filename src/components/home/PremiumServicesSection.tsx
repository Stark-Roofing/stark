import React from 'react';
import { AppWindow, Sun, Building2, Sparkles, CloudRain } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { getRoofingItems, getGutterItems } from '@/components/navigation/NavigationMenuData';

// Homepage-only roofing dropdown: the shared nav items plus Commercial Roofing.
// Sourced from getRoofingItems() so future updates there flow through here,
// without adding Commercial Roofing to the main site nav.
const roofingDropdownItems = [
  ...getRoofingItems(),
  {
    to: "/commercial-roofing",
    icon: <Building2 size={14} className="mr-2" />,
    label: "Commercial Roofing"
  },
  {
    to: "/storm-damage",
    icon: <CloudRain size={14} className="mr-2" />,
    label: "Storm Damage"
  }
];

const skylightsWindowsItems = [
  {
    to: "/window-replacement",
    icon: <AppWindow size={14} className="mr-2" />,
    label: "Window Replacement"
  },
  {
    to: "/skylights",
    icon: <Sun size={14} className="mr-2" />,
    label: "Skylights Overview"
  },
  {
    to: "/skylights/velux-lineup",
    icon: <Sparkles size={14} className="mr-2" />,
    label: "Velux Lineup"
  }
];

const PremiumServicesSection: React.FC = () => {
  return <section id="services" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        <h2 className="section-title text-center text-stark-red">Our Services</h2>
        <p className="section-subtitle text-center !max-w-none w-[76.56%] mx-auto">
          Stark Roofing & Renovation is a family-owned, GAF Master Elite certified roofing contractor (top 2% nationwide)
          based in Sammamish, WA. For over 30 years, we have installed and repaired more than 2,000 roofs across Seattle,
          the Eastside, and Puget Sound — each backed by our 25-year labor warranty.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="animate-fade-in" style={{
          animationDelay: '100ms'
        }}>
            <ServiceCard title="Roofing" description="Full roof replacement with GAF Timberline HDZ shingles, plus expert repairs and same-week storm damage restoration — with full insurance claim support across King, Snohomish & Pierce counties." imageUrl="/lovable-uploads/home-premium-roofing.jpg" link="/roof-replacement" dropdownItems={roofingDropdownItems} />
          </div>
          <div className="animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            <ServiceCard title="Gutter Systems" description={'Seamless 5" gutters with leaf-guard protection and our exclusive lifetime clog-free guarantee. Never climb a ladder again.'} imageUrl="/lovable-uploads/home-premium-gutters.jpg" link="/gutter-replacement" dropdownItems={getGutterItems()} />
          </div>
          <div className="animate-fade-in" style={{
          animationDelay: '300ms'
        }}>
            <ServiceCard title="Skylights & Windows" description="Energy-efficient Velux skylights and replacement windows, professionally installed to bring in natural light and cut energy costs." imageUrl="/lovable-uploads/velux-skylight-installation-king-county.webp" link="/skylights" dropdownItems={skylightsWindowsItems} />
          </div>
          <div className="animate-fade-in" style={{
          animationDelay: '400ms'
        }}>
            <ServiceCard title="Siding" description="James Hardie and other premium siding materials are installed for lasting curb appeal and weather protection." imageUrl="/lovable-uploads/service-siding-hardie.jpg" link="/siding-installation" />
          </div>
        </div>
      </div>
    </section>;
};

export default PremiumServicesSection;
