import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

const WoodinvilleLocation = () => {
  const content = (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Roofing Services in Woodinville, WA</h2>
        <p className="text-lg text-gray-700 mb-4">
          Woodinville's heavy tree canopy drops needles, leaves, and branches onto roofs year-round. That debris traps moisture against your shingles and feeds moss growth that shortens the life of any roof. Stark Roofing & Renovation works across Woodinville from Hollywood Hill down through the Sammamish River Valley, replacing and repairing roofs that have taken years of this kind of punishment.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Woodinville Roofing Services</h3>
        <p className="text-gray-700 mb-4">
          Full-service roofing and exterior work for Woodinville homeowners:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>Roof Replacement</strong> - Complete tear-off and GAF shingle installation (HDZ, Grand Sequoia, Natural Shadow)</li>
          <li><strong>Roof Repair</strong> - Leak tracing, damaged shingle replacement, flashing repair around chimneys and skylights</li>
          <li><strong>Gutter Replacement</strong> - Properly sized gutters and downspouts for homes with heavy tree cover</li>
          <li><strong>Siding Installation</strong> - James Hardie fiber cement and LP SmartSide to handle Woodinville's moisture</li>
          <li><strong>Flat Roofing</strong> - EverGuard PVC and Uniflex Silicone systems for low-slope sections on additions and garages</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Why Woodinville Homeowners Work With Us</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong>GAF Master Elite Certified</strong> - Top 2% of roofers nationwide. Backed by GAF's 50-year shingle and 20-year labor warranty</li>
          <li><strong>Local Eastside Experience</strong> - We know what Woodinville weather does to roofs: the moss, the debris, the wind-driven rain off the valley</li>
          <li><strong>Free Estimates</strong> - We walk the roof, take photos, and give you a written quote with line items. No sales pitch</li>
          <li><strong>Cedar Shake Conversions</strong> - Many Woodinville homes still have 30-year-old cedar shake. We tear it off, fix the deck, and install modern shingles</li>
          <li><strong>One Crew, One Project</strong> - Roof, gutters, siding, and interior damage repair handled by one team on one schedule</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Woodinville Weather and Your Roof</h3>
        <p className="text-gray-700 mb-4">
          Woodinville sits in a river valley surrounded by mature firs, cedars, and maples. The combination of constant shade and Pacific Northwest rain creates ideal conditions for moss and algae on roofs. Most of the homes here were built in the 1980s and 1990s, and the original roofs are past their expected lifespan. We see a lot of curling shingles, granule loss, and soft spots in the plywood from slow leaks that went unnoticed for years.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Woodinville Roofing FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">How much does a roof replacement cost in Woodinville?</h4>
            <p className="text-gray-700">Most Woodinville homes run $12,000 to $25,000 depending on roof size, how many layers we tear off, and the condition of the deck underneath. Cedar shake tear-offs cost more because the material is heavier and the sheathing almost always needs repair. We give exact numbers in the estimate, not ranges.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">My roof has thick moss. Does that mean I need a full replacement?</h4>
            <p className="text-gray-700">Not always. If the shingles underneath are still flat and sealed, we can treat the moss and install zinc strips to slow regrowth. But if the moss has lifted shingle edges and water has been getting underneath for years, treatment won't undo that damage. We check the shingle condition under the moss and show you what we find.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Will wind off the Sammamish River Valley damage new shingles?</h4>
            <p className="text-gray-700">GAF HDZ shingles are rated for 130 mph winds when installed with the full system. We use six nails per shingle in wind-prone areas and proper adhesive sealing. The failures we see from wind are usually on older 3-tab shingles that have lost their seal strips.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">How long does a Woodinville roof replacement take?</h4>
            <p className="text-gray-700">Two to four days for a standard single-family home. Steeper roofs and cedar shake tear-offs add time. We seal any exposed sections before leaving each day, regardless of the forecast.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Free Woodinville Roof Estimate</h3>
        <p className="text-gray-700 mb-4">
          Call Stark Roofing at <a href="tel:+12067398232" className="font-bold text-red-600 hover:underline">206-739-8232</a> for a free roof inspection and written estimate in Woodinville.
        </p>
      </div>
    </div>
  );

  return (
    <LocationPage
      city="Woodinville"
      state="WA"
      region="Greater Seattle"
      description="GAF Master Elite roofing contractor serving Woodinville. Cedar shake conversions, roof replacement, and repair."
      content={content}
      heroImage="/hero-custom-1.webp"
      keywords="roofing contractor Woodinville, roof repair Woodinville WA, roofer Woodinville, roof replacement Woodinville, Woodinville roofing company"
      metaTitle="Roofing in Woodinville, WA | Stark Roofing & Renovation"
      metaDescription="Woodinville roofer for tree-heavy lots and moss-prone roofs. GAF Master Elite certified with 20-year warranty. Free estimate, line-item pricing."
    />
  );
};

export default WoodinvilleLocation;
