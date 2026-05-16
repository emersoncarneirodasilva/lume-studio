import Link from "next/link";
import Image from "next/image";
import fetchImagesByType from "@/src/lib/api/fetchImagesByType";

export default async function OwnerSection() {
  const imagesData = await fetchImagesByType("Elena Vance (Home)");

  const imagemFundadora = imagesData["Elena Vance (Home)"]?.[0] ?? null;

  return (
    <section className="py-32 px-6 md:px-12 bg-card-secondary">
      <div className="container-lume">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* LADO ESQUERDO: Imagem com Card de Filosofia Flutuante */}
          <div className="relative">
            <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl isolate">
              <Image
                src={imagemFundadora?.url || "/images/fundadora.jpg"}
                alt="Elena V. - Fundadora do Lume Studio"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Card de Filosofia (Flutuante sobre a imagem) */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-10 bg-card-primary p-6 md:p-8 rounded-xl shadow-xl w-full max-w-70 md:max-w-xs border border-card-border z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold-dark mb-4 block">
                Nossa Filosofia
              </span>
              <p className="text-foreground italic font-serif text-sm md:text-base leading-relaxed">
                &quot;Beleza não é uma tendência a ser seguida, mas uma
                assinatura a ser refinada.&quot;
              </p>
              <footer className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                — Elena V., Fundadora
              </footer>
            </div>
          </div>

          {/* LADO DIREITO: Título, Descrição e Métricas */}
          <div className="flex flex-col space-y-8 md:space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
                Elevando o Padrão da
                <span className="text-brand-gold-dark"> Beleza.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-xl">
                O Lume Studio nasceu do desejo de unir a estética das passarelas
                de alta costura com uma experiência pessoal e exclusiva. Mais do
                que um salão, somos um estúdio criativo onde cada detalhe é
                pensado para valorizar a identidade e a beleza natural de cada
                cliente.
              </p>
            </div>

            {/* Grid de Estatísticas */}
            <div className="grid grid-cols-2 gap-8 border-t border-card-border pt-10">
              <div>
                <span className="text-3xl md:text-4xl font-serif text-brand-gold-dark block mb-2">
                  12+
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Anos de Maestria
                </span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-serif text-brand-gold-dark block mb-2">
                  100%
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Experiência Personalizada
                </span>
              </div>
            </div>

            {/* Link de Ação com Ícone Animado */}
            <div className="pt-4">
              <Link
                href="/sobre#filosofia"
                className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold-dark hover:text-foreground transition-all duration-300 cursor-pointer bg-transparent border-none"
              >
                <span className="border-b border-brand-gold-dark/40 group-hover:border-foreground pb-1 transition-all">
                  Conheça nosso processo
                </span>
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform group-hover:translate-x-2 transition-transform"
                >
                  <path
                    d="M1 7H17M17 7L11 1M17 7L11 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
