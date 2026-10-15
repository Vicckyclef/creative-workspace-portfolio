import React from 'react';
import { 
  MousePointer, 
  Hand, 
  PaintBucket, 
  Pipette, 
  Stamp, 
  StickyNote, 
  Ruler,
  Sparkles
} from 'lucide-react';

export const TOOLS = [
  {
    id: 'select',
    name: 'Select Tool',
    hotkey: 'V',
    icon: MousePointer,
    description: 'Click any artboard or element to select and inspect its properties.'
  },
  {
    id: 'hand',
    name: 'Hand Tool',
    hotkey: 'H',
    icon: Hand,
    description: 'Click and drag anywhere on the canvas to freely pan around.'
  },
  {
    id: 'bucket',
    name: 'Paint Bucket Tool',
    hotkey: 'G',
    icon: PaintBucket,
    description: 'Click any card or section to paint it with your active accent color!'
  },
  {
    id: 'eyedropper',
    name: 'Eyedropper Tool',
    hotkey: 'I',
    icon: Pipette,
    description: 'Click an element or color chip to sample its hex code.'
  },
  {
    id: 'stamp',
    name: 'Designer Stamp Tool',
    hotkey: 'S',
    icon: Stamp,
    description: 'Click anywhere to stamp review badges: "Approved", "Pixel Perfect", etc.'
  },
  {
    id: 'note',
    name: 'Sticky Note Tool',
    hotkey: 'C',
    icon: StickyNote,
    description: 'Click anywhere on the workspace to leave feedback or a message.'
  },
  {
    id: 'ruler',
    name: 'Guide & Rulers',
    hotkey: 'R',
    icon: Ruler,
    description: 'Show/hide alignment guides and spacing redlines like Figma.'
  }
];

export default function Toolbar({ 
  activeTool, 
  setActiveTool, 
  currentTheme,
  showRulers,
  setShowRulers 
}) {
  const handleToolClick = (toolId) => {
    if (toolId === 'ruler') {
      setShowRulers(!showRulers);
    } else {
      setActiveTool(toolId);
    }
  };

  return (
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center bg-[#181920]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-2xl space-y-1 select-none">
      {/* Studio Tool Pill Header */}
      <div className="w-8 h-4 flex items-center justify-center opacity-40 mb-1">
        <div className="w-4 h-1 rounded-full bg-white/40" />
      </div>

      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        const isActive = tool.id === 'ruler' ? showRulers : activeTool === tool.id;

        return (
          <div key={tool.id} className="relative group">
            <button
              onClick={() => handleToolClick(tool.id)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative ${
                isActive 
                  ? 'text-white shadow-md' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              style={{
                backgroundColor: isActive ? currentTheme.primary : 'transparent',
                boxShadow: isActive ? `0 0 15px ${currentTheme.glow}` : 'none'
              }}
              aria-label={tool.name}
            >
              <Icon className="w-4 h-4 stroke-[2]" />
              
              {/* Keyboard Shortcut Dot */}
              <span className="absolute bottom-1 right-1 text-[8px] font-mono opacity-50 font-semibold leading-none">
                {tool.hotkey}
              </span>
            </button>

            {/* Figma-style Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex flex-col bg-[#1e2029] text-white border border-white/15 px-3 py-2 rounded-xl shadow-2xl text-xs whitespace-nowrap pointer-events-none z-50 min-w-[160px]">
              <div className="flex items-center justify-between font-semibold">
                <span>{tool.name}</span>
                <span className="font-mono bg-white/10 text-white/80 px-1 rounded text-[10px] ml-2">
                  {tool.hotkey}
                </span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5 whitespace-normal">
                {tool.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Decorative separator */}
      <div className="w-6 h-[1px] bg-white/10 my-1" />

      {/* Active Color Swatch Dot */}
      <div 
        className="w-6 h-6 rounded-lg border-2 border-white/40 shadow-inner cursor-pointer transition-transform hover:scale-110"
        style={{ backgroundColor: currentTheme.primary }}
        title="Current paint color"
      />
    </aside>
  );
}
