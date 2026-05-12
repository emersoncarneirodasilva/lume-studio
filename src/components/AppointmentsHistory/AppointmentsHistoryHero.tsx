import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AppointmentsHistoryHero() {
  return (
    <header className="space-y-4 border-b border-card-border/60 pb-8">
      <div className="space-y-2">
        <Link
          href="/agendamentos"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold-dark hover:opacity-80 transition-opacity"
        >
          <ArrowLeft
            size={12}
            className="text-brand-gold-dark/80 group-hover:-translate-x-0.5 transition-transform"
          />
          Voltar para agendamentos
        </Link>
        <div className="h-px w-8 bg-brand-gold-dark/30" />
      </div>

      <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
        Meu <span className="text-brand-gold-dark">Histórico.</span>
      </h1>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-lg">
        Confira todas as suas experiências passadas, serviços concluídos e os
        detalhes dos seus atendimentos anteriores no Lume Studio.
      </p>
    </header>
  );
}
