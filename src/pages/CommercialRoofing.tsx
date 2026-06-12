import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/shared/FloatingCTA';
import ContactForm from '@/components/services/ContactForm';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/shared/FAQSchema';
import ServiceSchema from '@/components/shared/ServiceSchema';
import {
  ChevronRight,
  Phone,
  Award,
  Shield,
  Clock,
  Droplets,
  AlertTriangle,
  FileCheck,
  Building2,
  CheckCircle2,
  Wind,
  Layers,
  Sparkles,
} from 'lucide-react';
import VirtualAssistant from '@/components/finance/VirtualAssistant';

const SYSTEMS = [
  {
    name: 'TPO',
    full: 'Thermoplastic Polyolefin',
    Icon: Sparkles,
    badge: 'Most Common in Seattle',
    badgeColor: 'bg-stark-red',
    lifespan: '20–30 years',
    cost: '$7–$15 / sq ft',
    pnwFit: 'Excellent',
    summary:
      "White single-ply membrane with heat-welded seams. Reflective, durable, and the most common commercial choice in Seattle. The white surface meets WSEC cool-roof provisions on certain occupancies.",
    pros: [
      'Heat-welded seams = monolithic membrane',
      'Reflective white surface (energy savings)',
      '20–25 yr manufacturer NDL warranties available',
      'Resistant to UV, punctures, and chemicals',
    ],
    fit: 'Office buildings, retail, warehouses, multi-family',
  },
  {
    name: 'PVC',
    full: 'Polyvinyl Chloride',
    Icon: Shield,
    badge: 'Best for Restaurants',
    badgeColor: 'bg-purple-700',
    lifespan: '25–30+ years',
    cost: '$9–$14 / sq ft',
    pnwFit: 'Excellent',
    summary:
      'Single-ply membrane that handles grease, chemicals, and high heat better than any other system. The right call for restaurants, kitchens, and chemical exposure.',
    pros: [
      'Superior chemical and grease resistance',
      'Heat-welded seams (like TPO)',
      'Fire-resistant',
      'Longest lifespan of the single-ply systems',
    ],
    fit: 'Restaurants, hospitals, lab buildings, industrial kitchens',
  },
  {
    name: 'EPDM',
    full: 'Ethylene Propylene Diene Monomer',
    Icon: Layers,
    badge: 'Budget-Friendly',
    badgeColor: 'bg-charcoal/60',
    lifespan: '20–30 years',
    cost: '$6–$12 / sq ft',
    pnwFit: 'Moderate',
    summary:
      "Black synthetic rubber single-ply, the original 'rubber roof.' Long track record but the seams are taped or glued, and over 15+ years EPDM tends to shrink and pull at flashings.",
    pros: [
      'Lowest installed cost of the single-ply systems',
      'Long real-world track record (since the 1960s)',
      'Easy to repair with patches',
      'Stretchable — handles building movement',
    ],
    fit: 'Older buildings, simple low-cost re-covers, properties with shaded sides where reflectivity doesn\'t matter',
  },
  {
    name: 'Modified Bitumen',
    full: 'Mod Bit / BUR (Built-Up Roofing)',
    Icon: Building2,
    badge: 'Heavy-Duty',
    badgeColor: 'bg-navy',
    lifespan: '20–25 years',
    cost: '$9–$20 / sq ft',
    pnwFit: 'OK',
    summary:
      'Asphalt-based, multi-ply, applied with torch or cold-set adhesive. Heavy and redundant. Note: torch-applied work is restricted on some Seattle jobs (fire risk).',
    pros: [
      'Multiple plies = built-in waterproofing redundancy',
      'Walkable / heavy traffic resistant',
      'Familiar to older building owners',
      'Good for warehouse and industrial roofs',
    ],
    fit: 'Industrial, warehouses, parapet-heavy buildings',
  },
];

const SEATTLE_PROBLEMS = [
  {
    Icon: Droplets,
    title: 'Ponding Water',
    body: "Seattle's sustained rain finds any negative slope or blocked drain. Water sitting on the membrane more than 48 hours voids most manufacturer warranties. Clogged interior drains and scuppers are the #1 leak cause we see in this market.",
  },
  {
    Icon: Sparkles,
    title: 'Moss & Algae',
    body: 'PNW humidity + shaded north sides + adjacent trees = aggressive biological growth. Moss roots penetrate seams and lift flashings. We recommend quarterly inspection and cleaning on every Seattle commercial roof.',
  },
  {
    Icon: AlertTriangle,
    title: 'EPDM Seam Shrinkage',
    body: 'EPDM shrinks over time, pulling at seams, flashings, and parapet terminations — the single most common failure mode for aging Seattle EPDM roofs. If your building has 15+ year old EPDM, it\'s on borrowed time.',
  },
  {
    Icon: Wind,
    title: 'Flashing & Penetration Failures',
    body: 'HVAC curbs, pipe boots, skylight curbs, and parapet terminations are where almost every leak starts. We pressure-wash, photograph, and re-seal all penetrations as part of every install.',
  },
];

