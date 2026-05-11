import Link from "next/link";
import { cookies } from "next/headers";
import { User, Mail, Phone, Edit3 } from "lucide-react";
import fetchMyProfile, { UserProfile } from "@/src/lib/api/fetchMyProfile";
import { Suspense } from "react";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";

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
          {/* Lado Esquerdo: Texto (Exata cópia do container da AboutHero) */}
          <section className="flex-1 space-y-8 max-w-2xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
                Área Exclusiva
              </span>
              <div className="h-px w-8 bg-brand-gold-dark/30" />
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
              Sua conta <br />
              no <span className="text-brand-gold-dark">Lume Studio.</span>
            </h1>

            {/* Descrição */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-md">
              Gerencie suas informações pessoais, consulte seus agendamentos e
              personalize sua experiência em nosso espaço.
            </p>
          </section>

          {/* Lado Direito: Card com Elemento de Fundo Decorativo */}
          <section className="flex-1 relative w-full max-w-130 isolate">
            {/* O Shape decorativo (o "quadrado" bege) identico ao do Sobre-Hero */}
            <div className="hidden sm:block absolute -bottom-10 -left-10 w-50 h-50 bg-card-accent dark:bg-footer-bg rounded-3xl -z-10 opacity-100 transition-colors duration-300" />

            {/* Container do Card (Substituindo a imagem, mas respeitando o mesmo tamanho e proporção visual) */}
            <div className="w-full bg-header-bg/40 backdrop-blur-md border border-card-border rounded-2xl p-8 md:p-10 shadow-2xl transition-all duration-300">
              {/* Avatar e Iniciais */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-brand-gold-dark/10 border border-brand-gold-dark/30 flex items-center justify-center text-brand-gold-dark text-2xl font-serif mb-4 shadow-inner">
                  {initials}
                </div>
                <h2 className="text-2xl font-serif text-foreground tracking-wide text-center">
                  Minha Conta
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-1">
                  Lume Studio Member
                </span>
              </div>

              {/* Informações Pessoais */}
              <div className="space-y-6 mb-10">
                {/* Nome */}
                <div className="flex items-center gap-4 pb-4 border-b border-card-border/50">
                  <div className="p-2.5 rounded-lg bg-card-secondary border border-card-border/30 text-brand-gold-dark">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Nome Completo
                    </span>
                    <span className="text-sm font-medium text-foreground mt-0.5">
                      {user.name}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 pb-4 border-b border-card-border/50">
                  <div className="p-2.5 rounded-lg bg-card-secondary border border-card-border/30 text-brand-gold-dark">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      E-mail de Acesso
                    </span>
                    <span className="text-sm font-medium text-foreground mt-0.5 break-all">
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-center gap-4 pb-4 border-b border-card-border/50">
                  <div className="p-2.5 rounded-lg bg-card-secondary border border-card-border/30 text-brand-gold-dark">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Telefone / WhatsApp
                    </span>
                    <span className="text-sm font-medium text-foreground mt-0.5">
                      {user.phone || "Não cadastrado"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão de Ação */}
              <Link
                href="/perfil/editar"
                className="w-full px-8 py-4 gap-2 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-xs tracking-widest transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                <Edit3 size={14} />
                Editar Perfil
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
