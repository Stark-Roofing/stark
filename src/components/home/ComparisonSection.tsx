
import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ComparisonSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title text-center">How We Compare</h2>
        <p className="section-subtitle text-center mb-8 md:mb-12">
          See how Stark Roofing & Renovation stands out from the competition with our commitment to quality and service.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto pb-2">
              <table className="comparison-table w-full">
                <thead>
                  <tr>
                    <th className="w-1/3 py-4 px-3 md:py-5 md:px-6 text-sm md:text-base">Feature</th>
                    <th className="w-1/3 py-4 px-2 md:py-5 md:px-6 text-sm md:text-base text-center">Other Contractors</th>
                    <th className="w-1/3 py-4 px-2 md:py-5 md:px-6 text-sm md:text-base text-center bg-stark-red">Stark Roofing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <td className="font-medium py-3 px-3 md:py-4 md:px-6 border-b text-sm md:text-base">GAF Certification</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <X className="mx-auto text-red-500" size={isMobile ? 16 : 20} />
                    </td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <CheckCircle2 className="mx-auto text-green-500" size={isMobile ? 16 : 20} />
                    </td>
                  </tr>
                  <tr className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <td className="font-medium py-3 px-3 md:py-4 md:px-6 border-b text-sm md:text-base">25-Year Warranty</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <X className="mx-auto text-red-500" size={isMobile ? 16 : 20} />
                    </td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <CheckCircle2 className="mx-auto text-green-500" size={isMobile ? 16 : 20} />
                    </td>
                  </tr>
                  <tr className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <td className="font-medium py-3 px-3 md:py-4 md:px-6 border-b text-sm md:text-base">Insurance Claim Assistance</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b text-sm md:text-base">Sometimes</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <CheckCircle2 className="mx-auto text-green-500" size={isMobile ? 16 : 20} />
                    </td>
                  </tr>
                  <tr className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <td className="font-medium py-3 px-3 md:py-4 md:px-6 border-b text-sm md:text-base">Financing Options</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b text-sm md:text-base">Limited</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <CheckCircle2 className="mx-auto text-green-500" size={isMobile ? 16 : 20} />
                    </td>
                  </tr>
                  <tr className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <td className="font-medium py-3 px-3 md:py-4 md:px-6 border-b text-sm md:text-base">Emergency Services</td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <X className="mx-auto text-red-500" size={isMobile ? 16 : 20} />
                    </td>
                    <td className="text-center py-3 px-2 md:py-4 md:px-6 border-b">
                      <CheckCircle2 className="mx-auto text-green-500" size={isMobile ? 16 : 20} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
