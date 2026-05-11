import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Mail, Lock, User, Phone } from "lucide-react";
import { registerUser } from "./actions/registerAction";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import SubmitButton from "@/src/components/Buttons/SubmitButton";

export const metadata = {
  title: "Lume Studio - Cadastro",
  description: "Crie sua conta exclusiva no Lume Studio.",
};

export default function RegisterPage() {
  const uniqueKey = `${Date.now()}`;

  return (
    // Corrigido: Usando items-stretch para garantir que os dois lados fiquem 100% colados no topo e no rodapé
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch bg-background relative overflow-hidden">
      {/* Componente que escuta os erros (?error=...) na URL e exibe o Sonner */}
      <Suspense fallback={null} key={uniqueKey}>
        <EditProfileFeedback />
      </Suspense>

      {/* Lado Esquerdo - Formulário de Cadastro */}
      <section className="w-full flex items-center justify-center p-6 sm:p-12 lg:p-16 py-12 relative z-10">
        <article className="w-full max-w-md space-y-6">
          {/* Cabeçalho no padrão Lume */}
          <header className="space-y-3 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
                Área Exclusiva
              </span>
              <div className="h-px w-8 bg-brand-gold-dark/30 mx-auto lg:mx-0" />
            </div>

            <h1 className="text-4xl sm:text-5xl text-foreground font-serif tracking-tight">
              Criar conta no <span className="text-brand-gold-dark">Lume.</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Junte-se ao nosso espaço exclusivo para agendar experiências,
              gerenciar seu perfil e ter acesso aos melhores especialistas.
            </p>
          </header>

          {/* Formulário com a Server Action de Registro */}
          <form action={registerUser} className="space-y-4">
            {/* Input de Nome Completo */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
              >
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Input de E-mail */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemplo@lume.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Input de Telefone */}
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
              >
                Telefone / WhatsApp
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(84) 99999-9999"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Input de Senha */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Botão de Envio de Ação */}
            <div className="pt-2">
              <SubmitButton
                text="Criar Minha Conta"
                feedbackText="Criando conta..."
              />
            </div>
          </form>

          {/* Rodapé de Links auxiliares */}
          <footer className="space-y-3 pt-4 border-t border-card-border/60 text-center lg:text-left">
            <p className="text-[10px] text-muted-foreground/50 font-medium uppercase tracking-[0.2em]">
              Já possui uma conta?{" "}
              <Link
                href="/login"
                className="text-brand-gold-dark hover:text-brand-gold transition-colors font-bold"
              >
                Faça login por aqui
              </Link>
            </p>
            <div>
              <Link
                href="/"
                className="inline-block text-[9px] text-muted-foreground/40 hover:text-foreground font-bold uppercase tracking-[0.2em] transition-colors"
              >
                ← Voltar para a página inicial
              </Link>
            </div>
          </footer>
        </article>
      </section>

      {/* Lado Direito - Imagem Estética (Perfeitamente alinhada no topo e rodapé) */}
      <aside className="relative w-full h-full hidden lg:block overflow-hidden group">
        {/* Degradê linear suave para fundir a foto com o fundo claro do formulário à esquerda */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent z-10 pointer-events-none w-1/3" />

        {/* Vinheta escura muito sutil nas bordas externas apenas para dar profundidade de estúdio */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 z-10 pointer-events-none" />

        <Image
          src="/images/lume-cadastro.jpg"
          alt="Lume Studio - Torne-se Membro"
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102 group-hover:scale-100"
          priority
        />
      </aside>
    </main>
  );
}
