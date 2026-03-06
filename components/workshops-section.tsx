import { Badge } from "@/components/ui/badge";

const workshopsData = [
  {
    id: "HV-101",
    name: "Foundations of ethical hacking",
    difficulty: "Core",
    difficultyClass: "border-primary/30 bg-primary/10 text-primary",
    duration: "3 hours",
    stack: "Recon, enumeration, exploitation",
  },
  {
    id: "HV-220",
    name: "Web application attack and defense",
    difficulty: "Applied",
    difficultyClass: "border-secondary/40 bg-secondary/20 text-secondary",
    duration: "1 day",
    stack: "OWASP flows, validation, remediation",
  },
  {
    id: "HV-340",
    name: "Incident response command room",
    difficulty: "Advanced",
    difficultyClass: "border-primary/30 bg-primary/10 text-primary",
    duration: "1 day",
    stack: "Triage, evidence, reporting",
  },
  {
    id: "HV-420",
    name: "Cloud breach simulation",
    difficulty: "Intensive",
    difficultyClass: "border-destructive/30 bg-destructive/10 text-destructive",
    duration: "2 days",
    stack: "IAM, misconfigurations, containment",
  },
];

export function WorkshopsSection() {
  return (
    <section id="workshops" className="section-frame border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Workshop catalogue</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">Programs that feel current, not ceremonial.</h2>
          </div>
        </div>

        <div className="overflow-hidden border border-border">
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
