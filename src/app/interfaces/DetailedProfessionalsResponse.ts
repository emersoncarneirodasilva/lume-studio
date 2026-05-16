// 1. Tipagem individual do Horário de Disponibilidade
export interface ProfessionalAvailability {
  id: string;
  weekday: number; // 0 a 6
  startTime: string; // "09:00"
  endTime: string; // "18:00"
}

// 2. Tipagem individual do Serviço que o profissional realiza
export interface ProfessionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // em minutos
  imageUrl: string;
  categoryId: string;
  salonId: string;
  createdAt: string; // Vem como string do JSON (ISO Date)
  updatedAt: string;
}

// 3. Tipagem do Objeto do Profissional com tudo dentro
export interface DetailedProfessional {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  avatarUrl: string;
  availability: ProfessionalAvailability[]; // 🔹 Array de disponibilidades
  services: ProfessionalService[]; // 🔹 Array direto de serviços
}

// 4. Tipagem da Resposta Completa da API (O que o Fetch retorna)
export interface DetailedProfessionalsResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  professionals: DetailedProfessional[];
}
