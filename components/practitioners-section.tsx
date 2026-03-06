const features = [
  {
    id: "Practice 01",
    title: "Red team drills",
    copy: "Attack-path design grounded in current infrastructure realities.",
  },
  {
    id: "Practice 02",
    title: "Blue team response",
    copy: "Triage, containment, communication, and reporting under time pressure.",
  },
  {
    id: "Practice 03",
    title: "Reverse engineering",
    copy: "Binary and payload analysis used to sharpen technical judgment.",
  },
  {
    id: "Practice 04",
    title: "Incident review",
    copy: "Debriefs that convert raw activity into observable capability growth.",
  },
];

export function PractitionersSection() {
  return (
    <section className="section-frame border-b border-border py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-24">

          {/* ── left ── */}
          <div className="lg:sticky lg:top-12 lg:pt-1">
            <p className="section-kicker">Who leads the work</p>
            <h2 className="mt-5 text-3xl leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Built by practitioners, not by people designing{" "}
              <span className="text-muted-foreground">around the rubric.</span>
            </h2>
            <div className="mt-8 h-px w-12 bg-primary" />
            <p className="mt-6 text-sm leading-[1.85] text-muted-foreground">
              Every module is authored and stress-tested by operators who have
              run these scenarios in live environments — not adapted from
              certification frameworks.
            </p>
          </div>

          {/* ── right: feature grid ── */}
          <div className="grid gap-px bg-border border sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.id}
                className="group relative bg-card px-7 py-8 transition-colors hover:bg-card/70 sm:px-8 sm:py-9"
              >
                {/* top accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {feature.id}
                </p>
                <h3 className="mt-5 text-base leading-snug text-card-foreground sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">
                  {feature.copy}
                </p>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
