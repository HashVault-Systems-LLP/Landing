import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { DitherText } from "@/components/dither-text";

const footerLinks = [
  { label: "Workshops", href: "#workshops" },
  { label: "Method", href: "#methodology" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border py-10 lg:py-12">

      {/* Animated grid — subtle, same as other sections */}
      <AnimatedGridPattern
        numSquares={15}
        maxOpacity={0.04}
        duration={6}
        width={44}
        height={44}
        className="[mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] opacity-40"
      />

      {/* Full-width dithered HASHVAULT background text — Bayer cross pattern */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 opacity-[0.18]"
        style={{ height: "140%" }}
        aria-hidden="true"
      >
        <DitherText
          text="HASHVAULT"
          fitWidth
          pixelScale={0.3}
          fontScale={0.55}
          colorRgb={[160, 100, 240]}
          density={0.58}
          gradientMode="flat"
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="display-title text-2xl text-foreground">HashVault</p>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground/60">Systems LLP</p>
          <p className="mt-3 max-w-md text-xs leading-6 text-muted-foreground">
            Practitioner-led cybersecurity training for engineering colleges and corporate teams.
            Based in Bangalore, Karnataka, India.
          </p>
          <p className="mt-3 text-[0.66rem] text-muted-foreground/50">
            &copy; {new Date().getFullYear()} HashVault Systems LLP. All rights reserved.
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
