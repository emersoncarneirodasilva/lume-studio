import fetchImagesByType from "@/src/lib/api/fetchImagesByType";
import Image from "next/image";

export default async function AboutFounder() {
  const imagesData = await fetchImagesByType("Elena Vance (Sobre)");

  const imagemFundadora = imagesData["Elena Vance (Sobre)"]?.[0] ?? null;

  return (
    /* A seção usa card-secondary para criar o contraste de fundo (Bege Claro / Preto profundo) */
    <section className="py-32 bg-card-secondary px-6 transition-colors duration-300">
      <div className="container-lume max-w-6xl">
        <div className="bg-card-primary rounded-3xl p-8 md:p-16 shadow-sm flex flex-col md:flex-row items-center gap-12 lg:gap-20 transition-colors duration-300">
          {/* Lado Esquerdo: Texto e Citação */}
          <div className="flex-1 space-y-8 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              Palavra da Fundadora
            </h2>

            <div className="space-y-6">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light italic">
                &quot;Minha jornada começou nos bastidores da Paris Fashion
                Week. Foi ali que percebi como uma transformação pode mudar a
                forma como uma pessoa se apresenta ao mundo. Quis trazer esse
                mesmo nível de maestria e atenção aos detalhes para uma
                experiência mais pessoal.&quot;
              </p>

              <div className="flex items-center gap-3">
                {/* O Ouro já está fixo no seu CSS, então ele se adapta conforme a variável de marca */}
                <div className="h-px w-6 bg-brand-gold-dark" />
                <p className="text-sm font-bold tracking-widest uppercase text-foreground">
                  Elena V.,{" "}
                  <span className="text-muted-foreground font-normal">
                    Fundadora
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Foto da Fundadora */}
          <div className="flex-1 w-full max-w-100 order-1 md:order-2">
            {/* A borda da imagem agora usa o card-secondary com opacidade para um efeito sutil em ambos os temas */}
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md border-8 border-card-secondary/50">
              <Image
                src={imagemFundadora?.url || "/images/founder.jpg"}
                alt="Elena V., Fundadora do Lume Studio"
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
