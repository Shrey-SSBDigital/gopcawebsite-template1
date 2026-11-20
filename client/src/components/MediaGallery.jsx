import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Image as ImageIcon,
  Play,
  Calendar,
  MapPin,
  FolderOpen,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const MediaGallery = ({ mediaType = 'photos', onNavigate }) => {
  const { albums = [], videos = [] } = useCMS();
  const [selectedAlbumId, setSelectedAlbumId] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  // Flatten all photos from all albums for "all" view
  const allPhotos = albums.flatMap((alb) =>
    (alb.photos || []).map((p) => ({
      ...p,
      albumTitle: alb.title,
      albumCategory: alb.category
    }))
  );

  const displayedPhotos =
    selectedAlbumId === 'all'
      ? allPhotos
      : (albums.find((a) => a.id === selectedAlbumId)?.photos || []).map((p) => ({
          ...p,
          albumTitle: albums.find((a) => a.id === selectedAlbumId)?.title,
          albumCategory: albums.find((a) => a.id === selectedAlbumId)?.category
        }));

  const openLightbox = (photo) => {
    setLightboxPhoto(photo);
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
  };

  const nextLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIdx = displayedPhotos.findIndex((p) => p.src === lightboxPhoto.src);
    const nextIdx = (currentIdx + 1) % displayedPhotos.length;
    setLightboxPhoto(displayedPhotos[nextIdx]);
  };

  const prevLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIdx = displayedPhotos.findIndex((p) => p.src === lightboxPhoto.src);
    const prevIdx = (currentIdx - 1 + displayedPhotos.length) % displayedPhotos.length;
    setLightboxPhoto(displayedPhotos[prevIdx]);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C6D37] uppercase tracking-widest font-semibold mb-4">
          <button onClick={() => onNavigate('home')} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <span>Media & Archives</span>
          <span>/</span>
          <span className="text-[#18231C]">
            {mediaType === 'photos' ? 'Photo Gallery (Albums)' : 'Video Documentaries'}
          </span>
        </div>

        {/* Title */}
        <div className="max-w-3xl mb-8">
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
            {mediaType === 'photos' ? 'Field Inspection & Training Albums' : 'Educational Video Documentaries'}
          </h1>
          <p className="text-base text-[#46544A] leading-relaxed">
            {mediaType === 'photos'
              ? 'Official archival photographic documentation of APEDA training sessions, Anand Agricultural University orientations, and on-site grower group inspections in Gujarat.'
              : 'Educational documentaries explaining the NPOP inspection methodology, internal control standards, and organic package of practices.'}
          </p>
        </div>

        {/* Photos Section with Albums */}
        {mediaType === 'photos' && (
          <div className="space-y-10">
            
            {/* Album Cover Cards */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#8C6D37] font-bold mb-4">
                <FolderOpen className="w-4 h-4 text-[#1B3826]" />
                <span>Official Photo Albums ({albums.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {albums.map((alb) => {
                  const isActive = selectedAlbumId === alb.id;
                  const photoCount = (alb.photos || []).length;
                  return (
                    <button
                      key={alb.id}
                      onClick={() => setSelectedAlbumId(isActive ? 'all' : alb.id)}
                      className={`text-left rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#1B3826] text-white border-[#1B3826] shadow-lg scale-[1.02]'
                          : 'bg-white text-[#18231C] border-[#D5CEBF] hover:border-[#8C6D37] shadow-sm hover:shadow'
                      }`}
                    >
                      <div>
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-[#EAE3D6]">
                          <img
                            src={alb.coverImage}
                            alt={alb.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/BannerImageFile/WELCOMINGDYNEMICDIRECTION1214202541117PM.jpg';
                            }}
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                            {photoCount} Photos
                          </div>
                        </div>

                        <span
                          className={`text-[10px] uppercase font-mono tracking-wider font-semibold block mb-1 ${
                            isActive ? 'text-[#D4A373]' : 'text-[#8C6D37]'
                          }`}
                        >
                          {alb.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold leading-snug">
                          {alb.title}
                        </h3>
                      </div>

                      <div
                        className={`text-xs mt-3 pt-3 border-t line-clamp-2 ${
                          isActive ? 'border-white/20 text-[#D0DEC4]' : 'border-[#EDE7DC] text-[#556458]'
                        }`}
                      >
                        {alb.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photos Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EDE7DC]">
              <div className="text-xs text-[#526055]">
                Showing{' '}
                <strong className="text-[#18231C] font-semibold">{displayedPhotos.length}</strong>{' '}
                archival photographs{' '}
                {selectedAlbumId !== 'all' && (
                  <span>
                    in "
                    {albums.find((a) => a.id === selectedAlbumId)?.title}"
                  </span>
                )}
              </div>

              {selectedAlbumId !== 'all' && (
                <button
                  onClick={() => setSelectedAlbumId('all')}
                  className="text-xs font-semibold text-[#8C6D37] hover:text-[#18231C] underline underline-offset-4"
                >
                  View All Albums ({allPhotos.length} photos)
                </button>
              )}
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPhotos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => openLightbox(photo)}
                  className="bg-white rounded-2xl border border-[#D5CEBF] overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#18231C]">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/BannerImageFile/WELCOMINGDYNEMICDIRECTION1214202541117PM.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-[#1B3826] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#1B3826]/90 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider rounded-md">
                        {photo.albumCategory || 'Archive'}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-[10px] font-mono text-[#8C6D37] uppercase font-bold mb-1">
                        {photo.albumTitle}
                      </div>
                      <h4 className="font-serif text-base font-semibold text-[#18231C] leading-snug">
                        {photo.caption}
                      </h4>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 border-t border-[#EDE7DC] flex items-center justify-between text-[11px] text-[#718075]">
                    <span>Gujarat Organic Archives</span>
                    <span className="text-[#8C6D37] font-semibold">Click to expand</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Videos Grid */}
        {mediaType === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-2xl border border-[#D5CEBF] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-[#1B3826]">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#1B3826] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-[#1B3826]" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/75 text-white text-[10px] font-mono rounded">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] uppercase font-semibold text-[#8C6D37] mb-1">
                      {vid.category}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#18231C] leading-snug mb-2">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-[#526055] leading-relaxed">
                      {vid.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 text-[11px] text-[#718075] border-t border-[#EDE7DC]">
                  Published: {vid.date} · Directorate Media Division
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            aria-label="Close Preview"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            aria-label="Previous Photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextLightbox}
            aria-label="Next Photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.caption}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-[11px] font-mono uppercase text-[#D4A373] tracking-wider block mb-1">
                {lightboxPhoto.albumTitle}
              </span>
              <p className="font-serif text-lg sm:text-xl font-normal leading-snug">
                {lightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
