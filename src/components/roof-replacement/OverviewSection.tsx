
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const OverviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-heading font-bold text-navy mb-6 text-center md:text-left">When Is It Time for a Roof Replacement?</h2>
            <p className="text-charcoal/80 mb-4 text-center md:text-left leading-relaxed">
              Here is the short answer: an asphalt roof in Western Washington protects your home for roughly 20 years, and most full replacements take 1 to 3 days on the roof once materials arrive. Stark Roofing & Renovation is a GAF Master Elite contractor (top 2% nationwide) with 30+ years of experience and 2,000+ roofs completed across the Eastside, and every replacement we install qualifies for the GAF Golden Pledge warranty: up to 50 years on materials, 25 on workmanship.
            </p>
            <p className="text-charcoal/80 mb-4 text-center md:text-left leading-relaxed">
              Severe weather, poor maintenance, and the quality of the original installation can shorten a roof's lifespan well below that 20-year mark.
            </p>
            <p className="text-charcoal/80 mb-4 text-center md:text-left">
              Common signs that indicate your roof needs replacement include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-charcoal/80 space-y-2 text-left inline-block md:block">
              <li>Multiple missing, cracked, or curling shingles</li>
              <li>Significant granule loss in gutters</li>
              <li>Visible sagging areas on your roof</li>
              <li>Water leaks or stains on interior ceilings</li>
              <li>Daylight visible through roof boards</li>
              <li>Your roof is over 20 years old</li>
            </ul>
            <div className="flex justify-center md:justify-start">
              <Link to="#contact" className="inline-block">
                <Button className="bg-stark-red hover:bg-stark-redHover text-white">
                  Get a Free Estimate
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/e2f4fef0-a179-4f5e-98e4-e19e7c678191.webp" 
              alt="Gray architectural shingle roof with multiple peaks" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
