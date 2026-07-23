
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Phone, Wallet, Droplets, Percent, Home, Wrench, Layers, Info, Mail, Cloud, Camera } from 'lucide-react';
import MobileMenuTrigger from './MobileMenuTrigger';
import MobileMenuItem from './MobileMenuItem';
import MobileSubmenu from './MobileSubmenu';
import MobileCallButton from './MobileCallButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavigationProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileNavigation = ({ isScrolled, isMobileMenuOpen, toggleMobileMenu }: MobileNavigationProps) => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 18 : 20;
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  const roofingItems = [
    {
      to: "/roof-replacement",
      label: "Roof Replacement",
      icon: <Home size={iconSize} className="mr-2" />
    },
    {
      to: "/roof-repair",
      label: "Roof Repair",
      icon: <Wrench size={iconSize} className="mr-2" />
    },
    {
      to: "/roof-cleaning",
      label: "Roof Cleaning",
      icon: <Droplets size={iconSize} className="mr-2" />
    }
  ];

  const gutterItems = [
    {
      to: "/gutter-replacement",
      label: "Gutters Replacement",
      icon: <Layers size={iconSize} className="mr-2" />
    },
    {
      to: "/gutter-repair",
      label: "Gutter Repair",
      icon: <Wrench size={iconSize} className="mr-2" />
    }
  ];

  const skylightItems = [
    {
      to: "/skylights",
      label: "Skylights Overview",
      icon: <Cloud size={iconSize} className="mr-2" />
    }
  ];

  const serviceItems = [
    {
      to: "/about",
      label: "About Us",
      icon: <Info size={iconSize} className="mr-2" />
    },
    {
      to: "/contact",
      label: "Contact Us",
      icon: <Mail size={iconSize} className="mr-2" />
    },
    {
      to: "/warranty",
      label: "Warranty",
      icon: null
    }
  ];

  const menuItems = [
    {
      to: "/#services",
      label: "Services",
      icon: <Wrench size={iconSize} className="mr-2" />
    },
    {
      to: "/storm-damage",
      label: "Storm Damage",
      icon: <Cloud size={iconSize} className="mr-2" />
    },
    {
      to: "/our-projects",
      label: "Our Projects",
      icon: <Camera size={iconSize} className="mr-2" />
    },
    {
      to: "/about",
      label: "About Us",
      icon: <Info size={iconSize} className="mr-2" />
    },
    {
      to: "/warranty",
      label: "Warranty Info",
      icon: null
    },
    {
      to: "/finance",
      label: "Financing Help",
      icon: <Wallet size={iconSize} className="mr-2" />
    },
    {
      to: "/blog",
      label: "Blog",
      icon: null
    }
  ];

  const serviceAreaItems = [
    { to: "/service-area/seattle", label: "Seattle" },
    { to: "/service-area/bellevue", label: "Bellevue" },
    { to: "/service-area/sammamish", label: "Sammamish" },
    { to: "/service-area/redmond", label: "Redmond" },
    { to: "/service-area/kirkland", label: "Kirkland" },
    { to: "/service-area/issaquah", label: "Issaquah" },
    { to: "/service-area/woodinville", label: "Woodinville" },
    { to: "/service-area/renton", label: "Renton" },
    { to: "/service-area/everett", label: "Everett" },
    { to: "/service-area/lynnwood", label: "Lynnwood" },
    { to: "/service-area/bothell", label: "Bothell" },
    { to: "/service-area/tacoma", label: "Tacoma" },
    { to: "/service-area/maple-valley", label: "Maple Valley" }
  ];

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const menuOverlay = (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 bottom-0 z-[999] bg-navy overflow-y-auto mobile-menu-overlay"
      style={{
        pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        height: '100vh',
        width: '100vw',
      }}
      aria-hidden={!isMobileMenuOpen}
    >
      <div className="pt-20 pb-24 min-h-screen">
        <nav className="container mx-auto px-6 flex flex-col space-y-6">
            <MobileMenuItem 
              to="/" 
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Home
            </MobileMenuItem>
            
            <MobileSubmenu 
              title="Roofing" 
              items={roofingItems} 
              onItemClick={toggleMobileMenu} 
            />
            
            <MobileSubmenu 
              title="Gutters" 
              items={gutterItems} 
              onItemClick={toggleMobileMenu} 
            />
            
            <MobileSubmenu 
              title="Skylights" 
              items={skylightItems} 
              onItemClick={toggleMobileMenu} 
            />
            
            <MobileMenuItem 
              to="/storm-damage" 
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              <Cloud size={iconSize} className="inline mr-2" />
              Storm Damage
            </MobileMenuItem>
            
            <MobileMenuItem 
              to="/finance" 
              className="text-xl font-medium text-white hover:text-stark-red transition-colors flex items-center py-2"
              onClick={toggleMobileMenu}
            >
              <Wallet size={iconSize} className="mr-3" />
              Finance
            </MobileMenuItem>

            <MobileMenuItem
              to="/our-projects"
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              <Camera size={iconSize} className="inline mr-2" />
              Our Projects
            </MobileMenuItem>

            <MobileMenuItem
              to="/about"
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              <Info size={iconSize} className="inline mr-2" />
              About Us
            </MobileMenuItem>
            
            <MobileMenuItem 
              to="/contact" 
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              <Mail size={iconSize} className="inline mr-2" />
              Contact Us
            </MobileMenuItem>
            
            <MobileSubmenu
              title="Services"
              items={serviceItems}
              onItemClick={toggleMobileMenu}
            />

            <MobileSubmenu
              title="More Info"
              items={menuItems}
              onItemClick={toggleMobileMenu}
            />

            <MobileSubmenu
              title="Service Areas"
              items={serviceAreaItems} 
              onItemClick={toggleMobileMenu} 
            />
            
          <div className="pt-4">
            <MobileCallButton onClick={toggleMobileMenu} />
          </div>
        </nav>
      </div>
    </motion.div>
  );

  return (
    <>
      <MobileMenuTrigger
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      {typeof document !== 'undefined' && createPortal(menuOverlay, document.body)}
    </>
  );
};

export default MobileNavigation;
