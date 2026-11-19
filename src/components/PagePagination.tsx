import React from 'react';
import { PAGES_CONFIG } from '../data';
import { PageId } from '../types';
import { ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface PagePaginationProps {
  currentPageId: PageId;
  onPageChange: (pageId: PageId) => void;
  viewMode: 'pages' | 'stream';
}

export const PagePagination: React.FC<PagePaginationProps> = ({
  currentPageId,
  onPageChange,
  viewMode,
}) => {
  const currentIndex = PAGES_CONFIG.findIndex((p) => p.id === currentPageId);
  const prevPage = currentIndex > 0 ? PAGES_CONFIG[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGES_CONFIG.length - 1 ? PAGES_CONFIG[currentIndex + 1] : null;

  const scrollToTopOfWindow = () => {
    const scroller = document.getElementById('os-window-main-scroll');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (viewMode === 'stream') {
    return (
      <div
        className="mt-10 pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
        style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}
      >
        <div className="flex items-center gap-2 font-bold">
          <Layers className="w-4 h-4 text-[var(--blue-outline)]" />
          <span>Continuous Stream Mode · All 5 Chapters Loaded</span>
        </div>
        <button
          onClick={scrollToTopOfWindow}
          className="px-3.5 py-1.5 border font-bold hover:bg-[var(--surface-secondary)] transition-colors text-[var(--text)] cursor-pointer"
          style={{ borderColor: 'var(--border)' }}
        >
          ↑ Return to Top of Window
        </button>
      </div>
    );
  }

  return (
    <nav
      aria-label="Chapter Pagination"
      className="mt-10 pt-6 border-t space-y-5"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Chapter Indicator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--text-dim)] font-semibold">
          <BookOpen className="w-4 h-4 text-[var(--blue-outline)]" />
          <span>
            CHAPTER <strong className="text-[var(--text)]">{currentIndex + 1}</strong> OF{' '}
            <strong className="text-[var(--text)]">{PAGES_CONFIG.length}</strong>
          </span>
        </div>

        {/* Step buttons */}
        <div className="flex items-center gap-1.5">
          {PAGES_CONFIG.map((p) => {
            const isActive = p.id === currentPageId;
            return (
              <button
                key={p.id}
                onClick={() => onPageChange(p.id)}
                title={`${p.index} — ${p.label}`}
                className="w-7 h-7 flex items-center justify-center font-mono text-xs transition-all cursor-pointer border"
                style={{
                  backgroundColor: isActive ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
                  color: 'var(--text)',
                  borderColor: isActive ? 'var(--blue-outline)' : 'var(--border)',
                  fontWeight: isActive ? 800 : 600,
                }}
              >
                {p.index}
              </button>
            );
          })}
        </div>
      </div>

      {/* Previous / Next Chapter Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPage ? (
          <button
            onClick={() => onPageChange(prevPage.id)}
            className="flex items-center gap-3.5 p-4 border text-left transition-all hover:border-[var(--blue-outline)] hover:bg-[var(--surface-secondary)] group cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="p-2 border group-hover:-translate-x-0.5 transition-transform"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-dimmer)]">
                Previous · Chapter {prevPage.index}
              </div>
              <div className="text-sm font-bold text-[var(--text)]">
                {prevPage.label}
              </div>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPage ? (
          <button
            onClick={() => onPageChange(nextPage.id)}
            className="flex items-center justify-between p-4 border text-right transition-all hover:border-[var(--blue-outline)] hover:bg-[var(--surface-secondary)] group sm:col-start-2 cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-left">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-dimmer)]">
                Next · Chapter {nextPage.index}
              </div>
              <div className="text-sm font-bold text-[var(--text)]">
                {nextPage.label}
              </div>
            </div>
            <div
              className="p-2 border group-hover:translate-x-0.5 transition-transform ml-3 flex-none"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ) : null}
      </div>
    </nav>
  );
};
