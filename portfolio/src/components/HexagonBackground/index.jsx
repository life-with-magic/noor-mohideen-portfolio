'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { HexagonGrid } from './HexagonGrid';

export function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 75,
  hexagonMargin = 3,
  interactiveGlow = true,
  autoSweep = true,
  onSweepComplete,
  ...props
}) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.1;
  const rowSpacing = hexagonSize * 0.8;
  const baseMarginTop = -36 - 0.275 * (hexagonSize - 100);
  const computedMarginTop = baseMarginTop + hexagonMargin;
  const oddRowMarginLeft = -(hexagonSize / 2);
  const evenRowMarginLeft = hexagonMargin / 2;

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const hasSweptRef = React.useRef(false);

  const updateGridDimensions = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const rows = Math.ceil(window.innerHeight / rowSpacing) + 2;
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 2;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [updateGridDimensions]);

  // Diagonal sweep from top-left to bottom-right
  const runDiagonalSweep = React.useCallback((onComplete) => {
    if (typeof window === 'undefined') return;
    const rows = gridDimensions.rows;
    const cols = gridDimensions.columns;
    if (rows === 0 || cols === 0) return;

    const maxDiagonal = rows + cols;
    const sweepDuration = 2400; // Smooth & elegant 2.4s diagonal sweep
    const stepInterval = sweepDuration / maxDiagonal;

    for (let d = 0; d <= maxDiagonal; d++) {
      setTimeout(() => {
        // Highlight band of hexagons along diagonal d for light wave
        for (let r = 0; r < rows; r++) {
          const c = d - r;
          if (c >= 0 && c < cols) {
            const el = document.getElementById(`hex-${r}-${c}`);
            if (el) {
              el.classList.add('hex-sweep');
              setTimeout(() => {
                el.classList.remove('hex-sweep');
              }, 650);
            }
          }
        }

        // When the wave reaches bottom-right (~75% complete), transition to home page
        if (d === Math.floor(maxDiagonal * 0.75)) {
          onComplete?.();
        }
      }, d * stepInterval);
    }
  }, [gridDimensions.rows, gridDimensions.columns]);

  // Initial intro wave from top-left to bottom-right — starts immediately once loaded
  React.useEffect(() => {
    if (!autoSweep || hasSweptRef.current || gridDimensions.rows === 0) return;
    hasSweptRef.current = true;

    // Initiate immediately upon page load (100ms for initial DOM paint)
    const timer = setTimeout(() => {
      runDiagonalSweep(() => {
        onSweepComplete?.();
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [autoSweep, gridDimensions.rows, onSweepComplete, runDiagonalSweep]);

  // Listen for manual trigger (e.g. from down-arrow click)
  React.useEffect(() => {
    const handleTrigger = () => {
      runDiagonalSweep(() => {
        onSweepComplete?.();
      });
    };

    window.addEventListener('trigger-hex-sweep', handleTrigger);
    return () => window.removeEventListener('trigger-hex-sweep', handleTrigger);
  }, [runDiagonalSweep, onSweepComplete]);

  // Denis Klak style cursor interaction: illuminate hexagons near cursor as mouse moves
  React.useEffect(() => {
    if (!interactiveGlow || typeof window === 'undefined') return;

    const activeHexes = new Map();

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const approxRow = Math.round((y - computedMarginTop) / rowSpacing);
      const rowOffset = (approxRow + 1) % 2 === 0 ? evenRowMarginLeft : oddRowMarginLeft;
      const approxCol = Math.round((x - rowOffset + 10) / (hexagonWidth + hexagonMargin));

      const hexId = `hex-${approxRow}-${approxCol}`;
      const el = document.getElementById(hexId);

      if (el) {
        el.classList.add('hex-active');
        if (activeHexes.has(hexId)) {
          clearTimeout(activeHexes.get(hexId));
        }
        const timer = setTimeout(() => {
          el.classList.remove('hex-active');
          activeHexes.delete(hexId);
        }, 1200);
        activeHexes.set(hexId, timer);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      activeHexes.forEach((timer) => clearTimeout(timer));
      activeHexes.clear();
    };
  }, [interactiveGlow, computedMarginTop, rowSpacing, evenRowMarginLeft, oddRowMarginLeft, hexagonWidth, hexagonMargin]);

  return (
    <div
      data-slot="hexagon-background"
      className={cn(
        'relative size-full overflow-hidden bg-neutral-950 dark:bg-neutral-950',
        className
      )}
      {...props}
    >
      <HexagonGrid
        gridDimensions={gridDimensions}
        computedMarginTop={computedMarginTop}
        evenRowMarginLeft={evenRowMarginLeft}
        oddRowMarginLeft={oddRowMarginLeft}
        hexagonWidth={hexagonWidth}
        hexagonHeight={hexagonHeight}
        hexagonMargin={hexagonMargin}
        hexagonProps={hexagonProps}
      />
      {children}
    </div>
  );
}

export default HexagonBackground;
