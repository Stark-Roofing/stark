
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Shield from '@/components/Shield';
import Logo from '@/components/Logo';
import { Card, CardContent } from '@/components/ui/card';

const WarrantyOverview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center mb-4">
            <Shield className="text-stark-red mr-2" size={24} />
            <span className="text-navy font-medium">Industry-Leading Protection</span>
          </div>
          
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">
            25-Year Labor Warranty
          </h2>
          
          <p className="text-charcoal/80 max-w-3xl mx-auto mb-4">
            Here is the short answer: every roof Stark Roofing & Renovation installs comes with a 25-year labor
            warranty — fully transferable, with no proration. And because we are a GAF Master Elite contractor
            (top 2% of roofers nationwide), we can register your roof for the GAF Golden Pledge warranty, which
            covers materials for up to 50 years.
          </p>
          <p className="text-charcoal/80 max-w-3xl mx-auto">
            At Stark Roofing & Renovation, we stand behind our work with one of the strongest warranties in the industry.
            Our 25-year labor warranty covers all aspects of our workmanship, giving you complete peace of mind.
          </p>
        </div>
        
        {/* Warranty Comparison */}
        <div className="mb-12">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-xl text-navy mb-4 text-center">How Our Warranty Compares</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-center text-navy font-medium border-b w-1/3">Warranty Feature</th>
                      <th className="px-4 py-3 text-center text-navy font-medium border-b w-1/3">Competitors</th>
                      <th className="px-4 py-3 text-center text-stark-red font-medium border-b w-1/3">Stark Roofing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b text-center">Labor Coverage</td>
                      <td className="px-4 py-3 border-b text-center">1-10 Years</td>
                      <td className="px-4 py-3 border-b text-center font-bold text-stark-red">25 Years</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b text-center">Transferable to New Owner</td>
                      <td className="px-4 py-3 border-b text-center">Sometimes</td>
                      <td className="px-4 py-3 border-b text-center font-bold text-stark-red">Yes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b text-center">Proration</td>
                      <td className="px-4 py-3 border-b text-center">Typically After 5 Years</td>
                      <td className="px-4 py-3 border-b text-center font-bold text-stark-red">No Proration</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b text-center">Coverage For All Components</td>
                      <td className="px-4 py-3 border-b text-center">Partial</td>
                      <td className="px-4 py-3 border-b text-center font-bold text-stark-red">Complete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-charcoal/80 max-w-3xl mx-auto mb-6">
            Combined with GAF's manufacturer warranty on materials, your roof is protected against both material defects 
            and installation issues for decades to come. Choose the warranty package that best fits your needs.
          </p>
          
          <div className="flex justify-center">
            <div className="bg-navy/5 inline-block rounded-lg p-5 border border-navy/10 text-left">
              <h3 className="font-heading font-bold text-navy mb-2">Why our warranty matters:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span className="ml-2">Fully transferable if you sell your home</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span className="ml-2">No prorating - 100% coverage for the full term</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span className="ml-2">Backed by our longstanding reputation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span className="ml-2">Covers all components of your roofing system</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantyOverview;
