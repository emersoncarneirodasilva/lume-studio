import fetchImagesByType from "@/src/lib/api/fetchImagesByType";
import Image from "next/image";

export default async function AboutRitual() {
  const [img1, img2, img3, img4] = await Promise.all([
    fetchImagesByType("Imagem Ritual Lume 01"),
    fetchImagesByType("Imagem Ritual Lume 02"),
    fetchImagesByType("Imagem Ritual Lume 03"),
    fetchImagesByType("Imagem Ritual Lume 04"),
  ]);

  const ritual01 = img1["Imagem Ritual Lume 01"]?.[0] ?? null;

  const ritual02 = img2["Imagem Ritual Lume 02"]?.[0] ?? null;

  const ritual03 = img3["Imagem Ritual Lume 03"]?.[0] ?? null;

  const ritual04 = img4["Imagem Ritual Lume 04"]?.[0] ?? null;

  const images = [
    {
      src: ritual01?.url || "/images/ritual-1.jpg",
      alt: "Salão principal",
      gridClass: "md:col-span-2 aspect-[16/9] md:aspect-[21/9]",
    },
    {
      src: ritual02?.url || "/images/ritual-2.jpg",
      alt: "Produtos botânicos",
      gridClass: "md:col-span-1 aspect-square",
    },
    {
      src: ritual03?.url || "/images/ritual-3.jpg",
      alt: "Sala de spa",
      gridClass: "md:col-span-1 aspect-[4/5]",
    },
    {
      src: ritual04?.url || "/images/ritual-4.jpg",
      alt: "Detalhe do atendimento",
      gridClass: "md:col-span-2 aspect-[16/9]",
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="container-lume">
        {/* Título Centralizado */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-serif text-foreground">
            O Ritual Lume
          </h2>
          <div className="h-px w-12 bg-brand-gold-dark mx-auto" />
        </div>

        {/* Grid usando o .map() */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-sm group ${image.gridClass}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
