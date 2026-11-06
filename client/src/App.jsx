import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HeaderBranding from './components/HeaderBranding';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCMS } from './context/CMSContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GoverningBoardPage from './pages/GoverningBoardPage';
import PersonnelPage from './pages/PersonnelPage';
import QualityPolicyPage from './pages/QualityPolicyPage';
import AccreditationPage from './pages/AccreditationPage';
import CertificationWorkflowPage from './pages/CertificationWorkflowPage';
import FeeScheduleQRPage from './pages/FeeScheduleQRPage';
import StandardsPage from './pages/StandardsPage';
import OperatorRegistryPage from './pages/OperatorRegistryPage';
import DownloadCenterPage from './pages/DownloadCenterPage';
import PhotosPage from './pages/PhotosPage';
import VideosPage from './pages/VideosPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import CMSAdminPage from './pages/CMSAdminPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { notification } = useCMS();
  const location = useLocation();
  const isCmsRoute = location.pathname.startsWith('/cms') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1A2520]">
      <ScrollToTop />
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest-950 text-white px-5 py-3 rounded-xl shadow-2xl border border-ochre-400/40 flex items-center gap-3 text-xs sm:text-sm animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <span>{notification.message}</span>
        </div>
      )}

      {/* 1. Header Branding Bar (Public Pages Only) */}
      {!isCmsRoute && <HeaderBranding />}

      {/* 2. Dedicated Navbar Row (Public Pages Only - CMS Removed from Navbar) */}
      {!isCmsRoute && <Navbar />}

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/governing-board" element={<GoverningBoardPage />} />
          <Route path="/personnel" element={<PersonnelPage />} />
          <Route path="/policy" element={<QualityPolicyPage />} />
          <Route path="/accreditation" element={<AccreditationPage />} />
          <Route path="/certification" element={<CertificationWorkflowPage />} />
          <Route path="/fees-qr" element={<FeeScheduleQRPage />} />
          <Route path="/standards" element={<StandardsPage />} />
          <Route path="/operators/active" element={<OperatorRegistryPage />} />
          <Route path="/operators/farmers" element={<OperatorRegistryPage />} />
          <Route path="/operators/suspended" element={<OperatorRegistryPage />} />
          <Route path="/operators/terminated" element={<OperatorRegistryPage />} />
          <Route path="/operators/discontinued" element={<OperatorRegistryPage />} />
          <Route path="/download" element={<DownloadCenterPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* CMS Admin Separate Screen Routes */}
          <Route path="/cms" element={<CMSAdminPage />} />
          <Route path="/admin" element={<CMSAdminPage />} />
        </Routes>
      </main>

      {/* 5-Column Global Footer (Public Pages Only) */}
      {!isCmsRoute && <Footer />}
    </div>
  );
}

