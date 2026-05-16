export interface ProfessionalData {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string | null;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  salonId: string;
}

export interface ProfessionalOnService {
  id: string;
  serviceId: string;
  professionalId: string;
  professional: ProfessionalData;
}
