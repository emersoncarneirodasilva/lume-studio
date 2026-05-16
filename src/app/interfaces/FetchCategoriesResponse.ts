export interface ApiCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  salonId: string;
}

export interface FetchCategoriesResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  categories: ApiCategory[];
}
