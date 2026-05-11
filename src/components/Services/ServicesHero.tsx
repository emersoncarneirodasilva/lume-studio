"use client";

interface ServicesHeroProps {
  currentFilter: string;
  onFilterChange: (category: string) => void;
  categories: string[];
}

export default function ServicesHero({
  currentFilter,
  onFilterChange,
  categories,
}: ServicesHeroProps) {
  return (
    <section className="pt-40 pb-20 px-6 md:px-12 bg-background transition-colors duration-300">
      <div className="container-lume">
        <div className="max-w-4xl space-y-8">
          {/* Label superior */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
              O Menu
            </span>
            <div className="h-px w-8 bg-brand-gold-dark/30" />
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl font-serif text-foreground leading-[1.1] tracking-tight">
            Rituais para a <br />
            Estética <span className="text-brand-gold-dark">Moderna.</span>
          </h1>

          {/* Descrição */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed font-light">
            Uma coleção de serviços exclusivos onde tradição e inovação se
            encontram. Cada detalhe é pensado para criar uma experiência única e
            personalizada, elevando o cuidado pessoal ao status de arte.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div className="mt-16 flex flex-wrap gap-4 border-b border-card-border pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`relative px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group cursor-pointer
                ${
                  currentFilter === cat
                    ? "text-brand-gold-dark"
                    : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {cat}
              {/* Linha indicadora de seleção ativa */}
              {currentFilter === cat && (
                <span className="absolute bottom-0 lg:-bottom-8.25 left-0 w-full h-0.5 bg-brand-gold-dark z-10" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
