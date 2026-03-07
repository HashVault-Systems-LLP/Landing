"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "Who are these workshops designed for?",
    a: "Our programmes are built for two primary audiences: college students (CS, IT, ECE batches in their second year and above) and corporate technical teams who want structured security upskilling. Both tracks are hands-on by default — we adapt difficulty and scenario depth to the group.",
  },
  {
    q: "How many students can participate in a single batch?",
    a: "Batch sizes typically range from 50 to 100+ students for college programmes. For corporate engagements, smaller cohorts of 30–60 work best to maintain lab quality. If you have a larger intake, we can discuss multi-batch delivery across the same event window.",
  },
  {
    q: "Do students need prior cybersecurity knowledge?",
    a: "Not for our foundational tracks (HV-101, HV-210). Basic networking and Linux familiarity is helpful but not required. For the advanced cloud security module (HV-212), some prior technical exposure is recommended. We'll scope the right programme to your batch after a quick briefing.",
  },
  {
    q: "What does a typical workshop day look like?",
    a: "Sessions follow a 70/30 split — 70% hands-on labs and exercises, 30% conceptual framing and debrief. We avoid death-by-slide. Individuals spend most of their time inside live environments working through attacker scenarios, with structured checkpoints and feedback at each stage.",
  },
  {
    q: "Can you work within our institution's infrastructure, or do we need to set up labs?",
    a: "It depends on the programme. We'll let you know during scoping whether students need to bring their own devices — some tracks require it, others don't. For institutions that want a more structured setup, we offer our lab platform as an add-on service: a hosted environment that individuals can access during the workshop which improves the quality of the session significantly.",
  },
  {
    q: "How long does it take to get a proposal after we reach out?",
    a: "We turn around a scoped proposal within 24 hours of receiving your brief. The faster you can share batch size, department, available dates, and any specific topics, the more useful the first proposal will be.",
  },
  {
    q: "Do you offer multi-session engagements across a semester?",
    a: "Yes, and this is often the stronger option. A recurring cadence — two or three workshops per semester — compounds learning and gives students a consistent lab environment to build skills over time. We can structure a full-semester plan to fit your academic calendar.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-20 lg:py-28">
      <AnimatedGridPattern
        numSquares={15}
        maxOpacity={0.04}
        duration={6}
        width={44}
        height={44}
        className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] opacity-40"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <p className="section-kicker">Common questions</p>
        <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
          Everything you need to know before the briefing.
        </h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start justify-between gap-6 px-0 py-5 text-left transition-colors hover:text-primary"
                >
                  <span className="text-[0.95rem] leading-snug text-foreground group-hover:text-primary transition-colors">
                    {item.q}
                  </span>
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-300 group-hover:text-primary"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    aria-hidden="true"
                  >
                    <Plus size={16} weight="bold" />
                  </span>
                </button>

                {/* Animated height reveal */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "600px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="pb-6 text-sm leading-[1.9] text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
