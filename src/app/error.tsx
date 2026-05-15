"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <span className="text-brand-gold-dark text-[10px] uppercase tracking-[0.5em] mb-4">
        Ocorreu um imprevisto
      </span>
      <h1 className="text-4xl md:text-5xl text-foreground mb-6 max-w-4xl">
        Não conseguimos conectar com o{" "}
        <span className="text-brand-gold-dark">Concierge.</span>
      </h1>
      <p className="text-muted-foreground max-w-lg mb-10 font-light">
        Houve uma instabilidade na comunicação com nossos serviços. Por favor,
        tente novamente ou entre em contato direto.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-4 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer"
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-4 rounded-lg border border-card-border text-foreground text-[11px] font-bold uppercase tracking-widest hover:bg-card-secondary transition-all cursor-pointer"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
