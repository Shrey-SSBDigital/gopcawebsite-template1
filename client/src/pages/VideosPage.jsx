import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Play, Clock, Languages, CheckCircle2, X } from 'lucide-react';

export default function VideosPage() {
  const { videos } = useCMS();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Technical Capacity Building</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Technical SOP Guidance Videos
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Official video training manuals for FPO leaders, ICS coordinators, internal inspectors, and farm managers in Gujarati and English.
            </p>
          </div>
        </div>
      </section>

      {/* Video Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-[3px] overflow-hidden border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all flex flex-col justify-between"
            >
              <div>
                <div 
                  className="relative h-64 bg-black/90 cursor-pointer group"
                  onClick={() => setActiveVideo(vid)}
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1B3E2B]/90 text-[#C49A5A] flex items-center justify-center shadow-xl group-hover:scale-110 transition-all border border-[#C49A5A]/50">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#122A1E]/90 text-white text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-[2px] backdrop-blur-sm">
                      {vid.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded-[2px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C49A5A]" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#1B3E2B] font-medium">
                    <Languages className="w-4 h-4 text-[#C49A5A]" />
                    <span>Available in: {vid.languages.join(' & ')} (ગુજરાતી / English)</span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-[#18221D] leading-snug">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-[#525E57] leading-relaxed">
                    {vid.description}
                  </p>

                  <div className="pt-3 border-t border-[#EAE6DE] space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#8C744F] uppercase tracking-wider block">
                      Core Technical Modules:
                    </span>
                    {vid.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#3E4C44]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setActiveVideo(vid)}
                  className="w-full btn-lapland text-xs py-3 px-4 justify-center"
                >
                  <Play className="w-3.5 h-3.5 text-[#C49A5A] fill-current" />
                  <span>Watch Guidance Video ({vid.duration})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Training Certification Notice */}
        <div className="bg-white rounded-[3px] p-6 sm:p-8 border border-[#EAE6DE] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-editorial text-xl text-[#18221D]">
              Official Internal Inspector certification.
            </h4>
            <p className="text-xs text-[#5B6760] max-w-2xl">
              GOPCA organizes 3-day certified training programs for internal inspectors of FPOs and Farmer Producer Companies at Anand Agricultural University (AAU) and Junagadh.
            </p>
          </div>
          <a
            href="mailto:dirgopca@gmail.com?subject=Inquiry for Internal Inspector Training Program"
            className="btn-lapland whitespace-nowrap text-xs"
          >
            <span>Inquire for Next Batch</span>
          </a>
        </div>

      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-black rounded-[3px] max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-700 relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={activeVideo.thumbnail}
              >
                Your browser does not support HTML5 video streaming.
              </video>
            </div>

            <div className="p-6 bg-[#163A2B] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#D8B57E]">
                <span className="font-semibold uppercase tracking-wider">{activeVideo.category}</span>
                <span>Duration: {activeVideo.duration} • Bilingual Track</span>
              </div>
              <h3 className="font-editorial text-2xl text-white">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-[#CBD8D1]">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
