import React, { useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  MessageSquare, 
  ExternalLink,
  Sparkles,
  Layers,
  Wrench
} from 'lucide-react';
import { allProjectImages, personalInfo } from '../data/portfolioData';

export default function ProjectModal({ 
  project, 
  onClose, 
  onNext, 
  onPrev, 
  currentTheme 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  const currentIndex = allProjectImages.findIndex(p => p.id === project.id);
  const total = allProjectImages.length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl select-none"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#171822] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar for mobile & close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-black transition-colors border border-white/20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: High-Resolution Graphic Viewer */}
        <div className="relative flex-1 bg-black/80 flex items-center justify-center p-4 min-h-[360px] max-h-[60vh] lg:max-h-[92vh] overflow-hidden group">
          <img 
            src={`/projects/${project.file}`} 
            alt={project.title} 
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
          />

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black transition-all border border-white/10 opacity-70 group-hover:opacity-100"
            title="Previous Artwork"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black transition-all border border-white/10 opacity-70 group-hover:opacity-100"
            title="Next Artwork"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Index Counter Badge */}
          <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white/80 border border-white/10">
            {currentIndex + 1} / {total}
          </div>
        </div>

        {/* Right Side: Design Details & Specifications */}
        <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between bg-[#191b26] border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
          <div className="space-y-4">
            {/* Category Pill */}
            <div className="flex items-center justify-between">
              <span 
                className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${currentTheme.primary}25`, color: currentTheme.secondary }}
              >
                {project.category}
              </span>
              <span className="text-[11px] font-mono text-white/40">
                Artwork #{currentIndex + 1}
              </span>
            </div>

            {/* Title & Client */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {project.title}
              </h2>
              <p className="text-xs text-white/60 font-mono mt-1">
                Client: {project.client}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {project.description}
            </p>

            {/* Software Tools Used */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1.5">
                <Wrench className="w-3 h-3 text-purple-400" />
                Software & Workflow
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((t, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white/90 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-2.5">
            <a
              href={`https://wa.me/2348133849382?text=${encodeURIComponent(`Hi Victor, I love this project: "${project.title}". Can we discuss a similar design for my brand?`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg"
              style={{ backgroundColor: currentTheme.secondary }}
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Request Similar Design</span>
            </a>

            <a
              href={`/projects/${project.file}`}
              download={project.file}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download High-Res Flyer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
