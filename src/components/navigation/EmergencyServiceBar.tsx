
import React from 'react';
import { Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EmergencyServiceBar = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="emergency-bar" className="bg-stark-red text-white py-2 text-center font-bold">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-1">
        <Phone size={isMobile ? 12 : 14} className="animate-pulse" />
        <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
          Emergency 24/7 Call Now! <a href="tel:2067398232" className="underline hover:no-underline">(206) 739-8232</a>
        </span>
      </div>
    </div>
  );
};

export default EmergencyServiceBar;
