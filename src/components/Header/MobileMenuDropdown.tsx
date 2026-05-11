"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, Calendar, LogOut, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface MenuItem {
  name: string;
  path: string;
}

interface MobileMenuDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  pathname: string;
  handleLogout: () => Promise<void>;
  authenticated: boolean | null; // Adicionado para receber o estado do Header
}

export default function MobileMenuDropdown({
  isOpen,
  setIsOpen,
  menuItems,
  pathname,
  handleLogout,
  authenticated,
}: MobileMenuDropdownProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-full left-0 right-0 mt-2 max-h-[calc(100vh-120px)] overflow-y-auto bg-header-bg/95 backdrop-blur-lg border border-card-border rounded-xl shadow-2xl min-[881px]:hidden scrollbar-none transition-colors duration-300"
    >
      <ul className="flex flex-col p-6 gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          // TRATAMENTO EXCLUSIVO PARA O LINK DE "PERFIL" NO MOBILE
          if (item.name === "Perfil") {
            return (
              <li key={item.name} className="mt-4 mb-2">
                {/* Card de Perfil Adaptativo usando variáveis do seu globals.css */}
                <div className="rounded-xl border border-card-border bg-card-secondary p-4 flex flex-col gap-4 transition-colors duration-300">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center justify-between pb-3 border-b border-card-border">
                    <Link
                      href="/perfil"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-full bg-brand-gold-dark/15 flex items-center justify-center text-brand-gold-dark font-bold text-sm">
                        U
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                          Sua Conta
                        </span>
                        <span className="text-sm font-semibold text-foreground group-hover:text-brand-gold-dark transition-colors">
                          Acessar Perfil
                        </span>
                      </div>
                    </Link>

                    {/* Container Elegante para o Toggle no Mobile */}
                    <div className="flex items-center gap-3">
                      {authenticated === true && <ThemeToggle />}
                      <Link
                        href="/perfil"
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-card-accent rounded-lg transition-colors"
                      >
                        <ChevronRight
                          size={18}
                          className="text-muted-foreground hover:text-brand-gold-dark transition-transform"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Links rápidos dentro do Card */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/notificacoes"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-card-accent text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
                    >
                      <Bell
                        size={14}
                        className="text-brand-gold-dark shrink-0"
                      />
                      Notificações
                    </Link>

                    <Link
                      href="/agendamentos"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-card-accent text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
                    >
                      <Calendar
                        size={14}
                        className="text-brand-gold-dark shrink-0"
                      />
                      Agendamentos
                    </Link>
                  </div>

                  {/* Botão Sair integrado na base do Card */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-500/10 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 w-full text-xs font-semibold text-red-500 transition-all cursor-pointer"
                  >
                    <LogOut size={13} className="shrink-0" />
                    Sair da Conta
                  </button>
                </div>
              </li>
            );
          }

          // Renderização normal para os demais itens do menu mobile
          return (
            <li key={item.name}>
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`relative flex items-center py-3 text-base font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-nav-active translate-x-3"
                    : "text-nav-link hover:text-nav-active"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobileIndicator"
                    className="absolute -left-4 w-1.5 h-1.5 bg-nav-active rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                )}
                {item.name}
              </Link>
            </li>
          );
        })}

        {/* Borda divisória e Botão Agendar */}
        <div className="pt-4 border-t border-card-border mt-2">
          <Link href="/agendamento" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white py-4 rounded-lg font-bold uppercase text-xs tracking-widest active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer">
              Agendar Agora
            </button>
          </Link>
        </div>
      </ul>
    </motion.div>
  );
}
