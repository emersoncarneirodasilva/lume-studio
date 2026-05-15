import { Metadata } from "next";
import AboutCTA from "@/src/components/About/AboutCTA";
import AboutFounder from "@/src/components/About/AboutFounder";
import AboutHero from "@/src/components/About/AboutHero";
import AboutPhilosophy from "@/src/components/About/AboutPhilosophy";
import AboutRitual from "@/src/components/About/AboutRitual";

export const metadata: Metadata = {
  title: "Nossa História | Lume Studio",
  description:
    "Conheça o conceito por trás do Lume Studio. Nossa missão é iluminar sua essência através de cuidados exclusivos e uma experiência de bem-estar inigualável.",
};

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
