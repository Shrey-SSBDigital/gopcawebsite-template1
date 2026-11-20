import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, FileText, Search, CheckCircle2, FileCheck } from 'lucide-react';

export const DownloadsSection = () => {
  const { downloads } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const categories = ['All', 'Application Forms', 'Guidelines & Standards', 'Inspection Templates'];

  const filteredDownloads = useMemo(() => {
    return downloads.filter((d) => {
      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        term === '' ||
        d.title.toLowerCase().includes(term) ||
        d.formNumber.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [downloads, selectedCategory, searchTerm]);

  const handleDownload = (item) => {
    setDownloadingId(item.id);
    const content = `================================================================================
GUJARAT ORGANIC PRODUCTS CERTIFICATION AGENCY (GOPCA)
GOVERNMENT OF GUJARAT · SOCIETIES REGISTRATION ACT, 1860
Accreditation: NPOP/NAB/0028 · APEDA TraceNet Integration
Headquarters: "Beej Pramanan Bhavan", Satellite, Ahmedabad - 380015
================================================================================
DOCUMENT REFERENCE: ${item.formNumber}
DOCUMENT TITLE    : ${item.title}
CATEGORY          : ${item.category}
FORMAT / SIZE     : ${item.fileFormat} (${item.fileSize})
ISSUING AUTHORITY : Directorate of Organic Certification, Ahmedabad
================================================================================

SUMMARY & SCOPE INSTRUCTIONS:
${item.description}

STATUTORY DECLARATION & INSTRUCTIONS:
1. Please print this official form on standard A4 paper.
2. Complete all sections legibly in English or Gujarati.
3. Attach certified cadastral farm maps, 3-year prior cropping history, and soil testing baselines.
4. Enclose statutory fee draft/challan payable to "M/s. GOPCA" at Ahmedabad.
5. Submit completed dossiers directly to:
   Director, Gujarat Organic Products Certification Agency (GOPCA)
   "Beej Pramanan Bhavan", Opp. Gokul Row Houses, Shyamal Cross Road,
   Satellite, Ahmedabad - 380015, Gujarat.
   Phone: 079-26740031 | Email: dirgopca@gmail.com

================================================================================
OFFICIAL SEAL & CITIZEN CHARTER GUARANTEE
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.formNumber.replace(/[\/\s]/g, '_')}_Official_GOPCA.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <section id="downloads" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
              Statutory Resources
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#17221A] leading-tight mb-2">
              Downloads & Prescribed Forms
            </h2>
            <p className="text-xs sm:text-sm text-[#47544B] leading-relaxed">
              Official application packages, internal control checklists, Farm Diary baselines, and NPOP guidelines issued by GOPCA.
            </p>
          </div>

          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search forms, guides..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DFD8CC] rounded-xl text-xs text-[#1F2621] placeholder-[#8A978E] focus:outline-none focus:border-[#1B3826]"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1B3826] text-white font-medium shadow-xs'
                  : 'bg-white text-[#4A574D] border border-[#DFD8CC] hover:bg-[#F2EDE2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredDownloads.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#D5CEBF] p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[#8C6D37] font-semibold text-[11px]">
                    {item.formNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] text-[#556358] border border-[#E3DBD0] text-[10px]">
                    {item.fileFormat} · {item.fileSize}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#18231C] leading-snug mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-[#526055] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                <span className="text-[11px] text-[#78887D] font-medium">
                  {item.category}
                </span>

                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1B3826] bg-[#FAF8F5] border border-[#DFD8CC] rounded-lg hover:bg-[#1B3826] hover:text-white transition-all shadow-2xs"
                >
                  {downloadingId === item.id ? (
                    <>
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Form</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
