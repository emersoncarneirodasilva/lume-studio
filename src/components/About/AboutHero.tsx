import fetchImagesByType from "@/src/lib/api/fetchImagesByType";
import Image from "next/image";

export default async function AboutHero() {
  const imagesData = await fetchImagesByType(
    "Imagem Interna Lume Studio (Sobre-Hero)",
  );

  const imagemImagemInternaStudio =
    imagesData["Imagem Interna Lume Studio (Sobre-Hero)"]?.[0] ?? null;

  return (
    <section className="py-40 px-6 md:px-12 bg-background overflow-hidden">
      <div className="container-lume">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 lg:gap-24">
          {/* Lado Esquerdo: Texto */}
          <div className="flex-1 space-y-8 max-w-2xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
                Nossa Herança
              </span>
              <div className="h-px w-8 bg-brand-gold-dark/30" />
            </div>
            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
              Beleza moldada com intenção, precisão e{" "}
              <span className="text-brand-gold-dark">arte.</span>
            </h1>
            {/* Descrição */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-md">
              Lume Studio é um espaço onde técnica e estética se encontram para
              criar experiências personalizadas. Acreditamos que o cabelo é uma
              forma de expressão — e cada detalhe importa.
            </p>
          </div>

          {/* Lado Direito: Imagem com Elemento de Fundo */}
          <div className="flex-1 relative w-full max-w-125 isolate">
            {/* O Shape decorativo (o "quadrado" bege) */}
            <div className="hidden sm:block absolute -bottom-10 -left-10 w-50 h-50 bg-card-accent dark:bg-footer-bg rounded-3xl -z-10 opacity-100" />

            {/* Container da Imagem */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl shadow-sm z-0">
              <Image
                src={imagemImagemInternaStudio?.url || "/images/about-hero.jpg"}
                alt="Ambiente Lume Studio"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
