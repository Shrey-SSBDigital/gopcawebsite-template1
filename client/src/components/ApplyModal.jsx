import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { districtsList } from '../data/staticData';
import { X, ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Copy, Check } from 'lucide-react';

export const ApplyModal = ({ isOpen, onClose, initialScope = 'crop-individual', initialArea = 3.5 }) => {
  if (!isOpen) return null;

  const { addApplication } = useCMS();
  const [step, setStep] = useState(1);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    scope: initialScope,
    fullName: '',
    entityName: '',
    mobile: '',
    email: '',
    aadhaarOrGst: '',
    district: 'Banaskantha',
    taluka: '',
    village: '',
    surveyNumbers: '',
    areaAcres: initialArea,
    primaryCrops: '',
    yearsOrganic: 1,
    previousChemicals: 'Zero synthetic fertilizers for last 12 months',
    hasBufferZones: true,
    hasFarmDiary: true,
    agreedToTerms: false
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotalFee = () => {
    const area = Number(formData.areaAcres) || 1;
    let base = 1500;
    let inspection = area > 10 ? 6000 : 3000;
    if (formData.scope === 'crop-ics') {
      base = 5000;
      inspection = 15000;
    } else if (formData.scope === 'processing') {
      base = 4000;
      inspection = 5000;
    } else if (formData.scope === 'input-approval') {
      base = 3500;
      inspection = 4000;
    }
    const subtotal = base + inspection + 1500 + 4000 + 2500;
    return subtotal + Math.round(subtotal * 0.18);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

    const totalFee = calculateTotalFee();
    const app = await addApplication({
      formData,
      totalFeeCalculated: totalFee
    });
    setSubmittedApp(app);
  };

  const handleCopyAppNo = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.applicationNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-[#D5CEBE] shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#1B3826] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
            <span className="font-serif text-sm sm:text-base font-semibold">
              Online Application for NPOP Organic Certification
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1">
          {submittedApp ? (
            /* Success Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#18231C]">
                Application Successfully Registered!
              </h3>

              <p className="text-xs text-[#526055] max-w-md mx-auto leading-relaxed">
                Your dossier has been logged into the Gujarat Organic Products Certification Agency state portal under statutory tracking.
              </p>

              {/* Application Tracking Badge */}
              <div className="p-4 bg-white rounded-2xl border border-[#D5CEBF] inline-block shadow-xs max-w-sm w-full mx-auto">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] block font-semibold mb-1">
                  Official Application Tracking Number
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-xl font-bold text-[#1B3826]">
                    {submittedApp.applicationNo}
                  </span>
                  <button
                    onClick={handleCopyAppNo}
                    className="p-1.5 hover:bg-[#FAF8F5] rounded text-[#8C6D37]"
                    title="Copy Tracking Number"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#EAF2ED] rounded-xl border border-[#CDE0D3] text-left text-xs text-[#2A4333] space-y-1.5">
                <div className="font-semibold text-[#1B3826]">Next Verification Steps:</div>
                <p>1. Please print a copy of your application acknowledgment for your farm records.</p>
                <p>2. Prepare copies of Revenue 7/12 & 8-A land extracts and Farm Diary.</p>
                <p>3. A designated GOPCA Inspector will contact you on <strong>{formData.mobile}</strong> to schedule field scrutiny.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
                >
                  Close & Return to Portal
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE7DC]">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                      step === 1 ? 'bg-[#1B3826] text-white' : 'bg-[#EBF2ED] text-[#1B3826]'
                    }`}
                  >
                    1
                  </span>
                  <span className={step === 1 ? 'font-bold text-[#18231C]' : 'text-[#7A8A7F]'}>
                    Parcels & Farmer
                  </span>
                </div>
                <span className="text-[#C5BEAF]">·</span>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                      step === 2 ? 'bg-[#1B3826] text-white' : 'bg-[#EBF2ED] text-[#1B3826]'
                    }`}
                  >
                    2
                  </span>
                  <span className={step === 2 ? 'font-bold text-[#18231C]' : 'text-[#7A8A7F]'}>
                    Compliance
                  </span>
                </div>
                <span className="text-[#C5BEAF]">·</span>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                      step === 3 ? 'bg-[#1B3826] text-white' : 'bg-[#EBF2ED] text-[#1B3826]'
                    }`}
                  >
                    3
                  </span>
                  <span className={step === 3 ? 'font-bold text-[#18231C]' : 'text-[#7A8A7F]'}>
                    Fee & Submit
                  </span>
                </div>
              </div>

              {/* STEP 1: Applicant & Farm Parcels */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Certification Scope *
                      </label>
                      <select
                        value={formData.scope}
                        onChange={(e) => handleChange('scope', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      >
                        <option value="crop-individual">Individual Crop Production (NPOP-CR-01)</option>
                        <option value="crop-ics">Grower Group / ICS (NPOP-ICS-02)</option>
                        <option value="processing">Processing & Handling Facility (NPOP-PR-03)</option>
                        <option value="input-approval">Commercial Organic Input Approval</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Full Name of Farmer / Operator *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => handleChange('mobile', e.target.value)}
                        placeholder="e.g. 9824012345"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="e.g. ramesh@farm.com"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Aadhaar / GSTIN
                      </label>
                      <input
                        type="text"
                        value={formData.aadhaarOrGst}
                        onChange={(e) => handleChange('aadhaarOrGst', e.target.value)}
                        placeholder="XXXX-XXXX-XXXX"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        District (Gujarat) *
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      >
                        {districtsList.filter((d) => d !== 'All').map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Taluka *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.taluka}
                        onChange={(e) => handleChange('taluka', e.target.value)}
                        placeholder="e.g. Veraval"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Village *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.village}
                        onChange={(e) => handleChange('village', e.target.value)}
                        placeholder="e.g. Ambalgadh"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Survey / Khata Nos.
                      </label>
                      <input
                        type="text"
                        value={formData.surveyNumbers}
                        onChange={(e) => handleChange('surveyNumbers', e.target.value)}
                        placeholder="e.g. Survey 142/2, 143"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Total Area (Ha) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        required
                        value={formData.areaAcres}
                        onChange={(e) => handleChange('areaAcres', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#445348] mb-1">
                        Primary Crops Grown *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.primaryCrops}
                        onChange={(e) => handleChange('primaryCrops', e.target.value)}
                        placeholder="e.g. Kesar Mango, Groundnut"
                        className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.fullName || !formData.mobile || !formData.village) {
                          alert('Please enter your Name, Mobile, and Village.');
                          return;
                        }
                        setStep(2);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
                    >
                      <span>Proceed to Compliance</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Conversion History & Compliance */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-[#445348] mb-1">
                      Years under Natural / Organic Practice
                    </label>
                    <select
                      value={formData.yearsOrganic}
                      onChange={(e) => handleChange('yearsOrganic', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                    >
                      <option value={1}>1 Year (New Conversion - C1 Phase)</option>
                      <option value={2}>2 Years (In-Conversion - C2 Phase)</option>
                      <option value={3}>3+ Years (Eligible for Full Organic Status)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#445348] mb-1">
                      Historical Agrochemical Use (Prior 36 Months)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.previousChemicals}
                      onChange={(e) => handleChange('previousChemicals', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                    ></textarea>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasBufferZones}
                        onChange={(e) => handleChange('hasBufferZones', e.target.checked)}
                        className="mt-0.5 accent-[#1B3826]"
                      />
                      <span className="text-xs text-[#2A372E]">
                        I confirm that my farm parcels possess at least 3-meter physical buffer zones / natural hedges isolating them from conventional neighbors.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasFarmDiary}
                        onChange={(e) => handleChange('hasFarmDiary', e.target.checked)}
                        className="mt-0.5 accent-[#1B3826]"
                      />
                      <span className="text-xs text-[#2A372E]">
                        I undertake to maintain a daily Farm Diary recording all biological input preparations, seed sourcing, and harvest logs for audit inspection.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-xs font-medium text-[#505F55] hover:text-[#18231C]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors"
                    >
                      <span>Proceed to Fee Review</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Fee Review & Statutory Undertaking */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#DFD8CC] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#526055]">Statutory Scope:</span>
                      <strong className="text-[#18231C]">{formData.scope}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#526055]">Declared Area:</span>
                      <strong className="font-mono text-[#18231C]">{formData.areaAcres} Hectares</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EDE7DC]">
                      <span className="font-semibold text-[#18231C]">Total Calculated Fee (inc. 18% GST):</span>
                      <strong className="font-mono text-base font-bold text-[#1B3826]">
                        ₹{calculateTotalFee().toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div className="p-3 bg-[#EAF2ED] rounded-xl border border-[#CDE0D3] text-xs text-[#2A4333] leading-relaxed">
                    <strong>Statutory Note:</strong> Advance quotation fee must be deposited by Demand Draft or UPI prior to the field inspector’s arrival. Full fee schedules are governed by the Societies Registration Act, 1860.
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="mt-0.5 accent-[#1B3826]"
                      />
                      <span className="text-xs text-[#2A372E] font-medium leading-relaxed">
                        I hereby solemnly declare that all particulars submitted in this application are true and correct. I agree to abide by the NPOP standards and GOPCA inspection rules, and agree to allow unannounced soil sampling audits.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[#EDE7DC]">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-xs font-medium text-[#505F55] hover:text-[#18231C]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.agreedToTerms}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs disabled:opacity-50"
                    >
                      <span>Submit Official Application</span>
                      <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
