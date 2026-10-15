import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';

export default function StickyNotesLayer({ notes, onUpdateNote, onDeleteNote }) {
  if (!notes || notes.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            transform: `translate(${note.x}px, ${note.y}px)`,
            backgroundColor: note.color || '#fef08a'
          }}
          className="absolute pointer-events-auto w-56 p-3 rounded-xl shadow-2xl text-black border border-black/10 transition-transform duration-150 rotate-[-1.5deg] hover:rotate-0 hover:scale-105"
        >
          {/* Note Pin & Close */}
          <div className="flex items-center justify-between pb-1.5 border-b border-black/10 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-wider text-black/60 uppercase flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Visitor Note
            </span>
            <button
              onClick={() => onDeleteNote(note.id)}
              className="p-1 rounded-full hover:bg-black/10 text-black/60 hover:text-black transition-colors"
              title="Delete note"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Editable Note Textarea */}
          <textarea
            rows="3"
            value={note.text}
            onChange={(e) => onUpdateNote(note.id, e.target.value)}
            placeholder="Type your feedback or recruiter message here..."
            className="w-full bg-transparent text-xs text-black placeholder-black/40 font-medium focus:outline-none resize-none leading-relaxed"
            autoFocus={note.isNew}
          />

          <div className="text-[9px] font-mono text-black/40 pt-1 text-right">
            Click & edit anytime
          </div>
        </div>
      ))}
    </div>
  );
}
