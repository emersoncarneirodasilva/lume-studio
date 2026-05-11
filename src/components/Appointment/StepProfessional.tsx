"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Professional } from "./AppointmentWrapper";

interface StepProfessionalProps {
  serviceId: string;
  onSelect: (p: Professional) => void;
  onBack: () => void;
}

export default function StepProfessional({
  serviceId,
  onSelect,
  onBack,
}: StepProfessionalProps) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfessionals() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockDatabase: Record<string, Professional[]> = {
        "031f1652-004c-436e-b2b7-defc9d116c0d": [
          {
            id: "p1",
            name: "Julia Thorne",
            bio: "Especialista: Diretora Criativa & Colorista | Bio: Focada em visagismo e transformações de alto padrão para realçar sua identidade única.",
            avatarUrl:
              "https://images.unsplash.com/photo-1594744803329-e58b31de21e4?q=80&w=1887&auto=format&fit=crop",
          },
        ],
        "08e81504-2b98-4342-9d1f-ef47377f4e8c": [
          {
            id: "p2",
            name: "Ricardo Alves",
            bio: "Especialista: Master Hairstylist | Bio: Especialista em cortes modernos e arquitetura capilar com técnicas internacionais.",
            avatarUrl:
              "https://nqdetcswaetixpxjkdrp.supabase.co/storage/v1/object/public/beautime-images/1760233015999-Ricardo_Alves_Costa__Avatar_.png",
          },
        ],
      };

      setProfessionals(mockDatabase[serviceId] || []);
      setLoading(false);
    }
    fetchProfessionals();
  }, [serviceId]);

  const parseBio = (text: string) => {
    if (!text) return { especialidade: "Especialista", descricao: "" };
    const parts = text.split("|");
    return {
      especialidade:
        parts[0]?.replace("Especialista:", "").trim() || "Especialista",
      descricao: parts[1]?.replace("Bio:", "").trim() || text,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-card-border pb-8 mb-12">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
            Especialistas
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm font-light italic">
            Selecione o profissional ideal para realizar seu serviço
          </p>
          <div className="flex items-center gap-2 pt-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold-dark font-bold">
              Lume Selection
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-6 md:mt-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-brand-gold font-bold transition-all duration-300 flex items-center gap-2 group cursor-pointer"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {professionals.map((pro) => {
          const { especialidade, descricao } = parseBio(pro.bio);
          return (
            <button
              key={pro.id}
              onClick={() => onSelect(pro)}
              className="group relative aspect-3/4 overflow-hidden rounded-2xl bg-card-primary transition-all duration-700 hover:shadow-2xl hover:shadow-brand-gold/10 border border-card-border cursor-pointer"
            >
              {pro.avatarUrl && (
                <Image
                  src={pro.avatarUrl}
                  alt={pro.name}
                  fill
                  className="object-cover 
                              grayscale 
                              brightness-90
                              group-hover:grayscale-0 
                              group-hover:brightness-110 
                              transition-all 
                              duration-1000 
                              ease-in-out 
                              group-hover:scale-110 
                              will-change-filter
                            "
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              )}

              {/* Overlay Gradiente (Fica acima da imagem) */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />

              {/* Conteúdo Textual (Z-index superior automático) */}
              <div className="absolute bottom-0 left-0 p-8 text-left w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold-dark mb-2 block">
                  {especialidade}
                </span>

                <h3 className="text-3xl  text-white leading-tight">
                  {pro.name}
                </h3>

                {/* Bio que expande no Hover */}
                <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                  <p className="text-xs text-white/70 mt-4 line-clamp-3 font-light leading-relaxed italic">
                    "{descricao}"
                  </p>
                </div>

                {/* Barra decorativa animada */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-8 bg-brand-gold transition-all duration-500 group-hover:w-full opacity-60" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Selecionar
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
