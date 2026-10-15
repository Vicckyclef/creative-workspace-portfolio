import React from 'react';
import { X } from 'lucide-react';

export default function StampsLayer({ stamps, onDeleteStamp }) {
  if (!stamps || stamps.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      {stamps.map((stamp) => (
        <div
          key={stamp.id}
          style={{
            transform: `translate(${stamp.x}px, ${stamp.y}px) rotate(${stamp.rotation || 0}deg)`,
            borderColor: stamp.color || '#ec4899',
            color: stamp.color || '#ec4899'
          }}
          className="absolute pointer-events-auto px-4 py-2 rounded-2xl border-2 border-dashed bg-black/85 backdrop-blur-md shadow-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 group transition-transform hover:scale-110"
        >
          <span>{stamp.label}</span>
          <button
            onClick={() => onDeleteStamp(stamp.id)}
            className="p-0.5 rounded-full hover:bg-white/20 text-white/50 hover:text-white transition-colors ml-1"
            title="Remove stamp"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
