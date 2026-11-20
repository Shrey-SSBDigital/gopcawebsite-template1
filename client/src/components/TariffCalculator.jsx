import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Calculator, ArrowRight, Copy, Check, Info, FileSpreadsheet, Sparkles } from 'lucide-react';

export const TariffCalculator = ({ onPreFillApply }) => {
  const { feeStructure } = useCMS();
  const [selectedStream, setSelectedStream] = useState('crop-individual');
  const [areaHectares, setAreaHectares] = useState(3.5);
  const [farmerCount, setFarmerCount] = useState(85);
  const [sampleCount, setSampleCount] = useState(1);
  const [travelZone, setTravelZone] = useState('central');
  const [copied, setCopied] = useState(false);

  const rateConfig = feeStructure[selectedStream] || {
    baseApplicationFee: 1500,
    inspectionFeePerDay: 3000,
    reportScrutinyFee: 1500,
    defaultDays: 1,
    title: 'Individual Crop Production',
    description: 'Statutory tariff for single farm holders up to 10 hectares. 100% advance payable in favour of M/s. GOPCA payable at Ahmedabad.'
  };

  const calculation = useMemo(() => {
    let mandays = rateConfig.defaultDays || 1;
    if (selectedStream === 'crop-ics') {
      mandays = Math.max(2, Math.ceil(Math.ceil(Math.sqrt(farmerCount)) / 4));
    } else if (selectedStream === 'crop-individual' && areaHectares > 10) {
      mandays = 2;
    }

    const applicationFee = rateConfig.baseApplicationFee;
    const inspectionFees = mandays * rateConfig.inspectionFeePerDay;
    const scrutinyFee = rateConfig.reportScrutinyFee;
    const labTestingFee = sampleCount * 4000;
    const travelPerDiem = travelZone === 'central' ? 2500 : 4500;

    const subtotal = applicationFee + inspectionFees + scrutinyFee + labTestingFee + travelPerDiem;
    const gst18 = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst18;

    const advanceRate = selectedStream === 'crop-ics' ? 0.75 : 1.0;
    const advancePayable = Math.round(grandTotal * advanceRate);
    const balancePayable = grandTotal - advancePayable;

    return {
      mandays,
      applicationFee,
      inspectionFees,
      scrutinyFee,
      labTestingFee,
      travelPerDiem,
      subtotal,
      gst18,
      grandTotal,
      advancePercentage: advanceRate * 100,
      advancePayable,
      balancePayable
    };
  }, [selectedStream, areaHectares, farmerCount, sampleCount, travelZone, rateConfig]);

  const handleCopyMemo = () => {
    const memo = `================================================================================
GUJARAT ORGANIC PRODUCTS CERTIFICATION AGENCY (GOPCA)
STATUTORY NPOP TARIFF ESTIMATE & COST MEMO
================================================================================
Certification Scope : ${rateConfig.title}
Certified Area      : ${selectedStream === 'crop-ics' ? `${farmerCount} Farmers` : `${areaHectares} Hectares`}
Audit Mandays       : ${calculation.mandays} On-site Day(s)
Travel & TA/DA Zone : ${travelZone === 'central' ? 'Central Gujarat (₹2,500)' : 'Distant/Kutch/Saurashtra (₹4,500)'}
Residue Lab Samples : ${sampleCount} Sample(s) (@ ₹4,000/sample)

FEE BREAKDOWN:
- Base Application Fee      : ₹${calculation.applicationFee.toLocaleString()}
- Field Inspection Mandays  : ₹${calculation.inspectionFees.toLocaleString()}
- Report Scrutiny Fee       : ₹${calculation.scrutinyFee.toLocaleString()}
- NABL Residue Testing Fee  : ₹${calculation.labTestingFee.toLocaleString()}
- Inspector TA/DA Per Diem  : ₹${calculation.travelPerDiem.toLocaleString()}
--------------------------------------------------------------------------------
Subtotal Fee Amount         : ₹${calculation.subtotal.toLocaleString()}
Statutory GST @ 18%         : ₹${calculation.gst18.toLocaleString()}
--------------------------------------------------------------------------------
GRAND TOTAL PAYABLE         : ₹${calculation.grandTotal.toLocaleString()}
================================================================================
Advance Payable (${calculation.advancePercentage}%)    : ₹${calculation.advancePayable.toLocaleString()}
Balance Payable on Approval : ₹${calculation.balancePayable.toLocaleString()}
Payment Mode: Demand Draft / Cheque / Online in favour of "M/s. GOPCA" payable at Ahmedabad.
Accreditation: NPOP/NAB/0028 | Beej Pramanan Bhavan, Satellite, Ahmedabad.
================================================================================`;

    navigator.clipboard.writeText(memo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="tariff" className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-[#E3DCD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
            Statutory Transparency
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#17221A] leading-tight mb-4">
            Interactive NPOP Tariff Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#47544B] leading-relaxed">
            Standardized fee schedule approved by the Government of Gujarat Governing Board. Calculate exact inspection mandays, laboratory testing allocations, TA/DA, and applicable 18% GST with zero hidden costs.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Stream Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#738278] font-semibold mb-2">
                Certification Scope / Stream
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'crop-individual', label: 'Individual Crop Production' },
                  { id: 'crop-ics', label: 'Grower Group (ICS up to 500)' },
                  { id: 'processing', label: 'Processing & Handling Facility' },
                  { id: 'input-approval', label: 'Commercial Organic Input Approval' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStream(s.id)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedStream === s.id
                        ? 'bg-[#1B3826] text-white border-[#1B3826] font-medium'
                        : 'bg-[#FAF8F5] text-[#2C3830] border-[#E0D9CD] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#6E7D73] mt-2 italic">
                {rateConfig.description}
              </p>
            </div>

            {/* Dynamic Controls based on Stream */}
            {selectedStream === 'crop-individual' && (
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <label className="font-medium text-[#2E3C32]">Total Cultivated Area (Hectares)</label>
                  <span className="font-mono font-bold text-[#1B3826] text-sm">{areaHectares} Ha</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="40"
                  step="0.5"
                  value={areaHectares}
                  onChange={(e) => setAreaHectares(parseFloat(e.target.value))}
                  className="w-full accent-[#1B3826]"
                />
                <div className="flex justify-between text-[10px] text-[#78887D] font-mono mt-1">
                  <span>0.5 Ha (Smallholder)</span>
                  <span>10 Ha (Threshold: 1 Manday)</span>
                  <span>40 Ha (Large Parcel)</span>
                </div>
              </div>
            )}

            {selectedStream === 'crop-ics' && (
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <label className="font-medium text-[#2E3C32]">Total Registered Member Farmers (ICS)</label>
                  <span className="font-mono font-bold text-[#1B3826] text-sm">{farmerCount} Farmers</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="500"
                  step="5"
                  value={farmerCount}
                  onChange={(e) => setFarmerCount(parseInt(e.target.value))}
                  className="w-full accent-[#1B3826]"
                />
                <div className="flex justify-between text-[10px] text-[#78887D] font-mono mt-1">
                  <span>25 Farmers</span>
                  <span>Formula: ceil(sqrt(N)/4) mandays</span>
                  <span>500 Farmers Max</span>
                </div>
              </div>
            )}

            {/* Residue Testing Samples */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#2E3C32] mb-1">
                  Laboratory Soil/Crop Samples
                </label>
                <select
                  value={sampleCount}
                  onChange={(e) => setSampleCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] focus:outline-none focus:border-[#1B3826]"
                >
                  <option value={1}>1 Sample (Standard Mandate - ₹4,000)</option>
                  <option value={2}>2 Samples (High-Risk/Surveillance - ₹8,000)</option>
                  <option value={3}>3 Samples (Large Multi-Plot - ₹12,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2E3C32] mb-1">
                  Inspector Travel / TA-DA Zone
                </label>
                <select
                  value={travelZone}
                  onChange={(e) => setTravelZone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] focus:outline-none focus:border-[#1B3826]"
                >
                  <option value="central">Central Gujarat / Ahmedabad Cluster (₹2,500)</option>
                  <option value="distant">Distant District: Kutch / Saurashtra / Dangs (₹4,500)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quotation Memo Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-4 mb-4">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] font-semibold">
                  Statutory Estimate
                </div>
                <div className="font-serif text-lg font-bold text-[#18231C]">
                  Official Cost Quotation
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 bg-[#EBF2ED] text-[#1B3826] font-bold rounded">
                {calculation.mandays} Manday(s)
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#4D5B51]">
                <span>Base Application Dossier Fee</span>
                <span className="font-mono tabular-nums">₹{calculation.applicationFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4D5B51]">
                <span>Field Audit ({calculation.mandays} Mandays @ ₹{rateConfig.inspectionFeePerDay})</span>
                <span className="font-mono tabular-nums">₹{calculation.inspectionFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4D5B51]">
                <span>Independent Scrutiny & Committee Fee</span>
                <span className="font-mono tabular-nums">₹{calculation.scrutinyFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4D5B51]">
                <span>NABL Accredited Residue Analysis ({sampleCount})</span>
                <span className="font-mono tabular-nums">₹{calculation.labTestingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4D5B51]">
                <span>Travel & Inspector TA/DA</span>
                <span className="font-mono tabular-nums">₹{calculation.travelPerDiem.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-[#EDE7DC] flex justify-between font-semibold text-[#18231C]">
                <span>Subtotal Fee</span>
                <span className="font-mono tabular-nums">₹{calculation.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6A786F]">
                <span>Statutory GST @ 18%</span>
                <span className="font-mono tabular-nums">₹{calculation.gst18.toLocaleString()}</span>
              </div>
            </div>

            {/* Grand Total Box */}
            <div className="mt-5 p-4 bg-[#FAF8F5] rounded-2xl border border-[#E3DCD0] flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#738278] font-semibold">
                  Grand Total Payable
                </div>
                <div className="text-[11px] text-[#525F56] mt-0.5">
                  Includes GST, travel, testing & Scope Certificate
                </div>
              </div>
              <div className="font-serif text-3xl font-medium text-[#18231C] font-mono tabular-nums">
                ₹{calculation.grandTotal.toLocaleString()}
              </div>
            </div>

            {/* Advance vs Balance Breakdown */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#EAF2ED] rounded-xl border border-[#CDE0D3]">
                <span className="text-[11px] text-[#2D5A3C] font-semibold block">
                  Advance ({calculation.advancePercentage}%):
                </span>
                <span className="font-mono text-base font-bold text-[#1B3826] tabular-nums">
                  ₹{calculation.advancePayable.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#477054] block mt-0.5">
                  Prior to on-site inspection
                </span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E0D9CD]">
                <span className="text-[11px] text-[#717F75] font-semibold block">
                  Balance on Approval:
                </span>
                <span className="font-mono text-base font-medium text-[#18231C] tabular-nums">
                  ₹{calculation.balancePayable.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#717F75] block mt-0.5">
                  On issuance of Certificate
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-[#EDE7DC] flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => onPreFillApply(selectedStream, areaHectares)}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
              >
                <span>Apply with this Estimate</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>

              <button
                type="button"
                onClick={handleCopyMemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-[#38463D] bg-[#FAF8F5] border border-[#D5CEBF] rounded-xl hover:bg-[#EFE9DC] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1B3826]" />
                    <span>Memo Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#8C6D37]" />
                    <span>Copy Quotation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
