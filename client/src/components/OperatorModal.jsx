import React, { useState } from 'react';
import { ShieldCheck, X, Download, MapPin, Calendar, Award, CheckCircle2, Printer } from 'lucide-react';

export const OperatorModal = ({ operator, onClose }) => {
  if (!operator) return null;
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloading(true);
    const memo = `================================================================================
AGRICULTURAL AND PROCESSED FOOD PRODUCTS EXPORT DEVELOPMENT AUTHORITY (APEDA)
NATIONAL PROGRAMME FOR ORGANIC PRODUCTION (NPOP)
OFFICIAL SCOPE CERTIFICATE (DOMESTIC & EXPORT ACCREDITATION)
================================================================================
ISSUED BY CERTIFICATION BODY:
Gujarat Organic Products Certification Agency (GOPCA)
Accreditation Code: NPOP/NAB/0028
Headquarters: "Beej Pramanan Bhavan", Satellite, Ahmedabad - 380015, Gujarat.
================================================================================
CERTIFICATE REFERENCE NO. : ${operator.scopeCertificateNo || 'ORG/SC/2601/008891'}
OPERATOR REGISTRATION NO. : ${operator.registrationNumber}
DATE OF REGISTRATION      : ${operator.validFrom || '2025-12-01'}
VALIDITY PERIOD           : ${operator.validFrom || '2025-12-01'} to ${operator.validUntil || '2026-11-30'}

OPERATOR / ENTITY DETAILS:
Name of Operator          : ${operator.name}
Operator Category         : ${operator.operatorType}
State / Jurisdiction      : Gujarat State, India
Registered Location       : Village ${operator.village || 'Ambalgadh'}, Taluka ${operator.taluka || 'Veraval'}, District ${operator.district}
Certified Parcel Area     : ${Number(operator.totalAreaHectares || 0).toFixed(2)} Hectares
${operator.farmerCount ? `Member Smallholder Count  : ${operator.farmerCount} Farmers\n` : ''}
CERTIFIED ORGANIC PRODUCTS / CROPS:
${operator.cropTypes ? operator.cropTypes.map(c => `• ${c} (Certified Organic under NSOP Criteria)`).join('\n') : '• Mixed Organic Agricultural Produce'}

CERTIFICATION STATUS:
${operator.status.toUpperCase()}
Compliant with National Standards for Organic Production (NSOP) Section 4.
TraceNet Database Status: Active & Verified on National Portal.
Annual Surveillance Audit: Mandatory prior to certificate expiration.

================================================================================
AUTHORIZED SIGNATORY:
Director / Lead Certification Evaluator
Gujarat Organic Products Certification Agency (GOPCA)
Ahmedabad, Gujarat, India.
================================================================================`;

    const blob = new Blob([memo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Scope_Certificate_${operator.registrationNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-[#D5CEBE] shadow-2xl overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="bg-[#1B3826] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wide">
            <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
            <span className="truncate">APEDA TraceNet Official Scope Certificate</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body Container */}
        <div className="p-4 sm:p-8 bg-white border-b border-[#E5DFD4] overflow-y-auto flex-1 relative">
          <div className="border border-[#DCD5C5] p-6 sm:p-8 rounded-2xl relative bg-[#FAF9F6] space-y-6">
            {/* Top Seal Emblems */}
            <div className="flex items-center justify-between border-b border-[#E0D9CB] pb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/gopca_logo.png"
                  alt="GOPCA Seal"
                  className="w-10 h-10 object-contain rounded-full bg-white p-0.5 border border-[#C5BEAF] shadow-xs"
                />
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] font-semibold">
                    Government of Gujarat
                  </div>
                  <div className="font-serif text-sm font-bold text-[#18231C]">
                    GOPCA Certification Body
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF2ED] text-[#1B3826] border border-[#CCE0D3]">
                  NPOP / NAB / 0028
                </span>
                <div className="text-[10px] text-[#718075] font-mono mt-0.5">
                  TraceNet Certified
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center py-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold">
                Scope Certificate of Registration
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18231C] mt-1">
                {operator.name}
              </h3>
              <div className="font-mono text-xs text-[#526055] mt-1">
                Registration No: <strong>{operator.registrationNumber}</strong>
              </div>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-[#E8E2D5]">
              <div>
                <span className="text-[11px] text-[#78887D] block">Operator Classification</span>
                <span className="font-semibold text-[#18231C]">{operator.operatorType}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#78887D] block">Certified Cultivated Area</span>
                <span className="font-mono font-bold text-[#1B3826]">
                  {Number(operator.totalAreaHectares || 0).toFixed(2)} Hectares
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#78887D] block">Location & District</span>
                <span className="text-[#18231C] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8C6D37] shrink-0" />
                  <span>{operator.village}, Dist. {operator.district}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#78887D] block">Certification Validity</span>
                <span className="font-mono text-[#18231C]">
                  {operator.validFrom || '2025-12-01'} to {operator.validUntil || '2026-11-30'}
                </span>
              </div>
            </div>

            {/* Certified Crops */}
            <div className="pt-2">
              <span className="text-[11px] text-[#78887D] block mb-1">
                Authorized Certified Organic Crops / Varieties:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {operator.cropTypes?.map((crop, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 bg-white border border-[#D5CEBF] rounded-lg text-[#1B3826]"
                  >
                    ✓ {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Scope Certificate Number */}
            <div className="p-3 bg-[#EAF2ED] rounded-xl border border-[#CDE0D3] flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#2D5A3C] font-semibold block">
                  APEDA TraceNet Scope Certificate No:
                </span>
                <span className="font-mono font-bold text-[#1B3826]">
                  {operator.scopeCertificateNo || 'ORG/SC/2601/008891'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-white text-emerald-800 font-semibold text-[11px] border border-emerald-300">
                {operator.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#DFD8CC] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-[11px] text-[#6E7D73]">
            Validated on APEDA TraceNet under Government of Gujarat Accreditation.
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#2C3830] bg-white border border-[#DFD8CC] rounded-xl hover:bg-[#F2ECE0] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{downloading ? 'Preparing...' : 'Download Certificate'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
