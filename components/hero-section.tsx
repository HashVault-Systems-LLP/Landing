import { ArrowRight, CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const stats = [
  { value: "70/30", label: "Hands-on ratio" },
  { value: "4", label: "Workshop tracks" },
  { value: "50–100", label: "Batch size" },
  { value: "1–3 days", label: "Formats available" },
];

const evidenceRows = [
  "Hands-on labs mapped to real attacker workflows — not toy challenges",
  "Workshop formats colleges can adopt without heavy faculty overhead",
  "Assessment checkpoints with feedback at each stage of delivery",
  "Debriefs that convert lab activity into visible capability growth",
];

export function HeroSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border pt-18 lg:pt-12">

      {/* ── Animated grid pattern background ── */}
      <AnimatedGridPattern
        numSquares={35}
        maxOpacity={0.06}
        duration={4}
        width={44}
        height={44}
        className={[
          // Fade to transparent at the bottom so the grid doesn't bleed into the next section
          "[mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_72%,transparent_100%)]",
          // Also fade horizontally at far edges
          "opacity-70",
        ].join(" ")}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16 xl:py-18">
        <div className="max-w-4xl">
          <p className="section-kicker reveal-up">
            Practitioner-led cybersecurity training · Bangalore, India
          </p>

          <h1 className="display-title reveal-up reveal-up-delay-1 mt-5 max-w-4xl text-4xl text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Security training that holds up in the lab.
          </h1>

          <p className="reveal-up reveal-up-delay-2 mt-8 max-w-3xl text-[1.02rem] leading-8 text-muted-foreground sm:text-[1.08rem]">
            HashVault Systems delivers hands-on cybersecurity workshops for engineering
            colleges and corporate teams — built around real attacker scenarios, structured
            assessments, and delivery models that institutions can adopt without diluting the
            work into theory.
          </p>

          <div className="reveal-up reveal-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#contact" />}
              className="h-12 border border-primary bg-primary px-6 text-[0.76rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
            >
              Schedule a briefing
              <ArrowRight weight="bold" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<a href="#workshops" />}
              className="h-12 border border-border bg-transparent px-6 text-[0.76rem] uppercase tracking-[0.18em] text-foreground hover:bg-accent/60"
            >
              Review workshop tracks
            </Button>
          </div>
        </div>

        {/* ── Stats ribbon ── */}
        <div className="reveal-up reveal-up-delay-2 mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card/80 px-6 py-5 text-center backdrop-blur-sm sm:py-6"
            >
              <p className="display-title text-2xl text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Evidence card ── */}
        <div className="reveal-up reveal-up-delay-2 relative mt-6 overflow-hidden border border-border bg-card/70 backdrop-blur-sm">

          {/* Subtle inner grid overlay for depth */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: [
                "radial-gradient(circle at top left, color-mix(in oklch, var(--primary) 10%, transparent), transparent 50%)",
              ].join(","),
            }}
          />

          <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="mx-auto max-w-4xl">
              <div className="w-full border border-border bg-background/80 p-4 shadow-sm sm:p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-primary" />
                    <div>
                      <p className="text-sm text-foreground">Program validation in motion</p>
                      <p className="mt-1 text-sm text-muted-foreground">Evidence and scenario review</p>
                    </div>
                  </div>
                  <span
                    className="shrink-0 border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em]"
                    style={{ color: "color-mix(in oklch, var(--primary) 80%, var(--muted-foreground) 20%)" }}
                  >
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {evidenceRows.map((row) => (
                    <div
                      key={row}
                      className="flex items-center justify-between gap-4 border border-border/80 bg-card px-4 py-3 sm:px-5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <CheckCircle
                          className="size-5 shrink-0 text-primary"
                          weight="fill"
                        />
                        <p className="text-sm leading-6 text-card-foreground sm:text-[0.96rem]">
                          {row}
                        </p>
                      </div>
                      <span className="shrink-0 border border-border px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
