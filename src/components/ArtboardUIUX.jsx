import React from 'react';
import { 
  Layout, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Globe, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { uiProjects } from '../data/portfolioData';

export default function ArtboardUIUX({ 
  currentTheme, 
  isSelected, 
  onSelect,
  customColor,
  onSelectElement
}) {
  const accentColor = customColor || currentTheme.primary;

  return (
    <div
      id="artboard-uiux"
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
          FRAME 03
        </span>
        <span className="text-white/80 font-semibold">UI_UX_AND_FRONTEND_ENGINEERING</span>
        <span className="text-white/40 hidden sm:inline">• Product Systems</span>
      </div>

      {/* Resize corner handles if selected */}
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
          <span className="text-xs font-mono uppercase tracking-wider text-white/50">Digital Products</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          UI/UX & Frontend Systems
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mt-1">
          From Figma wireframes and user interaction states to live, high-performance web applications built with clean architecture.
        </p>
      </div>

      {/* Interactive Case Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {uiProjects.map((project) => (
          <div
            key={project.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement({
                id: project.id,
                name: project.title,
                type: 'PRODUCT_UI',
                client: project.role,
                w: 1440,
                h: 900,
                tools: project.tags,
                fill: accentColor
              });
            }}
            className="p-6 rounded-2xl bg-[#1d1f2b] border border-white/10 hover:border-white/25 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
                >
                  {project.tool}
                </span>
                <span className="text-[11px] text-white/40 font-mono">
                  {project.role}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-white/60 leading-relaxed mt-2.5">
                {project.description}
              </p>

              {/* Highlights checklist */}
              <div className="mt-4 space-y-1.5 text-xs text-white/80">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags footer */}
            <div className="pt-5 mt-4 border-t border-white/10 flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
