import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const gaps = [
  "Cybersecurity training in both colleges and corporate programs is still largely theory-driven. Many learners complete courses without ever using real attacker tools or working in practical lab environments.",
  "Training content often lags behind real-world threats. Static curricula struggle to keep up with evolving attack surfaces like cloud misconfigurations, API abuse, and modern attacker techniques.",
  "The industry has plenty of certificates, but not enough operational talent. Security teams need people who can triage alerts, think like attackers, and explain their reasoning under pressure.",
];

export function ThreatSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-14 sm:py-16 lg:py-24">
      <AnimatedGridPattern
        numSquares={22}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-60"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 lg:px-8">
        <div className="max-w-xl lg:pt-2">
          <p className="section-kicker">Why HashVault exists</p>
          <h2 className="mt-5 max-w-xl lg:text-[2rem] text-foreground text-2xl">
            Most security training still optimizes for completion, not operational readiness.
          </h2>
        </div>

        <div className="hash-panel grid gap-0 divide-y divide-border self-start">
          {gaps.map((gap, index) => (
            <div key={gap} className="relative grid gap-2 px-5 py-5 sm:grid-cols-[104px_minmax(0,1fr)] sm:items-start sm:gap-5 sm:px-8 sm:py-6">
              {/* Left accent line per gap item */}
              <div
                className="absolute left-0 top-4 bottom-4 w-0.5"
                style={{
                  background: `color-mix(in oklch, var(--primary) ${index === 0 ? 70 : index === 1 ? 45 : 25}%, transparent)`,
                }}
              />
              <span className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">Gap 0{index + 1}</span>
              <p className="max-w-xl text-sm text-card-foreground/88">{gap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
