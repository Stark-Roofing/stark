
import React from 'react';
import { Leaf, ShieldCheck, Flower2, Home, DollarSign, Clock } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Leaf className="w-10 h-10 text-stark-red" />,
      title: "Prevents Damaging Growth",
      description: "Removes moss, algae, and lichen that can deteriorate roofing materials and lift shingles."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-stark-red" />,
      title: "Extends Roof Lifespan",
      description: "Regular cleaning can add years to your roof's life by preventing damage from organic growth and debris buildup."
    },
    {
      icon: <Home className="w-10 h-10 text-stark-red" />,
      title: "Improves Curb Appeal",
      description: "Dramatically enhances your home's appearance by removing unsightly stains, streaks, and discoloration."
    },
    {
      icon: <Flower2 className="w-10 h-10 text-stark-red" />,
      title: "Eco-Friendly Options",
      description: "Our low-pressure washing and environmentally safe cleaning solutions protect your landscaping."
    },
    {
      icon: <DollarSign className="w-10 h-10 text-stark-red" />,
      title: "Saves Money Long-Term",
      description: "Less expensive than roof replacement and helps maintain your home's value and energy efficiency."
    },
    {
      icon: <Clock className="w-10 h-10 text-stark-red" />,
      title: "Quick Transformation",
      description: "Most roof cleaning projects can be completed in just one day with immediately visible results."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Benefits of Professional Roof Cleaning
          </h2>
          <p className="text-charcoal/80 max-w-3xl mx-auto">
            Regular roof cleaning does more than just improve your home's appearance. It's an investment in your property's longevity and value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">{benefit.title}</h3>
              <p className="text-charcoal/80 flex-grow">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
