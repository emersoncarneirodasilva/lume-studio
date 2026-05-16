import Link from "next/link";
import { Lock } from "lucide-react";
import { resetPasswordAction } from "@/src/app/(credentials)/redefinir-senha/[token]/actions/resetPasswordAction";
import SubmitButton from "../Buttons/SubmitButton";

export default function ResetPasswordForm({ token }: { token: string }) {
  return (
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
            Nova <span className="text-brand-gold-dark">Senha.</span>
          </h1>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            Crie uma senha forte e segura de no mínimo 6 caracteres para
            reestabelecer o acesso à sua conta.
          </p>
        </header>

        {/* Formulário com a Server Action de Redefinição */}
        <form action={resetPasswordAction} className="space-y-5">
          {/* Input Oculto (Hidden) para enviar o token automaticamente na Action */}
          <input type="hidden" name="token" value={token} />

          {/* Input de Nova Senha */}
          <div className="space-y-1.5">
            <label
              htmlFor="new-password"
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
            >
              Nova Senha
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                <Lock size={18} />
              </div>
              <input
                type="password"
                id="new-password"
                name="new-password"
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3.5 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Input de Confirmação de Senha */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirm-password"
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
            >
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                <Lock size={18} />
              </div>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Digite a senha novamente"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3.5 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Botão de Envio de Ação */}
          <div className="pt-2">
            <SubmitButton
              text="Redefinir Senha e Entrar"
              feedbackText="Redefinindo senha..."
            />
          </div>
        </form>

        {/* Rodapé de Links auxiliares */}
        <footer className="space-y-4 pt-6 border-t border-card-border/60 text-center lg:text-left">
          <p className="text-[10px] text-muted-foreground/50 font-medium uppercase tracking-[0.2em]">
            Lembrou sua credencial?{" "}
            <Link
              href="/login"
              className="text-brand-gold-dark hover:text-brand-gold transition-colors font-bold"
            >
              Voltar para o login
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
  );
}
