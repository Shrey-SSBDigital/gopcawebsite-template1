import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import DynamicTable from '../components/DynamicTable';
import { GUJARAT_DISTRICTS } from '../data/defaultData';
import { 
  Database, 
  Server, 
  ShieldCheck, 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  LogOut, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export default function CMSAdminPage() {
  const { 
    isAuthenticated,
    currentUser,
    login,
    logout,
    getTableRows, 
    addTableRow,
    updateTableRow, 
    deleteTableRow, 
    resetTable 
  } = useCMS();

  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active Dynamic Table in CMS
  const [activeTableId, setActiveTableId] = useState('personnel');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    const result = await login(loginId, loginPassword);
    setIsSubmitting(false);

    if (!result.success) {
      setLoginError(result.message || 'Invalid Administrator ID or Password.');
    }
  };

  const handleFillDemoCredentials = () => {
    setLoginId('admin');
    setLoginPassword('admin123');
    setLoginError('');
  };

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

  // -------------------------------------------------------------
  // SCREEN 1: CMS LOGIN SCREEN (When Not Authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex flex-col justify-between text-[#18221D]">
        {/* Top Government Embellishment Bar */}
        <header className="bg-[#163A2B] text-white py-4 px-6 border-b border-[#23503B] shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm">
                <img src="/logo.png" alt="GOPCA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#D8B57E] font-semibold">
                  Government of Gujarat • Dept. of Agriculture
                </p>
                <h2 className="font-editorial text-sm sm:text-base tracking-wide text-white font-medium">
                  Gujarat Organic Products Certification Agency (GOPCA)
                </h2>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#D0E2D7] hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-[2px] border border-white/20"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D8B57E]" />
            </Link>
          </div>
        </header>

        {/* Login Center Card */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
          <div className="w-full max-w-md bg-white rounded-[4px] border border-[#D5D0C6] shadow-xl overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-[#1B3E2B] text-white p-6 sm:p-8 text-center relative">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
                <Lock className="w-6 h-6 text-[#D8B57E]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D8B57E] font-semibold mb-1">
                Restricted Statutory Access
              </p>
              <h1 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
                CMS Studio Login
              </h1>
              <p className="text-xs text-[#D0E2D7] mt-1.5 leading-relaxed">
                Designated Administrative Console for Dynamic Table Management
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="m-6 mb-0 p-3.5 bg-red-50 border border-red-200 rounded-[2px] flex items-center gap-2.5 text-xs text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Administrator ID / Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7B8881] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter admin ID"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#D5D0C6] rounded-[2px] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#1B3E2B] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Secure Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#7B8881] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D5D0C6] rounded-[2px] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#1B3E2B] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#7B8881] hover:text-[#18221D]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Box */}
              <div className="bg-[#FAF8F5] border border-[#EAE6DE] p-3.5 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#18221D] uppercase tracking-wider">
                    Statutory ID & Password
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemoCredentials}
                    className="text-[11px] text-[#1B3E2B] hover:text-[#0C2417] font-semibold underline underline-offset-2"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="font-mono text-xs text-[#4F5D54] bg-white p-2 rounded-[2px] border border-[#D5D0C6] flex justify-between">
                  <span>ID: <strong className="text-[#18221D]">admin</strong></span>
                  <span>Pass: <strong className="text-[#18221D]">admin123</strong></span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-lapland py-2.5 text-xs font-semibold justify-center flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#C49A5A]" />
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In to CMS Studio'}</span>
              </button>

              {/* Back to Public Website Link */}
              <div className="text-center pt-2">
                <Link
                  to="/"
                  className="text-xs text-[#5D6B63] hover:text-[#18221D] transition-colors"
                >
                  ← Return to Public Website
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <footer className="text-center py-4 text-[11px] text-[#7B8881] border-t border-[#EAE6DE]">
          Gujarat Organic Products Certification Agency (GOPCA) • Societies Registration Act, 1860 (Guj/14589)
        </footer>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: STANDALONE CMS MANAGEMENT SCREEN (Authenticated)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18221D] flex flex-col">
      
      {/* Standalone CMS Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#163A2B] text-white border-b border-[#23503B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shadow">
                <img src="/logo.png" alt="GOPCA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-editorial text-base sm:text-lg text-white font-normal">
                    GOPCA CMS Studio
                  </h1>
                  <span className="hidden sm:inline-block bg-[#D8B57E]/20 text-[#D8B57E] text-[10px] font-semibold px-2 py-0.5 rounded-[2px] uppercase tracking-wider border border-[#D8B57E]/40">
                    Separate Admin Screen
                  </span>
                </div>
                <p className="text-[10px] text-[#A6C4B5] tracking-wide">
                  Central Content Management & Statutory Tables Engine
                </p>
              </div>
            </div>

            {/* Right Admin Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Active Admin Session Status */}
              <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-[2px] border border-white/20 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-white text-xs font-medium">
                  Admin: <strong>{currentUser || 'admin'}</strong>
                </span>
              </div>

              {/* View Public Website Button */}
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all"
                title="View public portal as general visitors see it"
              >
                <span>Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D8B57E]" />
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 bg-[#932C28] hover:bg-[#A8322E] text-white px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all shadow-sm"
                title="Log out of CMS Studio"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Bar */}
      <section className="bg-[#1B3E2B] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Authorized Administrator Portal</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
              Table Content Management System
            </h2>
            <p className="text-xs sm:text-sm text-[#D0E2D7] max-w-2xl leading-relaxed">
              Authorized admin console to change, add, edit, delete records across all 9 statutory dynamic tables. Changes update both client storage and backend server databases in real-time.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-[2px] border border-white/20 text-xs space-y-1.5 flex-shrink-0">
            <div className="flex items-center gap-2 text-[#D8B57E] font-medium">
              <Server className="w-4 h-4 text-[#C49A5A]" />
              <span>Full CRUD Mode Enabled</span>
            </div>
            <p className="text-[11px] text-[#A6C4B5]">Public Website: <strong>Read-Only Mode</strong></p>
            <p className="text-[11px] text-[#A6C4B5]">Admin CMS Screen: <strong>Change / Add Permitted</strong></p>
          </div>
        </div>
      </section>

      {/* Main Studio Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1 w-full">
        
        {/* Table Selector Tabs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D]">
              Select Dynamic Table to Manage ({tables.length} Registered Tables):
            </label>
            <span className="text-xs text-[#6F7C75]">
              Active: <strong className="text-[#1B3E2B]">{currentTableConfig.name}</strong>
            </span>
          </div>

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
                      ? 'bg-[#1B3E2B] text-white border-[#1B3E2B] shadow-sm ring-2 ring-[#C49A5A]/50'
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
                  <h4 className="font-editorial text-sm line-clamp-1 font-normal">
                    {t.name}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Table Render with Add, Edit, Delete, Reset Enabled */}
        <div className="space-y-4">
          <DynamicTable
            tableId={currentTableConfig.id}
            title={currentTableConfig.name}
            subtitle={currentTableConfig.desc}
            columns={currentTableConfig.columns}
            data={currentData}
            onAddRow={(newRow) => addTableRow(currentTableConfig.id, newRow)}
            onEditRow={(rowId, updatedRow) => updateTableRow(currentTableConfig.id, rowId, updatedRow)}
            onDeleteRow={(id) => deleteTableRow(currentTableConfig.id, id)}
            onReset={() => resetTable(currentTableConfig.id)}
            enableAdd={true}
            enableEdit={true}
            enableDelete={true}
            enableReset={true}
            enableExport={true}
            filterDistrict={currentTableConfig.filterDistrict}
            districtList={GUJARAT_DISTRICTS}
          />
        </div>

        {/* Statutory Governance & Security Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm text-xs text-[#525E57] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#18221D] uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#C49A5A]" />
              <span>Privileged Admin Access Notice</span>
            </div>
            <p className="leading-relaxed">
              This CMS is restricted to authorized GOPCA personnel. Public website visitors are strictly prohibited from adding, modifying, or deleting records on the public site. Only authenticated admin sessions through this dedicated CMS route can commit changes.
            </p>
          </div>

          <div className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm text-xs text-[#525E57] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#18221D] uppercase tracking-wider text-[11px]">
              <SlidersHorizontal className="w-4 h-4 text-[#C49A5A]" />
              <span>Dual Persistence Architecture</span>
            </div>
            <p className="leading-relaxed">
              All records added or updated here persist across local browser storage and synchronize with the Express backend REST API at <code>/api/cms/tables/:tableId/rows</code>.
            </p>
          </div>
        </div>

      </main>

      {/* Standalone CMS Footer */}
      <footer className="bg-[#163A2B] text-white py-4 px-6 border-t border-[#23503B] text-center text-xs text-[#A6C4B5]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Gujarat Organic Products Certification Agency (GOPCA) Administrative Portal</span>
          <span>Logged in as <strong>{currentUser || 'admin'}</strong> • Societies Registration Act 1860</span>
        </div>
      </footer>
    </div>
  );
}
