import React from 'react';

export default function CanvasRulers({ zoomLevel, panOffset, showRulers }) {
  if (!showRulers) return null;

  // Generate ruler tick marks
  const ticks = Array.from({ length: 40 }, (_, i) => i * 100);

  return (
    <div className="pointer-events-none select-none z-20">
      {/* Top Horizontal Ruler */}
      <div className="fixed top-12 left-0 right-0 h-4 bg-[#14151b] border-b border-white/10 flex items-center overflow-hidden font-mono text-[9px] text-white/40">
        <div 
          className="flex items-center absolute left-0"
          style={{ transform: `translateX(${panOffset.x}px)` }}
        >
          {ticks.map(val => (
            <div 
              key={`h-${val}`} 
              className="relative flex items-end h-4"
              style={{ width: `${100 * zoomLevel}px` }}
            >
              <div className="absolute left-0 bottom-0 w-[1px] h-2.5 bg-white/20" />
              <div className="absolute left-1/2 bottom-0 w-[1px] h-1.5 bg-white/10" />
              <span className="ml-1 leading-none">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Left Vertical Ruler */}
      <div className="fixed top-16 left-0 bottom-0 w-4 bg-[#14151b] border-r border-white/10 flex flex-col items-center overflow-hidden font-mono text-[9px] text-white/40">
        <div 
          className="flex flex-col items-center absolute top-0"
          style={{ transform: `translateY(${panOffset.y}px)` }}
        >
          {ticks.map(val => (
            <div 
              key={`v-${val}`} 
              className="relative flex justify-end w-4"
              style={{ height: `${100 * zoomLevel}px` }}
            >
              <div className="absolute right-0 top-0 h-[1px] w-2.5 bg-white/20" />
              <div className="absolute right-0 top-1/2 h-[1px] w-1.5 bg-white/10" />
              <span className="mt-1 leading-none origin-top-left -rotate-90">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corner Origin Square */}
      <div className="fixed top-12 left-0 w-4 h-4 bg-[#1e2029] border-r border-b border-white/10 z-30 flex items-center justify-center font-mono text-[8px] text-purple-400">
        0
      </div>
    </div>
  );
}
