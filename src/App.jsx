import React, { useState, useRef, useEffect } from 'react';
import TopMenuBar from './components/TopMenuBar';
import Toolbar from './components/Toolbar';
import InspectorPanel from './components/InspectorPanel';
import ArtboardHero from './components/ArtboardHero';
import ArtboardProjects from './components/ArtboardProjects';
import ArtboardUIUX from './components/ArtboardUIUX';
import ArtboardExperience from './components/ArtboardExperience';
import ArtboardSkills from './components/ArtboardSkills';
import ArtboardContact from './components/ArtboardContact';
import ProjectModal from './components/ProjectModal';
import CampaignGalleryModal from './components/CampaignGalleryModal';
import StickyNotesLayer from './components/StickyNotesLayer';
import StampsLayer from './components/StampsLayer';
import CanvasRulers from './components/CanvasRulers';
import BottomControls from './components/BottomControls';
import CustomCursor from './components/CustomCursor';
import { defaultThemes, personalInfo, projectImages, allProjectImages, projectCampaigns } from './data/portfolioData';

const STAMP_PRESETS = [
  { label: '🔥 CLIENT APPROVED', color: '#f97316' },
  { label: '💎 PIXEL PERFECT', color: '#06b6d4' },
  { label: '✨ 100% VECTOR', color: '#8b5cf6' },
  { label: '🚀 FRESH CODE', color: '#10b981' },
  { label: '⚡ MORE POP', color: '#ec4899' }
];

