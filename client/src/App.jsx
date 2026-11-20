import React, { useState } from 'react';
import { useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { AboutSection } from './components/AboutSection';
import { CertificationStreams } from './components/CertificationStreams';
import { OperatorRegistryPreview } from './components/OperatorRegistryPreview';
import { TariffCalculator } from './components/TariffCalculator';
import { DownloadsSection } from './components/DownloadsSection';
import { CircularsSection } from './components/CircularsSection';
import { ContactSection } from './components/ContactSection';
import { ProcedureView } from './components/ProcedureView';
import { AboutSubViews } from './components/AboutSubViews';
import { StandardsView } from './components/StandardsView';
import { RegistryViews } from './components/RegistryViews';
import { InfoSubViews } from './components/InfoSubViews';
import { MediaGallery } from './components/MediaGallery';
import { OperatorModal } from './components/OperatorModal';
import { ApplyModal } from './components/ApplyModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CMSWorkspace } from './components/CMSWorkspace';
import { PageLoader } from './components/PageLoader';

export function App() {
  const { currentUser, isAdminMode } = useCMS();

  // Initial Page Refresh Loader State
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Navigation & Modal State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isCMSWorkspaceOpen, setIsCMSWorkspaceOpen] = useState(false);
  const [initialScope, setInitialScope] = useState('crop-individual');
  const [initialArea, setInitialArea] = useState(3.5);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = (scope, area) => {
    if (scope) setInitialScope(scope);
    if (area) setInitialArea(area);
    setIsApplyModalOpen(true);
  };

  // If officer is working inside CMS workspace, render full CMS Workspace
  if (isCMSWorkspaceOpen) {
    return (
      <>
        {isPageLoading && <PageLoader onLoaded={() => setIsPageLoading(false)} />}
        <CMSWorkspace onReturnToPublicSite={() => setIsCMSWorkspaceOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F2621]">
      {/* Page Refresh & Initial Mount Loader */}
      {isPageLoading && <PageLoader onLoaded={() => setIsPageLoading(false)} />}

      {/* Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenApply={() => handleOpenApply()}
        onOpenAdminCMS={() => {
          if (currentUser) {
            setIsCMSWorkspaceOpen(true);
          } else {
            setIsAdminLoginModalOpen(true);
          }
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* HOME VIEW */}
        {currentPage === 'home' && (
          <>
            <Hero
              onOpenApply={() => handleOpenApply()}
              onNavigate={navigateTo}
            />
            <StatsBanner />
            <AboutSection />
            <CertificationStreams
              onSelectStream={(scope) => handleOpenApply(scope)}
            />
            <OperatorRegistryPreview
              onSelectOperator={(op) => setSelectedOperator(op)}
            />
            <TariffCalculator
              onPreFillApply={(scope, area) => handleOpenApply(scope, area)}
            />
            <DownloadsSection />
            <CircularsSection />
            <ContactSection />
          </>
        )}

        {/* CERTIFICATION PROCEDURE */}
        {currentPage === 'certification' && (
          <ProcedureView
            onOpenApply={() => handleOpenApply()}
            onNavigate={navigateTo}
          />
        )}

        {/* DOWNLOADS */}
        {currentPage === 'downloads' && (
          <div className="py-8">
            <DownloadsSection />
          </div>
        )}

        {/* MEDIA GALLERIES */}
        {currentPage === 'photos' && (
          <MediaGallery mediaType="photos" onNavigate={navigateTo} />
        )}
        {currentPage === 'videos' && (
          <MediaGallery mediaType="videos" onNavigate={navigateTo} />
        )}

        {/* INQUIRY & CONTACT */}
        {currentPage === 'inquiry' && (
          <InfoSubViews
            pageType="inquiry"
            onNavigate={navigateTo}
            onOpenApply={() => handleOpenApply()}
          />
        )}
        {currentPage === 'contact' && (
          <div className="py-8">
            <ContactSection />
          </div>
        )}

        {/* ABOUT SUBVIEWS */}
        {[
          'about',
          'governing-board',
          'staff',
          'services',
          'policy',
          'accreditation'
        ].includes(currentPage) && (
          <AboutSubViews
            view={currentPage}
            onNavigate={navigateTo}
            onOpenApply={() => handleOpenApply()}
          />
        )}

        {/* STANDARDS */}
        {currentPage === 'internal-standard' && (
          <StandardsView standardType="internal" onNavigate={navigateTo} />
        )}
        {currentPage === 'npop-standard' && (
          <StandardsView standardType="npop" onNavigate={navigateTo} />
        )}
        {currentPage === 'other-standards' && (
          <StandardsView standardType="others" onNavigate={navigateTo} />
        )}

        {/* REGISTERS */}
        {[
          'active-individual',
          'active-ics',
          'farmer-details',
          'approved-inputs',
          'inspection-plan',
          'discontinued',
          'terminated',
          'suspended'
        ].includes(currentPage) && (
          <RegistryViews
            registerType={currentPage}
            onNavigate={navigateTo}
            onSelectOperator={(op) => setSelectedOperator(op)}
          />
        )}

        {/* INFO & RESOURCES */}
        {['payment-qr', 'ics-circular', 'organic-farming', 'rti', 'faq'].includes(currentPage) && (
          <InfoSubViews
            pageType={currentPage}
            onNavigate={navigateTo}
            onOpenApply={() => handleOpenApply()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenApply={() => handleOpenApply()}
      />

      {/* Operator Scope Certificate Modal */}
      <OperatorModal
        operator={selectedOperator}
        onClose={() => setSelectedOperator(null)}
      />

      {/* Online Application Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialScope={initialScope}
        initialArea={initialArea}
      />

      {/* Officer CMS Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setIsAdminLoginModalOpen(false);
          setIsCMSWorkspaceOpen(true);
        }}
      />
    </div>
  );
}
