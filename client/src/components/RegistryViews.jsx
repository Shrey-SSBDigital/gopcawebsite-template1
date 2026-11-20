import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { districtsList } from '../data/staticData';
import { Search, MapPin, Eye, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export const RegistryViews = ({ registerType, onNavigate, onSelectOperator }) => {
  const {
    operators,
    growerFarmers,
    approvedInputs,
    inspectionPlan,
    discontinuedOps,
    terminatedOps,
    suspendedOps
  } = useCMS();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const filteredIndividual = useMemo(() => {
    return operators.filter((o) => {
      const isInd = o.operatorType === 'Individual Farmer';
      const matchDist = selectedDistrict === 'All' || o.district === selectedDistrict;
      const term = searchTerm.toLowerCase();
      const matchSearch =
        term === '' ||
        o.name.toLowerCase().includes(term) ||
        o.registrationNumber.toLowerCase().includes(term) ||
        o.village.toLowerCase().includes(term) ||
        (o.cropTypes && o.cropTypes.some((c) => c.toLowerCase().includes(term)));
      return isInd && matchDist && matchSearch;
    });
  }, [operators, searchTerm, selectedDistrict]);

  const filteredICS = useMemo(() => {
    return operators.filter((o) => {
      const isICS = o.operatorType === 'Grower Group (ICS)';
      const matchDist = selectedDistrict === 'All' || o.district === selectedDistrict;
      const term = searchTerm.toLowerCase();
      const matchSearch =
        term === '' ||
        o.name.toLowerCase().includes(term) ||
        o.registrationNumber.toLowerCase().includes(term) ||
        o.district.toLowerCase().includes(term);
      return isICS && matchDist && matchSearch;
    });
  }, [operators, searchTerm, selectedDistrict]);

  const filteredFarmers = useMemo(() => {
    return growerFarmers.filter((f) => {
      const term = searchTerm.toLowerCase();
      const name = (f.farmerName || '').toLowerCase();
      const group = (f.growerGroup || f.groupName || '').toLowerCase();
      const reg = (f.groupRegNo || f.traceNetId || '').toLowerCase();
      const dist = (f.district || '').toLowerCase();
      const crops = (f.majorCrops || f.crop || '').toLowerCase();
      return (
        term === '' ||
        name.includes(term) ||
        group.includes(term) ||
        reg.includes(term) ||
        dist.includes(term) ||
        crops.includes(term)
      );
    });
  }, [growerFarmers, searchTerm]);

  const filteredInputs = useMemo(() => {
    return approvedInputs.filter((i) => {
      const term = searchTerm.toLowerCase();
      const prod = (i.productName || '').toLowerCase();
      const mfr = (i.producerName || i.producer || '').toLowerCase();
      const use = (i.use || '').toLowerCase();
      return (
        term === '' ||
        prod.includes(term) ||
        mfr.includes(term) ||
        use.includes(term)
      );
    });
  }, [approvedInputs, searchTerm]);

  const getTitle = () => {
    switch (registerType) {
      case 'active-individual':
        return "Active Operator's List (Crop - Individual)";
      case 'active-ics':
        return "Active Operator's List (Grower Group / ICS)";
      case 'farmer-details':
        return 'Grower Group Farmers Details';
      case 'approved-inputs':
        return 'GOPCA Approved Inputs List';
      case 'inspection-plan':
        return 'Annual Inspection Plan 2026';
      case 'discontinued':
        return 'List of Discontinued Operators';
      case 'terminated':
        return 'List of Terminated Operators';
      case 'suspended':
        return 'Suspended Operators List';
      default:
        return 'Statutory Operator Register';
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C6D37] uppercase tracking-widest font-semibold mb-3">
          <button onClick={() => onNavigate('home')} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <span>Registers & Resources</span>
          <span>/</span>
          <span className="text-[#18231C]">{getTitle()}</span>
        </div>

        {/* Header with Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#17221A] leading-tight mb-2">
              {getTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-[#4A574E]">
              Public record maintained by the Gujarat Organic Products Certification Agency under NPOP accreditation NPOP/NAB/0028.
            </p>
          </div>

          {/* Search Filter */}
          {['active-individual', 'active-ics', 'farmer-details', 'approved-inputs'].includes(registerType) && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter records..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] focus:outline-none focus:border-[#1B3826]"
                />
              </div>

              {['active-individual', 'active-ics'].includes(registerType) && (
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] focus:outline-none focus:border-[#1B3826]"
                >
                  {districtsList.map((d) => (
                    <option key={d} value={d}>
                      {d === 'All' ? 'All Districts' : d}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

        {/* View 1: Active Individual */}
        {registerType === 'active-individual' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[720px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                    <th className="py-3.5 px-4">Operator Name & Reg No.</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Crops</th>
                    <th className="py-3.5 px-4">Area (Ha)</th>
                    <th className="py-3.5 px-4">Status & Validity</th>
                    <th className="py-3.5 px-4 text-right">Scope Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {filteredIndividual.map((op) => (
                    <tr key={op.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm text-[#18231C]">{op.name}</div>
                        <div className="text-[11px] text-[#6F7D73] font-mono mt-0.5">{op.registrationNumber}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div>{op.village}</div>
                        <div className="text-[11px] text-[#6F7D73]">Taluka {op.taluka}, Dist. {op.district}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {op.cropTypes?.map((c, i) => (
                            <span key={i} className="text-[11px] bg-[#FAF8F5] border border-[#E3DBD0] px-2 py-0.5 rounded text-[#334237]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-medium text-[#18231C]">
                        {Number(op.totalAreaHectares || 0).toFixed(2)} Ha
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          {op.status}
                        </span>
                        <div className="text-[10px] text-[#78887D] font-mono mt-0.5">Valid to {op.validUntil}</div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onSelectOperator(op)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-lg hover:bg-[#1B3826] hover:text-white transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 2: Active ICS Groups */}
        {registerType === 'active-ics' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                    <th className="py-3.5 px-4">Grower Group Name & Reg No.</th>
                    <th className="py-3.5 px-4">Location (District)</th>
                    <th className="py-3.5 px-4">Member Farmers</th>
                    <th className="py-3.5 px-4">Certified Area</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {filteredICS.map((op) => (
                    <tr key={op.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm text-[#18231C]">{op.name}</div>
                        <div className="text-[11px] text-[#6F7D73] font-mono mt-0.5">{op.registrationNumber}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div>Taluka {op.taluka || 'District Cluster'}</div>
                        <div className="text-[11px] text-[#6F7D73]">Dist. {op.district}</div>
                      </td>
                      <td className="py-4 px-4 font-mono font-medium text-[#1B3826]">
                        {op.farmerCount} Farmers
                      </td>
                      <td className="py-4 px-4 font-mono font-medium text-[#18231C]">
                        {Number(op.totalAreaHectares || 0).toFixed(2)} Ha
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          {op.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onSelectOperator(op)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-lg hover:bg-[#1B3826] hover:text-white transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Group Certificate</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 3: Grower Group Farmers Details */}
        {registerType === 'farmer-details' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                    <th className="py-3.5 px-4">Sr.</th>
                    <th className="py-3.5 px-4">Farmer Name</th>
                    <th className="py-3.5 px-4">Father / Husband</th>
                    <th className="py-3.5 px-4">Grower Group & Reg No.</th>
                    <th className="py-3.5 px-4">Village / District</th>
                    <th className="py-3.5 px-4">Major Crops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {filteredFarmers.map((f) => (
                    <tr key={f.srNo} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[#8C6D37] font-semibold">{f.srNo}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#18231C]">{f.farmerName}</td>
                      <td className="py-3.5 px-4 text-[#526055]">{f.fatherHusbandName}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#18231C]">{f.growerGroup}</div>
                        <div className="text-[11px] text-[#718075] font-mono">{f.groupRegNo}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{f.village}</div>
                        <div className="text-[11px] text-[#718075]">Dist. {f.district}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#2A372E]">{f.majorCrops}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 4: Approved Inputs */}
        {registerType === 'approved-inputs' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                    <th className="py-3.5 px-4">Sr.</th>
                    <th className="py-3.5 px-4">Producer / Company Name</th>
                    <th className="py-3.5 px-4">Product Name & Formulation</th>
                    <th className="py-3.5 px-4">Approved Use / Category</th>
                    <th className="py-3.5 px-4 font-mono">Validity Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {filteredInputs.map((inp, idx) => (
                    <tr key={inp.id || idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[#8C6D37] font-semibold">{inp.srNo || idx + 1}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#18231C]">{inp.producerName || inp.producer}</td>
                      <td className="py-3.5 px-4 font-medium text-[#1B3826]">{inp.productName}</td>
                      <td className="py-3.5 px-4 text-[#526055]">{inp.use}</td>
                      <td className="py-3.5 px-4 font-mono text-[#2D5A3C] font-semibold">{inp.validity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 5: Inspection Plan 2026 */}
        {registerType === 'inspection-plan' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                    <th className="py-3.5 px-4">Month</th>
                    <th className="py-3.5 px-4">Total Operators Target</th>
                    <th className="py-3.5 px-4">Announced Audits</th>
                    <th className="py-3.5 px-4">Additional Audits</th>
                    <th className="py-3.5 px-4">Unannounced Audits</th>
                    <th className="py-3.5 px-4">Samples to be Drawn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {inspectionPlan.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#18231C]">{p.month}</td>
                      <td className="py-3.5 px-4 font-mono font-medium text-[#1B3826]">{p.numOperators || p.operators}</td>
                      <td className="py-3.5 px-4 font-mono">{p.announcedInspections || p.announced}</td>
                      <td className="py-3.5 px-4 font-mono">{p.additionalInspections || p.additional}</td>
                      <td className="py-3.5 px-4 font-mono text-amber-800 font-semibold">{p.unannouncedInspections || p.unannounced}</td>
                      <td className="py-3.5 px-4 font-mono text-[#2A4D37] font-semibold">{p.sampleDrawn || p.samples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 6: Suspended Operators */}
        {registerType === 'suspended' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-rose-800 font-semibold">
                    <th className="py-3.5 px-4">Sr.</th>
                    <th className="py-3.5 px-4">Operator Name & Reg No.</th>
                    <th className="py-3.5 px-4">District</th>
                    <th className="py-3.5 px-4">Status & Action Date</th>
                    <th className="py-3.5 px-4">Certification Body (CB) Remarks / Reasons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {suspendedOps.map((op, idx) => (
                    <tr key={op.srNo || idx} className="hover:bg-rose-50/40 transition-colors">
                      <td className="py-4 px-4 font-mono text-rose-700 font-semibold">{op.srNo || idx + 1}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm text-[#18231C]">{op.operatorName || op.name}</div>
                        <div className="text-[11px] text-[#6F7D73] font-mono mt-0.5">{op.registrationNo || op.regNo}</div>
                      </td>
                      <td className="py-4 px-4">{op.district}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold text-xs">
                          {op.action || 'Suspended'}
                        </span>
                        <div className="text-[10px] text-[#78887D] font-mono mt-0.5">Effective {op.actionFromDate}</div>
                      </td>
                      <td className="py-4 px-4 text-rose-900 italic max-w-md">
                        {op.cbRemarks || op.remarks || `Suspension active from ${op.actionFromDate || ''} to ${op.actionToDate || op.validityEnd || ''}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 7: Terminated Operators */}
        {registerType === 'terminated' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-red-800 font-semibold">
                    <th className="py-3.5 px-4">Sr.</th>
                    <th className="py-3.5 px-4">Operator Name & Reg No.</th>
                    <th className="py-3.5 px-4">Scope Certificate No.</th>
                    <th className="py-3.5 px-4">Action Date</th>
                    <th className="py-3.5 px-4">Violation Details & Residue Finding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {terminatedOps.map((op, idx) => (
                    <tr key={op.srNo || idx} className="hover:bg-red-50/40 transition-colors">
                      <td className="py-4 px-4 font-mono text-red-700 font-semibold">{op.srNo || idx + 1}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm text-[#18231C]">{op.operatorName || op.name}</div>
                        <div className="text-[11px] text-[#6F7D73] font-mono mt-0.5">{op.registrationNo || op.regNo}</div>
                      </td>
                      <td className="py-4 px-4 font-mono text-[#526055]">{op.scopeCertificateNo || op.scopeCertNo || '—'}</td>
                      <td className="py-4 px-4 font-mono text-[#78887D]">{op.actionFromDate || op.actionDate || '—'}</td>
                      <td className="py-4 px-4 text-red-900 font-medium max-w-md">
                        {op.cbRemarks || op.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 8: Discontinued Operators */}
        {registerType === 'discontinued' && (
          <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                    <th className="py-3.5 px-4">Sr.</th>
                    <th className="py-3.5 px-4">Operator Name & Reg No.</th>
                    <th className="py-3.5 px-4">Operator Type</th>
                    <th className="py-3.5 px-4">Registration Date</th>
                    <th className="py-3.5 px-4">Registered Address / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {discontinuedOps.slice(0, 100).map((op, idx) => (
                    <tr key={op.srNo || idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-4 px-4 font-mono text-[#8C6D37] font-semibold">{op.srNo || idx + 1}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm text-[#18231C]">{op.operatorName || op.name}</div>
                        <div className="text-[11px] text-[#6F7D73] font-mono mt-0.5">{op.regNo || op.registrationNo}</div>
                      </td>
                      <td className="py-4 px-4 text-[#526055]">{op.operatorType || op.type || 'INDIVIDUAL PRODUCER'}</td>
                      <td className="py-4 px-4 font-mono text-[#78887D]">{op.dateOfRegistration || op.date || '—'}</td>
                      <td className="py-4 px-4 text-[#445248] max-w-xs">{op.address || op.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
