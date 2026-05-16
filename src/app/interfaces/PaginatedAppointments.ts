export interface AppointmentService {
  id: string;
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
  professional: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}

export interface AppointmentPayment {
  id: string;
  appointmentId: string;
  amount: number;
  method: string;
  status: "PENDING" | "PAID" | "REFUNDED" | "PARTIALLY_PAID";
  createdAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  salonId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED";
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  services: AppointmentService[];
  payment: AppointmentPayment | null;
  notifications: unknown[];
}

export interface PaginatedAppointments {
  total: number;
  appointments: Appointment[];
}
