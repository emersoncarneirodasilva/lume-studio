import { FetchServicesResponse } from "@/src/app/interfaces";

export async function fetchAllServices(): Promise<FetchServicesResponse> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/public/slug/${slug}?page=1&limit=100`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar serviços");
  }

  return await res.json();
}
