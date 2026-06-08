
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Droplets, AppWindow, Award, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

const ServicesOverviewSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: "Roof Repair",
      icon: <Wrench className="h-10 w-10 text-stark-red" />,
      description: "Expert repairs for leaks, damage, and storm restoration.",
      link: "/roof-repair"
    },
    {
      title: "Premium Gutters Systems",
      icon: <Droplets className="h-10 w-10 text-stark-red" />,
      description: "Seamless gutters with lifetime clog-free leaf protection guarantee.",
      link: "/gutter-replacement"
    },
    {
      title: "Skylights",
      icon: <Sun className="h-10 w-10 text-stark-red" />,
      description: "Energy-efficient skylights to bring natural light into your home.",
      link: "/skylights"
    },
    {
      title: "Custom Windows & Siding",
      icon: <AppWindow className="h-10 w-10 text-stark-red" />,
      description: "Energy-efficient solutions with superior insulation.",
      link: "/window-replacement"
    },
    {
      title: "Luxury Bathrooms",
      icon: <Award className="h-10 w-10 text-stark-red" />,
      description: "Spa-inspired designs with premium fixtures and finishes.",
      link: "/siding-installation"
    }
  ];

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

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="section-subtitle text-center"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Professional roofing and exterior renovation services for your home
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
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
                {service.icon}
              </motion.div>
              <h3 className="text-lg font-heading font-bold text-navy mb-2">{service.title}</h3>
              <p className="text-sm text-charcoal/80">{service.description}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={service.link} 
                  className="mt-4 text-stark-red font-medium text-sm hover:text-navy transition-colors"
                >
                  Learn more
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
