import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, Search } from 'lucide-react';

export default function DownloadCenterPage() {
  const { downloads } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Application Forms', 'Directives & Plans', 'RTI Disclosures'];

  const filteredDocs = useMemo(() => {
    return downloads.filter(doc => {
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      const q = searchTerm.toLowerCase();
      const matchesSearch = searchTerm.trim() === '' ||
        doc.title.toLowerCase().includes(q) ||
        doc.code.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.issuingWing.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [downloads, selectedCategory, searchTerm]);

  const handleDownload = (doc) => {
    const textContent = `Gujarat Organic Products Certification Agency (GOPCA)\nDocument: ${doc.title}\nCode: ${doc.code}\nIssuing Wing: ${doc.issuingWing}\nCategory: ${doc.category}\nStatus: Official Statutory Document under Societies Registration Act 1860 & NPOP (APEDA/MoC&I).\n\n${doc.description}`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.code}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Statutory Transparency & Public Records</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Document Download Center
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Official application formats (Form A, B, C, W), operational circulars, statewide inspection plans, and proactive disclosures under Section 4(1)(b) of the RTI Act.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Controls: Search & Category Filter Pills */}
        <div className="bg-white p-6 rounded-[3px] border border-[#EAE6DE] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7B8881] absolute left-3 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents by code, title, or issuing division..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] rounded-[2px] border border-[#D5D0C6] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#1B3E2B] transition-all placeholder:text-[#8E9B93]"
              />
            </div>

            {/* Total Badge */}
            <div className="text-xs text-[#5D6B63] font-medium whitespace-nowrap">
              Showing <strong className="text-[#18221D]">{filteredDocs.length}</strong> statutory documents
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-[2px] text-xs font-medium tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1B3E2B] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#44524A] hover:bg-[#EFECE5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#18221D] bg-[#FAF8F5] border border-[#EAE6DE] px-2 py-0.5 rounded-[2px]">
                    {doc.code}
                  </span>
                  <span className="text-[11px] font-medium text-[#8C6221] bg-[#FAF4E8] border border-[#EEDDBF] px-2 py-0.5 rounded-[2px]">
                    {doc.format} • {doc.size}
                  </span>
                </div>

                <h3 className="font-editorial text-lg text-[#18221D] leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-[#525E57] leading-relaxed">
                  {doc.description}
                </p>

                <div className="pt-3 border-t border-[#EAE6DE] flex items-center justify-between text-[11px] text-[#69766F]">
                  <span>Issuing Wing:</span>
                  <strong className="text-[#18221D]">{doc.issuingWing}</strong>
                </div>
              </div>

              {/* Download Action */}
              <div className="mt-6 pt-4 border-t border-[#EAE6DE]">
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="w-full btn-lapland text-xs py-2.5 px-4 justify-center"
                >
                  <Download className="w-3.5 h-3.5 text-[#C49A5A]" />
                  <span>Download Document</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
