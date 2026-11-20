import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Award,
  ChevronLeft,
  Volume2,
  ExternalLink,
  Pause,
  Play
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Hero = ({ onOpenApply, onNavigate }) => {
  const { banners = [], images } = useCMS();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const fallbackBanners = [
    {
      id: 1,
      image: '/BannerImageFile/WELCOMINGDYNEMICDIRECTION1214202541117PM.jpg',
      title: 'Welcoming Dynamic Leadership & Direction',
      subtitle: 'Strengthening Organic Certification Governance across Gujarat',
      tag: 'Leadership'
    },
    {
      id: 2,
      image: '/BannerImageFile/PRAKRUTIKDANGICSCERTIFICATION762022124731PM.jpg',
      title: 'Prakrutik Dang ICS Certification Milestone',
      subtitle: 'Empowering tribal organic farming groups in the Dang district',
      tag: 'Prakrutik Kheti'
    },
    {
      id: 3,
      image: '/BannerImageFile/GOVERNINGBOARDMEETING2726202163026PM.jpeg',
      title: 'GOPCA Governing Board Meeting',
      subtitle: 'Strategic state-level policy formulation and operational oversight',
      tag: 'Governance'
    },
    {
      id: 4,
      image: '/BannerImageFile/ADVISORYCOMMITTEEMEET20251214202543038PM.jpeg',
      title: 'Advisory Committee Meet 2025-2026',
      subtitle: 'Aligning certification standards with international benchmarks',
      tag: 'Advisory'
    },
    {
      id: 5,
      image: '/BannerImageFile/REPRESENTATIONGOPCABIOFACH20251214202541055PM.jpg',
      title: 'GOPCA Representation at Biofach 2025',
      subtitle: 'Showcasing Gujarat certified organic commodities at premier trade forums',
      tag: 'Biofach 2025'
    }
  ];

  const slideList = banners.length > 0 ? banners : fallbackBanners;

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideList.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slideList.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideList.length) % slideList.length);
  };

  const currentBanner = slideList[currentSlide] || slideList[0];

  const tickerNotices = [
    'Annual Inspection Plan 2026 published – 389 planned operator inspections across 33 Gujarat districts',
    'Accredited Certification Body NPOP/NAB/0028 under National Programme for Organic Production',
    'TraceNet NPOP 8th Edition compliance mandatory for all Individual & ICS Grower Groups',
    'Download Natural Farming (NFCS) & Organic Grower Group OSP 2.0 application formats',
    'Official Bharat QR Code enabled for seamless statutory certification fee remittances'
  ];

  return (
    <section id="hero" className="relative pt-6 sm:pt-8 pb-12 overflow-hidden bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Government Tagline */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-4 sm:mb-6">
          <span>Government Certification Body of Gujarat State</span>
          <span className="text-[#C5BEAF]" aria-hidden="true">/</span>
          <span>Societies Registration Act, 1860</span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-[#17221A] leading-[1.12]">
              Gujarat Organic Products
              <br />
              <span className="font-serif italic font-normal text-[#2A4D37]">Certification Agency</span>
              <br />
              <span className="font-serif text-2xl tracking-wide sm:text-3xl font-semibold text-[#17221A]">(GOPCA)</span>
            </h1>

            <div className="text-sm sm:text-base text-[#47544B] leading-relaxed space-y-3 font-normal">
              <p>
                Gujarat Organic Products Certification Agency (GOPCA) is a Government Certification Body of the Gujarat State that carries out impartial third party inspection & certification in organic production and handling.
              </p>
              <p className="text-xs sm:text-sm text-[#5D6B60]">
                GOPCA works in accordance with the criteria laid down under the National Programme for Organic Production (NPOP). As an autonomous non-profit body registered under the Societies Registration Act 1860, GOPCA provides reliable, cost-effective certification to smallholders, individual farmers, and Organic Grower Groups (ICS).
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span>Apply for Certification</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>

              <button
                onClick={() => onNavigate('certification')}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-xl hover:bg-[#EFE9DC] transition-all"
              >
                <span>View Procedure</span>
                <ChevronRight className="w-4 h-4 text-[#8C6D37]" />
              </button>

              <button
                onClick={() => onNavigate('active-individual')}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-medium text-[#445348] hover:text-[#18231C] underline-offset-4 hover:underline transition-all"
              >
                <span>Operator Registry (346)</span>
              </button>
            </div>

            {/* Quick trust points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#EDE7DC] text-xs text-[#526055]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B3826] shrink-0" />
                <span>NPOP / NAB / 0028 Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8C6D37] shrink-0" />
                <span>TraceNet Scope Records</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Govt. Subsidized Tariff</span>
              </div>
            </div>
          </div>

          {/* Right Banner Slider (22 Authentic Archive Images) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D5CEBE] shadow-xl bg-white p-2">
              
              {/* Carousel Image Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#16221A] group">
                <img
                  key={currentBanner.image}
                  src={currentBanner.image}
                  alt={currentBanner.title}
                  className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  onError={(e) => {
                    e.currentTarget.src = '/BannerImageFile/WELCOMINGDYNEMICDIRECTION1214202541117PM.jpg';
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                {/* Top Badge: Slide index & tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 text-white font-mono text-[11px] backdrop-blur-md border border-white/20">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(slideList.length).padStart(2, '0')}
                  </span>
                  {currentBanner.tag && (
                    <span className="px-2.5 py-1 rounded-full bg-[#1B3826]/90 text-[#F1E8D9] font-medium text-[11px] backdrop-blur-md border border-[#8C6D37]/40">
                      {currentBanner.tag}
                    </span>
                  )}
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-serif text-lg sm:text-xl font-normal drop-shadow-md text-[#FFF]">
                    {currentBanner.title}
                  </div>
                  <div className="text-xs text-[#E1EADF] drop-shadow-sm mt-0.5 line-clamp-1">
                    {currentBanner.subtitle}
                  </div>
                </div>

                {/* Slide Controls (Prev / Next Arrows) */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous Banner Slide"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Banner Slide"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slider Footer Toolbar */}
              <div className="p-3 bg-[#FAF8F5] rounded-xl mt-2 border border-[#EBE4D8] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-xs py-1">
                  {slideList.slice(0, 10).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentSlide === idx ? 'w-6 bg-[#1B3826]' : 'w-1.5 bg-[#C8C0B2] hover:bg-[#8C6D37]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                  {slideList.length > 10 && (
                    <span className="text-[10px] text-[#8C6D37] font-mono font-semibold ml-1">
                      +{slideList.length - 10}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white border border-[#DDD5C7] text-[#1B3826] hover:bg-[#EFEAE0] transition-colors"
                    title={isPlaying ? 'Pause banner slideshow' : 'Play banner slideshow'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onNavigate('photos')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C6D37] hover:text-[#18231C] px-2 py-1 rounded bg-white border border-[#DDD5C7]"
                  >
                    <span>View Gallery</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
