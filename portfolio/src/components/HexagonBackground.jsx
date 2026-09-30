'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 75,
  hexagonMargin = 3,
  interactiveGlow = true,
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

  // Denis Klak style cursor interaction: illuminate hexagons near cursor as mouse moves
  React.useEffect(() => {
    if (!interactiveGlow || typeof window === 'undefined') return;

    const activeHexes = new Map();

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Approximate row & column in O(1)
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
      <style>{`
        :root { --hexagon-margin: ${hexagonMargin}px; }
        .hex-cell {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          position: relative;
        }
        .hex-cell::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: rgba(30, 41, 59, 0.4);
          opacity: 1;
          transition: background-color 1000ms ease, box-shadow 1000ms ease;
        }
        .hex-cell::after {
          content: '';
          position: absolute;
          inset: var(--hexagon-margin);
          background-color: #05070a;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: background-color 1000ms ease;
        }
        .hex-cell:hover::before,
        .hex-cell.hex-active::before {
          background-color: rgba(6, 182, 212, 0.6);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.35);
          transition-duration: 0ms !important;
        }
        .hex-cell:hover::after,
        .hex-cell.hex-active::after {
          background-color: #0a1320;
          transition-duration: 0ms !important;
        }
      `}</style>
      <div className="absolute top-0 -left-0 size-full overflow-hidden pointer-events-auto">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            style={{
              marginTop: computedMarginTop,
              marginLeft:
                ((rowIndex + 1) % 2 === 0
                  ? evenRowMarginLeft
                  : oddRowMarginLeft) - 10,
            }}
            className="inline-flex"
          >
            {Array.from({ length: gridDimensions.columns }).map(
              (_, colIndex) => (
                <div
                  key={`hexagon-${rowIndex}-${colIndex}`}
                  id={`hex-${rowIndex}-${colIndex}`}
                  {...hexagonProps}
                  style={{
                    width: hexagonWidth,
                    height: hexagonHeight,
                    marginLeft: hexagonMargin,
                    ...hexagonProps?.style,
                  }}
                  className={cn(
                    'relative hex-cell cursor-pointer',
                    hexagonProps?.className
                  )}
                />
              )
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

export default HexagonBackground;
