import React from 'react';
import AboutSubNav from '../components/AboutSubNav';
import DynamicTable from '../components/DynamicTable';
import { useCMS } from '../context/CMSContext';
import { Award, ShieldCheck, UserCheck } from 'lucide-react';

export default function PersonnelPage() {
  const { personnel } = useCMS();

  // Column definitions strictly matching specification:
  // 1. Name
  // 2. Designation
  // 3. Cadre (Field Inspection & Audit / Technical Scrutiny / Administration)
  // 4. Qualification
  // 5. Responsibilities
  // 6. Status (Permanent / Deputation)
  const columns = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      render: (val, row) => (
        <div>
          <div className="font-semibold text-[#18221D]">{row.name}</div>
          <div className="text-[11px] text-[#718077] font-mono">{row.id}</div>
        </div>
      )
    },
    {
      key: 'designation',
      label: 'Designation',
      type: 'text'
    },
    {
      key: 'cadre',
      label: 'Cadre',
      type: 'badge',
      options: ['Field Inspection & Audit', 'Technical Scrutiny', 'Administration']
    },
    {
      key: 'qualification',
      label: 'Qualification',
      type: 'text'
    },
    {
      key: 'responsibilities',
      label: 'Responsibilities',
      type: 'text'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      options: ['Permanent', 'Deputation']
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
              <span>Technical Competence & Cadre</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Personnel & Auditors Cadre
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Official roster of technical officers, certified lead auditors, and organic farm inspectors meeting ISO/IEC 17065 qualification requirements and NPOP competency standards.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Cadre Qualification Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-[3px] border border-[#EAE6DE] shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-[2px] bg-[#FAF8F5] text-[#1B3E2B]">
              <Award className="w-5 h-5 text-[#C49A5A]" />
            </div>
            <div>
              <h4 className="font-editorial text-base text-[#18221D]">ISO/IEC 17065 Qualified</h4>
              <p className="text-xs text-[#525E57] mt-0.5">Auditors certified in third-party product certification methodologies.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[3px] border border-[#EAE6DE] shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-[2px] bg-[#FAF8F5] text-[#1B3E2B]">
              <ShieldCheck className="w-5 h-5 text-[#C49A5A]" />
            </div>
            <div>
              <h4 className="font-editorial text-base text-[#18221D]">Impartiality Safeguards</h4>
              <p className="text-xs text-[#525E57] mt-0.5">Auditors prohibited from providing consulting to operators they inspect.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[3px] border border-[#EAE6DE] shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-[2px] bg-[#FAF8F5] text-[#1B3E2B]">
              <UserCheck className="w-5 h-5 text-[#C49A5A]" />
            </div>
            <div>
              <h4 className="font-editorial text-base text-[#18221D]">Continuous Surveillance</h4>
              <p className="text-xs text-[#525E57] mt-0.5">Regular peer evaluations, witness audits, and refresher training under APEDA.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Personnel Table (Read-Only for Public Website) */}
        <DynamicTable
          tableId="personnel"
          title="Official Auditor & Technical Personnel Roster"
          subtitle="Real-time searchable personnel directory backed by browser localStorage and REST API"
          columns={columns}
          data={personnel}
          enableAdd={false}
          enableEdit={false}
          enableDelete={false}
          enableReset={false}
          enableExport={true}
        />

        {/* Cadre Classification Note */}
        <div className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] text-xs text-[#4F5D54] space-y-2">
          <p className="font-semibold text-[#18221D] uppercase tracking-wider text-[11px]">
            Cadre Classification Criteria
          </p>
          <ul className="list-disc list-inside space-y-1 text-[#4F5D54]">
            <li><strong>Field Inspection & Audit:</strong> Authorized to perform unannounced farm visits, verify 7/12 land records, draw sealed multi-residue soil/leaf samples, and evaluate buffer demarcations.</li>
            <li><strong>Technical Scrutiny:</strong> Senior agronomists and lab specialists responsible for vetting laboratory gas chromatography reports, review of conversion dossiers, and drafting statutory recommendations.</li>
            <li><strong>Administration:</strong> Secretariat legal officers, Tracenet IT administrators, and finance ledger managers ensuring seamless public transparency and RTI disclosures.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
