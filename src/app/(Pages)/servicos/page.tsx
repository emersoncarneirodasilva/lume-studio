import { Suspense } from "react";
import { Metadata } from "next";
import ServicesWrapper from "@/src/components/Services/ServicesWrapper";
import fetchServices, {
  FetchServicesResponse,
} from "@/src/lib/api/fetchServices";

export const metadata: Metadata = {
  title: "Nossos Serviços | Lume Studio",
  description:
    "Sinta a luz do Lume Studio através de nossos serviços. Descubra tratamentos personalizados para realçar sua beleza natural.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const data: FetchServicesResponse = await fetchServices(page, 6);

  const services = data.services.map((service) => ({
    title: service.name,
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(service.price),
    time: `${service.duration} MIN`,
    category: service.category.name,
    image: service.imageUrl,
    desc: service.description,
  }));

  return (
    <main>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-40">
            <p className="text-brand-gold-dark text-[10px] uppercase tracking-[0.4em] animate-pulse">
              Preparando Menu de Experiências...
            </p>
          </div>
        }
      >
        <ServicesWrapper
          initialServices={services}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Suspense>
    </main>
  );
}
