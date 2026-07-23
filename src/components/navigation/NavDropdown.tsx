
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavDropdownProps {
  label: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: DropdownItem[];
  isScrolled: boolean;
  isHighlighted?: boolean;
}

const NavDropdown = ({ 
  label, 
  isOpen, 
  setIsOpen, 
  items, 
  isScrolled,
  isHighlighted = false
}: NavDropdownProps) => {
  return (
    <div className="relative group">
      <button
        className={cn(
          "relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 flex items-center gap-1",
          isHighlighted ? "text-stark-red" : isScrolled ? "navbar scrolled text-charcoal hover:text-stark-red" : "navbar text-white hover:text-stark-red"
        )}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stark-red transition-all duration-300 group-hover:w-full"></span>
      </button>
      
      <div 
        className={cn(
          "absolute left-0 mt-1 w-max min-w-[12rem] whitespace-nowrap rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-150 ease-in-out",
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {items.map((item, index) => (
          <Link 
            key={index}
            to={item.to} 
            className="block px-4 py-2 text-sm text-charcoal hover:text-stark-red hover:bg-gray-50 transition-colors duration-200 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavDropdown;
