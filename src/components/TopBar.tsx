import React, { useState, useEffect, useRef } from 'react';
import { PAGES_CONFIG, TOPOLOGY_NODES } from '../data';
import { PageId } from '../types';
import { DossierProgressBar } from './DossierProgressBar';
import {
  Compass,
  Sun,
  Moon,
  Download,
  FileText,
  Printer,
  RotateCcw,
  Copy,
  Check,
  Layers,
  BookOpen,
  Network,
  HelpCircle,
  Info,
  ChevronRight,
  Radio,
  FastForward,
  Menu,
  X,
} from 'lucide-react';

interface TopBarProps {
  currentPageId: PageId;
  onPageChange: (pageId: PageId) => void;
  viewMode: 'pages' | 'stream';
  onToggleViewMode: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  diagramMode: 'circular' | 'mermaid';
  onChangeDiagramMode: (mode: 'circular' | 'mermaid') => void;
  visitedPages: string[];
  inspectedNodes: string[];
  activeNodeId: string | null;
  onInspectNextNode: () => void;
  onResetProgress: () => void;
  onOpenModal: (modal: 'about' | 'help') => void;
  onExportDossierJson: () => void;
  onExportDossierMarkdown: () => void;
  lastActionNotice: string;
}

type MenuKey = 'file' | 'edit' | 'view' | 'window' | 'about' | 'help' | null;

