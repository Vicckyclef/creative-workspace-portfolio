import React, { useEffect, useState } from 'react';
import { TOOLS } from './Toolbar';

export default function CustomCursor({ 
  activeTool, 
  currentTheme,
  cursorStyle = 'figma', // 'figma' | 'precision' | 'dot' | 'system'
  enabled = true 
}) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled || cursorStyle === 'system') return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable = target && (
        target.closest('button, a, input, textarea, select, [role="button"]') ||
        target.classList.contains('cursor-pointer')
      );
      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, cursorStyle, isVisible]);

  if (!enabled || cursorStyle === 'system' || !isVisible) {
    return null;
  }

  const currentToolObj = TOOLS.find(t => t.id === activeTool) || TOOLS[0];

  // Tool label text
  const getToolLabel = () => {
    switch (activeTool) {
      case 'bucket': return 'Paint';
      case 'eyedropper': return 'Sample';
      case 'stamp': return 'Stamp';
      case 'note': return 'Comment';
      case 'hand': return 'Pan';
      default: return 'You';
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-50 select-none hidden sm:block transition-opacity duration-150"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: isVisible ? 1 : 0
      }}
    >
      {cursorStyle === 'figma' && (
        <div className={`relative transition-transform duration-75 ${isMouseDown ? 'scale-90' : isHovered ? 'scale-110' : 'scale-100'}`}>
          {/* Figma Arrowhead Pointer */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="drop-shadow-lg"
          >
            <path 
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" 
              fill={currentTheme.primary}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
          </svg>

          {/* Figma Multiplayer Tag */}
          <div 
            className="absolute left-3.5 top-3.5 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold text-black shadow-xl whitespace-nowrap flex items-center gap-1 transition-all"
            style={{ 
              backgroundColor: currentTheme.secondary,
              boxShadow: `0 4px 14px ${currentTheme.glow}`
            }}
          >
            <span>{getToolLabel()}</span>
            <span className="opacity-40 text-[8px]">✦</span>
          </div>
        </div>
      )}

      {cursorStyle === 'precision' && (
        <div className="relative -top-3 -left-3">
          {/* Studio Crosshair / Precision Ring */}
          <div 
            className={`w-6 h-6 rounded-full border border-dashed transition-all duration-150 flex items-center justify-center ${
              isHovered ? 'scale-125 border-solid' : 'scale-100'
            }`}
            style={{ borderColor: currentTheme.primary }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: currentTheme.secondary }}
            />
          </div>
          <span className="absolute left-7 -top-1 font-mono text-[9px] text-white/70 bg-black/80 px-1 rounded border border-white/10">
            {currentToolObj.hotkey}
          </span>
        </div>
      )}

      {cursorStyle === 'dot' && (
        <div className="relative -top-2 -left-2">
          {/* Modern Minimal Glowing Follower Dot */}
          <div 
            className={`w-4 h-4 rounded-full transition-all duration-150 shadow-lg ${
              isHovered ? 'scale-150 ring-4 ring-white/20' : 'scale-100'
            }`}
            style={{ 
              backgroundColor: currentTheme.primary,
              boxShadow: `0 0 12px ${currentTheme.glow}`
            }}
          />
        </div>
      )}
    </div>
  );
}
