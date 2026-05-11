import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import fetchMyProfile, { UserProfile } from "@/src/lib/api/fetchMyProfile";
import { Metadata } from "next";
import EditProfileForm from "@/src/components/Edit/EditProfileForm";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import { Suspense } from "react"; // 1. Importe o Suspense

export const metadata: Metadata = {
  title: "Lume Studio - Editar Perfil",
  description: "Página de edição do perfil do usuário.",
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
          <section className="flex-1 space-y-8 max-w-2xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
                Personalização
              </span>
              <div className="h-px w-8 bg-brand-gold-dark/30" />
            </div>

            <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
              Atualize seus <br />
              dados <span className="text-brand-gold-dark">pessoais.</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-md">
              Mantenha seu contato atualizado para receber confirmações de
              agendamentos e novidades exclusivas. Se necessário, redefina sua
              senha de acesso ao lado.
            </p>

            <Link
              href="/perfil"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-brand-gold-dark transition-colors duration-300"
            >
              <ArrowLeft size={12} />
              Voltar ao Perfil
            </Link>
          </section>

          {/* LADO DIREITO: Card do Formulário */}
          <section className="flex-1 relative w-full max-w-130 isolate">
            <div className="hidden sm:block absolute -bottom-10 -left-10 w-50 h-50 bg-card-accent dark:bg-footer-bg rounded-3xl -z-10 opacity-100 transition-colors duration-300" />

            <EditProfileForm user={user} token={token} />
          </section>
        </div>
      </div>
    </main>
  );
}
