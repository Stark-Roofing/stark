import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

const SammamishLocation = () => {
  const content = (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Roofing Services in Sammamish, WA</h2>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Here is the short answer:</span> Stark Roofing & Renovation is a GAF Master Elite contractor headquartered in Sammamish at 24243 SE 43rd Ct, handling roof replacement, roof repair, storm damage, gutters, and moss removal across the Plateau. We offer same-day emergency response, a free drone inspection with a written line-item estimate, and the Golden Pledge warranty (50-year material, 25-year labor). Call (206) 739-8232.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Stark Roofing & Renovation is headquartered right here in Sammamish at 24243 SE 43rd Ct — across the street from Pine Lake Elementary, ten minutes from Beaver Lake, fifteen minutes from the Trossachs trails. We're not a Seattle company driving out to do an estimate. We live here. The roofs we replace are on the same streets we drive every day, and the kids in our crews go to the same schools as yours. Sammamish gets more rain than downtown Seattle, more tree cover, and colder winter nights that cause freeze-thaw damage to aging shingles. We built this business around solving those problems — Plateau specifically.
        </p>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-lg border-l-4 border-red-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-700">GAF Master Elite</div>
            <div className="text-xs text-gray-600 mt-1">Top 2% of US contractors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">Golden Pledge®</div>
            <div className="text-xs text-gray-600 mt-1">50yr material · 25yr labor</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">Sammamish HQ</div>
            <div className="text-xs text-gray-600 mt-1">24243 SE 43rd Ct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">Same-day</div>
            <div className="text-xs text-gray-600 mt-1">Emergency response on the Plateau</div>
          </div>
        </div>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Neighborhoods We Serve From Sammamish HQ</h3>
        <p className="text-gray-700 mb-4">
          Twenty minutes or less from our shop to every street in Sammamish. We work daily across:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
          <div>• Pine Lake</div>
          <div>• Beaver Lake</div>
          <div>• Trossachs</div>
          <div>• Klahanie</div>
          <div>• Inglewood Hill</div>
          <div>• Sahalee</div>
          <div>• Plateau North</div>
          <div>• Plateau South</div>
          <div>• Highlands</div>
          <div>• Pine Lake Estates</div>
          <div>• Sammamish Heights</div>
          <div>• Downtown Sammamish</div>
        </div>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Sammamish Roofing Services</h3>
        <p className="text-gray-700 mb-4">
          From our Sammamish headquarters, we provide:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong><a href="/roof-replacement" className="text-red-700 hover:underline">Roof Replacement</a></strong> — GAF HDZ, Grand Sequoia, and Natural Shadow shingles with full system components and Golden Pledge warranty</li>
          <li><strong><a href="/roof-repair" className="text-red-700 hover:underline">Roof Repair & Emergency</a></strong> — Storm damage, active leaks, wind damage. Same-day response across the Plateau</li>
          <li><strong><a href="/gutter-replacement" className="text-red-700 hover:underline">Gutter Replacement</a></strong> — Seamless aluminum gutters sized for Sammamish's heavy rainfall and tree debris</li>
          <li><strong><a href="/skylights" className="text-red-700 hover:underline">Skylight Installation</a></strong> — New Velux skylights and replacement of old, leaking units with proper flashing</li>
          <li><strong><a href="/siding-installation" className="text-red-700 hover:underline">Siding & Windows</a></strong> — Full exterior renovation: fiber cement siding, vinyl, and energy-efficient window replacement</li>
          <li><strong><a href="/roof-cleaning" className="text-red-700 hover:underline">Roof Cleaning</a></strong> — Moss and algae soft-wash treatment to extend the life of your current roof (warranty-safe — never pressure-washed)</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Sammamish Plateau Weather and Your Roof</h3>
        <p className="text-gray-700 mb-4">
          The Sammamish Plateau sits at a higher elevation than most Eastside cities, and that changes the math on your roof. Colder overnight temperatures in winter mean more freeze-thaw cycles cracking old shingles and flashing. The dense tree cover from Pine Lake down through Beaver Lake holds moisture against roofs and accelerates moss growth. And when windstorms come up the Issaquah-Sammamish corridor, the exposed elevation around Trossachs and Sahalee means shingles take a harder hit than they would in lower-lying areas. We install roofing systems that account for all of it: ice and water shield in every valley, proper ventilation to prevent condensation, and shingles rated for 130 mph winds.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Sammamish Roofing FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">How much does a roof replacement cost in Sammamish?</h4>
            <p className="text-gray-700">Most Sammamish homes run $17,500 to $26,000 for architectural asphalt in 2026, with larger Plateau homes (3,000+ sq ft, steep pitch) clearing $32K-$40K. Premium materials like GAF Grand Sequoia or standing seam metal go higher. We give exact numbers in the estimate, broken out by line item — never a "starting at" number with surprises later.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Does the higher elevation in Sammamish cause ice dam problems?</h4>
            <p className="text-gray-700">It can, especially on north-facing slopes in Trossachs and the higher Plateau elevations. Ice dams form when heat escapes through the roof, melts snow on top, and the meltwater refreezes at the eaves. We install ice and water shield at the eaves and in the valleys, and we check your attic ventilation to reduce heat loss. Proper ventilation is the best prevention.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">My Sammamish home has original cedar shake. Should I convert?</h4>
            <p className="text-gray-700">Most Sammamish cedar shake roofs from the 70s and 80s are at or past end of life — typical Plateau cedar lasts 18 to 22 years with maintenance, much less without. We convert cedar to GAF architectural asphalt or Nu-Ray standing seam metal. The conversion requires a skip-sheathing deck replacement first (full plywood underlayment), then the new system on top. Total Sammamish cedar conversion runs $24K to $42K depending on roof size and material choice. We document the deck condition with photos before quoting so the price reflects exactly what's needed.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">How fast can I get a drone inspection in Sammamish?</h4>
            <p className="text-gray-700">Same day or next day for any Plateau address. Our shop is at 24243 SE 43rd Ct, so most Sammamish homes are inside 15 minutes of our drone tech. You get the full photo set within 24 hours, including any issues spotted from the air — flashing, lifted shingles, moss accumulation, debris in valleys. Free, no obligation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Can you do emergency repairs the same day?</h4>
            <p className="text-gray-700">For Sammamish, yes. Our shop is in town, our crews live in the area, and we carry common repair materials on the truck. If you have an active leak or storm damage, call us at <a href="tel:+12067398232" className="font-bold text-red-600 hover:underline">206-739-8232</a> and we'll get someone out the same day when conditions allow safe work.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Free Sammamish Roof Estimate</h3>
        <blockquote className="text-gray-700 italic border-l-4 border-red-600 pl-4 mb-4">
          "Stark replaced our roof in Trossachs last fall. Brenda's crew was on time every day, cleaned up so well you couldn't tell they were there, and the new GAF Grand Sequoia looks great. We got three quotes — Stark wasn't the cheapest, but they were the only Master Elite on the list and the only one that put the Golden Pledge warranty in writing."
          <footer className="text-sm text-gray-500 mt-2">— Sammamish homeowner, Plateau North</footer>
        </blockquote>
        <p className="text-gray-700 mb-4">
          <strong>Stark Roofing & Renovation</strong><br />
          24243 SE 43rd Ct, Sammamish, WA 98029<br />
          Call <a href="tel:+12067398232" className="font-bold text-red-600 hover:underline">206-739-8232</a> for a free drone inspection and written estimate. Or <a href="/contact" className="font-bold text-red-600 hover:underline">request online here</a>.
        </p>
      </div>
    </div>
  );

  return (
    <LocationPage
      city="Sammamish"
      state="WA"
      region="Greater Seattle"
      description="Your neighbor's roofer, headquartered on the Sammamish Plateau. GAF Master Elite, Golden Pledge warranty, same-day emergency response. Serving Pine Lake, Beaver Lake, Trossachs, Klahanie, Sahalee, and every Plateau neighborhood."
      content={content}
      heroImage="/hero-custom-sammamish.webp"
      keywords="roofing contractor Sammamish, roof repair Sammamish WA, roofer Sammamish, roof replacement Sammamish, Sammamish roofing company, Pine Lake roofer, Trossachs roofing, Plateau roofer"
      metaTitle="Sammamish Roofer — GAF Master Elite | Stark Roofing & Renovation"
      metaDescription="Your neighbor's roofer. Stark is headquartered on the Sammamish Plateau at 24243 SE 43rd Ct. GAF Master Elite, Golden Pledge warranty (50yr material/25yr labor), same-day emergency response."
    />
  );
};

export default SammamishLocation;
