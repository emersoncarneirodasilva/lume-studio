export default function ProfessionalsHero() {
  return (
    <section className="pt-40 pb-20 px-6 md:px-12 bg-background transition-colors duration-300">
      <div className="container-lume">
        <div className="max-w-4xl space-y-8">
          {/* Label superior */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
              Os Artesãos
            </span>
            <div className="h-px w-8 bg-brand-gold-dark/30" />
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl font-serif text-foreground leading-[1.1] tracking-tight">
            Conheça quem <br />
            cuida da <span className="text-brand-gold-dark">sua beleza.</span>
          </h1>

          {/* Descrição */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed font-light">
            Nossa equipe reúne profissionais experientes que unem técnica,
            sensibilidade e um olhar moderno para valorizar o seu estilo de
            forma única.
          </p>
        </div>

        {/* Linha divisória sutil inferior, similar à Hero de Serviços */}
        <div className="mt-16 border-b border-card-border" />
      </div>
    </section>
  );
}
