
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactFormSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div 
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Get in Touch</h2>
                <p className="text-charcoal/80">
                  Fill out the form below and one of our team members will reach out to you shortly.
                </p>
              </div>
              
              <ContactForm />
            </motion.div>
            
            {/* Business Info */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Here's What Happens After You Hit Send
                </h2>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  We're a small Sammamish team, not a national call-center franchise.
                  Every form, call, and text is read personally by Lilian or Mayara —
                  usually within minutes during office hours.
                </p>
              </div>

              {/* Three customer promises */}
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-stark-red/10 p-3 rounded-full mb-4 flex-shrink-0">
                    <span className="block w-6 h-6 text-stark-red font-bold text-center leading-6">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-navy">
                      We text you back within minutes
                    </h3>
                    <p className="text-charcoal/75 text-sm leading-relaxed">
                      During office hours we reply faster than email — usually in under
                      15 minutes. After hours, we get to you first thing the next morning.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-stark-red/10 p-3 rounded-full mb-4 flex-shrink-0">
                    <span className="block w-6 h-6 text-stark-red font-bold text-center leading-6">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-navy">
                      Free in-home estimate, no high-pressure pitch
                    </h3>
                    <p className="text-charcoal/75 text-sm leading-relaxed">
                      We come measure, take photos, and email you a written quote —
                      usually the same day. No pressure, no door-to-door tactics, no
                      "today-only" deals.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-stark-red/10 p-3 rounded-full mb-4 flex-shrink-0">
                    <span className="block w-6 h-6 text-stark-red font-bold text-center leading-6">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-navy">
                      Your info stays here
                    </h3>
                    <p className="text-charcoal/75 text-sm leading-relaxed">
                      We never sell or share your phone or email with lead generators.
                      Used only to confirm your appointment and your project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compact contact details strip */}
              <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <a
                  href="tel:+12067398232"
                  className="flex flex-col items-center text-center gap-2 hover:text-stark-red transition-colors"
                >
                  <Phone className="w-6 h-6 text-stark-red flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-navy">Call or Text</div>
                    <div className="text-charcoal/70">(206) 739-8232</div>
                  </div>
                </a>
                <div className="flex flex-col items-center text-center gap-2">
                  <Clock className="w-6 h-6 text-stark-red flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-navy">Office Hours</div>
                    <div className="text-charcoal/70">Mon–Fri 7a–7p · Sat 8a–4p</div>
                    <div className="text-charcoal/60 text-xs mt-0.5">Emergency line 24/7</div>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=24243+SE+43rd+Ct,+Sammamish,+WA+98029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-2 hover:text-stark-red transition-colors"
                >
                  <MapPin className="w-6 h-6 text-stark-red flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-navy">HQ</div>
                    <div className="text-charcoal/70">24243 SE 43rd Ct</div>
                    <div className="text-charcoal/70">Sammamish, WA 98029</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
