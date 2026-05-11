import { Suspense } from "react";
import AppointmentWrapper from "@/src/components/Appointment/AppointmentWrapper";

export default async function AppointmentPage() {
  /**
   * FETCH 1: Lista Geral de Serviços
   * No futuro, aqui será: const services = await getServices();
   * O Mock abaixo segue fielmente o seu JSON de "todos os serviços".
   */
  const servicesData = [
    {
      id: "031f1652-004c-436e-b2b7-defc9d116c0d",
      name: "Micropigmentação de Sobrancelhas (Fio a Fio)",
      description:
        "Técnica de micropigmentação para criar um design de sobrancelhas natural e definido.",
      price: 350,
      duration: 120,
      imageUrl:
        "https://nqdetcswaetixpxjkdrp.supabase.co/storage/v1/object/public/beautime-images/1760013987479-Micropigmentacao.jpg",
      category: { name: "Micropigmentação" },
    },
    {
      id: "08e81504-2b98-4342-9d1f-ef47377f4e8c",
      name: "Corte Feminino Moderno (Curto)",
      description:
        "Corte de cabelo feminino curto com as últimas tendências e finalização estilizada.",
      price: 70,
      duration: 50,
      imageUrl:
        "https://images.pexels.com/photos/8468132/pexels-photo-8468132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: { name: "Cortes de Cabelo" },
    },
    {
      id: "0fef82cf-a97c-400c-9aa6-49b3d4eac6b3",
      name: "Maquiagem de Renda",
      description:
        "Realce sua beleza com a nossa maquiagem social de renda, perfeita para qualquer evento.",
      price: 110,
      duration: 60,
      imageUrl: null,
      category: { name: "Maquiagem" },
    },
    {
      id: "45946407-24e6-4495-9946-37f386139e05",
      name: "Spa para Mãos e Pés",
      description:
        "Mime-se com o nosso Spa para Mãos e Pés, uma experiência luxuosa de relaxamento e cuidado.",
      price: 95.5,
      duration: 90,
      imageUrl: null,
      category: { name: "Pedicure e Manicure" },
    },
  ];

  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <section className="pt-32 md:pt-40 pb-32 px-6 md:px-12 relative isolate">
        <div className="container mx-auto max-w-5xl min-h-[60vh] flex flex-col justify-start">
          {/* Agora o Wrapper recebe apenas os serviços iniciais.
            Os profissionais e a disponibilidade serão buscados dentro dos 
            próximos Steps com base nas escolhas do usuário.
          */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <p className="text-brand-gold-dark text-[10px] uppercase tracking-[0.4em] animate-pulse">
                  Carregando Concierge Lume...
                </p>
              </div>
            }
          >
            <AppointmentWrapper initialServices={servicesData} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