export default function App() {
  // Theme state (Live color customizer)
  const [currentTheme, setTheme] = useState(defaultThemes[0]);
  const [customColors, setCustomColors] = useState({});

  // Active Tool state: 'select' | 'hand' | 'bucket' | 'eyedropper' | 'stamp' | 'note' | 'ruler'
  const [activeTool, setActiveTool] = useState('select');

  // Cursor style: 'figma' | 'precision' | 'dot' | 'system'
  const [cursorStyle, setCursorStyle] = useState('figma');

  // Canvas View state
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });

  // View toggles
  const [showRulers, setShowRulers] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false);

  // Selection state
  const [activeArtboard, setActiveArtboard] = useState('hero');
  const [selectedElement, setSelectedElement] = useState(null);

  // Active Modal for high-res design viewing
  const [modalProject, setModalProject] = useState(null);
  const [activeCampaignModal, setActiveCampaignModal] = useState(null);

  // Interactive user stamps & sticky notes placed on the workspace
  const [stamps, setStamps] = useState([]);
  const [notes, setNotes] = useState([]);
  const [stampIndex, setStampIndex] = useState(0);

  const canvasRef = useRef(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if typing inside inputs/textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (key === 'V') setActiveTool('select');
      if (key === 'H') setActiveTool('hand');
      if (key === 'G') setActiveTool('bucket');
      if (key === 'I') setActiveTool('eyedropper');
      if (key === 'S') setActiveTool('stamp');
      if (key === 'C') setActiveTool('note');
      if (key === 'R') setShowRulers(prev => !prev);
      if (key === 'ESCAPE') {
        setSelectedElement(null);
        setModalProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pan interaction handling
  const handleMouseDown = (e) => {
    // If clicking on an input/button, do nothing
    if (e.target.closest('button, input, textarea, select, a')) return;

    if (activeTool === 'hand' || e.button === 1 || e.spaceKey) {
      setIsPanning(true);
      setStartPanPos({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    // Canvas click with Stamp tool
    if (activeTool === 'stamp') {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;

      const preset = STAMP_PRESETS[stampIndex % STAMP_PRESETS.length];
      setStampIndex(prev => prev + 1);

      setStamps(prev => [
        ...prev,
        {
          id: `stamp-${Date.now()}`,
          x: x - 40,
          y: y - 20,
          label: preset.label,
          color: preset.color,
          rotation: (Math.random() - 0.5) * 20
        }
      ]);
      return;
    }

    // Canvas click with Sticky Note tool
    if (activeTool === 'note') {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;

      setNotes(prev => [
        ...prev,
        {
          id: `note-${Date.now()}`,
          x: x - 20,
          y: y - 20,
          text: '',
          isNew: true,
          color: '#fef08a'
        }
      ]);
      setActiveTool('select'); // Switch to select after dropping note
      return;
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - startPanPos.x,
      y: e.clientY - startPanPos.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Wheel zoom/pan
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoomLevel(prev => Math.min(Math.max(prev * zoomFactor, 0.4), 2.0));
    }
  };

  // Jump to specific artboard
  const jumpToArtboard = (artboardId) => {
    setActiveArtboard(artboardId);
    const element = document.getElementById(`artboard-${artboardId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetCanvas = () => {
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
    const heroEl = document.getElementById('artboard-hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Modal navigation
  const handleNextProject = () => {
    if (!modalProject) return;
    const currentIndex = allProjectImages.findIndex(p => p.id === modalProject.id);
    const nextIndex = (currentIndex + 1) % allProjectImages.length;
    setModalProject(allProjectImages[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!modalProject) return;
    const currentIndex = allProjectImages.findIndex(p => p.id === modalProject.id);
    const prevIndex = (currentIndex - 1 + allProjectImages.length) % allProjectImages.length;
    setModalProject(allProjectImages[prevIndex]);
  };

  // Clear annotations
  const handleClearAnnotations = () => {
    setStamps([]);
    setNotes([]);
  };

  // Determine cursor based on active tool
  const getCanvasCursorClass = () => {
    if (isPanning) return 'cursor-grabbing';
    switch (activeTool) {
      case 'hand': return 'cursor-tool-hand';
      case 'bucket': return 'cursor-tool-bucket';
      case 'eyedropper': return 'cursor-tool-eyedropper';
      case 'stamp': return 'cursor-tool-stamp';
      case 'note': return 'cursor-tool-note';
      case 'ruler': return 'cursor-tool-ruler';
      default: return 'cursor-default';
    }
  };

  return (
    <div 
      className="flex flex-col h-screen w-screen overflow-hidden bg-[#101116] select-none text-[#e0e2ec]"
      style={{
        '--primary-color': currentTheme.primary,
        '--primary-glow': currentTheme.glow
      }}
    >
      {/* Top Application Bar */}
      <TopMenuBar 
        currentTheme={currentTheme}
        setTheme={setTheme}
        activeArtboard={activeArtboard}
        onJumpToArtboard={jumpToArtboard}
        showRulers={showRulers}
        setShowRulers={setShowRulers}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        onResetCanvas={handleResetCanvas}
        stampsCount={stamps.length}
        notesCount={notes.length}
        onClearCanvasAnnotations={handleClearAnnotations}
        cursorStyle={cursorStyle}
        setCursorStyle={setCursorStyle}
      />

      {/* Workspace Area: Left Toolbar + Center Infinite Canvas + Right Inspector */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Figma Canvas Rulers (Top & Left) */}
        <CanvasRulers 
          zoomLevel={zoomLevel}
          panOffset={panOffset}
          showRulers={showRulers}
        />

        {/* Floating Photoshop/Figma Left Toolbar */}
        <Toolbar 
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          currentTheme={currentTheme}
          showRulers={showRulers}
          setShowRulers={setShowRulers}
        />

        {/* Main Canvas Container */}
        <main
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          className={`flex-1 h-full overflow-y-auto overflow-x-hidden relative ${
            showGrid ? 'studio-grid' : ''
          } ${cursorStyle !== 'system' ? 'hide-system-cursor' : getCanvasCursorClass()} transition-colors duration-300`}
        >
          {/* Zoomable & Scalable Canvas Layer */}
          <div
            className="w-full min-h-full py-16 px-4 sm:px-8 md:px-14 lg:px-20 space-y-24 transition-transform duration-100 origin-top-left"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
              width: `${100 / zoomLevel}%`
            }}
          >
            {/* Interactive Sticky Notes and Stamps Canvas Layer */}
            <StickyNotesLayer 
              notes={notes}
              onUpdateNote={(id, text) => {
                setNotes(prev => prev.map(n => n.id === id ? { ...n, text, isNew: false } : n));
              }}
              onDeleteNote={(id) => {
                setNotes(prev => prev.filter(n => n.id !== id));
              }}
            />

            <StampsLayer 
              stamps={stamps}
              onDeleteStamp={(id) => {
                setStamps(prev => prev.filter(s => s.id !== id));
              }}
            />

            {/* ARTBOARD 01: HERO IDENTITY */}
            <ArtboardHero 
              currentTheme={currentTheme}
              isSelected={selectedElement?.id === 'hero'}
              onSelect={() => {
                setActiveArtboard('hero');
                setSelectedElement({
                  id: 'hero',
                  name: '01_HERO_IDENTITY_SPEC',
                  type: 'ARTBOARD_FRAME',
                  w: 1280,
                  h: 740,
                  radius: 24,
                  fill: currentTheme.primary,
                  font: 'Space Grotesk',
                  tools: ['Figma', 'React', 'Tailwind', 'Photoshop']
                });
              }}
              customColor={customColors['hero']}
              onOpenProjects={() => jumpToArtboard('projects')}
              onOpenContact={() => jumpToArtboard('contact')}
            />

            {/* ARTBOARD 02: GRAPHIC DESIGN GALLERY (30 Projects) */}
            <ArtboardProjects 
              currentTheme={currentTheme}
              isSelected={selectedElement?.id === 'projects'}
              onSelect={() => {
                setActiveArtboard('projects');
                setSelectedElement({
                  id: 'projects',
                  name: '02_GRAPHIC_DESIGN_VAULT',
                  type: 'GALLERY_FRAME',
                  w: 1280,
                  h: 2100,
                  radius: 24,
                  fill: currentTheme.primary,
                  tools: ['CorelDRAW', 'Photoshop', 'Illustrator', 'Cinema 4D']
                });
              }}
              customColor={customColors['projects']}
              onOpenProjectModal={(p) => setModalProject(p)}
              onOpenCampaignGallery={(campaign) => setActiveCampaignModal(campaign)}
              onSelectElement={(el) => {
                setSelectedElement(el);
              }}
            />

            {/* ARTBOARD 03: UI/UX & PRODUCT ENGINEERING */}
            <ArtboardUIUX 
              currentTheme={currentTheme}
              isSelected={selectedElement?.id === 'uiux'}
              onSelect={() => {
                setActiveArtboard('uiux');
                setSelectedElement({
                  id: 'uiux',
                  name: '03_UI_UX_AND_FRONTEND_ENGINEERING',
                  type: 'PRODUCT_FRAME',
                  w: 1280,
                  h: 620,
                  radius: 24,
                  fill: currentTheme.primary,
                  tools: ['Figma', 'React', 'REST APIs', 'CI/CD']
                });
              }}
              customColor={customColors['uiux']}
              onSelectElement={(el) => {
                setSelectedElement(el);
              }}
            />

            {/* ARTBOARD 04: EXPERIENCE & CAREER LAYERS */}
            <ArtboardExperience 
              currentTheme={currentTheme}
              isSelected={selectedElement?.id === 'experience'}
              onSelect={() => {
                setActiveArtboard('experience');
                setSelectedElement({
                  id: 'experience',
                  name: '04_CAREER_LAYERS_STACK',
                  type: 'TIMELINE_FRAME',
                  w: 1280,
                  h: 580,
                  radius: 24,
                  fill: currentTheme.primary
                });
              }}
              customColor={customColors['experience']}
              onSelectElement={(el) => {
                setSelectedElement(el);
              }}
            />

            {/* ARTBOARD 05: TOOLBOX & TECH STACK */}
            <ArtboardSkills 
              currentTheme={currentTheme}
              isSelected={selectedElement?.id === 'skills'}
              onSelect={() => {
                setActiveArtboard('skills');
                setSelectedElement({
                  id: 'skills',
                  name: '05_TOOLBOX_AND_STACK',
                  type: 'SKILLS_FRAME',
                  w: 1280,
                  h: 480,
                  radius: 24,
                  fill: currentTheme.primary
                });
              }}
              customColor={customColors['skills']}
              onSelectElement={(el) => {
                setSelectedElement(el);
              }}
            />

            {/* ARTBOARD 06: DIRECT BRIEF & CONTACT */}
            <ArtboardContact 
              currentTheme={currentTheme}
              isSelected={selectedElement?.id === 'contact'}
              onSelect={() => {
                setActiveArtboard('contact');
                setSelectedElement({
                  id: 'contact',
                  name: '06_DIRECT_BRIEF_AND_CONTACT',
                  type: 'CONTACT_FRAME',
                  w: 1280,
                  h: 540,
                  radius: 24,
                  fill: currentTheme.primary
                });
              }}
              customColor={customColors['contact']}
              onSelectElement={(el) => {
                setSelectedElement(el);
              }}
            />

            {/* Studio Workspace Bottom Credit */}
            <div className="text-center py-12 text-xs text-white/40 font-mono space-y-1">
              <p>Victor Adeolu Adebisi — Creative Design Workspace & Portfolio</p>
              <p>Built with React, Tailwind CSS & High-Fidelity Design Craft • Lagos, Nigeria</p>
            </div>
          </div>
        </main>

        {/* Right Inspector / Properties Panel */}
        <InspectorPanel 
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          currentTheme={currentTheme}
          setTheme={setTheme}
          customColors={customColors}
          setCustomColors={setCustomColors}
          isCollapsed={isInspectorCollapsed}
          setIsCollapsed={setIsInspectorCollapsed}
        />
      </div>

      {/* Bottom Floating Controls: Zoom, Fit, Active Tool guide */}
      <BottomControls 
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        onResetZoom={handleResetCanvas}
        activeTool={activeTool}
        currentTheme={currentTheme}
        activeArtboard={activeArtboard}
        onJumpToArtboard={jumpToArtboard}
      />

      {/* Campaign Dedicated Gallery Modal (View All 30 Designs) */}
      {activeCampaignModal && (
        <CampaignGalleryModal
          campaign={activeCampaignModal}
          onClose={() => setActiveCampaignModal(null)}
          onOpenItemModal={(item) => {
            setModalProject(item);
          }}
          currentTheme={currentTheme}
        />
      )}

      {/* High-Resolution Project Modal */}
      {modalProject && (
        <ProjectModal 
          project={modalProject}
          onClose={() => setModalProject(null)}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
          currentTheme={currentTheme}
        />
      )}

      {/* Interactive Studio Custom Cursor */}
      <CustomCursor 
        activeTool={activeTool}
        currentTheme={currentTheme}
        cursorStyle={cursorStyle}
      />
    </div>
  );
}
