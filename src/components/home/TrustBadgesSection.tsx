
import React from 'react';
import TrustBadges from './TrustBadges';

const TrustBadgesSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
          Trusted by Homeowners Across Washington
        </h2>
        <TrustBadges />
      </div>
    </section>
  );
};

export default TrustBadgesSection;
