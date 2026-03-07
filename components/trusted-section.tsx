const trustedNames = [
  "Engineering colleges",
  "Cybersecurity clubs",
  "Training & placement cells",
  "Corporate security teams",
];

export function TrustedSection() {
  return (
    <section className="section-frame border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="section-kicker">Who this fits</p>
        <div className="border mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {trustedNames.map((name) => (
            <div
              key={name}
              className="bg-card px-6 py-5 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
