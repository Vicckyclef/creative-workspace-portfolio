import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Sparkles, 
  RotateCcw,
  Compass
} from 'lucide-react';
import { TOOLS } from './Toolbar';

export default function BottomControls({ 
  zoomLevel, 
  setZoomLevel, 
  onResetZoom, 
  activeTool,
  currentTheme,
  activeArtboard,
  onJumpToArtboard
}) {
  const currentToolObj = TOOLS.find(t => t.id === activeTool) || TOOLS[0];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.15, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.15, 0.5));
  };

  return (
    <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 select-none">
      {/* Active Tool Status Bar */}
      <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#16171e]/90 backdrop-blur-md border border-white/10 shadow-xl text-xs text-white/80">
        <span 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: currentTheme.primary }} 
        />
        <span className="font-semibold text-white">
          {currentToolObj.name} ({currentToolObj.hotkey})
        </span>
        <span className="text-white/40 font-mono hidden lg:inline">
          — {currentToolObj.description}
        </span>
      </div>

      {/* Artboard Jump Pills for Small/Medium screens */}
      <div className="flex md:hidden items-center bg-[#16171e]/90 backdrop-blur-md border border-white/10 rounded-xl p-1 space-x-1 text-xs">
        {[
          { id: 'hero', label: 'Hero' },
          { id: 'projects', label: 'Works' },
          { id: 'uiux', label: 'UI/UX' },
          { id: 'contact', label: 'Hire' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onJumpToArtboard(item.id)}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              activeArtboard === item.id ? 'bg-white/20 text-white font-bold' : 'text-white/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Zoom Controls Widget */}
      <div className="flex items-center bg-[#16171e]/90 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-xl space-x-1 text-xs">
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetZoom}
          className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold text-white/90 hover:bg-white/10 transition-colors"
          title="Reset to 100%"
        >
          {Math.round(zoomLevel * 100)}%
        </button>

        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-3 bg-white/10 mx-0.5" />

        <button
          onClick={onResetZoom}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Fit Canvas"
        >
          <Maximize className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
