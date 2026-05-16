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

export interface ServiceOnProfessional {
  id: string;
  serviceId: string;
  professionalId: string;
  service: PublicService;
}
