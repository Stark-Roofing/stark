
import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PhoneButtonProps {
  isScrolled: boolean;
}

const PhoneButton = ({ isScrolled }: PhoneButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="animate-pulse-glow rounded-full inline-block"
    >
      <a 
        href="tel:+12067398232" 
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ease-in-out",
          isScrolled 
            ? "bg-stark-red text-white hover:bg-stark-redHover" 
            : "bg-white/20 backdrop-blur-sm navbar text-white hover:bg-white/30"
        )}
      >
        <Phone size={18} />
        <span className="font-medium">Call Now</span>
      </a>
    </motion.div>
  );
};

export default PhoneButton;
