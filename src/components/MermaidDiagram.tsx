import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { RefreshCw } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const renderAttemptRef = useRef<number>(0);

  const renderChartWithRetry = useCallback(async (attempt = 1, maxAttempts = 3) => {
    const isDark = document.documentElement.classList.contains('dark');
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      themeVariables: isDark
        ? {
            darkMode: true,
            background: '#1E1A17',
            primaryColor: '#6EE7B7',
            primaryTextColor: '#14110E',
            primaryBorderColor: '#F59E0B',
            lineColor: '#BBAEA0',
            secondaryColor: '#2B2520',
            tertiaryColor: '#141210',
            fontFamily: 'JetBrains Mono, Public Sans, monospace',
            fontSize: '13px',
          }
        : {
            darkMode: false,
            background: '#EFE7D6',
            primaryColor: '#0F5132',
            primaryTextColor: '#FAF6EE',
            primaryBorderColor: '#8C3B0C',
            lineColor: '#4D4238',
            secondaryColor: '#E2D6BE',
            tertiaryColor: '#FAF6EE',
            fontFamily: 'JetBrains Mono, Public Sans, monospace',
            fontSize: '13px',
          },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 40,
        rankSpacing: 45,
      },
      securityLevel: 'loose',
    });

    setIsLoading(true);
    setRenderError(null);
    const currentAttemptId = ++renderAttemptRef.current;

    try {
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      const { svg } = await mermaid.render(id, chart);

      if (currentAttemptId === renderAttemptRef.current) {
        setSvgContent(svg);
        setRenderError(null);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const strayElements = document.querySelectorAll(`[id^="dmermaid-"], [id^="mermaid-"]`);
      strayElements.forEach((el) => {
        if (!containerRef.current?.contains(el)) {
          el.remove();
        }
      });

      if (attempt < maxAttempts) {
        const delay = attempt * 300;
        setTimeout(() => {
          if (currentAttemptId === renderAttemptRef.current) {
            renderChartWithRetry(attempt + 1, maxAttempts);
          }
        }, delay);
      } else {
        if (currentAttemptId === renderAttemptRef.current) {
          console.warn('Mermaid rendering notice after retries:', err);
          setRenderError(err instanceof Error ? err.message : 'Failed to render diagram');
          setIsLoading(false);
        }
      }
    }
  }, [chart]);

  useEffect(() => {
    renderChartWithRetry(1, 3);
  }, [renderChartWithRetry]);

  if (renderError) {
    return (
      <div className="p-4 border bg-[var(--surface-secondary)] text-xs font-mono space-y-2" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between">
          <div className="text-[var(--text-dim)]">
            <span className="text-[var(--red-gap)] font-bold">Diagram Render Notice:</span> {renderError}
          </div>
          <button
            onClick={() => renderChartWithRetry(1, 3)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border bg-[var(--surface-primary)] hover:border-[var(--blue-outline)] text-[var(--text)] transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border)' }}
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Render</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {isLoading && !svgContent && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-xs font-mono text-[var(--text-dim)]">
          <div className="w-6 h-6 border-2 border-[var(--blue-outline)] border-t-transparent rounded-full animate-spin" />
          <span>Generating dependency graph...</span>
        </div>
      )}
      <div
        ref={containerRef}
        className={`mermaid-wrapper w-full overflow-x-auto py-2 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto transition-opacity duration-200 ${
          isLoading && !svgContent ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};
