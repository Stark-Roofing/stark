
import React from 'react';
import { Wrench, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const CoreValues = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  const values = [
    {
      icon: <Wrench className="h-10 w-10 text-stark-red" />,
      title: "Quality Craftsmanship",
      description: "We never cut corners. Every project is completed with precision and attention to detail, using only premium materials and proven techniques."
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-stark-red" />,
      title: "Integrity & Transparency",
      description: "We provide honest assessments and clear communication throughout your project. No hidden fees, no surprise costs – just straightforward service you can trust."
    },
    {
      icon: <Users className="h-10 w-10 text-stark-red" />,
      title: "Customer Satisfaction",
      description: "Your satisfaction is our top priority. We're not finished until you're completely happy with the results of your roofing or renovation project."
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl font-heading font-bold text-navy mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              className="glass-card p-6 text-center flex flex-col items-center justify-start h-full"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-lg font-heading font-bold text-stark-red mb-2">
                {value.title}
              </h3>
              <p className="text-charcoal/80">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;
