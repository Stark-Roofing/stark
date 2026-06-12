
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import QuickQuoteForm from '@/components/shared/QuickQuoteForm';

const OurStory = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top: Text (left) + Form & Image (right) */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="w-16 h-1 bg-stark-red mb-4 mx-auto md:mx-0"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 text-center md:text-left">
              Meet Brenda Scarllet — Founder &amp; Owner
            </h2>
            <p className="text-charcoal/80 mb-6 text-center md:text-left">
              Stark Roofing &amp; Renovation began with a simple frustration. As a homeowner
              herself in the Greater Seattle area, <strong>Brenda Scarllet</strong> watched
              too many neighbors get burned by contractors who overpromised, underdelivered,
              and disappeared the moment a question came up. She knew the Pacific Northwest
              deserved better — a roofing company that treated every home like it belonged to
              family, because for Brenda, it does.
            </p>
            <p className="text-charcoal/80 font-semibold text-center md:text-left mb-6">
              So she built one.
            </p>

            <p className="text-charcoal/80 mb-8 text-center md:text-left">
              Today, Stark Roofing &amp; Renovation is a family-owned, GAF Certified contractor
              based in Sammamish, Washington, proudly serving homeowners across <strong>King,
              Snohomish, and Pierce counties</strong> — from Bellevue and Issaquah to Lynnwood,
              Everett, Seattle, and Tacoma. Brenda is bilingual in English and Portuguese,
              personally involved in every project, and reachable by the same number she's
              always answered: <strong>(206) 739-8232</strong>.
            </p>

            <h3 className="text-2xl font-heading font-bold text-navy mb-3 text-center md:text-left">
              Why Brenda Started Stark
            </h3>
            <p className="text-charcoal/80 mb-8 text-center md:text-left">
              Brenda founded Stark to bring transparency, craftsmanship, and follow-through
              back to an industry that too often forgets the homeowner once the deposit clears.
              Every estimate she signs comes with the same promise: honest pricing, premium
              materials, and a crew that shows up when they say they will. No surprise
              upcharges. No vanishing acts after the install — just clear communication from
              the first phone call to the final cleanup.
            </p>

            <h3 className="text-2xl font-heading font-bold text-navy mb-3 text-center md:text-left">
              The GAF Certified Standard
            </h3>
            <p className="text-charcoal/80 mb-8 text-center md:text-left">
              As a <strong>GAF Certified contractor</strong>, Stark installs the strongest
              asphalt shingle systems on the market — including GAF Timberline HDZ — using the
              exact specifications that unlock GAF's <strong>limited lifetime warranty</strong>.
              That certification isn't a sticker on a truck. It's training, accountability, and
              the right to offer a warranty that follows the home, not just the first owner.
            </p>

            <h3 className="text-2xl font-heading font-bold text-navy mb-3 text-center md:text-left">
              30+ Years of Experience. 2,000+ Roofs. One Standard.
            </h3>
            <p className="text-charcoal/80 text-center md:text-left">
              Brenda leads Stark alongside a seasoned sales and production team whose
              <strong> 30+ years of combined roofing experience</strong> and
              <strong> 2,000+ completed roofs</strong> across the Puget Sound bring real,
              hands-on expertise to every project. Every inspection starts with a
              <strong> free drone assessment</strong> so we can show you exactly what's
              happening on your roof — no guesswork, no upsells, just honest photos and clear
              answers. And every install is backed by manufacturer warranties and the
              family-owned commitment Brenda built this company on.
            </p>
          </div>

          <div className="w-full md:w-1/2 mb-8 md:mb-0 space-y-6 md:sticky md:top-24">
            {/* Booking form */}
            <div id="contact" className="relative">
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 text-center">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy">
                    Free Inspection — Meet Us In Person
                  </h3>
                  <p className="text-charcoal/70 text-sm md:text-base mt-1">
                    30 minutes, on your roof, no pressure. Pick a time below.
                  </p>
                </div>
                <div className="min-h-[460px]">
                  <QuickQuoteForm defaultService="inspection" />
                </div>
              </div>
              <p className="text-center text-xs text-charcoal/70 mt-4">
                Prefer to talk? Call{' '}
                <a
                  href="tel:+12067398232"
                  className="text-stark-red font-semibold underline underline-offset-2"
                >
                  (206) 739-8232
                </a>
              </p>
            </div>

            {/* Home photo below the form */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-72 border-b-4 border-stark-red">
              <img
                src="/hero-custom-issaquah.webp"
                alt="A Pacific Northwest craftsman home with asphalt shingle roof, mountains in background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Inline CTA — full-width below the 2-col */}
        <div className="max-w-4xl mx-auto text-left mt-16 md:mt-24">
          <div className="bg-navy text-white rounded-xl p-8 md:p-10 border-b-4 border-stark-red">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Ready to Work With a Roofer Who Actually Calls You Back?
            </h3>
            <p className="text-white/85 mb-6">
              If your roof is aging, leaking, or just due for a second opinion, Brenda and
              the Stark crew would be honored to take a look. Schedule your free drone
              inspection and in-home estimate today — no pressure, no obligation, just a
              straight answer from a neighbor who cares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12067398232"
                className="inline-flex items-center justify-center gap-2 bg-stark-red hover:bg-stark-red/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone size={18} /> Call or Text (206) 739-8232
              </a>
              <a
                href="mailto:office@starkroofingrenovation.com"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                <Mail size={18} /> office@starkroofingrenovation.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
