const steps = [
  {
    title: "Initial briefing",
    description: "We define learner profile, delivery context, and the outcomes you need to prove.",
  },
  {
    title: "Program design",
    description: "HashVault maps the workshop sequence, faculty support, and assessment checkpoints.",
  },
  {
    title: "Live delivery",
    description: "Operators facilitate the session with clear pacing, escalation, and debrief control.",
  },
  {
    title: "Evidence and next step",
    description: "You leave with capability signals, recommendations, and a path for the next cohort.",
  },
];

export function StepsSection() {
  return (
    <section className="section-frame border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="section-kicker">Engagement flow</p>
        <div className="border mt-8 grid gap-px bg-border lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="bg-background px-6 py-8 sm:px-7">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">Step 0{index + 1}</p>
              <h3 className="mt-5 text-lg text-foreground">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
