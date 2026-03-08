import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { DitherText } from "@/components/dither-text";

export function PhilosophySection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-16 sm:py-20 lg:py-36">

      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.04}
        duration={6}
        width={44}
        height={44}
        className="mask-[radial-gradient(ellipse_60%_80%_at_30%_50%,black_30%,transparent_80%)] opacity-50"
      />

      {/* Large decorative background numeral — Bayer-dithered with cross pattern */}
      <div
        className="pointer-events-none absolute right-24 top-1/2 hidden -translate-y-1/2 select-none opacity-[0.32] sm:block"
        style={{ width: "clamp(8rem, 26vw, 26rem)", height: "clamp(8rem, 26vw, 26rem)" }}
        aria-hidden="true"
      >
        <DitherText
          text="01"
          pixelScale={0.4}
          fontScale={0.82}
          colorRgb={[160, 100, 240]}
          density={0.62}
          gradientMode="radial"
        />
      </div>

      {/* Ambient glow blob behind the quote */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 hidden h-72 w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-3xl sm:block"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="section-kicker">Operating principle</p>
        {/* Gradient underline accent */}
        <div className="mt-3 h-px max-w-xs philosophy-gradient-line" />

        <blockquote className="mt-8 max-w-4xl text-2xl tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Build practitioners who are{" "}
          <span style={{ color: "var(--primary)" }}>practically ready,</span>{" "}
          have industry level exposure & work with the current tools and techniques.
        </blockquote>

        

        {/* <p className="mt-6 max-w-lg text-sm leading-[1.85] text-muted-foreground">
          Not certificate collectors. Not passive attendees. The kind of person a
          security team actually wants next to them during an incident — one who has
          been under pressure before and knows how to move.
        </p> */}
      </div>
    </section>
  );
}
