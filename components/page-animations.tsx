"use client";

import { useEffect } from "react";

/**
 * PageAnimations
 *
 * Progressively enhances the page with scroll-triggered reveal animations.
 * Uses IntersectionObserver to watch elements matching a list of CSS
 * selectors, and adds an "in-view" class when they enter the viewport.
 *
 * Elements within the same parent get staggered transition-delays so
 * sibling cards / articles reveal in sequence rather than all at once.
 *
 * Zero dependencies, zero extra HTML attributes required on sections.
 * Gracefully degrades: if JS is absent, all content is visible as-is.
 *
 * The actual CSS transitions live in globals.css under
 * `.scroll-reveal` and `.scroll-reveal.in-view`.
 */

/** CSS selectors to watch. Order determines specificity priority. */
const REVEAL_SELECTORS = [
  // Section intro elements
  ".section-kicker",
  "section h2",
  "section blockquote",
  ".philosophy-gradient-line",
  // Cards / articles
  "section article",
  // Key panels
  ".hash-panel",
  // Tables
  "section table",
  // Contact form left column
  "#contact > div > div:first-child > *",
] as const;

/** Max stagger delay per sibling group (ms) */
const STAGGER_MS = 75;
/** Max siblings to stagger before capping delay (avoids very long waits) */
const MAX_STAGGER = 6;

export function PageAnimations() {
  useEffect(() => {
    // Respect user motion preference
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Collect all unique elements that match our selectors
    const seen = new Set<Element>();
    const targets: HTMLElement[] = [];

    REVEAL_SELECTORS.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        // Skip elements already in the hero section — they use CSS keyframe
        // animations on load and are visible above the fold
        const section = el.closest("section");
        if (section?.querySelector("[data-hero]")) return;

        if (!seen.has(el)) {
          seen.add(el);
          targets.push(el);
        }
      });
    });

    // Group elements by their immediate parent for stagger calculation
    const groups = new Map<Element | null, HTMLElement[]>();
    targets.forEach((el) => {
      const p = el.parentElement;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p)!.push(el);
    });

    // Apply initial hidden state + stagger delays
    targets.forEach((el) => {
      el.classList.add("scroll-reveal");

      if (!reduced) {
        const siblings = groups.get(el.parentElement) ?? [];
        const idx = siblings.indexOf(el);
        if (idx > 0) {
          const delayMs = Math.min(idx, MAX_STAGGER) * STAGGER_MS;
          el.style.transitionDelay = `${delayMs}ms`;
        }
      } else {
        // Immediately visible for reduced-motion users
        el.classList.add("in-view");
      }
    });

    if (reduced) return;

    // Elements already in the viewport on load — show immediately
    targets.forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        // Small delay so the CSS class is applied before the transition fires
        requestAnimationFrame(() => el.classList.add("in-view"));
      }
    });

    // Observe the rest
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((el) => {
      if (!el.classList.contains("in-view")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
