
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BeforeAfterSection = () => {
  const beforeAfterItems = [
    {
      id: 1,
      image: "/lovable-uploads/29b4c032-f49f-42e6-b9c0-4928402b10de.webp",
      description: "Metal roof - Before & After: Left side cleaned, right side with algae and debris"
    },
    {
      id: 2,
      image: "/lovable-uploads/c8fa6b93-fdb3-46dd-b518-de5caa1b7d75.webp",
      description: "Asphalt shingle roof - Before: Heavy moss growth. After: Clean and restored shingles"
    },
    {
      id: 3,
      image: "/lovable-uploads/ff07e81a-24f7-4783-98d4-1e35763ad8b1.webp",
      description: "Residential home - Before: Black streaks and dirt buildup. After: Pristine condition"
    }
  ];

  return (
    <section id="before-after" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center mb-2">Before & After Results</h2>
          <p className="section-subtitle text-center mb-12">
            See the dramatic difference our professional roof cleaning service makes
          </p>

          <div className="max-w-5xl mx-auto">
            <Carousel className="relative">
              <CarouselContent>
                {beforeAfterItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="flex flex-col items-center">
                      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={item.image}
                          alt={item.description}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-4 text-center text-charcoal/80 max-w-3xl mx-auto">
                        {item.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute -left-4 lg:-left-12" />
              <CarouselNext className="absolute -right-4 lg:-right-12" />
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
