"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

interface ThemeWatcherProps {
  authenticated: boolean | null;
}

export default function ThemeWatcher({ authenticated }: ThemeWatcherProps) {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // Se o usuário NÃO está logado, limpamos a escolha manual do localStorage
    // e forçamos o site a seguir rigorosamente o sistema/navegador.
    if (authenticated === false && theme !== "system") {
      setTheme("system");
    }
  }, [authenticated, setTheme, theme]);

  return null; // Totalmente invisível
}
