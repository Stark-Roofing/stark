import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEOMeta } from '@/hooks/useSEOMeta';
import ScrollToTop from '@/components/ScrollToTop';

const LAST_UPDATED = 'June 22, 2026';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEOMeta({
    title: 'Terms of Service | Stark Roofing & Renovation',
    description:
      'The terms that govern your use of the Stark Roofing & Renovation website, our communications, and the estimates and services we provide.',
    canonical: 'https://starkroofingrenovation.com/terms-of-service',
    keywords: 'terms of service, Stark Roofing, terms and conditions',
    ogTitle: 'Terms of Service | Stark Roofing & Renovation',
    ogDescription:
      'The terms that govern your use of the Stark Roofing & Renovation website and services.',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F2542] mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              These Terms of Service ("Terms") govern your use of the website and
              services of Stark Roofing &amp; Renovation ("we," "us," or "our"). By
              using our website, submitting a form, or contacting us, you agree to
              these Terms. If you do not agree, please do not use our website or
              services.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Our Services
              </h2>
              <p>
                We provide residential and commercial roofing and exterior services,
                including roof replacement, roof repair, gutters, siding, and
                skylights, in the Greater Seattle and Puget Sound area. Information on
                this website is provided for general guidance and does not constitute
                a binding offer or professional advice for your specific property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Estimates &amp; Inspections
              </h2>
              <p>
                Any pricing discussed before an on-site inspection is preliminary. An
                accurate estimate is provided only after we inspect the property. An
                estimate is not a contract; work begins only after a written
                agreement signed by both parties. Estimates are valid for the period
                stated on them and may change if site conditions, scope, or material
                costs differ from what was assumed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Scheduling &amp; Communications
              </h2>
              <p>
                When you submit a form, provide your phone number, or interact with
                our website chat, you agree that we may contact you by phone call,
                text message, or email about your request and the scheduling of your
                inspection or service. Message and data rates may apply, and message
                frequency varies. Consent to receive messages is not a condition of
                purchase. You can opt out of text messages at any time by replying
                STOP, and reply HELP for help. Carriers (including AT&amp;T, T-Mobile,
                Verizon, and others) are not liable for delayed or undelivered
                messages. Our handling of your information is described in our{' '}
                <a href="/privacy-policy" className="text-[#C8102E] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Eligibility
              </h2>
              <p>
                You must be at least 18 years old to use this website, request our
                services, or opt in to receive text messages from us. By using our
                website or providing your phone number, you confirm that you are 18
                years of age or older.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Use of This Website
              </h2>
              <p>
                You agree to use this website only for lawful purposes and not to
                interfere with its operation, attempt unauthorized access, or use it
                in any way that could damage or disrupt our services. All content on
                this site — including text, images, logos, and the Stark Roofing
                &amp; Renovation name — is our property or used with permission and
                may not be copied or reused without our consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                No Warranty on Website Information
              </h2>
              <p>
                Our website is provided "as is." While we work to keep information
                accurate and current, we do not warrant that the content is complete,
                error-free, or up to date. Warranties on completed work, where
                applicable, are governed by your written service agreement and any
                manufacturer warranty, not by this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Stark Roofing &amp;
                Renovation is not liable for any indirect, incidental, or
                consequential damages arising from your use of this website. Nothing
                in these Terms limits liability that cannot be limited under
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the State of Washington,
                without regard to its conflict-of-law rules. Any dispute relating to
                these Terms or our services will be handled in the state or federal
                courts located in Washington.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we do, we will
                revise the "Last updated" date at the top of this page. Your
                continued use of the website after changes are posted means you
                accept the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2542] mb-2">Contact Us</h2>
              <p>Questions about these Terms? Reach us at:</p>
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
                  href="mailto:office@starkroofingrenovation.com"
                  className="text-[#C8102E] hover:underline"
                >
                  office@starkroofingrenovation.com
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

export default TermsOfService;