const PROPERTY_MANAGER_CHECKLIST = [
  { title: 'NDL warranty', body: 'No Dollar Limit labor + material — the gold standard. Material-only warranties leave you on the hook for the labor when something fails.' },
  { title: 'Insurance certificates', body: 'GL ≥ $2M, WA L&I workers\' comp, auto. Additional insured endorsement for the building owner.' },
  { title: 'Tear-off vs re-cover', body: 'Seattle code allows up to 2 roofing layers on most commercial buildings. Re-cover is faster and cheaper but only works once and only over a sound substrate.' },
  { title: 'Tenant disruption plan', body: 'Noise, odor, parking, dumpster placement, hours of operation. We coordinate with your tenants before day 1.' },
  { title: 'Prevailing wage', body: 'Required only on WA public works (no dollar threshold per RCW 39.12). Private commercial is not subject unless public funds are involved.' },
  { title: 'References', body: 'Comparable building type, similar square footage, local. Ask for 3 we did in the last 12 months — we\'ll give you 5.' },
];

const FAQS = [
  {
    question: 'Which commercial roof system is best for Seattle weather — TPO, PVC, or EPDM?',
    answer:
      "For most Seattle commercial buildings the answer is TPO. The white reflective surface meets WSEC cool-roof code, the heat-welded seams form a monolithic membrane that handles atmospheric river rain, and 20–25 year NDL warranties are widely available. PVC is the right call if you have grease exhaust (restaurants), chemical exposure (lab buildings), or a hospital. EPDM is fine for budget-driven projects on older buildings, but its taped/glued seams shrink with age — plan on more maintenance over the life of the roof.",
  },
  {
    question: 'How much does a commercial flat roof cost per square foot in 2026?',
    answer:
      'Industry surveys put 2026 commercial installed pricing at roughly $7–$15/sq ft for TPO, $6–$12/sq ft for EPDM, $9–$14/sq ft for PVC, and $9–$20/sq ft for modified bitumen — all depending on tear-off, insulation R-value, parapet detailing, deck condition, and access. We provide line-item bids so you know exactly what you\'re paying for.',
  },
  {
    question: 'Can you install a new roof over my existing one, or do you have to tear off?',
    answer:
      "Seattle code allows up to 2 roofing layers on most commercial buildings, so a re-cover is often legal — and significantly faster and cheaper. But it only works if (1) the existing roof is dry and structurally sound, (2) it's only your first re-cover, and (3) the deck below isn't compromised. We do a moisture survey and core samples before recommending one or the other.",
  },
  {
    question: 'How long will the roof project take, and will my tenants have to leave?',
    answer:
      "Most commercial re-roofs take 1–3 weeks depending on square footage, system, and insulation. Your tenants don't have to leave — we work in dry weather windows, coordinate hours that minimize noise during business hours, and stage materials so we never block access. We give you a written daily schedule before we start.",
  },
  {
    question: 'What warranty do you offer, and who backs it — you or the manufacturer?',
    answer:
      "On commercial systems, you want a manufacturer-backed warranty (not just a contractor warranty). As a GAF Certified commercial contractor we can offer GAF's System Pledge Roof Guarantee on qualifying installations — that's GAF themselves backing the labor and material together. We carry our own workmanship warranty on top of that.",
  },
  {
    question: 'Do you carry all required insurance and bonding for Washington commercial work?',
    answer:
      "Yes. We carry General Liability ≥ $2M, WA L&I workers' compensation, commercial auto, and we add the building owner as additional insured on every commercial project at no charge. WA contractor's license, bond, and L&I number available on request before bid.",
  },
  {
    question: 'Is my roof project subject to WA prevailing wage?',
    answer:
      "Only if it's a public works project. Per RCW 39.12, all Washington public works (state, county, city, school district, port, transit) require prevailing wage with weekly certified payroll filed via L&I — and there's no dollar threshold (it applies even on small jobs). Private commercial buildings are NOT subject unless public funds are involved. We can quote either way.",
  },
  {
    question: 'How do you handle ponding water, moss, and clogged drains in Seattle?',
    answer:
      'We start every project by clearing every drain and scupper, photographing existing ponding, and adding tapered insulation where the deck has settled. On install, we add cricket details around HVAC curbs and large penetrations to direct water toward drains. After install, we offer quarterly maintenance inspections — most ponding/moss problems are completely preventable with twice-a-year drain clearing and roof washing.',
  },
];

