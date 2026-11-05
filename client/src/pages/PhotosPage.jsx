import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, ZoomIn, X } from 'lucide-react';

export default function PhotosPage() {
  const { photos } = useCMS();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Photographic Evidence Archive</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Field Audit Photo Gallery
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Official photographic records of field inspections, soil core extractions, ICS community assemblies, and organic crop harvests across Gujarat.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-[3px] overflow-hidden border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-black/60 px-3 py-1 rounded-[2px] backdrop-blur-sm">
                      <ZoomIn className="w-3.5 h-3.5 text-[#C49A5A]" />
                      Click to Enlarge
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#1B3E2B]/90 backdrop-blur-sm text-white text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-[2px]">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#69766F]">
                    <span className="flex items-center gap-1 font-medium text-[#18221D]">
                      <MapPin className="w-3 h-3 text-[#C49A5A]" />
                      {item.location}
                    </span>
                    <span className="font-mono text-[10px]">{item.auditRef}</span>
                  </div>

                  <h3 className="font-editorial text-xl text-[#18221D] group-hover:text-[#1B3E2B] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#525E57] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5 pt-2 text-[11px] text-[#718077] border-t border-[#EAE6DE] flex items-center justify-between">
                <span>Recorded: {item.date}</span>
                <span className="font-semibold text-[#1B3E2B] group-hover:underline">Open Lightbox →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Modal Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white rounded-[3px] max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-700 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#8C6221] bg-[#FAF4E8] px-2.5 py-0.5 rounded-[2px] border border-[#EEDDBF]">
                  {selectedPhoto.category}
                </span>
                <span className="text-gray-500 font-mono text-xs">
                  Audit Ref: <strong>{selectedPhoto.auditRef}</strong> • Date: {selectedPhoto.date}
                </span>
              </div>

              <h3 className="font-editorial text-2xl text-[#18221D]">
                {selectedPhoto.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4E5B53] leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="pt-2 text-xs text-[#1B3E2B] font-medium flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#C49A5A]" />
                <span>Jurisdiction: {selectedPhoto.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
