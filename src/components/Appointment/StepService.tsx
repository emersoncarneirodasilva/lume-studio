"use client";

import { useState } from "react";
import { Service } from "./AppointmentWrapper";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Pagination from "../Pagination";

interface StepServiceProps {
  services: Service[];
  onSelect: (s: Service) => void;
}

export default function StepService({ services, onSelect }: StepServiceProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Lógica de Paginação
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const servicesPerPage = 4;

  const totalPages = Math.ceil(services.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService,
  );

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDuration = (min: number) => {
    const hours = Math.floor(min / 60);
    const remainingMinutes = min % 60;
    return hours > 0
      ? `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ""}`
      : `${min}min`;
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight tracking-tight">
          O que deseja realizar?
        </h2>
        <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.3em] pt-4 font-medium">
          Serviços exclusivos Lume Studio
        </p>
      </div>
      {/* ID para o scroll suave funcionar */}
      <div id="services-grid" className="grid grid-cols-1 gap-6 px-2 md:px-0">
        {currentServices.map((service) => {
          const isExpanded = expandedIds[service.id];

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className="group relative flex flex-col md:flex-row bg-card-primary border border-card-border rounded-xl overflow-hidden hover:border-brand-gold-dark transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/10 text-left active:scale-[0.99] cursor-pointer"
            >
              <div className="relative w-full md:w-64 h-52 md:h-auto shrink-0 overflow-hidden">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center font-serif text-brand-gold/20">
                    Lume
                  </div>
                )}

                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">
                    {formatDuration(service.duration)}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between min-w-0">
                <div className="space-y-3">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold-dark/80">
                    {service.category.name}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                    {service.name}
                  </h3>
                  {service.description && (
                    <div className="relative">
                      <p
                        className={`text-xs md:text-sm text-muted-foreground font-light leading-relaxed italic transition-all duration-500 ${isExpanded ? "line-clamp-none" : "line-clamp-2"}`}
                      >
                        {service.description}
                      </p>
                      <span
                        onClick={(e) => toggleExpand(e, service.id)}
                        className="inline-block mt-2 text-[10px] text-brand-gold font-bold uppercase tracking-widest hover:text-brand-gold-light transition-colors cursor-pointer"
                      >
                        {isExpanded
                          ? "− Ler menos"
                          : "+ Ler descrição completa"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-end justify-between pt-6 mt-6 border-t border-card-border/50">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                      Investimento
                    </span>
                    <span className="text-xl md:text-2xl font-serif text-brand-gold tracking-tighter">
                      {service.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold-dark opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    Selecionar <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1 bg-brand-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
            </button>
          );
        })}
      </div>
      {/* Componente de Paginação */}
      <Pagination totalPages={totalPages} currentPage={1} />{" "}
      {/* Depois corrigir */}
    </div>
  );
}
