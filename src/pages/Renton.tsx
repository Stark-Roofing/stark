import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

const RentonLocation = () => {
  const content = (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Roofing Services in Renton, WA</h2>
        <p className="text-lg text-gray-700 mb-4">
          Renton has some of the most varied housing stock on the south end of Lake Washington. You've got 1950s ramblers in Kennydale, split-levels in Renton Highlands from the '70s, and newer builds up on Benson Hill. Every era of home comes with its own roofing problems, and we've worked on all of them. Stark Roofing & Renovation has been replacing and repairing roofs in Renton for years, and we know what decades of PNW rain does to these homes.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Renton Roofing Services</h3>
        <p className="text-gray-700 mb-4">
          Complete roofing and exterior services for Renton homeowners:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>Roof Replacement</strong> - Full tear-off and GAF shingle installation (HDZ, Grand Sequoia, Natural Shadow) with deck repair included</li>
          <li><strong>Flat Roofing</strong> - EverGuard PVC and Uniflex Silicone systems for flat sections over carports, additions, and garages</li>
          <li><strong>Roof Repair</strong> - Targeted leak repair, missing shingle replacement, and wind damage fixes</li>
          <li><strong>Windows and Skylights</strong> - Replacement windows and new skylight installation. Old aluminum-frame windows on 1960s Renton homes are usually the biggest energy loss in the house</li>
          <li><strong>Interior Finishing</strong> - Drywall, painting, and flooring repair when roof leaks damage the inside of your home</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Why Renton Homeowners Work With Us</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>GAF Master Elite Certified</strong> - Top 2% of roofers in the country. GAF backs our work with a 50-year shingle warranty and 20 years of labor coverage</li>
          <li><strong>Full-Project Crews</strong> - If your roof leaked and damaged the ceiling below, we do the roof, the drywall, and the paint. One crew, one invoice</li>
          <li><strong>Free Estimates, Straight Talk</strong> - We look at the roof, tell you what we find, and give you a written price. If a repair buys you five more years, we say so</li>
          <li><strong>Mid-Century Home Experience</strong> - Renton's older homes have 1x6 skip sheathing, thin plywood, and flashing that was never done right. We know what to expect and how to fix it</li>
          <li><strong>Financing Available</strong> - Flexible payment plans so you can get the roof done now without waiting</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Renton's Roofing Challenges</h3>
        <p className="text-gray-700 mb-4">
          Renton's older neighborhoods have roofs that survived decades of Pacific Northwest rain but are running out of time. We see cracked shingles, rusted flashing around old brick chimneys, and soft spots in the plywood deck from slow leaks that went unnoticed. The newer homes on Benson Hill deal with wind exposure and steep pitches that make proper installation critical. We fix what's underneath before we put anything new on top, because that's the part that determines whether a roof lasts.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Renton Roofing FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">My Renton home was built in the 1960s. Is the roof deck likely rotted?</h4>
            <p className="text-gray-700">Homes from that era used 1x6 skip sheathing or thin plywood, and after 60 years of rain, some of it will have soft spots. We check the deck during every tear-off and replace damaged sections before installing new shingles. The estimate includes a per-sheet price for plywood replacement so there are no surprises.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">How much does a roof replacement cost in Renton?</h4>
            <p className="text-gray-700">A typical Renton home runs $10,000 to $22,000 for a full replacement. The range depends on square footage, roof pitch, number of layers coming off, and how much deck repair we find underneath. Flat roof sections cost more per square foot than sloped. We give exact numbers in the written estimate, broken out by line item.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">What's the difference between your flat roof options?</h4>
            <p className="text-gray-700">EverGuard PVC is a membrane system with heat-welded seams that create a watertight bond stronger than the membrane itself. Uniflex Silicone is a coating system we apply over existing flat roofs that are still structurally sound. PVC is the full replacement, silicone is the restoration. We tell you which one fits your situation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Can you match shingle colors for my HOA?</h4>
            <p className="text-gray-700">GAF makes shingles in dozens of colors across three profile styles. We bring samples to the estimate so you can see them against your siding and trim. If your HOA has specific color requirements, send us the guidelines and we confirm the match before ordering materials.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Free Renton Roof Estimate</h3>
        <p className="text-gray-700 mb-4">
          Call Stark Roofing at <a href="tel:+12067398232" className="font-bold text-red-600 hover:underline">206-739-8232</a> for a free roof inspection and written estimate in Renton. We'll tell you what's going on up there and put a price on paper.
        </p>
      </div>
    </div>
  );

  return (
    <LocationPage
      city="Renton"
      state="WA"
      region="Greater Seattle"
      description="GAF Master Elite roofing contractor serving Renton. Roof replacement, flat roofing, and full exterior repair."
      content={content}
      heroImage="/hero-custom-6.webp"
      keywords="roofing contractor Renton, roof repair Renton WA, roofer Renton, roof replacement Renton, Renton roofing company"
      metaTitle="Roofing in Renton, WA | Stark Roofing & Renovation"
      metaDescription="Renton roofing from Kennydale to Benson Hill. GAF Master Elite certified, 20-year labor warranty. Free roof inspection and estimate, no sales pitch."
    />
  );
};

export default RentonLocation;
