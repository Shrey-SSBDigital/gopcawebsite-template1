import React from 'react';
import { useCMS } from '../context/CMSContext';
import { FileText, Bell, Calendar, ArrowRight, Download } from 'lucide-react';

export const CircularsSection = () => {
  const { circulars } = useCMS();

  const handleDownloadNotice = (circ) => {
    const text = `================================================================================
GUJARAT ORGANIC PRODUCTS CERTIFICATION AGENCY (GOPCA)
STATUTORY GAZETTE NOTIFICATION & ADMINISTRATIVE CIRCULAR
================================================================================
REF NO.   : ${circ.referenceNo}
DATE      : ${circ.date}
CATEGORY  : ${circ.category}
TITLE     : ${circ.title}
================================================================================

ORDER SUMMARY & ADMINISTRATIVE DIRECTIVES:
${circ.summary}

Issued under the authority of Director, GOPCA, Ahmedabad.
Approved by Governing Board of Gujarat State.
Beej Pramanan Bhavan, Satellite, Ahmedabad - 380015.
================================================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${circ.referenceNo.replace(/[\/\s]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
            Official Directives
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#17221A] leading-tight mb-2">
            Gazette Circulars & Notifications
          </h2>
          <p className="text-xs sm:text-sm text-[#47544B] leading-relaxed">
            Statutory notices issued under the National Programme for Organic Production (NPOP) and Government of Gujarat administrative guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {circulars.map((circ) => (
            <div
              key={circ.id}
              className="bg-white rounded-2xl border border-[#D5CEBF] p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[#8C6D37] text-[11px] font-semibold">
                    {circ.referenceNo}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#718075]">
                    <Calendar className="w-3 h-3" />
                    <span>{circ.date}</span>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#EBF2ED] text-[#1B3826] border border-[#CCE0D3]">
                    {circ.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#18231C] leading-snug mb-2">
                  {circ.title}
                </h3>

                <p className="text-xs text-[#526055] leading-relaxed mb-6">
                  {circ.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                <span className="text-[10px] text-[#8C6D37] font-medium">
                  {circ.isImportant ? '★ High Priority Order' : 'Standard Gazette Notice'}
                </span>

                <button
                  type="button"
                  onClick={() => handleDownloadNotice(circ)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B3826] hover:underline"
                >
                  <Download className="w-3.5 h-3.5 text-[#8C6D37]" />
                  <span>Download Notice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
