import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const methods = [
  {
    number: "01",
    title: "70% hands-on, 30% theory",
    description:
      "Every HashVault session runs the majority of time in live lab environments. Most individuals remember what they do, not what they hear — so we build accordingly.",
  },
  {
    number: "02",
    title: "Scenario-led delivery",
    description:
      "Labs are built around real attacker workflows: recon, enumeration, exploitation, lateral movement and covering tracks — mapped to current tooling, not legacy coursework.",
  },
  {
    number: "03",
    title: "Practitioner debrief at every stage",
    description:
      "Each session closes with a structured debrief from the facilitator — converting lab activity into actionable capability signals and concrete next steps for each learner.",
  },
];

export function MethodologySection() {
  return (
    <section id="methodology" className="section-frame relative overflow-hidden border-b border-border py-20 lg:py-24">
      <AnimatedGridPattern
        numSquares={25}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] opacity-50"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
