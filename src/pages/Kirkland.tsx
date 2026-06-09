import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

const KirklandLocation = () => {
  const content = (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Roofing Services in Kirkland, WA</h2>
        <p className="text-lg text-gray-700 mb-4">
          Stark Roofing & Renovation has replaced roofs in every Kirkland neighborhood — from the older 70s and 80s cedar shake homes in Juanita and Rose Hill to the newer construction around Totem Lake. Kirkland's mix of mature tree cover, lakefront humidity, and aging cedar makes it one of the more nuanced roofing markets on the Eastside. This page covers what's actually different about Kirkland roofs, the cedar shake conversion process most homeowners eventually face, and how Stark handles each.
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
            <div className="text-2xl font-bold text-red-700">Cedar Shake Specialists</div>
            <div className="text-xs text-gray-600 mt-1">Conversion experts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">Sammamish HQ</div>
            <div className="text-xs text-gray-600 mt-1">15 min to Kirkland</div>
          </div>
        </div>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Kirkland Neighborhoods We Serve</h3>
        <p className="text-gray-700 mb-4">
          Twenty minutes or less from our Sammamish shop. We work daily across:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
          <div>• Juanita</div>
          <div>• Houghton</div>
          <div>• Totem Lake</div>
          <div>• Finn Hill</div>
          <div>• Kingsgate</div>
          <div>• Rose Hill</div>
          <div>• Bridle Trails</div>
          <div>• Norkirk</div>
          <div>• Downtown Kirkland</div>
          <div>• Lakeview</div>
          <div>• Moss Bay</div>
          <div>• Market</div>
        </div>
      </div>

      <div className="text-center md:text-left bg-amber-50 p-6 rounded-lg border-l-4 border-amber-600">
        <h3 className="text-2xl font-semibold mb-3">Cedar Shake Conversion in Kirkland</h3>
        <p className="text-gray-700 mb-3">
          Most Kirkland cedar shake roofs from the 70s and 80s are at or past end of life — typical Kirkland cedar lasts 18 to 22 years with maintenance, much less without. If your Juanita, Rose Hill, or Houghton home still has original cedar, you're likely seeing curling shakes, moss buildup, or active leaks. The conversion to GAF architectural asphalt or Nu-Ray standing seam metal is straightforward but requires a specific process:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 text-left mb-3">
          <li><strong>Full tear-off</strong> of cedar shakes and existing skip sheathing</li>
          <li><strong>New plywood deck</strong> installed over the rafters (cedar doesn't use solid sheathing — modern systems require it)</li>
          <li><strong>Ice and water shield</strong> at eaves, valleys, and around all penetrations</li>
          <li><strong>Synthetic underlayment</strong> across the field</li>
          <li><strong>GAF architectural shingles or standing seam metal</strong> as the finish layer</li>
          <li><strong>Golden Pledge warranty registration</strong> (Master Elite requirement)</li>
        </ul>
        <p className="text-gray-700 mb-3">
          Total Kirkland cedar conversion runs $24K to $42K depending on roof size and material choice. We document the deck condition with photos before quoting so the price reflects exactly what's needed.
        </p>
        <p className="text-sm text-gray-600">
          → Read the full guide: <a href="/blog/cedar-shake-conversion-kirkland" className="font-bold text-red-700 hover:underline">Cedar Shake Conversion in Kirkland: What Homeowners Need to Know</a>
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Kirkland Roofing Services</h3>
        <p className="text-gray-700 mb-4">
          Full-service roofing and renovation across Kirkland:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left">
          <li><strong><a href="/roof-replacement" className="text-red-700 hover:underline">Roof Replacement</a></strong> — GAF Timberline HDZ, Grand Sequoia, and Camelot architectural shingles. Cedar shake conversions a specialty.</li>
          <li><strong><a href="/roof-repair" className="text-red-700 hover:underline">Roof Repair & Emergency</a></strong> — Storm damage, leak repair, flashing replacement. Same-day response across Kirkland.</li>
          <li><strong><a href="/gutter-replacement" className="text-red-700 hover:underline">Seamless Gutter Replacement</a></strong> — Sized for Kirkland's dense canopy and lakefront humidity</li>
          <li><strong><a href="/gutter-repair" className="text-red-700 hover:underline">Gutter Repair</a></strong> — Sag, leak seam, downspout disconnect</li>
          <li><strong><a href="/roof-cleaning" className="text-red-700 hover:underline">Soft-Wash Roof Cleaning</a></strong> — Moss removal without granule damage (never pressure-washed)</li>
          <li><strong><a href="/skylights" className="text-red-700 hover:underline">Skylight Installation</a></strong> — Velux replacement and new install with proper flashing</li>
          <li><strong><a href="/siding-installation" className="text-red-700 hover:underline">Siding & Windows</a></strong> — Fiber cement, James Hardie, and energy-efficient window replacement</li>
          <li><strong><a href="/commercial-roofing" className="text-red-700 hover:underline">Commercial Roofing</a></strong> — TPO and modified bitumen for flat commercial roofs</li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">What's Different About Kirkland Roofs</h3>
        <p className="text-gray-700 mb-4">
          Kirkland sits between Lake Washington and the Eastside hills, and that combination drives three things most roofers don't account for. <strong>The tree canopy</strong> across Bridle Trails, Finn Hill, and Rose Hill is some of the densest in King County — conifer needles drop continuously and accelerate gutter clog and roof moss. <strong>Lake-effect humidity</strong> on the Houghton, Moss Bay, and lakefront streets keeps everything damp longer than even Bellevue or Redmond. <strong>The cedar shake legacy</strong> from older builds means many Kirkland homes are mid-conversion or due for conversion. We install systems that account for all three: ice and water shield in every valley, ridge venting that handles continuous humidity, and shingles rated for lakefront wind exposure.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Kirkland Roofing FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">My Kirkland home has cedar shake. Should I convert or repair?</h4>
            <p className="text-gray-700">If your cedar is 18+ years old or showing curling, lifting, or moss buildup, conversion is almost always cheaper long-term than repair. Cedar maintenance runs $800 to $2,500 per year on top of inevitable repair calls. A full conversion to GAF architectural asphalt is $24K to $34K for a typical Kirkland home and lasts 20-25 years with Golden Pledge warranty. Conversion to standing seam metal runs $38K to $54K with a 50-70 year horizon.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">How much does roof replacement cost in Kirkland?</h4>
            <p className="text-gray-700">Most Kirkland asphalt roof replacements run $15,500 to $24,000 for standard size homes. Larger Bridle Trails and Finn Hill homes with complex roof lines clear $30K. Cedar conversions run higher because of the additional deck replacement step. Standing seam metal is $35K-$54K. We quote line-item so you see exactly what drives the number.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Do I need a permit in Kirkland?</h4>
            <p className="text-gray-700">Kirkland Building Department requires permits when the work alters structure, sheathing, or load — which is basically every cedar shake conversion (because of the new deck) and most replacements. Permit fees run $200 to $400. Stark pulls the permit through Kirkland Building. Final inspection within 5-10 days post-completion.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">How fast can I get a drone inspection in Kirkland?</h4>
            <p className="text-gray-700">Same day or next day. Our shop is 15 minutes from most Kirkland addresses. You get the full photo set within 24 hours, with any issues annotated — moss spots, flashing concerns, lifted shingles, gutter sag. Free, no obligation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Are GAF Master Elite contractors common in Kirkland?</h4>
            <p className="text-gray-700">No. Master Elite is held by about 2 percent of US roofing contractors. Most Kirkland-area roofers are GAF Certified or Authorized (lower tiers). Master Elite is the only certification that unlocks the GAF Golden Pledge warranty — 50 years on materials, 25 years on workmanship, transferable to the next buyer. For Kirkland's active resale market, the transferable warranty matters.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-3">Free Kirkland Roof Estimate</h3>
        <blockquote className="text-gray-700 italic border-l-4 border-red-600 pl-4 mb-4">
          "Our 1981 Rose Hill home had original cedar shake that was way past due. Stark walked us through the conversion process honestly — full deck replacement plus GAF architectural — and the final number matched the quote exactly. Crew was professional, cleanup was perfect, and the Golden Pledge warranty was a real deciding factor for resale."
          <footer className="text-sm text-gray-500 mt-2">— Kirkland homeowner, Rose Hill</footer>
        </blockquote>
        <p className="text-gray-700 mb-4">
          <strong>Stark Roofing & Renovation</strong><br />
          Sammamish HQ — 15 minutes from Kirkland<br />
          <a href="/contact" className="font-bold text-red-600 hover:underline">Request a free drone inspection and written estimate online</a>.
        </p>
      </div>
    </div>
  );

  return (
    <LocationPage
      city="Kirkland"
      state="WA"
      region="Greater Seattle"
      description="Kirkland roofing by a GAF Master Elite contractor. Cedar shake conversion specialists, Golden Pledge warranty, same-day drone inspections. Serving Juanita, Houghton, Rose Hill, Finn Hill, Totem Lake, Bridle Trails, and every Kirkland neighborhood."
      content={content}
      heroImage="/hero-custom-5.jpg"
      keywords="roofing contractor Kirkland, roof repair Kirkland WA, roofer Kirkland, roof replacement Kirkland, cedar shake conversion Kirkland, cedar shake to asphalt Kirkland, GAF Master Elite Kirkland"
      metaTitle="Kirkland Roofer — GAF Master Elite + Cedar Shake Specialist | Stark"
      metaDescription="Kirkland cedar shake conversion + roof replacement by a GAF Master Elite contractor. Golden Pledge warranty (50yr material/25yr labor). Free drone inspections in Juanita, Rose Hill, Houghton, Bridle Trails."
    />
  );
};

export default KirklandLocation;
