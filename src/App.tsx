/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { SidebarRail } from './components/SidebarRail';
import { SubjectSection } from './components/SubjectSection';
import { CapabilityMapSection } from './components/CapabilityMapSection';
import { BreakdownSection } from './components/BreakdownSection';
import { RoadmapProjectsSection } from './components/RoadmapProjectsSection';
import { ContactSection } from './components/ContactSection';
import { PagePagination } from './components/PagePagination';
import { DesertTopographyCanvas } from './components/DesertTopographyCanvas';
import { DossierProgressBar } from './components/DossierProgressBar';
import { OsSystemModals } from './components/OsSystemModals';
import { PAGES_CONFIG, TOPOLOGY_NODES, FLAGSHIP_PROJECTS } from './data';
import { PageId } from './types';
import { ShieldCheck, Compass, Maximize2, Layers } from 'lucide-react';

export default function App() {
  // Default starting section: 'diagram' (02. Interactive Node Topology)
  const [currentPageId, setCurrentPageId] = useState<PageId>('diagram');
  const [diagramMode, setDiagramMode] = useState<'circular' | 'mermaid'>('circular');
  const [viewMode, setViewMode] = useState<'pages' | 'stream'>('pages');

  // Desert Strategic Theme ('dark' = Sonoran Night Ops, 'light' = Mojave Daylight)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('atlas_desert_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Dossier & Node Verification Progress Tracking
  const [visitedPages, setVisitedPages] = useState<string[]>(['diagram']);
  const [inspectedNodes, setInspectedNodes] = useState<string[]>(['node-01']);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-01');
  const [activeModal, setActiveModal] = useState<'about' | 'help' | null>(null);
  const [lastActionNotice, setLastActionNotice] = useState<string>(
    'Initialized Interactive Node Topology (Node 01 Locked)'
  );

  // Sync `.dark` class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('atlas_desert_theme', theme);
  }, [theme]);

  const handlePageChange = useCallback((pageId: PageId) => {
    setCurrentPageId(pageId);
    setVisitedPages((prev) => (prev.includes(pageId) ? prev : [...prev, pageId]));
    const pageObj = PAGES_CONFIG.find((p) => p.id === pageId);
    if (pageObj) {
      setLastActionNotice(`Focused Window Pane ${pageObj.index}: ${pageObj.shortLabel}`);
    }
    window.location.hash = pageId;
    const scroller = document.getElementById('os-window-main-scroll');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setInspectedNodes((prev) => (prev.includes(nodeId) ? prev : [...prev, nodeId]));
    const nodeObj = TOPOLOGY_NODES.find((n) => n.id === nodeId);
    if (nodeObj) {
      setLastActionNotice(`Verified Node ${nodeObj.index}: ${nodeObj.fullName}`);
    }
  }, []);

  const handleInspectNextNode = useCallback(() => {
    if (currentPageId !== 'diagram') {
      setCurrentPageId('diagram');
      setVisitedPages((prev) => (prev.includes('diagram') ? prev : [...prev, 'diagram']));
    }
    if (diagramMode !== 'circular') {
      setDiagramMode('circular');
    }
    const nextUninspected = TOPOLOGY_NODES.find((n) => !inspectedNodes.includes(n.id));
    if (nextUninspected) {
      handleSelectNode(nextUninspected.id);
    } else {
      const currentIdx = TOPOLOGY_NODES.findIndex((n) => n.id === selectedNodeId);
      const nextNode = TOPOLOGY_NODES[(currentIdx + 1) % TOPOLOGY_NODES.length];
      handleSelectNode(nextNode.id);
    }
  }, [currentPageId, diagramMode, inspectedNodes, selectedNodeId, handleSelectNode]);

  const handleResetProgress = useCallback(() => {
    setVisitedPages([currentPageId]);
    setInspectedNodes(['node-01']);
    setSelectedNodeId('node-01');
    setLastActionNotice('Reset Dossier Verification Progress');
  }, [currentPageId]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setLastActionNotice(
        `Switched Theme to ${next === 'dark' ? 'Sonoran Night (Dark)' : 'Mojave Daylight (Light)'}`
      );
      return next;
    });
  }, []);

  const handleToggleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const next = prev === 'pages' ? 'stream' : 'pages';
      setLastActionNotice(`Switched Layout to ${next === 'pages' ? 'Paged Focus' : 'Continuous Stream'}`);
      if (next === 'stream') {
        setVisitedPages(PAGES_CONFIG.map((p) => p.id));
      }
      return next;
    });
  }, []);

  // Export Dossier Handlers for OS File Menu
  const handleExportDossierJson = useCallback(() => {
    const payload = {
      dossierId: 'CAP/PROFILE/001',
      subject: 'C. Rodriguez',
      role: 'Full-Stack Systems Engineer · Runtime & Agentic Infrastructure',
      exportedAt: new Date().toISOString(),
      verificationStatus: {
        visitedChapters: visitedPages,
        verifiedNodes: inspectedNodes,
      },
      topologyNodes: TOPOLOGY_NODES,
      flagshipProjects: FLAGSHIP_PROJECTS,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'c-rodriguez-capability-dossier.json';
    a.click();
    URL.revokeObjectURL(url);
    setLastActionNotice('Exported Capability Dossier JSON');
  }, [visitedPages, inspectedNodes]);

  const handleExportDossierMarkdown = useCallback(() => {
    const lines = [
      '# C. RODRIGUEZ — ENGINEERING CAPABILITY DOSSIER (CAP/PROFILE/001)',
      'Role: Full-Stack Systems Engineer · Runtime & Agentic Infrastructure',
      '',
      '## Verified Tier-1 Capability Topology Nodes',
      ...TOPOLOGY_NODES.map(
        (n) => `- [${inspectedNodes.includes(n.id) ? 'x' : ' '}] Node ${n.index}: ${n.fullName} (${n.stars}/5 Stars) — Evidence: ${n.evidence.join(', ')}`
      ),
      '',
      '## Vertical Reference Architecture Roadmap',
      ...FLAGSHIP_PROJECTS.map(
        (p) => `- ${p.number} ${p.name} (${p.codename}): ${p.primaryPurpose}`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'c-rodriguez-briefing.md';
    a.click();
    URL.revokeObjectURL(url);
    setLastActionNotice('Exported Executive Briefing Markdown');
  }, [inspectedNodes]);

  // URL Hash Synchronizer (only overrides if explicitly present on mount)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPage = PAGES_CONFIG.find((p) => p.id === hash);
      if (validPage) {
        setCurrentPageId(validPage.id);
        setVisitedPages((prev) => (prev.includes(validPage.id) ? prev : [...prev, validPage.id]));
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global OS Keyboard Shortcuts: 1-5 chapters, Left/Right arrows, N next node, T theme toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key, 10) - 1;
        if (PAGES_CONFIG[index]) {
          handlePageChange(PAGES_CONFIG[index].id);
        }
      } else if (e.key === 'ArrowRight') {
        const currentIndex = PAGES_CONFIG.findIndex((p) => p.id === currentPageId);
        if (currentIndex < PAGES_CONFIG.length - 1) {
          handlePageChange(PAGES_CONFIG[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = PAGES_CONFIG.findIndex((p) => p.id === currentPageId);
        if (currentIndex > 0) {
          handlePageChange(PAGES_CONFIG[currentIndex - 1].id);
        }
      } else if (e.key.toLowerCase() === 'n') {
        handleInspectNextNode();
      } else if (e.key.toLowerCase() === 't') {
        handleToggleTheme();
      } else if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageId, handlePageChange, handleInspectNextNode, handleToggleTheme]);

  const activePageObj = PAGES_CONFIG.find((p) => p.id === currentPageId) || PAGES_CONFIG[1];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative selection:bg-[var(--surface-tertiary)] selection:text-[var(--text)]">
      {/* Ambient Background: Desert Topographic Contour Lines & Wind Dust Particles */}
      <DesertTopographyCanvas theme={theme} />

      {/* Always-Showing Translucent OS Taskbar + Scrolling State Marquee */}
      <TopBar
        currentPageId={currentPageId}
        onPageChange={handlePageChange}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        diagramMode={diagramMode}
        onChangeDiagramMode={setDiagramMode}
        visitedPages={visitedPages}
        inspectedNodes={inspectedNodes}
        activeNodeId={selectedNodeId}
        onInspectNextNode={handleInspectNextNode}
        onResetProgress={handleResetProgress}
        onOpenModal={setActiveModal}
        onExportDossierJson={handleExportDossierJson}
        onExportDossierMarkdown={handleExportDossierMarkdown}
        lastActionNotice={lastActionNotice}
      />

      {/* Centered Fixed-Dimension OS Application Window Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
        <div
          id="fixed-os-window"
          className="w-full max-w-[1240px] h-full max-h-[780px] border-2 shadow-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: 'var(--surface-primary)',
            borderColor: 'var(--border)',
          }}
        >
          {/* OS Window Chrome Title Bar */}
          <div
            className="h-9 px-4 border-b flex items-center justify-between shrink-0 select-none"
            style={{
              backgroundColor: 'var(--surface-tertiary)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Left Window Controls & Active Pane Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span
                  className="w-2.5 h-2.5 inline-block border"
                  style={{ backgroundColor: 'var(--blue-outline)', borderColor: 'var(--text)' }}
                />
                <span
                  className="w-2.5 h-2.5 inline-block border"
                  style={{ backgroundColor: 'var(--green-proven)', borderColor: 'var(--text)' }}
                />
                <span
                  className="w-2.5 h-2.5 inline-block border"
                  style={{ backgroundColor: 'var(--surface-primary)', borderColor: 'var(--border)' }}
                />
              </div>
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-[var(--text)] truncate">
                WORKSTATION // {activePageObj.index}. {activePageObj.label.replace(/^\d+\.\s*/, '')}
              </span>
            </div>

            {/* Right Window Geometry & Contrast Spec */}
            <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] font-bold text-[var(--text-dim)]">
              <span>FIXED FRAME 1240×780</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[var(--green-proven)]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>WCAG AAA 7:1+</span>
              </span>
            </div>
          </div>

          {/* Interactive Step-by-Step Dossier & Node Inspection Progress Bar */}
          <DossierProgressBar
            currentPageId={currentPageId}
            visitedPages={visitedPages}
            inspectedNodes={inspectedNodes}
            onPageChange={handlePageChange}
            onInspectNextNode={handleInspectNextNode}
            onResetProgress={handleResetProgress}
          />

          {/* Main Fixed-Height Split Workspace (Sidebar Rail + Scrollable Content Viewport) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <SidebarRail
              currentPageId={currentPageId}
              onPageChange={handlePageChange}
              viewMode={viewMode}
              onToggleViewMode={handleToggleViewMode}
              visitedPages={visitedPages}
              inspectedNodes={inspectedNodes}
            />

            <main
              id="os-window-main-scroll"
              className="flex-1 overflow-y-auto os-window-scroll p-5 sm:p-8"
              style={{ backgroundColor: 'var(--surface-primary)' }}
            >
              {viewMode === 'pages' ? (
                <div>
                  {currentPageId === 'subject' && <SubjectSection />}
                  {currentPageId === 'diagram' && (
                    <CapabilityMapSection
                      diagramMode={diagramMode}
                      onChangeDiagramMode={setDiagramMode}
                      selectedNodeId={selectedNodeId}
                      onSelectNode={handleSelectNode}
                      inspectedNodes={inspectedNodes}
                    />
                  )}
                  {currentPageId === 'tiers' && <BreakdownSection />}
                  {currentPageId === 'roadmap' && <RoadmapProjectsSection />}
                  {currentPageId === 'contact' && <ContactSection />}

                  <PagePagination
                    currentPageId={currentPageId}
                    onPageChange={handlePageChange}
                    viewMode={viewMode}
                  />
                </div>
              ) : (
                <div className="space-y-14">
                  <CapabilityMapSection
                    diagramMode={diagramMode}
                    onChangeDiagramMode={setDiagramMode}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={handleSelectNode}
                    inspectedNodes={inspectedNodes}
                  />
                  <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                    <SubjectSection />
                  </div>
                  <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                    <BreakdownSection />
                  </div>
                  <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                    <RoadmapProjectsSection />
                  </div>
                  <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                    <ContactSection />
                  </div>

                  <PagePagination
                    currentPageId={currentPageId}
                    onPageChange={handlePageChange}
                    viewMode={viewMode}
                  />
                </div>
              )}
            </main>
          </div>

          {/* OS Window Bottom Status Bar */}
          <div
            className="h-7 px-4 border-t flex items-center justify-between text-[11px] font-mono shrink-0 select-none"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
              color: 'var(--text-dim)',
            }}
          >
            <div className="flex items-center gap-3 truncate">
              <span className="font-bold text-[var(--text)]">
                FILE: CAP/PROFILE/001 · C. RODRIGUEZ
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline truncate">
                {lastActionNotice}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden md:inline">
                THEME: <strong className="text-[var(--text)] uppercase">{theme}</strong>
              </span>
              <span>·</span>
              <span className="font-bold text-[var(--blue-outline)]">
                READY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Modals (About & Help) */}
      <OsSystemModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        visitedCount={visitedPages.length}
        inspectedNodeCount={inspectedNodes.length}
      />
    </div>
  );
}
