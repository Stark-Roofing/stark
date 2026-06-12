
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import { Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  image: string;
  title: string;
  location: string;
  description: string;
}

const projects: Project[] = [
  {
    image: '/gallery/roof-replacement-before-after-kirkland-wa.jpg',
    title: 'Full Roof Tear-Off & Shingle Replacement',
    location: 'Kirkland, WA',
    description:
      'Complete tear-off of damaged shingles down to the decking, followed by new GAF Timberline HDZ architectural shingles with proper ventilation and ice & water shield.',
  },
  {
    image: '/gallery/residential-roof-replacement-sammamish-wa.jpg',
    title: 'Residential Roof Replacement',
    location: 'Sammamish, WA',
    description:
      'Multi-slope residential re-roof with new architectural shingles. Upgraded flashing and ridge vents for better airflow and long-term protection.',
  },
  {
    image: '/gallery/architectural-shingle-reroof-redmond-wa.jpg',
    title: 'Architectural Shingle Re-Roof',
    location: 'Redmond, WA',
    description:
      'Weathered shingles replaced across a complex multi-hip roof layout. New shingles, step flashing, and sealed penetrations for a watertight finish.',
  },
  {
    image: '/gallery/roof-replacement-before-after-issaquah-wa.jpg',
    title: 'Roof Replacement with Dormer Detail',
    location: 'Issaquah, WA',
    description:
      'Full shingle replacement with new architectural shingles and detailed dormer flashing. Old roofing removed and replaced with a clean, watertight finish.',
  },
  {
    image: '/gallery/roof-tearoff-skylight-installation-woodinville-wa.jpg',
    title: 'Full Tear-Off & Re-Roof with Skylights',
    location: 'Woodinville, WA',
    description:
      'Complete tear-off down to the joists, new insulation and decking, ice & water shield, and GAF shingles installed around skylights.',
  },
];

const BeforeAfter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Our Recent Projects | Roof Replacements & Renovations | Stark Roofing',
    description: 'See real roofing projects completed by Stark Roofing across Seattle & Puget Sound. GAF Certified contractor — full tear-offs, shingle replacements, and more. Call (206) 739-8232.',
    canonical: 'https://starkroofingrenovation.com/our-projects',

    keywords: 'roofing projects Seattle, roof replacement photos, GAF certified roofer, Stark Roofing projects',
    ogTitle: 'Our Recent Projects | Stark Roofing & Renovation',
    ogDescription: 'Real roofing transformations across Seattle & Puget Sound. See the Stark difference.',
    ogImage: 'https://starkroofingrenovation.com/gallery/project-1.jpg',
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/gallery/roof-replacement-after-kirkland-wa.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-1 bg-stark-red mx-auto mb-5" />
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
            Our Recent Projects
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Real roof replacements and renovations completed by our team across the Greater Seattle area. Every photo is from an actual Stark Roofing job.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center md:text-left">
                  <h3 className="text-xl font-heading font-bold text-navy mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stark-red font-medium flex items-center justify-center md:justify-start gap-1 mb-3">
                    <MapPin size={14} />
                    {project.location}
                  </p>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready for Your Roof Transformation?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Schedule a free drone inspection and see exactly what your roof needs — no pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-stark-red hover:bg-stark-red/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get Free Inspection
            </a>
            <a
              href="tel:+12067398232"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone size={18} />
              (206) 739-8232
            </a>
          </div>
        </div>
      </section>

      <VirtualAssistant />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default BeforeAfter;