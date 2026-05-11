import AboutCTA from "@/src/components/About/AboutCTA";
import AboutFounder from "@/src/components/About/AboutFounder";
import AboutHero from "@/src/components/About/AboutHero";
import AboutPhilosophy from "@/src/components/About/AboutPhilosophy";
import AboutRitual from "@/src/components/About/AboutRitual";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutPhilosophy />
      <AboutRitual />
      <AboutFounder />
      <AboutCTA />
    </main>
  );
}
