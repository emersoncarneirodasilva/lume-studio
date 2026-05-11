import HeroSection from "@/src/components/Home/HeroSection";
import OwnerSection from "@/src/components/Home/OwnerSection";
import ServicesSection from "@/src/components/Home/ServicesSection";
import TestimonialsSection from "@/src/components/Home/TestimonialsSection";

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
