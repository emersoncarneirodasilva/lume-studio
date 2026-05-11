"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function EditProfileFeedback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const error = searchParams.get("error");
  const success = searchParams.get("success");

  // Refs para evitar disparos duplicados no React StrictMode
  const lastErrorRef = useRef<string | null>(null);
  const lastSuccessRef = useRef<string | null>(null);

  useEffect(() => {
    let shouldCleanUrl = false;

    // 1. Tratamento de Erro (Toast Vermelho)
    if (error && error !== lastErrorRef.current) {
      lastErrorRef.current = error;
      toast.error(decodeURIComponent(error));
      shouldCleanUrl = true;
    }

    // 2. Tratamento de Sucesso (Toast Verde)
    if (success && success !== lastSuccessRef.current) {
      lastSuccessRef.current = success;
      toast.success(decodeURIComponent(success));
      shouldCleanUrl = true;
    }

    // Limpa os parâmetros de busca (?error ou ?success) sem dar reload na página
    if (shouldCleanUrl) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      params.delete("success");

      const query = params.toString();
      const cleanUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(cleanUrl, { scroll: false });
    }
  }, [error, success, pathname, router, searchParams]);

  return null;
}
