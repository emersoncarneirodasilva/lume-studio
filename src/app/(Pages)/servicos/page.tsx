import { Suspense } from "react";
import { Metadata } from "next";
import {
  FetchServicesResponse,
  FetchCategoriesResponse,
} from "../../interfaces";
import ServicesWrapper from "@/src/components/Services/ServicesWrapper";
import fetchServices from "@/src/lib/api/fetchServices";
import fetchCategories from "@/src/lib/api/fetchCategories"; // 🔹 Importado o novo fetch

export const metadata: Metadata = {
  title: "Nossos Serviços | Lume Studio",
  description:
    "Sinta a luz do Lume Studio através de nossos serviços. Descubra tratamentos personalizados para realçar sua beleza natural.",
};

export const revalidate = 0;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const currentCategory = params?.category || "Todos";

  // 🔹 Dispara os dois fetches em paralelo! Desempenho máximo.
  const [servicesData, categoriesData]: [
    FetchServicesResponse,
    FetchCategoriesResponse,
  ] = await Promise.all([
    fetchServices(page, 6, currentCategory),
    fetchCategories(1, 100), // Traz até 100 categorias de uma vez para o filtro
  ]);

  // 🔹 Mapeia os serviços vindos do banco
  const services = servicesData.services.map((service) => ({
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

  // 🔹 Monta a lista de categorias dinâmica injetando "Todos" no início
  const categoriesList = [
    "Todos",
    ...categoriesData.categories.map((cat) => cat.name),
  ];

  return (
    <main>
      <Suspense
        key={`${page}-${currentCategory}`}
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
          totalPages={servicesData.totalPages}
          currentPage={servicesData.currentPage}
          activeCategory={currentCategory}
          serverCategories={categoriesList}
        />
      </Suspense>
    </main>
  );
}
