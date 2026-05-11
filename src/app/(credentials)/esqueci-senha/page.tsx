import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import SubmitButton from "@/src/components/Buttons/SubmitButton";
import { Suspense } from "react";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import { handleForgotPassword } from "./actions/forgotAction";

export const metadata = {
  title: "Lume Studio - Recuperar Senha",
  description: "Recupere o acesso à sua conta exclusiva no Lume Studio.",
};

export default function ForgotPasswordPage() {
  // Key dinâmica para o Suspense forçar o re-render e disparar o Toast do Sonner
  const uniqueKey = `${Date.now()}`;

  return (
    // Mantendo items-stretch para garantir alinhamento perfeito com a imagem lateral
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch bg-background relative overflow-hidden">
      {/* Componente que escuta os erros (?error=...) na URL e exibe o Sonner */}
      <Suspense fallback={null} key={uniqueKey}>
        <EditProfileFeedback />
      </Suspense>

      {/* Lado Esquerdo - Formulário de Recuperação */}
      <section className="w-full flex items-center justify-center p-6 sm:p-12 lg:p-16 py-12 relative z-10">
        <article className="w-full max-w-md space-y-8">
          {/* Cabeçalho no padrão Lume */}
          <header className="space-y-4 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
                Área Exclusiva
              </span>
              <div className="h-px w-8 bg-brand-gold-dark/30 mx-auto lg:mx-0" />
            </div>

            <h1 className="text-4xl sm:text-5xl text-foreground font-serif tracking-tight">
              Recuperar <span className="text-brand-gold-dark">Senha.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Informe seu e-mail abaixo. Se você tiver uma conta conosco,
              enviaremos um link exclusivo para redefinição de sua senha.
            </p>
          </header>

          {/* Formulário com a Server Action de Esqueci Senha */}
          <form action={handleForgotPassword} className="space-y-6">
            {/* Input de E-mail */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
              >
                E-mail de Cadastro
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
                  className="w-full pl-12 pr-4 py-3.5 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Botão de Envio (Mantendo o estilo sofisticado) */}
            <div className="pt-2">
              <SubmitButton
                text="Enviar Link de Recuperação"
                feedbackText="Enviando link..."
              />
            </div>
          </form>

          {/* Rodapé de Links auxiliares */}
          <footer className="space-y-4 pt-6 border-t border-card-border/60 text-center lg:text-left">
            <p className="text-[10px] text-muted-foreground/50 font-medium uppercase tracking-[0.2em]">
              Lembrou sua senha?{" "}
              <Link
                href="/login"
                className="text-brand-gold-dark hover:text-brand-gold transition-colors font-bold"
              >
                Voltar para o Login
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

      {/* Lado Direito - Imagem Estética (Espelhada das outras telas) */}
      <aside className="relative w-full h-full hidden lg:block overflow-hidden group">
        {/* Degradê linear suave */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent z-10 pointer-events-none w-1/3" />

        {/* Vinheta escura */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 z-10 pointer-events-none" />

        <Image
          src="/images/lume-esqueci-senha.jpg"
          alt="Lume Studio - Recuperação de Acesso"
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102 group-hover:scale-100"
          priority
        />
      </aside>
    </main>
  );
}
