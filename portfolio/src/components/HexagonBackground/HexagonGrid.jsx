import * as React from 'react';
import { cn } from '@/lib/utils';

export function HexagonGrid({
  gridDimensions,
  computedMarginTop,
  evenRowMarginLeft,
  oddRowMarginLeft,
  hexagonWidth,
  hexagonHeight,
  hexagonMargin,
  hexagonProps,
}) {
  return (
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
                  '--hexagon-margin': `${hexagonMargin}px`,
                  ...hexagonProps?.style,
                }}
                className={cn(
                  'relative cursor-pointer',
                  '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]',
                  'before:absolute before:inset-0 before:bg-slate-700/45 before:opacity-100 before:transition-[background,box-shadow] before:duration-1000 before:ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'after:absolute after:inset-[var(--hexagon-margin)] after:bg-[#070a0f] after:[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] after:transition-colors after:duration-1000 after:ease-[cubic-bezier(0.16,1,0.3,1)]',
                  // Hover & Active States (subtle purple glow on main page)
                  'hover:before:bg-[linear-gradient(135deg,rgba(168,85,247,0.45)_0%,rgba(192,132,252,0.4)_50%,rgba(232,121,249,0.35)_100%)] hover:before:shadow-[0_0_16px_rgba(168,85,247,0.35),0_0_30px_rgba(147,51,234,0.2)] hover:before:!duration-0',
                  'hover:after:bg-[#0d0917] hover:after:!duration-0',
                  '[&.hex-active]:before:bg-[linear-gradient(135deg,rgba(168,85,247,0.45)_0%,rgba(192,132,252,0.4)_50%,rgba(232,121,249,0.35)_100%)] [&.hex-active]:before:shadow-[0_0_16px_rgba(168,85,247,0.35),0_0_30px_rgba(147,51,234,0.2)] [&.hex-active]:before:!duration-0',
                  '[&.hex-active]:after:bg-[#0d0917] [&.hex-active]:after:!duration-0',
                  // Sweep State (radiant purple sweep intro)
                  '[&.hex-sweep]:before:!bg-[linear-gradient(135deg,#9333ea_0%,#a855f7_40%,#c084fc_70%,#f472b6_100%)] [&.hex-sweep]:before:!shadow-[0_0_25px_rgba(168,85,247,0.9),0_0_50px_rgba(147,51,234,0.5)] [&.hex-sweep]:before:!duration-0',
                  '[&.hex-sweep]:after:!bg-[#1a0e2e] [&.hex-sweep]:after:!duration-0',
                  hexagonProps?.className
                )}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
