"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "../Pagination";
import { HelpCircle } from "lucide-react";
import { Service } from "@/src/lib/api/fetchServices";

interface StepServiceProps {
  services: Service[];
  onSelect: (s: Service) => void;
}

export default function StepService({ services, onSelect }: StepServiceProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  const categories = [
    "Todos",
    ...Array.from(
      new Set(services.map((s) => s.category?.name).filter(Boolean)),
    ),
  ];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredServices = services.filter((service) =>
    selectedCategory === "Todos"
      ? true
      : service.category?.name === selectedCategory,
  );

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService,
  );

  const formatDuration = (min: number) => {
    const hours = Math.floor(min / 60);
    const remainingMinutes = min % 60;
    return hours > 0
      ? `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ""}`
      : `${min}min`;
  };

  // 🌟 Função para separar dinamicamente "Tipo" e "Descrição" vindos da API
  const parseServiceDescription = (
    rawDescription: string | null | undefined,
  ) => {
    if (!rawDescription) return { type: null, description: "" };

    if (rawDescription.includes("|")) {
      const parts = rawDescription.split("|");

      // Limpa os prefixos "Tipo:" e "Descrição:" ignorando maiúsculas/minúsculas
      const extractedType = parts[0].replace(/tipo:\s*/i, "").trim();
      const extractedDesc = parts[1].replace(/descrição:\s*/i, "").trim();

      return { type: extractedType, description: extractedDesc };
    }

    // Se não houver a barra '|', assume que o texto inteiro é a descrição
    return { type: null, description: rawDescription.trim() };
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 w-full">
      {/* Cabeçalho Lume Studio */}
      <header className="space-y-4 border-b border-card-border/60 pb-8">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
            Concierge Lume
          </span>
          <div className="h-px w-8 bg-brand-gold-dark/30" />
        </div>

        <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
          Nossos <span className="text-brand-gold-dark">Serviços.</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-lg">
          Explore nosso menu de experiências e escolha o procedimento desejado
          para o seu momento de cuidado.
        </p>
      </header>

      {/* Sub-Header de Seção e Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-card-border/30 pb-4">
        <h2 className="text-brand-gold-dark/90 uppercase text-[12px] font-bold tracking-wide">
          Menu de Procedimentos
        </h2>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] relative pb-1 transition-all cursor-pointer ${
                selectedCategory === category
                  ? "text-brand-gold-dark"
                  : "text-muted-foreground/40 hover:text-foreground"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold-dark" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Listagem Executiva */}
      <div className="divide-y divide-card-border/30">
        {currentServices.map((service) => {
          // Extraindo os dados processados pelo JS para cada item do map
          const { type, description } = parseServiceDescription(
            service.description,
          );

          return (
            <div
              key={service.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 hover:bg-card-secondary/20 transition-all duration-300 rounded-xl gap-4"
            >
              {/* Bloco de Imagem e Textos */}
              <div
                onClick={() => onSelect(service)}
                className="flex items-center gap-6 flex-1 min-w-0 cursor-pointer"
              >
                {/* Imagem Premium */}
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-card-primary border border-card-border/40 transition-all duration-500 group-hover:border-brand-gold-dark/40 shadow-sm">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-serif text-brand-gold-dark/30 uppercase tracking-widest">
                      Lume
                    </div>
                  )}
                </div>

                {/* Informações Textuais */}
                <div className="space-y-1 min-w-0 flex-1">
                  {/* Categoria + Tipo ao lado (se existir) */}
                  <div className="flex flex-wrap items-center gap-x-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-brand-gold-dark/70">
                      {service.category?.name || "Geral"}
                    </span>
                    {type && (
                      <>
                        <span className="text-muted-foreground/30 font-light">
                          |
                        </span>
                        <span className="text-muted-foreground/50 font-normal italic lowercase first-letter:uppercase">
                          {type}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Título do Serviço + Ícone com Tooltip Limpo */}
                  <div className="flex items-center gap-2 max-w-full">
                    <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-brand-gold-dark transition-colors duration-300 truncate">
                      {service.name}
                    </h3>

                    {/* Tooltip exibindo EXCLUSIVAMENTE a descrição limpa */}
                    {description && (
                      <div className="relative inline-block group/tooltip shrink-0">
                        <HelpCircle
                          size={14}
                          className="text-muted-foreground/40 hover:text-brand-gold-dark transition-colors cursor-help mt-0.5"
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-card-primary border border-brand-gold-dark/20 text-muted-foreground text-xs font-light rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-300 shadow-xl z-30 leading-relaxed italic text-center">
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-card-primary border-r border-b border-brand-gold-dark/20 rotate-45" />
                          {description}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Descrição limpa na tela com limite de 1 linha (...) */}
                  {description && (
                    <p className="text-xs text-muted-foreground/60 font-light line-clamp-1 italic max-w-3xl">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Duração, Preço e Ação */}
              <div className="flex items-center justify-between sm:justify-end gap-12 shrink-0">
                <div className="text-right hidden md:block">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 block">
                    Duração
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {formatDuration(service.duration)}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 block md:hidden">
                    Duração: {formatDuration(service.duration)}
                  </span>
                  <span className="text-lg md:text-xl font-serif text-brand-gold-dark tracking-tight">
                    {service.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <div
                  onClick={() => onSelect(service)}
                  className="w-9 h-9 rounded-full border border-card-border/60 flex items-center justify-center group-hover:border-brand-gold-dark group-hover:bg-brand-gold-dark group-hover:text-black text-muted-foreground transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <span className="text-base transform group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      <div
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          const button = target.closest("button");
          if (button) {
            const pageNumber = parseInt(button.innerText, 10);
            if (!isNaN(pageNumber)) {
              setCurrentPage(pageNumber);
            }
          }
        }}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath=""
        />
      </div>
    </div>
  );
}
