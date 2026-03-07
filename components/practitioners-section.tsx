import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const features = [
  {
    id: "Background 01",
    title: "CTF competition veterans",
    copy: "Our facilitators have competed in and won capture-the-flag competitions — the same challenge formats that form the backbone of our lab exercises.",
  },
  {
    id: "Background 02",
    title: "NULL Bangalore & Bi0s community",
    copy: "Active members of Bangalore's recognized security communities. These aren't credentials on paper — they are the rooms where real security practitioners meet.",
  },
  {
    id: "Background 03",
    title: "Industry analyst experience",
    copy: "Hands-on experience as security analysts in professional environments — which means the scenarios we build reflect how incidents actually unfold, not how textbooks describe them.",
  },
  {
    id: "Background 04",
    title: "College club leadership",
    copy: "Founded and led college cybersecurity clubs — we understand how students learn, what engages a room, and how to run a session that doesn't lose the back row.",
  },
];

export function PractitionersSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-28 lg:py-36">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)] opacity-40"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
              HashVault is built by practitioners who have run CTF competitions,
              worked as security analysts in industry, and led technical
              communities in Bangalore — not adapted from certification
              frameworks or generic training decks.
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
