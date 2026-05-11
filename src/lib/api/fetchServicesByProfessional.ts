// 1. O objeto interno 'service'
export interface PublicService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  categoryId: string;
  salonId: string;
  createdAt: string;
  updatedAt: string;
}

// 2. O objeto que a API retorna na lista (a relação)
export interface ServiceOnProfessional {
  id: string;
  serviceId: string;
  professionalId: string;
  service: PublicService;
}

// 3. A função de busca atualizada
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
