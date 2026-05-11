"use client";

import { useEffect, useState } from "react";

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
  onFinish: (day: string, hour: string) => void;
  onBack: () => void;
}

export default function StepDateTime({
  professionalId,
  professionalName,
  onFinish,
  onBack,
}: StepDateTimeProps) {
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date(2026, 3, 29);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));

      const response: AvailabilityBlock[] = [
        {
          id: "1",
          professionalId,
          weekday: 2,
          startTime: "09:00",
          endTime: "13:00",
        },
        {
          id: "2",
          professionalId,
          weekday: 2,
          startTime: "14:00",
          endTime: "17:00",
        },
        {
          id: "3",
          professionalId,
          weekday: 4,
          startTime: "11:00",
          endTime: "14:00",
        },
        {
          id: "4",
          professionalId,
          weekday: 4,
          startTime: "15:00",
          endTime: "20:00",
        },
        {
          id: "5",
          professionalId,
          weekday: 6,
          startTime: "08:00",
          endTime: "17:00",
        },
        {
          id: "6",
          professionalId,
          weekday: 0,
          startTime: "10:00",
          endTime: "14:00",
        },
      ];

      setBlocks(response);
      setLoading(false);
    }
    fetchAvailability();
  }, [professionalId, weekOffset, currentMonth]);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const generateSlots = (start: string, end: string) => {
    const slots = [];
    let current = parseInt(start.split(":")[0]);
    const last = parseInt(end.split(":")[0]);
    while (current < last) {
      slots.push(`${current.toString().padStart(2, "0")}:00`);
      current++;
    }
    return slots;
  };

  const renderWeek = () => {
    const baseDate = new Date(currentYear, currentMonth, 1);
    if (currentMonth === today.getMonth()) baseDate.setDate(today.getDate());

    const startOfWeek = new Date(baseDate);
    const dayOfWeek = startOfWeek.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(baseDate.getDate() + diffToMonday + weekOffset * 7);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const weekdayIndex = date.getDay();

      const dayBlocks = blocks.filter((b) => b.weekday === weekdayIndex);
      const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });
      const dayDisplay = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });

      return (
        <div
          key={i}
          className={`bg-card-primary border rounded-2xl shadow-sm p-8 transition-all duration-500 ${
            dayBlocks.length > 0
              ? "border-card-border"
              : "border-card-border/20 opacity-30 grayscale-[0.5]"
          }`}
        >
          <div className="mb-6 border-b border-card-border/50 pb-4">
            <span className="block text-[10px] font-bold text-brand-gold-dark uppercase tracking-widest mb-1">
              {dayName}
            </span>
            <span className="text-xl font-serif text-foreground italic">
              {dayDisplay}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dayBlocks.length > 0 ? (
              dayBlocks
                .flatMap((b) => generateSlots(b.startTime, b.endTime))
                .map((hora) => (
                  <button
                    key={hora}
                    onClick={() => onFinish(`${dayName}, ${dayDisplay}`, hora)}
                    className="py-3 bg-background border border-card-border rounded-xl text-[11px] font-bold text-foreground hover:bg-brand-gold-light/70 hover:text-white hover:dark:text-black hover:border-brand-gold-dark/60 transition-all duration-300 cursor-pointer"
                  >
                    {hora}
                  </button>
                ))
            ) : (
              <span className="col-span-2 py-4 text-center text-[9px] uppercase tracking-widest text-muted-foreground/50 italic">
                Indisponível
              </span>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* CABEÇALHO PADRONIZADO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-card-border pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
            Agenda
          </h2>
          <div className="flex items-center gap-2 pt-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold-dark font-bold">
              Com {professionalName}
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

      {/* CONTROLES DE NAVEGAÇÃO CENTRALIZADOS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
        <select
          value={currentMonth}
          onChange={(e) => {
            setCurrentMonth(Number(e.target.value));
            setWeekOffset(0);
          }}
          className="bg-card-primary border border-card-border rounded-xl shadow-sm px-6 py-4 text-[10px] uppercase tracking-widest text-foreground font-bold focus:outline-none focus:border-brand-gold cursor-pointer"
        >
          {monthNames.map((month, idx) => (
            <option
              key={month}
              value={idx}
              disabled={
                idx < today.getMonth() && currentYear <= today.getFullYear()
              }
            >
              {month}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 bg-card-primary p-1 rounded-xl border border-card-border shadow-sm">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            disabled={weekOffset <= 0}
            className="p-2 hover:text-brand-gold-light disabled:opacity-10 cursor-pointer transition-colors"
          >
            ←
          </button>
          <span className="text-[9px] font-bold uppercase tracking-widest px-4 border-x border-card-border/50">
            Semana
          </span>
          <button
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="p-2 hover:text-brand-gold-light cursor-pointer transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-brand-gold text-xs uppercase tracking-widest">
          Sincronizando disponibilidade...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderWeek()}
        </div>
      )}
    </div>
  );
}
