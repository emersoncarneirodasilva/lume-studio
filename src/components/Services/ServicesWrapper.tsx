"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ServicesHero from "./ServicesHero";
import ServicesGrid from "./ServicesGrid";
import ServicesCTA from "./ServicesCTA";
import AnimateSpin from "../Spin/AnimateSpin";

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
  activeCategory: string;
  serverCategories: string[];
}

export default function ServicesWrapper({
  initialServices,
  totalPages,
  currentPage,
  activeCategory,
  serverCategories,
}: ServicesWrapperProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("page", "1");

      if (category.toLowerCase() !== "todos") {
        params.set("category", category.toLowerCase());
      }

      router.push(`/servicos?${params.toString()}`);
    });
  };

  return (
    <main className="relative min-h-screen">
      {/* 🔹 Camada de Loading fixa na tela inteira (Full Screen Overlay) */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-in fade-in duration-300">
          <AnimateSpin />
        </div>
      )}

      <ServicesHero
        currentFilter={activeCategory}
        onFilterChange={handleFilterChange}
        categories={serverCategories}
      />

      {/* Conteúdo com opacidade reduzida enquanto carrega de forma suave */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isPending
            ? "opacity-30 pointer-events-none blur-[2px]"
            : "opacity-100"
        }`}
      >
        <ServicesGrid
          activeCategory={activeCategory}
          services={initialServices}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>

      <ServicesCTA />
    </main>
  );
}
