"use client";

import { useEffect, useRef } from "react";

/**
 * Bayer 8×8 ordered dither matrix (values 0–63).
 * Maps to threshold = (value + 0.5) / 64.
 *
 * At fill density D (0–1), a pixel is ON when D > threshold,
 * meaning (D × 64 - 0.5) cells are lit per 8×8 tile.
 *
 * The characteristic cross / checkerboard pattern becomes visible
 * when density is in the 0.4–0.75 range — not 1.0 (solid) and
 * not 0 (empty).
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

export type GradientMode =
  | "flat"        // uniform density throughout the glyph
  | "radial"      // dense at centre, sparse toward edges
  | "horizontal"  // dense on left, sparse on right
  | "vertical";   // dense at top, sparse at bottom

/** Compute a 0–1 gradient multiplier for a given pixel position. */
function gradientAt(
  x: number, y: number,
  cw: number, ch: number,
  mode: GradientMode,
): number {
  switch (mode) {
    case "radial": {
      const dx = x / cw - 0.5;
      const dy = y / ch - 0.5;
      // Full density at centre, drops off toward corners
      return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 2.1);
    }
    case "horizontal":
      // Left = 1.0, right = 0.25
      return 0.25 + 0.75 * (1 - x / cw);
    case "vertical":
      // Top = 1.0, bottom = 0.3
      return 0.3 + 0.7 * (1 - y / ch);
    case "flat":
    default:
      return 1.0;
  }
}

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
   * 0.08–0.2 gives a bold retro look. Default: 0.12
   */
  pixelScale?: number;
  /**
   * Maximum fill density (0–1) for fully opaque text pixels.
   *
   * This is the key control for the Bayer cross pattern:
   *   1.0 = fully solid (no pattern visible inside the glyph)
   *   0.65 = ~65% of the 8×8 tile lit  → clear cross/dot pattern
   *   0.5  = ~50% fill → classic Bayer checkerboard
   *
   * Default: 0.65
   */
  density?: number;
  /**
   * How the fill density varies across the glyph area.
   * Default: "flat"
   */
  gradientMode?: GradientMode;
  /**
   * When true the font is scaled so the text spans the full canvas width
   * (up to fontScale × height as a ceiling).
   */
  fitWidth?: boolean;
}

/**
 * DitherText
 *
 * Renders a text string with authentic Bayer 8×8 ordered dithering.
 *
 * The `density` prop is what makes the cross pattern visible inside
 * the glyph body: setting it below 1.0 means the Bayer matrix generates
 * its characteristic halftone/cross pattern throughout the text interior,
 * not just at the anti-aliased edges.
 *
 * The canvas is rendered at intentionally low resolution (pixelScale) and
 * CSS-upscaled with `image-rendering: pixelated` for the chunky retro look.
 */
export function DitherText({
  text,
  fontFamily = '"Archivo Black", sans-serif',
  fontWeight = 400,
  className,
  colorRgb = [160, 100, 240],
  fontScale = 0.8,
  pixelScale = 0.12,
  density = 0.65,
  gradientMode = "flat",
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

      // Intentionally low-resolution canvas → chunky dither pixels when upscaled
      const cw = Math.max(1, Math.round(cssW * pixelScale));
      const ch = Math.max(1, Math.round(cssH * pixelScale));
      canvas.width = cw;
      canvas.height = ch;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, cw, ch);

      // ── Font sizing ─────────────────────────────────────────────────────
      let fontSize = ch * fontScale;

      if (fitWidth) {
        ctx.font = `${fontWeight} 100px ${fontFamily}`;
        const probe = ctx.measureText(text).width;
        if (probe > 0) {
          const fitSize = (cw * 0.97) / (probe / 100);
          fontSize = Math.min(fitSize, ch * fontScale);
        }
      }

      // ── Draw white text onto the canvas (alpha = our dither mask) ────────
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(text, cw / 2, ch / 2);

      // ── Bayer 8×8 ordered dithering ─────────────────────────────────────
      const imageData = ctx.getImageData(0, 0, cw, ch);
      const d = imageData.data;
      const maxA = density * 255; // density cap for interior cross pattern

      for (let y = 0; y < ch; y++) {
        const by = y % 8;
        for (let x = 0; x < cw; x++) {
          const bx = x % 8;
          const idx = (y * cw + x) * 4;
          const rawAlpha = d[idx + 3]; // 0–255

          // Skip fully transparent pixels early
          if (rawAlpha === 0) continue;

          // 1. Cap alpha by the density ceiling (reveals cross pattern in interior)
          // 2. Multiply by gradient (creates density variation across the glyph)
          const g = gradientAt(x, y, cw, ch, gradientMode);
          const effectiveAlpha = Math.min(rawAlpha, maxA) * g;

          // Bayer threshold in the same 0–255 space
          const threshold = ((BAYER_8x8[by * 8 + bx] + 0.5) / 64) * 255;

          if (effectiveAlpha > threshold) {
            d[idx]     = colorRgb[0];
            d[idx + 1] = colorRgb[1];
            d[idx + 2] = colorRgb[2];
            d[idx + 3] = 255;
          } else {
            d[idx + 3] = 0;
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
  }, [
    text, fontFamily, fontWeight,
    colorRgb[0], colorRgb[1], colorRgb[2],
    fontScale, pixelScale, density, gradientMode, fitWidth,
  ]);

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
