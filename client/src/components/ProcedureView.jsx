import React, { useState } from 'react';
import { procedurePhases } from '../data/staticData';
import { CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck, Download, ChevronRight } from 'lucide-react';

export const ProcedureView = ({ onOpenApply, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('individual');

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C6D37] uppercase tracking-widest font-semibold mb-3">
          <button onClick={() => onNavigate('home')} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <span>Certification</span>
          <span>/</span>
          <span className="text-[#18231C]">Certification Procedure</span>
        </div>

        {/* Title */}
        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-3">
            Certification Procedure
          </h1>
          <p className="text-base text-[#46544A] leading-relaxed">
            Explains the individual farmer, grower group (ICS), and post-harvest handling organic certification processes under the National Programme for Organic Production (NPOP) and National Standards for Organic Production (NSOP).
          </p>
        </div>

        {/* Stream Scope Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-[#E3DBD0]">
          {[
            { id: 'individual', label: 'Individual Crop Production' },
            { id: 'ics', label: 'Grower Groups / Smallholder ICS' },
            { id: 'processing', label: 'Processing & Value Addition' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1B3826] text-white shadow-xs'
                  : 'bg-white text-[#4A574E] border border-[#DFD8CC] hover:bg-[#F2EDE2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Details */}
        <div className="space-y-12">
          {activeTab === 'individual' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C6D37] font-bold">
                      Scope: NPOP-CR-01
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18231C]">
                      Individual Farmer Certification Protocol
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#EBF2ED] text-[#1B3826] font-semibold text-xs border border-[#CCE0D3]">
                    24 to 36 Months Conversion
                  </span>
                </div>

                <p className="text-sm text-[#4E5C52] leading-relaxed">
                  Individual farm certification applies to standalone farmers or agricultural companies operating designated land parcels in Gujarat. The conversion period is 2 years for annual crops and 3 years for perennial orchards, measured from the date of initial registration and inspection.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#18231C]">
                      1. Mandatory Application Dossier
                    </h3>
                    <ul className="space-y-2 text-xs text-[#3E4F43]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Prescribed Form GOPCA/CR-01 duly completed and signed.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Revenue 7/12 and 8-A land ownership extracts showing survey numbers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Farm boundary map indicating 3-meter isolation buffer zones.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Affidavit declaring 3-year prior history of synthetic fertilizer/pesticide use.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#18231C]">
                      2. Annual Inspection & Lab Testing
                    </h3>
                    <ul className="space-y-2 text-xs text-[#3E4F43]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Annual pre-harvest on-site inspection of all plots and water sources.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Unannounced blind soil and plant tissue residue testing in NABL labs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Daily Farm Diary auditing for on-farm compost preparation and seed origins.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                        <span>Issuance of Scope Certificate on APEDA TraceNet portal upon committee clearance.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenApply}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
                  >
                    <span>Apply for Individual Certification</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                  </button>
                  <button
                    onClick={() => onNavigate('downloads')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-xl hover:bg-[#EFE9DC] transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#8C6D37]" />
                    <span>Download Form CR-01</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ics' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C6D37] font-bold">
                      Scope: NPOP-ICS-02
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18231C]">
                      Grower Groups & Internal Control System (ICS)
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#EBF2ED] text-[#1B3826] font-semibold text-xs border border-[#CCE0D3]">
                    Up to 500 Farmers per ICS
                  </span>
                </div>

                <p className="text-sm text-[#4E5C52] leading-relaxed">
                  Grower Group certification provides affordable group inspection for Farmer Producer Companies (FPOs), primary cooperatives, and tribal societies in Gujarat. A unified Internal Control System (ICS) manages member compliance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#18231C]">
                      Internal Quality System (IQS)
                    </h3>
                    <p className="text-xs text-[#4F5E52] leading-relaxed">
                      The group must appoint an Internal Quality Manager and internal field inspectors. 100% of member farms must undergo internal audits prior to GOPCA’s external evaluation.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#18231C]">
                      External Sampling Formula
                    </h3>
                    <p className="text-xs text-[#4F5E52] leading-relaxed">
                      GOPCA external inspectors audit a statistical sample based on the statutory NPOP formula: <strong>Sample = √(Total Farmers)</strong>, with a minimum of 10 farms and at least 20% random unannounced audits.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenApply}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
                  >
                    <span>Apply for Grower Group ICS</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                  </button>
                  <button
                    onClick={() => onNavigate('ics-circular')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-xl hover:bg-[#EFE9DC] transition-colors"
                  >
                    <span>View ICS Circular 2024</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'processing' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C6D37] font-bold">
                      Scope: NPOP-PR-03
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18231C]">
                      Processing, Milling & Packaging Units
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#EBF2ED] text-[#1B3826] font-semibold text-xs border border-[#CCE0D3]">
                    Zero Chemical Contamination
                  </span>
                </div>

                <p className="text-sm text-[#4E5C52] leading-relaxed">
                  Certification for spice grinding units, cold-pressed oil expellers, grain cleaning facilities, and packaging plants. Audits focus on physical separation of organic vs conventional lots, pest control without prohibited fumigants, and TraceNet transaction certificates (TC).
                </p>

                <div className="pt-4">
                  <button
                    onClick={onOpenApply}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
                  >
                    <span>Apply for Processing Unit Certification</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
