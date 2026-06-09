
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import EmergencyServiceBar from './navigation/EmergencyServiceBar';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Header is always rendered in the "scrolled" (solid white) state.
  const isScrolled = true;

  // Add/remove body class when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50" id="stark-master-header">
      <EmergencyServiceBar />

      <header className="scrolled py-2 bg-white/95 shadow-md backdrop-blur-sm w-full transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop layout: [Logo] ← [Menu centered] → [Free Quote CTA] */}
          <div className="hidden md:grid grid-cols-3 items-center">
            <Link to="/" className="justify-self-start flex items-center">
              <Logo textClassName="text-stark-red" withTagline={false} />
            </Link>
            <div className="justify-self-center">
              <DesktopNavigation isScrolled={isScrolled} />
            </div>
            <div className="justify-self-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-stark-red px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-stark-redHover transition-all hover:shadow-md hover:scale-[1.03]"
              >
                Free Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile layout: [Logo] — [Hamburger] */}
          <div className="md:hidden flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Logo textClassName="text-stark-red" withTagline={false} />
            </Link>
            <MobileNavigation
              isScrolled={isScrolled}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
