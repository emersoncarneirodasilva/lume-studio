"use client";

import { useEffect, useMemo, useState } from "react";
import ServicesHero from "./ServicesHero";
import ServicesGrid from "./ServicesGrid";
import ServicesCTA from "./ServicesCTA";
import { fetchAllServices } from "@/src/lib/api/fetchAllServices";
import { Service as ApiService } from "@/src/app/interfaces";

export interface Service {
  title: string;
  price: string;
  time: string;
  category: string;
  image: string;
  desc: string;
}

interface ServicesWrapperProps {
  initialServices: Service[];
  totalPages: number;
  currentPage: number;
}

export default function ServicesWrapper({
  initialServices,
  totalPages,
  currentPage,
}: ServicesWrapperProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [allServices, setAllServices] = useState<Service[] | null>(null);

  // 🔹 Buscar TODOS os serviços (uma única vez)
  useEffect(() => {
    fetchAllServices().then((data) => {
      const mapped: Service[] = data.services.map((service: ApiService) => ({
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

      setAllServices(mapped);
    });
  }, []);

  // 🔹 Categorias dinâmicas (corrigidas)
  const categories = useMemo(() => {
    const source = allServices || initialServices;

    const map = new Map<string, string>();

    source.forEach((s) => {
      const key = s.category.trim().toLowerCase();

      if (!map.has(key)) {
        map.set(key, s.category); // mantém original
      }
    });

    return ["Todos", ...Array.from(map.values())];
  }, [initialServices, allServices]);

  // 🔹 Decide quais serviços usar
  const servicesToUse =
    activeCategory === "Todos"
      ? initialServices
      : allServices?.filter(
          (s) =>
            s.category.trim().toLowerCase() === activeCategory.toLowerCase(),
        ) || [];

  return (
    <main>
      <ServicesHero
        currentFilter={activeCategory}
        onFilterChange={setActiveCategory}
        categories={categories}
      />

      <ServicesGrid
        activeCategory={activeCategory}
        services={servicesToUse}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      <ServicesCTA />
    </main>
  );
}
