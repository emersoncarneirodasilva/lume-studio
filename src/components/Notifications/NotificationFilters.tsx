"use client";

interface NotificationFiltersProps {
  initialSearch: string;
  initialIsRead?: string;
  initialLimit: number;
}

export default function NotificationFilters({
  initialSearch,
  initialIsRead,
  initialLimit,
}: NotificationFiltersProps) {
  return (
    <form
      method="GET"
      className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-card-secondary p-4 rounded-xl border border-card-border"
    >
      {/* Busca por Texto */}
      <input
        name="search"
        placeholder="Buscar..."
        defaultValue={initialSearch}
        className="w-full bg-background border border-card-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-brand-gold-dark/40 transition-colors"
      />

      {/* Filtro de Status de Leitura */}
      <select
        name="isRead"
        defaultValue={initialIsRead ?? ""}
        className="w-full bg-background border border-card-border rounded-lg px-4 py-2 text-sm text-foreground outline-none focus:border-brand-gold-dark/40 transition-colors cursor-pointer"
      >
        <option value="">Todas</option>
        <option value="false">Não lidas</option>
        <option value="true">Lidas</option>
      </select>

      {/* Limite por Página */}
      <select
        name="limit"
        defaultValue={initialLimit}
        className="w-full bg-background border border-card-border rounded-lg px-4 py-2 text-sm text-foreground outline-none focus:border-brand-gold-dark/40 transition-colors cursor-pointer"
      >
        <option value="5">5 por página</option>
        <option value="10">10 por página</option>
        <option value="20">20 por página</option>
      </select>

      {/* Botão de Ação */}
      <button
        type="submit"
        className="w-full bg-brand-gold-dark hover:bg-brand-gold-light text-white font-semibold text-xs uppercase tracking-wider py-2 rounded-lg transition-all duration-300 cursor-pointer"
      >
        Filtrar
      </button>
    </form>
  );
}
