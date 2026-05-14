export default function NotificationsHero() {
  return (
    <header className="space-y-4 border-b border-card-border/60 pb-8">
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
          Central de Alertas
        </span>
        <div className="h-px w-8 bg-brand-gold-dark/30" />
      </div>

      <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
        Suas <span className="text-brand-gold-dark">Notificações.</span>
      </h1>

      <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-lg">
        Acompanhe novidades, confirmações de horários e atualizações importantes
        do seu agendamento no Lume Studio.
      </p>
    </header>
  );
}
