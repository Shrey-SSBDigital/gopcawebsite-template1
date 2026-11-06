import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  Plus, 
  Pencil,
  Trash2, 
  RotateCcw, 
  FileSpreadsheet, 
  X,
  AlertCircle
} from 'lucide-react';

export default function DynamicTable({
  tableId,
  title,
  subtitle,
  columns = [],
  data = [],
  onAddRow,
  onEditRow,
  onDeleteRow,
  onReset,
  enableAdd = false,
  enableEdit = false,
  enableDelete = false,
  enableReset = false,
  enableExport = true,
  filterDistrict = false,
  districtList = [],
  customAction
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRowData, setEditingRowData] = useState(null);

  // Sorting Handler
  const handleSort = (key) => {
    if (sortField === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(key);
      setSortDirection('asc');
    }
  };

  // Filtered & Sorted Data
  const processedData = useMemo(() => {
    let result = [...data];

    // District Filter
    if (filterDistrict && selectedDistrict !== 'All') {
      result = result.filter(item => 
        item.district && item.district.toLowerCase() === selectedDistrict.toLowerCase()
      );
    }

    // Global Search
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(item => {
        return Object.values(item).some(val => 
          val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        );
      });
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        let valA = a[sortField] ?? '';
        let valB = b[sortField] ?? '';

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, selectedDistrict, sortField, sortDirection, filterDistrict]);

  // Handle Form Submission for Adding Row
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onAddRow) {
      onAddRow(newRowData);
    }
    setNewRowData({});
    setIsAddModalOpen(false);
  };

  // Handle Edit Modal
  const handleOpenEditModal = (row) => {
    setEditingRowData({ ...row });
    setIsEditModalOpen(true);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (onEditRow && editingRowData) {
      onEditRow(editingRowData.id, editingRowData);
    }
    setIsEditModalOpen(false);
    setEditingRowData(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!processedData.length) return;
    const headers = columns.filter(c => c.type !== 'action' && c.type !== 'logo').map(c => `"${c.label}"`).join(',');
    const rows = processedData.map(row => {
      return columns
        .filter(c => c.type !== 'action' && c.type !== 'logo')
        .map(c => {
          const val = row[c.key] ?? '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${tableId || 'gopca-table'}-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for Taste of Lapland badge rendering
  const renderBadge = (value, col) => {
    const valStr = String(value || '');
    let bg = 'bg-[#F2EFE8] text-[#3D4741] border-[#E2DED5]';

    if (valStr.includes('Active') || valStr.includes('Certified') || valStr.includes('Permanent')) {
      bg = 'bg-[#EBF3ED] text-[#1B3E2B] border-[#D0E2D5]';
    } else if (valStr.includes('Suspended') || valStr.includes('Deputation') || valStr.includes('Conversion')) {
      bg = 'bg-[#FBF4E8] text-[#8C6221] border-[#EEDDBF]';
    } else if (valStr.includes('Terminated')) {
      bg = 'bg-[#FAECEB] text-[#932C28] border-[#EFC6C4]';
    } else if (valStr.includes('Discontinued')) {
      bg = 'bg-[#EFECE5] text-[#55635B] border-[#D8D4CA]';
    } else if (valStr.includes('Grower Group') || valStr.includes('ICS')) {
      bg = 'bg-[#EEF4F0] text-[#1B3E2B] border-[#CFDFD4] font-medium';
    } else if (valStr.includes('Chairman') || valStr.includes('Vice-Chairman')) {
      bg = 'bg-[#F6F3EC] text-[#1B3E2B] border-[#C49A5A]/50 font-bold';
    }

    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-xs border ${bg}`}>
        {valStr}
      </span>
    );
  };

  // Render logo
  const renderLogo = (val) => {
    if (val === 'gopca-emblem' || val === 'gopca') {
      return (
        <div className="w-9 h-9 rounded-full bg-white border border-[#EAE6DE] flex items-center justify-center p-0.5 overflow-hidden">
          <img src="/logo.png" alt="GOPCA" className="w-full h-full object-contain" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE] flex items-center justify-center p-1 text-[#1B3E2B] font-bold text-[10px] text-center uppercase tracking-tighter">
        {val === 'apeda-emblem' ? (
          <span className="text-[#8C6221] font-bold text-[10px]">APEDA</span>
        ) : val === 'aau-emblem' ? (
          <span className="text-[#1B3E2B] font-semibold text-[10px]">AAU</span>
        ) : (
          <span className="text-[#4E5B53]">Govt Guj</span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-[3px] border border-[#EAE6DE] shadow-sm overflow-hidden">
      
      {/* Table Header & Controls Bar */}
      <div className="p-5 sm:p-6 border-b border-[#EAE6DE] bg-[#FAF8F5]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-editorial text-2xl text-[#18221D]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#5B6760] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Quick Actions (Add, Reset, Export) */}
          <div className="flex flex-wrap items-center gap-2">
            {enableAdd && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-lapland py-2 px-3.5 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5 text-[#C49A5A]" />
                <span>+ Add Record</span>
              </button>
            )}

            {enableExport && (
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FAF8F5] text-[#243029] border border-[#D5D0C6] px-3 py-2 rounded-[2px] text-xs font-medium transition-all"
                title="Export current table to CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#1B3E2B]" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}

            {enableReset && (
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 bg-white hover:bg-[#FAF8F5] text-[#1B3E2B] border border-[#D5D0C6] px-3 py-2 rounded-[2px] text-xs font-medium transition-all"
                title="Reset table to official statutory defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            )}

            {customAction}
          </div>
        </div>

        {/* Filter & Live Search Toolbar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* Live Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-[#7A8680] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records by Name, Registration ID, Crop, Village, Cadre..."
              className="w-full pl-9 pr-8 py-2 bg-white rounded-[2px] border border-[#D5D0C6] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#1B3E2B] transition-all placeholder:text-[#8E9B93]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* District Dropdown (if enabled) */}
          {filterDistrict && districtList && districtList.length > 0 && (
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full py-2 px-3 bg-white rounded-[2px] border border-[#D5D0C6] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#1B3E2B] transition-all cursor-pointer"
              >
                <option value="All">All Gujarat Districts (33)</option>
                {districtList.filter(d => d !== 'All').map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Records Summary */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#6E7B74]">
          <span>
            Showing <strong className="text-[#18221D]">{processedData.length}</strong> records 
            {data.length !== processedData.length && ` (filtered from ${data.length} total)`}
          </span>
          {sortField && (
            <span>
              Sorted by <strong className="text-[#18221D]">{sortField}</strong> ({sortDirection})
            </span>
          )}
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#F6F3EC] text-[#34413A] border-b border-[#E5E1D8]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.type !== 'action' && col.type !== 'logo' && handleSort(col.key)}
                  className={`py-3.5 px-4 font-semibold text-[11px] tracking-wider uppercase select-none ${
                    col.type !== 'action' && col.type !== 'logo' ? 'cursor-pointer hover:bg-[#EFECE5]' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.type !== 'action' && col.type !== 'logo' && (
                      <ArrowUpDown className="w-3 h-3 text-[#8A9690] opacity-70" />
                    )}
                  </div>
                </th>
              ))}
              {(enableEdit || enableDelete) && (
                <th className="py-3.5 px-4 font-semibold text-[11px] tracking-wider uppercase text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EFECE5] text-[#2C3831]">
            {processedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + ((enableEdit || enableDelete) ? 1 : 0)} 
                  className="py-12 text-center text-gray-500 bg-white"
                >
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 text-[#8C744F] mb-2" />
                    <p className="font-editorial text-lg text-[#18221D]">No records match criteria</p>
                    <p className="text-xs text-[#6A7870] mt-1">Try resetting filters or searching with another term.</p>
                  </div>
                </td>
              </tr>
            ) : (
              processedData.map((row, idx) => (
                <tr 
                  key={row.id || idx}
                  className="hover:bg-[#FAF8F5] transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-3.5 px-4 align-top">
                      {col.type === 'logo' ? (
                        renderLogo(row[col.key])
                      ) : col.type === 'badge' ? (
                        renderBadge(row[col.key], col)
                      ) : col.type === 'number' ? (
                        <span className="font-mono font-medium text-[#18221D]">
                          {typeof row[col.key] === 'number' ? row[col.key].toLocaleString() : row[col.key]}
                        </span>
                      ) : col.render ? (
                        col.render(row[col.key], row)
                      ) : (
                        <span className="leading-snug">{row[col.key] ?? '—'}</span>
                      )}
                    </td>
                  ))}

                  {(enableEdit || enableDelete) && (
                    <td className="py-3.5 px-4 text-right align-top whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {enableEdit && (
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(row)}
                            className="inline-flex items-center gap-1 text-[#1B3E2B] hover:text-[#0E2317] bg-[#EBF3ED] hover:bg-[#DCEDE0] border border-[#CFDFD4] px-2 py-1 rounded-[2px] text-xs font-medium transition-colors"
                            title="Edit / modify record"
                          >
                            <Pencil className="w-3 h-3 text-[#1B3E2B]" />
                            <span>Edit</span>
                          </button>
                        )}
                        {enableDelete && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove this record?`)) {
                                onDeleteRow && onDeleteRow(row.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 rounded-[2px] text-xs transition-colors"
                            title="Delete record from table"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Row Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[3px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#D5D0C6]">
            <div className="p-5 border-b border-[#EAE6DE] flex items-center justify-between bg-[#1B3E2B] text-white">
              <div>
                <h4 className="font-editorial text-lg text-white">Add New Record</h4>
                <p className="text-xs text-[#D8B57E]">{title}</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
              {columns
                .filter(c => c.type !== 'action' && c.type !== 'logo')
                .map((col) => (
                  <div key={col.key}>
                    <label className="block font-medium text-[#18221D] mb-1">
                      {col.label}
                    </label>
                    {col.options ? (
                      <select
                        value={newRowData[col.key] || ''}
                        onChange={(e) => setNewRowData({ ...newRowData, [col.key]: e.target.value })}
                        required
                        className="w-full py-2 px-3 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none"
                      >
                        <option value="">Select {col.label}</option>
                        {col.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : col.type === 'number' ? (
                      <input
                        type="number"
                        step="any"
                        value={newRowData[col.key] || ''}
                        onChange={(e) => setNewRowData({ ...newRowData, [col.key]: parseFloat(e.target.value) || 0 })}
                        required
                        className="w-full py-2 px-3 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none"
                        placeholder={`Enter ${col.label}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={newRowData[col.key] || ''}
                        onChange={(e) => setNewRowData({ ...newRowData, [col.key]: e.target.value })}
                        required
                        className="w-full py-2 px-3 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none"
                        placeholder={`Enter ${col.label}`}
                      />
                    )}
                  </div>
                ))}

              <div className="pt-3 border-t border-[#EAE6DE] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#D5D0C6] text-[#34413A] hover:bg-[#FAF8F5] text-xs font-semibold rounded-[2px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-lapland text-xs py-2 px-4"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Row Modal */}
      {isEditModalOpen && editingRowData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[3px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#D5D0C6]">
            <div className="p-5 border-b border-[#EAE6DE] flex items-center justify-between bg-[#1B3E2B] text-white">
              <div>
                <h4 className="font-editorial text-lg text-white">Edit Record</h4>
                <p className="text-xs text-[#D8B57E]">Update data for ID: {editingRowData.id || 'N/A'}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingRowData(null);
                }}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditFormSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
              {columns
                .filter(c => c.type !== 'action' && c.type !== 'logo')
                .map((col) => (
                  <div key={col.key}>
                    <label className="block font-medium text-[#18221D] mb-1">
                      {col.label}
                    </label>
                    {col.options ? (
                      <select
                        value={editingRowData[col.key] || ''}
                        onChange={(e) => setEditingRowData({ ...editingRowData, [col.key]: e.target.value })}
                        required
                        className="w-full py-2 px-3 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none"
                      >
                        <option value="">Select {col.label}</option>
                        {col.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : col.type === 'number' ? (
                      <input
                        type="number"
                        step="any"
                        value={editingRowData[col.key] ?? ''}
                        onChange={(e) => setEditingRowData({ ...editingRowData, [col.key]: parseFloat(e.target.value) || 0 })}
                        required
                        className="w-full py-2 px-3 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none"
                        placeholder={`Enter ${col.label}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={editingRowData[col.key] ?? ''}
                        onChange={(e) => setEditingRowData({ ...editingRowData, [col.key]: e.target.value })}
                        required
                        className="w-full py-2 px-3 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none"
                        placeholder={`Enter ${col.label}`}
                      />
                    )}
                  </div>
                ))}

              <div className="pt-3 border-t border-[#EAE6DE] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingRowData(null);
                  }}
                  className="px-4 py-2 border border-[#D5D0C6] text-[#34413A] hover:bg-[#FAF8F5] text-xs font-semibold rounded-[2px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-lapland text-xs py-2 px-4"
                >
                  Update & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
