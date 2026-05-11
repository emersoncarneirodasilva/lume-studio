import fetchImagesByType from "@/src/lib/api/fetchImagesByType";
import Image from "next/image";
import Link from "next/link";

export default async function ServicesSection() {
  const [img1, img2, img3, img4] = await Promise.all([
    fetchImagesByType("Imagem Serviço Lume 01"),
    fetchImagesByType("Imagem Serviço Lume 02"),
    fetchImagesByType("Imagem Serviço Lume 03"),
    fetchImagesByType("Imagem Serviço Lume 04"),
  ]);

  const servico01 = img1["Imagem Serviço Lume 01"]?.[0] ?? null;

  const servico02 = img2["Imagem Serviço Lume 02"]?.[0] ?? null;

  const servico03 = img3["Imagem Serviço Lume 03"]?.[0] ?? null;

  const servico04 = img4["Imagem Serviço Lume 04"]?.[0] ?? null;

  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="container-lume">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl text-foreground mb-6">
              Nossos Serviços
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cada serviço é um processo colaborativo, unindo precisão técnica à
              sua visão única.
            </p>
          </div>
          <Link
            href="/servicos"
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-dark border-b border-brand-gold-dark/30 pb-1 hover:border-brand-gold-dark transition-all"
          >
            Ver Menu Completo
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* 1. Card Principal - Corte & Design */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-card-primary">
            <Image
              src={servico01?.url || "/images/corte-editorial.jpg"}
              alt="Corte & Design Editorial"
              fill
              className="object-cover object-center grayscale transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />

            {/* Overlay com degradê usando a cor de background do tema */}
            <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent p-10 flex flex-col justify-end">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-brand-gold-dark dark:text-brand-gold-light uppercase mb-3">
                Assinatura Lume
              </span>

              <h3 className="text-3xl sm:text-4xl text-foreground mb-4 leading-tight">
                Corte & Design Editorial
              </h3>

              <p className="text-muted-foreground max-w-sm text-xs sm:text-sm leading-relaxed mb-6">
                Corte de precisão e paletas de cores personalizadas, projetadas
                para harmonizar com seus traços e estilo de vida.
              </p>

              <span className="text-brand-gold-dark dark:text-brand-gold-light font-medium text-sm">
                A partir de R$ 90
              </span>
            </div>
          </div>

          {/* 2. Card Terapia Facial (Vertical) */}
          <div className="md:col-span-1 md:row-span-2 grid grid-cols-12 items-center md:flex md:flex-col bg-card-secondary rounded-xl overflow-hidden p-4 sm:p-6 md:p-8 gap-4 md:gap-0">
            <div className="col-span-5 md:w-full relative h-40 sm:h-52 md:h-75 overflow-hidden rounded-lg shrink-0 isolate">
              <Image
                src={servico02?.url || "/images/terapia-facial.jpg"}
                alt="Terapia Facial Arquitetural"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>

            <div className="col-span-7 md:pt-8 md:pb-4 md:px-2 flex flex-col justify-center md:justify-between grow">
              <div className="space-y-1 md:space-y-3">
                <h3 className="text-lg sm:text-xl md:text-2xl text-foreground leading-tight">
                  Terapia Facial Arquitetural
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-brand-gold-dark dark:text-brand-gold-light font-medium tracking-wide">
                  A partir de R$ 100
                </p>
              </div>

              <Link href="/agendamento">
                <button className="w-full mt-4 md:mt-8 py-3 md:py-5 text-[9px] md:text-[11px] font-bold tracking-widest md:tracking-[0.2em] uppercase border border-card-border hover:bg-foreground hover:text-background transition-all duration-500 rounded-sm cursor-pointer bg-transparent shrink-0">
                  Agendar Agora
                </button>
              </Link>
            </div>
          </div>

          {/* 3. Card Manicure (Pequeno) */}
          <div className="md:col-span-1 bg-card-primary p-6 rounded-xl flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-4 group hover:shadow-sm transition-all overflow-hidden h-full">
            <div className="relative w-20 h-20 sm:w-25 sm:h-25 md:w-full md:h-32 lg:w-25 lg:h-25 shrink-0 rounded-lg overflow-hidden">
              <Image
                src={servico03?.url || "/images/manicure.jpg"}
                alt="Manicure"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-serif text-foreground leading-tight">
                Manicure <br className="hidden md:block lg:hidden" />
                <span className="md:block lg:inline">Minimalista</span>
              </h3>
              <span className="text-[10px] pt-1 sm:text-xs md:text-sm text-brand-gold-dark dark:text-brand-gold-light font-medium tracking-wide">
                A partir de R$ 60
              </span>
            </div>
          </div>

          {/* 4. Card Grande Dia (Largo Inferior) */}
          <div className="md:col-span-2 bg-card-accent rounded-xl overflow-hidden flex items-center gap-4 group p-8">
            <div className="grow">
              <h3 className="text-lg sm:text-xl md:text-2xl text-foreground mb-3">
                Beleza para o Seu Grande Dia
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xs leading-relaxed">
                Uma experiência completa de beleza, pensada para valorizar cada
                detalhe do seu momento.
              </p>
            </div>
            <div className="relative h-40 w-35 sm:h-50 sm:w-45 rounded-lg overflow-hidden">
              <Image
                src={servico04?.url || "/images/noivas.jpg"}
                alt="Noiva"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
