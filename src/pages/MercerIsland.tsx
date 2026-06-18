import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

const MercerIslandLocation = () => {
  const content = (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Roofing Services on Mercer Island, WA</h2>
        <p className="text-lg text-gray-700 mb-4">
          Mercer Island sits in the middle of Lake Washington, and that island setting shapes everything about how its roofs age. Water on every side means higher humidity and marine air that work on flashing and fasteners harder than they do inland. The mature tree canopy that gives the island its character keeps roofs shaded and damp, which is exactly what moss needs. And the island's homes skew larger and higher-value, from the established mid-century houses of the north end to the newer luxury builds near the waterfront, so the roofing has to match the home. Stark Roofing & Renovation works Mercer Island from our Sammamish HQ, a short trip across I-90, and our specs are built for exactly these lake-effect conditions.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Mercer Island Roofing Services</h3>
        <p className="text-gray-700 mb-4">
          Full-service roofing, gutters, and exterior renovation for Mercer Island homes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>Roof Replacement</strong> - GAF HDZ, Grand Sequoia, and Camelot II architectural and designer shingles with full system components and a 50-year material warranty</li>
          <li><strong>Roof Repair</strong> - Leak diagnosis, storm damage, flashing failures, and the marine-air corrosion issues common to lake-adjacent homes. Same-day response for active leaks when conditions allow</li>
          <li><strong>Roof Cleaning</strong> - Soft-wash moss and algae treatment tuned for the island's heavy shade and lake humidity</li>
          <li><strong>Gutter Replacement</strong> - 6-inch seamless gutters sized for the rainfall and constant tree debris on Mercer Island lots</li>
          <li><strong>Skylight Installation</strong> - Velux skylights with engineered flashing for a watertight seal through the wet months</li>
          <li><strong>Siding and Windows</strong> - Fiber cement siding and energy-efficient windows for full exterior renovation on luxury homes</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Why Mercer Island Homeowners Trust Stark Roofing</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>GAF Master Elite Certified</strong> - Top 2% of roofers nationwide. GAF's strongest warranty: 50-year materials, 20-year workmanship</li>
          <li><strong>Free Drone Inspections</strong> - Drone-assisted assessments with high-resolution photos and a written report you can keep, ideal for the larger roofs common on the island</li>
          <li><strong>Transparent Pricing</strong> - Line-item written estimates with no hidden fees and no high-pressure sales</li>
          <li><strong>Marine-Air-Aware Specs</strong> - We spec corrosion-resistant flashing and fasteners on lake-adjacent homes, where standard materials streak and fail early</li>
          <li><strong>Financing Available</strong> - Payment plans through approved partners for full roof and exterior projects</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Mercer Island Climate and Your Roof</h3>
        <p className="text-gray-700 mb-4">
          Mercer Island's island position surrounds every home with water, which raises humidity and brings marine air that accelerates flashing corrosion and fastener failure compared to inland homes. The dense, mature tree canopy that shades much of the island keeps north-facing slopes damp well into summer, feeding the moss that is the leading cause of early roof failure here. Lake-effect weather also means real wind exposure on the waterfront. Our Mercer Island installations include corrosion-resistant flashing and fasteners on lake-adjacent homes, ice and water shield at the eaves and valleys, proper ventilation for the long wet season, and zinc strips for moss prevention as a standard part of every replacement.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Mercer Island Roofing FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">How much does a roof replacement cost on Mercer Island?</h4>
            <p className="text-gray-700">Most Mercer Island homes run $16,000 to $34,000 depending on size, pitch, and material. The island's larger luxury homes and waterfront properties with complex rooflines and premium material choices run higher. Marine-air-rated flashing and fasteners add modestly to the cost but are worth it on lake-adjacent homes. Every estimate is written and broken out line by line.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Does the lake setting really affect my roof?</h4>
            <p className="text-gray-700">Yes. Surrounding water raises humidity and brings marine air that corrodes standard flashing and fasteners faster than inland homes experience. On waterfront and lake-adjacent Mercer Island homes we spec corrosion-resistant materials, which is the difference between flashing that lasts the life of the roof and flashing that streaks and fails within a decade.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">My Mercer Island home has heavy moss. Clean or replace?</h4>
            <p className="text-gray-700">It depends on the shingle condition under the moss. Moss growing under three years usually comes off with a soft-wash treatment and the shingles are fine. Moss established for five or more years often hides shingles that have lost granules and started to lift, at which point cleaning buys a year or two but replacement is the better call. Our free drone inspection looks at the actual shingle surface, not just the moss layer.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Do you work on large and luxury homes on the island?</h4>
            <p className="text-gray-700">Regularly. Mercer Island's homes skew larger and higher-value, and we handle the full range from established mid-century homes to new waterfront luxury builds. Drone inspection is especially useful on the larger, more complex roofs, and our designer shingle and standing seam metal options match the architecture of premium island homes.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Free Mercer Island Roof Estimate</h3>
        <p className="text-gray-700 mb-4">
          <strong>Stark Roofing & Renovation</strong><br />
          Serving Mercer Island from our Sammamish HQ at 24243 SE 43rd Ct, Sammamish, WA 98029<br />
          <a href="/contact" className="font-bold text-red-600 hover:underline">Request a free roof inspection and written estimate online</a>.
        </p>
      </div>
    </div>
  );

  return (
    <LocationPage
      city="Mercer Island"
      state="WA"
      region="Greater Seattle"
      description="Roofing contractor serving Mercer Island with GAF Master Elite certification, marine-air-aware specs, and 20-year labor warranty. Free drone inspections."
      content={content}
      heroImage="/hero-custom-mercer-island.webp"
      keywords="roofing contractor Mercer Island, roof repair Mercer Island WA, roofer Mercer Island, roof replacement Mercer Island, Mercer Island roofing company"
      metaTitle="Roofing on Mercer Island, WA | Stark Roofing & Renovation"
      metaDescription="Mercer Island roofer with marine-air-aware specs and moss-prevention standard. GAF Master Elite, 20-year labor warranty. Free drone inspections with written estimates."
    />
  );
};

export default MercerIslandLocation;
