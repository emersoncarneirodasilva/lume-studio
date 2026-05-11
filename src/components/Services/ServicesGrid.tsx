"use client";

import Image from "next/image";
import Pagination from "../Pagination";
import { Service } from "./ServicesWrapper";

// 🔹 Parser da descrição
function parseServiceDescription(description: string) {
  const parts = description.split(" | ");

  const type = parts[0]?.replace("Tipo: ", "").trim() || "";

  const desc = parts[1]?.replace("Descrição: ", "").trim() || "";

  return { type, desc };
}

interface ServicesGridProps {
  activeCategory: string;
  services: Service[];
  totalPages: number;
  currentPage: number;
}

export default function ServicesGrid({
  activeCategory,
  services,
  totalPages,
  currentPage,
}: ServicesGridProps) {
  // 🔹 Apenas filtra (SEM paginar aqui)
  const filteredServices =
    activeCategory === "Todos"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services-menu"
      className="pb-40 px-6 md:px-12 bg-background transition-all"
    >
      <div className="container-lume">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32 lg:gap-y-40">
          {filteredServices.map((service, index) => {
            const isMiddleInFirstRow = index === 1;
            const isMiddleInSecondRow = index === 4;

            // 🔹 Aqui acontece o parse
            const { type, desc } = parseServiceDescription(service.desc);

            return (
              <div
                key={`${service.title}-${index}`}
                className={`group flex flex-col transition-all duration-1000 ease-in-out
                  ${isMiddleInFirstRow ? "lg:mt-12" : ""} 
                  ${isMiddleInSecondRow ? "lg:-mt-12" : ""}
                `}
              >
                <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-card-secondary shadow-sm">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-card-secondary flex items-center justify-center text-xs text-muted-foreground">
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-4 relative z-10 text-left">
                  <div className="flex justify-between items-baseline border-b border-card-border pb-3">
                    <h2 className="text-2xl md:text-3xl font-serif text-foreground tracking-tight">
                      {service.title}
                    </h2>
                    <span className="text-brand-gold-dark font-bold text-sm md:text-base">
                      {service.price}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
                      {service.time}{" "}
                      <span className="tracking-[0.2em]">
                        {type && `— ${type}`}
                      </span>
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {desc}
                    </p>

                    <div className="pt-2">
                      <span className="inline-block px-3 py-1 border border-card-border rounded-full text-[9px] font-bold tracking-widest text-muted-foreground uppercase transition-colors group-hover:border-brand-gold-dark group-hover:text-brand-gold-dark">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeCategory === "Todos" && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/servicos"
          />
        )}
      </div>
    </section>
  );
}
