import React from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const EmergencyBanner = () => {
  return <motion.div id="emergency-bar" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="fixed top-0 left-0 w-full bg-[#CC0000] text-white z-[9999] py-px">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 animate-pulse" size={20} />
            <p className="font-bold">Emergency Roof Repair Available 24/7</p>
          </div>
          
          <Button size="sm" className="bg-white text-[#CC0000] hover:bg-white/90 hover:text-[#990000] font-medium animate-pulse-glow" asChild>
            <a href="tel:+12067398232" className="inline-flex items-center">
              <Phone size={16} className="mr-2" />
              Call Now: (206) 739-8232
            </a>
          </Button>
        </div>
      </div>
    </motion.div>;
};
export default EmergencyBanner;