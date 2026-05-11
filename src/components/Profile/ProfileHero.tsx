export default function ProfileHero() {
  return (
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
  );
}
