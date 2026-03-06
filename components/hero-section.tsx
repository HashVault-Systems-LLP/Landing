import { ArrowRight, CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const workflow = ["Live labs", "Faculty-ready delivery", "Measured outcomes", "Mentor debriefs"];

const evidenceRows = [
  "Scenario-led exercises mapped to real operational decisions",
  "Cohort delivery plans that institutions can actually run",
  "Assessment checkpoints with evidence capture at each stage",
  "Debriefs that convert activity into practical next steps",
];

export function HeroSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border pt-18 lg:pt-12">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16 xl:py-18">
        <div className="max-w-4xl">
          <p className="section-kicker reveal-up">Operational readiness for modern security teams</p>

          <h1 className="display-title reveal-up reveal-up-delay-1 mt-5 max-w-4xl text-7xl text-foreground">
            Security training that holds up in the lab.
          </h1>

          <p className="reveal-up reveal-up-delay-2 mt-8 max-w-3xl text-[1.02rem] leading-8 text-muted-foreground sm:text-[1.08rem]">
            HashVault runs hands-on cybersecurity programs with practical scenarios, clear assessment checkpoints, and delivery models institutions can adopt without diluting the work into theory.
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

        <div className="mt-12 grid gap-6 border-t border-border pt-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
          {workflow.map((item) => (
            <div key={item} className="reveal-up flex items-center gap-3">
              <CheckCircle className="size-5 shrink-0 text-foreground" weight="fill" />
              <p className="text-base text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div className="reveal-up reveal-up-delay-2 relative mt-10 overflow-hidden border border-border bg-card/70">
          <div className="absolute inset-0 opacity-70
          bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_72%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_72%,transparent)_1px,transparent_1px),radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_40%)]
          bg-size-[174px_160px,160px_187px,100%_100%]"
          />

          <div className="relative p-6 sm:p-8 lg:p-10 xl:p-24">
            <div className="mx-auto flex min-h-72 max-w-4xl items-center justify-center lg:min-h-full">
              <div className="w-full border border-border bg-background/85 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-sm sm:p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-foreground" />
                    <div>
                      <p className="text-sm text-foreground">Program validation in motion</p>
                      <p className="mt-1 text-sm text-muted-foreground">Evidence and scenario review</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {evidenceRows.map((row) => (
                    <div key={row} className="flex items-center justify-between gap-4 border border-border/80 bg-card px-4 py-3 sm:px-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <CheckCircle className="size-5 shrink-0 text-foreground" weight="fill" />
                        <p className="text-sm leading-6 text-card-foreground sm:text-[0.98rem]">{row}</p>
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
