"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Calendar, LogOut, Sun, Moon } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Controle de tema do next-themes
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita problemas de hidratação garantindo que o tema só renderize no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = pathname === "/perfil";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  // Alterna o tema de forma direta
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div
      ref={menuRef}
      className="relative flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Link do Perfil principal */}
      <Link
        href="/perfil"
        className={`${
          isActive
            ? "text-nav-active -translate-y-1"
            : "text-nav-link hover:text-nav-active"
        } uppercase text-xs lg:text-sm font-sans font-medium tracking-(--letter-spacing-nav) transition-all duration-300`}
      >
        Perfil
      </Link>

      {/* Indicador de página ativa */}
      {isActive && (
        <span className="absolute -bottom-2 w-1.5 h-1.5 bg-nav-active rounded-full" />
      )}

      {/* Dropdown com transições suaves */}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col rounded-xl py-2 bg-header-bg backdrop-blur-md border border-card-border shadow-xl transition-colors duration-300">
            {/* Links Rápidos */}
            <Link
              href="/notificacoes"
              className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-card-accent transition-colors cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Bell size={14} className="text-brand-gold-dark shrink-0" />
              Notificações
            </Link>

            <Link
              href="/agendamentos"
              className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-card-accent transition-colors cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Calendar size={14} className="text-brand-gold-dark shrink-0" />
              Agendamentos
            </Link>

            {/* BOTAO DE ALTERNAR TEMA (Discreto e idêntico aos outros itens do menu) */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-2.5 text-left w-full text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-card-accent transition-colors cursor-pointer"
              >
                {resolvedTheme === "dark" ? (
                  <>
                    <Sun size={14} className="text-brand-gold-dark shrink-0" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon size={14} className="text-brand-gold-dark shrink-0" />
                    <span>Modo Escuro</span>
                  </>
                )}
              </button>
            )}

            <div className="h-px bg-card-border my-1 mx-2" />

            {/* Sair da conta */}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2.5 text-left w-full text-[11px] font-sans font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/5 transition-colors cursor-pointer"
            >
              <LogOut size={14} className="shrink-0" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
