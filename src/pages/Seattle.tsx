import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

const SeattleLocation = () => {
  const content = (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Roofing Services in Seattle, WA</h2>
        <p className="text-lg text-gray-700 mb-4">
          Stark Roofing & Renovation is your trusted roofing contractor for Seattle. With over 30 years of roofing experience and more than 2,000 completed roofs across the Puget Sound, we've built our reputation on quality workmanship, transparent pricing, and exceptional customer service.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Seattle Roofing Services</h3>
        <p className="text-gray-700 mb-4">
          We specialize in:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>Roof Replacement</strong> - Complete roof replacement with GAF premium shingles</li>
          <li><strong>Roof Repair</strong> - Quick emergency roof repairs for storm damage or leaks</li>
          <li><strong>Gutter Replacement & Repair</strong> - Seamless gutters and gutter cleaning</li>
          <li><strong>Siding Installation</strong> - James Hardie and other premium siding materials</li>
          <li><strong>Window Replacement</strong> - Energy-efficient replacement windows</li>
          <li><strong>Commercial Roofing</strong> - TPO and flat roof solutions for Seattle businesses</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Why Choose Stark Roofing in Seattle?</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>GAF Certified</strong> - Factory-trained installers using premium GAF materials</li>
          <li><strong>Decades of Expertise</strong> - 30+ years of roofing experience and 2,000+ completed roofs across the Puget Sound</li>
          <li><strong>Free Estimates</strong> - No-obligation, detailed roof inspections</li>
          <li><strong>Transparent Pricing</strong> - Competitive rates with financing options available</li>
          <li><strong>Quality Guarantee</strong> - Comprehensive warranty on all work</li>
          <li><strong>Emergency Services</strong> - Available for urgent storm damage and leaks</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Seattle Weather & Your Roof</h3>
        <p className="text-gray-700 mb-4">
          Seattle's wet climate and occasional storms demand robust roofing solutions. Our GAF-certified installers understand the unique challenges of Puget Sound weather and install roofs built to last through decades of rain and wind. Regular roof maintenance and prompt repairs can extend your roof's lifespan significantly.
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Ready for Your Free Estimate?</h3>
        <p className="text-gray-700 mb-4">
          Call us today at <strong>206-739-8232</strong> or submit the form above for a free, no-obligation roof inspection and estimate.
        </p>
      </div>
    </div>
  );

  return (
    <LocationPage
      city="Seattle"
      state="WA"
      region="Greater Seattle"
      description="Trusted Seattle roofing contractor with 30+ years of experience and 2,000+ completed roofs across the Puget Sound."
      content={content}
      heroImage="/hero-custom-7.webp"
      keywords="roofing contractor Seattle, roof repair Seattle WA, roof replacement Seattle, roofer Seattle, GAF certified Seattle"
      metaTitle="Roofing in Seattle, WA | Stark Roofing & Renovation"
      metaDescription="GAF Master Elite roofing contractor in Seattle. 2,000+ roofs completed, 25-year labor warranty. Call for a free roof inspection and estimate today."
    />
  );
};

export default SeattleLocation;
