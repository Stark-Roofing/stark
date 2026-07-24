
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileSubmenuItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

interface MobileSubmenuProps {
  title: string;
  items: MobileSubmenuItem[];
  onItemClick: () => void;
}

const MobileSubmenu = ({ title, items, onItemClick }: MobileSubmenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="py-1">
      <button
        onClick={toggleSubmenu}
        className="w-full text-left text-xl font-medium text-white hover:text-stark-red transition-colors flex items-center justify-between py-2 border-l-4 border-stark-red pl-4"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 space-y-3"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="text-lg font-medium text-white/80 hover:text-stark-red transition-colors flex items-center py-2 border-l-4 border-stark-red pl-4"
              onClick={onItemClick}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileSubmenu;
