
import React, { useState } from 'react';
import { CircleCheck, Search, Droplets, Sprout, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const containerRef = useScrollReveal<HTMLDivElement>();
  
  const steps = [
    {
      number: 1,
      icon: <Search size={48} strokeWidth={1.5} className="text-stark-red" />,
      title: "Thorough Inspection",
      description: "We begin with a comprehensive roof assessment to identify problem areas and determine the best cleaning approach for your specific roof type. Our experts carefully evaluate the extent of algae, moss, and debris buildup to create a targeted cleaning plan that will be most effective for your situation."
    },
    {
      number: 2,
      icon: <Droplets size={48} strokeWidth={1.5} className="text-stark-red" />,
      title: "Customized Cleaning",
      description: "Using specialized equipment and eco-friendly solutions, we carefully remove algae, moss, lichens, and debris without damaging your roofing materials. Our low-pressure washing techniques are specifically designed to be effective while preserving the integrity of all roof types, including asphalt shingles, tile, and metal."
    },
    {
      number: 3,
      icon: <Sprout size={48} strokeWidth={1.5} className="text-stark-red" />,
      title: "Preventative Treatment",
      description: "After cleaning, we apply preventative treatments that inhibit future growth of moss and algae, extending the cleanliness of your roof. Our specialized treatment creates an environment that discourages organic growth while being safe for your home, family, pets, and surrounding landscape."
    },
    {
      number: 4,
      icon: <CircleCheck size={48} strokeWidth={1.5} className="text-stark-red" />,
      title: "Final Inspection",
      description: "We conduct a thorough final inspection, clean all gutters of debris, and ensure your property is left in pristine condition. This includes a complete cleanup of your yard and surrounding areas to remove any cleaning residue or debris that may have been dislodged during the cleaning process."
    }
  ];

  const handleStepClick = (stepNumber: number) => {
    if (activeStep === stepNumber) {
      setActiveStep(null);
    } else {
      setActiveStep(stepNumber);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const advantages = [
    "Low-pressure washing techniques that won't damage shingles",
    "Eco-friendly cleaning solutions safe for your family and landscaping",
    "Specially trained technicians with extensive roof knowledge",
    "Comprehensive surface treatment to prevent regrowth",
    "Protection of gutters and downspouts during the cleaning process",
    "Thorough cleanup of your property after service completion"
  ];

  return (
    <section id="process" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stark-red">
            Our Process Makes It Easy!
          </h2>
          <p className="text-charcoal/80 max-w-3xl mx-auto text-lg">
            Our methodical approach ensures thorough cleaning while protecting your roof's integrity and your property.
          </p>
        </motion.div>
        
        {/* Horizontal process-steps-container */}
        <div className="process-steps-container flex flex-nowrap overflow-x-auto pb-4 md:flex-row md:justify-center md:overflow-visible">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`process-step-box flex-shrink-0 w-[280px] mx-2 ${activeStep === step.number ? 'active' : ''}`}
              onClick={() => handleStepClick(step.number)}
              role="button"
              tabIndex={0}
              aria-expanded={activeStep === step.number}
            >
              <div className="process-step-header">
                <div className="process-step-number">STEP {step.number}</div>
                <motion.div 
                  className="process-step-icon"
                  animate={{ rotate: activeStep === step.number ? 360 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="process-step-title">{step.title}</h3>
                <div className="process-step-arrow">
                  <ChevronDown 
                    className={`h-5 w-5 text-stark-red transition-transform duration-300 ${activeStep === step.number ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>
              
              <AnimatePresence>
                {activeStep === step.number && (
                  <motion.div 
                    className="process-step-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="process-step-description">{step.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-lg border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-navy mb-6 text-center">
            What Sets Our Cleaning Process Apart
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Check className="w-5 h-5 text-stark-red mr-2 mt-1 flex-shrink-0 animate-pulse-glow" />
                <p className="text-charcoal/80">{advantage}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
