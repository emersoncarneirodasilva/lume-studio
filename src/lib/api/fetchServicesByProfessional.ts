import { PublicService, ServiceOnProfessional } from "@/src/app/interfaces";

export default async function fetchServicesByProfessional(
  professionalId: string,
): Promise<PublicService[]> {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  if (!process.env.NEXT_PUBLIC_API_URL || !slug) {
    throw new Error("Configurações de API não encontradas.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services-on-professionals/public/${slug}/${professionalId}`,
    {
      method: "GET",
      next: { tags: ["services"] },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar serviços.");
  }

  // Tipamos a resposta como um array da interface de relação
  const data: ServiceOnProfessional[] = await res.json();

  // Retornamos apenas o conteúdo de 'service', mantendo a tipagem PublicService
  return data.map((item) => ({
    id: item.service.id,
    name: item.service.name,
    description: item.service.description,
    price: item.service.price,
    duration: item.service.duration,
    imageUrl: item.service.imageUrl,
    categoryId: item.service.categoryId,
    salonId: item.service.salonId,
    createdAt: item.service.createdAt,
    updatedAt: item.service.updatedAt,
  }));
}
