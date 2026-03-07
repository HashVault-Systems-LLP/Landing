"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps {
  /** Grid cell width in px */
  width?: number;
  /** Grid cell height in px */
  height?: number;
  /** Number of squares to highlight at a time */
  numSquares?: number;
  /** Peak opacity of each highlighted square */
  maxOpacity?: number;
  /** Duration in seconds for one full pulse cycle (fade-in + hold + fade-out) */
  duration?: number;
  /** Extra CSS classes applied to the root <svg> */
  className?: string;
}

// Monotonically increasing key so React always treats re-picked squares as new nodes
let _uid = 0;

function pickSquares(
  cols: number,
  rows: number,
  count: number
): Array<{ col: number; row: number; uid: number }> {
  const used = new Set<string>();
  const out: Array<{ col: number; row: number; uid: number }> = [];
  let guard = count * 8;
  while (out.length < count && --guard > 0) {
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);
    const k = `${col},${row}`;
    if (!used.has(k)) {
      used.add(k);
      out.push({ col, row, uid: ++_uid });
    }
  }
  return out;
}

/**
 * AnimatedGridPattern
 *
 * An SVG background grid where a random selection of cells pulses in and
 * out at a configurable rate.  Inspired by MagicUI's animated-grid-pattern
 * but implemented without framer-motion — pure CSS @keyframes + React state.
 *
 * Usage:
 *   <div className="relative overflow-hidden">
 *     <AnimatedGridPattern className="[mask-image:radial-gradient(ellipse_at_top,white_0%,transparent_70%)]" />
 *     {children}
 *   </div>
 */
export function AnimatedGridPattern({
  width = 40,
  height = 40,
  numSquares = 30,
  maxOpacity = 0.08,
  duration = 3,
  className,
}: AnimatedGridPatternProps) {
  const patternId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [squares, setSquares] = useState<
    Array<{ col: number; row: number; uid: number }>
  >([]);

  // Track SVG container size via ResizeObserver
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // When dimensions are known, start picking & cycling squares
  useEffect(() => {
    if (!dims.w || !dims.h) return;
    const cols = Math.ceil(dims.w / width) + 1;
    const rows = Math.ceil(dims.h / height) + 1;
    const update = () => setSquares(pickSquares(cols, rows, numSquares));
    update();
    const id = setInterval(update, duration * 1000);
    return () => clearInterval(id);
  }, [dims, width, height, numSquares, duration]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    >
      <defs>
        <pattern
          id={`agp-${patternId}`}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          {/* Draws top + left edge of each cell — forms the grid lines */}
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border/40"
          />
        </pattern>
      </defs>

      {/* Grid lines covering the whole SVG */}
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#agp-${patternId})`}
      />

      {/* Animated highlighted squares.
          Each rect gets a brand-new uid key when squares update, so React
          remounts it and the CSS animation restarts cleanly from opacity 0. */}
      {squares.map(({ col, row, uid }) => (
        <rect
          key={uid}
          x={col * width + 1}
          y={row * height + 1}
          width={width - 2}
          height={height - 2}
          fill="currentColor"
          className="text-primary"
          style={
            {
              "--gmax": maxOpacity,
              animation: `agp-pulse ${duration}s ease-in-out 1 both`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
