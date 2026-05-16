import { DetailedProfessionalsResponse } from "@/src/app/interfaces";

export default async function fetchDetailedProfessionals(
  page: number = 1,
  limit: number = 4,
): Promise<DetailedProfessionalsResponse> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/professionals/slug/${slug}/detailed?page=${page}&limit=${limit}`,
    {
      method: "GET",
      next: { tags: ["detailed-professionals"] },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar profissionais detalhados");
  }

  // Aqui o TypeScript garante que o JSON mapeia perfeitamente com o que o backend enviou
  return (await res.json()) as DetailedProfessionalsResponse;
}
