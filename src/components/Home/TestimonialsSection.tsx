import Image from "next/image";
import { testimonials } from "@/src/utils/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background transition-colors duration-300">
      <div className="container-lume text-center">
        {/* Cabeçalho */}
        <div className="mb-20 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold-dark">
            A Experiência
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            Reflexões dos Clientes
          </h2>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-card-primary p-8 md:p-10 rounded-xl border border-card-border shadow-sm flex flex-col text-left hover:shadow-md transition-shadow group"
            >
              {/* Ícone de Aspas Superior */}
              <div className="mb-6">
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-card-accent transition-colors group-hover:text-brand-gold-light/40"
                >
                  <path
                    d="M0 24V11.2308C0 7.82051 0.74359 4.97436 2.23077 2.69231C3.76923 0.410256 6.07692 -0.358974 9.15385 0.384615L9.69231 2.38462C7.94872 2.69231 6.64103 3.38462 5.76923 4.46154C4.94872 5.53846 4.53846 6.84615 4.53846 8.38462V10.2308H9.69231V24H0ZM22.3077 24V11.2308C22.3077 7.82051 23.0513 4.97436 24.5385 2.69231C26.0769 0.410256 28.3846 -0.358974 31.4615 0.384615L32 2.38462C30.2564 2.69231 28.9487 3.38462 28.0769 4.46154C27.2564 5.53846 26.8462 6.84615 26.8462 8.38462V10.2308H32V24H22.3077Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Texto do Depoimento */}
              <p className="text-foreground leading-relaxed text-sm md:text-base mb-10 grow italic">
                &quot;{item.quote}&quot;
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4 border-t border-card-border pt-6">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden transition-all duration-500">
                  <Image
                    src={item.image}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wider text-foreground uppercase">
                    {item.author}
                  </span>
                  <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
