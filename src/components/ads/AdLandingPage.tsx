import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Star,
  Award,
  CheckCircle2,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuickQuoteForm from '@/components/shared/QuickQuoteForm';
import googleReviewsData from '@/data/googleReviews.json';
import { useSEOMeta } from '@/hooks/useSEOMeta';

interface AdLandingPageProps {
  service: string;
  serviceSlug: string;
  headline?: string;
  subheadline?: string;
}

const SERVICE_DEFAULTS: Record<string, { headline: string; sub: string }> = {
  'Roof Replacement': {
    headline: 'Roof Replacement in {city}',
    sub: 'GAF Certified. 20-year labor warranty. Free drone inspection and written estimate.',
  },
  'Roof Repair': {
    headline: 'Roof Repair in {city}',
    sub: 'Leaks, missing shingles, storm damage. Same-week appointments available.',
  },
  'Gutter Replacement': {
    headline: 'Gutter Replacement in {city}',
    sub: 'Seamless gutters installed by licensed WA contractors. Free on-site estimate.',
  },
};

const PROJECTS = [
  {
    before: '/gallery/drone-replacement-1-before.jpg',
    after: '/gallery/drone-replacement-1-after.jpg',
    label: 'Full Shingle Replacement',
  },
  {
    before: '/gallery/drone-replacement-2-before.jpg',
    after: '/gallery/drone-replacement-2-after.jpg',
    label: 'Residential Roof Refresh',
  },
  {
    before: '/gallery/drone-replacement-3-before.jpg',
    after: '/gallery/drone-replacement-3-after.jpg',
    label: 'Steep-Slope Re-Roof',
  },
];

// Sticky mobile CTA bar (appears after scrolling 400px)
const StickyPhoneBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-navy shadow-lg py-3 px-4 md:hidden"
        >
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold text-sm">Free Estimate</p>
            <Button className="bg-stark-red hover:bg-stark-red/90 text-white" asChild>
              <a href="tel:+12067398232" className="flex items-center gap-2">
                <Phone size={16} /> (206) 739-8232
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AdLandingPage: React.FC<AdLandingPageProps> = ({
  service,
  serviceSlug,
  headline,
  subheadline,
}) => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || 'the Puget Sound';

  const defaults = SERVICE_DEFAULTS[service] || SERVICE_DEFAULTS['Roof Replacement']!;
  const h1 = (headline || defaults.headline).replace('{city}', city);
  const sub = (subheadline || defaults.sub).replace('{city}', city);

  useSEOMeta({
    title: `${service} in ${city} | Stark Roofing & Renovation`,
    description: sub,
    canonical: `https://starkroofingrenovation.com/ads/${serviceSlug}`,
  });

  // Pull up to 3 real Google reviews
  const reviews = (googleReviewsData as { reviews: Array<{ author: string; text: string; rating: number }> }).reviews ?? [];
  const topReviews = reviews.filter(r => r.rating >= 4).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header: logo + phone only */}
      <header className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/stark-logo-rebrand.png"
              alt="Stark Roofing & Renovation"
              className="h-10"
            />
          </a>
          <a
            href="tel:+12067398232"
            className="flex items-center gap-2 text-navy font-bold text-sm md:text-base hover:text-stark-red transition-colors"
          >
            <Phone size={18} className="text-stark-red" />
            (206) 739-8232
          </a>
        </div>
      </header>

      {/* Hero: headline + form above the fold */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: headline + trust signals */}
            <div className="pt-4 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy mb-4 leading-tight">
                {h1}
              </h1>
              <p className="text-lg text-charcoal/75 mb-6">{sub}</p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-100 p-3">
                  <Shield size={20} className="text-stark-red flex-shrink-0" />
                  <span className="text-sm font-semibold text-navy">GAF Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-100 p-3">
                  <Award size={20} className="text-stark-red flex-shrink-0" />
                  <span className="text-sm font-semibold text-navy">20-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-100 p-3">
                  <CheckCircle2 size={20} className="text-stark-red flex-shrink-0" />
                  <span className="text-sm font-semibold text-navy">Licensed WA</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-100 p-3">
                  <Star size={20} className="text-stark-red fill-stark-red flex-shrink-0" />
                  <span className="text-sm font-semibold text-navy">5.0 Google Rating</span>
                </div>
              </div>

              {/* Phone CTA for desktop */}
              <div className="hidden lg:block">
                <p className="text-sm text-charcoal/60 mb-2">Prefer to talk?</p>
                <a
                  href="tel:+12067398232"
                  className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy/90 transition-colors"
                >
                  <Phone size={18} />
                  (206) 739-8232
                </a>
              </div>
            </div>

            {/* Right: QuickQuoteForm */}
            <div>
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 min-h-[480px]">
                <QuickQuoteForm defaultService={serviceSlug} />
              </div>
              <p className="text-center text-xs text-charcoal/60 mt-3">
                Free estimate. No obligation. We confirm by text within minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After projects */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy text-center mb-8">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.label} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative">
                  <img
                    src={project.after}
                    alt={`${project.label} — after`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    AFTER
                  </span>
                </div>
                <div className="p-4 text-center md:text-left">
                  <p className="font-semibold text-navy text-sm">{project.label}</p>
                  <p className="text-xs text-charcoal/60">Puget Sound, WA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {topReviews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy text-center mb-8">
              What Homeowners Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {topReviews.map((review, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center md:text-left">
                  <div className="flex gap-0.5 mb-3 justify-center md:justify-start">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-charcoal/85 italic mb-4 line-clamp-4">
                    "{review.text}"
                  </p>
                  <p className="text-sm font-semibold text-navy">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 bg-navy">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
            Ready for your free estimate?
          </h2>
          <p className="text-white/75 mb-6 max-w-lg mx-auto">
            Book online above or call us now. No pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-stark-red hover:bg-stark-red/90 text-white px-8 py-6 text-base" asChild>
              <a href="#top" className="flex items-center gap-2">
                Book Online <ArrowRight size={18} />
              </a>
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base" asChild>
              <a href="tel:+12067398232" className="flex items-center gap-2">
                <Phone size={18} /> (206) 739-8232
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-gray-900 py-6 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Stark Roofing & Renovation LLC. Licensed, Bonded & Insured in WA.
          </p>
        </div>
      </footer>

      <StickyPhoneBar />
    </div>
  );
};

export default AdLandingPage;
