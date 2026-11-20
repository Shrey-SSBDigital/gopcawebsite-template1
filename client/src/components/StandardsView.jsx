import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, ArrowRight, Download } from 'lucide-react';

export const StandardsView = ({ standardType, onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C6D37] uppercase tracking-widest font-semibold mb-3">
          <button onClick={() => onNavigate('home')} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <span>Our Standards</span>
          <span>/</span>
          <span className="text-[#18231C]">
            {standardType === 'internal' && 'GOPCA Internal Standard'}
            {standardType === 'npop' && 'NPOP 8th Edition'}
            {standardType === 'others' && 'Other Standards (EU/USDA/FSSAI)'}
          </span>
        </div>

        {/* View 1: Internal Standard */}
        {standardType === 'internal' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                GOPCA Internal Standards
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Field management, soil biology, buffer zone specifications, and allowed inputs published by GOPCA for Gujarat agro-climatic zones.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                Core Principles of GOPCA Internal Standard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    title: '1. Conversion Guidelines',
                    desc: 'A minimum of 24 months for annual crops (groundnut, wheat, cotton, cumin) and 36 months for perennial fruit trees (kesar mango, chiku, pomegranate) under continuous documented organic management.'
                  },
                  {
                    title: '2. Buffer Zones & Isolation',
                    desc: 'Mandatory 3-meter physical buffer barrier or living biological hedge along all parcel boundaries adjacent to non-certified or chemically treated farmlands.'
                  },
                  {
                    title: '3. Soil Fertility & Compost',
                    desc: 'Exclusion of all synthetic fertilizers (Urea, DAP, SSP). Exclusive reliance on farm-derived cow dung manure, vermicompost, green manuring (dhaincha, sunhemp), and GOPCA-approved microbial consortia.'
                  },
                  {
                    title: '4. Non-Chemical Plant Protection',
                    desc: 'Pest management via neem-oil formulations, dashparni ark, pheromone traps, light traps, and Trichoderma bio-control agents. Prohibited: synthetic insecticides, organophosphates, and herbicides.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#18231C]">{item.title}</h3>
                    <p className="text-xs text-[#526055] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 2: NPOP 8th Edition */}
        {standardType === 'npop' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                National Programme for Organic Production (NPOP) 8th Edition
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                National benchmark organic standards established by the Ministry of Commerce & Industry, Government of India.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                Key Chapters & Statutory Directives
              </h2>
              <p className="text-sm text-[#4E5C52] leading-relaxed">
                The NPOP 8th Edition serves as the national legal framework for organic certification in India. It establishes strict rules governing accreditation, inspection methodology, grower group sampling, packaging integrity, and TraceNet electronic transaction accounting.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                {[
                  'Section 3: Accreditation Criteria for Certification Bodies (NAB recognition standards)',
                  'Section 4: National Standards for Organic Production (NSOP) - Crop & Livestock',
                  'Section 5: Internal Control System (ICS) for Smallholder Grower Groups',
                  'Section 6: Organic Food Processing, Packaging, and Labeling Norms',
                  'Appendix 1: Lists of Approved Substances, Minerals, and Soil Amendments'
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E3DBD0]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                    <span className="text-[#2A372E] font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 3: Other Standards */}
        {standardType === 'others' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                International & Regulatory Equivalencies
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Overview of European Union (EU), United States (USDA NOP), and domestic FSSAI Jaivik Bharat regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#D5CEBF] p-6 shadow-sm space-y-3">
                <div className="font-mono text-xs text-[#8C6D37] font-semibold">EUROPEAN UNION</div>
                <h3 className="font-serif text-xl font-bold text-[#18231C]">EU Equivalence Reg.</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Recognition of Indian NPOP certification under EU Organic Regulations for unprocessed plant products exported to European Union member nations.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D5CEBF] p-6 shadow-sm space-y-3">
                <div className="font-mono text-xs text-[#8C6D37] font-semibold">UNITED STATES</div>
                <h3 className="font-serif text-xl font-bold text-[#18231C]">USDA NOP Alignment</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Conformance criteria with the United States Department of Agriculture National Organic Program, requiring USDA-accredited verifications for North American trade.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D5CEBF] p-6 shadow-sm space-y-3">
                <div className="font-mono text-xs text-[#8C6D37] font-semibold">INDIA DOMESTIC</div>
                <h3 className="font-serif text-xl font-bold text-[#18231C]">FSSAI Jaivik Bharat</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Mandatory domestic food safety regulation requiring the Jaivik Bharat organic logo and valid NPOP license number on all retail packaged organic food products sold in India.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
