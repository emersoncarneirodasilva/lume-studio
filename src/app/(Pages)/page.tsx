import { Metadata } from "next";
import HeroSection from "@/src/components/Home/HeroSection";
import OwnerSection from "@/src/components/Home/OwnerSection";
import ServicesSection from "@/src/components/Home/ServicesSection";
import TestimonialsSection from "@/src/components/Home/TestimonialsSection";

export const metadata: Metadata = {
  title: "Lume Studio | Sua Experiência de Beleza e Bem-Estar",
  description:
    "Descubra um novo conceito de cuidado e sofisticação. Agende seus serviços exclusivos no Lume Studio e desfrute de uma experiência única de beleza.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <OwnerSection />
      <TestimonialsSection />
    </main>
  );
}
