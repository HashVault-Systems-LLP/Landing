import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

export function NetworkSection() {
  return (
    <section className="section-frame relative overflow-hidden border-b border-border py-24 lg:py-28">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.05}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] opacity-55"
      />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="hash-panel p-8 sm:p-10 lg:p-12">

          <p className="section-kicker">Beyond a single workshop</p>
          <h2 className="mt-5 w-full text-3xl leading-[1.15] tracking-tight text-card-foreground sm:text-4xl lg:text-[2.6rem]">
            The real goal is a repeatable security talent pipeline{" "}
            <span className="text-muted-foreground">that institutions can build on.</span>
          </h2>
          <div className="mt-8 h-px w-12 bg-primary" />

          <p className="mt-6 text-sm leading-[1.85] text-muted-foreground">
            HashVault can support isolated events, but the stronger move is
            building a cadence: recurring labs each semester, sharper
            student capability signals, and a program identity that draws
            serious talent into your institution. We work with engineering
            colleges and corporate teams across Bangalore to make that happen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
