import Link from "next/link";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import { handleLogin } from "./actions/loginAction";
import SubmitButton from "@/src/components/Buttons/SubmitButton";
import SuccessToastAutoRedirect from "@/src/components/Success/SuccessToastAutoRedirect";

export const metadata = {
  title: "Lume Studio - Login",
  description: "Página de login do Lume Studio.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center bg-background relative overflow-hidden">
      {/* Aqui está ele! Por padrão redireciona para a Home ("/") */}
      <SuccessToastAutoRedirect href="/" />

      {/* Lado Esquerdo - Formulário de Login */}
      <section className="w-full flex items-center justify-center p-6 sm:p-12 lg:p-16 relative z-10">
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
              Entrar no <span className="text-brand-gold-dark">Lume.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Para gerenciar seus agendamentos e acessar nossos especialistas,
              insira seu e-mail e senha abaixo.
            </p>
          </header>

          {/* Formulário com a Server Action real */}
          <form action={handleLogin} className="space-y-5">
            {/* Input de E-mail */}
            <div className="space-y-1.5">
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
                  className="w-full pl-12 pr-4 py-3.5 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Input de Senha */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 block"
                >
                  Senha
                </label>
                <Link
                  href="/esqueci-senha"
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold-dark/75 hover:text-brand-gold transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
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
                  className="w-full pl-12 pr-4 py-3.5 bg-card-secondary border border-card-border focus:border-brand-gold-dark/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Botão de Envio de Ação */}
            <div className="pt-2">
              <SubmitButton text="Entrar na Experiência" />
            </div>
          </form>

          {/* Rodapé de Links auxiliares */}
          <footer className="space-y-4 pt-4 border-t border-card-border/60 text-center lg:text-left">
            <p className="text-[10px] text-muted-foreground/50 font-medium uppercase tracking-[0.2em]">
              Não possui uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-brand-gold-dark hover:text-brand-gold transition-colors font-bold"
              >
                Crie uma aqui
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

      {/* Lado Direito - Imagem Estética (Limpa e integrada ao design) */}
      <aside className="relative w-full h-full min-h-125 lg:h-screen hidden lg:block overflow-hidden group">
        {/* Degradê linear suave para fundir a foto com o fundo claro do formulário à esquerda */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent z-10 pointer-events-none w-1/3" />

        {/* Vinheta escura muito sutil nas bordas externas apenas para dar profundidade de estúdio */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 z-10 pointer-events-none" />

        <Image
          src="/images/lume-login.jpg"
          alt="Lume Studio - Experiência Exclusiva"
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102 group-hover:scale-100"
          priority
        />
      </aside>
    </main>
  );
}
