import { FetchServicesResponse } from "@/src/app/interfaces";

export default async function fetchServices(
  page: number = 1,
  limit: number = 4,
  category?: string,
): Promise<FetchServicesResponse> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  // 1. Começamos com a URL base que você já usa
  let url = `${process.env.NEXT_PUBLIC_API_URL}/services/public/slug/${slug}?page=${page}&limit=${limit}`;

  // 2. Se houver uma categoria e ela não for "Todos", adicionamos o search param na URL
  if (category && category.toLowerCase() !== "todos") {
    url += `&category=${encodeURIComponent(category.toLowerCase())}`;
  }

  const res = await fetch(url, {
    method: "GET",
    next: { tags: ["services"] },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar serviços");
  }

  return await res.json();
}
