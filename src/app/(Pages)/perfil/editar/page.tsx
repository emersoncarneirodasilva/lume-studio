import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import fetchMyProfile, { UserProfile } from "@/src/lib/api/fetchMyProfile";
import EditProfileForm from "@/src/components/Edit/EditProfileForm";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import EditHero from "@/src/components/Profile/EditHero";

export const metadata: Metadata = {
  title: "Editar Meus Dados | Lume Studio",
  description:
    "Atualize suas informações de contato e personalize sua experiência no Lume Studio.",
};

export default async function EditProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const user: UserProfile = await fetchMyProfile(token);

  return (
    <main className="py-40 px-6 md:px-12 bg-background overflow-hidden min-h-screen transition-colors duration-300">
      {/* 2. Envolva o componente de Feedback no Suspense */}
      <Suspense fallback={null}>
        <EditProfileFeedback />
      </Suspense>

      <div className="container-lume">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 lg:gap-24">
          {/* LADO ESQUERDO: Texto Editorial */}
          <EditHero />

          {/* LADO DIREITO: Card do Formulário */}
          <EditProfileForm user={user} token={token} />
        </div>
      </div>
    </main>
  );
}
