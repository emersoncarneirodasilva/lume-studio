export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

export function formatTime(dateString: string) {
  const cleanDateString = dateString.endsWith("Z")
    ? dateString.slice(0, -1)
    : dateString;
  const date = new Date(cleanDateString);

  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `Duração: ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return remMinutes > 0
    ? `Duração: ${hours}h ${remMinutes}min`
    : `Duração: ${hours}h`;
}
