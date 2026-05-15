import Link from "next/link";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { AlertCircle, History } from "lucide-react";
import fetchAppointments from "@/src/lib/api/fetchAppointments";
import AppointmentsHero from "@/src/components/Appointment/AppointmentsHero";
import AppointmentsCard from "@/src/components/Appointment/AppointmentsCard";
import Pagination from "@/src/components/Pagination";

export const metadata: Metadata = {
  title: "Meus Agendamentos | Lume Studio",
  description:
    "Acompanhe seu histórico de cuidados e confira seus próximos momentos de bem-estar reservados no Lume Studio.",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AppointmentsPage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;
  const LIMIT = 6;

  const { total, appointments } = await fetchAppointments(
    token,
    currentPage,
    LIMIT,
  );

  const activeAppointments = appointments.filter(
    (app) => app.status === "PENDING" || app.status === "CONFIRMED",
  );

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <main className="pt-40 pb-20 px-6 md:px-12 bg-background transition-colors duration-300">
      <div className="container-lume">
        <AppointmentsHero />

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pb-4">
            <h2 className="text-lg tracking-wide text-brand-gold-dark/90 uppercase text-[12px] font-bold">
              Próximas Experiências
            </h2>

            <Link
              href="/agendamentos/historico"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-brand-gold-dark transition-colors duration-200 group font-light uppercase tracking-wider"
            >
              <History
                size={14}
                className="text-muted-foreground/60 group-hover:text-brand-gold-dark transition-colors"
              />
              Ver experiências passadas
            </Link>
          </div>

          {activeAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-card-secondary border border-card-border rounded-2xl text-center space-y-3">
              <AlertCircle className="text-muted-foreground/30" size={32} />
              <p className="text-sm text-muted-foreground/60 font-light">
                Você não possui nenhum agendamento ativo no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeAppointments.map((app) => (
                <AppointmentsCard key={app.id} appointment={app} />
              ))}
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/agendamentos"
          />
        </section>
      </div>
    </main>
  );
}
