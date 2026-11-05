import React from 'react';
import { useLocation } from 'react-router-dom';
import OperatorSubNav from '../components/OperatorSubNav';
import DynamicTable from '../components/DynamicTable';
import { useCMS } from '../context/CMSContext';
import { GUJARAT_DISTRICTS } from '../data/defaultData';
import { Users, MapPin, ArrowRight } from 'lucide-react';

export default function OperatorRegistryPage() {
  const location = useLocation();
  const { operators, addTableRow, deleteTableRow, resetTable } = useCMS();

  const currentPath = location.pathname;
  let viewType = 'active';
  let title = 'Active ICS Operator Registry';
  let subtitle = 'Accredited Grower Groups (ICS), commercial estates, and certified input manufacturers';
  let tableId = 'operators_active';

  if (currentPath.includes('/operators/farmers')) {
    viewType = 'farmers';
    title = 'Grower Group Member Farmers Directory';
    subtitle = 'Individual smallholder member farmers certified under Group ICS scopes across Gujarat';
    tableId = 'operators_farmers';
  } else if (currentPath.includes('/operators/suspended')) {
    viewType = 'suspended';
    title = 'Suspended Operators Registry';
    subtitle = 'Operators currently under temporary statutory suspension pending corrective remediation';
    tableId = 'operators_suspended';
  } else if (currentPath.includes('/operators/terminated')) {
    viewType = 'terminated';
    title = 'Terminated Operators Registry';
    subtitle = 'Entities whose certification has been permanently revoked under NPOP sanctions';
    tableId = 'operators_terminated';
  } else if (currentPath.includes('/operators/discontinued')) {
    viewType = 'discontinued';
    title = 'Discontinued Operators Registry';
    subtitle = 'Operators who voluntarily opted out or transitioned without compliance violations';
    tableId = 'operators_discontinued';
  }

  const data = operators.filter(op => op.type === viewType);

  const activeColumns = [
    {
      key: 'registrationId',
      label: 'Registration ID',
      type: 'text',
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-[#18221D] bg-[#FAF8F5] border border-[#EAE6DE] px-2 py-0.5 rounded-[2px]">
          {val}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Operator / Organization Name',
      type: 'text',
      render: (val, row) => (
        <div>
          <div className="font-semibold text-[#18221D]">{val}</div>
          {row.memberCount && row.memberCount > 1 && (
            <div className="text-[11px] text-[#69766F] flex items-center gap-1 mt-0.5">
              <Users className="w-3 h-3 text-[#C49A5A]" />
              <span>{row.memberCount} Smallholder Members</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category / Scope',
      type: 'badge',
      options: ['Grower Group (ICS)', 'Individual Farm', 'Approved Bio-Inputs', 'Processing Unit', 'Organic Wild Harvest']
    },
    {
      key: 'district',
      label: 'District & Village',
      type: 'text',
      render: (val, row) => (
        <div>
          <div className="font-medium text-[#18221D] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#C49A5A]" />
            <span>{val}</span>
          </div>
          <div className="text-[11px] text-[#69766F]">{row.village}</div>
        </div>
      )
    },
    {
      key: 'crops',
      label: 'Certified Crops',
      type: 'text'
    },
    {
      key: 'hectarage',
      label: 'Hectarage (Ha)',
      type: 'number'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'badge'
    },
    {
      key: 'validity',
      label: 'Validity Date',
      type: 'date'
    }
  ];

  const farmersColumns = [
    {
      key: 'registrationId',
      label: 'Member ID',
      type: 'text',
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-[#18221D] bg-[#FAF8F5] border border-[#EAE6DE] px-2 py-0.5 rounded-[2px]">
          {val}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Farmer Name',
      type: 'text'
    },
    {
      key: 'groupName',
      label: 'Parent FPO / Grower Group',
      type: 'text',
      render: (val) => <span className="font-medium text-[#1B3E2B] text-xs">{val}</span>
    },
    {
      key: 'district',
      label: 'District & Survey 7/12',
      type: 'text',
      render: (val, row) => (
        <div>
          <div className="font-semibold text-[#18221D]">{val}</div>
          <div className="text-[11px] text-[#69766F]">{row.village}</div>
        </div>
      )
    },
    {
      key: 'crops',
      label: 'Certified Crops',
      type: 'text'
    },
    {
      key: 'hectarage',
      label: 'Plot Area (Ha)',
      type: 'number'
    },
    {
      key: 'status',
      label: 'Conversion Status',
      type: 'badge'
    },
    {
      key: 'validity',
      label: 'Validity Date',
      type: 'date'
    }
  ];

  const sanctionColumns = [
    {
      key: 'registrationId',
      label: 'Registration ID',
      type: 'text',
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-[#18221D] bg-[#FAF8F5] border border-[#EAE6DE] px-2 py-0.5 rounded-[2px]">
          {val}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Operator Name',
      type: 'text'
    },
    {
      key: 'category',
      label: 'Category',
      type: 'badge'
    },
    {
      key: 'district',
      label: 'District',
      type: 'text'
    },
    {
      key: 'status',
      label: 'Sanction Status',
      type: 'badge'
    },
    {
      key: 'validity',
      label: 'Effective Date',
      type: 'text'
    },
    {
      key: 'reason',
      label: 'Statutory Finding / Cause of Sanction',
      type: 'text',
      render: (val) => <span className="text-xs text-red-900 leading-relaxed">{val}</span>
    }
  ];

  const columns = viewType === 'farmers' 
    ? farmersColumns 
    : (viewType === 'active' ? activeColumns : sanctionColumns);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      {/* Sub-Navigation for Registry */}
      <OperatorSubNav />

      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Statutory Transparency Directory</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Official public disclosure directory maintained in compliance with NPOP criteria, APEDA Tracenet registry norms, and Section 4(1)(b) of the RTI Act.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Dynamic Table for Operators */}
        <DynamicTable
          tableId={tableId}
          title={title}
          subtitle={subtitle}
          columns={columns}
          data={data}
          onAddRow={(newRow) => addTableRow(tableId, newRow)}
          onDeleteRow={(id) => deleteTableRow(tableId, id)}
          onReset={() => resetTable(tableId)}
          enableAdd={true}
          enableDelete={true}
          enableReset={true}
          enableExport={true}
          filterDistrict={true}
          districtList={GUJARAT_DISTRICTS}
        />

        {/* Tracenet Verification Note */}
        <div className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-editorial text-xl text-[#18221D]">
              Real-time APEDA Tracenet cryptographic verification.
            </h4>
            <p className="text-xs text-[#56635D]">
              Every official Scope Certificate issued by GOPCA contains a QR code linked to the Central Government APEDA Tracenet system.
            </p>
          </div>
          <a
            href="https://apeda.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lapland whitespace-nowrap text-xs"
          >
            <span>Open APEDA Tracenet Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
