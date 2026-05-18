"use client";

import { useEffect, useState } from "react";
import {
  calculateWeekDays,
  generateSlots,
  generateAvailableMonths,
} from "@/src/utils/calendar";
import AnimateSpin from "../Spin/AnimateSpin";

interface AvailabilityBlock {
  id: string;
  professionalId: string;
  weekday: number;
  startTime: string;
  endTime: string;
}

interface StepDateTimeProps {
  professionalId: string;
  professionalName: string;
  token: string;
  onFinish: (day: string, hour: string) => void;
  onBack: () => void;
}

export default function StepDateTime({
  professionalId,
  professionalName,
  token,
  onFinish,
  onBack,
}: StepDateTimeProps) {
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    async function getAvailability() {
      if (!professionalId) {
        setBlocks([]);
        setError("Especialista não selecionado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const slug = process.env.NEXT_PUBLIC_SLUG;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl || !slug) {
          throw new Error("Configurações de API não encontradas.");
        }

        const res = await fetch(
          `${apiUrl}/availability/public/${slug}/${professionalId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) {
          if (res.status === 404) {
            setBlocks([]);
            return;
          }
          throw new Error("Erro ao buscar a agenda do especialista.");
        }

        setBlocks(await res.json());
      } catch (err: unknown) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os horários disponíveis.",
        );
      } finally {
        setLoading(false);
      }
    }

    getAvailability();
  }, [professionalId, token]);

  // 🧠 Gera a lista dinâmica dos próximos 12 meses (ex: "Maio 2026", "Janeiro 2027"...)
  const availableMonths = generateAvailableMonths(now);

  const weekDays = calculateWeekDays(
    currentYear,
    currentMonth,
    weekOffset,
    now,
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700 w-full">
      {/* Cabeçalho Lume Studio */}
      <header className="relative space-y-4 border-b border-card-border/60 pb-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
              Concierge Lume
            </span>
            <div className="h-px w-8 bg-brand-gold-dark/30" />
          </div>
          <button
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-brand-gold transition-colors font-bold flex items-center gap-2 group cursor-pointer"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Voltar
          </button>
        </div>
        <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
          Horários <span className="text-brand-gold-dark">Disponíveis.</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-xl">
          Agendamento exclusivo com{" "}
          <span className="text-foreground font-normal">
            {professionalName}
          </span>
          . Escolha o melhor momento para sua sessão.
        </p>
      </header>

      {/* Controles de Navegação de Data */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-card-border/30 pb-6">
        <div className="relative">
          <select
            // Controla o estado usando a combinação perfeita de mês e ano
            value={`${currentMonth}-${currentYear}`}
            onChange={(e) => {
              const [selectedMonth, selectedYear] = e.target.value
                .split("-")
                .map(Number);
              setCurrentMonth(selectedMonth);
              setCurrentYear(selectedYear);
              setWeekOffset(0); // Reseta a paginação de semanas ao trocar o mês
            }}
            className="appearance-none bg-card-secondary/40 border border-card-border/60 rounded-lg px-6 py-3 pr-12 text-[10px] uppercase tracking-[0.2em] text-foreground font-bold focus:outline-none focus:border-brand-gold-dark cursor-pointer shadow-sm transition-colors"
          >
            {/* Mapeia a lista inteligente contendo a virada de ano sem bugs */}
            {availableMonths.map((item) => (
              <option
                key={`${item.monthIndex}-${item.year}`}
                value={`${item.monthIndex}-${item.year}`}
                className="bg-card-primary text-foreground"
              >
                {item.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-gold-dark text-[9px]">
            ▼
          </div>
        </div>

        {/* Paginação de Semanas */}
        <div className="flex items-center bg-card-primary p-1 rounded-lg border border-card-border shadow-sm">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            disabled={weekOffset <= 0}
            className="px-3 py-1.5 hover:text-brand-gold disabled:opacity-10 cursor-pointer transition-colors text-xs font-bold"
          >
            ←
          </button>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-4 border-x border-card-border/50 text-muted-foreground">
            Mudar Semana
          </span>
          <button
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="px-3 py-1.5 hover:text-brand-gold cursor-pointer transition-colors text-xs font-bold"
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <AnimateSpin />
      ) : error ? (
        <div className="text-center py-20 border border-card-border rounded-xl">
          <p className="text-sm text-muted-foreground font-light">{error}</p>
        </div>
      ) : (
        /* Grid Semanal Panorâmico */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {weekDays.map((day, i) => {
            const dayBlocks = blocks.filter(
              (b) => b.weekday === day.weekdayIndex,
            );
            const isValidDay = dayBlocks.length > 0 && !day.isPastDay;

            return (
              <div
                key={i}
                className={`bg-card-primary border rounded-xl p-6 flex flex-col justify-between transition-all duration-500 ${
                  isValidDay
                    ? "border-card-border"
                    : "border-card-border/20 opacity-30 select-none pointer-events-none"
                }`}
              >
                <div className="mb-6 border-b border-card-border/40 pb-4">
                  <span className="block text-[10px] font-bold text-brand-gold-dark uppercase tracking-[0.2em] mb-1">
                    {day.cleanDayName}
                  </span>
                  <span className="text-2xl font-normal text-foreground tracking-tight uppercase">
                    {day.dayDisplay}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {isValidDay ? (
                    dayBlocks
                      .flatMap((b) =>
                        generateSlots(
                          b.startTime,
                          b.endTime,
                          day.isToday,
                          now.getHours(),
                        ),
                      )
                      .map(({ hora, isPastHour }) => (
                        <button
                          key={hora}
                          disabled={isPastHour}
                          onClick={() =>
                            onFinish(`${day.dayName}, ${day.dayDisplay}`, hora)
                          }
                          className="py-3 bg-background border border-card-border rounded-lg text-[11px] font-bold text-foreground hover:bg-brand-gold-dark hover:text-black hover:border-brand-gold-dark disabled:opacity-20 disabled:hover:bg-background disabled:hover:text-foreground disabled:hover:border-card-border disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-center"
                        >
                          {hora}
                        </button>
                      ))
                  ) : (
                    <span className="col-span-2 py-4 text-center text-[9px] uppercase tracking-widest text-muted-foreground/40 font-medium">
                      Indisponível
                    </span>
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
