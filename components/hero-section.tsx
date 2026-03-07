import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "70/30", label: "Hands-on ratio" },
  { value: "4", label: "Workshop tracks" },
  { value: "50–100", label: "Batch size" },
  { value: "1–3 days", label: "Formats available" },
];

// Each line reveals sequentially via CSS animation-delay + animation-fill-mode:both
const terminalLines = [
  {
    type: "cmd",
    content: "$ hashvault scan --cohort cs-engineering --track ethical-hacking",
    delay: 0.3,
  },
  {
    type: "status",
    text: "◆ Loading threat scenario library",
    dots: " ...............",
    status: "done",
    delay: 0.9,
  },
  {
    type: "status",
    text: "◆ Staging live lab environment",
    dots: " ...................",
    status: "done",
    delay: 1.5,
  },
  {
    type: "status",
    text: "◆ Mapping cohort capability gaps",
    dots: " .................",
    status: "done",
    delay: 2.1,
  },
  {
    type: "status",
    text: "◆ Generating assessment checkpoints",
    dots: " .............",
    status: "done",
    delay: 2.7,
  },
  { type: "blank", delay: 3.0 },
  {
    type: "result",
    content: "▶  Session ready  ·  78 learners  ·  HV-220 Ethical Hacking Bootcamp",
    delay: 3.2,
  },
  {
    type: "detail",
    content: "   Delivery: Bangalore, Karnataka  —  HashVault Systems LLP",
    delay: 3.6,
  },
  {
    type: "progress",
    delay: 4.0,
  },
  { type: "cursor", delay: 4.4 },
];

export function HeroSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border pt-18 lg:pt-12">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16 xl:py-18">
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
              className="bg-card/80 px-6 py-5 text-center sm:py-6"
            >
              <p className="display-title text-2xl text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Terminal window ── */}
        <div className="reveal-up reveal-up-delay-3 relative mt-6 overflow-hidden glow-panel">

          {/* Scan sweep line — purely decorative */}
          <div
            className="scan-sweep pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 55%, transparent) 50%, transparent 100%)",
            }}
          />

          {/* Terminal chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-card/90 px-4 py-3 sm:px-5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full opacity-70" style={{ background: "oklch(0.78 0.16 85)" }} />
            <span className="h-3 w-3 rounded-full opacity-70" style={{ background: "oklch(0.72 0.18 145)" }} />
            <span className="ml-3 text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground/60">
              hv-scanner — ethical-hacking-bootcamp
            </span>
            <span
              className="ml-auto text-[0.66rem] uppercase tracking-[0.14em] cursor-blink"
              style={{ color: "color-mix(in oklch, var(--primary) 80%, var(--muted-foreground) 20%)" }}
            >
              ● LIVE
            </span>
          </div>

          {/* Terminal body */}
          <div className="overflow-x-auto bg-card/60 px-5 py-6 sm:px-7 sm:py-7">
            <div className="min-w-[520px] space-y-1 font-mono text-[0.78rem] leading-relaxed sm:text-[0.85rem]">
              {terminalLines.map((line, i) => {
                const style = { animationDelay: `${line.delay}s` };

                if (line.type === "cmd") {
                  return (
                    <div key={i} className="terminal-reveal" style={style}>
                      <span style={{ color: "color-mix(in oklch, var(--primary) 90%, var(--foreground) 10%)" }}>
                        {line.content}
                      </span>
                    </div>
                  );
                }

                if (line.type === "status") {
                  return (
                    <div key={i} className="terminal-reveal" style={style}>
                      <span className="text-muted-foreground">{line.text}</span>
                      <span className="text-border/70">{line.dots}</span>
                      <span style={{ color: "color-mix(in oklch, var(--primary) 85%, var(--foreground) 15%)" }}>
                        {" "}{line.status}
                      </span>
                    </div>
                  );
                }

                if (line.type === "blank") {
                  return <div key={i} className="terminal-reveal h-3" style={style} />;
                }

                if (line.type === "result") {
                  return (
                    <div key={i} className="terminal-reveal" style={style}>
                      <span className="font-semibold text-foreground">{line.content}</span>
                    </div>
                  );
                }

                if (line.type === "detail") {
                  return (
                    <div key={i} className="terminal-reveal" style={style}>
                      <span className="text-muted-foreground">{line.content}</span>
                    </div>
                  );
                }

                if (line.type === "progress") {
                  return (
                    <div key={i} className="terminal-reveal mt-2" style={style}>
                      <span className="text-muted-foreground">{"  "}[</span>
                      <span style={{ color: "var(--primary)" }}>{"████████████████████"}</span>
                      <span className="text-muted-foreground">] 100%</span>
                      <span className="ml-3 text-muted-foreground/60">— workshop ready</span>
                    </div>
                  );
                }

                if (line.type === "cursor") {
                  return (
                    <div key={i} className="terminal-reveal mt-1" style={style}>
                      <span
                        className="cursor-blink inline-block w-[0.52em] h-[1.05em] align-middle"
                        style={{ background: "var(--primary)" }}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
