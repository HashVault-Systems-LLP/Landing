import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const steps = [
  {
    title: "Discovery call",
    description: "We learn your student batch, department, skill baseline, dates, and what you want them to walk away able to do.",
  },
  {
    title: "Scoped proposal",
    description: "HashVault sends a 1–2 page proposal: workshop track, format, pricing, and what we need from your end to run it well.",
  },
  {
    title: "Workshop delivery",
    description: "We arrive 45 minutes early. 70% hands-on labs, 30% guided instruction. Feedback form collected at close.",
  },
  {
    title: "Follow-through",
    description: "You receive a resource pack, participant feedback summary, and a recommended path if you want to run a follow-up session.",
  },
];

export function StepsSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-20 lg:py-24">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.05}
        duration={4}
        width={44}
        height={44}
        className="[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-55"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
