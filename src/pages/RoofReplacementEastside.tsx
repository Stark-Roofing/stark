import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import ServicePageHero from '@/components/shared/ServicePageHero';
import HorizontalContactForm from '@/components/home/HorizontalContactForm';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import EmergencyServiceBar from '@/components/navigation/EmergencyServiceBar';
import BreadcrumbSchema from '@/components/shared/BreadcrumbSchema';
import ServiceSchema from '@/components/shared/ServiceSchema';
import { useSEOMeta } from '@/hooks/useSEOMeta';

const RoofReplacementEastside = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonical = 'https://starkroofingrenovation.com/roof-replacement-eastside';
  const heroImage = '/hero-custom-3.webp';

  useSEOMeta({
    title: 'Roof Replacement Eastside King County WA | Stark Roofing',
    description:
      'GAF Master Elite roof replacement across the Eastside — Sammamish, Bellevue, Redmond, Kirkland, Issaquah. Real 2026 cost ranges, line-item quotes, 50-year Golden Pledge warranty. Free drone inspection.',
    canonical,
    keywords:
      'roof replacement eastside king county wa, eastside roof replacement, roof replacement sammamish bellevue redmond kirkland issaquah, gaf master elite eastside, eastside roofer 2026 cost',
    ogTitle: 'Roof Replacement Eastside King County WA | Stark Roofing',
    ogDescription:
      'Eastside roof replacement done right. GAF Master Elite, Golden Pledge 50-year warranty, real 2026 cost numbers across 5 Eastside cities. Free drone inspection.',
    ogImage: `https://starkroofingrenovation.com${heroImage}`,
    twitterTitle: 'Roof Replacement Eastside King County WA | Stark Roofing',
    twitterDescription:
      'Eastside roof replacement: GAF Master Elite, real 2026 cost ranges, 50-year warranty. Free drone inspection across Sammamish, Bellevue, Redmond, Kirkland, Issaquah.',
    twitterImage: `https://starkroofingrenovation.com${heroImage}`,
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Stark Roofing & Renovation — Eastside King County',
      image: `https://starkroofingrenovation.com${heroImage}`,
      description:
        'GAF Master Elite Certified roof replacement contractor serving the Eastside of King County, WA. 30+ years, 2,000+ roofs, Golden Pledge 50-year warranty.',
      telephone: '+1-206-739-8232',
      email: 'office@starkroofingrenovation.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sammamish',
        addressRegion: 'WA',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Sammamish' },
        { '@type': 'City', name: 'Bellevue' },
        { '@type': 'City', name: 'Redmond' },
        { '@type': 'City', name: 'Kirkland' },
        { '@type': 'City', name: 'Issaquah' },
      ],
      priceRange: '$$',
      url: canonical,
    },
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Roof Replacement — Eastside King County"
        description="Full roof replacement across the Eastside (Sammamish, Bellevue, Redmond, Kirkland, Issaquah). GAF Master Elite Certified, Golden Pledge 50-year warranty, real 2026 cost ranges, free drone inspection. (206) 739-8232."
        url={canonical}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://starkroofingrenovation.com/' },
          { name: 'Services', url: 'https://starkroofingrenovation.com/services' },
          {
            name: 'Roof Replacement Eastside',
            url: canonical,
          },
        ]}
      />

      <div id="stark-master-header">
        <Navbar />
        <EmergencyServiceBar />
      </div>

      <ServicePageHero
        title="Roof Replacement Across the Eastside"
        subtitle="Sammamish · Bellevue · Redmond · Kirkland · Issaquah — GAF Master Elite installs with Golden Pledge warranty"
        backgroundImage={heroImage}
        ctaText="Get My Free Eastside Quote"
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8 text-gray-800">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
                The Eastside Roof Replacement Done Right
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                The Eastside of King County is a single market in name only. A Sammamish Plateau home, a Bellevue Bridle Trails property, a Redmond Ridge contemporary, a Kirkland Juanita rambler, and an Issaquah Highlands new build face entirely different roof replacement conditions. Tree canopy density, freeze-thaw exposure on the higher elevations, lake-adjacent humidity, and prevailing wind patterns all change what your roof actually needs.
              </p>
              <p className="text-lg leading-relaxed">
                Stark Roofing & Renovation has installed over 2,000 roofs across these five cities, and we are GAF Master Elite Certified — the top 2 percent of GAF contractors nationwide, the only tier that unlocks the Golden Pledge 50-year warranty. Every Eastside quote we write is line-itemed, drone-documented, and scoped for the specific neighborhood your home sits in.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                Eastside Roof Replacement Cost (2026 Real Ranges)
              </h3>
              <p className="mb-4">
                What a roof actually costs across the Eastside in 2026, for a typical 2,000 sq ft home with single-layer tear-off and standard pitch:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Architectural asphalt (GAF Timberline HDZ, most common):</strong> $14,500 to $22,000</li>
                <li><strong>Premium GAF lifetime designer shingles (Grand Sequoia, Camelot):</strong> $17,500 to $26,000</li>
                <li><strong>Standing seam metal (24-gauge steel, 16" panels):</strong> $32,000 to $54,000</li>
                <li><strong>Cedar shake replacement (heritage Eastside homes):</strong> $28,000 to $46,000</li>
                <li><strong>Plywood deck replacement allowance (homes pre-2000):</strong> $4 to $9 per sq ft</li>
              </ul>
              <p className="mt-4">
                Quotes that come in dramatically below these ranges almost always cut something — synthetic underlayment swapped for 15-lb felt, no ice and water shield in valleys, 5-year workmanship warranty instead of 20, or a roofing crew with no GAF certification on file. Always ask for the line items.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                What Drives Cost Across the 5 Eastside Cities
              </h3>
              <p className="mb-4">
                Each Eastside city has sub-markets that change scope. We quote based on the actual conditions, not a single per-square-foot number.
              </p>
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <strong>Sammamish (Plateau, Klahanie, Pine Lake):</strong> higher elevation means 22 to 30 freeze-thaw cycles per winter, which accelerates granule loss. We spec aggressive ridge ventilation and Class 4 impact-rated shingles for homes above 600 feet elevation.
                </li>
                <li>
                  <strong>Bellevue (Bridle Trails, Somerset, Newport Hills):</strong> heavy Douglas fir and big-leaf maple canopy creates constant moss pressure. Algae-resistant GAF Timberline HDZ with copper ridge strips is the right answer, not a generic AR shingle.
                </li>
                <li>
                  <strong>Redmond (Education Hill, Bear Creek, Overlake):</strong> Sammamish River valley fog keeps shingles wet hours longer than higher elevations. We adjust underlayment system and use thicker drip edge for these moisture-prolonged conditions.
                </li>
                <li>
                  <strong>Kirkland (Juanita, Houghton, Finn Hill):</strong> lake-adjacent humidity and prevailing wind exposure on the western slopes. Galvanized or stainless flashing instead of standard aluminum at all penetrations.
                </li>
                <li>
                  <strong>Issaquah (Highlands, Squak Mountain, Issaquah Valley):</strong> hillside wind funnels and heavy seasonal storms. Wind-rated 130 mph shingles and reinforced ridge cap attachment for homes above 500 feet.
                </li>
              </ul>
              <p className="mt-4">
                Tell us which Eastside neighborhood your home sits in when you call. It changes the quote, and any roofer who quotes the same scope citywide is either lucky or missing something.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                Seasonal Pricing Windows on the Eastside
              </h3>
              <p className="mb-4">
                Eastside roofing demand is heavily seasonal. Smart timing saves 10 to 18 percent without compromising materials or warranty.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Peak (May to August):</strong> highest demand, firm pricing, 4 to 8 week crew lead times.</li>
                <li><strong>Shoulder (late February to April):</strong> moderate flexibility, narrower weather windows.</li>
                <li><strong>Best value (October to early November):</strong> 10 to 18 percent below peak for the same scope and same crew.</li>
                <li><strong>Avoid (December to early February):</strong> high tarping and weather-delay risk.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                Why Eastside Homeowners Choose Stark
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>GAF Master Elite Certified</strong> — top 2 percent nationally, only tier that unlocks Golden Pledge 50-year warranty</li>
                <li><strong>Golden Pledge Warranty</strong> — 50-year materials, 25-year workmanship, transferable to next owner</li>
                <li><strong>Free Drone Inspection</strong> — documented photo report on every Eastside quote</li>
                <li><strong>Line-Item Pricing</strong> — every quote breaks out the 7 cost categories, no lump sums</li>
                <li><strong>20-Year Labor Warranty</strong> — backed by Stark, not just the manufacturer</li>
                <li><strong>Family-Owned in Sammamish</strong> — same crew installs and answers warranty calls</li>
                <li><strong>Bilingual EN / PT / ES</strong> — communication that fits every Eastside family</li>
                <li><strong>2,000+ Eastside Roofs</strong> — 30+ years operating in King County</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                Free Eastside Roof Inspection
              </h3>
              <p className="mb-4">
                Call <strong>(206) 739-8232</strong> or use the form below for your complimentary drone inspection and detailed line-item quote. We typically schedule Eastside inspections within 3 business days, and most quotes turn around in 5 to 7 business days. No high-pressure follow-up calls. No obligation.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              <HorizontalContactForm
                title="Get Your Free Eastside Roof Quote"
                buttonText="Schedule My Inspection"
                formColor="red"
              />
            </div>
          </div>
        </div>
      </section>

      <VirtualAssistant />
      <FloatingCTA label="Free Eastside Quote" />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default RoofReplacementEastside;
