
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import MobileMenuTrigger from './MobileMenuTrigger';
import MobileMenuItem from './MobileMenuItem';
import MobileSubmenu from './MobileSubmenu';
import MobileCallButton from './MobileCallButton';
import {
  getAllServicesDropdownItems,
  getMenuItems,
  getServiceAreasItems
} from './NavigationMenuData';

interface MobileNavigationProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileNavigation = ({ isScrolled, isMobileMenuOpen, toggleMobileMenu }: MobileNavigationProps) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

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
            <MobileSubmenu
              title="Our Services"
              items={getAllServicesDropdownItems()}
              onItemClick={toggleMobileMenu}
            />

            <MobileMenuItem
              to="/storm-damage"
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2 border-l-4 border-stark-red pl-4"
              onClick={toggleMobileMenu}
            >
              Storm Damage
            </MobileMenuItem>

            <MobileSubmenu
              title="Resources"
              items={getMenuItems()}
              onItemClick={toggleMobileMenu}
            />

            <MobileSubmenu
              title="Service Areas"
              items={getServiceAreasItems()}
              onItemClick={toggleMobileMenu}
            />

            <MobileMenuItem
              to="/contact"
              className="text-xl font-medium text-white hover:text-stark-red transition-colors py-2 border-l-4 border-stark-red pl-4"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </MobileMenuItem>

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
