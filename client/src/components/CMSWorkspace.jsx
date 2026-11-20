import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { districtsList } from '../data/staticData';
import {
  ShieldCheck,
  UserCheck,
  LogOut,
  ArrowLeft,
  LayoutDashboard,
  Users,
  FileText,
  FileCheck,
  FlaskConical,
  Bell,
  Download,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Search,
  Filter,
  Save,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const CMSWorkspace = ({ onReturnToPublicSite }) => {
  const {
    currentUser,
    logoutAdmin,
    operators,
    addOperator,
    updateOperator,
    deleteOperator,
    changeOperatorStatus,
    growerFarmers,
    addGrowerFarmer,
    deleteGrowerFarmer,
    approvedInputs,
    addApprovedInput,
    updateApprovedInput,
    deleteApprovedInput,
    inspectionPlan,
    circulars,
    addCircular,
    deleteCircular,
    downloads,
    addDownload,
    deleteDownload,
    staff,
    addStaff,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    applications,
    updateApplicationStatus,
    deleteApplication,
    exportBackupJson,
    importBackupJson,
    resetToDefaults,
    notification
  } = useCMS();

  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals for adding
  const [showAddOpModal, setShowAddOpModal] = useState(false);
  const [showAddInputModal, setShowAddInputModal] = useState(false);
  const [showAddCircModal, setShowAddCircModal] = useState(false);
  const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);

  // Operator Form state
  const [newOp, setNewOp] = useState({
    name: '',
    registrationNumber: '',
    operatorType: 'Individual Farmer',
    district: 'Junagadh',
    taluka: 'Veraval',
    village: 'Ambalgadh',
    cropTypes: 'Kesar Mango, Groundnut',
    totalAreaHectares: 3.5,
    status: 'Certified Organic',
    scopeCertificateNo: 'ORG/SC/2601/008891'
  });

  // Approved Input Form state
  const [newInput, setNewInput] = useState({
    producerName: '',
    productName: '',
    use: 'Bio-fertilizer / Organic Formulation',
    validity: '31/12/2026'
  });

  // Circular Form state
  const [newCirc, setNewCirc] = useState({
    referenceNo: '',
    title: '',
    category: 'NPOP Directive',
    summary: '',
    isImportant: true
  });

  // Farmer Form state
  const [newFarmer, setNewFarmer] = useState({
    farmerName: '',
    fatherHusbandName: '',
    growerGroup: 'Banas Organic Farmers Group',
    groupRegNo: 'ORG-2202-000684',
    village: 'Agthala',
    taluka: 'Deesa',
    district: 'Banaskantha',
    majorCrops: 'Groundnut, Wheat'
  });

  const handleAddOperator = (e) => {
    e.preventDefault();
    if (!newOp.name) return;
    addOperator({
      ...newOp,
      cropTypes: newOp.cropTypes.split(',').map((s) => s.trim())
    });
    setShowAddOpModal(false);
    setNewOp({
      name: '',
      registrationNumber: '',
      operatorType: 'Individual Farmer',
      district: 'Junagadh',
      taluka: 'Veraval',
      village: 'Ambalgadh',
      cropTypes: 'Kesar Mango, Groundnut',
      totalAreaHectares: 3.5,
      status: 'Certified Organic',
      scopeCertificateNo: 'ORG/SC/2601/008891'
    });
  };

  const handleAddInput = (e) => {
    e.preventDefault();
    if (!newInput.producerName || !newInput.productName) return;
    addApprovedInput(newInput);
    setShowAddInputModal(false);
    setNewInput({
      producerName: '',
      productName: '',
      use: 'Bio-fertilizer / Organic Formulation',
      validity: '31/12/2026'
    });
  };

  const handleAddCirc = (e) => {
    e.preventDefault();
    if (!newCirc.title) return;
    addCircular(newCirc);
    setShowAddCircModal(false);
    setNewCirc({
      referenceNo: '',
      title: '',
      category: 'NPOP Directive',
      summary: '',
      isImportant: true
    });
  };

  const handleAddFarmer = (e) => {
    e.preventDefault();
    if (!newFarmer.farmerName) return;
    addGrowerFarmer(newFarmer);
    setShowAddFarmerModal(false);
    setNewFarmer({
      farmerName: '',
      fatherHusbandName: '',
      growerGroup: 'Banas Organic Farmers Group',
      groupRegNo: 'ORG-2202-000684',
      village: 'Agthala',
      taluka: 'Deesa',
      district: 'Banaskantha',
      majorCrops: 'Groundnut, Wheat'
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2621] flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-[#1B3826] text-white px-4 py-2.5 rounded-xl shadow-xl border border-[#2D563B] text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#D4A373] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Workspace Header */}
      <header className="bg-[#142B1D] text-white border-b border-[#22442D] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/gopca_logo.png"
              alt="GOPCA Logo"
              className="w-9 h-9 object-contain rounded-full bg-white p-0.5 border border-[#3C694C] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold">GOPCA CMS Directorate</span>
                <span className="px-2 py-0.5 rounded bg-[#1B3826] text-[#D4A373] text-[10px] font-mono border border-[#2D563B]">
                  NPOP / NAB / 0028
                </span>
              </div>
              <div className="text-[11px] text-[#A6BAAD]">
                Authorized Officer: <strong>{currentUser?.name || 'Directorate Officer'}</strong> ({currentUser?.role || 'Executive'})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onReturnToPublicSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2A4D37] hover:bg-[#345E44] text-[#FAF8F5] transition-colors border border-[#3C694C]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Public Live Preview</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Tabs Navigation */}
      <div className="bg-[#FAF8F5] border-b border-[#E3DBD0] sticky top-[61px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 text-xs">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'operators', label: `Operators (${operators.length})`, icon: Users },
              { id: 'applications', label: `Applications (${applications.length})`, icon: FileCheck },
              { id: 'farmers', label: `ICS Farmers (${growerFarmers.length})`, icon: Users },
              { id: 'inputs', label: `Approved Inputs (${approvedInputs.length})`, icon: FlaskConical },
              { id: 'circulars', label: `Circulars (${circulars.length})`, icon: Bell },
              { id: 'downloads', label: `Downloads (${downloads.length})`, icon: Download },
              { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Mail },
              { id: 'settings', label: 'Backup & Reset', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#1B3826] text-white shadow-xs font-semibold'
                      : 'text-[#445248] hover:bg-[#EFEAE0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 bg-white rounded-3xl border border-[#D5CEBF] shadow-xs space-y-2">
                <span className="text-[11px] text-[#718075] uppercase tracking-wider font-semibold">
                  Certified Operators
                </span>
                <div className="font-serif text-3xl font-bold text-[#1B3826]">
                  {operators.length}
                </div>
                <div className="text-[11px] text-[#718075]">
                  Active in Live Public Registry
                </div>
              </div>

              <div className="p-5 bg-white rounded-3xl border border-[#D5CEBF] shadow-xs space-y-2">
                <span className="text-[11px] text-[#718075] uppercase tracking-wider font-semibold">
                  Pending Applications
                </span>
                <div className="font-serif text-3xl font-bold text-[#8C6D37]">
                  {applications.filter((a) => a.status === 'Submitted' || a.status === 'Under Review').length}
                </div>
                <div className="text-[11px] text-[#718075]">
                  Awaiting Scrutiny / Inspection
                </div>
              </div>

              <div className="p-5 bg-white rounded-3xl border border-[#D5CEBF] shadow-xs space-y-2">
                <span className="text-[11px] text-[#718075] uppercase tracking-wider font-semibold">
                  Approved Inputs
                </span>
                <div className="font-serif text-3xl font-bold text-[#1B3826]">
                  {approvedInputs.length}
                </div>
                <div className="text-[11px] text-[#718075]">
                  Commercial Bio-Formulations
                </div>
              </div>

              <div className="p-5 bg-white rounded-3xl border border-[#D5CEBF] shadow-xs space-y-2">
                <span className="text-[11px] text-[#718075] uppercase tracking-wider font-semibold">
                  Citizen Inquiries
                </span>
                <div className="font-serif text-3xl font-bold text-[#2A4D37]">
                  {inquiries.filter((i) => i.status === 'Pending').length}
                </div>
                <div className="text-[11px] text-[#718075]">
                  Awaiting Officer Response
                </div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="p-6 bg-[#EAF2ED] rounded-3xl border border-[#CDE0D3] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1B3826]">
                  Directorate Fast-Action Console
                </h3>
                <p className="text-xs text-[#35533F] mt-0.5">
                  Direct statutory control for adding certified operators, publishing official circulars, and updating inspection workflows.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setShowAddOpModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Add Operator</span>
                </button>

                <button
                  onClick={() => setShowAddCircModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1B3826] bg-white border border-[#CDE0D3] rounded-xl hover:bg-[#FAF8F5] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#8C6D37]" />
                  <span>Publish Circular</span>
                </button>
              </div>
            </div>

            {/* Recent Submitted Applications Table */}
            <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-xs">
              <div className="p-5 border-b border-[#EDE7DC] flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#18231C]">
                  Recent Applications Requiring Action
                </h3>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs font-semibold text-[#8C6D37] hover:underline"
                >
                  View All ({applications.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#6A786F] text-[11px] uppercase tracking-wider border-b border-[#EDE7DC]">
                    <tr>
                      <th className="py-3 px-4">App No.</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">District / Area</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Quick Workflow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE7DC]">
                    {applications.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-[#FAF8F5]">
                        <td className="py-3.5 px-4 font-mono font-semibold text-[#1B3826]">
                          {app.applicationNo}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#18231C]">
                            {app.formData?.fullName || 'Applicant'}
                          </div>
                          <div className="text-[11px] text-[#718075]">
                            {app.formData?.mobile}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {app.formData?.district} ({app.formData?.areaAcres} Ha)
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              updateApplicationStatus(
                                app.id,
                                app.status === 'Submitted' ? 'Under Review' : 'Approved',
                                'Status advanced in officer console'
                              );
                            }}
                            className="px-2.5 py-1 text-xs font-medium text-[#1B3826] bg-[#FAF8F5] border border-[#DFD8CC] rounded-lg hover:bg-[#1B3826] hover:text-white transition-all"
                          >
                            Advance Status →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATORS REGISTRY */}
        {activeTab === 'operators' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                  Live Operator Registry Management
                </h2>
                <p className="text-xs text-[#6A786F]">
                  Manage registered individual farmers and grower groups published to the live public site.
                </p>
              </div>

              <button
                onClick={() => setShowAddOpModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Add Certified Operator</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#6A786F] text-[11px] uppercase tracking-wider border-b border-[#EDE7DC]">
                    <tr>
                      <th className="py-3 px-4">Reg No.</th>
                      <th className="py-3 px-4">Operator Name</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Area (Ha)</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE7DC]">
                    {operators.map((op) => (
                      <tr key={op.id} className="hover:bg-[#FAF8F5]">
                        <td className="py-3.5 px-4 font-mono font-medium text-[#718075]">
                          {op.registrationNumber}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#18231C]">
                          {op.name}
                        </td>
                        <td className="py-3.5 px-4 text-[#526055]">
                          {op.village}, Dist. {op.district}
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          {Number(op.totalAreaHectares || 0).toFixed(2)} Ha
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={op.status}
                            onChange={(e) => changeOperatorStatus(op.id, e.target.value)}
                            className="px-2 py-1 bg-white border border-[#DFD8CC] rounded-lg text-xs text-[#18231C]"
                          >
                            <option value="Certified Organic">Certified Organic</option>
                            <option value="In-Conversion (C-2)">In-Conversion (C-2)</option>
                            <option value="In-Conversion (C-1)">In-Conversion (C-1)</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Terminated">Terminated</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove operator "${op.name}" from live register?`)) {
                                deleteOperator(op.id);
                              }
                            }}
                            className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Operator"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: APPLICATIONS MANAGEMENT */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                Certification Applications Review Console
              </h2>
              <p className="text-xs text-[#6A786F]">
                Review submissions received via the public Apply portal, update statutory stages, and record scrutiny remarks.
              </p>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl border border-[#D5CEBF] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#1B3826] px-2.5 py-1 bg-[#EBF2ED] rounded border border-[#CCE0D3]">
                        {app.applicationNo}
                      </span>
                      <span className="text-xs text-[#718075]">
                        Submitted: {new Date(app.createdAt || Date.now()).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#18231C]">
                      {app.formData?.fullName} — {app.formData?.entityName || 'Individual Farm'}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#526055]">
                      <span>📞 {app.formData?.mobile}</span>
                      <span>📍 {app.formData?.village}, {app.formData?.taluka}, {app.formData?.district}</span>
                      <span>🌾 {app.formData?.primaryCrops} ({app.formData?.areaAcres} Ha)</span>
                    </div>

                    {app.officerRemarks && (
                      <div className="text-[11px] text-[#78887D] italic bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EDE7DC]">
                        Officer Log: {app.officerRemarks}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatus(app.id, e.target.value, app.officerRemarks)}
                      className="px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs font-semibold text-[#18231C]"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Field Inspection Scheduled">Field Inspection Scheduled</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => {
                        if (confirm(`Archive application ${app.applicationNo}?`)) {
                          deleteApplication(app.id);
                        }
                      }}
                      className="p-2 text-rose-700 hover:bg-rose-50 rounded-xl"
                      title="Archive Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GROWER GROUP FARMERS */}
        {activeTab === 'farmers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                  ICS Member Farmers Database
                </h2>
                <p className="text-xs text-[#6A786F]">
                  Smallholder farmer records attached to registered Grower Groups under NPOP criteria.
                </p>
              </div>

              <button
                onClick={() => setShowAddFarmerModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Add Member Farmer</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#6A786F] text-[11px] uppercase tracking-wider border-b border-[#EDE7DC]">
                    <tr>
                      <th className="py-3 px-4">Sr.</th>
                      <th className="py-3 px-4">Farmer Name</th>
                      <th className="py-3 px-4">Father / Husband</th>
                      <th className="py-3 px-4">Grower Group</th>
                      <th className="py-3 px-4">Village / District</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE7DC]">
                    {growerFarmers.map((f) => (
                      <tr key={f.srNo} className="hover:bg-[#FAF8F5]">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#8C6D37]">{f.srNo}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#18231C]">{f.farmerName}</td>
                        <td className="py-3.5 px-4 text-[#526055]">{f.fatherHusbandName}</td>
                        <td className="py-3.5 px-4">{f.growerGroup}</td>
                        <td className="py-3.5 px-4">{f.village}, Dist. {f.district}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => deleteGrowerFarmer(f.srNo)}
                            className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: APPROVED INPUTS */}
        {activeTab === 'inputs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                  GOPCA Approved Inputs Registry
                </h2>
                <p className="text-xs text-[#6A786F]">
                  Catalog of certified bio-fertilizers, bio-pesticides, and soil conditioners authorized under NPOP Appendix 1.
                </p>
              </div>

              <button
                onClick={() => setShowAddInputModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Add Approved Input</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#6A786F] text-[11px] uppercase tracking-wider border-b border-[#EDE7DC]">
                    <tr>
                      <th className="py-3 px-4">Sr.</th>
                      <th className="py-3 px-4">Producer / Company</th>
                      <th className="py-3 px-4">Product Name & Formulation</th>
                      <th className="py-3 px-4">Category / Use</th>
                      <th className="py-3 px-4">Validity</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE7DC]">
                    {approvedInputs.map((i) => (
                      <tr key={i.id} className="hover:bg-[#FAF8F5]">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#8C6D37]">{i.srNo}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#18231C]">{i.producerName}</td>
                        <td className="py-3.5 px-4 font-medium text-[#1B3826]">{i.productName}</td>
                        <td className="py-3.5 px-4 text-[#526055]">{i.use}</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-800 font-semibold">{i.validity}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => deleteApprovedInput(i.id)}
                            className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CIRCULARS */}
        {activeTab === 'circulars' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                  Gazette Circulars & Directives
                </h2>
                <p className="text-xs text-[#6A786F]">
                  Publish and manage administrative circulars displayed in the public notifications section.
                </p>
              </div>

              <button
                onClick={() => setShowAddCircModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Publish Gazette Circular</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {circulars.map((circ) => (
                <div
                  key={circ.id}
                  className="bg-white rounded-2xl border border-[#D5CEBF] p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] font-bold text-[#8C6D37]">
                        {circ.referenceNo}
                      </span>
                      <span className="text-[11px] text-[#718075]">{circ.date}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#18231C]">
                      {circ.title}
                    </h3>

                    <p className="text-xs text-[#526055] leading-relaxed">
                      {circ.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EBF2ED] text-[#1B3826]">
                      {circ.category}
                    </span>

                    <button
                      onClick={() => deleteCircular(circ.id)}
                      className="p-1 text-rose-700 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                Citizen & Farmer Grievances Desk
              </h2>
              <p className="text-xs text-[#6A786F]">
                Inquiries and support requests submitted through the online public portal.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-2xl border border-[#D5CEBF] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm text-[#18231C]">{inq.name}</span>
                      <span className="text-xs text-[#718075]">📞 {inq.contact}</span>
                      {inq.email && <span className="text-xs text-[#718075]">✉ {inq.email}</span>}
                    </div>

                    <div className="text-xs text-[#526055]">
                      Location: {inq.address || 'Gujarat State'}
                    </div>

                    <p className="text-xs text-[#38463D] bg-[#FAF8F5] p-3 rounded-xl border border-[#EDE7DC] leading-relaxed">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                      className="px-3 py-1.5 bg-white border border-[#DFD8CC] rounded-xl text-xs font-semibold text-[#18231C]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-2 text-rose-700 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-3xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                System Data Administration & Backups
              </h2>
              <p className="text-xs text-[#6A786F]">
                Export JSON snapshots, restore database states, or reset to official statutory defaults.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D5CEBF] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#18231C]">
                1. Full JSON State Snapshot
              </h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Download a complete serialized backup containing all certified operators, submitted applications, gazette circulars, approved inputs, and member farmers.
              </p>
              <button
                onClick={exportBackupJson}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-[#D4A373]" />
                <span>Export State JSON Backup</span>
              </button>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D5CEBF] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#18231C]">
                2. Factory Reset to Official GOPCA Defaults
              </h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Re-seeds the database with the official Gujarat Organic Products Certification Agency registry data.
              </p>
              <button
                onClick={() => {
                  if (confirm('Reset entire system state back to statutory GOPCA baseline?')) {
                    resetToDefaults();
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-300 rounded-xl hover:bg-rose-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Official Defaults</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD OPERATOR */}
      {showAddOpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full border border-[#D5CEBF] shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#1B3826] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Add Certified Operator</h3>
              <button onClick={() => setShowAddOpModal(false)} className="p-1 text-white/80">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddOperator} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium mb-1">Operator Name *</label>
                <input
                  type="text"
                  required
                  value={newOp.name}
                  onChange={(e) => setNewOp({ ...newOp, name: e.target.value })}
                  placeholder="e.g. Bhavesh Govindbhai Patel"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Operator Classification</label>
                  <select
                    value={newOp.operatorType}
                    onChange={(e) => setNewOp({ ...newOp, operatorType: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  >
                    <option value="Individual Farmer">Individual Farmer</option>
                    <option value="Grower Group (ICS)">Grower Group (ICS)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">District (Gujarat)</label>
                  <select
                    value={newOp.district}
                    onChange={(e) => setNewOp({ ...newOp, district: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  >
                    {districtsList.filter((d) => d !== 'All').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Taluka</label>
                  <input
                    type="text"
                    value={newOp.taluka}
                    onChange={(e) => setNewOp({ ...newOp, taluka: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Village</label>
                  <input
                    type="text"
                    value={newOp.village}
                    onChange={(e) => setNewOp({ ...newOp, village: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Certified Crops (Comma separated)</label>
                <input
                  type="text"
                  value={newOp.cropTypes}
                  onChange={(e) => setNewOp({ ...newOp, cropTypes: e.target.value })}
                  placeholder="Kesar Mango, Groundnut, Cumin"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Area (Hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newOp.totalAreaHectares}
                    onChange={(e) => setNewOp({ ...newOp, totalAreaHectares: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">NPOP Status</label>
                  <select
                    value={newOp.status}
                    onChange={(e) => setNewOp({ ...newOp, status: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  >
                    <option value="Certified Organic">Certified Organic</option>
                    <option value="In-Conversion (C-2)">In-Conversion (C-2)</option>
                    <option value="In-Conversion (C-1)">In-Conversion (C-1)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EDE7DC]">
                <button
                  type="button"
                  onClick={() => setShowAddOpModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#505F55]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C]"
                >
                  Add Operator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD APPROVED INPUT */}
      {showAddInputModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full border border-[#D5CEBF] shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#1B3826] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Add GOPCA Approved Input</h3>
              <button onClick={() => setShowAddInputModal(false)} className="p-1 text-white/80">✕</button>
            </div>

            <form onSubmit={handleAddInput} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium mb-1">Producer / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newInput.producerName}
                  onChange={(e) => setNewInput({ ...newInput, producerName: e.target.value })}
                  placeholder="e.g. GSFC Agro Chemicals / KRIBHCO"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Product Name & Formulation *</label>
                <input
                  type="text"
                  required
                  value={newInput.productName}
                  onChange={(e) => setNewInput({ ...newInput, productName: e.target.value })}
                  placeholder="e.g. Liquid Consortia 2 (Azospirillum + PSB)"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Approved Use / Category</label>
                <input
                  type="text"
                  value={newInput.use}
                  onChange={(e) => setNewInput({ ...newInput, use: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Validity Date</label>
                <input
                  type="text"
                  value={newInput.validity}
                  onChange={(e) => setNewInput({ ...newInput, validity: e.target.value })}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EDE7DC]">
                <button
                  type="button"
                  onClick={() => setShowAddInputModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#505F55]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C]"
                >
                  Publish Input
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PUBLISH CIRCULAR */}
      {showAddCircModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full border border-[#D5CEBF] shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#1B3826] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Publish Gazette Circular</h3>
              <button onClick={() => setShowAddCircModal(false)} className="p-1 text-white/80">✕</button>
            </div>

            <form onSubmit={handleAddCirc} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Reference No.</label>
                  <input
                    type="text"
                    value={newCirc.referenceNo}
                    onChange={(e) => setNewCirc({ ...newCirc, referenceNo: e.target.value })}
                    placeholder="GOPCA/CIR/2026/05"
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select
                    value={newCirc.category}
                    onChange={(e) => setNewCirc({ ...newCirc, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  >
                    <option value="NPOP Directive">NPOP Directive</option>
                    <option value="Inspection Schedule">Inspection Schedule</option>
                    <option value="General Notice">General Notice</option>
                    <option value="Fee Revision">Fee Revision</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Circular Title *</label>
                <input
                  type="text"
                  required
                  value={newCirc.title}
                  onChange={(e) => setNewCirc({ ...newCirc, title: e.target.value })}
                  placeholder="e.g. Implementation of ICS Audit Guidelines 2026"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Summary / Directives</label>
                <textarea
                  rows={3}
                  value={newCirc.summary}
                  onChange={(e) => setNewCirc({ ...newCirc, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EDE7DC]">
                <button
                  type="button"
                  onClick={() => setShowAddCircModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#505F55]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C]"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD FARMER */}
      {showAddFarmerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full border border-[#D5CEBF] shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#1B3826] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Add Grower Group Farmer</h3>
              <button onClick={() => setShowAddFarmerModal(false)} className="p-1 text-white/80">✕</button>
            </div>

            <form onSubmit={handleAddFarmer} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium mb-1">Farmer Full Name *</label>
                <input
                  type="text"
                  required
                  value={newFarmer.farmerName}
                  onChange={(e) => setNewFarmer({ ...newFarmer, farmerName: e.target.value })}
                  placeholder="e.g. Koli Manjibhai Bhikhabhai"
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Father / Husband Name</label>
                <input
                  type="text"
                  value={newFarmer.fatherHusbandName}
                  onChange={(e) => setNewFarmer({ ...newFarmer, fatherHusbandName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Grower Group Name</label>
                  <input
                    type="text"
                    value={newFarmer.growerGroup}
                    onChange={(e) => setNewFarmer({ ...newFarmer, growerGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">District</label>
                  <select
                    value={newFarmer.district}
                    onChange={(e) => setNewFarmer({ ...newFarmer, district: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs"
                  >
                    {districtsList.filter((d) => d !== 'All').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EDE7DC]">
                <button
                  type="button"
                  onClick={() => setShowAddFarmerModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#505F55]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C]"
                >
                  Save Farmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
