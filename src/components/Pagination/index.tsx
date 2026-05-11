"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath?: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`${basePath || ""}?page=${page}`, { scroll: false });

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
