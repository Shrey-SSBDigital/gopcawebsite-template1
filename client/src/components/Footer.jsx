import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0E2117] text-[#BACCC1] pt-16 pb-8 border-t border-[#1C3B2B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-Column Grid */}
        <div className="flex justify-between gap-10 pb-14 border-b border-[#1C3B2B]/80">
          
          {/* Col 1: Identity & Legal Seals */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#C49A5A]/50 bg-white p-0.5 flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="GOPCA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-editorial text-lg text-white font-normal">GOPCA</h3>
                <p className="text-[11px] text-[#A1B8AC]">ગુજરાત ઓર્ગેનિક એજન્સી</p>
              </div>
            </div>

            <p className="text-[11px] text-[#A1B8AC] leading-relaxed">
              Autonomous statutory certification body under the Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat.
            </p>

            <div className="pt-2 space-y-1.5 text-[10px] text-[#8EA79A]">
              <div className="flex items-center gap-2 text-[#D8B57E]">
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-semibold text-[11px]">NPOP Accredited (NAB-0012)</span>
              </div>
              <p>Societies Registration Act, 1860 • Reg. No. Guj/14589</p>
              <p>Conforming to ISO/IEC 17065:2012 Standards</p>
            </div>
          </div>

          {/* Col 5: Headquarters Coordinates */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l border-[#C49A5A] pl-2">
              Secretariat Coordinates
            </h4>
            
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C49A5A] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-[#A1B8AC]">
                <strong className="text-white">Beej Pramanan Bhavan</strong>,<br />
                Opp. Gokul Row Houses, Shyamal Cross Road, Satellite, Ahmedabad - 380015, Gujarat.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C49A5A] flex-shrink-0" />
              <a href="tel:07926740031" className="hover:text-white transition-colors">
                079-26740031
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C49A5A] flex-shrink-0" />
              <a href="mailto:dirgopca@gmail.com" className="hover:text-white transition-colors">
                dirgopca@gmail.com
              </a>
            </div>

            <div className="flex items-start gap-2 pt-1 text-[10px] text-[#8EA79A]">
              <Clock className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
              <span>Mon to Sat: 10:30 AM – 6:10 PM<br />(Closed 2nd & 4th Sat & Holidays)</span>
            </div>
          </div>

        </div>

        {/* Accreditation Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-[#7A9386]">
          <p>
            Copyright © 2013–2026 GOPCA • All rights reserved • Government of Gujarat Initiative.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px]">
            <span>National Accreditation Body (NAB)</span>
            <span>•</span>
            <span>APEDA / NPOP MoC&I</span>
            <span>•</span>
            <span>ISO/IEC 17065:2012 Certified Body</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
