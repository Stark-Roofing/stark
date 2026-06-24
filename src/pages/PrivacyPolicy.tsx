import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import ScrollToTop from '@/components/ScrollToTop';

const LAST_UPDATED = 'May 13, 2026';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Privacy Policy | Stark Roofing & Renovation',
    description:
      'How Stark Roofing & Renovation collects, uses, and protects the information you share through our website and lead forms.',
    canonical: 'https://starkroofingrenovation.com/privacy-policy',
    keywords: 'privacy policy, Stark Roofing, data protection',
    ogTitle: 'Privacy Policy | Stark Roofing & Renovation',
    ogDescription:
      'How Stark Roofing & Renovation collects, uses, and protects your information.',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F2542] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Stark Roofing &amp; Renovation ("we," "us," or "our") respects your
              privacy. This policy explains what information we collect when you
              use our website or submit a request through one of our forms —
              including lead forms hosted on Facebook or Instagram — and how we
              use and protect it.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Information We Collect
              </h2>
              <p>
                When you contact us or fill out a form, we may collect your name,
                phone number, email address, property address or city, and details
                about the roofing or exterior work you are interested in. If you
                submit a lead form through Facebook or Instagram, we receive the
                contact information and answers you provide on that form. We also
                collect standard technical data — such as IP address, browser type,
                and pages visited — through analytics and advertising tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                How We Use Your Information
              </h2>
              <p>
                We use the information you provide to respond to your inquiry,
                schedule a roof inspection, prepare an estimate, and follow up about
                your project. We may contact you by phone call, text message, or
                email. We do not sell your personal information. We share it only
                with service providers who help us operate our business (for
                example, scheduling, customer-management, or communication tools),
                and only as needed to serve you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Cookies &amp; Advertising
              </h2>
              <p>
                Our website uses cookies and similar technologies through Google Tag
                Manager, Google Analytics, Google Ads, and the Meta (Facebook) Pixel.
                These tools help us understand how visitors use the site and measure
                the performance of our advertising. You can control cookies through
                your browser settings. Advertising platforms may use this data to
                show you relevant ads; you can manage ad personalization in your
                Google and Meta account settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Communication &amp; Consent
              </h2>
              <p>
                By submitting a form or providing your phone number, you consent to
                be contacted by Stark Roofing &amp; Renovation about your request.
                Message frequency varies and message and data rates may apply. You
                can opt out of future communication at any time by replying STOP to a
                text, replying HELP for help, asking us to remove you from our list,
                or contacting us at the email below.
              </p>
              <p className="mt-3 font-semibold">
                We do not sell, rent, or share your mobile phone number or your SMS
                opt-in and consent information with any third parties or affiliates
                for their own marketing or promotional purposes. Text messaging
                originator opt-in data and consent are never shared with anyone.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Data Security
              </h2>
              <p>
                We take reasonable administrative, technical, and physical safeguards
                to protect the information you share with us. Data is transmitted over
                encrypted (HTTPS) connections, stored within reputable
                customer-management and communication platforms, and access is limited
                to authorized team members who need it to serve you. While no method of
                transmission or storage is completely secure, we work to protect your
                information against unauthorized access, loss, or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Data Retention &amp; Your Rights
              </h2>
              <p>
                We keep your information only as long as needed to serve you and to
                meet legal or business requirements. You may request access to,
                correction of, or deletion of your personal information by
                contacting us. We will respond within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Children's Privacy
              </h2>
              <p>
                Our website and services are intended for adults. We do not
                knowingly collect personal information from anyone under 18.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. When we do, we will
                revise the "Last updated" date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">Contact Us</h2>
              <p>
                Questions about this policy or your information? Reach us at:
              </p>
              <p className="mt-2">
                <strong>Stark Roofing &amp; Renovation</strong>
                <br />
                Sammamish, WA
                <br />
                Phone:{' '}
                <a href="tel:12067398232" className="text-[#C8102E] hover:underline">
                  (206) 739-8232
                </a>
                <br />
                Email:{' '}
                <a
                  href="mailto:info@starkroofingrenovation.com"
                  className="text-[#C8102E] hover:underline"
                >
                  info@starkroofingrenovation.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
