import { ArrowRightIcon, CheckCircleIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const stats = [
  { value: "70/30", label: "Hands-on ratio" },
  { value: "5", label: "Workshop tracks" },
  { value: "50–100+", label: "Batch size" },
  { value: "1–3 days", label: "Formats available" },
];

const evidenceRows = [
  "Hands-on labs mapped to real attacker workflows",
  "Workshop formats colleges can adopt without heavy faculty overhead",
  "Assessment checkpoints with feedback at each stage of delivery",
  "Debriefs that convert lab activity into visible capability growth",
];

export function HeroSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border pt-20 sm:pt-24 lg:pt-12" data-hero="true">

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

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:py-18">
        <div className="max-w-5xl">
          <p className="section-kicker reveal-up">
            Practitioner-led cybersecurity training · Bangalore, India
          </p>

          <h1 className="display-title reveal-up reveal-up-delay-1 mt-5 max-w-5xl text-4xl text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            For colleges and technical teams — security training that holds up in the real world.
          </h1>

          <p className="reveal-up reveal-up-delay-2 mt-6 max-w-4xl text-xs text-justify text-muted-foreground sm:mt-8 sm:text-[1.08rem]">
            HashVault Systems delivers hands-on cybersecurity workshops for
            colleges and corporate teams — built around real attacker scenarios, structured
            assessments, and delivery models that institutions can adopt without diluting the
            work into theory.
          </p>

          <div className="reveal-up reveal-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#contact" />}
              className="h-12 w-full justify-center border border-primary bg-primary px-6 text-[0.76rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              Schedule a briefing
              <ArrowRightIcon weight="bold" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<a href="#workshops" />}
              className="h-12 w-full justify-center border border-border bg-transparent px-6 text-[0.76rem] uppercase tracking-[0.18em] text-foreground hover:bg-accent/60 sm:w-auto"
            >
              Review workshop tracks
            </Button>
          </div>
        </div>

        {/* ── Stats ribbon ── */}
        <div className="reveal-up reveal-up-delay-2 mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:mt-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card/80 px-4 py-5 text-center backdrop-blur-sm sm:px-6 sm:py-6"
            >
              <p className="display-title text-2xl text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.66rem] sm:tracking-[0.18em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Evidence card ── */}
        <div className="reveal-up reveal-up-delay-2 relative mt-4 overflow-hidden border border-border bg-card/70 backdrop-blur-sm sm:mt-6">

          {/* Subtle inner grid overlay for depth */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: [
                "radial-gradient(circle at top left, color-mix(in oklch, var(--primary) 10%, transparent), transparent 50%)",
              ].join(","),
            }}
          />

          <div className="relative p-0 sm:p-8 lg:p-10 xl:p-12">
            <div className="mx-auto max-w-4xl">
              <div className="w-full border-0 bg-transparent p-0 shadow-none sm:border sm:border-border sm:bg-background/80 sm:p-5 sm:shadow-sm lg:p-6">
                <div className="px-4 pt-4 sm:px-0 sm:pt-0">
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3 items-center">
                    <ShieldCheckIcon size={18} className="hidden lg:block lg:size-5 mt-0.5 text-primary" />
                      <p className="mt-1 text-base font-medium text-foreground">
                        What our workshops bring to you
                      </p>
                  </div>
                  <span
                    className="hidden shrink-0 border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] lg:mr-5 lg:block w-16 text-center"
                    style={{ color: "color-mix(in oklch, var(--primary) 80%, var(--muted-foreground) 20%)" }}
                  >
                    Live
                  </span>
                </div>
                  <div className="mt-4 h-px bg-border" />
                </div>

                <div className="mt-4 space-y-0 lg:space-y-3">
                  {evidenceRows.map((row) => (
                    <div
                      key={row}
                      className="flex flex-col items-start gap-3 border-0 border-t border-border/80 bg-card px-4 py-3 first:border-t-0 sm:border sm:first:border-t sm:flex-row sm:items-center sm:justify-between sm:px-5"
                    >
                      <div className="flex min-w-0 items-start gap-3 sm:items-center">
                        <CheckCircleIcon
                          className="size-4 lg:size-5 shrink-0 mt-1 lg:mt-0 text-primary"
                          weight="fill"
                        />
                        <p className="text-xs leading-6 text-card-foreground sm:text-[0.96rem]">
                          {row}
                        </p>
                      </div>
                      <span className="hidden lg:block shrink-0 border border-border px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
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
