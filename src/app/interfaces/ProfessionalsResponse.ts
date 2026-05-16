export interface Professional {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

export interface ProfessionalsResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  professionals: Professional[];
}
