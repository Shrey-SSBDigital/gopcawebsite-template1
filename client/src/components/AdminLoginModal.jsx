import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, X, Lock, ArrowRight, AlertCircle, UserCheck } from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  const { officers, loginAdmin } = useCMS();
  const [selectedOfficerId, setSelectedOfficerId] = useState(officers[0]?.id || 'adm-01');
  const [pin, setPin] = useState('1860');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await loginAdmin(selectedOfficerId, pin);
    setLoading(false);

    if (result && result.success) {
      onSuccess();
    } else {
      setError(result?.message || 'Invalid 4-digit PIN. Please re-enter.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-md w-full border border-[#D5CEBF] shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#1B3826] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
            <h3 className="font-serif text-base sm:text-lg font-bold">
              GOPCA Directorate Officer Login
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-md text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          <div>
            <label className="block font-medium text-[#445348] mb-1">
              Select Authorized Officer Account *
            </label>
            <select
              value={selectedOfficerId}
              onChange={(e) => {
                setSelectedOfficerId(e.target.value);
                if (error) setError(null);
              }}
              className="w-full px-3 py-2.5 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
            >
              {officers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} — {o.role} ({o.division || 'Ahmedabad HQ'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-medium text-[#445348]">
                4-Digit Security PIN *
              </label>
              <span className="text-[10px] text-[#8C6D37] font-mono">
                Statutory Code: 1860
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter 4-digit PIN"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DFD8CC] rounded-xl font-mono text-sm tracking-widest text-[#18231C] focus:outline-none focus:border-[#1B3826]"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 bg-[#EBF2ED] rounded-xl border border-[#CCE0D3] text-[11px] text-[#2A4333] leading-relaxed flex items-start gap-2">
            <UserCheck className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
            <div>
              <strong>Audit Notice:</strong> This CMS controls live public registers, circular publications, approved input catalogs, and inspection targets across Gujarat State.
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#505F55] hover:text-[#18231C] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
            >
              <span>{loading ? 'Authenticating...' : 'Access CMS Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
