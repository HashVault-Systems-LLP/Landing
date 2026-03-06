const gaps = [
  "Lecture-heavy programs rarely build the speed or judgment needed in a live incident.",
  "Static labs drift away from current tooling, cloud patterns, and attacker tradecraft.",
  "Graduates often know the language of security without having practiced the operating rhythm.",
];

export function ThreatSection() {
  return (
    <section className="section-frame border-b border-border py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 lg:px-8">
        <div className="max-w-xl lg:pt-2">
          <p className="section-kicker">Why HashVault exists</p>
          <h2 className="mt-5 max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
            Most security education still optimizes for completion, not operational readiness.
          </h2>
        </div>

        <div className="hash-panel grid gap-0 divide-y divide-border self-start">
          {gaps.map((gap, index) => (
            <div key={gap} className="grid gap-2 px-6 py-6 sm:grid-cols-[104px_minmax(0,1fr)] sm:items-start sm:gap-5 sm:px-8">
              <span className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">Gap 0{index + 1}</span>
              <p className="max-w-xl text-sm leading-7 text-card-foreground/88">{gap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
