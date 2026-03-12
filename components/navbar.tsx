"use client";

import { useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Workshops", href: "/#workshops" },
  { label: "Method", href: "/#methodology" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
        <a href="/" className="flex min-w-0 items-center gap-3 text-sm uppercase tracking-[0.22em] text-foreground">
          <span className="inline-flex h-2.5 w-2.5 shrink-0 bg-primary" />
          <span className="display-title truncate text-base normal-case tracking-[-0.04em] sm:text-lg">
            HashVault Systems
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<a href={link.href} />}
              className="border border-transparent px-4 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground hover:border-border hover:bg-accent/50 hover:text-foreground"
            >
              {link.label}
            </Button>
          ))}
          <Button
            size="sm"
            nativeButton={false}
            render={<a href="/#contact" />}
            className="ml-2 border border-primary bg-primary px-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
          >
            Book briefing
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="border border-border md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon size={18} /> : <ListIcon size={18} />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 sm:px-6 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<a href={link.href} />}
                className="h-10 justify-start border border-transparent px-0 text-[0.8rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Button>
            ))}
            <Button
              size="sm"
              nativeButton={false}
              render={<a href="/#contact" />}
              className="mt-2 h-10 justify-center border border-primary bg-primary text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Book briefing
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
