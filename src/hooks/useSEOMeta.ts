/**
 * Hook to dynamically update page meta tags for SEO
 * Call this in any page to set custom title, description, canonical URL, schema markup
 */

import { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  /** Robots directive, e.g. "noindex, nofollow". Omit to keep the site
   *  default ("index, follow" from index.html). */
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaMarkup?: Record<string, any>;
}

export const useSEOMeta = ({
  title,
  description,
  canonical,
  keywords,
  robots,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  schemaMarkup,
}: SEOMetaProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      let element = property
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update description
    setMetaTag('description', description);

    // Update keywords if provided
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Update robots directive if provided (e.g. "noindex, nofollow" for
    // admin/ads pages). Overwrites the "index, follow" default set in index.html.
    if (robots) {
      setMetaTag('robots', robots);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    // Update Open Graph tags
    if (ogTitle) setMetaTag('og:title', ogTitle, true);
    if (ogDescription) setMetaTag('og:description', ogDescription, true);
    if (ogImage) setMetaTag('og:image', ogImage, true);

    // Update Twitter Card tags
    if (twitterTitle) setMetaTag('twitter:title', twitterTitle);
    if (twitterDescription) setMetaTag('twitter:description', twitterDescription);
    if (twitterImage) setMetaTag('twitter:image', twitterImage);

    // Update schema markup
    if (schemaMarkup) {
      let schemaScript = document.querySelector('script[type="application/ld+json"][data-seo-page-schema]') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.setAttribute('data-seo-page-schema', 'true');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaMarkup);
    }

    // Cleanup: remove page-specific schema on unmount
    return () => {
      const pageSchema = document.querySelector('script[type="application/ld+json"][data-seo-page-schema]');
      if (pageSchema) {
        pageSchema.remove();
      }

      // If this page overrode robots (e.g. noindex), restore the site default
      // when navigating away — otherwise the whole SPA would stay noindexed.
      if (robots) {
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta) {
          robotsMeta.setAttribute('content', 'index, follow');
        }
      }
    };
  }, [title, description, canonical, keywords, robots, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, schemaMarkup]);
};
