import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export function NetworkSection() {
  return (
    <section className="section-frame border-b border-border py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="hash-panel p-8 sm:p-10 lg:p-12">

          <p className="section-kicker">Beyond a single workshop</p>
          <h2 className="mt-5 w-full text-3xl leading-[1.15] tracking-tight text-card-foreground sm:text-4xl lg:text-[2.6rem]">
            The real goal is a repeatable security talent pipeline{" "}
            <span className="text-muted-foreground">that leadership can trust.</span>
          </h2>
          <div className="mt-8 h-px w-12 bg-primary" />

          <p className="mt-6 text-sm leading-[1.85] text-muted-foreground">
            HashVault can support isolated events, but the stronger move is
            building a cadence: recurring labs, sharper student signals, and
            a program identity that attracts serious talent.
          </p>

          <div className="mt-8 flex flex-row items-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#contact" />}
              className="h-11 border border-primary bg-primary px-6 text-[0.76rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
            >
              Plan a pilot
              <ArrowRight weight="bold" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<a href="#methodology" />}
              className="h-11 border border-border bg-transparent px-6 text-[0.76rem] uppercase tracking-[0.18em] text-card-foreground hover:bg-accent/40"
            >
              See the method
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
