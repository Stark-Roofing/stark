import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun, Zap, Hand, Square, CircleDot, Shield, Star, Check,
  Smartphone, Ruler, Award, ArrowRight, ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicePageHero from '@/components/shared/ServicePageHero';
import QuickQuoteButton from '@/components/shared/QuickQuoteButton';
import ScrollToTop from '@/components/ScrollToTop';
import { useSEOMeta } from '@/hooks/useSEOMeta';

/* ───────────────────────────────────────────────────────
   Real VELUX residential lineup data
   Source: VELUX America public product catalog & spec sheets
   ─────────────────────────────────────────────────────── */

type Model = {
  id: string;
  family: 'Venting' | 'Fixed' | 'Tubular';
  badge?: string;
  name: string;
  modelCode: string;
  fullName: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  bestFor: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
};

const MODELS: Model[] = [
  {
    id: 'vss',
    family: 'Venting',
    badge: 'Most Popular',
    name: 'Solar Powered "Fresh Air"',
    modelCode: 'VSS',
    fullName: 'VELUX VSS Deck-Mounted Solar Powered Fresh Air Skylight',
    icon: Sun,
    tagline: 'No wiring. No electrician. The most popular skylight we install.',
    description:
      'A factory-installed solar panel charges a discreet battery that powers the motor and controls — so it opens, closes, and even self-closes during a rainstorm without ever touching your home\'s electrical system. Comes pre-paired with a touchscreen remote.',
    highlights: [
      'Solar panel + battery (no electrician required)',
      'Built-in rain sensor closes the skylight automatically',
      'Touchscreen remote control included',
      'Insect screen included',
      'Clean, Quiet & Safe™ laminated glass standard',
      'VELUX ACTIVE smart-home compatible',
    ],
    specs: [
      { label: 'Operation', value: 'Solar-powered motor' },
      { label: 'Glazing', value: 'Laminated LoĒ³-366 + argon' },
      { label: 'U-Factor', value: '0.45' },
      { label: 'SHGC', value: '0.25' },
      { label: 'Frame', value: 'Deck-mounted, low-profile' },
      { label: 'Pre-installed flashing', value: 'EDL / EDW available' },
    ],
    bestFor: [
      'Bathrooms & kitchens (humidity exhaust)',
      'Vaulted living rooms',
      'Stairwells where wiring is hard to reach',
      'Re-roof retrofits over existing shingles',
    ],
    image: '/lovable-uploads/2821b129-1a0b-4714-9322-0ac209cc85ac.webp',
    imageAlt: 'VELUX VSS solar powered fresh air skylight installed in vaulted ceiling',
    featured: true,
  },
  {
    id: 'vcs',
    family: 'Venting',
    name: 'Curb-Mount Solar "Fresh Air"',
    modelCode: 'VCS',
    fullName: 'VELUX VCS Curb-Mounted Solar Powered Fresh Air Skylight',
    icon: Sun,
    tagline: 'Drop-in replacement for an existing curb-mounted skylight.',
    description:
      'Same solar-powered "Fresh Air" technology as the VSS, but built to sit on a site-built curb. The fastest, cleanest way to upgrade an old leaky curb-mounted skylight without rebuilding the curb itself.',
    highlights: [
      'Designed to fit existing curbs',
      'Solar-powered — no electrical work',
      'Built-in rain sensor',
      'Standard sizes 2222 through 4646',
    ],
    specs: [
      { label: 'Operation', value: 'Solar-powered motor' },
      { label: 'Glazing', value: 'Laminated LoĒ³-366 + argon' },
      { label: 'Mount', value: 'Curb-mounted (site-built curb)' },
      { label: 'Sizes', value: '2222, 2230, 2234, 2246, 3030, 3046, 4646' },
    ],
    bestFor: [
      'Replacing a failing curb-mounted skylight',
      'Commercial low-slope buildings',
      'Homes where the original curb is solid',
    ],
    image: '/lovable-uploads/263e14a0-6faa-45ca-b508-4d8d686b30e5.webp',
    imageAlt: 'VELUX VCS curb mounted solar skylight',
  },
  {
    id: 'vse',
    family: 'Venting',
    name: 'Electric "Fresh Air"',
    modelCode: 'VSE',
    fullName: 'VELUX VSE Deck-Mounted Electric Fresh Air Skylight',
    icon: Zap,
    tagline: 'Hardwired venting for new builds and full remodels.',
    description:
      'A 24-volt motor wired into your home electrical system. Smoothest, fastest opening of any VELUX venting skylight. Pairs with the VELUX ACTIVE gateway for HomeKit and automation routines.',
    highlights: [
      'Hardwired 24V motor — fastest open/close cycle',
      'Built-in rain sensor',
      'Wall keypad + remote included',
      'Quietest operation in the venting line',
      'VELUX ACTIVE / Apple HomeKit compatible',
    ],
    specs: [
      { label: 'Operation', value: 'Hardwired 24V motor' },
      { label: 'Glazing', value: 'Laminated LoĒ³-366 + argon' },
      { label: 'Frame', value: 'Deck-mounted' },
      { label: 'Wiring', value: 'Requires licensed electrician' },
    ],
    bestFor: [
      'New construction',
      'Full remodels with open ceilings',
      'Smart-home enthusiasts',
    ],
    image: '/lovable-uploads/263e14a0-6faa-45ca-b508-4d8d686b30e5.webp',
    imageAlt: 'VELUX VSE electric venting skylight in modern kitchen',
  },
  {
    id: 'vs',
    family: 'Venting',
    name: 'Manual "Fresh Air"',
    modelCode: 'VS',
    fullName: 'VELUX VS Deck-Mounted Manual Fresh Air Skylight',
    icon: Hand,
    tagline: 'The most affordable way to add ventilation.',
    description:
      'Operated by hand or with an extension control rod for out-of-reach installations. No motor, no electricity, no rain sensor — but a real opening skylight at the lowest price point in the lineup.',
    highlights: [
      'Hand-cranked or rod-operated',
      'No electrical work needed',
      'Insect screen included',
      'Clean, Quiet & Safe™ laminated glass',
      'Lowest cost venting option',
    ],
    specs: [
      { label: 'Operation', value: 'Manual (hand or control rod)' },
      { label: 'Glazing', value: 'Laminated LoĒ³-366 + argon' },
      { label: 'Frame', value: 'Deck-mounted' },
      { label: 'Rain sensor', value: 'Not included' },
    ],
    bestFor: [
      'Lower-pitch ceilings within easy reach',
      'Budget-conscious projects',
      'Secondary skylight in a multi-skylight install',
    ],
    image: '/lovable-uploads/f6057036-c7fd-4c02-8d16-ed9c3bad8e5f.webp',
    imageAlt: 'VELUX VS manual venting skylight',
  },
  {
    id: 'fs',
    family: 'Fixed',
    name: 'Deck-Mount Fixed',
    modelCode: 'FS',
    fullName: 'VELUX FS Deck-Mounted Fixed Skylight',
    icon: Square,
    tagline: 'Pure light. No moving parts. Lowest profile on the roof.',
    description:
      'A non-opening skylight that sits flush to the roof deck for the cleanest exterior look. Pre-attached deck seal and engineered EDL/EDW flashing kit make it the most weather-tight fixed unit on the market.',
    highlights: [
      'Lowest-profile fixed skylight available',
      'Pre-attached gasketed deck seal',
      'Engineered step-flashing kit (EDL/EDW)',
      'Clean, Quiet & Safe™ laminated glass',
      'No moving parts = longest service life',
    ],
    specs: [
      { label: 'Operation', value: 'Fixed (does not open)' },
      { label: 'Glazing', value: 'Laminated LoĒ³-366 + argon' },
      { label: 'Mount', value: 'Deck-mounted, flush to roof' },
      { label: 'Pre-attached seal', value: 'Yes' },
    ],
    bestFor: [
      'Stairwells and hallways',
      'Walk-in closets',
      'New construction & full re-roofing',
      'Anywhere you only need light, not airflow',
    ],
    image: '/lovable-uploads/263e14a0-6faa-45ca-b508-4d8d686b30e5.webp',
    imageAlt: 'VELUX FS deck-mounted fixed skylight',
  },
  {
    id: 'fcm',
    family: 'Fixed',
    name: 'Curb-Mount Fixed',
    modelCode: 'FCM',
    fullName: 'VELUX FCM Curb-Mounted Fixed Skylight',
    icon: Square,
    tagline: 'For replacement on an existing site-built curb.',
    description:
      'Sits on top of a site-built wooden curb instead of the deck itself. The standard choice for replacing an old curb-mounted skylight where rebuilding the curb would be invasive.',
    highlights: [
      'Drops onto existing or new wooden curbs',
      'Standard sizes 2222 through 4646',
      'Laminated LoĒ³ glass standard',
      'Best replacement match for older skylights',
    ],
    specs: [
      { label: 'Operation', value: 'Fixed (does not open)' },
      { label: 'Glazing', value: 'Laminated LoĒ³-366 + argon' },
      { label: 'Mount', value: 'Curb-mounted (site-built curb)' },
      { label: 'Sizes', value: '2222, 2230, 2234, 2246, 3030, 3046, 4646' },
    ],
    bestFor: [
      'Replacing existing curb-mounted skylights',
      'Low-slope and flat roofs',
      'Commercial buildings',
    ],
    image: '/lovable-uploads/263e14a0-6faa-45ca-b508-4d8d686b30e5.webp',
    imageAlt: 'VELUX FCM curb mounted fixed skylight',
  },
  {
    id: 'sun-tunnel',
    family: 'Tubular',
    name: 'SUN TUNNEL™ Tubular',
    modelCode: 'TGR / TMR',
    fullName: 'VELUX TGR (Rigid) / TMR (Flexible) SUN TUNNEL Skylights',
    icon: CircleDot,
    tagline: 'Daylight where a real skylight will not fit.',
    description:
      'A 10" or 14" reflective tunnel that pipes daylight from the roof down into a small space. Looks like a recessed light from below. The TGR uses a rigid, mirror-finish tube for maximum brightness; the TMR uses a flexible tunnel that snakes around joists, ducts, and HVAC.',
    highlights: [
      '10" or 14" diameter options',
      'Rigid (TGR) or flexible (TMR) tunnel',
      'Looks like a recessed ceiling light from below',
      'Optional solar nightlight',
      'Optional dimmer kit',
      'Pitched or low-profile flashing options',
    ],
    specs: [
      { label: 'Diameters', value: '10" / 14"' },
      { label: 'Tunnel type', value: 'Rigid (TGR) or Flexible (TMR)' },
      { label: 'Roof pitch', value: 'Flat to 60°' },
      { label: 'Dome', value: 'Acrylic with prismatic insert' },
    ],
    bestFor: [
      'Small bathrooms & half baths',
      'Walk-in closets',
      'Hallways and laundry rooms',
      'Tight attic spaces between trusses',
    ],
    image: '/lovable-uploads/34257d11-a88c-4148-9c8e-04aff77fef5d.webp',
    imageAlt: 'VELUX SUN TUNNEL tubular skylight in bathroom ceiling',
  },
];

