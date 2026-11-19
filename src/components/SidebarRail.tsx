import React from 'react';
import { PAGES_CONFIG, TOPOLOGY_NODES } from '../data';
import { PageId } from '../types';
import {
  CheckCircle2,
  Circle,
  Keyboard,
  ExternalLink,
  Compass,
  ShieldCheck,
} from 'lucide-react';

interface SidebarRailProps {
  currentPageId: PageId;
  onPageChange: (pageId: PageId) => void;
  viewMode: 'pages' | 'stream';
  onToggleViewMode: () => void;
  visitedPages?: string[];
  inspectedNodes?: string[];
}

export const SidebarRail: React.FC<SidebarRailProps> = ({
  currentPageId,
  onPageChange,
  viewMode,
  onToggleViewMode,
  visitedPages = ['diagram'],
  inspectedNodes = ['node-01'],
}) => {
  const handleItemClick = (pageId: PageId) => {
    onPageChange(pageId);
    const scroller = document.getElementById('os-window-main-scroll');
    if (viewMode === 'stream') {
      const el = document.getElementById(pageId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside
      id="sidebar-rail"
      className="w-full md:w-[250px] shrink-0 py-5 px-4 border-b md:border-b-0 md:border-r flex flex-col justify-between select-none"
      style={{
        backgroundColor: 'var(--surface-secondary)',
        borderColor: 'var(--border)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div className="space-y-5">
        {/* Workstation Directory Header */}
        <div className="flex items-center justify-between pb-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
            <span className="text-[11px] uppercase tracking-wider text-[var(--text)] font-bold">
              Dossier Index
            </span>
          </div>

          <button
            onClick={onToggleViewMode}
            className="text-[10px] font-bold uppercase px-2 py-0.5 border transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
            title="Toggle between single page mode and continuous scroll stream"
          >
            {viewMode === 'pages' ? 'PAGED' : 'STREAM'}
          </button>
        </div>

        {/* 5 Dossier Chapters with Verification Checkmarks */}
        <nav className="flex flex-col gap-1" aria-label="Workstation Dossier Chapters">
          {PAGES_CONFIG.map((item) => {
            const isActive = currentPageId === item.id;
            const isVisited = visitedPages.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="group flex items-center justify-between py-2.5 px-3 text-left border transition-all cursor-pointer text-xs"
                style={{
                  color: 'var(--text)',
                  borderColor: isActive ? 'var(--blue-outline)' : 'transparent',
                  backgroundColor: isActive ? 'var(--surface-tertiary)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <div className="flex items-center gap-2 truncate">
                  {isVisited ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--green-proven)] shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[var(--text-dimmer)] shrink-0" />
                  )}
                  <span className="font-bold text-[var(--blue-outline)]">{item.index}.</span>
                  <span className="truncate">
                    {item.label.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sub-Panel: Topology Node Verification Meter */}
        <div
          className="p-3 border space-y-2"
          style={{
            backgroundColor: 'var(--surface-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-[var(--text)] uppercase">Topology Audit</span>
            <span className="text-[var(--blue-outline)]">
              {inspectedNodes.length}/{TOPOLOGY_NODES.length}
            </span>
          </div>
          <div
            className="w-full h-2 border overflow-hidden"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.round((inspectedNodes.length / TOPOLOGY_NODES.length) * 100)}%`,
                backgroundColor:
                  inspectedNodes.length === TOPOLOGY_NODES.length
                    ? 'var(--green-proven)'
                    : 'var(--blue-outline)',
              }}
            />
          </div>
          <div className="text-[10.5px] text-[var(--text-dim)] leading-snug">
            {inspectedNodes.length === TOPOLOGY_NODES.length
              ? 'All 8 Tier-1 runtime nodes verified.'
              : 'Click nodes in Chapter 02 to inspect evidence.'}
          </div>
        </div>
      </div>

      {/* Bottom: External Registry & Keyboard Shortcuts */}
      <div className="pt-4 mt-4 border-t space-y-3 text-[11px]" style={{ borderColor: 'var(--border)' }}>
        <a
          href="https://project-atlas-seven-nu.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-2 px-2.5 border font-bold transition-colors"
          style={{
            backgroundColor: 'var(--surface-primary)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
            textDecoration: 'none',
          }}
        >
          <span>Project Atlas (19)</span>
          <ExternalLink className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
        </a>

        <div className="space-y-1 text-[var(--text-dim)]">
          <div className="flex items-center gap-1.5 font-bold text-[var(--text)]">
            <Keyboard className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
            <span>OS Hotkeys</span>
          </div>
          <div className="text-[10.5px] leading-relaxed">
            Keys <strong className="text-[var(--text)]">1–5</strong> Chapters ·{' '}
            <strong className="text-[var(--text)]">N</strong> Next Node ·{' '}
            <strong className="text-[var(--text)]">T</strong> Theme
          </div>
        </div>
      </div>
    </aside>
  );
};
