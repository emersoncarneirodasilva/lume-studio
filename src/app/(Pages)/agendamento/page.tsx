import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { fetchAllServices } from "@/src/lib/api/fetchAllServices";
import AppointmentWrapper from "@/src/components/Appointment/AppointmentWrapper";
import fetchMyProfile, { UserProfile } from "@/src/lib/api/fetchMyProfile";

export const metadata: Metadata = {
  title: "Reservar Horário | Lume Studio",
  description:
    "Escolha seu serviço, selecione o melhor momento e reserve sua experiência de beleza exclusiva no Lume Studio.",
};

export default async function AppointmentPage() {
  const response = await fetchAllServices();
  const servicesData = response?.services || [];

  // Pegando o token de forma 100% segura no Server-side
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value || "";

  const user: UserProfile = await fetchMyProfile(token);

  return (
    <main className="pt-40 pb-20 px-6 md:px-12 bg-background transition-colors duration-300">
      <div className="container-lume">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <p className="text-brand-gold-dark text-[10px] uppercase tracking-[0.4em] animate-pulse">
                Carregando Concierge Lume...
              </p>
            </div>
          }
        >
          <AppointmentWrapper
            initialServices={servicesData}
            token={token}
            user={user}
          />
        </Suspense>
      </div>
    </main>
  );
}
