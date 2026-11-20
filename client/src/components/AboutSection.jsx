import React, { useState } from 'react';
import { procedurePhases } from '../data/staticData';
import { CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const AboutSection = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = procedurePhases[activePhaseIndex] || procedurePhases[0] || {};

  const deliverablesList = Array.isArray(activePhase.deliverables)
    ? activePhase.deliverables
    : typeof activePhase.deliverables === 'string'
    ? activePhase.deliverables.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
            Standard Operating Protocol
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#17221A] leading-tight mb-4">
            Four-Phase Verification & Certification Flow
          </h2>
          <p className="text-sm sm:text-base text-[#47544B] leading-relaxed">
            GOPCA adheres strictly to the ISO/IEC 17065 framework and NPOP 8th Edition mandates, enforcing complete separation between field evaluation, laboratory residue analysis, and certification committee decision-making.
          </p>
        </div>

        {/* 4-Phase Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {procedurePhases.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            const stepNum = phase.num || phase.step || String(idx + 1).padStart(2, '0');
            const stepTitle = phase.title || phase.phase || `Phase ${idx + 1}`;
            const stepDuration = phase.duration || phase.timeline || '';

            return (
              <button
                key={phase.step || phase.num || idx}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all text-xs relative ${
                  isSelected
                    ? 'bg-[#1B3826] text-white border-[#1B3826] shadow-md scale-[1.02]'
                    : 'bg-white text-[#29352D] border-[#DFD8CC] hover:bg-[#F2EDE2]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-[#D4A373]' : 'bg-[#EBF2ED] text-[#1B3826]'
                    }`}
                  >
                    PHASE {stepNum}
                  </span>
                  <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4A373]' : 'text-[#8C6D37]'}`} />
                </div>
                <div className={`font-serif text-base sm:text-lg font-semibold leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-[#18231C]'}`}>
                  {stepTitle}
                </div>
                <div className={`text-[11px] mt-1 truncate ${isSelected ? 'text-[#BED1C4]' : 'text-[#6F7D73]'}`}>
                  {stepDuration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Detail Card */}
        <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C6D37] font-semibold">
                <span>Phase {activePhase.num || activePhase.step || String(activePhaseIndex + 1).padStart(2, '0')} of {procedurePhases.length}</span>
                <span>·</span>
                <span className="text-[#1B3826] font-sans font-medium">{activePhase.subtitle || 'Standard Operating Procedure'}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#18231C]">
                {activePhase.title || activePhase.phase}
              </h3>

              <p className="text-sm text-[#445248] leading-relaxed">
                {activePhase.summary || activePhase.detail}
              </p>

              <div className="pt-3">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#8C6D37] mb-3">
                  Key Verifiable Deliverables & Mandatory Audit Items:
                </div>
                <ul className="space-y-2.5">
                  {deliverablesList.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#2A372E] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Summary Callout */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3826] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#8C6D37]" />
                <span>Regulatory SLA Window</span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E3DCD0]">
                <div className="text-[11px] text-[#717F75] uppercase tracking-wider">Standard Processing SLA</div>
                <div className="font-serif text-2xl font-bold text-[#18231C] mt-0.5">{activePhase.duration || activePhase.timeline || 'Within Timeline'}</div>
                <div className="text-xs text-[#526055] mt-1 leading-normal">
                  Strictly monitored under Gujarat Citizen Charter and APEDA accreditation timeline protocols.
                </div>
              </div>

              <div className="text-xs text-[#526055] leading-relaxed bg-[#EAF2ED] p-3.5 rounded-xl border border-[#CDE0D3]">
                <strong className="text-[#1B3826]">Impartiality Note:</strong> GOPCA officers conducting field inspections do not vote on the final certification award. Decisions rest solely with the autonomous Certification Committee.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
