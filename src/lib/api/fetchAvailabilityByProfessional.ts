export interface Availability {
  id: string;
  professionalId: string;
  weekday: number;
  startTime: string;
  endTime: string;
}

export default async function fetchAvailabilityByProfessional(
  professionalId: string,
): Promise<Availability[]> {
  const slug = process.env.NEXT_PUBLIC_SLUG;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl || !slug) {
    throw new Error("Configurações de API não encontradas.");
  }

  // Ajuste a rota de acordo com o seu back-end (ex: /availabilities/public/...)
  const res = await fetch(
    `${apiUrl}/availability/public/${slug}/${professionalId}`,
    {
      method: "GET",
      next: { tags: ["availability"] },
    },
  );

  if (!res.ok) {
    // Se não encontrar disponibilidade, retornamos um array vazio em vez de estourar erro
    if (res.status === 404) return [];
    throw new Error("Erro ao buscar disponibilidade.");
  }

  return res.json();
}
