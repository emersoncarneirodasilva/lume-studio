import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import fetchMyProfile from "@/src/lib/api/fetchMyProfile";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import ProfileHero from "@/src/components/Profile/ProfileHero";
import ProfileCard from "@/src/components/Profile/ProfileCard";
import { UserProfile } from "../../interfaces";

export const metadata: Metadata = {
  title: "Meus Dados | Lume Studio",
  description:
    "Visualize e confira suas informações de contato e detalhes da conta.",
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const user: UserProfile = await fetchMyProfile(token);

  // Iniciais dinâmicas para o avatar
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const uniqueKey = `${Date.now()}`;

  return (
    // Exata estrutura de seção da AboutHero
    <main className="py-40 px-6 md:px-12 bg-background overflow-hidden min-h-screen transition-colors duration-300">
      <Suspense fallback={null} key={uniqueKey}>
        <EditProfileFeedback />
      </Suspense>

      <div className="container-lume">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 lg:gap-24">
          {/* Lado Esquerdo */}
          <ProfileHero />

          {/* Lado Direito: Card com Elemento de Fundo Decorativo */}
          <ProfileCard user={user} initials={initials} />
        </div>
      </div>
    </main>
  );
}
