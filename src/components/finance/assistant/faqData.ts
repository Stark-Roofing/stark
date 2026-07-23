
export const faqResponses = {
  "storm damage": "We handle wind, hail, and debris damage. <a href='/storm-damage'>See examples</a> or schedule a free inspection.",
  "how much": "Roof replacements start at $8,500. For exact pricing, we'll need your roof size.",
  "emergency": "We offer 24/7 emergency services. Our team can be on-site within 2 hours in most cases.",
  "timeline": "Most residential roof replacements take 1-2 days. Complex projects may take up to a week.",
  "financing": "We offer flexible financing with competitive rates and programs for all credit profiles. <a href='/finance'>Learn more</a>.",
  "warranty": "Our workmanship is backed by a 10-year warranty. Materials have 25-50 year manufacturer warranties depending on your selection.",
  "service areas": "We service all of King, Pierce, and Snohomish counties including Seattle, Tacoma, Bellevue, and Everett.",
  "free estimate": "Yes! Our estimates are always free and include a thorough inspection of your property.",
  "insurance": "We work directly with all major insurance companies and can help with your claim process.",
  "materials": "We offer premium shingle brands like GAF, Malarkey, and CertainTeed, plus metal roofing options."
};

export const scrollPrompts = [{
  id: 'welcome',
  threshold: 25,
  message: "👋 First time here? StarkBot can answer questions in 10 seconds.",
  duration: 5000
}, {
  id: 'storm',
  threshold: 50,
  message: "Washington storm season is here. Get a free damage inspection →",
  link: "/contact",
  actionText: "Schedule Now"
}, {
  id: 'testimonials',
  threshold: 75,
  message: "Get a free, no-obligation quote from our team.",
  link: "/contact",
  actionText: "Free Quote"
}];
