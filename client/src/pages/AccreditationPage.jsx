import React from 'react';
import AboutSubNav from '../components/AboutSubNav';
import { ShieldCheck, Award, Globe, CheckCircle2 } from 'lucide-react';

export default function AccreditationPage() {
  const scopes = [
    {
      title: 'Organic Crop Production',
      desc: 'Individual agricultural holdings, commercial orchards, open field crops, and specialized greenhouse production across all 33 districts of Gujarat.',
      code: 'SCOPE-01-CROP',
      crops: 'Psyllium, Cumin, Wheat, Cotton, Mango, Pulses, Oilseeds'
    },
    {
      title: 'Grower Groups (Internal Control System - ICS)',
      desc: 'Co-operatives and Farmer Producer Organizations (FPOs) organizing small and marginal farmers under a structured internal audit mechanism.',
      code: 'SCOPE-02-ICS',
      crops: 'Up to 500 smallholder members per cluster'
    },
    {
      title: 'Organic Wild Harvest & Collection',
      desc: 'Sustainable forest produce, wild herbs, medicinal flora, and wild honey collected by tribal communities in notified forest tracts without ecological degradation.',
      code: 'SCOPE-03-WILD',
      crops: 'Wild Honey, Amla, Harde, Baheda, Forest Botanicals'
    },
    {
      title: 'Approved Agricultural Bio-Inputs',
      desc: 'Verification and endorsement of commercial bio-fertilizers, microbial consortia, vermicompost, and neem-based formulations against NPOP Annexure 1 & 2 standards.',
      code: 'SCOPE-04-INP',
      crops: 'Neem Cake, Trichoderma, Rhizobium, PSB, Bio-compost'
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      {/* Sub-Navigation Tab Bar */}
      <AboutSubNav />

      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>National & Global Equivalence</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              NPOP & ISO/IEC 17065 Accreditation
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Statutory accreditation granted by the National Accreditation Body (NAB) under APEDA, Ministry of Commerce & Industry, Government of India.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Accreditation Credentials Hero Box */}
        <div className="bg-white rounded-[3px] p-8 sm:p-10 border border-[#EAE6DE] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="lapland-subtitle">
                Accreditation Certificate: NAB-0012
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
                National Programme for Organic Production
              </h2>

              <p className="text-sm text-[#4E5B53] leading-relaxed">
                GOPCA holds official statutory accreditation under the <strong>National Programme for Organic Production (NPOP)</strong>, executed by the <strong>Agricultural and Processed Food Products Export Development Authority (APEDA)</strong>, Ministry of Commerce & Industry, Government of India.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#2A3730]">
                <div className="p-3.5 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE]">
                  <span className="font-semibold text-[#18221D] block mb-0.5">Accreditation Body</span>
                  <span>National Accreditation Body (NAB), New Delhi</span>
                </div>
                <div className="p-3.5 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE]">
                  <span className="font-semibold text-[#18221D] block mb-0.5">Statutory Standard</span>
                  <span>NPOP 8th Edition & Foreign Trade Act, 1992</span>
                </div>
                <div className="p-3.5 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE]">
                  <span className="font-semibold text-[#18221D] block mb-0.5">Quality Standard</span>
                  <span>ISO/IEC 17065:2012 Conformity Assessment</span>
                </div>
                <div className="p-3.5 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE]">
                  <span className="font-semibold text-[#18221D] block mb-0.5">APEDA Tracenet</span>
                  <span>Direct API sync for Scope Certificate QR validation</span>
                </div>
              </div>
            </div>

            {/* Seal Graphic */}
            <div className="lg:col-span-4 bg-[#163A2B] text-white p-7 rounded-[3px] text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full border border-[#C49A5A] flex items-center justify-center text-[#C49A5A] font-editorial text-xl font-normal">
                NAB
              </div>
              <div>
                <h3 className="font-editorial text-xl text-white">NAB-0012</h3>
                <p className="text-xs text-[#D8B57E] font-medium mt-0.5">NPOP Government Accreditation</p>
              </div>
              <p className="text-[11px] text-[#CBD8D1] leading-relaxed">
                Subject to periodic witness audits, technical surveillance, and surprise multi-residue cross-testing by APEDA inspectors.
              </p>
            </div>

          </div>
        </div>

        {/* Accredited Scopes */}
        <section className="space-y-6">
          <div>
            <div className="lapland-subtitle mb-2">
              Statutory Scopes
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
              Our 4 accredited scopes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scopes.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-medium text-[#1B3E2B] bg-[#FAF8F5] border border-[#EAE6DE] px-2 py-0.5 rounded-[2px]">
                      {s.code}
                    </span>
                    <Award className="w-4 h-4 text-[#C49A5A]" />
                  </div>
                  <h3 className="font-editorial text-xl text-[#18221D]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#525E57] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EAE6DE] text-xs">
                  <span className="text-[10px] font-semibold text-[#8C744F] uppercase tracking-wider block">Typical Crops / Inputs</span>
                  <span className="text-[#18221D] font-medium">{s.crops}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ISO/IEC 17065 Conformance Section */}
        <section className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#C49A5A]" />
            <h3 className="font-editorial text-2xl text-[#18221D]">
              ISO/IEC 17065:2012 Standard Conformance
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#4E5B53] leading-relaxed">
            ISO/IEC 17065 specifies general requirements for third-party bodies operating certification systems of products, processes, and services. GOPCA’s governance, audit protocols, document control systems, personnel competency matrix, and appeals mechanism strictly align with ISO/IEC 17065 benchmarks.
          </p>
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#26332C]">
            <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#EAE6DE] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C49A5A] flex-shrink-0" />
              <span>Competence of Personnel (Clause 6.1)</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#EAE6DE] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C49A5A] flex-shrink-0" />
              <span>Evaluation & Audit Protocol (Clause 7.4)</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#EAE6DE] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C49A5A] flex-shrink-0" />
              <span>Independent Decision Mechanism (Clause 7.6)</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