/* ─────────────────  Page  ───────────────── */

const VeluxLineup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'VELUX Skylight Models | Complete Lineup | Stark Roofing Seattle',
    description:
      'Every VELUX residential skylight we install — VSS solar, VSE electric, VS manual, FS & FCM fixed, and SUN TUNNEL tubular. Real specs, sizes, glass technology, and warranty info.',
    canonical: 'https://starkroofingrenovation.com/skylights/velux-lineup',
    keywords:
      'VELUX skylights Seattle, VSS solar skylight, VSE electric skylight, SUN TUNNEL, VELUX VS, VELUX FS, VELUX FCM, VELUX certified installer',
    ogTitle: 'The Complete VELUX Skylight Lineup We Install',
    ogDescription:
      'Solar, electric, manual, fixed, and tubular VELUX skylights — full specs and warranty details.',
    ogImage: 'https://starkroofingrenovation.com/skylight-hero.webp',
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <ServicePageHero
        title="The VELUX Lineup"
        subtitle="Every residential VELUX skylight we install — with the real specs, sizes, and glass technology you need to choose the right one."
        badge="VELUX Certified Installer"
        bgImage="/skylight-hero.webp"
        breadcrumb="Skylights › VELUX Lineup"
        ctaLabel="Get a Free Estimate"
        ctaHref="#contact"
        secondaryCta={{ label: 'Back to Skylights', href: '/skylights' }}
        accentColor="#f59e0b"
        align="center"
      />

      {/* ── Quick comparison ── */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-3">
              Quick Comparison
            </span>
            <h2 className="section-title text-center">Pick the Right Skylight in 30 Seconds</h2>
            <p className="section-subtitle text-center">
              Seven models, one decision. Here's how they stack up at a glance.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-sm border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Model</th>
                  <th className="text-left px-4 py-3 font-semibold">Family</th>
                  <th className="text-left px-4 py-3 font-semibold">Operation</th>
                  <th className="text-left px-4 py-3 font-semibold">Rain Sensor</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m, i) => (
                  <tr
                    key={m.id}
                    className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold text-navy">{m.modelCode}</div>
                      <div className="text-xs text-charcoal/60">{m.name}</div>
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{m.family}</td>
                    <td className="px-4 py-3 text-charcoal/80">{m.specs[0].value}</td>
                    <td className="px-4 py-3">
                      {m.specs.some((s) => s.label === 'Rain sensor' && s.value.toLowerCase().includes('not'))
                        ? <span className="text-charcoal/40">—</span>
                        : (m.family === 'Venting' && m.modelCode !== 'VS')
                        ? <Check size={18} className="text-green-600" />
                        : <span className="text-charcoal/40">—</span>}
                    </td>
                    <td className="px-4 py-3 text-charcoal/70 text-xs">{m.bestFor[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── Detailed model cards ── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-3">
              Full Lineup
            </span>
            <h2 className="section-title text-center">Every Model, Explained Honestly</h2>
            <p className="section-subtitle text-center">
              The real differences — not marketing fluff. We install all of them, so we'll tell you which one we'd pick for your specific room.
            </p>
          </div>

          <div className="space-y-10">
            {MODELS.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  id={m.id}
                  key={m.id}
                  className={`grid lg:grid-cols-5 gap-6 rounded-2xl overflow-hidden bg-white shadow-md border ${
                    m.featured ? 'border-amber-300 ring-2 ring-amber-200' : 'border-slate-200'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Image */}
                  <div className="lg:col-span-2 relative bg-slate-100 min-h-[260px]">
                    <img src={m.image} alt={m.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
                    {m.badge && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        <Star size={12} className="fill-white" /> {m.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-6 md:p-8 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <Icon size={20} className="text-amber-700" />
                      </div>
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                        {m.modelCode} · {m.family}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-1">{m.name}</h3>
                    <p className="text-sm text-charcoal/60 mb-3">{m.fullName}</p>
                    <p className="text-amber-700 italic font-medium mb-4">{m.tagline}</p>
                    <p className="text-charcoal/80 leading-relaxed mb-5">{m.description}</p>

                    <div className="grid md:grid-cols-2 gap-5 mb-5 text-left">
                      <div>
                        <div className="text-[11px] font-bold text-charcoal/50 uppercase tracking-widest mb-2">
                          Highlights
                        </div>
                        <ul className="space-y-1.5">
                          {m.highlights.map((h) => (
                            <li key={h} className="flex items-start text-sm text-charcoal/80">
                              <Check size={15} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-charcoal/50 uppercase tracking-widest mb-2">
                          Real Specs
                        </div>
                        <dl className="space-y-1 text-sm">
                          {m.specs.map((s) => (
                            <div key={s.label} className="flex justify-between gap-4 border-b border-slate-100 py-1">
                              <dt className="text-charcoal/60">{s.label}</dt>
                              <dd className="text-charcoal font-medium text-right">{s.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded text-left">
                      <div className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1">
                        Best for
                      </div>
                      <ul className="text-sm text-charcoal/80 space-y-0.5">
                        {m.bestFor.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Glass technology ── */}
      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-sm font-semibold mb-3">
                Glass Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Clean, Quiet &amp; Safe™ Glass — Standard on Every VELUX
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Every VELUX residential skylight ships with the same premium glass package as standard. No upgrade fees, no fine print. Here's what's actually in it:
              </p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-1.5 rounded mt-0.5"><Check size={16} className="text-amber-300" /></div>
                  <div>
                    <strong className="text-white">Laminated inner pane</strong>
                    <p className="text-sm text-white/60">Same construction as a car windshield — if it ever cracks, the interlayer holds the glass in place. No falling shards.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-1.5 rounded mt-0.5"><Check size={16} className="text-amber-300" /></div>
                  <div>
                    <strong className="text-white">LoĒ³-366 low-emissivity coating</strong>
                    <p className="text-sm text-white/60">Blocks 95% of UV and reflects radiant heat. Keeps furniture from fading and the room from baking in summer.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-1.5 rounded mt-0.5"><Check size={16} className="text-amber-300" /></div>
                  <div>
                    <strong className="text-white">Argon-gas filled</strong>
                    <p className="text-sm text-white/60">The space between the panes is filled with argon, an inert gas that insulates better than plain air. Lower U-factor, less heat loss.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-1.5 rounded mt-0.5"><Check size={16} className="text-amber-300" /></div>
                  <div>
                    <strong className="text-white">Neat® self-cleaning outer pane</strong>
                    <p className="text-sm text-white/60">A microscopic titanium dioxide layer breaks down organic dirt in sunlight, then rain rinses it away in sheets — not droplets.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 text-amber-300">Energy Performance (typical)</h3>
              <dl className="space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-white/70">U-Factor (lower is better)</dt>
                  <dd className="font-bold text-white">0.45</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-white/70">Solar Heat Gain Coefficient</dt>
                  <dd className="font-bold text-white">0.25</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-white/70">Visible Light Transmittance</dt>
                  <dd className="font-bold text-white">0.42</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-white/70">UV Block</dt>
                  <dd className="font-bold text-white">≈ 95%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/70">ENERGY STAR® rated</dt>
                  <dd className="font-bold text-amber-300">Yes — all zones</dd>
                </div>
              </dl>
              <p className="text-xs text-white/50 mt-4">
                Performance varies by exact model and frame size. We pull the official NFRC label for your selected unit before install.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sizes ── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-3">
              Sizing
            </span>
            <h2 className="section-title text-center">Standard VELUX Sizes</h2>
            <p className="section-subtitle text-center">
              VELUX uses two-letter size codes for deck-mounted units and four-digit codes for curb-mounted units. Here are the sizes we keep specs on:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Ruler size={20} className="text-amber-600" />
                <h3 className="text-xl font-bold text-navy">Deck-Mounted (VSS / VSE / VS / FS)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-charcoal/60 uppercase tracking-wider">
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2">Code</th>
                      <th className="text-left py-2">Rough Opening (W × H)</th>
                      <th className="text-left py-2">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal/80">
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">C01</td><td>21" × 27½"</td><td>Closet, half bath</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">C04</td><td>21" × 38⅜"</td><td>Bathroom</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">C06</td><td>21" × 45¾"</td><td>Bathroom, hallway</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">M02</td><td>30½" × 30"</td><td>Bedroom</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">M04</td><td>30½" × 38⅜"</td><td>Bedroom, kitchen</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">M06</td><td>30½" × 45¾"</td><td>Living room</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">M08</td><td>30½" × 54"</td><td>Vaulted ceiling</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">S01</td><td>44¼" × 27⅜"</td><td>Wide / short rooms</td></tr>
                    <tr><td className="py-2 font-bold">S06</td><td>44¼" × 45¾"</td><td>Largest standard</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Ruler size={20} className="text-amber-600" />
                <h3 className="text-xl font-bold text-navy">Curb-Mounted (VCS / FCM)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-charcoal/60 uppercase tracking-wider">
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2">Code</th>
                      <th className="text-left py-2">Outside Curb (W × L)</th>
                      <th className="text-left py-2">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal/80">
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">2222</td><td>25½" × 25½"</td><td>Bath, closet</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">2230</td><td>25½" × 33½"</td><td>Bath, bedroom</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">2234</td><td>25½" × 37½"</td><td>Bedroom</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">2246</td><td>25½" × 49½"</td><td>Living room</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">3030</td><td>33½" × 33½"</td><td>Kitchen</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2 font-bold">3046</td><td>33½" × 49½"</td><td>Vaulted ceiling</td></tr>
                    <tr><td className="py-2 font-bold">4646</td><td>49½" × 49½"</td><td>Largest curb-mount</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-xs text-charcoal/50 mt-4 text-center max-w-3xl mx-auto">
            Custom sizes are available on special order with extended lead times. Most Seattle homes we work on use M04, M06, or 2230.
          </p>
        </div>
      </section>

      {/* ── No Leak Promise ── */}
      <section className="section-padding bg-amber-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white text-amber-800 border border-amber-200 text-sm font-semibold mb-3">
                Warranty
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
                The VELUX No Leak Promise™
              </h2>
              <p className="text-charcoal/80 mb-6 leading-relaxed">
                When a VELUX deck-mounted skylight is installed by a Certified Installer (that's us) using a VELUX flashing kit, the installation itself is covered for <strong>10 full years</strong>. That's the longest installation warranty in the residential skylight category. Here's the full breakdown:
              </p>
              <div className="space-y-3">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <Shield size={28} className="text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-navy">10 years — Installation</div>
                    <div className="text-sm text-charcoal/70">Covered against leaks when installed by a VELUX-Certified Installer with a VELUX flashing kit.</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <Shield size={28} className="text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-navy">20 years — Glass</div>
                    <div className="text-sm text-charcoal/70">Against seal failure and material defects in the insulating glass unit.</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <Shield size={28} className="text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-navy">10 years — Skylight & flashing</div>
                    <div className="text-sm text-charcoal/70">Material defects on the unit body and engineered flashing components.</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <Shield size={28} className="text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-navy">5 years — Motors, controls, blinds</div>
                    <div className="text-sm text-charcoal/70">Electronic components and accessory blinds.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-xl text-center md:text-left">
              <Award size={48} className="mb-4 mx-auto md:mx-0" />
              <h3 className="text-2xl font-extrabold mb-3">We're VELUX Certified</h3>
              <p className="text-white/90 mb-5 leading-relaxed">
                Stark Roofing &amp; Renovation is a VELUX-Certified Installer. That means every skylight we put in your roof gets the full 10-year No Leak Promise — automatically, no extra paperwork from you.
              </p>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20 text-left">
                <div className="text-xs uppercase tracking-widest text-white/70 mb-1">Certification advantages</div>
                <ul className="text-sm space-y-1">
                  <li>✓ Direct VELUX warranty registration</li>
                  <li>✓ Trained on VELUX flashing kits</li>
                  <li>✓ Access to factory tech support</li>
                  <li>✓ Genuine VELUX parts only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VELUX ACTIVE ── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-slate-50 to-amber-50 border border-amber-200 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Smartphone size={22} className="text-amber-600" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">VELUX ACTIVE with NETATMO</span>
                </div>
                <h2 className="text-3xl font-extrabold text-navy mb-3">Smart-Home Ready Out of the Box</h2>
                <p className="text-charcoal/80 mb-5 leading-relaxed">
                  Both solar (VSS/VCS) and electric (VSE) skylights pair with the VELUX ACTIVE gateway and a small Netatmo sensor. The system reads the indoor temperature, humidity, and CO₂ in your room and automatically opens or closes the skylights to keep the air healthy — and shuts them when it senses rain. Apple HomeKit compatible.
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-charcoal/80 text-left">
                  <li className="flex items-center gap-2"><Check size={15} className="text-amber-600" /> Indoor air quality automation</li>
                  <li className="flex items-center gap-2"><Check size={15} className="text-amber-600" /> Schedule-based open/close</li>
                  <li className="flex items-center gap-2"><Check size={15} className="text-amber-600" /> Apple HomeKit support</li>
                  <li className="flex items-center gap-2"><Check size={15} className="text-amber-600" /> Works with VELUX blinds</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-[200px] text-center">
                  <Smartphone size={56} className="text-amber-500 mx-auto mb-3" />
                  <div className="text-xs uppercase tracking-widest text-charcoal/60 mb-1">Add-on</div>
                  <div className="font-bold text-navy">VELUX ACTIVE Gateway + Sensor Kit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="contact" className="section-padding bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Not Sure Which VELUX Is Right For Your Room?
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Tell us the room and the ceiling — we'll tell you exactly which VELUX model and size will work best. Free, no pressure, and we'll come measure if you want a real number.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/skylights#contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-2xl transition-colors"
            >
              Get a Free Skylight Estimate <ArrowRight size={18} />
            </Link>
            <Link
              to="/skylights"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/25 text-white font-semibold rounded-full transition-colors"
            >
              <ChevronRight size={18} className="rotate-180" /> Back to Skylights Overview
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
      <QuickQuoteButton
        sticky
        defaultService="skylight"
        label="Get My Free Skylight Quote"
        dialogTitle="Free Skylight Estimate"
      />
    </div>
  );
};

export default VeluxLineup;
