"use client";

import Link from "next/link";

export default function ServicesCTA() {
  return (
    <section className="px-6 md:px-12 pb-32 bg-background">
      <div className="container-lume">
        <div className="bg-card-secondary rounded-2xl p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="max-w-xl space-y-6 text-center md:text-left relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] tracking-tight">
              Experimente a{" "}
              <span className="text-brand-gold-dark">transformação.</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
              No Lume Studio, cada atendimento é pensado exclusivamente para
              você. Agende seu horário e viva uma experiência de beleza única e
              personalizada.
            </p>
          </div>

          {/* Botão utilizando suas cores de marca: --color-brand-gold-dark */}
          <div className="shrink-0 relative z-10">
            <Link href="/agendamento">
              <button className="w-full sm:w-auto px-10 py-5 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                Agende sua sessão
              </button>
            </Link>
          </div>

          {/* Efeito sutil de brilho usando sua cor de marca com baixa opacidade */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-dark/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
