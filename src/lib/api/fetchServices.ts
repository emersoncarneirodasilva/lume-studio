import { FetchServicesResponse } from "@/src/app/interfaces";

export default async function fetchServices(
  page: number = 1,
  limit: number = 4,
): Promise<FetchServicesResponse> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/public/slug/${slug}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      next: { tags: ["services"] },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar serviços");
  }

  return await res.json();
}
