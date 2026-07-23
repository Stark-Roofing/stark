
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'framer-motion';

const ShowcaseSection = () => {
  // Simple scroll handler instead of using react-scroll
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#990000",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <section ref={ref} className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Side - Image */}
          <motion.div
            className="relative h-[480px] md:h-[620px] rounded-xl overflow-hidden shadow-xl"
            variants={imageVariants}
            whileHover="hover"
          >
            <img src="/lovable-uploads/18624d89-3e82-4389-8d1d-52760eee1b6f.webp" alt="Modern home with metal roof overlooking mountain vista" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
              <motion.span 
                className="text-white font-medium text-sm uppercase tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Premium Installations
              </motion.span>
              <motion.h3 
                className="text-white text-xl md:text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Quality That Lasts Generations
              </motion.h3>
            </div>
          </motion.div>
          
          {/* Right Side - Text and CTA */}
          <motion.div
            className="flex flex-col space-y-6 text-center md:text-left"
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center md:text-left"
              variants={itemVariants}
            >
              <span className="text-slate-950">Transforming Houses,</span> <span className="text-stark-red">Creating Homes</span>
            </motion.h2>

            <motion.p
              className="text-gray-700 text-lg text-center md:text-left leading-relaxed"
              variants={itemVariants}
            >
              We all know a house is just a building, but your home is so much more. It's a place that reflects your personality, where your family gathers, your kids and grandkids make memories, and where life's moments unfold. That's why we don't just build — we create exteriors that stand the test of time.
            </motion.p>

            <motion.p
              className="text-gray-700 text-center md:text-left leading-relaxed"
              variants={itemVariants}
            >
              At Stark Renovation, we take pride in our work by investing in both our team and the materials we use. Our highly trained crews ensure top-tier craftsmanship, while our use of premium materials, including custom-made, in-house gutters, and our trusted partnerships with industry leaders like GAF and Certainteed, guarantee your home is built to last for generations.
            </motion.p>

            <motion.p
              className="text-gray-700 font-medium text-center md:text-left leading-relaxed"
              variants={itemVariants}
            >
              And with our industry-leading warranties, you can rest easy knowing your home is protected every step of the way.
            </motion.p>

            <motion.div
              className="pt-4 self-center md:self-start"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <button
                onClick={scrollToContact}
                className="bg-stark-red text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg btn-animated"
              >
                Let's Begin <ArrowRight className="ml-1" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
