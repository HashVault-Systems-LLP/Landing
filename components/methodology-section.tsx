const methods = [
  {
    number: "01",
    title: "Scenario-led workshops",
    description:
      "Tightly facilitated labs built around realistic attacker workflows, not toy challenges.",
  },
  {
    number: "02",
    title: "Curriculum integration",
    description:
      "HashVault maps exercises into existing teaching calendars so programs can ship without heavy faculty overhead.",
  },
  {
    number: "03",
    title: "Practitioner feedback loops",
    description:
      "Learners get direct critique on decision-making, reporting quality, and defensive tradeoffs.",
  },
];

export function MethodologySection() {
  return (
    <section id="methodology" className="section-frame border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start lg:gap-10">
          <div>
            <p className="section-kicker">How delivery works</p>
            <h2 className="mt-4 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">
              Structured enough for institutions. Intense enough to feel real.
            </h2>
          </div>
        </div>

        <div className="border grid gap-px bg-border lg:grid-cols-3 lg:items-stretch">
          {methods.map((method) => (
            <article key={method.number} className="bg-card px-6 py-8 sm:px-8 lg:min-h-[18rem]">
              <p className="section-kicker">Method {method.number}</p>
              <h3 className="mt-6 text-xl text-card-foreground">{method.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{method.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
