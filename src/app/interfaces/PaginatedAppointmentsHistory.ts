export interface AppointmentServiceHistory {
  id: string;
  appointmentId: string;
  serviceId: string;
  professionalId: string;
  duration: number;
  price: number;
}

export interface AppointmentHistoryItem {
  id: string;
  originalId: string;
  userId: string | null;
  salonId: string;
  status: "COMPLETED" | "CANCELED";
  scheduledAt: string;
  movedAt: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  services: AppointmentServiceHistory[];
}

export interface PaginatedAppointmentsHistory {
  total: number;
  currentPage: number;
  totalPages: number;
  appointmentsHistory: AppointmentHistoryItem[];
}
