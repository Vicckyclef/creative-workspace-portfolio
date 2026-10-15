import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  Palette, 
  HelpCircle, 
  Check, 
  Sparkles,
  ExternalLink,
  Layers,
  Eye,
  Sliders,
  FileText,
  RotateCcw,
  MousePointer2
} from 'lucide-react';
import { personalInfo, defaultThemes } from '../data/portfolioData';

export default function TopMenuBar({ 
  currentTheme, 
  setTheme, 
  activeArtboard, 
  onJumpToArtboard, 
  showRulers, 
  setShowRulers,
  showGrid,
  setShowGrid,
  onResetCanvas,
  stampsCount,
  notesCount,
  onClearCanvasAnnotations,
  cursorStyle,
  setCursorStyle
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="h-12 border-b border-white/10 bg-[#16171d]/95 backdrop-blur-md px-3 flex items-center justify-between z-30 select-none relative">
      {/* Left: Brand & File Menus */}
      <div className="flex items-center space-x-3">
        {/* Designer Studio Logo Badge */}
        <div className="flex items-center space-x-2 mr-2">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white shadow-md text-xs tracking-wider transition-colors duration-300"
            style={{ backgroundColor: currentTheme.primary }}
          >
            VA
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              Victor Adebisi <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-white/10 text-white/80">STUDIO</span>
            </span>
          </div>
        </div>

        {/* Dropdown Menus */}
        <div className="hidden md:flex items-center space-x-1 text-xs text-white/70">
          {/* File Menu */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('file')}
              className={`px-2.5 py-1 rounded hover:bg-white/10 hover:text-white transition-colors ${activeDropdown === 'file' ? 'bg-white/15 text-white' : ''}`}
            >
              File
            </button>
            {activeDropdown === 'file' && (
              <div 
                className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-[#1e2029] border border-white/15 shadow-2xl py-1 z-50 text-xs"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={personalInfo.resumeUrl} 
                  download="Adebisi_Victor_Resume.pdf"
                  className="flex items-center justify-between px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    Download Resume (PDF)
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">⌘D</span>
                </a>
                <button 
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    {copiedLink ? 'Link Copied!' : 'Copy Portfolio URL'}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">⌘C</span>
                </button>
                <div className="h-[1px] bg-white/10 my-1" />
                <a 
                  href={personalInfo.behanceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    View Behance Profile
                  </span>
                  <span className="text-[10px] text-white/40">↗</span>
                </a>
              </div>
            )}
          </div>

          {/* View Menu */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('view')}
              className={`px-2.5 py-1 rounded hover:bg-white/10 hover:text-white transition-colors ${activeDropdown === 'view' ? 'bg-white/15 text-white' : ''}`}
            >
              View
            </button>
            {activeDropdown === 'view' && (
              <div 
                className="absolute top-full left-0 mt-1 w-52 rounded-lg bg-[#1e2029] border border-white/15 shadow-2xl py-1 z-50 text-xs"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setShowRulers(!showRulers)}
                  className="w-full flex items-center justify-between px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span>Design Rulers</span>
                  <span className="font-mono text-[10px] text-purple-400">{showRulers ? 'ON' : 'OFF'}</span>
                </button>
                <button 
                  onClick={() => setShowGrid(!showGrid)}
                  className="w-full flex items-center justify-between px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span>Dot Grid Canvas</span>
                  <span className="font-mono text-[10px] text-purple-400">{showGrid ? 'ON' : 'OFF'}</span>
                </button>
                <div className="h-[1px] bg-white/10 my-1" />
                <button 
                  onClick={onResetCanvas}
                  className="w-full flex items-center justify-between px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Zoom & View
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">100%</span>
                </button>
              </div>
            )}
          </div>

          {/* Cursor Style Menu */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('cursor')}
              className={`px-2.5 py-1 rounded hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1 ${activeDropdown === 'cursor' ? 'bg-white/15 text-white' : ''}`}
            >
              <MousePointer2 className="w-3 h-3 text-purple-400" />
              <span>Cursor</span>
            </button>
            {activeDropdown === 'cursor' && (
              <div 
                className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-[#1e2029] border border-white/15 shadow-2xl py-1 z-50 text-xs"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {[
                  { id: 'figma', label: 'Figma Multiplayer Arrow', desc: 'Vector pointer with user tag' },
                  { id: 'precision', label: 'Precision Crosshair', desc: 'Ruler & alignment ring' },
                  { id: 'dot', label: 'Minimal Studio Dot', desc: 'Sleek ambient glowing dot' },
                  { id: 'system', label: 'Default OS Cursor', desc: 'Standard system pointer' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCursorStyle(c.id);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors flex items-start justify-between"
                  >
                    <div>
                      <p className="font-semibold text-white/90">{c.label}</p>
                      <p className="text-[10px] text-white/40">{c.desc}</p>
                    </div>
                    {cursorStyle === c.id && (
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Canvas Clear Annotations (if stamps/notes placed) */}
          {(stampsCount > 0 || notesCount > 0) && (
            <button
              onClick={onClearCanvasAnnotations}
              className="px-2 py-0.5 rounded text-[11px] bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 transition-colors flex items-center gap-1"
              title="Clear added stamps and sticky notes"
            >
              <span>Clear Canvas ({stampsCount + notesCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Center: Interactive Artboard Navigators */}
      <div className="hidden lg:flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 space-x-1 text-xs">
        {[
          { id: 'hero', label: '01. Identity' },
          { id: 'projects', label: '02. Graphics Gallery' },
          { id: 'uiux', label: '03. UI/UX Apps' },
          { id: 'experience', label: '04. Timeline' },
          { id: 'skills', label: '05. Toolbox' },
          { id: 'contact', label: '06. Hire / Brief' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onJumpToArtboard(item.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeArtboard === item.id
                ? 'bg-white/15 text-white shadow-sm font-semibold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Theme Color Palette & Direct CTA */}
      <div className="flex items-center space-x-2">
        {/* Availability Status Badge */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-studio-pulse" />
          <span>Available for Projects</span>
        </div>

        {/* Live Color Accent Quick Switcher */}
        <div className="flex items-center bg-black/30 border border-white/10 rounded-lg p-1 space-x-1">
          {defaultThemes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme)}
              title={`Switch workspace theme to ${theme.name}`}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-125 ${
                currentTheme.id === theme.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: theme.primary }}
            />
          ))}
        </div>

        {/* Resume Button */}
        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 hover:border-white/30 shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Resume</span>
        </a>

        {/* Hire Me / WhatsApp Contact */}
        <a
          href={personalInfo.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-black transition-all hover:brightness-110 shadow-lg"
          style={{ backgroundColor: currentTheme.secondary }}
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Hire Victor</span>
        </a>
      </div>
    </header>
  );
}
