export interface SlotProps {
  hora: string;
  isPastHour: boolean;
}

export interface DayDataProps {
  date: Date;
  weekdayIndex: number;
  dayName: string;
  dayDisplay: string;
  cleanDayName: string;
  isPastDay: boolean;
  isToday: boolean;
}

// 📌 Interface adicionada para a tipagem do select dinâmico
export interface SelectableMonthProps {
  monthIndex: number;
  year: number;
  label: string;
}

// Lista estática centralizada de meses
export const MONTH_NAMES = [
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

// 🧠 Nova Função: Gera a lista dinâmica dos próximos 12 meses a partir do mês atual
export const generateAvailableMonths = (now: Date): SelectableMonthProps[] => {
  const months: SelectableMonthProps[] = [];

  for (let i = 0; i < 12; i++) {
    // Adiciona "i" meses à data atual para calcular os meses futuros e viradas de ano
    const targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthIndex = targetDate.getMonth();
    const year = targetDate.getFullYear();

    months.push({
      monthIndex,
      year,
      // Retorna o formato elegante: "Maio 2026", "Janeiro 2027", etc.
      label: `${MONTH_NAMES[monthIndex]} ${year}`,
    });
  }

  return months;
};

// Traduz strings de horário em slots de hora em hora
export const generateSlots = (
  start: string,
  end: string,
  isToday: boolean,
  currentHour: number,
): SlotProps[] => {
  const slots: SlotProps[] = [];
  let current = parseInt(start.split(":")[0]);
  const last = parseInt(end.split(":")[0]);

  while (current < last) {
    const hora = `${current.toString().padStart(2, "0")}:00`;
    slots.push({
      hora,
      isPastHour: isToday && current <= currentHour,
    });
    current++;
  }
  return slots;
};

// Monta as informações de calendário para os 7 dias exibidos na tela
export const calculateWeekDays = (
  currentYear: number,
  currentMonth: number,
  weekOffset: number,
  now: Date,
): DayDataProps[] => {
  const baseDate = new Date(currentYear, currentMonth, 1);

  if (currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
    baseDate.setDate(now.getDate());
  }

  const startOfWeek = new Date(baseDate);
  const dayOfWeek = startOfWeek.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(baseDate.getDate() + diffToMonday + weekOffset * 7);

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });
    const dayDisplay = date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
      .replace(".", "");

    const cardStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    return {
      date,
      weekdayIndex: date.getDay(),
      dayName,
      dayDisplay,
      cleanDayName: dayName.split("-")[0],
      isPastDay: cardStart < todayStart,
      isToday: cardStart.getTime() === todayStart.getTime(),
    };
  });
};
