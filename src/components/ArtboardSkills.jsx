import React from 'react';
import { 
  Wrench, 
  Sparkles, 
  Cpu, 
  Paintbrush, 
  Code2, 
  Users,
  CheckCircle2
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export default function ArtboardSkills({ 
  currentTheme, 
  isSelected, 
  onSelect,
  customColor,
  onSelectElement
}) {
  const accentColor = customColor || currentTheme.primary;

  const getCategoryIcon = (name) => {
    if (name.includes('Design')) return Paintbrush;
    if (name.includes('Frontend')) return Code2;
    return Users;
  };

  return (
    <div
      id="artboard-skills"
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
          FRAME 05
        </span>
        <span className="text-white/80 font-semibold">TOOLBOX_AND_STACK</span>
        <span className="text-white/40 hidden sm:inline">• Design & Code Matrix</span>
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
          <span className="text-xs font-mono uppercase tracking-wider text-white/50">Core Competencies</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Toolbox & Technical Arsenal
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mt-1">
          The hybrid skill set that lets Victor conceptualize high-end visual systems and engineer them directly into production code.
        </p>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {skillCategories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.name);
          return (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement({
                  id: `skills-${idx}`,
                  name: `Toolbox: ${cat.name}`,
                  type: 'SKILL_MODULE',
                  w: 420,
                  h: 300,
                  fill: accentColor,
                  tools: cat.skills
                });
              }}
              className="p-6 rounded-2xl bg-[#1d1f2b] border border-white/10 hover:border-white/25 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2.5 mb-4">
                  <div 
                    className="p-2 rounded-xl text-white shadow-md"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/30 text-white/90 text-xs font-medium transition-all hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-mono">
                <span>{cat.skills.length} Capabilities</span>
                <span className="text-purple-400 font-semibold">Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
