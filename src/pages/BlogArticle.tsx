import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import VirtualAssistant from '@/components/finance/VirtualAssistant';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import BreadcrumbSchema from '@/components/shared/BreadcrumbSchema';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowLeft, Phone } from 'lucide-react';

// Strip inline markdown (bold + links) down to plain text for JSON-LD.
const stripMd = (s: string): string =>
  s
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();

// Parse the "Frequently asked questions" section of a post into Q/A pairs so we
// can emit FAQPage schema for AEO (AI Overviews, ChatGPT, Perplexity, rich
// results). A question is a line that is entirely bold and ends with "?".
// Returns [] when a post has no FAQ section — callers fall back to BlogPosting
// schema only, so this can never break rendering.
const parseFAQs = (content: string): { q: string; a: string }[] => {
  const faqs: { q: string; a: string }[] = [];
  let inFAQ = false;
  let curQ: string | null = null;
  let curA: string[] = [];
  const flush = () => {
    if (curQ && curA.length) faqs.push({ q: curQ, a: curA.join(' ').trim() });
    curQ = null;
    curA = [];
  };
  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (/^##\s/.test(line)) {
      if (/frequently asked questions/i.test(line)) {
        inFAQ = true;
        continue;
      }
      if (inFAQ) {
        flush();
        inFAQ = false;
      }
      continue;
    }
    if (!inFAQ || !line) continue;
    // A question is either a fully-bold line ("**...?**") or an h3 heading
    // ("### ...?"). Both styles appear across the post archive. We only look
    // for these inside the FAQ section, so any "?" line here is a real question.
    const boldMatch = line.match(/^\*\*(.+?)\*\*$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    let q: string | null = null;
    if (boldMatch && boldMatch[1].trim().endsWith('?')) q = stripMd(boldMatch[1]);
    else if (h3Match && h3Match[1].trim().endsWith('?')) q = stripMd(h3Match[1]);
    if (q) {
      flush();
      curQ = q;
    } else if (curQ) {
      curA.push(stripMd(line));
    }
  }
  flush();
  return faqs;
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSEOMeta({
    title: post ? `${post.title} | Stark Roofing Blog` : 'Blog | Stark Roofing',
    description: post?.excerpt || '',
    canonical: post ? `https://starkroofingrenovation.com/blog/${post.slug}` : '',
    keywords: post?.keywords || '',
    ogTitle: post?.title || '',
    ogDescription: post?.excerpt || '',
    ogImage: post ? `https://starkroofingrenovation.com${post.image}` : '',
    schemaMarkup: post ? {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: `https://starkroofingrenovation.com${post.image}`,
          datePublished: post.date,
          dateModified: post.dateModified || post.date,
          mainEntityOfPage: `https://starkroofingrenovation.com/blog/${post.slug}`,
          author: {
            '@type': 'Organization',
            name: 'Stark Roofing & Renovation',
            url: 'https://www.starkroofingrenovation.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Stark Roofing & Renovation',
          },
        },
        // FAQPage schema for AEO — only emitted when the post has an FAQ section.
        ...(() => {
          const faqs = parseFAQs(post.content);
          return faqs.length
            ? [{
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }]
            : [];
        })(),
      ],
    } : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Simple markdown-like rendering for blog content
  const renderInline = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-stark-red hover:underline">$1</a>');

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let tableLines: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 text-charcoal/80 mb-6 ml-4">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = () => {
      if (tableLines.length === 0) return;
      // Markdown table format:
      //   tableLines[0] = header row "| col1 | col2 | ... |"
      //   tableLines[1] = separator "|---|---|...|"
      //   tableLines[2..] = body rows
      const parseRow = (line: string) =>
        line.split('|').slice(1, -1).map((c) => c.trim());

      const headers = tableLines[0] ? parseRow(tableLines[0]) : [];
      // Skip separator row if present (contains only `---` or `:---:` etc)
      const sepIdx = tableLines[1] && /^\|[\s:|\-]+\|$/.test(tableLines[1].replace(/\s/g, '')) ? 1 : -1;
      const bodyStart = sepIdx === 1 ? 2 : 1;
      const bodyRows = tableLines.slice(bodyStart).map(parseRow);

      elements.push(
        <div key={`tbl-${elements.length}`} className="overflow-x-auto mb-6 -mx-4 md:mx-0">
          <table className="min-w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-navy text-white">
                {headers.map((h, i) => (
                  <th key={i} className="px-3 md:px-4 py-2 text-left font-semibold"
                      dangerouslySetInnerHTML={{ __html: renderInline(h) }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {row.map((c, ci) => (
                    <td key={ci}
                        className="px-3 md:px-4 py-2 border-b border-gray-200 text-charcoal/80"
                        dangerouslySetInnerHTML={{ __html: renderInline(c) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableLines = [];
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        flushTable();
        return;
      }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        tableLines.push(trimmed);
        return;
      }
      // Closing any open table when we hit non-table content
      flushTable();

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl md:text-3xl font-heading font-bold text-navy mt-10 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl md:text-2xl font-heading font-bold text-navy mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
        listItems.push(trimmed.replace(/^- /, ''));
      } else if (/^\d+\.\s/.test(trimmed)) {
        listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      } else {
        flushList();
        elements.push(
          <p
            key={index}
            className="text-charcoal/80 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }}
          />
        );
      }
    });
    flushList();
    flushTable();
    return elements;
  };

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://starkroofingrenovation.com/' },
        { name: 'Blog', url: 'https://starkroofingrenovation.com/blog' },
        { name: post.title, url: `https://starkroofingrenovation.com/blog/${post.slug}` },
      ]} />
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-8 md:pb-12 text-center md:text-left">
            <Link to="/blog" className="text-white/80 hover:text-white inline-flex items-center mb-4 text-sm">
              <ArrowLeft size={14} className="mr-1" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white max-w-4xl mx-auto md:mx-0">
              {post.title}
            </h1>
            <div className="flex items-center justify-center md:justify-start text-white/70 mt-4 space-x-4 text-sm">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <article className="prose-lg">
              {renderContent(post.content)}
            </article>

            {/* CTA Box */}
            <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 text-center md:text-left">
              <h3 className="text-xl font-heading font-bold text-navy mb-3">
                Ready for a Free Roof Inspection?
              </h3>
              <p className="text-charcoal/70 mb-4">
                Our GAF certified team provides free, no-obligation inspections across Seattle, Sammamish, Bellevue, and the entire Puget Sound area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/contact"
                  className="bg-stark-red hover:bg-stark-red/90 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 text-center"
                >
                  Get Free Estimate
                </Link>
                <a
                  href="tel:+12067398232"
                  className="border-2 border-navy text-navy font-semibold py-3 px-6 rounded-md hover:bg-navy hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <Phone size={16} className="mr-2" />
                  (206) 739-8232
                </a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16">
              <h3 className="text-2xl font-heading font-bold text-navy mb-8 text-center md:text-left">
                More from Our Blog
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherPosts.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center md:text-left">
                      <h4 className="font-heading font-bold text-navy text-sm group-hover:text-stark-red transition-colors">
                        {related.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <VirtualAssistant />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default BlogArticle;
