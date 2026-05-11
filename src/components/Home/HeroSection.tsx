import fetchImagesByType from "@/src/lib/api/fetchImagesByType";
import Image from "next/image";
import Link from "next/link";

export default async function HeroSection() {
  const imagesData = await fetchImagesByType(
    "Imagem Interna Lume Studio (Home)",
  );

  const imagemInternaLumeStudio =
    imagesData["Imagem Interna Lume Studio (Home)"]?.[0] ?? null;

  return (
    /* 1. A Seção agora tem o mesmo padding lateral do Footer (px-6 md:px-12) */
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-background px-6 md:px-12">
      {/* Imagem de Fundo (Mantida original) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imagemInternaLumeStudio?.url || "/images/salao-interior.jpg"}
          alt="Interior luxuoso do Lume Studio"
          fill
          priority
          className="object-cover object-center scale-105 motion-safe:animate-subtle-zoom transition-all duration-700 dark:brightness-[0.95] dark:contrast-[1.05]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/35 dark:bg-transparent transition-colors duration-700" />
      </div>

      {/* 2. Conteúdo - Agora usando container-lume exatamente como no Footer */}
      <div className="container-lume relative z-10 w-full flex flex-col items-start text-left">
        {/* Subtítulo */}
        <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-hero-gold mb-6 motion-safe:animate-fade-in-up">
          ARTE EM CADA DETALHE
        </p>

        {/* Título Principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-hero-text leading-tight md:leading-[1.1] max-w-4xl mb-8 motion-safe:animate-fade-in-up delay-150">
          Onde a{" "}
          <span className="font-medium text-hero-gold">Sofisticação</span>{" "}
          Encontra a Alma.
        </h1>

        {/* Descrição */}
        <p className="text-sm sm:text-base md:text-lg text-hero-text/85 max-w-2xl leading-relaxed mb-12 motion-safe:animate-fade-in-up delay-300">
          Um santuário exclusivo dedicado à estética moderna. Criamos
          experiências personalizadas que elevam sua beleza natural com um toque
          editorial.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center w-full sm:w-auto motion-safe:animate-fade-in-up delay-500">
          <Link href="/servicos">
            <button className="w-full sm:w-auto px-10 py-5 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              EXPLORE NOSSOS SERVIÇOS
            </button>
          </Link>

          <Link
            href="/sobre"
            className="text-hero-text hover:text-brand-gold-dark text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-3"
          >
            O PORTFÓLIO
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      {/* 3. Indicador de Paginação (Ajustado para a borda do Footer) */}
      <div className="absolute bottom-10 right-6 md:right-12 z-10 text-hero-text text-sm tracking-widest font-medium hidden md:block">
        01 / 04
      </div>
    </section>
  );
}
