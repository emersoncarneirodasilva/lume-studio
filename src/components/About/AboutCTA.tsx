import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-32 md:py-48 bg-background px-6 transition-colors duration-300">
      <div className="container-lume max-w-4xl text-center space-y-10">
        {/* Label Superior */}
        <div className="space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold-dark block">
            Experimente a Diferença
          </span>
          <div className="h-px w-8 bg-brand-gold-dark/30 mx-auto" />
        </div>

        {/* Título Principal em Serifa */}
        <h2 className="text-4xl md:text-5xl text-foreground leading-[1.2] tracking-tight">
          Sua transformação espera{" "}
          <span className="text-brand-gold-dark">por você.</span>
        </h2>

        {/* Botão de Agendamento com Gradiente de Marca */}
        <div className="pt-6">
          <Link href="/contato#consultoria">
            <button className="w-full sm:w-auto px-10 py-5 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Agende sua Consultoria
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
