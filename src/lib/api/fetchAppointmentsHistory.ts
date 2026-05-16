import { PaginatedAppointmentsHistory } from "@/src/app/interfaces";

export default async function fetchAppointmentsHistory(
  token: string,
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedAppointmentsHistory> {
  const slug = process.env.NEXT_PUBLIC_SLUG;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = `${apiUrl}/appointment-history/${slug}?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["appointments-history"] },
  });

  if (!res.ok) {
    let errorMessage = "Erro ao buscar histórico de agendamentos.";
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
      // Fallback para caso o backend envie uma resposta HTML de erro
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
