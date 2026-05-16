export interface NotificationServiceInfo {
  service: { name: string };
  professional: { name: string };
}

export interface NotificationAppointment {
  status: "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED";
  scheduledAt: string;
  services: NotificationServiceInfo[];
}

export interface UserNotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  appointment: NotificationAppointment | null;
}

export interface NotificationsResponse {
  message: string;
  notifications: UserNotification[];
  totalCount: number;
}
