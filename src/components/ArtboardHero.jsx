import React from 'react';
import { 
  Sparkles, 
  Download, 
  ExternalLink, 
  MapPin, 
  ArrowRight,
  MousePointer2,
  Palette,
  Maximize2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ArtboardHero({ 
  currentTheme, 
  isSelected, 
  onSelect,
  customColor,
  onOpenProjects,
  onOpenContact
}) {
  const accentColor = customColor || currentTheme.primary;

  return (
    <div
      id="artboard-hero"
      onClick={onSelect}
      className={`relative w-full max-w-[1240px] mx-auto rounded-3xl p-6 sm:p-10 md:p-14 transition-all duration-300 backdrop-blur-2xl border ${
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
          FRAME 01
        </span>
        <span className="text-white/80 font-semibold">HERO_SPEC</span>
        <span className="text-white/40 hidden sm:inline">• 1280 × 720</span>
      </div>

      {/* Illustrator / Figma Vector Anchor Points at corners */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#14151e] shadow-sm rounded-[1px]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Side: Bold, High-Impact Typography (Clean & Creative, No Jam-Packed Walls of Text) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status & Sub-label */}
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/15 backdrop-blur-md"
              style={{ backgroundColor: `${accentColor}25` }}
            >
              <span className="w-2 h-2 rounded-full animate-studio-pulse" style={{ backgroundColor: accentColor }} />
              <span>Available for Hire</span>
            </span>

            <span className="text-xs font-mono text-white/40 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              Lagos, Nigeria
            </span>
          </div>

          {/* Punchy Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
              Design with depth.<br />
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, #ffffff 30%, ${currentTheme.secondary} 100%)` 
                }}
              >
                Code with craft.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-medium">
              Adebisi Victor Adeolu <span className="text-white/30 font-light">—</span> Frontend Engineer & Visual Designer
            </p>
          </div>

          {/* Minimal 1-Sentence Creative Pitch */}
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl font-normal">
            Specializing in bold 3D typography, high-octane event branding, and responsive web systems that convert visual concepts into living production code.
          </p>

          {/* Creative Micro-Stats (Replaces dense checklists with clean visual counters) */}
          <div className="flex items-center gap-6 sm:gap-10 pt-2 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block">5+</span>
              <span className="text-white/40 text-[11px]">Years Visual Craft</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block">30+</span>
              <span className="text-white/40 text-[11px]">Showcase Assets</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block">B.Sc.</span>
              <span className="text-white/40 text-[11px]">Computer Eng.</span>
            </div>
          </div>

          {/* Clean 2-Button CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onOpenProjects}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-black transition-all hover:scale-105 hover:brightness-110 shadow-xl cursor-pointer"
              style={{ backgroundColor: currentTheme.secondary }}
            >
              <span>Explore 30 Designs</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white transition-all border border-white/15 hover:border-white/30"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Let's Talk Work</span>
            </a>

            <a
              href={personalInfo.resumeUrl}
              download="Adebisi_Victor_Resume.pdf"
              className="px-4 py-3.5 rounded-2xl text-xs font-mono text-white/60 hover:text-white transition-colors"
              title="Download Resume"
            >
              Resume (PDF) ↓
            </a>
          </div>
        </div>

        {/* Right Side: Creative Artboard Frame for Victor's Picture */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
            {/* Ambient Dynamic Background Glow */}
            <div 
              className="absolute -inset-4 rounded-3xl blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />

            {/* Simulated Collaborative Figma Cursor */}
            <div 
              className="absolute -top-6 -right-3 z-30 flex items-center space-x-1.5 pointer-events-none transition-transform hover:scale-110"
              style={{ transform: 'rotate(-4deg)' }}
            >
              <MousePointer2 
                className="w-4 h-4 fill-current stroke-white/40" 
                style={{ color: currentTheme.secondary }} 
              />
              <span 
                className="px-2 py-0.5 rounded-md text-[10px] font-bold text-black font-mono shadow-xl uppercase tracking-wider"
                style={{ backgroundColor: currentTheme.secondary }}
              >
                Victor (Creator)
              </span>
            </div>

            {/* The Framed Photo Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#1a1b24] shadow-2xl group">
              {/* Top Studio Frame Bar */}
              <div className="px-3.5 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-1 text-white/80 font-medium">hero_specimen.jpg</span>
                </div>
                <span className="text-[10px] text-white/40">100% RGB</span>
              </div>

              {/* Photo Display */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black/80">
                <img 
                  src={personalInfo.heroImage} 
                  alt="Adebisi Victor Adeolu" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Bottom dark blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Studio Spec Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-white">Victor Adebisi</p>
                    <p className="text-[11px] text-white/60 font-mono">Lagos, NG • UTC+1</p>
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </div>
            </div>

            {/* Floating Layer Spec Pin */}
            <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#191a24] border border-white/15 shadow-xl text-[10px] font-mono text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Layer: #Artboard_Hero</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
