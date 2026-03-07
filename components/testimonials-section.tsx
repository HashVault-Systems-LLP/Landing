"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

export type Testimonial = {
  name: string;
  role: string;
  organization: string;
  body: string;
  stars: 1 | 2 | 3 | 4 | 5;
};

const testimonials: Testimonial[] = [
  {
    name: "Nishita",
    role: "President, Cybersecurity Club",
    organization: "Engineering College, Bangalore",
    body: "The AWS Security workshop was highly engaging and informative, giving students a clear introduction to important cloud security concepts. It provided valuable hands-on exposure that helped bridge the gap between theory and real-world applications. Overall, the session offered practical insights into how security is implemented in real AWS environments.",
    stars: 5,
  },
  {
    name: "Abhiram",
    role: "Vice President, Cybersecurity Club",
    organization: "Engineering College, Bangalore",
    body: "The two-day bootcamp was extremely engaging, with students actively participating throughout the sessions. It’s rare to see such sustained interaction in technical events. Even long after the program, students were able to clearly recall the concepts that were taught. The hands-on labs especially helped reinforce practical understanding.",
    stars: 5,
  },
];

const INTERVAL_MS = 4500;
const TRANSITION_DURATION = 480; // ms — keep in sync with the inline style below

function StarRating({ count }: { count: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          weight={i < count ? "fill" : "regular"}
          className={`size-3.5 ${i < count ? "text-primary" : "text-muted-foreground/25"}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const total = testimonials.length;

  // We append a clone of the first card so we can slide seamlessly from last → first.
  // `index` runs from 0 … total (total = pointing at the clone).
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true); // false = instant jump, no transition
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Display index for dots: always clamp to 0..total-1 ──────────────────
  const dotIndex = index % total;

  // ── Start / restart the auto-advance timer ───────────────────────────────
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimated(true);
      setIndex((prev) => prev + 1);
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, startTimer]);

  // ── Seamless loop: when we land on the clone, instantly reset to index 0 ─
  useEffect(() => {
    if (index === total) {
      // Wait for the slide-to-clone transition to finish, then jump back silently
      const t = setTimeout(() => {
        setAnimated(false);
        setIndex(0);
      }, TRANSITION_DURATION);
      return () => clearTimeout(t);
    }
  }, [index, total]);

  // Re-enable animation one frame after the silent reset
  useEffect(() => {
    if (!animated) {
      const t = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(t);
    }
  }, [animated]);

  // ── Manual navigation ────────────────────────────────────────────────────
  const goTo = (i: number) => {
    setAnimated(true);
    setIndex(i);
    startTimer();
  };

  const prev = () => {
    if (index === 0) {
      // Jump silently to the clone position then slide back one
      setAnimated(false);
      setIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimated(true);
          setIndex(total - 1);
        });
      });
    } else {
      setAnimated(true);
      setIndex((i) => i - 1);
    }
    startTimer();
  };

  const next = () => {
    setAnimated(true);
    setIndex((i) => i + 1);
    startTimer();
  };

  // ── Cards: original array + clone of first for seamless wrap ─────────────
  const slides = [...testimonials, testimonials[0]];

  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-20 lg:py-24">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-50"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">From the field</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
              What participants say.
            </h2>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft size={15} weight="bold" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        </div>

        {/* ── Carousel track ── */}
        <div
          className="overflow-hidden border border-border"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Inner sliding row — width = (total + 1) cards × 100% */}
          <div
            className="flex"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${(index / slides.length) * 100}%)`,
              transition: animated
                ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
          >
            {slides.map((t, i) => (
              <div
                key={i}
                style={{ width: `${100 / slides.length}%` }}
                className="bg-card px-8 py-10 sm:px-12 sm:py-12"
              >
                <StarRating count={t.stars} />

                <blockquote className="mt-6 text-base leading-[1.9] text-card-foreground sm:text-lg">
                  &ldquo;{t.body}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div>
                    <p className="text-[0.85rem] font-medium text-foreground">{t.name}</p>
                    <p className="mt-0.5 text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {t.role}
                    </p>
                    <p className="mt-0.5 text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground/50">
                      {t.organization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="mt-5 flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === dotIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
