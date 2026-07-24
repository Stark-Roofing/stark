import { useEffect } from 'react';

interface ProductVariant {
  /** Full model name, e.g. "VELUX VSS Deck-Mounted Solar Powered Fresh Air Skylight" */
  name: string;
  /** Manufacturer model code, e.g. "VSS" */
  sku: string;
  /** Plain-text description of this specific model */
  description: string;
  /** Canonical URL of this model's section on the page, e.g. ".../velux-lineup#vss" */
  url: string;
  /** Key spec label/value pairs shown on the page for this model */
  specs: { label: string; value: string }[];
}

interface ProductGroupSchemaProps {
  /** Name of the product line, e.g. "VELUX Skylight Lineup" */
  name: string;
  /** Plain-text description of the page (reuse the page meta description) */
  description: string;
  /** Canonical URL of the page */
  url: string;
  /** Brand shared by every variant, e.g. "VELUX" */
  brand: string;
  /** The individual models/variants shown on the page, in display order */
  variants: ProductVariant[];
}

/**
 * Injects a ProductGroup JSON-LD block into <head> for pages that catalog
 * several distinct product models (SKUs) sharing a brand/category, as
 * opposed to a single installed service — use ServiceSchema.tsx for that.
 * Mirrors the injection/cleanup pattern in ServiceSchema.tsx and
 * FAQSchema.tsx.
 */
const ProductGroupSchema = ({ name, description, url, brand, variants }: ProductGroupSchemaProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ProductGroup',
      'name': name,
      'description': description,
      'url': url,
      'brand': {
        '@type': 'Brand',
        'name': brand,
      },
      'hasVariant': variants.map((variant) => ({
        '@type': 'Product',
        'name': variant.name,
        'sku': variant.sku,
        'description': variant.description,
        'url': variant.url,
        'brand': {
          '@type': 'Brand',
          'name': brand,
        },
        'additionalProperty': variant.specs.map((spec) => ({
          '@type': 'PropertyValue',
          'name': spec.label,
          'value': spec.value,
        })),
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-productgroup-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [name, description, url, brand, variants]);

  return null;
};

export default ProductGroupSchema;
