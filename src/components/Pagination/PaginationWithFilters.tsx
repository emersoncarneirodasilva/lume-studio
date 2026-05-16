"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationWithFiltersProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationWithFilters({
  totalPages,
  currentPage,
}: PaginationWithFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    // 1. Clona os parâmetros atuais da URL (preserva a categoria se houver)
    const params = new URLSearchParams(searchParams.toString());

    // 2. Atualiza apenas o parâmetro da página
    params.set("page", page.toString());

    // 3. Navega para a URL perfeitamente formatada: /servicos?category=cabelos&page=2
    router.push(`/servicos?${params.toString()}`, { scroll: false });

    // 4. Scroll suave para o topo do grid
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-40 flex justify-center items-center space-x-12 border-t border-card-border pt-16">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`text-xs font-bold tracking-[0.4em] transition-all duration-500 relative pb-2 group cursor-pointer
            ${
              currentPage === number
                ? "text-brand-gold-dark"
                : "text-muted-foreground/30 hover:text-foreground"
            }
          `}
        >
          {String(number).padStart(2, "0")}

          <span
            className={`absolute bottom-0 left-0 h-px bg-brand-gold-dark transition-all duration-500
            ${currentPage === number ? "w-full" : "w-0 group-hover:w-full opacity-30"}
          `}
          />
        </button>
      ))}
    </div>
  );
}
