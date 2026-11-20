import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ExternalLink, Leaf } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenApply }) => {
  const handleNav = (id) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#142B1D] text-[#ECE7DF] border-t border-[#22442D] pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#244530]">
          {/* Col 1 & 2: Agency Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/gopca_logo.png"
                alt="GOPCA Logo"
                className="w-11 h-11 object-contain rounded-full bg-white p-0.5 border border-[#3C694C] shrink-0 shadow-sm"
              />
              <div>
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-white block">
                  GOPCA
                </span>
                <span className="text-[11px] text-[#A6BAAD] block">
                  Gujarat Organic Products Certification Agency
                </span>
              </div>
            </div>

            <p className="text-[#A4B5A8] text-xs leading-relaxed max-w-sm">
              Autonomous statutory certification body established by the Government of Gujarat under the Societies Registration Act, 1860. Accredited under the National Programme for Organic Production (NPOP/NAB/0028) by APEDA, Ministry of Commerce & Industry, Government of India.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 bg-[#1A3825] rounded border border-[#2D563B] text-[#D4A373]">
                NPOP / NAB / 0028
              </span>
              <span className="px-2.5 py-1 bg-[#1A3825] rounded border border-[#2D563B] text-[#C0D3C5]">
                APEDA TraceNet Certified
              </span>
              <span className="px-2.5 py-1 bg-[#1A3825] rounded border border-[#2D563B] text-[#C0D3C5]">
                Govt. of Gujarat
              </span>
            </div>
          </div>

          {/* Col 3: Certification & Procedures */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#D4A373] font-semibold">
              Certification
            </h4>
            <ul className="space-y-2 text-[#C0D3C5]">
              <li>
                <button onClick={() => handleNav('certification')} className="hover:text-white transition-colors">
                  Certification Procedure
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('downloads')} className="hover:text-white transition-colors">
                  Download Application Forms
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('active-individual')} className="hover:text-white transition-colors">
                  Active Operators Registry
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('approved-inputs')} className="hover:text-white transition-colors">
                  GOPCA Approved Inputs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('inspection-plan')} className="hover:text-white transition-colors">
                  Inspection Plan 2026
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ics-circular')} className="hover:text-white transition-colors">
                  ICS Circular (NPOP 2024)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Statutory & Standards */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#D4A373] font-semibold">
              Standards & Legal
            </h4>
            <ul className="space-y-2 text-[#C0D3C5]">
              <li>
                <button onClick={() => handleNav('internal-standard')} className="hover:text-white transition-colors">
                  GOPCA Internal Standards
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('npop-standard')} className="hover:text-white transition-colors">
                  NPOP 8th Edition Directives
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('policy')} className="hover:text-white transition-colors">
                  Quality & Impartiality Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('governing-board')} className="hover:text-white transition-colors">
                  Governing Board of Gujarat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rti')} className="hover:text-white transition-colors">
                  Right to Information (RTI)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('payment-qr')} className="hover:text-white transition-colors">
                  Fee Payment Bank & QR Code
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Head Office Contact */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#D4A373] font-semibold">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-[#C0D3C5] leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>
                  <strong>Beej Pramanan Bhavan</strong>, Opp. Gokul Row Houses, Shyamal Cross Road, Near FCI, Satellite, Ahmedabad – 380015, Gujarat.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="tel:07926740031" className="hover:text-white">079-26740031</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="mailto:dirgopca@gmail.com" className="hover:text-white">dirgopca@gmail.com</a>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-[#9CB3A3] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#D4A373] shrink-0 mt-0.5" />
                <span>Mon – Sat: 10:30 AM to 06:10 PM (Closed 2nd & 4th Sat, Sun)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8C9E92]">
          <div>
            © {new Date().getFullYear()} Gujarat Organic Products Certification Agency (GOPCA). All Statutory Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[#98AAA0]">
            <button onClick={() => handleNav('policy')} className="hover:text-white">Impartiality Charter</button>
            <span>·</span>
            <button onClick={() => handleNav('rti')} className="hover:text-white">RTI Disclosures</button>
            <span>·</span>
            <button onClick={() => handleNav('faq')} className="hover:text-white">Citizen Help</button>
            <span>·</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white">Contact Directorate</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
