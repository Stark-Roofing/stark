import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  getOrCreateExternalId,
  getFbp,
  getFbc,
  savePIIForReuse,
  postLeadToCapiWorker,
} from '@/utils/metaTracking';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Shield,
  Star,
  Award,
  Home,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import { getLeadValue } from '@/utils/tracking';

/**
 * /thank-you — Landing page shown after a customer submits the QuickQuoteForm.
 *
 * Receives appointment details via React Router location state. Falls back to
 * a generic confirmation if the user lands here directly (e.g. from a saved
 * link or page refresh).
 *
 * Design goals:
 *  - Confirm the booking with confidence (mascot + green check)
 *  - Show the exact appointment so they trust the system
 *  - Set expectations for the next 24 hours
 *  - Give them obvious ways to reach us if anything changes
 */
interface ThankYouState {
  name?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  service?: string;
  street?: string;
  city?: string;
  zip?: string;
  email?: string;
  phone?: string;
  /** AdsLeadForm passes this so /thank-you reuses same UUID for Pixel+CAPI dedup. */
  event_id?: string;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const ThankYou: React.FC = () => {
  const location = useLocation();
  const state = (location.state || {}) as ThankYouState;

  useSEOMeta({
    title: "You're Booked! | Stark Roofing & Renovation",
    description:
      "Thanks for booking your free roof inspection with Stark Roofing & Renovation. We'll text you to confirm shortly.",
    canonical: 'https://starkroofingrenovation.com/thank-you',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Central conversion firing — runs for EVERY form on the site that navigates
    // to /thank-you (AdsLeadForm, QuickQuoteForm, ContactForm, etc).
    // Guarded by sessionStorage flag to prevent double-firing on reload.

    // Only fire when we actually received form state. Direct visits, refreshes,
    // and bookmarks land here without state — they MUST NOT count as a Lead.
    // Without this gate, Pixel + Google Ads + GA4 fired phantom conversions
    // while CAPI (correctly) skipped, killing the dedup coverage metric.
    if (!state.email || !state.phone) return;

    try {
      const alreadyFired = sessionStorage.getItem('stark_ty_fired');
      if (alreadyFired) return;
      const value = getLeadValue(state.service);
      const externalId = getOrCreateExternalId();
      // Reuse event_id passed by AdsLeadForm if present (already pushed to
      // dataLayer before navigate). Otherwise generate fresh one here so other
      // forms also get Pixel + CAPI dedup.
      const eventId = (state as { event_id?: string }).event_id || (crypto as Crypto).randomUUID();
      const [firstName, ...rest] = (state.name || '').trim().split(/\s+/);
      const lastName = rest.join(' ');

      // 1) Enhanced Conversions: SET user_data BEFORE the conversion event.
      if (state.email || state.phone) {
        window.gtag?.('set', 'user_data', {
          email: state.email || undefined,
          phone_number: state.phone || undefined,
        });
      }

      // 2) Google Ads conversion (Submit lead form)
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-17475363009/I9C_CKq9jpscEMHB84xB',
        value,
        currency: 'USD',
      });

      // 3) GA4 generate_lead event
      window.gtag?.('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: state.service || 'thank_you_page',
        form_type: 'thank_you',
        value,
      });

      // 4) dataLayer push for GTM Custom HTML tag → fires Meta Pixel Lead with
      // event_id + Advanced Matching params. AdsLeadForm may have pushed this
      // already pre-navigate; pushing again is harmless (GTM Custom Event
      // fires once per dataLayer push).
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submit',
        event_id: eventId,
        lead_value: value,
        currency: 'USD',
        service: state.service,
        am_em: state.email?.trim().toLowerCase(),
        am_ph: state.phone?.replace(/\D/g, ''),
        am_fn: firstName?.toLowerCase(),
        am_ln: lastName?.toLowerCase(),
        am_zp: state.zip,
        am_country: 'us',
        am_external_id: externalId,
      });

      // 5) CAPI server-side via Vant Worker — best-effort, non-blocking.
      // Persist PII so later tel: clicks from same visitor can attach it to
      // Contact CAPI (lifts EMQ on otherwise-anonymous phone clicks).
      savePIIForReuse({
        email: state.email,
        phone: state.phone,
        first_name: firstName,
        last_name: lastName,
        zip: state.zip,
      });

      postLeadToCapiWorker({
        event_id: eventId,
        event_source_url: window.location.href,
        external_id: externalId,
        email: state.email,
        phone: state.phone,
        first_name: firstName,
        last_name: lastName,
        zip: state.zip || '',
        value,
        currency: 'USD',
        content_name: state.service || 'Lead Form',
        content_category: 'website_form',
        country: 'us',
        fbp: getFbp(),
        fbc: getFbc(),
      });

      sessionStorage.setItem('stark_ty_fired', '1');
    } catch (e) {
      console.warn('ThankYou tracking error:', e);
    }
  }, []);

  const firstName = state.name?.split(' ')[0] || 'there';
  const hasAppointment = !!(state.appointmentDate && state.appointmentTime);
  const fullAddress =
    state.street && state.city
      ? `${state.street}, ${state.city}${state.zip ? ` ${state.zip}` : ''}`
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        {/* Soft red glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stark-red/5 via-transparent to-navy/5 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #CC0000 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Mascot with celebration ring */}
            <div className="relative inline-block mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                  type: 'spring',
                  stiffness: 120,
                }}
                className="relative"
              >
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-stark-red/20 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-stark-red/10" />

                {/* Mascot image */}
                <div className="relative bg-white rounded-full p-3 shadow-2xl border-4 border-stark-red/20">
                  <img
                    src="/stark_mascot.png"
                    alt="Stark Roofing mascot"
                    className="w-32 h-32 md:w-40 md:h-40 object-contain"
                  />
                </div>

                {/* Green check badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg border-4 border-white"
                >
                  <CheckCircle2 size={28} className="text-white" />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Booking Confirmed
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-navy mb-3">
                You're booked, {firstName}!
              </h1>
              <p className="text-lg md:text-xl text-charcoal/75 max-w-xl mx-auto">
                Thanks for trusting Stark Roofing & Renovation. We'll text you
                shortly to confirm — usually within minutes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── APPOINTMENT CARD ────────────────────────────────── */}
      <section className="pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {hasAppointment ? (
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <div className="bg-navy px-6 py-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">
                    Your Appointment
                  </p>
                  <p className="text-white text-sm">
                    Save this — we'll also send a text reminder
                  </p>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                  {/* Date */}
                  <div className="flex items-start gap-4">
                    <div className="bg-stark-red/10 text-stark-red rounded-lg p-3 flex-shrink-0">
                      <Calendar size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-0.5">
                        Date
                      </p>
                      <p className="text-navy font-semibold text-lg">
                        {state.appointmentDate}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Time */}
                  <div className="flex items-start gap-4">
                    <div className="bg-stark-red/10 text-stark-red rounded-lg p-3 flex-shrink-0">
                      <Clock size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-0.5">
                        Time
                      </p>
                      <p className="text-navy font-semibold text-lg">
                        {state.appointmentTime}
                      </p>
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        Plan for about 30 minutes on-site
                      </p>
                    </div>
                  </div>

                  {fullAddress && (
                    <>
                      <div className="border-t border-gray-100" />
                      <div className="flex items-start gap-4">
                        <div className="bg-stark-red/10 text-stark-red rounded-lg p-3 flex-shrink-0">
                          <MapPin size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-0.5">
                            Address
                          </p>
                          <p className="text-navy font-semibold">{fullAddress}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {state.service && (
                    <>
                      <div className="border-t border-gray-100" />
                      <div className="flex items-start gap-4">
                        <div className="bg-stark-red/10 text-stark-red rounded-lg p-3 flex-shrink-0">
                          <Home size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs uppercase tracking-wide text-charcoal/60 font-semibold mb-0.5">
                            Service
                          </p>
                          <p className="text-navy font-semibold">{state.service}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              // Fallback when someone hits /thank-you without state
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <p className="text-charcoal/80 text-lg">
                  Your request has been received. Someone from our team will
                  reach out within one business day.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ───────────────────────────────── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-2">
                What happens next?
              </h2>
              <p className="text-charcoal/70">
                No surprises. Here's exactly what to expect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: '1',
                  icon: MessageSquare,
                  title: 'Text confirmation',
                  body: "Within minutes, you'll get a text from our office confirming your appointment. Reply STOP anytime.",
                },
                {
                  num: '2',
                  icon: Calendar,
                  title: 'Day-of reminder',
                  body: "The morning of your visit, we'll text you a heads-up with the technician's name and ETA.",
                },
                {
                  num: '3',
                  icon: CheckCircle2,
                  title: 'Free written quote',
                  body: 'After the inspection, we email you photos and a clear written quote — no high-pressure pitch.',
                },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative bg-gray-50 rounded-xl p-6 border border-gray-100 text-center"
                  >
                    <div className="w-9 h-9 rounded-full bg-stark-red text-white font-bold flex items-center justify-center shadow-md mx-auto mb-3 md:mb-0 md:absolute md:-top-3 md:-left-3">
                      {step.num}
                    </div>
                    <div className="bg-stark-red/10 text-stark-red rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto md:mt-2">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed">
                      {step.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── REACH US ────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-8 md:p-10 text-center text-white shadow-xl">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                Need to change something?
              </h3>
              <p className="text-white/80 mb-6">
                Reschedule, ask a question, or just say hi — we're here.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+12067398232"
                  className="inline-flex items-center justify-center gap-2 bg-stark-red hover:bg-stark-red/90 text-white font-semibold px-6 py-4 rounded-xl transition-colors shadow-lg"
                >
                  <Phone size={18} />
                  (206) 739-8232
                </a>
                <a
                  href="mailto:office@starkroofingrenovation.com"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-4 rounded-xl transition-colors border border-white/20"
                >
                  <Mail size={18} />
                  Email us
                </a>
              </div>

              <p className="text-xs text-white/60 mt-5">
                Office hours: Mon–Fri 8am–6pm · Sat 9am–3pm
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-charcoal/70">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-stark-red" />
                <span className="font-semibold text-sm">GAF Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-stark-red" />
                <span className="font-semibold text-sm">30+ Years</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-stark-red fill-stark-red" />
                <span className="font-semibold text-sm">2,000+ Roofs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-stark-red" />
                <span className="font-semibold text-sm">Licensed & Bonded WA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK HOME ───────────────────────────────────────── */}
      <section className="py-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-charcoal/70 hover:text-stark-red font-medium transition-colors"
        >
          <ArrowRight size={16} className="rotate-180" />
          Back to homepage
        </Link>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default ThankYou;
