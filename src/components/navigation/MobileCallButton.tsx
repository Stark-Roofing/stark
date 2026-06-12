
import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileCallButtonProps {
  onClick?: () => void;
}

const MobileCallButton = ({ onClick }: MobileCallButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="animate-pulse-glow fixed bottom-5 left-0 right-0 mx-auto px-6 z-[1010] w-full max-w-xs"
    >
      <a 
        href="tel:+12067398232" 
        className="bg-stark-red text-white font-semibold py-3 px-4 rounded-md text-center flex items-center justify-center gap-2 shadow-lg"
        onClick={onClick}
      >
        <Phone size={18} className="animate-pulse" />
        <span>Call Now: (206) 739-8232</span>
      </a>
    </motion.div>
  );
};

export default MobileCallButton;
