import { Metadata } from "next";
import { cookies } from "next/headers";
import { BellOff } from "lucide-react";
import fetchMyNotifications from "@/src/lib/api/fetchMyNotifications";
import NotificationCard from "@/src/components/Notifications/NotificationCard";
import Pagination from "@/src/components/Pagination";
import NotificationsHero from "@/src/components/Notifications/NotificationsHero";
import NotificationFilters from "@/src/components/Notifications/NotificationFilters";

export const metadata: Metadata = {
  title: "Lume Studio - Notificações",
};

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    isRead?: string;
  }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;
  if (!token) throw new Error("Usuário não autenticado");

  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 5);
  const search = params.search || "";
  const isRead =
    params.isRead === "" || params.isRead === undefined
      ? undefined
      : params.isRead === "true";

  const data = await fetchMyNotifications(token, {
    page,
    limit,
    search,
    isRead,
  });
  const notifications = data.notifications || [];
  const totalPages = Math.max(1, Math.ceil((data.totalCount ?? 0) / limit));

  return (
    <main className="py-40 px-6 md:px-12 bg-background overflow-hidden min-h-screen transition-colors duration-300">
      <div className="container-lume">
        <div className="flex flex-col items-start gap-16 w-full">
          {/* Hero: Mantido 100% original alinhado à esquerda */}
          <NotificationsHero />

          {/* Filtros e Cards: Agora posicionados perfeitamente abaixo do Hero */}
          <section className="w-full space-y-6">
            {/* Filtros */}
            <NotificationFilters
              initialSearch={search}
              initialIsRead={params.isRead}
              initialLimit={limit}
            />

            {/* Listagem */}
            {notifications.length === 0 ? (
              <div className="bg-card-secondary border border-card-border rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-3">
                <BellOff size={32} className="text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground font-light">
                  Você não possui notificações no momento.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((n) => (
                  <NotificationCard key={n.id} notification={n} />
                ))}
              </div>
            )}

            {/* Componente de Paginação */}
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              basePath="/notificacoes"
            />
          </section>
        </div>
      </div>
    </main>
  );
}
