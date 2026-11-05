import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Mail } from 'lucide-react';
import gopcaLogo from '../assets/gopca-logo.png';

export default function HeaderBranding() {
  return (
    <header className="w-full bg-[#FAF8F5] border-b border-[#EAE6DE] text-[#18221D]">
      {/* Top Pre-Header Utility Bar */}
      <div className="w-full border-b border-[#EBE7DF] bg-[#FAF8F5] text-[#55635B] text-[11px] py-1.5 px-4 sm:px-8 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#38453E]">
              Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat
            </span>
            <span className="hidden md:inline text-[#D5D0C6]">|</span>
            <span className="hidden md:inline text-[#627068]">
              Autonomous Statutory Body • Reg. No. Guj/14589 (Societies Registration Act, 1860)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#4A5750]">
            <span className="hidden sm:inline">NPOP Accredited (NAB-0012) • APEDA Tracenet</span>
            <span className="hidden sm:inline text-[#D5D0C6]">|</span>
            <a href="tel:07926740031" className="hover:text-[#1B3E2B] transition-colors font-medium">
              079-26740031
            </a>
            <span className="text-[#D5D0C6]">|</span>
            <a href="mailto:dirgopca@gmail.com" className="hover:text-[#1B3E2B] transition-colors">
              dirgopca@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left: GOPCA Official Logo & Refined Typography */}
          <Link to="/" className="flex items-center gap-3.5 group">
            {/* Official GOPCA Circular Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#EAE6DE] bg-white p-1 flex items-center justify-center flex-shrink-0 group-hover:border-[#C49A5A] transition-colors shadow-sm">
              <img 
                src={gopcaLogo} 
                alt="GOPCA Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-editorial text-xl sm:text-2xl text-[#18221D] tracking-tight leading-tight group-hover:text-[#1B3E2B] transition-colors">
                  Gujarat Organic Products Certification Agency
                </span>
                <span className="hidden xl:inline text-xs font-semibold text-[#8C744F] font-serif">
                  (GOPCA)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-semibold text-[#5A6860] font-sans">
                  ગુજરાત ઓર્ગેનિક પ્રમાણીકરણ એજન્સી
                </span>
                <span className="text-[10px] text-[#C49A5A] font-bold tracking-widest uppercase hidden md:inline">
                  • NPOP ACCREDITED BODY • ISO/IEC 17065
                </span>
              </div>
            </div>
          </Link>

          {/* Right Action: Taste of Lapland Forest Green Solid Button */}
          <div className="flex items-center self-end sm:self-center">
            <Link
              to="/contact"
              className="bg-[#1B3E2B] hover:bg-[#143122] text-white text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase px-6 py-2.5 rounded-[2px] transition-all shadow-sm hover:shadow"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
