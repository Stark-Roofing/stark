import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import ServicePageHero from '@/components/shared/ServicePageHero';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Roofing Blog | Tips, Guides & News | Stark Roofing Seattle',
    description: 'Expert roofing tips, maintenance guides, and news for Seattle & Puget Sound homeowners. Learn about roof replacement, repair, storm damage, gutters, and more from our GAF certified team.',
    canonical: 'https://starkroofingrenovation.com/blog/',
    keywords: 'roofing blog Seattle, roof maintenance tips, roofing guide Pacific Northwest, Seattle roofing advice, homeowner roofing tips',
    ogTitle: 'Roofing Blog | Stark Roofing & Renovation',
    ogDescription: 'Expert roofing tips and guides for Seattle & Puget Sound homeowners.',
    ogImage: 'https://starkroofingrenovation.com/drone-1.webp',
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <ServicePageHero
        title="Roofing Blog"
        subtitle="Expert tips, maintenance guides, and advice for Pacific Northwest homeowners."
        badge="From Our GAF Certified Team"
        bgImage="/drone-1.webp"
        breadcrumb="Blog"
        ctaLabel="Get a Free Estimate"
        ctaHref="/contact"
        align="center"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-stark-red transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-charcoal/70 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="text-stark-red font-semibold text-sm flex items-center justify-center">
                      Read More <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-navy rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Need Help With Your Roof?
              </h3>
              <p className="text-white/80 mb-6">
                Get a free, no-obligation inspection and estimate from our GAF certified team.
              </p>
              <Link
                to="/contact"
                className="bg-stark-red hover:bg-stark-red/90 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VirtualAssistant />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Blog;
