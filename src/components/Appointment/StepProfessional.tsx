"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import fetchProfessionalsOnService, {
  ProfessionalOnService,
} from "@/src/lib/api/fetchProfessionalsOnService";
import { Professional } from "./AppointmentWrapper";
import { parseBio } from "@/src/utils/parseBio";
import AnimateSpin from "../Spin/AnimateSpin";
interface StepProfessionalProps {
  serviceId: string;
  token: string;
  onSelect: (p: Professional) => void;
  onBack: () => void;
}

export default function StepProfessional({
  serviceId,
  token,
  onSelect,
  onBack,
}: StepProfessionalProps) {
  const [professionals, setProfessionals] = useState<ProfessionalOnService[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProfessionals() {
      if (!serviceId) return;
      try {
        setLoading(true);
        setError(null);
        if (!token) throw new Error("Sessão inválida.");
        const data = await fetchProfessionalsOnService(token, serviceId);
        setProfessionals(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao carregar especialistas.");
        }
      } finally {
        setLoading(false);
      }
    }
    getProfessionals();
  }, [serviceId, token]);

  if (loading) {
    return <AnimateSpin />;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 w-full">
      {/* Cabeçalho Padronizado Lume Studio */}
      <header className="relative space-y-4 border-b border-card-border/60 pb-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
              Equipe Lume
            </span>
            <div className="h-px w-8 bg-brand-gold-dark/30" />
          </div>

          <button
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-brand-gold transition-colors font-bold flex items-center gap-2 group cursor-pointer"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Voltar
          </button>
        </div>

        <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
          Nossos <span className="text-brand-gold-dark">Especialistas.</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-lg">
          Selecione o profissional ideal para realizar seu atendimento com a
          excelência que você merece.
        </p>
      </header>

      {error ? (
        <div className="text-center py-20 border border-card-border rounded-xl">
          <p className="text-sm text-muted-foreground font-light">{error}</p>
        </div>
      ) : (
        /* Grid de Cards - Estilo Editorial Profissional */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {professionals.map((item) => {
            const pro = item.professional;
            const { especialidade, descricao } = parseBio(pro.bio);

            return (
              <div
                key={item.id}
                onClick={() => onSelect(pro)}
                className="group cursor-pointer flex flex-col space-y-4"
              >
                {/* Imagem Editorial Retangular (Aspect 4/5) */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-card-primary border border-card-border/50 transition-all duration-500 group-hover:border-brand-gold-dark/40 shadow-sm">
                  {pro.avatarUrl ? (
                    <Image
                      src={pro.avatarUrl}
                      alt={pro.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-gold-dark/20 text-[10px] tracking-widest uppercase">
                      Lume Studio
                    </div>
                  )}

                  {/* Overlay de Seleção Premium */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white text-[10px] uppercase tracking-[0.4em] border border-white/40 px-6 py-3 bg-black/20">
                      Selecionar
                    </span>
                  </div>
                </div>

                {/* Info Textual Limpa */}
                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-foreground tracking-tight group-hover:text-brand-gold-dark transition-colors duration-300">
                      {pro.name}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold-dark block pb-2">
                    {especialidade}
                  </span>

                  {descricao && (
                    <p className="text-xs text-muted-foreground/70 font-light leading-relaxed line-clamp-3 pt-3 border-t border-card-border/30 italic">
                      "{descricao}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
