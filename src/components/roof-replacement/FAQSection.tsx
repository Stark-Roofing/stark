
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FAQSchema from '@/components/shared/FAQSchema';

const FAQSection = () => {
  const faqItems = [
    {
      question: "How much does a roof replacement cost in Seattle?",
      answer: "Roof replacement costs in the Seattle and Puget Sound area depend on the size of your home, roof complexity, and materials chosen. Architectural shingles like GAF Timberline HDZ are the most popular option. We provide free estimates with transparent, itemized pricing — no hidden fees. Call (206) 739-8232 for yours."
    },
    {
      question: "How long does a roof replacement take?",
      answer: "Most residential roof replacements are completed in 1–3 days, depending on roof size, complexity, and weather. Our crews are efficient and experienced — a typical 2,000 sq ft home can often be done in a single day. We always confirm the timeline before starting."
    },
    {
      question: "What are the best roofing materials for Seattle weather?",
      answer: "For Seattle's rainy climate, we recommend GAF Timberline HDZ architectural shingles — they offer excellent wind resistance (up to 130 MPH), algae resistance, and a lifetime limited warranty. For premium durability, metal roofing and CertainTeed or Malarkey shingles are also great options. We'll help you choose the best material for your home and budget."
    },
    {
      question: "Do you offer free roof replacement estimates?",
      answer: "Yes — we provide free, no-obligation roof inspections and detailed written estimates for every project. Our GAF-certified team will assess your roof's condition, recommend the best solution, and provide transparent pricing. Call (206) 739-8232 or fill out our online form."
    },
    {
      question: "Is roof replacement covered by insurance?",
      answer: "If your roof was damaged by a storm, hail, falling trees, or another event your policy covers, insurance may help with the cost, depending on your policy and deductible. We work directly with insurance companies and handle the entire claims process for you."
    },
    {
      question: "What financing options do you offer for a new roof?",
      answer: "We offer financing through our O Bee Credit Union partnership: loans up to $75,000 with terms up to 120 months and rates starting at 8.24% APR. Most applications get a same-day decision. Visit our financing page or call (206) 739-8232 to learn more."
    },
    {
      question: "How do I know if I need a full replacement vs. repair?",
      answer: "If your roof is over 20 years old, has widespread damage, shows signs of multiple leaks, or you're seeing significant granule loss in your gutters, replacement is usually more cost-effective than ongoing repairs. If the damage is localized and the roof is newer, a repair may be all you need. We'll give you an honest assessment during your free inspection."
    },
    {
      question: "What warranty do you offer on a new roof?",
      answer: "Every roof replacement comes with our 25-year labor warranty — far beyond the industry average of 1–5 years. As a GAF certified contractor, we also offer enhanced GAF manufacturer warranties covering both materials and workmanship. Your warranty is transferable if you sell your home."
    },
    {
      question: "Can I stay home during a roof replacement?",
      answer: "Yes, you can stay in your home during the entire process. It will be noisy, but our crews work quickly and clean up thoroughly each day. We protect your landscaping, driveway, and property throughout the project."
    },
    {
      question: "What areas do you serve for roof replacement?",
      answer: "We serve the entire Puget Sound region including Seattle, Bellevue, Redmond, Kirkland, Tacoma, Everett, Bothell, Lynnwood, Sammamish, Renton, Kent, Federal Way, and surrounding communities. Call (206) 739-8232 for a free estimate."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <FAQSchema faqs={faqItems} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Roof Replacement FAQ
          </h2>
          <p className="text-charcoal/80 max-w-3xl mx-auto">
            Answers to common questions about getting a new roof in the Seattle area.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-100">
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-charcoal/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
