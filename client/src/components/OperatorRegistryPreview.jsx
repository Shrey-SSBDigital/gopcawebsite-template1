import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { districtsList } from '../data/staticData';
import { Search, Filter, ShieldCheck, MapPin, Eye, FileText } from 'lucide-react';

export const OperatorRegistryPreview = ({ onSelectOperator }) => {
  const { operators } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const filteredOperators = useMemo(() => {
    return operators.filter((op) => {
      const matchesDistrict = selectedDistrict === 'All' || op.district === selectedDistrict;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        term === '' ||
        op.name?.toLowerCase().includes(term) ||
        op.registrationNumber?.toLowerCase().includes(term) ||
        op.village?.toLowerCase().includes(term) ||
        op.taluka?.toLowerCase().includes(term) ||
        (op.cropTypes && op.cropTypes.some((c) => c.toLowerCase().includes(term)));
      return matchesDistrict && matchesSearch;
    });
  }, [operators, searchTerm, selectedDistrict]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Certified Organic':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-600'
        };
      case 'In-Conversion (C-2)':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500'
        };
      case 'In-Conversion (C-1)':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-300',
          dot: 'bg-orange-500'
        };
      case 'Suspended':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          dot: 'bg-rose-600'
        };
      default:
        return {
          bg: 'bg-gray-50 text-gray-800 border-gray-300',
          dot: 'bg-gray-500'
        };
    }
  };

  return (
    <section id="registry" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
              Public Transparency Register
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#17221A] leading-tight mb-2">
              Gujarat Certified Operator Registry
            </h2>
            <p className="text-xs sm:text-sm text-[#4A574E] leading-relaxed">
              Official public record of accredited individual farmers, grower groups (ICS), and processors certified by GOPCA under NPOP criteria.
            </p>
          </div>

          {/* Search & District Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search operator, crop, reg no..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] placeholder-[#8A978E] focus:outline-none focus:border-[#1B3826]"
              />
            </div>

            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] focus:outline-none focus:border-[#1B3826] pr-8"
              >
                {districtsList.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts' : d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                  <th className="py-3.5 px-4">Operator / Reg. No.</th>
                  <th className="py-3.5 px-4">Location (Gujarat)</th>
                  <th className="py-3.5 px-4">Certified Crops</th>
                  <th className="py-3.5 px-4">Area / Farmers</th>
                  <th className="py-3.5 px-4">NPOP Status</th>
                  <th className="py-3.5 px-4 text-right">Scope Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7DC]">
                {filteredOperators.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-[#6A796F]">
                      No operators found matching your search or district criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOperators.slice(0, 10).map((op) => {
                    const badge = getStatusBadge(op.status);
                    return (
                      <tr key={op.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-semibold text-sm text-[#18231C]">
                            {op.name}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#6F7D73] font-mono mt-0.5">
                            <span>{op.registrationNumber}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-sans text-[#8C6D37]">{op.operatorType}</span>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 text-xs text-[#222F26]">
                            <MapPin className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
                            <span>{op.village || 'Field Parcel'}</span>
                          </div>
                          <div className="text-[11px] text-[#6F7D73] pl-5">
                            Taluka {op.taluka || 'Rural'}, Dist. {op.district}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {op.cropTypes?.map((crop, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-[11px] text-[#3A483E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5DFD4]"
                              >
                                {crop}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-mono">
                          <div className="tabular-nums font-medium text-[#18231C]">
                            {Number(op.totalAreaHectares || 0).toFixed(2)} Ha
                          </div>
                          {op.farmerCount && (
                            <div className="text-[11px] text-[#6F7D73] font-sans">
                              {op.farmerCount} Member Farmers
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${badge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                            <span>{op.status}</span>
                          </span>
                          <div className="text-[10px] text-[#78867C] font-mono mt-0.5">
                            Valid to {op.validUntil || '2026-11-30'}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onSelectOperator(op)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-lg hover:bg-[#1B3826] hover:text-white transition-all shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Certificate</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF8F5] border-t border-[#E3DBD0] text-center text-xs text-[#6F7D73]">
            All Scope Certificates are recorded with APEDA TraceNet and validated under Government of Gujarat Accreditation NPOP/NAB/0028.
          </div>
        </div>
      </div>
    </section>
  );
};
