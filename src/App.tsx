
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';

// Home page loads eagerly (most common entry point)
import Index from './pages/Index';
import PageTransition from './components/PageTransition';
import { useEntranceAnimations } from './hooks/useEntranceAnimations';
import { initPhoneTracking } from './utils/phoneTracking';

// Everything else is code-split
const Services = lazy(() => import('./pages/Services'));
const RoofReplacement = lazy(() => import('./pages/RoofReplacement'));
const RoofRepair = lazy(() => import('./pages/RoofRepair'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Finance = lazy(() => import('./pages/Finance'));
const GutterReplacement = lazy(() => import('./pages/GutterReplacement'));
const GutterRepair = lazy(() => import('./pages/GutterRepair'));
const Skylights = lazy(() => import('./pages/Skylights'));
const VeluxLineup = lazy(() => import('./pages/VeluxLineup'));
const SidingInstallation = lazy(() => import('./pages/SidingInstallation'));
const CommercialRoofing = lazy(() => import('./pages/CommercialRoofing'));
const RoofCleaning = lazy(() => import('./pages/RoofCleaning'));
const StormDamage = lazy(() => import('./pages/StormDamage'));
const Warranty = lazy(() => import('./pages/Warranty'));
const WindowReplacement = lazy(() => import('./pages/WindowReplacement'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const TPORoofing = lazy(() => import('./pages/TPORoofing'));
const MetalRoofing = lazy(() => import('./pages/MetalRoofing'));
const AsphaltShingles = lazy(() => import('./pages/AsphaltShingles'));
const Seattle = lazy(() => import('./pages/Seattle'));
const Lynnwood = lazy(() => import('./pages/Lynnwood'));
const Bothell = lazy(() => import('./pages/Bothell'));
const Redmond = lazy(() => import('./pages/Redmond'));
const Kirkland = lazy(() => import('./pages/Kirkland'));
const Everett = lazy(() => import('./pages/Everett'));
const Tacoma = lazy(() => import('./pages/Tacoma'));
const Sammamish = lazy(() => import('./pages/Sammamish'));
const Bellevue = lazy(() => import('./pages/Bellevue'));
const Issaquah = lazy(() => import('./pages/Issaquah'));
const Woodinville = lazy(() => import('./pages/Woodinville'));
const Renton = lazy(() => import('./pages/Renton'));
const MapleValley = lazy(() => import('./pages/MapleValley'));
const BeforeAfter = lazy(() => import('./pages/BeforeAfter'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const AdminHero = lazy(() => import('./pages/AdminHero'));
const RoofReplacementAd = lazy(() => import('./pages/ads/RoofReplacementAd'));
const RoofRepairAd = lazy(() => import('./pages/ads/RoofRepairAd'));
const GuttersAd = lazy(() => import('./pages/ads/GuttersAd'));
const QuoteAd = lazy(() => import('./pages/ads/QuoteAd'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function App() {
  useEntranceAnimations();

  useEffect(() => {
    return initPhoneTracking();
  }, []);

  return (
    <Router>
      <PageTransition>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <div className="w-10 h-10 border-3 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/roof-replacement" element={<RoofReplacement />} />
            <Route path="/roof-repair" element={<RoofRepair />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/gutter-replacement" element={<GutterReplacement />} />
            <Route path="/gutter-repair" element={<GutterRepair />} />
            <Route path="/skylights" element={<Skylights />} />
            <Route path="/skylights/velux-lineup" element={<VeluxLineup />} />
            <Route path="/siding-installation" element={<SidingInstallation />} />
            <Route path="/commercial-roofing" element={<CommercialRoofing />} />

            {/* Canonical location/service area routes */}
            <Route path="/service-area/sammamish" element={<Sammamish />} />
            <Route path="/service-area/seattle" element={<Seattle />} />
            <Route path="/service-area/lynnwood" element={<Lynnwood />} />
            <Route path="/service-area/bothell" element={<Bothell />} />
            <Route path="/service-area/redmond" element={<Redmond />} />
            <Route path="/service-area/kirkland" element={<Kirkland />} />
            <Route path="/service-area/everett" element={<Everett />} />
            <Route path="/service-area/tacoma" element={<Tacoma />} />
            <Route path="/service-area/bellevue" element={<Bellevue />} />
            <Route path="/service-area/issaquah" element={<Issaquah />} />
            <Route path="/service-area/woodinville" element={<Woodinville />} />
            <Route path="/service-area/renton" element={<Renton />} />
            <Route path="/service-area/maple-valley" element={<MapleValley />} />

            {/* Short city URLs — redirect to canonical /service-area/ paths */}
            <Route path="/seattle" element={<Navigate to="/service-area/seattle" replace />} />
            <Route path="/bellevue" element={<Navigate to="/service-area/bellevue" replace />} />
            <Route path="/redmond" element={<Navigate to="/service-area/redmond" replace />} />
            <Route path="/kirkland" element={<Navigate to="/service-area/kirkland" replace />} />
            <Route path="/sammamish" element={<Navigate to="/service-area/sammamish" replace />} />
            <Route path="/issaquah" element={<Navigate to="/service-area/issaquah" replace />} />
            <Route path="/woodinville" element={<Navigate to="/service-area/woodinville" replace />} />
            <Route path="/renton" element={<Navigate to="/service-area/renton" replace />} />
            <Route path="/everett" element={<Navigate to="/service-area/everett" replace />} />
            <Route path="/lynnwood" element={<Navigate to="/service-area/lynnwood" replace />} />
            <Route path="/bothell" element={<Navigate to="/service-area/bothell" replace />} />
            <Route path="/tacoma" element={<Navigate to="/service-area/tacoma" replace />} />
            <Route path="/maple-valley" element={<Navigate to="/service-area/maple-valley" replace />} />

            <Route path="/roof-cleaning" element={<RoofCleaning />} />
            <Route path="/storm-damage" element={<StormDamage />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/window-replacement" element={<WindowReplacement />} />

            <Route path="/tpo-roofing" element={<TPORoofing />} />
            <Route path="/metal-roofing" element={<MetalRoofing />} />
            <Route path="/asphalt-shingles" element={<AsphaltShingles />} />

            <Route path="/our-projects" element={<BeforeAfter />} />
            <Route path="/before-after" element={<BeforeAfter />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/thank-you" element={<ThankYou />} />

            {/* Ad landing pages — stripped-down, conversion-focused */}
            <Route path="/ads" element={<QuoteAd />} />
            <Route path="/ads/roof-replacement" element={<RoofReplacementAd />} />
            <Route path="/ads/roof-repair" element={<RoofRepairAd />} />
            <Route path="/ads/gutters" element={<GuttersAd />} />

            <Route path="/admin/hero" element={<AdminHero />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
