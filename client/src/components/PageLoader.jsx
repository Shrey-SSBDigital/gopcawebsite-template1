import React, { useState, useEffect } from 'react';

export const PageLoader = ({ onLoaded, minDuration = 900 }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing GOPCA Directorate Portal...');
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Step 1: Rapid jump to 45%
    const t1 = setTimeout(() => {
      setProgress(48);
      setStatusText('Syncing APEDA TraceNet Accreditation (NPOP/NAB/0028)...');
    }, 250);

    // Step 2: Jump to 82%
    const t2 = setTimeout(() => {
      setProgress(85);
      setStatusText('Loading Certified Operators & Organic Standards...');
    }, 550);

    // Step 3: Complete to 100%
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Portal Ready');
    }, minDuration - 200);

    // Step 4: Fade out
    const t4 = setTimeout(() => {
      setIsFading(true);
    }, minDuration);

    // Step 5: Unmount
    const t5 = setTimeout(() => {
      setIsDone(true);
      if (onLoaded) onLoaded();
    }, minDuration + 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [minDuration, onLoaded]);

  if (isDone) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Loading GOPCA Portal"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(#EDE7DC_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-md w-full">
        {/* Animated Logo Container */}
        <div className="relative mb-6">
          {/* Dual spinning accent rings */}
          <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-[#8C6D37]/40 animate-spin" style={{ animationDuration: '12s' }}></div>
          <div className="absolute -inset-5 rounded-full border border-[#1B3826]/15 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>

          {/* Logo badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-xl border border-[#DFD8CC] flex items-center justify-center">
            <img
              src="/images/gopca_logo.png"
              alt="GOPCA Official Logo"
              className="w-full h-full object-contain rounded-full animate-pulse"
              style={{ animationDuration: '2.5s' }}
            />
          </div>
        </div>

        {/* Agency Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#17221A] tracking-tight leading-snug">
          Gujarat Organic Products
          <br />
          <span className="font-serif italic font-normal text-[#2A4D37]">Certification Agency</span>
        </h1>

        {/* Statutory Tagline */}
        <div className="text-[11px] sm:text-xs font-semibold text-[#8C6D37] uppercase tracking-[0.2em] mt-2 font-sans">
          GOPCA · Government of Gujarat
        </div>

        {/* Accreditation Pill */}
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-[#EBF2ED] text-[#1B3826] text-[11px] font-mono border border-[#CCE0D3] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span>APEDA NPOP / NAB / 0028</span>
        </div>

        {/* Luxury Progress Bar */}
        <div className="w-64 sm:w-72 h-1.5 bg-[#E5DFD4] rounded-full overflow-hidden mt-7 relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#1B3826] via-[#2D5A3C] to-[#8C6D37] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Meta */}
        <div className="flex items-center justify-between w-64 sm:w-72 text-[11px] text-[#556358] font-sans mt-2.5">
          <span className="truncate pr-2">{statusText}</span>
          <span className="font-mono font-semibold text-[#1B3826] shrink-0">{Math.round(progress)}%</span>
        </div>

        {/* Footer Government Attribution */}
        <div className="text-[10px] text-[#7E8C82] font-sans mt-8 text-center leading-relaxed">
          Department of Agriculture, Farmers Welfare & Co-operation
          <br />
          Societies Registration Act, 1860 · TraceNet Integrated
        </div>
      </div>
    </div>
  );
};
