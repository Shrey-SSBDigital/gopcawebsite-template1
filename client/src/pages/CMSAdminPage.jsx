import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import DynamicTable from '../components/DynamicTable';
import { GUJARAT_DISTRICTS } from '../data/defaultData';
import { Database, Server, ShieldCheck } from 'lucide-react';

export default function CMSAdminPage() {
  const { 
    getTableRows, 
    addTableRow, 
    deleteTableRow, 
    resetTable 
  } = useCMS();

  const [activeTableId, setActiveTableId] = useState('personnel');

  const tables = [
    {
      id: 'personnel',
      name: 'Personnel & Auditors Cadre',
      desc: 'ISO 17065 lead auditors, field inspectors, and technical officers',
      badge: 'Auditors',
      columns: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'designation', label: 'Designation', type: 'text' },
        { key: 'cadre', label: 'Cadre', type: 'badge', options: ['Field Inspection & Audit', 'Technical Scrutiny', 'Administration'] },
        { key: 'qualification', label: 'Qualification', type: 'text' },
        { key: 'responsibilities', label: 'Responsibilities', type: 'text' },
        { key: 'status', label: 'Status', type: 'badge', options: ['Permanent', 'Deputation'] }
      ]
    },
    {
      id: 'governing_board',
      name: 'Apex Governing Board',
      desc: 'Statutory governing council members with logos, designations, and roles',
      badge: 'Council',
      columns: [
        { key: 'logo', label: 'Logo', type: 'logo' },
        { key: 'role', label: 'Role', type: 'badge' },
        { key: 'designation', label: 'Designation', type: 'text' },
        { key: 'department', label: 'Department', type: 'text' },
        { key: 'location', label: 'Jurisdiction', type: 'text' },
        { key: 'function', label: 'Statutory Governance Function', type: 'text' }
      ]
    },
    {
      id: 'operators_active',
      name: 'Active ICS Operator Registry',
      desc: 'Accredited Grower Groups (ICS), bio-input producers, and estates',
      badge: 'Registry',
      filterDistrict: true,
      columns: [
        { key: 'registrationId', label: 'Registration ID', type: 'text' },
        { key: 'name', label: 'Operator / Organization Name', type: 'text' },
        { key: 'category', label: 'Category / Scope', type: 'badge', options: ['Grower Group (ICS)', 'Individual Farm', 'Approved Bio-Inputs', 'Processing Unit'] },
        { key: 'district', label: 'District', type: 'text' },
        { key: 'village', label: 'Village', type: 'text' },
        { key: 'crops', label: 'Certified Crops', type: 'text' },
        { key: 'hectarage', label: 'Hectarage (Ha)', type: 'number' },
        { key: 'status', label: 'Status', type: 'badge' },
        { key: 'validity', label: 'Validity Date', type: 'date' }
      ]
    },
    {
      id: 'operators_farmers',
      name: 'Grower Group Member Farmers',
      desc: 'Individual smallholder member farmers certified under Group ICS scopes',
      badge: 'Farmers',
      filterDistrict: true,
      columns: [
        { key: 'registrationId', label: 'Member ID', type: 'text' },
        { key: 'name', label: 'Farmer Name', type: 'text' },
        { key: 'groupName', label: 'Parent FPO / Grower Group', type: 'text' },
        { key: 'district', label: 'District', type: 'text' },
        { key: 'village', label: 'Village & Survey 7/12', type: 'text' },
        { key: 'crops', label: 'Crop Scope', type: 'text' },
        { key: 'hectarage', label: 'Plot Area (Ha)', type: 'number' },
        { key: 'status', label: 'Conversion Status', type: 'badge' },
        { key: 'validity', label: 'Validity Date', type: 'date' }
      ]
    },
    {
      id: 'operators_suspended',
      name: 'Suspended Operators Registry',
      desc: 'Operators under temporary statutory sanction with pending corrective actions',
      badge: 'Sanctions',
      columns: [
        { key: 'registrationId', label: 'Registration ID', type: 'text' },
        { key: 'name', label: 'Operator Name', type: 'text' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'district', label: 'District', type: 'text' },
        { key: 'status', label: 'Status', type: 'badge' },
        { key: 'validity', label: 'Notice Date', type: 'text' },
        { key: 'reason', label: 'Statutory Reason for Suspension', type: 'text' }
      ]
    },
    {
      id: 'operators_terminated',
      name: 'Terminated Operators Registry',
      desc: 'De-registered entities permanently revoked under NPOP sanctions',
      badge: 'Sanctions',
      columns: [
        { key: 'registrationId', label: 'Registration ID', type: 'text' },
        { key: 'name', label: 'Operator Name', type: 'text' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'district', label: 'District', type: 'text' },
        { key: 'status', label: 'Status', type: 'badge' },
        { key: 'validity', label: 'De-registration Date', type: 'text' },
        { key: 'reason', label: 'Statutory Termination Cause & APEDA Intimation', type: 'text' }
      ]
    },
    {
      id: 'operators_discontinued',
      name: 'Discontinued Operators Registry',
      desc: 'Voluntary cessations or operators who transitioned out of organic certification',
      badge: 'Transitions',
      columns: [
        { key: 'registrationId', label: 'Registration ID', type: 'text' },
        { key: 'name', label: 'Operator Name', type: 'text' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'district', label: 'District', type: 'text' },
        { key: 'status', label: 'Status', type: 'badge' },
        { key: 'validity', label: 'Discontinuation Date', type: 'text' },
        { key: 'reason', label: 'Reason for Discontinuation', type: 'text' }
      ]
    },
    {
      id: 'downloads',
      name: 'Document Download Center',
      desc: 'Application forms, circulars, inspection schedules, and RTI disclosures',
      badge: 'Documents',
      columns: [
        { key: 'code', label: 'File Code', type: 'text' },
        { key: 'title', label: 'Document Title', type: 'text' },
        { key: 'category', label: 'Category', type: 'badge', options: ['Application Forms', 'Directives & Plans', 'RTI Disclosures'] },
        { key: 'format', label: 'Format', type: 'badge' },
        { key: 'size', label: 'Size', type: 'text' },
        { key: 'issuingWing', label: 'Issuing Wing', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' }
      ]
    },
    {
      id: 'fee_schedule',
      name: 'Fee Schedule & Tariffs',
      desc: 'Statutory fee matrix for individual farmers, ICS, packhouses, and inputs',
      badge: 'Finance',
      columns: [
        { key: 'category', label: 'Category', type: 'text' },
        { key: 'scrutinyFee', label: 'Scrutiny Fee (₹)', type: 'number' },
        { key: 'inspectionFee', label: 'Inspection Fee (₹)', type: 'number' },
        { key: 'gstRate', label: 'GST Rate (%)', type: 'number' },
        { key: 'applicability', label: 'Applicability Criteria', type: 'text' }
      ]
    }
  ];

  const currentTableConfig = tables.find(t => t.id === activeTableId) || tables[0];
  const currentData = getTableRows(activeTableId);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Studio Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Full-Stack MERN Dynamic CMS Studio</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal leading-tight">
              Dynamic Table Content Management
            </h1>
            <p className="text-xs sm:text-sm text-[#D0E2D7] max-w-2xl leading-relaxed">
              Manage statutory data, add records, edit entries, export CSVs, and synchronize with the Express/MongoDB backend or browser local storage in real-time.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-[2px] border border-white/20 text-xs space-y-1.5 flex-shrink-0">
            <div className="flex items-center gap-2 text-[#D8B57E] font-medium">
              <Server className="w-4 h-4 text-[#C49A5A]" />
              <span>MERN Backend Active</span>
            </div>
            <p className="text-[11px] text-[#A6C4B5]">Local REST API: <code>/api/cms/tables</code></p>
            <p className="text-[11px] text-[#A6C4B5]">Dual Persistence: Memory/JSON + LocalStorage</p>
          </div>
        </div>
      </section>

      {/* Main Studio Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        
        {/* Table Selector Tabs */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-3">
            Select Dynamic Table to Manage ({tables.length} Registered Tables):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tables.map((t) => {
              const count = getTableRows(t.id).length;
              const isActive = t.id === activeTableId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTableId(t.id)}
                  className={`p-3.5 rounded-[2px] border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#1B3E2B] text-white border-[#1B3E2B] shadow-sm'
                      : 'bg-white text-[#18221D] border-[#D5D0C6] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider mb-1">
                    <span className={isActive ? 'text-[#D8B57E]' : 'text-[#8C744F]'}>
                      {t.badge}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${isActive ? 'bg-[#142C1F] text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {count} rows
                    </span>
                  </div>
                  <h4 className="font-editorial text-sm line-clamp-1">
                    {t.name}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Table Render */}
        <div className="space-y-4">
          <DynamicTable
            tableId={currentTableConfig.id}
            title={currentTableConfig.name}
            subtitle={currentTableConfig.desc}
            columns={currentTableConfig.columns}
            data={currentData}
            onAddRow={(newRow) => addTableRow(currentTableConfig.id, newRow)}
            onDeleteRow={(id) => deleteTableRow(currentTableConfig.id, id)}
            onReset={() => resetTable(currentTableConfig.id)}
            enableAdd={true}
            enableDelete={true}
            enableReset={true}
            enableExport={true}
            filterDistrict={currentTableConfig.filterDistrict}
            districtList={GUJARAT_DISTRICTS}
          />
        </div>

        {/* CMS Architecture Note */}
        <div className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm text-xs text-[#525E57] space-y-2">
          <div className="flex items-center gap-2 font-semibold text-[#18221D] uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#C49A5A]" />
            <span>Extensible Dynamic Schema Architecture</span>
          </div>
          <p className="leading-relaxed">
            All tables in this GOPCA web application are dynamically driven by metadata column schemas. This architecture allows developers and administrators to add custom columns, define validation criteria, filter by custom criteria (e.g. Gujarat's 33 districts), export real-time CSV reports, and sync directly with MongoDB Mongoose models or external government APIs like APEDA Tracenet.
          </p>
        </div>

      </div>
    </div>
  );
}
