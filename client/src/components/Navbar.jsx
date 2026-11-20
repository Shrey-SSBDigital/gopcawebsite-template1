import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { navMenuConfig } from '../data/staticData';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  UserCheck,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Lock
} from 'lucide-react';

export const Navbar = ({ currentPage, onNavigate, onOpenApply, onOpenAdminCMS }) => {
  const { currentUser, isAdminMode, logoutAdmin } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3DBD0] transition-all">
      {/* Officer Live Preview Ribbon */}
      {currentUser && (
        <div className="bg-[#142B1D] text-white px-3 sm:px-4 py-1.5 text-xs border-b border-[#22442D] flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 truncate">
            <UserCheck className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
            <span className="truncate">
              Active Officer: <strong>{currentUser.name}</strong>{' '}
              <span className="text-[#C2D1C7] text-[10px]">({currentUser.role})</span>
            </span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="text-white/75 text-[11px] hidden md:inline">Public Live Preview</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs ml-auto shrink-0">
            <button
              onClick={onOpenAdminCMS}
              className="text-[#D4A373] hover:text-white font-semibold flex items-center gap-1 transition-colors underline-offset-2 hover:underline text-[11px] sm:text-xs"
            >
              <span>CMS Workspace</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={logoutAdmin}
              className="text-white/60 hover:text-white transition-colors text-[11px]"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Top Gazette & Accreditation Announcement Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#EDE7DC] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11px] text-[#556358]">
          <div className="flex items-center gap-4">
            <span className="font-medium text-[#1B3826] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              APEDA Accreditation: <strong>NPOP/NAB/0028</strong>
            </span>
            <span className="text-[#C5BEAF]">·</span>
            <span>TraceNet Integrated Inspection Body</span>
            <span className="text-[#C5BEAF]">·</span>
            <span>Government of Gujarat</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:07926740031" className="hover:text-[#1B3826] flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#8C6D37]" />
              079-26740031
            </a>
            <span className="text-[#C5BEAF]">·</span>
            <a href="mailto:dirgopca@gmail.com" className="hover:text-[#1B3826] flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#8C6D37]" />
              dirgopca@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20" ref={dropdownRef}>
          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group">
            <img
              src="/images/gopca_logo.png"
              alt="Gujarat Organic Products Certification Agency (GOPCA) Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform shrink-0 bg-white p-0.5 border border-[#DFD8CC]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#17221A] leading-none">
                  GOPCA
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-[#526055] font-semibold leading-tight mt-0.5 line-clamp-1 sm:line-clamp-none">
                Gujarat Organic Products Certification Agency
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menus */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navMenuConfig.map((menu) => (
              <div key={menu.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === menu.id ? null : menu.id)}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-large tracking-wide transition-colors rounded-md ${
                    activeDropdown === menu.id ||
                    menu.items.some((item) => item.id === currentPage)
                      ? 'text-[#1B3826] font-semibold bg-[#EBF2ED]'
                      : 'text-[#3E4D42] hover:text-[#18231C] hover:bg-[#F2EDE2]'
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8C6D37] transition-transform duration-200 ${
                      activeDropdown === menu.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu Popup */}
                {activeDropdown === menu.id && (
                  <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#FAF8F5] border border-[#D5CEBF] shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#8C6D37] font-semibold border-b border-[#EDE7DC] mb-1">
                      {menu.label} Directory
                    </div>
                    {menu.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                          currentPage === item.id
                            ? 'bg-[#1B3826] text-white font-medium'
                            : 'text-[#2D3931] hover:bg-[#EFEAE0]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currentPage === item.id ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
                        ) : (
                          <ChevronRight className="w-3 h-3 text-[#A8B5AB] opacity-0 group-hover:opacity-100" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin CMS Button */}
            <button
              onClick={onOpenAdminCMS}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#1B3826] bg-[#FAF8F5] border border-[#DFD8CC] rounded-lg hover:bg-white transition-all shadow-xs"
              title="Open Content Management System Workspace"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span className="hidden md:inline">Admin CMS</span>
              <span className="md:hidden">CMS</span>
            </button>

            {/* Apply for Certification CTA */}
            <button
              onClick={onOpenApply}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white bg-[#1B3826] rounded-lg hover:bg-[#132A1C] transition-all duration-200 shadow-sm active:scale-[0.98]"
            >
              <span>Apply</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4A373]" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#242E27] hover:text-[#1B3826] focus:outline-none rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Accordion Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6E1D6] bg-[#FAF8F5] px-4 pt-3 pb-6 shadow-xl max-h-[75vh] overflow-y-auto">
          {navMenuConfig.map((menu) => (
            <div key={menu.id} className="py-2.5 border-b border-[#EBE4D8] last:border-b-0">
              <div className="text-[10px] uppercase tracking-wider text-[#8C6D37] font-semibold px-2 py-1">
                {menu.label}
              </div>
              <div className="space-y-0.5 mt-1">
                {menu.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-2 px-3 text-xs rounded-md transition-colors flex items-center justify-between ${
                      currentPage === item.id
                        ? 'bg-[#EBF2ED] text-[#1B3826] font-semibold'
                        : 'text-[#29352D] hover:bg-[#F2EDE2]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#B0BCAE]" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminCMS();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold tracking-wider uppercase text-[#1B3826] bg-[#FFFFFF] border border-[#DFD8CC] rounded-lg flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span>GOPCA Directorate CMS Workspace</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1B3826] rounded-lg flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Apply for NPOP Organic Certification</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
