
import React from 'react';

const GallerySection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4 text-center">Our Recent Projects</h2>
        <p className="text-charcoal/80 mb-12 max-w-3xl mx-auto text-center">
          Browse through some of our recent roof replacement projects in your area.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-64">
            <img
              loading="lazy" decoding="async" src="/gallery/roof-replacement-after-kirkland-wa.jpg"
              alt="Roof replacement completed in Kirkland WA — GAF certified contractor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-64">
            <img
              loading="lazy" decoding="async" src="/gallery/roof-tearoff-after-woodinville-wa.jpg"
              alt="Roof tear-off and skylight installation in Woodinville WA"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-64">
            <img
              loading="lazy" decoding="async" src="/gallery/residential-roof-after-sammamish-wa.jpg"
              alt="Residential roof replacement in Sammamish WA — drone aerial view"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-64">
            <img
              loading="lazy" decoding="async" src="/gallery/roof-replacement-after-issaquah-wa.jpg"
              alt="Roof replacement with dormer detail in Issaquah WA"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-64">
            <img
              loading="lazy" decoding="async" src="/lovable-uploads/b3d778ed-1ab1-4570-920a-b76c39b66e90.webp"
              alt="Gray house with white trim and asphalt shingle roof"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-64">
            <img
              loading="lazy" decoding="async" src="/lovable-uploads/2c094d9d-a1eb-4c13-b913-f75f4a2530ff.webp"
              alt="Gray shingle roof with dormer window and white trim"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
