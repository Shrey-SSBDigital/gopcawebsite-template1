import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CertificationWorkflowPage() {
  const stages = [
    {
      num: '01',
      title: 'Application Submission & Land Record Verification',
      timeline: 'Days 1–7',
      actor: 'Applicant Operator & Registration Cell',
      deliverable: 'Application Acknowledgment & Registration Code',
      criteria: 'Form A/B complete, 7/12 & 8-A extracts verified, 3-year cropping history declared, 3m buffer boundaries mapped.',
      desc: 'The operator submits the formal application along with revenue land records (7/12 & 8-A extracts), past 3-year chemical usage declaration, farm contour map, buffer zone distance declarations, and initial scrutiny receipt. GOPCA registers the file and issues an official Operator Registration Code.'
    },
    {
      num: '02',
      title: 'Desk Scrutiny & Inspection Contract Execution',
      timeline: 'Days 8–15',
      actor: 'Technical Scrutiny Officer & Legal Secretariat',
      deliverable: 'Contract Signed & Lead Auditor Assigned',
      criteria: 'Verification of internal control manual (for ICS), fee estimate sanctioned, bilateral inspection contract executed.',
      desc: 'Technical scrutiny officers evaluate the documentation. For Grower Groups, the ICS internal manual and member rosters are scrutinized. An official inspection fee estimate is issued. Upon bilateral execution of the legally binding Inspection Agreement, an accredited Lead Auditor is assigned.'
    },
    {
      num: '03',
      title: 'On-Site Physical Audit & Field Inspection',
      timeline: 'Days 16–30',
      actor: 'ISO/IEC 17065 Lead Auditor & Field Inspectors',
      deliverable: 'Signed Inspection Report & Exit Interview Note',
      criteria: 'Physical inspection of survey plots, compost yards, input storage, seed sources, and statistical sampling of ICS members.',
      desc: 'The lead auditor conducts on-site field surveillance. Inspections cover all boundary buffer zones, irrigation sources, composting facilities, bio-input stocks, and harvest equipment. In Grower Groups (ICS), 100% of internal records are reviewed alongside statistical spot-audits of smallholder member farms. An exit interview is conducted with the operator.'
    },
    {
      num: '04',
      title: 'Representative Sampling & Multi-Residue Testing',
      timeline: 'Days 31–45',
      actor: 'Sampling Officer & NABL Accredited Testing Lab',
      deliverable: 'Certified Lab Test Analysis Reports (GC-MS/MS)',
      criteria: 'Tamper-evident chain of custody, multi-residue pesticide screening, heavy metal limits, GMO test if applicable.',
      desc: 'Sealed representative samples of soil cores, foliage, irrigation water, and crop produce are collected using sanitized tools under chain-of-custody protocols. Samples are dispatched to NABL-accredited chemical testing laboratories for gas chromatography (GC-MS/MS) and liquid chromatography (LC-MS/MS) multi-residue pesticide screening.'
    },
    {
      num: '05',
      title: 'Independent Certification Committee Review',
      timeline: 'Days 46–55',
      actor: 'Autonomous Statutory Certification Committee',
      deliverable: 'Statutory Certification Committee Resolution',
      criteria: 'Impartial review of desk dossier, auditor field report, corrective action requests (CAR), and lab analytical results.',
      desc: 'An independent certification committee composed of external agronomy scientists, soil chemists, and quality experts convenes to evaluate the complete docket anonymously. The committee scrutinizes auditor findings, laboratory reports, and any Corrective Action Requests (CARs) to formulate a binding statutory resolution.'
    },
    {
      num: '06',
      title: 'Scope Certificate Issuance & Tracenet Entry',
      timeline: 'Days 56–60',
      actor: 'Chief Certification Officer & Tracenet IT Cell',
      deliverable: 'NPOP Scope Certificate Delivered',
      criteria: 'Tracenet digital registry synchronization, QR code generation, volume estimation, conversion status assignment (C1/C2/C3/Organic).',
      desc: 'Upon committee sanction, the statutory NPOP Scope Certificate is formally generated on the APEDA national Tracenet portal. The certificate incorporates a cryptographic QR code specifying registered survey numbers, audited hectarage, certified crops, annual tonnage quotas, and current conversion status (C1, C2, C3, or Certified Organic).'
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Statutory 60-Day Audit Cycle</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Certification Workflow Pipeline
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Standard operating procedure for third-party organic verification of individual farmers, Grower Groups (ICS), and bio-input producers under NPOP and ISO/IEC 17065.
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Visual Timeline Header */}
        <div>
          <div className="lapland-subtitle mb-2">
            6-Stage Statutory Pipeline
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
            Chronological audit journey.
          </h2>
          <p className="mt-1 text-sm text-[#5B6760]">
            From Form Submission to APEDA Tracenet Scope Certificate Issuance in 60 Days.
          </p>
        </div>

        {/* 6-Stage Detailed Cards */}
        <div className="space-y-6">
          {stages.map((st) => (
            <div 
              key={st.num}
              className="bg-white rounded-[3px] p-6 sm:p-8 border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Stage Number & Title */}
                <div className="flex items-start gap-4">
                  <span className="font-editorial text-3xl sm:text-4xl text-[#C49A5A] font-normal flex-shrink-0 w-12">
                    {st.num}
                  </span>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6221] bg-[#FAF4E8] px-2.5 py-0.5 rounded-[2px] border border-[#EEDDBF]">
                        {st.timeline}
                      </span>
                      <span className="text-xs text-[#627068]">
                        Responsible: <strong className="text-[#18221D]">{st.actor}</strong>
                      </span>
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#18221D]">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B53] leading-relaxed pt-1 max-w-3xl">
                      {st.desc}
                    </p>
                  </div>
                </div>

                {/* Milestone Deliverable Box */}
                <div className="lg:w-72 bg-[#FAF8F5] p-4 rounded-[2px] border border-[#EAE6DE] flex-shrink-0 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B3E2B] uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A]" />
                    <span>Stage Milestone</span>
                  </div>
                  <p className="text-xs font-bold text-[#18221D]">
                    {st.deliverable}
                  </p>
                  <p className="text-[11px] text-[#69766F] border-t border-[#EAE6DE] pt-1.5 mt-1">
                    <strong>Statutory Criteria:</strong> {st.criteria}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Workflow Matrix Table */}
        <section className="space-y-6">
          <div>
            <div className="lapland-subtitle mb-2">
              Statutory Matrix
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
              Workflow matrix table.
            </h2>
          </div>

          <div className="w-full bg-white rounded-[3px] border border-[#EAE6DE] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F6F3EC] text-[#34413A] border-b border-[#E5E1D8]">
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Stage</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Stage Name</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Timeline</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Responsible Actor</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Milestone Deliverable</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Statutory Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE5] text-[#2C3831]">
                  {stages.map((s) => (
                    <tr key={s.num} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4 font-editorial font-bold text-base text-[#C49A5A]">{s.num}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#18221D]">{s.title}</td>
                      <td className="py-3.5 px-4 font-medium text-[#8C6221] whitespace-nowrap">{s.timeline}</td>
                      <td className="py-3.5 px-4 text-[#4C5852]">{s.actor}</td>
                      <td className="py-3.5 px-4 font-medium text-[#1B3E2B]">{s.deliverable}</td>
                      <td className="py-3.5 px-4 text-xs text-[#55635B] max-w-xs">{s.criteria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
