import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditHero() {
  return (
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
        agendamentos e novidades exclusivas. Se necessário, redefina sua senha
        de acesso ao lado.
      </p>

      <Link
        href="/perfil"
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-brand-gold-dark transition-colors duration-300"
      >
        <ArrowLeft size={12} />
        Voltar ao Perfil
      </Link>
    </section>
  );
}