export const TopBar: React.FC<TopBarProps> = ({
  currentPageId,
  onPageChange,
  viewMode,
  onToggleViewMode,
  theme,
  onToggleTheme,
  diagramMode,
  onChangeDiagramMode,
  visitedPages,
  inspectedNodes,
  activeNodeId,
  onInspectNextNode,
  onResetProgress,
  onOpenModal,
  onExportDossierJson,
  onExportDossierMarkdown,
  lastActionNotice,
}) => {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);
  const [fastMarquee, setFastMarquee] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const currentPage = PAGES_CONFIG.find((p) => p.id === currentPageId) || PAGES_CONFIG[1];
  const activeNode = TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[0];
  const totalSteps = PAGES_CONFIG.length + TOPOLOGY_NODES.length;
  const completedSteps = visitedPages.length + inspectedNodes.length;
  const overallPercent = Math.min(100, Math.round((completedSteps / totalSteps) * 100));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(label);
    setOpenMenu(null);
    setTimeout(() => setCopiedNotice(null), 2200);
  };

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  // Build dynamic high-contrast scrolling marquee segments
  const marqueeSegments = [
    `STATE: ${currentPage.index} ${currentPage.shortLabel.toUpperCase()}`,
    `ACTIVE TOPOLOGY FOCUS: NODE ${activeNode.index} — ${activeNode.fullName.toUpperCase()} (${activeNode.stars}/5 STARS)`,
    `DOSSIER VERIFICATION: ${overallPercent}% COMPLETE (${visitedPages.length}/${PAGES_CONFIG.length} CHAPTERS · ${inspectedNodes.length}/${TOPOLOGY_NODES.length} NODES)`,
    `THEME POSTURE: ${theme === 'dark' ? 'SONORAN NIGHT OPS (WCAG AAA DARK)' : 'MOJAVE DAYLIGHT (WCAG AAA LIGHT)'}`,
    `VIEWPORT: FIXED 1240×780 TACTICAL WORKSTATION (${viewMode.toUpperCase()} MODE)`,
    `LAST EVENT: ${copiedNotice ? `COPIED ${copiedNotice}` : lastActionNotice.toUpperCase()}`,
    `ENGAGEMENT READINESS: OPEN FOR PRINCIPAL & STAFF SYSTEMS ARCHITECTURE`,
  ];

  return (
    <header
      id="topbar"
      className="sticky top-0 z-40 w-full select-none"
      style={{
        backgroundColor: 'var(--taskbar-bg)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Row 1: Translucent OS Taskbar with Standard FILE / EDIT / VIEW / WINDOW / ABOUT / HELP Menus */}
      <div
        ref={menuContainerRef}
        className="flex items-center justify-between px-3 sm:px-6 h-10 border-b text-xs"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Left Zone: OS Emblem + Desktop Application Menu Bar */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onPageChange('diagram')}
            className="flex items-center gap-2 px-2.5 py-1 font-display font-bold tracking-tight text-xs sm:text-sm cursor-pointer transition-colors"
            style={{ color: 'var(--text)' }}
            title="Return to Interactive Node Topology"
          >
            <Compass className="w-4 h-4 text-[var(--blue-outline)] shrink-0" />
            <span className="whitespace-nowrap">ATLAS // OS 26.4</span>
          </button>

          <span className="text-[var(--border)] hidden sm:inline">|</span>

          {/* Desktop OS Menu Items: FILE, EDIT, VIEW, WINDOW, ABOUT, HELP */}
          <div className="hidden md:flex items-center gap-0.5 font-mono text-xs relative">
            {/* FILE MENU */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('file')}
                className="px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  backgroundColor: openMenu === 'file' ? 'var(--surface-tertiary)' : 'transparent',
                  color: 'var(--text)',
                }}
              >
                File
              </button>
              {openMenu === 'file' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-64 border-2 shadow-2xl py-1 z-50"
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <button
                    onClick={() => {
                      onExportDossierJson();
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      <span>Export Dossier (JSON)</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-dimmer)]">⌘S</span>
                  </button>
                  <button
                    onClick={() => {
                      onExportDossierMarkdown();
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[var(--green-proven)]" />
                      <span>Export Briefing (MD)</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-dimmer)]">⌘E</span>
                  </button>
                  <button
                    onClick={() => {
                      setOpenMenu(null);
                      window.print();
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <Printer className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                      <span>Print Tactical Dossier</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-dimmer)]">⌘P</span>
                  </button>
                  <div className="my-1 border-t border-[var(--border-subtle)]" />
                  <button
                    onClick={() => {
                      onResetProgress();
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--red-gap)]"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Verification Progress</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* EDIT MENU */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('edit')}
                className="px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  backgroundColor: openMenu === 'edit' ? 'var(--surface-tertiary)' : 'transparent',
                  color: 'var(--text)',
                }}
              >
                Edit
              </button>
              {openMenu === 'edit' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-64 border-2 shadow-2xl py-1 z-50"
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <button
                    onClick={() =>
                      handleCopyText('FILE — CAP/PROFILE/001 · C. RODRIGUEZ', 'DOSSIER ID')
                    }
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      <span>Copy Dossier Reference ID</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-dimmer)]">⌘C</span>
                  </button>
                  <button
                    onClick={() =>
                      handleCopyText('ui.commits@icloud.com', 'DIRECT EMAIL')
                    }
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-[var(--green-proven)]" />
                      <span>Copy Direct Comms Email</span>
                    </span>
                  </button>
                  <div className="my-1 border-t border-[var(--border-subtle)]" />
                  <button
                    onClick={() => {
                      onInspectNextNode();
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Network className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      <span>Verify Next Topology Node</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-dimmer)]">N</span>
                  </button>
                </div>
              )}
            </div>

            {/* VIEW MENU */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('view')}
                className="px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  backgroundColor: openMenu === 'view' ? 'var(--surface-tertiary)' : 'transparent',
                  color: 'var(--text)',
                }}
              >
                View
              </button>
              {openMenu === 'view' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-72 border-2 shadow-2xl py-1 z-50"
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <button
                    onClick={() => {
                      onToggleTheme();
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'dark' ? (
                        <Sun className="w-3.5 h-3.5 text-[var(--yellow-work)]" />
                      ) : (
                        <Moon className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      )}
                      <span>
                        Theme: {theme === 'dark' ? 'Switch to Mojave Light' : 'Switch to Sonoran Dark'}
                      </span>
                    </span>
                    <span className="text-[10px] text-[var(--text-dimmer)]">T</span>
                  </button>
                  <button
                    onClick={() => {
                      onToggleViewMode();
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      {viewMode === 'pages' ? (
                        <Layers className="w-3.5 h-3.5 text-[var(--green-proven)]" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      )}
                      <span>
                        Layout: {viewMode === 'pages' ? 'Switch to Continuous Stream' : 'Switch to Paged Focus'}
                      </span>
                    </span>
                  </button>
                  <div className="my-1 border-t border-[var(--border-subtle)]" />
                  <button
                    onClick={() => {
                      onPageChange('diagram');
                      onChangeDiagramMode('circular');
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <Network className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      <span>Interactive Node Topology</span>
                    </span>
                    {diagramMode === 'circular' && <Check className="w-3.5 h-3.5 text-[var(--green-proven)]" />}
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('diagram');
                      onChangeDiagramMode('mermaid');
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                      <span>Mermaid Architecture Graph</span>
                    </span>
                    {diagramMode === 'mermaid' && <Check className="w-3.5 h-3.5 text-[var(--green-proven)]" />}
                  </button>
                  <div className="my-1 border-t border-[var(--border-subtle)]" />
                  <button
                    onClick={() => {
                      setFastMarquee((prev) => !prev);
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <FastForward className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                      <span>Marquee Velocity: {fastMarquee ? 'High-Speed' : 'Standard'}</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* WINDOW MENU */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('window')}
                className="px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  backgroundColor: openMenu === 'window' ? 'var(--surface-tertiary)' : 'transparent',
                  color: 'var(--text)',
                }}
              >
                Window
              </button>
              {openMenu === 'window' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-64 border-2 shadow-2xl py-1 z-50"
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="px-3.5 py-1 text-[10px] uppercase tracking-wider text-[var(--text-dimmer)] font-bold">
                    Active Workstation Panes
                  </div>
                  {PAGES_CONFIG.map((page) => {
                    const isActive = currentPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => {
                          onPageChange(page.id);
                          setOpenMenu(null);
                        }}
                        className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-[var(--surface-secondary)] cursor-pointer text-[var(--text)]"
                      >
                        <span>
                          {page.index}. {page.shortLabel}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[var(--blue-outline)]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ABOUT MENU */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenMenu(null);
                  onOpenModal('about');
                }}
                className="px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer hover:bg-[var(--surface-tertiary)]"
                style={{ color: 'var(--text)' }}
              >
                About
              </button>
            </div>

            {/* HELP MENU */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenMenu(null);
                  onOpenModal('help');
                }}
                className="px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer hover:bg-[var(--surface-tertiary)]"
                style={{ color: 'var(--text)' }}
              >
                Help
              </button>
            </div>
          </div>
        </div>

        {/* Right Zone: Compact Progress Indicator + Desert Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <DossierProgressBar
              currentPageId={currentPageId}
              visitedPages={visitedPages}
              inspectedNodes={inspectedNodes}
              onPageChange={onPageChange}
              onInspectNextNode={onInspectNextNode}
              onResetProgress={onResetProgress}
              compact
            />
          </div>

          {/* Desert Theme Switcher Button (WCAG AAA Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 border font-mono text-xs font-bold transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
            title="Toggle Desert Dark (Sonoran Night) and Desert Light (Mojave Daylight) WCAG AAA themes"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[var(--yellow-work)]" />
                <span className="hidden lg:inline">MOJAVE LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
                <span className="hidden lg:inline">SONORAN DARK</span>
              </>
            )}
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
            aria-label="Toggle OS menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Row 2: Scrolling State Marquee Banner */}
      <div
        className="w-full h-7 overflow-hidden flex items-center border-b relative"
        style={{
          backgroundColor: 'var(--marquee-bg)',
          color: 'var(--marquee-text)',
          borderColor: 'var(--border)',
        }}
        aria-live="polite"
      >
        {/* Fixed Left Label Pin */}
        <div
          className="z-10 px-3 h-full flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider uppercase shrink-0 border-r"
          style={{
            backgroundColor: 'var(--blue-outline)',
            color: theme === 'dark' ? '#14110E' : '#FAF6EE',
            borderColor: 'var(--border)',
          }}
        >
          <Radio className="w-3 h-3" />
          <span>STATE FEED</span>
        </div>

        {/* Continuous Marquee Track */}
        <div className="flex-1 overflow-hidden">
          <div className={fastMarquee ? 'animate-os-marquee-fast' : 'animate-os-marquee'}>
            {[0, 1].map((dupIndex) => (
              <div
                key={dupIndex}
                className="flex items-center whitespace-nowrap font-mono text-[11px] font-semibold tracking-wider px-4"
              >
                {marqueeSegments.map((seg, idx) => (
                  <React.Fragment key={`${dupIndex}-${idx}`}>
                    <span>{seg}</span>
                    <span
                      className="mx-5 font-bold"
                      style={{ color: 'var(--blue-outline)' }}
                      aria-hidden="true"
                    >
                      ◆
                    </span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden p-4 border-b space-y-3"
          style={{
            backgroundColor: 'var(--surface-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-dimmer)]">
            Workstation Chapters
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {PAGES_CONFIG.map((page) => {
              const isActive = currentPageId === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => {
                    onPageChange(page.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 border text-left font-mono text-xs"
                  style={{
                    backgroundColor: isActive ? 'var(--surface-secondary)' : 'var(--surface-primary)',
                    borderColor: isActive ? 'var(--blue-outline)' : 'var(--border-subtle)',
                    color: 'var(--text)',
                  }}
                >
                  <span>
                    <strong>{page.index}.</strong> {page.label.replace(/^\d+\.\s*/, '')}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => {
                onToggleViewMode();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 border text-xs font-mono font-semibold"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              Mode: {viewMode === 'pages' ? 'Switch to Stream' : 'Switch to Paged'}
            </button>
            <button
              onClick={() => {
                onOpenModal('about');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 border text-xs font-mono font-semibold flex items-center gap-1"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <Info className="w-3.5 h-3.5" />
              <span>About OS</span>
            </button>
            <button
              onClick={() => {
                onOpenModal('help');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 border text-xs font-mono font-semibold flex items-center gap-1"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
