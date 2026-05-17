import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingCTAProps {
  label?: string;
}

// Disabled 2026-05-16 per client request — the dark bar was felt intrusive
// across service pages. Component preserved so consumers (10+ pages) compile;
// to re-enable, restore the scroll listener + AnimatePresence block below.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FloatingCTA: React.FC<FloatingCTAProps> = ({ label = 'Free Estimate' }) => null;

export default FloatingCTA;
