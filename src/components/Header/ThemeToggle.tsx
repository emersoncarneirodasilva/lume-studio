"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Esqueleto sutil com o mesmo tamanho para evitar quebra de layout durante a hidratação
    return (
      <div className="w-9 h-9 rounded-full border border-card-border/40" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-card-border/40 bg-card-primary/80 hover:bg-card-secondary hover:border-brand-gold-dark/40 text-foreground transition-all duration-300 cursor-pointer overflow-hidden shadow-xs focus:outline-hidden"
      aria-label="Alternar tema"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 15, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -15, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5 text-brand-gold-light" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-brand-gold-dark" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
