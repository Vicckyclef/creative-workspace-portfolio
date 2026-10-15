import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Maximize2, 
  Filter, 
  Download, 
  Sparkles, 
  ArrowLeft,
  Wrench,
  Layers
} from 'lucide-react';

export default function CampaignGalleryModal({ 
  campaign, 
  onClose, 
  onOpenItemModal, 
  currentTheme 
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (!campaign) return null;

  const subCategories = ["All", ...Array.from(new Set(campaign.items.map(item => item.category).filter(Boolean)))];

  const filteredItems = campaign.items.filter(item => {
    const matchesCat = selectedSubCategory === "All" || item.category === selectedSubCategory;
    const matchesSearch = searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] bg-[#151620] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#191a26] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                style={{ backgroundColor: `${currentTheme.primary}25`, color: currentTheme.secondary }}
              >
                Project Vault
              </span>
              <span className="text-xs text-white/50 font-mono">• {campaign.client}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {campaign.title}
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Viewing all {campaign.items.length} design assets and event collateral
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search flyer or tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
              title="Close Gallery"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="px-6 py-3 border-b border-white/5 bg-black/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {subCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedSubCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedSubCategory === cat
                  ? 'text-white shadow-md font-semibold'
                  : 'text-white/50 hover:text-white bg-white/5'
              }`}
              style={{
                backgroundColor: selectedSubCategory === cat ? currentTheme.primary : undefined
              }}
            >
              {cat} {cat === 'All' ? `(${campaign.items.length})` : ''}
            </button>
          ))}
        </div>

        {/* Gallery Grid (All 30 Flyers) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenItemModal(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#1c1d27] border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black/50">
                <img 
                  src={`/projects/${item.file}`} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-white/90">
                      #{idx + 1}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/20 text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <span 
                    className="w-full py-1.5 rounded-xl text-xs font-bold text-black text-center shadow-lg"
                    style={{ backgroundColor: currentTheme.secondary }}
                  >
                    View High-Res
                  </span>
                </div>

                <div className="absolute top-2 left-2 pointer-events-none">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white/90 border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#191a24]">
                <h4 className="font-semibold text-xs text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 mt-2 flex-wrap">
                  {item.tools.slice(0, 2).map((t, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#161722] flex items-center justify-between text-xs text-white/60">
          <span>{campaign.title} • Designed by Victor Adebisi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
}
