import { ProfessionalAvailability } from "../app/interfaces";

export const daysMapFull: Record<number, string> = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

const daysMap: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

/* Transforma o array de disponibilidade em um texto formatado para o card. */
export function formatAvailability(data: ProfessionalAvailability[]): string {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return "Consulte horários";
  }

  // 1. Ordenação
  const sorted = [...data].sort(
    (a, b) => Number(a.weekday) - Number(b.weekday),
  );

  // 2. Extração de Dias
  const firstDay = daysMap[sorted[0].weekday];
  const lastDay = daysMap[sorted[sorted.length - 1].weekday];

  // 3. Cálculo de Amplitude (Lógica Profissional)
  const startT = sorted.reduce(
    (min, p) => (p.startTime < min ? p.startTime : min),
    sorted[0].startTime,
  );
  const endT = sorted.reduce(
    (max, p) => (p.endTime > max ? p.endTime : max),
    sorted[0].endTime,
  );

  // 4. Retorno formatado
  const timeRange = `${startT} — ${endT}`;

  return sorted.length > 1
    ? `${firstDay} a ${lastDay}, ${timeRange}`
    : `${firstDay}, ${timeRange}`;
}
