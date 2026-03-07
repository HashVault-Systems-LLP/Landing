"use client";

import { useEffect, useRef } from "react";

/**
 * Bayer 8×8 ordered dither matrix (values 0–63).
 * Normalised to [0,1] by dividing by 64 at threshold time.
 */
const BAYER_8x8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

export interface DitherTextProps {
  /** The string to render with ordered dithering */
  text: string;
  fontFamily?: string;
  fontWeight?: string | number;
  /** Extra className applied to the <canvas> element */
  className?: string;
  /** Fill colour for "on" pixels, as [R, G, B] 0–255. Defaults to brand purple. */
  colorRgb?: [number, number, number];
  /**
   * Fraction of the canvas HEIGHT used as the font size.
   * Ignored when fitWidth is true (font is auto-scaled to canvas width).
   * Default: 0.8
   */
  fontScale?: number;
  /**
   * Internal render scale relative to the CSS size.
   * Lower = chunkier dither pixels (looks more authentic).
   * 0.2–0.35 works well for display text. Default: 0.25
   */
  pixelScale?: number;
  /**
   * When true the font is scaled so the text spans the full canvas width
   * (up to fontScale × height as a ceiling).
   */
  fitWidth?: boolean;
}

/**
 * DitherText
 *
 * Renders a text string onto a low-resolution offscreen canvas, then applies
 * Bayer 8×8 ordered dithering to every pixel. The canvas is CSS-scaled back
 * up with `image-rendering: pixelated`, producing an authentic halftone-like
 * dither appearance at any display size.
 *
 * Usage:
 *   <div className="absolute inset-0 opacity-20 pointer-events-none">
 *     <DitherText text="HASHVAULT" fitWidth colorRgb={[160, 100, 240]} />
 *   </div>
 */
export function DitherText({
  text,
  fontFamily = '"Archivo Black", sans-serif',
  fontWeight = 400,
  className,
  colorRgb = [160, 100, 240],
  fontScale = 0.8,
  pixelScale = 0.25,
  fitWidth = false,
}: DitherTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      if (!cssW || !cssH) return;

      // Intentionally low-resolution canvas for chunky dither "pixels"
      const cw = Math.max(1, Math.round(cssW * pixelScale));
      const ch = Math.max(1, Math.round(cssH * pixelScale));
      canvas.width = cw;
      canvas.height = ch;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, cw, ch);

      // ── Determine font size ──────────────────────────────────────────────
      let fontSize = ch * fontScale;

      if (fitWidth) {
        // Probe at 100 px then scale proportionally
        ctx.font = `${fontWeight} 100px ${fontFamily}`;
        const probe = ctx.measureText(text).width;
        if (probe > 0) {
          const fitSize = (cw * 0.97) / (probe / 100);
          fontSize = Math.min(fitSize, ch * fontScale);
        }
      }

      // ── Draw white text (we'll dither the alpha channel) ────────────────
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(text, cw / 2, ch / 2);

      // ── Ordered dithering on alpha ───────────────────────────────────────
      const imageData = ctx.getImageData(0, 0, cw, ch);
      const data = imageData.data;

      for (let y = 0; y < ch; y++) {
        const by = y % 8;
        for (let x = 0; x < cw; x++) {
          const bx = x % 8;
          const idx = (y * cw + x) * 4;
          const alpha = data[idx + 3]; // 0–255
          // Bayer threshold scaled to 0–255
          const threshold = ((BAYER_8x8[by * 8 + bx] + 0.5) / 64) * 255;

          if (alpha > threshold) {
            data[idx]     = colorRgb[0];
            data[idx + 1] = colorRgb[1];
            data[idx + 2] = colorRgb[2];
            data[idx + 3] = 255;
          } else {
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    draw();

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fontFamily, fontWeight, colorRgb[0], colorRgb[1], colorRgb[2], fontScale, pixelScale, fitWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        // Crisp pixel upscaling — essential for the dither look
        imageRendering: "pixelated",
      }}
    />
  );
}
