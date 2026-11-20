import React from 'react';
import { useCMS } from '../context/CMSContext';

export const StatsBanner = () => {
  const { stats } = useCMS();

  return (
    <section className="bg-[#1B3826] text-white py-10 border-y border-[#264A34] relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-1 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          {stats.map((item, idx) => (
            <div key={idx} className={`pt-4 sm:pt-0 ${idx !== 0 ? 'sm:pl-6 lg:pl-8' : ''}`}>
              <div className="text-[11px] uppercase tracking-wider text-[#D4A373] font-semibold mb-1">
                {item.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white font-mono tabular-nums">
                  {item.value}
                </span>
                <span className="text-xs text-[#A8BEAF] font-medium">
                  {item.unit}
                </span>
              </div>
              <div className="text-xs text-[#BED1C4] mt-1.5 leading-snug">
                {item.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
