import React, { useState } from 'react';
import { 
  Sliders, 
  Code, 
  Palette, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  ExternalLink,
  Download,
  Sparkles,
  Layers,
  Type,
  Box
} from 'lucide-react';
import { personalInfo, defaultThemes } from '../data/portfolioData';

export default function InspectorPanel({ 
  selectedElement, 
  setSelectedElement, 
  currentTheme, 
  setTheme,
  customColors,
  setCustomColors,
  isCollapsed,
  setIsCollapsed
}) {
  const [activeTab, setActiveTab] = useState('design'); // 'design' | 'code'
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Default fallback if no element is selected
  const activeItem = selectedElement || {
    id: 'hero',
    name: '01_HERO_SPECIMEN',
    type: 'FRAME',
    x: 0,
    y: 0,
    w: 1200,
    h: 720,
    radius: 24,
    opacity: 100,
    fill: currentTheme.primary,
    font: 'Space Grotesk',
    description: 'Victor Adebisi portfolio artboard specimen.'
  };

  const handleColorChange = (newColor) => {
    // Update active theme or custom element color
    if (activeItem.id) {
      setCustomColors(prev => ({
        ...prev,
        [activeItem.id]: newColor
      }));
    }
    // Also update theme primary if user wishes
    setTheme(prev => ({
      ...prev,
      primary: newColor,
      glow: `${newColor}66`
    }));
  };

  const currentFill = (activeItem.id && customColors[activeItem.id]) || activeItem.fill || currentTheme.primary;

  const generatedCSS = `.artboard-${activeItem.id || 'element'} {
  width: ${activeItem.w || 800}px;
  min-height: ${activeItem.h || 500}px;
  border-radius: ${activeItem.radius || 24}px;
  background: ${currentFill};
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  font-family: '${activeItem.font || 'Space Grotesk'}', sans-serif;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}`;

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generatedCSS);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button when Collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed right-3 top-20 z-30 p-2.5 rounded-xl bg-[#1e2029]/90 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 shadow-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
          title="Open Design Inspector"
        >
          <ChevronLeft className="w-4 h-4 text-purple-400" />
          <span className="hidden sm:inline">Inspector</span>
        </button>
      )}

      {/* Main Inspector Panel */}
      <aside 
        className={`fixed right-0 top-12 bottom-0 w-80 bg-[#16171d]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col z-30 transition-transform duration-300 ease-in-out select-none ${
          isCollapsed ? 'translate-x-full pointer-events-none' : 'translate-x-0'
        }`}
      >
        {/* Panel Header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-purple-400" />
              Inspector
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/60">
              {activeItem.type || 'LAYER'}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Collapse Inspector"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher: Design vs Inspect Code */}
        <div className="grid grid-cols-2 p-1.5 bg-black/30 border-b border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('design')}
            className={`py-1.5 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'design' 
                ? 'bg-white/15 text-white shadow-sm' 
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Design
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-1.5 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'code' 
                ? 'bg-white/15 text-white shadow-sm' 
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Code (CSS)
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-white/80">
          {/* Active Layer Label */}
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-white/40 uppercase font-mono block mb-1">Active Selection</span>
            <p className="font-semibold text-white text-xs truncate">
              {activeItem.name || 'Entire Workspace'}
            </p>
            {activeItem.client && (
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                Client: {activeItem.client}
              </p>
            )}
          </div>

          {activeTab === 'design' ? (
            <>
              {/* Geometry / Dimensions Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-white/50 font-mono uppercase">
                  <span>Transform & Dimensions</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <span className="text-white/40">W</span>
                    <span className="text-white font-medium">{activeItem.w || 1200} px</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <span className="text-white/40">H</span>
                    <span className="text-white font-medium">{activeItem.h || 720} px</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <span className="text-white/40">Radius</span>
                    <span className="text-white font-medium">{activeItem.radius || 20} px</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <span className="text-white/40">Opacity</span>
                    <span className="text-white font-medium">{activeItem.opacity || 100}%</span>
                  </div>
                </div>
              </div>

              {/* LIVE COLOR CUSTOMIZER (Direct User Request) */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/50 font-mono uppercase flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    Color Fill & Tint
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-mono">
                    LIVE
                  </span>
                </div>

                {/* Color Hex Input & Preview */}
                <div className="flex items-center space-x-2 bg-black/40 p-2 rounded-xl border border-white/10">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 shrink-0 shadow-md">
                    <input 
                      type="color" 
                      value={currentFill.startsWith('#') ? currentFill : '#8b5cf6'}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="absolute -top-4 -left-4 w-16 h-16 cursor-pointer opacity-0"
                    />
                    <div 
                      className="w-full h-full pointer-events-none"
                      style={{ backgroundColor: currentFill }}
                    />
                  </div>
                  <div className="flex-1 font-mono text-xs">
                    <span className="text-white font-semibold">{currentFill.toUpperCase()}</span>
                    <span className="block text-[10px] text-white/40">Click swatch to pick any color</span>
                  </div>
                </div>

                {/* Preset Palette Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-white/40">Studio Presets</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { hex: '#8b5cf6', name: 'Imperial Violet' },
                      { hex: '#06b6d4', name: 'Cyber Cyan' },
                      { hex: '#10b981', name: 'Emerald' },
                      { hex: '#f97316', name: 'Blaze Orange' },
                      { hex: '#ec4899', name: 'Hot Pink' },
                      { hex: '#eab308', name: 'Trophy Gold' },
                      { hex: '#ffffff', name: 'Pure White' },
                      { hex: '#3b82f6', name: 'Electric Blue' }
                    ].map(swatch => (
                      <button
                        key={swatch.hex}
                        onClick={() => handleColorChange(swatch.hex)}
                        title={swatch.name}
                        className="w-6 h-6 rounded-md border border-white/20 transition-transform hover:scale-125 hover:z-10 shadow-sm"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography Specs */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[11px] text-white/50 font-mono uppercase flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-blue-400" />
                  Typography Identity
                </span>
                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-white/40">Display Font</span>
                    <span className="text-white font-medium">Space Grotesk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Body / UI Font</span>
                    <span className="text-white font-medium">Plus Jakarta Sans</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Specs Font</span>
                    <span className="text-white font-medium">JetBrains Mono</span>
                  </div>
                </div>
              </div>

              {/* Tool Stack Tags */}
              {activeItem.tools && activeItem.tools.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] text-white/50 font-mono uppercase">Software Tools</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.tools.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-white/80 text-[10px] font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Inspect Code Tab */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/50 font-mono uppercase">CSS Properties</span>
                <button
                  onClick={handleCopyCSS}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-[11px]"
                >
                  {copiedCSS ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-purple-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {generatedCSS}
              </pre>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/60">
                💡 <span className="font-semibold text-white/80">Frontend Superpower:</span> Victor writes clean, responsive CSS and components directly translating design frames into production code.
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer: Quick Actions */}
        <div className="p-3 border-t border-white/10 bg-black/40 space-y-2">
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-bold text-black transition-all hover:brightness-110 shadow-lg"
            style={{ backgroundColor: currentTheme.secondary }}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>

          <a
            href={personalInfo.resumeUrl}
            download="Adebisi_Victor_Resume.pdf"
            className="w-full flex items-center justify-center space-x-2 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV (PDF)</span>
          </a>
        </div>
      </aside>
    </>
  );
}
