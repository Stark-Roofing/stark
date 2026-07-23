
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { OBEE_APPLY_URL } from './obeeConfig';

const PaymentOptionsSection = () => {
  return (
    <section id="payment-options" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title text-center">Payment Options</h2>
        <p className="section-subtitle text-center mb-12">
          Choose the financing plan that works best for you
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-navy p-6 text-white text-center">
              <h3 className="text-2xl font-heading font-bold">Standard Financing</h3>
              <p className="text-white/80 mt-2">For homeowners with good credit</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Terms up to 120 months</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Competitive interest rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>No prepayment penalties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Fixed monthly payments</span>
                </li>
              </ul>
              <a
                href={OBEE_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center py-3 px-4 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors font-medium"
              >
                Apply Now
              </a>
            </div>
          </div>
          
          <div className="border-2 border-stark-red rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
            <div className="absolute top-0 right-0 bg-stark-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="bg-stark-red p-6 text-white text-center">
              <h3 className="text-2xl font-heading font-bold">Low Monthly Payments</h3>
              <p className="text-white/80 mt-2">For qualified homeowners</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>No money down</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Quick approval process</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Competitive rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Flexible payment options</span>
                </li>
              </ul>
              <a
                href={OBEE_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center py-3 px-4 bg-stark-red text-white rounded-md hover:bg-stark-redHover transition-colors font-medium"
              >
                Apply Now
              </a>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-navy p-6 text-white text-center">
              <h3 className="text-2xl font-heading font-bold">FHA Title I Loans</h3>
              <p className="text-white/80 mt-2">Government-backed option</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Loans up to $25,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Terms up to 20 years</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Less stringent credit requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Fixed interest rates</span>
                </li>
              </ul>
              <a
                href={OBEE_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center py-3 px-4 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors font-medium"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptionsSection;
