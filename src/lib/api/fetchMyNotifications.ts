import { NotificationsResponse } from "@/src/app/interfaces";
import { mapNotification } from "@/src/utils/notificationMapper";

export default async function fetchMyNotifications(
  token: string,
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    isRead?: boolean;
  },
): Promise<NotificationsResponse> {
  const query = new URLSearchParams();

  if (options?.page) query.set("page", String(options.page));
  if (options?.limit) query.set("limit", String(options.limit));
  if (options?.search) query.set("search", options.search);
  if (typeof options?.isRead === "boolean")
    query.set("isRead", String(options.isRead));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/me?${query.toString()}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["notifications"] },
    },
  );

  if (!res.ok) throw new Error("Falha ao buscar notificações.");

  const rawData = await res.json();

  return {
    ...rawData,
    notifications: rawData.notifications.map(mapNotification),
  };
}
