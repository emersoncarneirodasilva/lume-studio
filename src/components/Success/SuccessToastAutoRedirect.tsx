"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface SuccessToastAutoRedirectProps {
  href?: string;
}

export default function SuccessToastAutoRedirect({
  href = "/",
}: SuccessToastAutoRedirectProps) {
  const searchParams = useSearchParams();

  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");

  // Guardamos o último parâmetro para evitar disparos duplos
  const toastDisparadoRef = useRef<string | null>(null);

  useEffect(() => {
    // CASO 1: FLUXO DE SUCESSO
    if (
      successMessage &&
      toastDisparadoRef.current !== `success:${successMessage}`
    ) {
      toastDisparadoRef.current = `success:${successMessage}`;

      // 1. Dispara o toast da Sonner
      toast.success(successMessage, {
        duration: 2000,
      });

      // 2. Aguarda e força a navegação direta pelo navegador para a Home limpa
      const timer = setTimeout(() => {
        // Redireciona de forma absoluta limpando qualquer parâmetro antigo da URL
        window.location.assign(href);
      }, 200);

      return () => clearTimeout(timer);
    }

    // CASO 2: FLUXO DE ERRO
    if (errorMessage && toastDisparadoRef.current !== `error:${errorMessage}`) {
      toastDisparadoRef.current = `error:${errorMessage}`;

      toast.error(decodeURIComponent(errorMessage), {
        duration: 4000,
      });
    }
  }, [successMessage, errorMessage, href]);

  return null;
}
