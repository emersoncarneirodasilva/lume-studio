export interface NotificationServiceInfo {
  service: { name: string };
  professional: { name: string };
}

export interface NotificationAppointment {
  status: "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED";
  scheduledAt: string; // ISO date
  services: NotificationServiceInfo[];
}

export interface UserNotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  appointment: NotificationAppointment | null;
}

export function mapNotification(raw: any): UserNotification {
  let appointment: NotificationAppointment | null = null;

  if (raw.appointment) {
    appointment = {
      status: raw.appointment.status,
      scheduledAt: raw.appointment.scheduledAt,
      services:
        raw.appointment.services?.map((s: any) => ({
          service: { name: s.service?.name || "Desconhecido" },
          professional: { name: s.professional?.name || "Desconhecido" },
        })) || [],
    };
  } else if (raw.snapshot?.data) {
    const data = raw.snapshot.data;
    appointment = {
      status: data.afterStatus ?? data.beforeStatus,
      scheduledAt: data.afterScheduledAt ?? data.beforeScheduledAt,
      services:
        data.services?.map((s: any) => ({
          service: { name: s.serviceName || "Desconhecido" },
          professional: { name: s.professionalName || "Desconhecido" },
        })) || [],
    };
  }

  return {
    id: raw.id,
    message: raw.message,
    isRead: raw.isRead,
    createdAt: raw.createdAt,
    appointment,
  };
}
