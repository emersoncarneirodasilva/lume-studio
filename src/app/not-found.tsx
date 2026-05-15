import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      {/* Elemento Visual 404 em Dourado */}
      <div className="relative mb-4">
        <h1 className="text-[130px] md:text-[200px] font-serif leading-none select-none tracking-tighter bg-linear-to-b from-brand-gold-light via-brand-gold-dark to-brand-gold-dark bg-clip-text text-transparent opacity-90">
          404
        </h1>
        {/* Linha decorativa atravessando o número opcionalmente */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-24 bg-brand-gold-dark/20 hidden md:block" />
      </div>

      {/* Conteúdo */}
      <div className="space-y-6 max-w-lg">
        <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-gold-dark block">
          Página não encontrada
        </span>

        <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-[1.1]">
          Este caminho não leva ao <br />
          <span className="text-brand-gold-dark">Lume Studio.</span>
        </h2>

        <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
          O conteúdo que você procura pode ter sido movido ou não está mais
          disponível em nosso concierge digital.
        </p>

        {/* Botão de Retorno */}
        <div className="pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-12 py-5 border border-brand-gold-dark/40 text-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-gold-dark hover:text-black transition-all duration-700 group cursor-pointer"
          >
            <span className="transform group-hover:-translate-x-2 transition-transform">
              ←
            </span>
            Voltar ao Início
          </Link>
        </div>
      </div>

      {/* Detalhes de Pixel Art nos cantos para manter a sua identidade */}
      <div className="fixed top-12 left-12 opacity-10 hidden lg:block">
        <div className="w-2 h-2 bg-brand-gold-dark" />
      </div>
      <div className="fixed bottom-12 right-12 opacity-10 hidden lg:block">
        <div className="w-2 h-2 bg-brand-gold-dark mb-2 ml-4" />
        <div className="w-2 h-2 bg-brand-gold-dark" />
      </div>
    </div>
  );
}
