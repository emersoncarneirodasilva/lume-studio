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

interface RawNotificationService {
  service?: { name?: string };
  professional?: { name?: string };
}

interface RawNotificationAppointment {
  status: NotificationAppointment["status"];
  scheduledAt: string;
  services?: RawNotificationService[];
}

interface RawNotificationSnapshotService {
  serviceName?: string;
  professionalName?: string;
}

interface RawNotificationSnapshotData {
  afterStatus?: NotificationAppointment["status"];
  beforeStatus?: NotificationAppointment["status"];
  afterScheduledAt?: string;
  beforeScheduledAt?: string;
  services?: RawNotificationSnapshotService[];
}

interface RawNotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  appointment?: RawNotificationAppointment;
  snapshot?: {
    data?: RawNotificationSnapshotData;
  };
}

export function mapNotification(raw: RawNotification): UserNotification {
  let appointment: NotificationAppointment | null = null;

  if (raw.appointment) {
    appointment = {
      status: raw.appointment.status,
      scheduledAt: raw.appointment.scheduledAt,
      services:
        raw.appointment.services?.map((s: RawNotificationService) => ({
          service: { name: s.service?.name || "Desconhecido" },
          professional: { name: s.professional?.name || "Desconhecido" },
        })) || [],
    };
  } else if (raw.snapshot?.data) {
    const data = raw.snapshot.data;
    appointment = {
      status: data.afterStatus ?? data.beforeStatus ?? "PENDING",
      scheduledAt: data.afterScheduledAt ?? data.beforeScheduledAt ?? "",
      services:
        data.services?.map((s: RawNotificationSnapshotService) => ({
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
