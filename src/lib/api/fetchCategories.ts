import { FetchCategoriesResponse } from "@/src/app/interfaces";

export default async function fetchCategories(
  page: number = 1,
  limit: number = 100,
): Promise<FetchCategoriesResponse> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/public/slug/${slug}?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    next: { tags: ["categories"] },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return await res.json();
}
