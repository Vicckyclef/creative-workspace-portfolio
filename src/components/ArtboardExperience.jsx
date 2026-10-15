import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  Lock, 
  CheckCircle, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function ArtboardExperience({ 
  currentTheme, 
  isSelected, 
  onSelect,
  customColor,
  onSelectElement
}) {
  const accentColor = customColor || currentTheme.primary;
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  return (
    <div
      id="artboard-experience"
      onClick={onSelect}
      className={`relative w-full max-w-[1280px] mx-auto rounded-3xl p-6 sm:p-10 transition-all duration-300 backdrop-blur-xl border ${
        isSelected 
          ? 'ring-2 shadow-2xl' 
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        backgroundColor: '#161720cc',
        borderColor: isSelected ? accentColor : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? `0 25px 60px ${currentTheme.glow}` : '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header Label */}
      <div className="absolute -top-7 left-3 flex items-center space-x-2 text-[11px] font-mono text-white/50 select-none">
        <span 
          className="font-bold px-2 py-0.5 rounded text-white text-[10px] uppercase shadow-sm"
          style={{ backgroundColor: accentColor }}
        >
          FRAME 04
        </span>
        <span className="text-white/80 font-semibold">CAREER_LAYERS_STACK</span>
        <span className="text-white/40 hidden sm:inline">• 5 Chronological Layers</span>
      </div>

      {/* Resize handles */}
      {isSelected && (
        <>
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
        </>
      )}

      {/* Section Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="text-xs font-mono uppercase tracking-wider text-white/50">Experience & Track Record</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Layers of Journey
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mt-1">
          Interactive layers panel displaying engineering roles, international internship, operational leadership, and 5+ years of graphic design freelancing.
        </p>
      </div>

      {/* Photoshop / Figma Layer Stack Format */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left: Layer Selector List */}
        <div className="lg:col-span-6 space-y-2.5">
          {experienceData.map((item, idx) => {
            const isItemActive = activeLayerIndex === idx;
            return (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLayerIndex(idx);
                  onSelectElement({
                    id: `exp-${idx}`,
                    name: `Layer: ${item.role}`,
                    type: 'TIMELINE_LAYER',
                    client: item.company,
                    w: 640,
                    h: 180,
                    fill: accentColor
                  });
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isItemActive
                    ? 'bg-white/10 border-white/30 shadow-md'
                    : 'bg-black/30 border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 text-white/40">
                    <Eye className={`w-3.5 h-3.5 ${isItemActive ? 'text-purple-400' : ''}`} />
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                        {item.period}
                      </span>
                      <h4 className="font-semibold text-xs text-white">
                        {item.role}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      {item.company}
                    </p>
                  </div>
                </div>

                <div 
                  className={`w-2.5 h-2.5 rounded-full transition-transform ${isItemActive ? 'scale-125' : 'opacity-30'}`}
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Layer Preview Card */}
        <div className="lg:col-span-6">
          {experienceData[activeLayerIndex] && (
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[11px] font-mono text-purple-300">
                    Layer #{activeLayerIndex + 1} Selected
                  </span>
                  <span className="text-[11px] font-mono text-white/40">
                    Blend Mode: Normal • 100% Opacity
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {experienceData[activeLayerIndex].role}
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-1">
                    {experienceData[activeLayerIndex].company} — {experienceData[activeLayerIndex].period}
                  </p>
                </div>

                <p className="text-sm text-white/80 leading-relaxed pt-2">
                  {experienceData[activeLayerIndex].summary}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span>Verified in Resume PDF</span>
                <span className="font-mono text-[10px] text-emerald-400">STATUS: PROVEN</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
