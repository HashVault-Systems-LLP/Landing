const footerLinks = [
  { label: "Workshops", href: "#workshops" },
  { label: "Method", href: "#methodology" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="display-title text-2xl text-foreground">HashVault</p>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground/60">Systems LLP</p>
          <p className="mt-3 max-w-md text-xs leading-6 text-muted-foreground">
            Practitioner-led cybersecurity training for engineering colleges and corporate teams.
            Based in Bangalore, Karnataka, India.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
