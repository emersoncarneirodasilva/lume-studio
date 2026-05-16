import { ImageItem } from "@/src/app/interfaces";

export type ImagesByTypeResponse = Record<string, ImageItem[]>;

export default async function fetchImagesByType(
  type: string,
): Promise<ImagesByTypeResponse> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/images/${slug}/types?type=${encodeURIComponent(type)}`,
    {
      method: "GET",
      next: { tags: ["images"] },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar imagens.");
  }

  return res.json();
}
