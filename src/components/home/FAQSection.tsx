
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqItems = [
    {
      question: "How much does a new roof cost in Seattle?",
      answer: "Most full asphalt-shingle roof replacements in the Greater Seattle area run between $10,350 and $25,300, depending on home size, roof pitch, tear-off layers, and deck condition. Premium materials like Grand Sequoia or standing-seam metal cost more. We provide free, no-obligation written estimates — no flat-rate phone quotes. Call (206) 739-8232 or request a quote online."
    },
    {
      question: "Do you offer free roof inspections?",
      answer: "Yes — every project starts with a free, thorough roof inspection by our GAF-certified team. We'll assess your roof's condition, document any issues with photos, and provide a detailed written estimate. We serve Seattle, Bellevue, Tacoma, Everett, Redmond, Kirkland, and the entire Puget Sound area."
    },
    {
      question: "What roofing services do you offer?",
      answer: "We offer complete roofing and renovation services including roof replacement, roof repair, storm damage restoration, gutter repair and replacement, roof cleaning, siding installation, skylight installation, window replacement, and commercial roofing. We're your one-stop contractor for the exterior of your home."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes — Stark Roofing & Renovation is fully licensed, bonded, and insured in Washington State. We're also a GAF-certified contractor, which means we meet high standards for installation quality, professionalism, and training."
    },
    {
      question: "Do you offer financing for roofing projects?",
      answer: "Yes, we offer flexible financing options with competitive rates, low monthly payments, and programs for all credit profiles. Most homeowners get approved within minutes with no money down required. Call (206) 739-8232 or visit our financing page to learn more."
    },
    {
      question: "What warranty do you offer?",
      answer: "Every roof replacement includes our 25-year labor warranty — far exceeding the industry average of 1–5 years. As a GAF certified contractor, we also offer enhanced manufacturer warranties. Our warranty is fully transferable if you sell your home."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve the entire Puget Sound region including Seattle, Bellevue, Redmond, Kirkland, Bothell, Lynnwood, Everett, Tacoma, Sammamish, Renton, Kent, Federal Way, Issaquah, Woodinville, and surrounding communities."
    },
    {
      question: "How long does a roof replacement take?",
      answer: "Most residential roof replacements are completed in 1–3 days. A typical 2,000 sq ft home can often be done in a single day. We always confirm the timeline before starting work and keep you informed throughout the process."
    },
    {
      question: "Do you help with insurance claims?",
      answer: "Absolutely. We handle the entire insurance claims process for storm damage — from the initial inspection and documentation to meeting with your adjuster and ensuring fair coverage. Our experience with Washington insurance carriers helps maximize your claim."
    },
    {
      question: "What makes Stark Roofing different from other Seattle roofers?",
      answer: "We're a GAF-certified contractor, we offer a 25-year labor warranty, we provide transparent pricing with no hidden fees, and we handle everything from insurance claims to financing. Our bilingual team and commitment to communication means you're never left guessing about your project."
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal/80 max-w-3xl mx-auto">
            Get answers to common questions about roofing services in the Seattle area.
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

        <div className="mt-12 text-center">
          <p className="text-charcoal/60 mb-4">Still have questions?</p>
          <a href="/contact" className="bg-stark-red hover:bg-stark-redHover text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
