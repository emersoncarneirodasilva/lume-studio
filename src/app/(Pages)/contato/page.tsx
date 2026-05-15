import { Metadata } from "next";
import ContactForm from "@/src/components/Contact/ContactForm";
import ContactHero from "@/src/components/Contact/ContactHero";
import ContactSidebar from "@/src/components/Contact/ContactSidebar";

export const metadata: Metadata = {
  title: "Fale Conosco | Lume Studio",
  description:
    "Encontre nossos canais de atendimento, localização e horários. Fale com a equipe do Lume Studio e reserve seu momento de cuidado.",
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <ContactHero />

      <section className="pb-32 px-6 md:px-12 relative isolate">
        <div className="container-lume">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 items-stretch">
            <ContactForm />
            <ContactSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
