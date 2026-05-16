export interface ServiceCategory {
  name: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  salonId: string;
  category: ServiceCategory;
}

export interface FetchServicesResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  services: Service[];
}
