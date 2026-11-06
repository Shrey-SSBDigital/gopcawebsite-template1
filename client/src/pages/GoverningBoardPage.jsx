import React from 'react';
import AboutSubNav from '../components/AboutSubNav';
import DynamicTable from '../components/DynamicTable';
import { useCMS } from '../context/CMSContext';
import { Shield, Info } from 'lucide-react';

export default function GoverningBoardPage() {
  const { governingBoard } = useCMS();

  // Column definitions strictly matching specification:
  // Col 1: Logo
  // Col 2: Governance Role
  // Col 3: Designation & Department
  // Col 4: Jurisdiction / Location
  // Col 5: Statutory Governance Function
  const columns = [
    {
      key: 'logo',
      label: 'Logo',
      type: 'logo'
    },
    {
      key: 'role',
      label: 'Governance Role',
      type: 'badge'
    },
    {
      key: 'designation',
      label: 'Designation & Department',
      type: 'text',
      render: (val, row) => (
        <div>
          <div className="font-medium text-[#18221D]">{row.designation}</div>
          <div className="text-xs text-[#5C6A62] mt-0.5">{row.department}</div>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Jurisdiction / Location',
      type: 'text'
    },
    {
      key: 'function',
      label: 'Statutory Governance Function',
      type: 'text'
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
              <span>Statutory Governing Council</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Apex Governing Board
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              The apex statutory governing authority provides strategic oversight, policy direction, financial scrutiny, and standard compliance review for GOPCA.
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Intro Banner */}
        <div className="bg-white p-6 rounded-[3px] border border-[#EAE6DE] shadow-sm flex items-start gap-4">
          <div className="p-2.5 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE] text-[#1B3E2B] flex-shrink-0">
            <Shield className="w-5 h-5 text-[#C49A5A]" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-[#4A5750] leading-relaxed">
            <h3 className="font-editorial text-lg text-[#18221D]">
              Statutory Mandate of the Governing Board
            </h3>
            <p>
              In accordance with the Constitution of GOPCA registered under the Societies Registration Act, 1860, the Governing Board serves as the sovereign council ensuring rigorous adherence to APEDA National Programme for Organic Production (NPOP) benchmarks and ISO/IEC 17065 impartiality mandates.
            </p>
          </div>
        </div>

        {/* Dynamic Governing Board Table (Read-Only for Public Website) */}
        <DynamicTable
          tableId="governing_board"
          title="Statutory Governing Council Members"
          subtitle="Designated council members with state, academic, statutory, and grower representation"
          columns={columns}
          data={governingBoard}
          enableAdd={false}
          enableEdit={false}
          enableDelete={false}
          enableReset={false}
          enableExport={true}
        />

        {/* Statutory Note Card */}
        <div className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] space-y-2">
          <div className="flex items-center gap-2 text-[#18221D] font-semibold text-xs uppercase tracking-wider">
            <Info className="w-4 h-4 text-[#C49A5A]" />
            <span>Statutory Note on Governance Operations</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4E5C54] leading-relaxed">
            The Governing Board convenes periodically in Gandhinagar or Ahmedabad to review annual statewide inspection schedules, audit findings, lab residue reports, audited annual balance sheets, and accreditation surveillance assessments under NPOP and NAB/APEDA. Decisions regarding certification fee structures and sanction enforcements require formal approval of this council.
          </p>
        </div>

      </div>
    </div>
  );
}
