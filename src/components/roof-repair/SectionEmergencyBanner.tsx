import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const SectionEmergencyBanner = () => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="w-full text-white py-5 shadow-md relative z-10 bg-stark-red">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <AlertTriangle className="mr-2 animate-pulse" size={20} />
            <p className="font-semibold text-xl text-slate-50">Emergency Roof Repair Available 24/7</p>
          </div>

          <Button size="sm" className="bg-white text-stark-red hover:bg-white/90 hover:text-stark-red/90 font-medium animate-pulse-glow" asChild>
            <Link to="/contact" className="inline-flex items-center">
              Request Service
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>;
};
export default SectionEmergencyBanner;