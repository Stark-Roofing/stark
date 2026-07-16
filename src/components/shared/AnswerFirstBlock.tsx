import React from 'react';

interface AnswerFirstBlockProps {
  heading: string;
  answer: string;
}

/**
 * Answer-first block for entity/service pages. Renders the direct answer a
 * searcher (or an AI engine) is looking for at the very top of the page, in
 * plain text so LLM crawlers can extract it. Matches the pattern used on the
 * city/service-area pages.
 */
const AnswerFirstBlock: React.FC<AnswerFirstBlockProps> = ({ heading, answer }) => (
  <section className="bg-gray-50 border-b border-gray-200 py-10 md:py-12">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-4">{heading}</h2>
      <p className="text-lg text-charcoal/80 leading-relaxed">
        <span className="font-semibold text-navy">Here is the short answer:</span> {answer}
      </p>
    </div>
  </section>
);

export default AnswerFirstBlock;
