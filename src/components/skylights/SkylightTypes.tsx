import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Zap, Hand, Square, CircleDot, Star, ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react';

type ProductCard = {
  badge?: string;
  title: string;
  model: string;
  icon: LucideIcon;
  bullets: string[];
  bestFor: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  /** Deeper info shown when "Read more" is expanded */
  readMore: string;
};

const PRODUCTS: ProductCard[] = [
  {
    badge: 'Most Popular',
    title: 'Solar Powered "Fresh Air"',
    model: 'VELUX VSS',
    icon: Sun,
    bullets: [
      'Opens & closes by remote — no wiring',
      'Built-in rain sensor closes it for you',
      'Solar panel charges silently on the roof',
      'Insect screen included',
    ],
    bestFor: 'Bathrooms, kitchens, vaulted ceilings — anywhere you want fresh air and zero electrical work.',
    image: '/lovable-uploads/2821b129-1a0b-4714-9322-0ac209cc85ac.webp',
    imageAlt: 'VELUX solar powered fresh air skylight installed in modern white ceiling',
    featured: true,
    readMore: 'The solar panel charges an internal battery during daylight, so the skylight keeps working through cloudy Pacific Northwest stretches. Pairs with VELUX solar-powered blackout or light-filtering blinds for full light control. ENERGY STAR rated, laminated glass standard, comes in over a dozen sizes for any framing.',
  },
  {
    title: 'Electric "Fresh Air"',
    model: 'VELUX VSE',
    icon: Zap,
    bullets: [
      'Hardwired, controlled by wall switch or remote',
      'Built-in rain sensor closes automatically',
      'Quiet motor, smooth operation',
      'Pairs with smart home systems',
    ],
    bestFor: 'New construction or remodels where wiring is already accessible.',
    image: '/lovable-uploads/263e14a0-6faa-45ca-b508-4d8d686b30e5.webp',
    imageAlt: 'Electric skylight installed in modern kitchen with bright natural light',
    readMore: 'Same rain sensor and remote control as the solar model, but powered through your home electrical. Slightly faster open/close motor. Best when you already have wiring in the attic from a remodel — saves the cost of a solar charge cycle and runs slightly more reliably in winter darkness. Compatible with the same blackout and light-filtering blinds as the solar version.',
  },
  {
    title: 'Manual "Fresh Air"',
    model: 'VELUX VS',
    icon: Hand,
    bullets: [
      'Hand-cranked operation with control rod',
      'Vents fresh air without electricity',
      'Most affordable venting option',
      'Insect screen included',
    ],
    bestFor: 'Lower-pitched rooms within easy reach where you want venting without the cost of motorized.',
    image: '/lovable-uploads/f6057036-c7fd-4c02-8d16-ed9c3bad8e5f.webp',
    imageAlt: 'Manual venting skylight in cozy living room',
    readMore: 'Operated with a control rod (we install the rod or you use a pole). No electronics, no battery, nothing to fail. Lowest entry price for venting. Only downside vs the powered models: no rain sensor, so you have to remember to close it before storms. Great for low-pitch ceilings within reach.',
  },
  {
    title: 'Fixed Skylight',
    model: 'VELUX FCM / FS',
    icon: Square,
    bullets: [
      'Cannot open — pure light, max efficiency',
      'Lowest cost, simplest install',
      'Curb-mount (FCM) or deck-mount (FS) available',
      'Laminated glass for safety',
    ],
    bestFor: 'Stairwells, hallways, walk-in closets, dark corners that just need more light.',
    image: '/lovable-uploads/263e14a0-6faa-45ca-b508-4d8d686b30e5.webp',
    imageAlt: 'Fixed skylight bringing natural light into modern interior',
    readMore: 'Two install styles: deck-mount (FS) sits low and tight to the roof for a clean exterior look, curb-mount (FCM) sits on a built-up wood curb that gives a slightly raised profile and works well on lower-pitched roofs. Both pair with VELUX solar-powered blackout, light-filtering, or honeycomb energy blinds — letting you turn even a fixed skylight into a fully controllable light source.',
  },
  {
    title: 'SUN TUNNEL Tubular',
    model: 'VELUX TGR / TMR',
    icon: CircleDot,
    bullets: [
      'Pipes daylight through a reflective tube',
      'Fits where a full skylight won\'t — between joists',
      'Rigid or flexible tunnel options',
      'Looks like a recessed light from below',
    ],
    bestFor: 'Small bathrooms, hallways, closets, laundry rooms — tight or hard-to-reach spots.',
    image: '/lovable-uploads/34257d11-a88c-4148-9c8e-04aff77fef5d.webp',
    imageAlt: 'SUN TUNNEL tubular skylight illuminating kitchen interior',
    readMore: 'Two tunnel styles: rigid (TGR) gives the brightest output by reflecting light straight down, flexible (TMR) bends around obstacles in your attic when a straight line isn\'t possible. Output looks like a recessed ceiling light from below — most homeowners are surprised how bright a 10" tunnel actually is. No drywall light shaft required, no permits in most cities.',
  },
];

const SkylightTypes = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (
    <section id="types" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-3">
            VELUX Lineup
          </span>
          <h2 className="section-title text-center">The VELUX Skylights We Install</h2>
          <p className="section-subtitle text-center">
            We install the full VELUX residential lineup — from solar-powered automatic skylights with built-in rain sensors all the way down to tubular SUN TUNNELS for tight spots. Here's what each one does best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, idx) => {
            const Icon = product.icon;
            const isExpanded = expandedId === product.model;
            return (
              <motion.div
                key={product.model}
                className={`group rounded-xl overflow-hidden shadow-md bg-white flex flex-col relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  product.featured ? 'ring-2 ring-amber-400 lg:scale-[1.02]' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {product.badge && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    <Star size={12} className="fill-white" /> {product.badge}
                  </div>
                )}
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="bg-amber-100 p-1.5 rounded-md">
                      <Icon size={18} className="text-amber-700" />
                    </div>
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">{product.model}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3 text-center">{product.title}</h3>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {product.bullets.map((b) => (
                      <li key={b} className="flex items-start text-sm text-charcoal/80">
                        <span className="text-amber-500 mr-2 flex-shrink-0">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-3">
                    <div className="text-[11px] font-semibold text-charcoal/50 uppercase tracking-wide mb-1">Best for</div>
                    <p className="text-xs text-charcoal/70 leading-relaxed">{product.bestFor}</p>
                  </div>

                  {/* Read more expandable */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wide mb-1.5">
                            More details
                          </div>
                          <p className="text-xs text-charcoal/80 leading-relaxed">{product.readMore}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : product.model)}
                    className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 transition self-start"
                  >
                    {isExpanded ? (
                      <>
                        Show less <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkylightTypes;
