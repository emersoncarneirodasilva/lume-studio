import { PaginatedAppointments } from "@/src/app/interfaces";

export default async function fetchAppointments(
  token: string,
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedAppointments> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/user/paginated?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["appointments"] },
  });

  if (!res.ok) {
    let errorMessage = "Erro ao buscar agendamentos.";
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
      // Se o backend retornar um HTML de erro (ex: 500), mantém a mensagem padrão
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
