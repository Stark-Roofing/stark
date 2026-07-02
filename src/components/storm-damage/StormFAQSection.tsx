
import React from 'react';
import StormFAQItem from './StormFAQItem';
import FAQSchema from '@/components/shared/FAQSchema';

const StormFAQSection = () => {
  const faqItems = [
    {
      question: "A tree just fell on my roof — what do I do right now?",
      answer: "Step 1: get everyone out of the affected room and stay clear of any sagging ceilings. Step 2: don't try to remove the tree yourself — that often makes the hole bigger. Step 3: call us at (206) 739-8232 and we'll get a tarp on it the same day, then start documenting everything for your insurance claim. We don't charge for the emergency tarp-up on jobs we end up fixing."
    },
    {
      question: "Does Washington really get enough storm damage to need a specialist?",
      answer: "Hail is rare here, but our windstorms aren't. Bomb cyclones and atmospheric rivers regularly push 50–70+ MPH gusts through the Puget Sound, and we have a LOT of tall, shallow-rooted Douglas fir, hemlock, and cedar. Every winter we get hundreds of trees down on roofs across King and Snohomish counties — plus countless cases of lifted shingles, ridge damage, and ice-dam leaks. We've been fixing it for 30+ years."
    },
    {
      question: "Will my insurance cover wind and tree damage to my roof?",
      answer: "Yes — wind, falling-tree, and storm damage are covered by virtually every standard Washington homeowner's policy, subject to your deductible. The catch is documentation. Insurance companies look for any reason to deny or underpay, which is why we photograph everything, write the detailed scope, and meet your adjuster on the roof. We handle the whole claims process end-to-end for you."
    },
    {
      question: "How much does storm damage roof repair cost in Seattle?",
      answer: "It depends on the scope — anywhere from a few hundred dollars for replacing torn shingles up to a full re-roof if a large tree compromised the decking. The important number: on most legitimate storm claims our customers pay nothing beyond their deductible. We provide free storm damage inspections and walk you through the claim. Call (206) 739-8232."
    },
    {
      question: "How long does storm damage repair typically take?",
      answer: "Emergency tarping happens the same day or next morning. Permanent repairs and full replacements usually take 1–3 days on the roof once materials are on site and the insurance approval is in. We prioritize emergencies — if water is actively coming into your home, we drop everything."
    },
    {
      question: "Can I stay in my home during roof repairs?",
      answer: "In almost every case, yes. Re-roofing is noisy but the work happens above you. The only exception is when a tree has compromised structure inside the home and the framers need to open up ceilings — in that case we'll talk through whether a hotel is safer for a few days."
    },
    {
      question: "What if I wait — is it really that urgent?",
      answer: "In Western Washington, yes. A small puncture or lifted shingle area that you 'don't want to deal with right now' meets the next atmospheric river and turns into soaked insulation, mold inside the wall cavity, and rotted decking — all of which cost dramatically more than the original repair. Most insurance policies also have time limits for filing storm claims, so the meter is running on coverage too."
    },
    {
      question: "Do you help file insurance claims for storm damage?",
      answer: "Absolutely — this is most of what we do on the storm side. We handle the entire process: free inspection, photo documentation, written scope, meeting your adjuster on-site, and negotiating fair coverage. Our team has extensive experience working with every major insurance carrier in Washington State. Call (206) 739-8232 to get started."
    },
    {
      question: "What areas do you serve for emergency storm damage repair?",
      answer: "We provide emergency storm damage roof repair across the entire Puget Sound region, including Seattle, Bellevue, Redmond, Kirkland, Sammamish, Issaquah, Tacoma, Everett, Bothell, Lynnwood, and surrounding communities throughout King, Snohomish, and Pierce counties."
    },
    {
      question: "How do I prepare my roof for fall storm season?",
      answer: "Four things before the October storms arrive: clean the gutters and downspouts so water has somewhere to go, trim branches hanging within 10 feet of the roof (that's where most tree damage starts), get moss treated before it lifts shingle edges, and have any 'small' issues from last winter — a lifted shingle, a stained ceiling corner — actually fixed. A pre-season inspection in August or September costs nothing with us and beats a November emergency call every time."
    },
    {
      question: "When is the best time to schedule a storm-readiness inspection?",
      answer: "Late summer, ideally August through early October, before the first big windstorm of the season. The roof is dry, repairs can be scheduled without weather delays, and anything we find gets fixed while contractors still have open calendars. After the first bomb cyclone of the year, every roofer in King County is booked on emergencies — and you'll be in line behind the active leaks."
    }
  ];

  return (
    <section className="section-padding">
      <FAQSchema faqs={faqItems} />
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title text-center">Storm Damage FAQ</h2>
        <p className="section-subtitle text-center">
          Common questions about storm damage, insurance claims, and repairs.
        </p>

        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          {faqItems.map((item, index) => (
            <StormFAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StormFAQSection;
