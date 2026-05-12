import { cookies } from "next/headers";
import { AlertCircle } from "lucide-react";
import fetchAppointmentsHistory from "@/src/lib/api/fetchAppointmentsHistory";
import AppointmentsCard from "@/src/components/Appointment/AppointmentsCard";
import Pagination from "@/src/components/Pagination";
import AppointmentsHistoryHero from "@/src/components/AppointmentsHistory/AppointmentsHistoryHero";
import { Appointment } from "@/src/lib/api/fetchAppointments";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AppointmentsHistoryPage({
  searchParams,
}: PageProps) {
  // 1. Recupera o token de autenticação do usuário logado via cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  // 2. Resolve a paginação vinda da URL
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;
  const LIMIT = 6;

  // 3. Busca os dados reais do seu backend através da função que criamos
  const { appointmentsHistory, totalPages } = await fetchAppointmentsHistory(
    token,
    currentPage,
    LIMIT,
  );

  return (
    <main className="pt-40 pb-20 px-6 md:px-12 bg-background transition-colors duration-300">
      <div className="container-lume">
        {/* Cabeçalho Atualizado com o Estilo Premium do AppointmentsHero */}
        <AppointmentsHistoryHero />

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pb-4">
            <h2 className="text-lg tracking-wide text-brand-gold-dark/90 uppercase text-[12px] font-bold">
              Atendimentos Anteriores
            </h2>
          </div>

          {appointmentsHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-card-secondary border border-card-border rounded-2xl text-center space-y-3">
              <AlertCircle className="text-muted-foreground/30" size={32} />
              <p className="text-sm text-muted-foreground/60 font-light">
                Você não possui nenhum histórico de atendimento registrado neste
                salão.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointmentsHistory.map((historyItem) => {
                // Tratamento seguro da data antes de montar o objeto:
                const dateWithTimezone = new Date(historyItem.scheduledAt);
                dateWithTimezone.setHours(dateWithTimezone.getHours() + 3); // Soma 3 horas matematicamente

                // O ADAPTADOR: Ajusta o modelo de dados achatado para o AppointmentsCard
                const adaptedAppointment: Appointment = {
                  id: historyItem.id,
                  status: historyItem.status,

                  // 💡 Passamos a data com as 3 horas somadas convertida de volta para string ISO
                  scheduledAt: dateWithTimezone.toISOString(),

                  createdAt: historyItem.movedAt,
                  updatedAt: historyItem.movedAt,
                  userId: historyItem.userId || "",
                  salonId: historyItem.salonId,
                  notifications: [],
                  payment: null,
                  services: historyItem.services.map((srv) => ({
                    id: srv.id,
                    service: {
                      id: srv.serviceId,
                      name: "Serviço Realizado",
                      price: srv.price,
                      duration: srv.duration,
                    },
                    professional: {
                      id: srv.professionalId,
                      name: "Profissional",
                      avatarUrl: null,
                    },
                  })),
                };

                return (
                  <AppointmentsCard
                    key={historyItem.id}
                    appointment={adaptedAppointment}
                  />
                );
              })}
            </div>
          )}

          {/* Componente de Paginação dinâmico */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/agendamentos/historico"
          />
        </section>
      </div>
    </main>
  );
}