const CommercialRoofing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Commercial Roofing Seattle | TPO · PVC · EPDM · GAF Certified | Stark Roofing',
    description:
      'Commercial flat roofing across Greater Seattle. TPO, PVC, EPDM, and modified bitumen — installed by GAF Certified crews with NDL warranties. King, Snohomish, Pierce counties. (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/commercial-roofing',
    keywords:
      'commercial roofing seattle, TPO roofing seattle, PVC commercial roof, EPDM rubber roof, flat roof contractor puget sound, GAF certified commercial',
    ogTitle: 'Commercial Roofing — TPO, PVC, EPDM, Mod Bit | Stark Roofing',
    ogDescription:
      'GAF Certified commercial roofing across King, Snohomish, and Pierce counties. NDL warranties, prevailing wage capable, full insurance.',
    ogImage: 'https://starkroofingrenovation.com/commercial-roofing-hero.webp',
  });

  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Commercial Roofing"
        description="Commercial flat roofing across Greater Seattle. TPO, PVC, EPDM, and modified bitumen — installed by GAF Certified crews with NDL warranties. King, Snohomish, Pierce counties. (206) 739-8232."
        url="https://starkroofingrenovation.com/commercial-roofing"
      />
      <Navbar />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20">
        <div className="absolute inset-0">
          <img
            src="/commercial-roofing-hero.webp"
            alt="Commercial flat roof installed by Stark Roofing with the Seattle skyline in the background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-white/50 text-xs tracking-widest uppercase mb-6 text-center"
            style={{ whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <ChevronRight className="inline-block w-3 h-3 mx-2 align-middle" />
            <span className="text-white/70">Commercial Roofing</span>
          </motion.div>

          <div className="max-w-2xl text-white text-center mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stark-red/20 border border-stark-red/40 backdrop-blur-sm mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Award size={13} className="text-stark-red" />
              GAF Certified Commercial Contractor
            </motion.div>

            <motion.h1
              className="font-heading font-extrabold leading-[1.05] tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="block text-4xl md:text-5xl lg:text-6xl">
                Flat Roofs.
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-stark-red">
                Built for Seattle Rain.
              </span>
            </motion.h1>

            <motion.div
              className="h-1 bg-stark-red rounded-full mb-5 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            />

            <motion.p
              className="text-base md:text-lg text-white/85 mb-7 leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              TPO, PVC, EPDM, and modified bitumen for office buildings, retail,
              multi-family, restaurants, and warehouses across King, Snohomish, and
              Pierce counties. NDL manufacturer warranties, full insurance, prevailing-wage
              capable, and crews that understand atmospheric river rain.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.55 }}
            >
              <a
                href="#book-commercial"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stark-red text-white font-bold rounded-full shadow-2xl hover:scale-[1.04] transition-transform"
              >
                Request Commercial Bid
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+12067398232"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/25 backdrop-blur-sm transition-colors"
              >
                <Phone className="w-5 h-5" />
                (206) 739-8232
              </a>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-3 sm:grid sm:grid-cols-3 sm:items-stretch max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              <div className="inline-flex sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 text-left">
                <Award size={18} className="text-stark-red flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium leading-tight">GAF Certified</span>
              </div>
              <div className="inline-flex sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 text-left">
                <Shield size={18} className="text-stark-red flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium leading-tight">NDL Warranties</span>
              </div>
              <div className="inline-flex sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15 text-left">
                <FileCheck size={18} className="text-stark-red flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium leading-tight">$2M GL Insured</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────── 4 SYSTEMS COMPARISON ─────────────────── */}
      <section id="systems" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="section-title">The 4 Commercial Roofing Systems, Plain English</h2>
            <p className="section-subtitle">
              Property managers who get this right save 5–10 years of headaches. Here's
              what each system actually is, what it costs, and what it's good for in
              Western Washington.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {SYSTEMS.map((s) => {
              const Icon = s.Icon;
              return (
                <Card
                  key={s.name}
                  className="border-0 shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-stark-red/10 p-3 rounded-full">
                          <Icon className="text-stark-red" size={26} />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-bold text-navy leading-tight">
                            {s.name}
                          </h3>
                          <div className="text-xs text-charcoal/55 leading-tight">{s.full}</div>
                        </div>
                      </div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white whitespace-nowrap ${s.badgeColor}`}
                      >
                        {s.badge}
                      </span>
                    </div>

                    <p className="text-sm text-charcoal/80 leading-relaxed mb-4">{s.summary}</p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-gray-50 rounded-md p-2 text-center">
                        <div className="text-[9px] uppercase tracking-wide text-charcoal/55 font-bold mb-0.5">
                          Lifespan
                        </div>
                        <div className="text-xs font-bold text-navy">{s.lifespan}</div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-2 text-center">
                        <div className="text-[9px] uppercase tracking-wide text-charcoal/55 font-bold mb-0.5">
                          Installed
                        </div>
                        <div className="text-xs font-bold text-navy">{s.cost}</div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-2 text-center">
                        <div className="text-[9px] uppercase tracking-wide text-charcoal/55 font-bold mb-0.5">
                          PNW fit
                        </div>
                        <div className="text-xs font-bold text-navy">{s.pnwFit}</div>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {s.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle2 className="text-stark-red mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-xs text-charcoal/80 leading-snug">{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-gray-100 text-xs text-charcoal/65">
                      <span className="font-semibold text-charcoal/85">Best for:</span> {s.fit}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-charcoal/55 mt-6 max-w-3xl mx-auto">
            Cost ranges are 2026 industry survey averages. Final pricing depends on
            tear-off, insulation R-value, deck condition, parapet detailing, and access.
          </p>
        </div>
      </section>

      {/* ─────────────────── SEATTLE-SPECIFIC PROBLEMS ─────────────────── */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="section-title">What Actually Wrecks Seattle Commercial Roofs</h2>
            <p className="section-subtitle">
              These aren't textbook problems — these are the failures we see week after
              week on real Puget Sound buildings. Knowing them is half the battle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SEATTLE_PROBLEMS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <div className="bg-stark-red/10 p-3 rounded-full flex-shrink-0">
                    <Icon className="h-6 w-6 text-stark-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-navy mb-2">{title}</h3>
                    <p className="text-sm text-charcoal/80 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── PROPERTY MANAGER CHECKLIST ─────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">What to Demand From Every Commercial Roofing Bid</h2>
              <p className="section-subtitle max-w-3xl mx-auto">
                If you're putting your roof out to bid, here's the property manager's
                checklist. Any contractor who can't check every box on this list is a
                contractor you can't afford.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROPERTY_MANAGER_CHECKLIST.map(({ title, body }) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <CheckCircle2 className="text-stark-red md:mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-navy mb-1">{title}</h4>
                    <p className="text-xs text-charcoal/75 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── BENEFITS / WHY STARK ─────────────────── */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Why Seattle Property Managers Hire Stark
              </h2>
              <p className="text-white/75 max-w-2xl mx-auto">
                30+ years installing commercial flat systems in Western Washington — we've
                seen what fails and we know exactly how to install around it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm text-center md:text-left">
                <div className="bg-stark-red/20 p-3 rounded-full inline-block mb-4 mx-auto md:mx-0">
                  <Shield className="text-stark-red" size={26} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Extended Lifespan</h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  20–30+ year systems with NDL manufacturer warranties. We do the install
                  the way the manufacturer specs it — no shortcuts that void coverage.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm text-center md:text-left">
                <div className="bg-stark-red/20 p-3 rounded-full inline-block mb-4 mx-auto md:mx-0">
                  <Clock className="text-stark-red" size={26} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Minimal Downtime</h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  We coordinate with your tenants on day 1, work in dry weather windows,
                  and never block tenant access. Daily written schedule before we start.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm text-center md:text-left">
                <div className="bg-stark-red/20 p-3 rounded-full inline-block mb-4 mx-auto md:mx-0">
                  <FileCheck className="text-stark-red" size={26} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Full Compliance</h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  $2M general liability, WA L&amp;I workers' comp, additional insured
                  endorsements at no charge, and prevailing-wage capable for public works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── FAQ ─────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <FAQSchema faqs={FAQS} />
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="section-title">Commercial Roofing FAQ</h2>
            <p className="section-subtitle">
              Real answers to the questions Seattle property managers ask before hiring a
              commercial roofing contractor.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`cm-faq-${i}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-navy hover:text-stark-red py-5">
                  <span className="text-left flex-1">{f.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-charcoal/80 text-sm md:text-base leading-relaxed pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─────────────────── BOOKING FORM ─────────────────── */}
      <div id="book-commercial">
        <ContactForm />
      </div>

      <VirtualAssistant />
      <FloatingCTA label="Free Commercial Estimate" />
      <Footer />
    </div>
  );
};

export default CommercialRoofing;
