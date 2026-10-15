import React, { useState } from 'react';
import { 
  FolderGit2, 
  Layers, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Maximize2, 
  Wrench,
  Grid,
  ChevronDown,
  ChevronUp,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { projectCampaigns, projectImages } from '../data/portfolioData';

export default function ArtboardProjects({ 
  currentTheme, 
  isSelected, 
  onSelect,
  customColor,
  onOpenProjectModal,
  onOpenCampaignGallery,
  onSelectElement
}) {
  const accentColor = customColor || currentTheme.primary;
  const [showInlineGrid, setShowInlineGrid] = useState(false);

  const flagshipCampaign = projectCampaigns[0]; // OOU Ibogun Campus College Week
  const otherCampaigns = projectCampaigns.slice(1); // Other projects + upload slot

  return (
    <div
      id="artboard-projects"
      onClick={onSelect}
      className={`relative w-full max-w-[1240px] mx-auto rounded-3xl p-6 sm:p-10 md:p-12 transition-all duration-300 backdrop-blur-2xl border ${
        isSelected 
          ? 'ring-2 shadow-2xl' 
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        backgroundColor: '#14151ecc',
        borderColor: isSelected ? accentColor : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? `0 30px 80px ${currentTheme.glow}` : '0 25px 60px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Figma Frame Badge */}
      <div className="absolute -top-7 left-3 flex items-center space-x-2 text-[11px] font-mono select-none">
        <span 
          className="font-bold px-2 py-0.5 rounded text-white text-[10px] uppercase shadow-sm tracking-wider"
          style={{ backgroundColor: accentColor }}
        >
          FRAME 02
        </span>
        <span className="text-white/80 font-semibold">PROJECT_COLLECTIONS_VAULT</span>
        <span className="text-white/40 hidden sm:inline">• 61 Designs Across 6 Campaigns</span>
      </div>

      {/* Vector corner anchors */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />

      {/* Section Header */}
      <div className="pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">Campaign Archives</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Design Collections & Project Suites
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1.5 leading-relaxed">
            All designs are categorized into dedicated project vaults. Click any project to open its <strong>View All</strong> gallery, or tap any preview flyer to inspect it in high resolution.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/50">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/80">
            61 Total Assets • 6 Projects
          </span>
        </div>
      </div>

      {/* 1. FLAGSHIP PROJECT SUITE: OOU IBOGUN CAMPUS COLLEGE WEEK (30 DESIGNS) */}
      <div className="mt-8 rounded-3xl bg-[#191a26] border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Project Overview & View All CTA */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${accentColor}25`, color: currentTheme.secondary }}
              >
                Flagship Project • 2025
              </span>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                30 Designs Included
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {flagshipCampaign.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-mono mt-1">
                {flagshipCampaign.client}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {flagshipCampaign.summary}
            </p>

            {/* Software Stack */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-white/40">Tools Used</span>
              <div className="flex flex-wrap gap-1.5">
                {flagshipCampaign.tools.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white/80"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs: View All & Inline Toggle */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCampaignGallery(flagshipCampaign);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black transition-all hover:scale-105 shadow-xl cursor-pointer"
                style={{ backgroundColor: currentTheme.secondary }}
              >
                <span>View All 30 College Week Designs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInlineGrid(prev => !prev);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors cursor-pointer"
              >
                <Grid className="w-4 h-4 text-purple-400" />
                <span>{showInlineGrid ? 'Collapse 30 Flyers' : 'Expand 30 Flyers Here'}</span>
                {showInlineGrid ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Column: 4-Item Visual Showcase Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {flagshipCampaign.featuredImages.slice(0, 4).map((fileName, idx) => {
                const item = projectImages.find(p => p.file === fileName) || projectImages[idx];
                return (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProjectModal(item);
                    }}
                    className="group/thumb relative rounded-2xl overflow-hidden bg-black/60 border border-white/15 hover:border-purple-400/80 transition-all duration-300 shadow-xl cursor-pointer aspect-[4/5]"
                  >
                    <img 
                      src={`/projects/${fileName}`} 
                      alt={item?.title || "Flyer"} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-between">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-white/90 self-start">
                        #{idx + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-xs text-white line-clamp-1">{item?.title}</p>
                        <span className="text-[10px] text-purple-300 font-mono flex items-center gap-1 mt-0.5">
                          <Maximize2 className="w-3 h-3" /> Zoom Flyer
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* INLINE EXPANDED GALLERY (When user clicks 'Expand 30 Flyers Here') */}
        {showInlineGrid && (
          <div className="mt-8 pt-8 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-white/50 tracking-wider">
                Full Collection Asset Grid (30 Designs)
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCampaignGallery(flagshipCampaign);
                }}
                className="text-xs text-purple-300 hover:text-white transition-colors font-mono"
              >
                Open Fullscreen Vault ↗
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
              {projectImages.map((flyer, fIdx) => (
                <div
                  key={flyer.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProjectModal(flyer);
                  }}
                  className="group/card rounded-xl overflow-hidden bg-[#15161f] border border-white/10 hover:border-white/30 transition-all cursor-pointer flex flex-col"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-black/60 relative">
                    <img 
                      src={`/projects/${flyer.file}`} 
                      alt={flyer.title} 
                      className="w-full h-full object-cover object-top transition-transform group-hover/card:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-mono text-white/80">
                      #{fIdx + 1}
                    </div>
                  </div>
                  <div className="p-2 bg-[#12131b]">
                    <p className="font-semibold text-[11px] text-white line-clamp-1 group-hover/card:text-purple-300 transition-colors">
                      {flyer.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. OTHER PROJECT CAMPAIGNS GRID (DYNAMIC MULTI-PROJECT COLLECTIONS) */}
      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-purple-400" />
          <span>More Projects & Creative Suites</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCampaigns.map((camp) => {
            if (camp.isPlaceholder) {
              return (
                <div 
                  key={camp.id}
                  className="p-6 rounded-2xl bg-black/30 border-2 border-dashed border-white/15 hover:border-white/30 transition-all flex flex-col justify-between text-center items-center min-h-[300px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 mb-3 mt-4">
                    <UploadCloud className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {camp.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-1.5 leading-relaxed max-w-xs">
                      {camp.summary}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 mt-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Expandable Vault Ready
                  </span>
                </div>
              );
            }

            return (
              <div 
                key={camp.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCampaignGallery(camp);
                }}
                className="p-5 sm:p-6 rounded-2xl bg-[#191a26] border border-white/10 hover:border-white/25 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Category & Asset Count Tag */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                    >
                      {camp.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-bold">
                      {camp.totalAssets} Designs
                    </span>
                  </div>

                  {/* Title & Client */}
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {camp.title}
                    </h4>
                    <p className="text-[11px] text-white/50 font-mono mt-0.5 truncate">
                      {camp.client}
                    </p>
                  </div>

                  {/* Visual Thumbnails Row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {camp.featuredImages.slice(0, 3).map((imgFile, imgIdx) => (
                      <div 
                        key={imgIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          const foundItem = camp.items.find(it => it.file === imgFile) || camp.items[imgIdx];
                          if (foundItem) onOpenProjectModal(foundItem);
                        }}
                        className="aspect-[4/5] rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-white/40 transition-transform hover:scale-105"
                      >
                        <img 
                          src={`/projects/${imgFile}`} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                    {camp.summary}
                  </p>
                </div>

                {/* Footer Action Button */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-1">
                    {camp.tools.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCampaignGallery(camp);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-300 group-hover:text-white transition-colors"
                  >
                    <span>View All ({camp.totalAssets})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
