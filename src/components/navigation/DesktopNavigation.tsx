
import React from 'react';
import NavItem from './NavItem';
import NavMenuSection from './NavMenuSection';
import {
  getAllServicesDropdownItems,
  getMenuItems,
  getServiceAreasItems
} from './NavigationMenuData';

interface DesktopNavigationProps {
  isScrolled: boolean;
}

const DesktopNavigation = ({ isScrolled }: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <NavMenuSection
        label="Our Services"
        items={getAllServicesDropdownItems()}
        isScrolled={isScrolled}
      />

      <NavItem to="/storm-damage" isScrolled={isScrolled}>
        Storm Damage
      </NavItem>

      <NavMenuSection
        label="Resources"
        items={getMenuItems()}
        isScrolled={isScrolled}
      />

      <NavMenuSection
        label="Service Areas"
        items={getServiceAreasItems()}
        isScrolled={isScrolled}
        highlightPath="/service-area"
      />

      <NavItem to="/contact" isScrolled={isScrolled}>
        Contact Us
      </NavItem>
    </nav>
  );
};

export default DesktopNavigation;
