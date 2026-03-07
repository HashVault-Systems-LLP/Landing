import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ThreatSection } from "@/components/threat-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { MethodologySection } from "@/components/methodology-section";
import { PractitionersSection } from "@/components/practitioners-section";
import { WorkshopsSection } from "@/components/workshops-section";
import { StepsSection } from "@/components/steps-section";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NetworkSection } from "@/components/network-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ThreatSection />
        <PhilosophySection />
        <MethodologySection />
        <PractitionersSection />
        <WorkshopsSection />
        <StepsSection />
        <FaqSection />
        <TestimonialsSection />
        <NetworkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
