"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface SuccessToastAutoRedirectProps {
  redirectToOnSuccess: string; // Para onde ir quando der certo
}

export default function SuccessToastAutoRedirect({
  redirectToOnSuccess,
}: SuccessToastAutoRedirectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");

  const toastDisparadoRef = useRef<string | null>(null);

  useEffect(() => {
    // 1. CASO DE SUCESSO: Mostra o Toast e joga para a tela correta (ex: /login)
    if (
      successMessage &&
      toastDisparadoRef.current !== `success:${successMessage}`
    ) {
      toastDisparadoRef.current = `success:${successMessage}`;

      toast.success(decodeURIComponent(successMessage), {
        duration: 2500,
      });

      const timer = setTimeout(() => {
        // Redireciona limpando a URL e forçando a entrada na nova página
        window.location.assign(redirectToOnSuccess);
      }, 300);

      return () => clearTimeout(timer);
    }

    // 2. CASO DE ERRO: Mostra o erro e apenas limpa os parâmetros da URL sem sair da página
    if (errorMessage && toastDisparadoRef.current !== `error:${errorMessage}`) {
      toastDisparadoRef.current = `error:${errorMessage}`;

      toast.error(decodeURIComponent(errorMessage), {
        duration: 5000,
      });

      // Limpa a URL de forma suave para o usuário poder tentar de novo limpo
      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      const query = params.toString();
      const cleanUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(cleanUrl, { scroll: false });
    }
  }, [
    successMessage,
    errorMessage,
    redirectToOnSuccess,
    pathname,
    router,
    searchParams,
  ]);

  return null;
}
