import Image from "next/image";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

type Founder = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const founders: Founder[] = [
  {
    slug: "adithya",
    name: "Adithyakarthik M",
    role: "Founder & CEO",
    bio: "Security enthusiast focused on building softwares, communities. Creating platforms, challenges, and systems that make a real impact.",
    photo: "https://d24q3y6jxt.ufs.sh/f/wABoABEeZWc0Y3CFhliR2SQKfbL8GF6pcd9rqwayngBzDmZA",
  },
  {
    slug: "abhishek",
    name: "Abhishek M L",
    role: "Co-Founder & CTO",
    bio: "Breaking systems to understand them, securing them to improve them — focused on offensive security.",
    photo: "https://d24q3y6jxt.ufs.sh/f/wABoABEeZWc0XlfzfRdcp9vHL6c0KJOr7FQTlX41ZSjnmRzC",
  },
];

export function PractitionersSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-16 sm:py-20 lg:py-32">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_72%)] opacity-40"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-10 max-w-4xl sm:mb-14">
          <p className="section-kicker">Who leads the work</p>
          <h2 className="mt-4 text-2xl text-foreground sm:text-4xl lg:text-[2.75rem]">
            Built by practitioners, not by people designing{" "}
            <span className="text-muted-foreground">around the rubric.</span>
          </h2>
          <div className="mt-7 h-px w-12 bg-primary" />
        </div>

        {/* ── Founder cards ── */}
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {founders.map((founder) => (
            <article
              key={founder.slug}
              className="group relative flex flex-col bg-card transition-colors hover:bg-card/80"
            >
              {/* Top accent on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* ── Photo ── */}
              <div className="relative w-full border-b border-border" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* ── Text ── */}
              <div className="flex flex-1 flex-col px-7 py-7 sm:px-8 sm:py-8">
                <p className="text-base font-medium text-card-foreground sm:text-lg">
                  {founder.name}
                </p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {founder.role}
                </p>
                <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">
                  {founder.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
