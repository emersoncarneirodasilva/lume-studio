"use client";

import Link from "next/link";

export default function ProfessionalsCTA() {
  return (
    <section className="px-6 md:px-12 pb-32 bg-background">
      <div className="container-lume">
        <div className="bg-card-secondary rounded-2xl p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-6 text-center md:text-left relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] tracking-tight">
              Escolha o profissional ideal{" "}
              <span className="text-brand-gold-dark">para você.</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
              Conheça nossa equipe e agende seu horário com quem entende a sua
              beleza de forma única.
            </p>
          </div>

          {/* Botão de Agendamento com cores de marca e sombra suave */}
          <div className="shrink-0 relative z-10">
            <Link href="/agendamento">
              <button className="w-full sm:w-auto px-10 py-5 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                Agendar Atendimento
              </button>
            </Link>
          </div>

          {/* Efeito de iluminação sutil de fundo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-dark/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
