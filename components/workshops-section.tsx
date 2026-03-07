import { Badge } from "@/components/ui/badge";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

const workshopsData = [
  {
    id: "HV-101",
    name: "CyberFoundations",
    difficulty: "Core",
    difficultyClass: "border-primary/30 bg-primary/10 text-primary",
    duration: "1 day",
    stack: "Intro to security, tools, career paths — ideal for CS/IT batch of 50–100",
  },
  {
    id: "HV-220",
    name: "Ethical Hacking Bootcamp",
    difficulty: "Applied",
    difficultyClass: "border-secondary/40 bg-secondary/20 text-secondary",
    duration: "2–3 days",
    stack: "CTF challenges, offensive workflows, real-world scenarios — batch of 50–80",
  },
  {
    id: "HV-340",
    name: "Web Application Security",
    difficulty: "Applied",
    difficultyClass: "border-primary/30 bg-primary/10 text-primary",
    duration: "1–2 days",
    stack: "OWASP Top 10, Burp Suite, practical labs — web dev + CS students",
  },
  {
    id: "HV-420",
    name: "Cloud Security Essentials",
    difficulty: "Advanced",
    difficultyClass: "border-destructive/30 bg-destructive/10 text-destructive",
    duration: "1 day",
    stack: "AWS/Azure security, misconfiguration exploitation — batch of 30–60",
  },
  {
    id: "HV-500",
    name: "Custom Corporate Module",
    difficulty: "Tailored",
    difficultyClass: "border-secondary/40 bg-secondary/20 text-secondary",
    duration: "As scoped",
    stack: "Tailored to client needs — red team, secure dev, incident response, cloud sec",
  },
];

export function WorkshopsSection() {
  return (
    <section id="workshops" className="section-frame relative overflow-hidden border-b border-border py-20 lg:py-24">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] opacity-50"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Workshop catalogue</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">Programs that feel current, not ceremonial.</h2>
          </div>
        </div>

        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-accent/55 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                {['Track', 'Workshop', 'Level', 'Duration', 'Coverage'].map((heading) => (
                  <th key={heading} className="px-4 py-4 font-medium sm:px-6">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card/80">
              {workshopsData.map((row) => (
                <tr key={row.id} className="align-top transition-colors hover:bg-accent/30">
                  <td className="px-4 py-5 text-muted-foreground sm:px-6">{row.id}</td>
                  <td className="px-4 py-5 text-card-foreground sm:px-6">{row.name}</td>
                  <td className="px-4 py-5 sm:px-6">
                    <Badge variant="outline" className={`${row.difficultyClass} border`}>
                      {row.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-5 text-card-foreground sm:px-6">{row.duration}</td>
                  <td className="px-4 py-5 text-muted-foreground sm:px-6">{row.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
