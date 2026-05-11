"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";
import MobileMenuDropdown from "./MobileMenuDropdown";
import ThemeWatcher from "./ThemeWatcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/status", { cache: "no-store" });
        const data = await res.json();
        setAuthenticated(data.authenticated);
      } catch {
        setAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  // Logout para ser usado diretamente no menu mobile
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  // 1. Menu base comum para todos os usuários
  const baseMenuItems = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Profissionais", path: "/profissionais" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  // 2. Define dinamicamente o menu baseado na autenticação (apenas após carregar)
  const menuItems = [...baseMenuItems];

  if (authenticated === true) {
    menuItems.push({ name: "Perfil", path: "/perfil" });
  } else if (authenticated === false) {
    menuItems.push({ name: "Entrar", path: "/login" });
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="relative flex items-center justify-between container-lume bg-header-bg backdrop-blur-md px-6 md:px-12 py-3 rounded-xl shadow-lg border border-card-border transition-colors duration-300">
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Lume Studio Logo"
              width={180}
              height={48}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden min-[881px]:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium tracking-(--letter-spacing-nav)">
          {authenticated !== null &&
            menuItems.map((item) => {
              if (item.name === "Perfil") {
                return <UserMenu key="UserMenuDropdown" />;
              }

              const isActive = pathname === item.path;
              return (
                <li
                  key={item.name}
                  className="relative flex flex-col items-center uppercase"
                >
                  <Link
                    href={item.path}
                    className={`${
                      isActive
                        ? "text-nav-active -translate-y-1"
                        : "text-nav-link hover:text-nav-active"
                    } transition-all duration-300`}
                  >
                    {item.name}
                  </Link>
                  {isActive && (
                    <span className="absolute -bottom-2 w-1.5 h-1.5 bg-nav-active rounded-full" />
                  )}
                </li>
              );
            })}
        </ul>

        {/* Botão Agendar (Desktop) + Hambúrguer */}
        <div className="flex items-center gap-4">
          <Link href="/agendamento">
            <button className="hidden min-[881px]:block font-sans bg-linear-to-r from-brand-gold-dark to-brand-gold-light hover:brightness-110 hover:scale-[1.01] text-white px-6 py-3 rounded-lg text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer">
              Agendar Agora
            </button>
          </Link>

          {/* Botão Hambúrguer (Mobile) */}
          <button
            className="min-[881px]:hidden p-2 text-foreground/80 hover:text-foreground cursor-pointer transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile Overlay */}
        <AnimatePresence>
          <MobileMenuDropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            menuItems={menuItems}
            pathname={pathname}
            handleLogout={handleLogout}
            authenticated={authenticated}
          />
        </AnimatePresence>

        {/* Watcher invisível: monitora o tema de fundo baseado na autenticação */}
        <ThemeWatcher authenticated={authenticated} />
      </nav>
    </header>
  );
}
