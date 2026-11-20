import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, Check, Clock, Sprout, Users, Factory, FlaskConical } from 'lucide-react';

export const CertificationStreams = ({ onSelectStream }) => {
  const { streams } = useCMS();

  const getStreamIcon = (id) => {
    switch (id) {
      case 'crop-individual':
        return <Sprout className="w-5 h-5 text-[#D4A373]" />;
      case 'crop-ics':
        return <Users className="w-5 h-5 text-[#D4A373]" />;
      case 'processing':
        return <Factory className="w-5 h-5 text-[#D4A373]" />;
      case 'input-approval':
        return <FlaskConical className="w-5 h-5 text-[#D4A373]" />;
      default:
        return <Sprout className="w-5 h-5 text-[#D4A373]" />;
    }
  };

  return (
    <section id="streams" className="py-16 sm:py-24 bg-[#F5EFE6]/60 border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
            Statutory Scope Framework
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#17221A] leading-tight mb-4">
            Official Certification Streams
          </h2>
          <p className="text-sm sm:text-base text-[#47544B] leading-relaxed">
            Accredited by APEDA under NPOP/NAB/0028, GOPCA audits and certifies across four comprehensive operational streams spanning agricultural fields, community collectives, milling factories, and approved bio-inputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3826] flex items-center justify-center shadow-xs">
                    {getStreamIcon(stream.id)}
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#FAF8F5] text-[#1B3826] rounded border border-[#DFD8CC]">
                    {stream.code}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#18231C] leading-snug mb-1">
                  {stream.title}
                </h3>
                <div className="text-xs font-medium text-[#8C6D37] mb-3">
                  {stream.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-[#4E5C52] leading-relaxed mb-6">
                  {stream.description}
                </p>

                {/* Key Requirements List */}
                <div className="mb-6 space-y-2 border-t border-[#EDE7DC] pt-4">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D37]">
                    Mandatory Compliance:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#2A372E]">
                    {stream.keyRequirements?.slice(0, 3).map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-[#EDE7DC] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-[#718075] uppercase tracking-wider">Conversion / Turnaround</div>
                  <div className="font-medium text-[#18231C] text-[11px]">{stream.transitionPeriod}</div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectStream(stream.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-lg hover:bg-[#132A1C] transition-colors"
                >
                  <span>Select & Apply</span>
                  <ArrowRight className="w-3 h-3 text-[#D4A373]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
