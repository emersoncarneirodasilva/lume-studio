export interface Professional {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

export interface ProfessionalsResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  professionals: Professional[];
}

export default async function fetchProfessionals(
  page: number = 1,
  limit: number = 4,
) {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/professionals/slug/${slug}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      next: { tags: ["professionals"] },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar profissionais");
  }

  return await res.json();
}
