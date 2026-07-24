import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FAQSchema from '@/components/shared/FAQSchema';

const FAQS = [
  {
    q: 'Will my new skylight leak?',
    a: "Properly installed skylights don't leak — leaks come from bad flashing, not the skylight itself. We use the VELUX flashing kit designed for your exact roof type (composition, metal, tile) and step-flash it the right way. Every install is backed by both the VELUX No Leak warranty and our own workmanship warranty.",
  },
  {
    q: 'Do I need a permit to install a skylight?',
    a: "Most cities in King, Snohomish, and Pierce counties require a permit when you cut a new opening through the roof structure. A simple replacement (same size, same opening) usually doesn't. We handle all the permit paperwork as part of the job — you don't have to chase down your city.",
  },
  {
    q: 'Can you install a skylight in a metal roof?',
    a: "Yes. VELUX makes specific flashing kits for metal, tile, and composition roofs. Metal installs need extra care around the panel seams, but it's a routine job for an experienced crew. We've been doing it in the Pacific Northwest for 30+ years.",
  },
  {
    q: 'How long does the installation take?',
    a: "A straightforward replacement usually takes 4–6 hours. A new install with a drywall light shaft is typically a 1–2 day job. We tell you exactly what to expect during the free estimate so there are no surprises.",
  },
  {
    q: 'Do automatic (solar) skylights need power?',
    a: 'No — that\'s the whole point of the VELUX Solar Powered "Fresh Air" model. A small solar panel on the skylight charges an internal battery, so there\'s no wiring, no electrician, and no holes through your ceiling for cables. The remote control runs on a regular battery.',
  },
  {
    q: 'What happens if it rains while my skylight is open?',
    a: "Every VELUX electric and solar-powered \"Fresh Air\" skylight has a rain sensor built in. The moment a drop hits it, the skylight closes itself — even if you're not home and even if you forgot it was open. It's the feature that sells most homeowners on going automatic.",
  },
  {
    q: 'Will adding a skylight raise my home value?',
    a: "Yes, when done well. Natural light is one of the top features buyers ask about, and a professionally installed VELUX skylight in a kitchen, bathroom, or vaulted living room consistently shows up as a value-add. The key word is \"professionally\" — a DIY install or a leaky one will hurt your value, not help it.",
  },
  {
    q: "What's included in the free estimate?",
    a: "We come to your house, look at the actual spot you want the skylight, measure the framing and roof pitch, recommend the right VELUX model for your space, and give you a written quote that breaks out the product, the labor, the flashing, the permit (if needed), and the warranty. No deposit, no obligation, no high-pressure sales.",
  },
];

const SkylightFAQSection = () => {
  return (
    <section className="section-padding bg-white">
      {/* FAQS uses q/a keys for the accordion; FAQSchema expects question/answer —
          remap keys only, the text itself is untouched. */}
      <FAQSchema faqs={FAQS.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title text-center">Skylight Questions, Answered</h2>
            <p className="section-subtitle text-center">
              Real questions homeowners ask us at the kitchen table. Real answers — no marketing fluff.
            </p>
          </div>

          <Accordion type="single" collapsible className="bg-gray-50 rounded-xl px-6 py-2">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b last:border-b-0">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-navy">
                  <span className="text-left flex-1">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-charcoal/80 text-sm md:text-base leading-relaxed text-left">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SkylightFAQSection;
