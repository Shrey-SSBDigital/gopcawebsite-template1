import React from 'react';
import { Download, CheckCircle2, XCircle } from 'lucide-react';

export default function StandardsPage() {
  const standards = [
    {
      id: 'std-1',
      code: 'NPOP-8TH-ED',
      title: 'National Programme for Organic Production (NPOP) 8th Edition',
      category: 'National Statutory Standard',
      fileSize: '3.4 MB',
      desc: 'The official regulatory standard promulgated by the Ministry of Commerce & Industry, Govt. of India and APEDA governing crop production, animal husbandry, wild harvest, and export equivalence.',
      highlights: [
        'Mandatory 24-month (annuals) & 36-month (perennials) conversion periods',
        'Requirements for Grower Groups (Internal Control Systems)',
        'Chain-of-custody and Tracenet certification rules'
      ]
    },
    {
      id: 'std-2',
      code: 'GOPCA-FIS-2024',
      title: 'GOPCA Internal Field Inspection & Audit Protocol Standard',
      category: 'Agency Standard Operating Procedure',
      fileSize: '1.8 MB',
      desc: 'Operating standards utilized by certified auditors for parcel GPS demarcation, buffer boundary isolation (minimum 3 meters), irrigation risk grading, and harvest segregation.',
      highlights: [
        'Mandatory buffer zone boundary hedges and diversion ditches',
        'Physical cross-referencing with Revenue 7/12 & 8-A records',
        'Exit interview documentation and Non-Compliance Escalation (NC)'
      ]
    },
    {
      id: 'std-3',
      code: 'NPOP-ANNEX-1-2',
      title: 'Permitted Organic Inputs & Soil Conditioners (Annexure 1 & 2)',
      category: 'Input Evaluation Criteria',
      fileSize: '950 KB',
      desc: 'Comprehensive positive list of authorized biological and mineral inputs permitted on certified organic plots without endangering organic status.',
      highlights: [
        'Microbial inoculants (Rhizobium, Azotobacter, Trichoderma)',
        'Farmyard manure, vermicompost, and pressed neem seed cake',
        'Natural rock phosphate, wood ash, and certified biological conditioners'
      ]
    },
    {
      id: 'std-4',
      code: 'NPOP-PROHIB-LST',
      title: 'Strictly Prohibited Substances & Synthetic Agrochemicals List',
      category: 'Negative Statutory Schedule',
      fileSize: '620 KB',
      desc: 'Comprehensive schedule of banned synthetic compounds that result in immediate certification revocation and mandatory 2-year conversion resets.',
      highlights: [
        'Synthetic chemical fertilizers (Urea, DAP, Potash, SSP)',
        'Chemical insecticides, synthetic fungicides, and systemic herbicides',
        'Genetically Modified Organisms (GMO seeds, transgenic materials)'
      ]
    },
    {
      id: 'std-5',
      code: 'GOPCA-MRL-SPEC',
      title: 'Maximum Residue Limits (MRL) & Multi-Residue Testing Protocol',
      category: 'Laboratory Science Protocol',
      fileSize: '1.2 MB',
      desc: 'Rigorous gas chromatography (GC-MS/MS) and liquid chromatography (LC-MS/MS) multi-residue screening thresholds enforced across NABL accredited labs.',
      highlights: [
        'Strict Limit of Quantification (LOQ) non-detection thresholds (0.01 mg/kg)',
        'Heavy metals limits (Lead, Cadmium, Arsenic, Mercury)',
        'Sealed tamper-evident barcoded sample chain-of-custody'
      ]
    }
  ];

  const handleSimulateDownload = (title) => {
    alert(`Downloading statutory document: ${title}`);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Statutory Technical Guidelines</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Our Standards & Guidelines
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              National Programme for Organic Production (NPOP) benchmarks, GOPCA field operating rules, permitted input schedules, and laboratory screening criteria.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Permitted vs Prohibited Comparison Matrix */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Permitted Inputs Box */}
          <div className="bg-white rounded-[3px] p-7 border border-[#D0E2D5] shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#EAE6DE]">
              <div className="w-9 h-9 rounded-[2px] bg-[#EBF3ED] text-[#1B3E2B] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#C49A5A]" />
              </div>
              <div>
                <h3 className="font-editorial text-xl text-[#18221D]">
                  Permitted Substances & Inputs
                </h3>
                <p className="text-xs text-[#1B3E2B] font-medium">NPOP Annexure 1 & 2 Approved</p>
              </div>
            </div>

            <p className="text-xs text-[#525E57] leading-relaxed">
              Only biological and mineral soil enhancers complying with non-synthetic standards are authorized:
            </p>

            <ul className="space-y-2 text-xs text-[#313E37]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                <span><strong>Organic Manures:</strong> Farmyard compost, vermicompost, poultry manure (aerobically decomposed).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                <span><strong>Botanical Derivations:</strong> Cold-pressed neem cake, castor de-oiled cake, Karanj extracts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                <span><strong>Microbial Inoculants:</strong> Rhizobium, Azotobacter, PSB, Trichoderma viride, Pseudomonas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                <span><strong>Mineral Supplements:</strong> Ground rock phosphate, potassium sulfate (mined), gypsum, lime.</span>
              </li>
            </ul>
          </div>

          {/* Prohibited Substances Box */}
          <div className="bg-white rounded-[3px] p-7 border border-[#EFC6C4] shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#EAE6DE]">
              <div className="w-9 h-9 rounded-[2px] bg-[#FAECEB] text-red-800 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <h3 className="font-editorial text-xl text-[#18221D]">
                  Prohibited Substances & Practices
                </h3>
                <p className="text-xs text-red-800 font-medium">Triggers Immediate Disqualification</p>
              </div>
            </div>

            <p className="text-xs text-[#525E57] leading-relaxed">
              Any intentional or drift-borne application of the following compounds permanently revokes certification:
            </p>

            <ul className="space-y-2 text-xs text-[#313E37]">
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                <span><strong>Chemical Nitrogen & Phosphorus:</strong> Urea, Diammonium Phosphate (DAP), Single Superphosphate.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                <span><strong>Synthetic Insecticides:</strong> Organophosphates, synthetic pyrethroids, neonicotinoids, carbamates.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                <span><strong>Chemical Herbicides:</strong> Glyphosate, Atrazine, Paraquat, and all synthetic weedkillers.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                <span><strong>GMO & Synthetic Regulators:</strong> Genetically modified seeds (Bt-cotton hybrids), synthetic growth hormones.</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Standards Documentation Cards */}
        <section className="space-y-8">
          <div>
            <div className="lapland-subtitle mb-2">
              Official Technical Manuals
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
              Technical standards documentation.
            </h2>
            <p className="mt-1 text-sm text-[#5A6860]">
              Download full statutory text and technical standards dockets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((std) => (
              <div 
                key={std.id}
                className="bg-white rounded-[3px] p-6 border border-[#EAE6DE] shadow-sm flex flex-col justify-between hover:border-[#D5D0C6] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#1B3E2B] bg-[#FAF8F5] border border-[#EAE6DE] px-2.5 py-0.5 rounded-[2px]">
                      {std.code}
                    </span>
                    <span className="text-[11px] text-[#718077] font-mono">
                      PDF • {std.fileSize}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg text-[#18221D] leading-snug">
                    {std.title}
                  </h3>

                  <p className="text-xs text-[#525E57] leading-relaxed">
                    {std.desc}
                  </p>

                  <div className="pt-3 border-t border-[#EAE6DE] space-y-1.5 text-[11px] text-[#313E37]">
                    {std.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#C49A5A] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE6DE]">
                  <button
                    onClick={() => handleSimulateDownload(std.title)}
                    className="w-full btn-lapland text-xs py-2.5 px-4 justify-center"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C49A5A]" />
                    <span>Download Standard PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
