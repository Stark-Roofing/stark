
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** @deprecated kept for backwards-compat with text logo; ignored now that logo is an image */
  textClassName?: string;
  textSize?: 'sm' | 'md' | 'lg';
  /** @deprecated tagline is baked into the badge image */
  withTagline?: boolean;
}

const Logo = ({
  className,
  textSize = 'md',
}: LogoProps) => {
  const heightClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-28 md:h-32'
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src="/stark_logo_badge.png"
        alt="Stark Roofing & Renovation logo"
        className={cn("w-auto", heightClasses[textSize])}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;
