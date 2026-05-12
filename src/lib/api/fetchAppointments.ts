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

export default async function fetchAppointments(
  token: string,
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedAppointments> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/user/paginated?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["appointments"] },
  });

  if (!res.ok) {
    let errorMessage = "Erro ao buscar agendamentos.";
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
      // Se o backend retornar um HTML de erro (ex: 500), mantém a mensagem padrão
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
