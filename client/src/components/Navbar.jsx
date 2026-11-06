import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  // Active checks based on the new menu structure
  const isGopcaActive = [
    '/about', 
    '/governing-board', 
    '/personnel', 
    '/policy', 
    '/accreditation'
  ].includes(path);

  const isServicesActive = [
    '/certification', 
    '/fees-qr'
  ].includes(path);

  const isOperatorActive = path.startsWith('/operators');

  const isDownloadMediaActive = [
    '/download', 
    '/photos', 
    '/videos'
  ].includes(path);

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF8F5] border-b border-[#EAE6DE] text-[#243029]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 py-1">
          
          {/* Main Navbar Menu — Exact hierarchy from user's specification image */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13.5px] font-normal tracking-wide">
            
            {/* 1. Home (Direct Link) */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-2.5 transition-colors ${
                  isActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`
              }
            >
              Home
            </NavLink>

            {/* 2. GOPCA (Dropdown: About Us, Governing Board, Personnel, Policy, Accreditation) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('gopca')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`relative py-2.5 inline-flex items-center gap-1 transition-colors ${
                  isGopcaActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`}
              >
                <span>GOPCA</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8A9690]" />
              </button>

              {openDropdown === 'gopca' && (
                <div className="absolute left-0 mt-0 w-60 bg-white rounded-[2px] shadow-lg border border-[#EAE6DE] py-2 z-50 animate-fadeIn">
                  <NavLink
                    to="/about"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="/governing-board"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Governing Board
                  </NavLink>
                  <NavLink
                    to="/personnel"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Personnel
                  </NavLink>
                  <NavLink
                    to="/policy"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Policy
                  </NavLink>
                  <NavLink
                    to="/accreditation"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Accreditation
                  </NavLink>
                </div>
              )}
            </div>

            {/* 3. Services & Sourcing (Dropdown: Certification Workflow, Fee Schedule & QR) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`relative py-2.5 inline-flex items-center gap-1 transition-colors ${
                  isServicesActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`}
              >
                <span>Services & Sourcing</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8A9690]" />
              </button>

              {openDropdown === 'services' && (
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-[2px] shadow-lg border border-[#EAE6DE] py-2 z-50 animate-fadeIn">
                  <NavLink
                    to="/certification"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Certification Workflow
                  </NavLink>
                  <NavLink
                    to="/fees-qr"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Fee Schedule & QR
                  </NavLink>
                </div>
              )}
            </div>

            {/* 4. Our Standards (Direct Link) */}
            <NavLink
              to="/standards"
              className={({ isActive }) =>
                `relative py-2.5 transition-colors ${
                  isActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`
              }
            >
              Our Standards
            </NavLink>

            {/* 5. Operator Registry (Dropdown: Active ICS, Grower Group, Suspended Operator, Terminated Operator, Discontinued Operator) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('operators')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`relative py-2.5 inline-flex items-center gap-1 transition-colors ${
                  isOperatorActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`}
              >
                <span>Operator Registry</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8A9690]" />
              </button>

              {openDropdown === 'operators' && (
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-[2px] shadow-lg border border-[#EAE6DE] py-2 z-50 animate-fadeIn">
                  <NavLink
                    to="/operators/active"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Active ICS
                  </NavLink>
                  <NavLink
                    to="/operators/farmers"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Grower Group
                  </NavLink>
                  <NavLink
                    to="/operators/suspended"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-amber-50 text-amber-900 font-semibold border-l-2 border-amber-600' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Suspended Operator
                  </NavLink>
                  <NavLink
                    to="/operators/terminated"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-red-50 text-red-900 font-semibold border-l-2 border-red-600' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Terminated Operator
                  </NavLink>
                  <NavLink
                    to="/operators/discontinued"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-gray-100 text-gray-900 font-semibold border-l-2 border-gray-500' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Discontinued Operator
                  </NavLink>
                </div>
              )}
            </div>

            {/* 6. Download & Media (Dropdown: Documents, Images, Videos) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('downloadMedia')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`relative py-2.5 inline-flex items-center gap-1 transition-colors ${
                  isDownloadMediaActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`}
              >
                <span>Download & Media</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8A9690]" />
              </button>

              {openDropdown === 'downloadMedia' && (
                <div className="absolute left-0 mt-0 w-56 bg-white rounded-[2px] shadow-lg border border-[#EAE6DE] py-2 z-50 animate-fadeIn">
                  <NavLink
                    to="/download"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Documents
                  </NavLink>
                  <NavLink
                    to="/photos"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Images
                  </NavLink>
                  <NavLink
                    to="/videos"
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#F6F3EC] text-[#1B3E2B] font-semibold border-l-2 border-[#C49A5A]' : 'text-[#3E4D45] hover:bg-[#FAF8F5]'
                      }`
                    }
                  >
                    Videos
                  </NavLink>
                </div>
              )}
            </div>

            {/* 7. FAQ (Direct Link) */}
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `relative py-2.5 transition-colors ${
                  isActive
                    ? 'text-[#18221D] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A5A]'
                    : 'text-[#44524A] hover:text-[#18221D]'
                }`
              }
            >
              FAQ
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center justify-between w-full py-1">
            <span className="text-xs font-semibold tracking-wider text-[#1B3E2B] uppercase">
              Navigation Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-[#243029] hover:bg-[#EAE6DE]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Matching exact hierarchy) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#EAE6DE] px-4 pt-3 pb-6 space-y-3 text-xs">
          
          {/* 1. Home */}
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-[#18221D] font-semibold">
            Home
          </NavLink>

          {/* 2. GOPCA */}
          <div className="border-t border-[#EAE6DE] pt-2">
            <p className="font-semibold text-[#8C744F] uppercase tracking-wider text-[11px] mb-1">GOPCA</p>
            <div className="pl-2 space-y-1">
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">About Us</NavLink>
              <NavLink to="/governing-board" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Governing Board</NavLink>
              <NavLink to="/personnel" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Personnel</NavLink>
              <NavLink to="/policy" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Policy</NavLink>
              <NavLink to="/accreditation" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Accreditation</NavLink>
            </div>
          </div>

          {/* 3. Services & Sourcing */}
          <div className="border-t border-[#EAE6DE] pt-2">
            <p className="font-semibold text-[#8C744F] uppercase tracking-wider text-[11px] mb-1">Services & Sourcing</p>
            <div className="pl-2 space-y-1">
              <NavLink to="/certification" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Certification Workflow</NavLink>
              <NavLink to="/fees-qr" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Fee Schedule & QR</NavLink>
            </div>
          </div>

          {/* 4. Our Standards */}
          <div className="border-t border-[#EAE6DE] pt-2">
            <NavLink to="/standards" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-[#18221D] font-semibold">
              Our Standards
            </NavLink>
          </div>

          {/* 5. Operator Registry */}
          <div className="border-t border-[#EAE6DE] pt-2">
            <p className="font-semibold text-[#8C744F] uppercase tracking-wider text-[11px] mb-1">Operator Registry</p>
            <div className="pl-2 space-y-1">
              <NavLink to="/operators/active" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Active ICS</NavLink>
              <NavLink to="/operators/farmers" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Grower Group</NavLink>
              <NavLink to="/operators/suspended" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Suspended Operator</NavLink>
              <NavLink to="/operators/terminated" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Terminated Operator</NavLink>
              <NavLink to="/operators/discontinued" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Discontinued Operator</NavLink>
            </div>
          </div>

          {/* 6. Download & Media */}
          <div className="border-t border-[#EAE6DE] pt-2">
            <p className="font-semibold text-[#8C744F] uppercase tracking-wider text-[11px] mb-1">Download & Media</p>
            <div className="pl-2 space-y-1">
              <NavLink to="/download" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Documents</NavLink>
              <NavLink to="/photos" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Images</NavLink>
              <NavLink to="/videos" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#3E4D45]">Videos</NavLink>
            </div>
          </div>

          {/* 7. FAQ */}
          <div className="border-t border-[#EAE6DE] pt-2">
            <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-[#18221D] font-semibold">
              FAQ
            </NavLink>
          </div>

        </div>
      )}
    </nav>
  );
}
