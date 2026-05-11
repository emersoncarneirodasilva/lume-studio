import { philosophyItems } from "@/src/utils/philosophyItems";

export default function AboutPhilosophy() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-card-secondary">
      <div className="container-lume">
        <div
          id="filosofia"
          className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 scroll-mt-72"
        >
          {/* Coluna 1: Título Principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1] tracking-tight">
            A Nossa Filosofia
          </h2>

          {/* Colunas 2 e 3: Os Pilares */}
          {philosophyItems.map((item) => (
            <div key={item.id} className="space-y-8 flex flex-col">
              {/* Header do Pilar: Número / Nome */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-brand-gold-dark tracking-[0.3em] uppercase whitespace-nowrap">
                    {item.id} / {item.label}
                  </span>
                </div>
                {/* Linha decorativa muito sutil, opcional se quiser seguir o padrão visual */}
                <div className="h-px w-full bg-brand-gold-dark/10" />
              </div>

              {/* Texto de Conteúdo */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
