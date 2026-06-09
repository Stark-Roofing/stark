import React, { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Star,
  Award,
  CheckCircle2,
  Phone,
  ArrowRight,
  Grid,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CalendarCheck,
  BadgeCheck,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import AdsLeadForm from '@/components/ads/AdsLeadForm';
import ServiceCard from '@/components/ServiceCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TrustBadgesSection from '@/components/home/TrustBadgesSection';
import ProcessSection from '@/components/home/ProcessSection';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';
import googleReviewsData from '@/data/googleReviews.json';
import { useSEOMeta } from '@/hooks/useSEOMeta';

/**
 * /ads — Conversion-focused landing page for paid traffic.
 *
 * Structure based on LP best-practices research (2026-05-08):
 * Hero → trust strip → owner story → before/after → testimonials → mid-CTA →
 * services → trust badges → process → risk reversal → service area → FAQ →
 * final CTA → footer.
 *
 * - No GAF mentions (client policy 2026-05).
 * - Defensible differentiators: 30+ yrs, 2,000+ roofs, bilingual EN/PT/ES,
 *   local Sammamish (not call center), same-day response, 20-yr labor warranty.
 * - Conversion target: QuickQuoteForm above the fold → /thank-you.
 */

interface ReviewsJson {
  rating: number;
  userRatingCount: number;
  reviews: Array<{
    author: string;
    authorPhoto?: string;
    rating: number;
    text: string;
  }>;
}

const reviewsData = googleReviewsData as ReviewsJson;
const REVIEW_COUNT = reviewsData.userRatingCount ?? 33;
const GOOGLE_RATING = reviewsData.rating ?? 5;

// Real before/after pairs supplied by Stark — vertical drone photos
const BEFORE_AFTER_PROJECTS = [
  {
    title: 'Full Roof Replacement',
    location: 'Eastside, WA',
    description:
      'Complete tear-off and replacement with premium architectural shingles. Aged, weathered roof transformed into a clean, watertight finish — built for Pacific Northwest weather.',
    beforeImage: '/gallery/ad-before-1.png',
    afterImage: '/gallery/ad-after-1.png',
  },
  {
    title: 'Architectural Shingle Re-Roof',
    location: 'Greater Seattle, WA',
    description:
      'Old shingles removed and new architectural shingles installed with proper flashing and underlayment. Restored curb appeal and decades of protection.',
    beforeImage: '/gallery/ad-before-2.png',
    afterImage: '/gallery/ad-after-2.png',
  },
  {
    title: 'Residential Roof Refresh',
    location: 'Puget Sound, WA',
    description:
      'Aging, moss-stained shingles replaced across a complex multi-hip roof. Sealed and ready for the wettest Eastside winters.',
    beforeImage: '/gallery/ad-before-3.png',
    afterImage: '/gallery/ad-after-3.png',
  },
  {
    title: 'Complete Tear-Off & Re-Roof',
    location: 'King County, WA',
    description:
      'Full tear-off down to the deck, new ice & water shield, and architectural shingles installed with proper ventilation. A dramatic before-and-after transformation.',
    beforeImage: '/gallery/ad-before-4.png',
    afterImage: '/gallery/ad-after-4.png',
  },
];

// FAQ — 7 cleaned questions, no GAF mentions
const FAQS = [
  {
    q: 'How much does a new roof cost in Seattle?',
    a: 'Most full asphalt-shingle roof replacements in the Greater Seattle area run between $10,350 and $25,300, depending on home size, roof pitch, tear-off layers, and deck condition. Premium materials like Grand Sequoia or standing-seam metal cost more. We provide free, no-obligation written estimates — no flat-rate phone quotes.',
  },
  {
    q: 'Do you offer free roof inspections?',
    a: "Yes — every project starts with a free, thorough roof inspection by our team. We'll assess your roof's condition, document any issues with drone photos, and provide a detailed written estimate. We serve Seattle, Bellevue, Tacoma, Everett, Redmond, Kirkland, Sammamish, and the entire Puget Sound area.",
  },
  {
    q: 'How long does a roof replacement take?',
    a: 'Most residential roof replacements are completed in 1–3 days. A typical 2,000 sq ft home can often be done in a single day. We always confirm the timeline before starting and keep you informed throughout the project.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes — Stark Roofing & Renovation is fully licensed, bonded, and insured in Washington State.',
  },
  {
    q: 'Do you offer financing for roofing projects?',
    a: 'Yes — we offer flexible financing with competitive rates, low monthly payments, and programs for all credit profiles. Most homeowners get approved within minutes with no money down required.',
  },
  {
    q: 'What warranty do you offer?',
    a: 'Every roof replacement includes our 20-year labor warranty — far exceeding the Washington average of 1–5 years — plus the manufacturer warranty on the shingles themselves. The warranty is fully transferable if you sell your home.',
  },
  {
    q: 'Do you help with insurance claims for storm damage?',
    a: "Absolutely. We handle the entire insurance claims process for storm damage — from initial inspection and drone documentation to meeting with your adjuster and ensuring fair coverage. Our experience with Washington carriers helps maximize your claim.",
  },
];

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
          <div className="flex items-center gap-2">
            <Button className="bg-stark-red hover:bg-stark-red/90 text-white flex-1 font-bold" asChild>
              <a href="#top">Get Free Quote</a>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BeforeAfterGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = BEFORE_AFTER_PROJECTS[activeIndex];

  const goToPrev = () =>
    setActiveIndex((i) => (i === 0 ? BEFORE_AFTER_PROJECTS.length - 1 : i - 1));
  const goToNext = () =>
    setActiveIndex((i) => (i === BEFORE_AFTER_PROJECTS.length - 1 ? 0 : i + 1));

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-stark-red font-semibold text-sm uppercase tracking-widest">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mt-2">
            Before &amp; After
          </h2>
          <p className="text-charcoal/70 mt-3 max-w-2xl mx-auto">
            Drag the slider to see real transformations from our roofing and renovation projects across the Puget Sound.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 text-center lg:text-left">
            <h3 className="text-2xl font-heading font-bold text-navy">
              {project.title}
            </h3>
            <p className="text-sm text-stark-red font-medium uppercase tracking-wide">
              {project.location}
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={goToPrev}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {BEFORE_AFTER_PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === activeIndex ? 'bg-stark-red' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                aria-label="Next project"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              <span className="ml-auto text-sm text-charcoal/50">
                {activeIndex + 1} / {BEFORE_AFTER_PROJECTS.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuoteAd: React.FC = () => {
  useSEOMeta({
    title: 'Free Roof Inspection · Same-Day Quote | Stark Roofing',
    description:
      "Sammamish's family-owned roofer. 30+ years, 2,000+ roofs. Bilingual team (EN/PT/ES). Free drone inspection. No high-pressure pitch — we text you back in minutes.",
    canonical: 'https://starkroofingrenovation.com/ads',
  });

  // Global navigation.css adds body { padding-top: 92px } for the main site's
  // fixed Navbar. /ads doesn't use that Navbar, so we strip the padding for
  // this route only. useLayoutEffect runs BEFORE paint to avoid flash.
  // setProperty with 'important' beats the stylesheet rule.
  useLayoutEffect(() => {
    document.body.style.setProperty('padding-top', '0', 'important');
    document.body.style.setProperty('margin-top', '0', 'important');
    return () => {
      document.body.style.removeProperty('padding-top');
      document.body.style.removeProperty('margin-top');
    };
  }, []);

  const topReviews = (reviewsData.reviews ?? [])
    .filter((r) => r.rating === 5)
    .slice(0, 4);

  return (
    <div id="top" className="min-h-screen bg-white">

      {/* ─────────── HERO ─────────── */}
      <section className="relative overflow-hidden pt-0 pb-20 md:pb-28 lg:pb-32">
        {/* Background image + overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-custom-sammamish.webp"
            alt="Pacific Northwest home with quality shingle roof"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/80 to-navy/70" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 md:pt-14 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: headline + trust pills (7 cols) — order-2 on mobile so form is above the fold */}
            <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 bg-stark-red/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5 border border-stark-red/40 backdrop-blur-sm">
                <Shield size={12} /> Family-Owned in Sammamish
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-5 leading-[1.1]">
                <span className="block text-stark-red">The Local Roofer</span>
                <span className="block text-white">You Won't Second-Guess</span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-7 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We're <strong className="text-white">Stark Roofing</strong> — a small Sammamish team that's put <strong className="text-white">2,000+ roofs</strong> on Eastside homes over 30 years. Free drone inspection, written quote, and no high-pressure pitch.
              </p>

              <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="text-stark-red" size={14} />
                  Free Drone Inspection
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="text-stark-red" size={14} />
                  Bilingual: EN · PT · ES
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="text-stark-red" size={14} />
                  20-Year Warranty
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="text-stark-red" size={14} />
                  Same-Day Reply
                </span>
              </div>

            </div>

            {/* Right: QuickQuoteForm (5 cols) — order-1 on mobile to appear above the fold */}
            <div className="lg:col-span-5 lg:mt-12 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden">
                <AdsLeadForm defaultService="roof-replacement" />
              </div>
              <p className="text-center text-xs text-white/70 mt-3">
                Free estimate. No obligation. We confirm by text within minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── TRUST STRIP ─────────── */}
      <section className="py-8 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-sm">
                {GOOGLE_RATING}-Star · {REVIEW_COUNT}+ Google Reviews
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-stark-red" />
              <span className="font-semibold text-sm">30+ Years · 2,000+ Roofs</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-stark-red" />
              <span className="font-semibold text-sm">20-Year Labor Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-stark-red" />
              <span className="font-semibold text-sm">Licensed &amp; Bonded WA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── BRENDA'S NOTE ─────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stark-red mb-2">
                Your Peace of Mind Is Our #1 Priority
              </h2>
              <p className="text-sm md:text-base font-semibold text-stark-red/80 mb-4 uppercase tracking-wider">
                A note from Brenda — Owner, Stark Roofing &amp; Renovation
              </p>
              <p className="text-base md:text-lg text-charcoal/85 mb-4 leading-relaxed">
                Hi, I'm Brenda. When you invite us onto your property, you're trusting us with the place you call home — and I don't take that lightly. My family and I built Stark Roofing on a simple promise:{' '}
                <strong>treat every house like it's our own, and every homeowner like a neighbor.</strong>
              </p>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed">
                With over 30 years and 2,000+ roofs completed across King, Snohomish, and Pierce counties, our crew shows up on time, communicates clearly, and stands behind every nail we drive. You'll have my word — and my number — every step of the way.
              </p>
            </div>

            <div className="w-full">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100">
                <img
                  src="/lovable-uploads/brenda-scarllet-owner.jpg"
                  alt="Brenda Scarllet — Owner, Stark Roofing &amp; Renovation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── OUR PREMIUM SERVICES ─────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-stark-red text-center mb-3">
            Our Premium Services
          </h2>
          <p className="text-center text-charcoal/75 mb-12 max-w-2xl mx-auto">
            Roofing and exterior protection trusted by Pacific Northwest homeowners for over 30 years.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Premium Roofing"
              description="Premium architectural shingles installed by trained pros. Lifetime warranty available, financing in minutes, built for Seattle weather."
              imageUrl="/lovable-uploads/home-premium-roofing.jpg"
              link="/roof-replacement"
            />
            <ServiceCard
              title="Premium Gutter Systems"
              description={'Seamless 5" gutters with leaf-guard protection and our exclusive lifetime clog-free guarantee. Never climb a ladder again.'}
              imageUrl="/lovable-uploads/home-premium-gutters.jpg"
              link="/gutter-replacement"
            />
            <ServiceCard
              title="Storm Damage Repair"
              description="Wind, hail, or fallen tree? Same-week inspections, full insurance claim support, and emergency tarp service across King, Snohomish & Pierce counties."
              imageUrl="/lovable-uploads/home-storm-damage.jpg"
              link="/storm-damage"
            />
          </div>

          <div className="mt-12 flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/services"
                className="flex items-center bg-stark-red hover:bg-stark-red/80 text-white rounded-lg shadow-lg transition-all py-[23px] px-[40px]"
              >
                <Grid size={18} className="mr-2" />
                <span className="font-medium">View All Services</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── BEFORE & AFTER GALLERY ─────────── */}
      <BeforeAfterGallery />

      {/* ─────────── MID-PAGE CTA BANNER ─────────── */}
      <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/lovable-uploads/ea006abb-9eda-4581-bc18-f64c4bf9d2c0.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
              See Your Roof's Real Condition — For Free
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              We use drone photography to assess every roof we inspect — so you see exactly what we see, no guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-stark-red hover:bg-stark-red/90 text-white px-8 py-6 text-base font-bold"
                asChild
              >
                <a href="#top" className="flex items-center gap-2">
                  Book Free Inspection <ArrowRight size={18} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── WHY HOMEOWNERS TRUST US ─────────── */}
      <TrustBadgesSection />

      {/* ─────────── TESTIMONIALS ─────────── */}
      {topReviews.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy text-center mb-2">
              From the Neighbors We've Worked With
            </h2>
            <p className="text-center text-charcoal/65 text-sm mb-10">
              Real Google reviews from Eastside homeowners
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {topReviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-charcoal/85 italic mb-4 line-clamp-6 flex-1">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    {review.authorPhoto && (
                      <img
                        src={review.authorPhoto}
                        alt={review.author}
                        className="w-9 h-9 rounded-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-navy">{review.author}</p>
                      <p className="text-[10px] text-charcoal/60 uppercase tracking-wider">
                        Google Review
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── OUR PROCESS ─────────── */}
      <ProcessSection />

      {/* ─────────── RISK REVERSAL BANNER ─────────── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                You Have Nothing to Lose
              </h2>
              <p className="text-charcoal/75 max-w-2xl mx-auto">
                Every step of the process is on us — until you decide to move forward.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-stark-red/10 text-stark-red rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <CalendarCheck size={26} />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-1">
                  Free Inspection
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  Drone photos &amp; itemized written quote. No charge, no obligation.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-stark-red/10 text-stark-red rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-1">
                  20-Year Labor Warranty
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  Far exceeds the Washington average of 1–5 years. Fully transferable.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-stark-red/10 text-stark-red rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck size={26} />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-1">
                  No Pressure, Ever
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  No door-to-door tactics. No "today-only" deals. Decide on your timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SERVICE AREA ─────────── */}
      <ServiceAreaSection />

      {/* ─────────── FAQ ─────────── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal/75 max-w-2xl mx-auto">
              Quick answers to what Eastside homeowners ask us most.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-base md:text-lg font-semibold text-navy hover:text-stark-red">
                    <span className="text-left flex-1">{q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-charcoal/80 leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10 text-center">
            <p className="text-charcoal/65 mb-4 text-sm">Still have questions?</p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 bg-stark-red hover:bg-stark-red/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              Request a Free Quote <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── FINAL CTA ─────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-stark-red to-stark-red/90">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Let's take a look at your roof.
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            Free inspection. Written quote. No high-pressure pitch — just a clear answer from a team you can actually reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-white hover:bg-white/95 text-stark-red px-8 py-6 text-base font-bold"
              asChild
            >
              <a href="#top" className="flex items-center gap-2">
                Book Free Inspection <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="bg-gray-900 py-6 px-4">
        <div className="container mx-auto text-center text-gray-400 text-xs space-y-1">
          <p>
            &copy; {new Date().getFullYear()} Stark Roofing &amp; Renovation LLC. Licensed, Bonded &amp; Insured in WA.
          </p>
          <p>24243 SE 43rd Ct, Sammamish, WA 98029</p>
          <p>
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>

      <StickyPhoneBar />
    </div>
  );
};

export default QuoteAd;
