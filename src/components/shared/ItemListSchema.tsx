import { useEffect } from 'react';

interface ItemListEntry {
  /** The clean service name, e.g. "Roof Replacement" */
  name: string;
  /** Canonical URL of that service's dedicated page */
  url: string;
  /** Plain-text description of the service */
  description?: string;
}

interface ItemListSchemaProps {
  /** Name of the list itself, e.g. "Stark Roofing & Renovation Services" */
  name: string;
  /** Plain-text description of the hub page (reuse the page meta description) */
  description: string;
  /** Canonical URL of the hub page, e.g. "https://starkroofingrenovation.com/services" */
  url: string;
  /** The individual services linked from this hub page, in display order */
  items: ItemListEntry[];
}

/**
 * Injects an ItemList JSON-LD block into <head> for hub/listing pages that
 * link out to several dedicated service pages (each of which carries its
 * own ServiceSchema). Mirrors the injection/cleanup pattern in
 * ServiceSchema.tsx and FAQSchema.tsx.
 */
const ItemListSchema = ({ name, description, url, items }: ItemListSchemaProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': name,
      'description': description,
      'url': url,
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Service',
          'name': item.name,
          'url': item.url,
          ...(item.description ? { 'description': item.description } : {}),
          'provider': {
            '@type': 'RoofingContractor',
            'name': 'Stark Roofing & Renovation',
            'url': 'https://starkroofingrenovation.com',
          },
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-itemlist-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [name, description, url, items]);

  return null;
};

export default ItemListSchema;
