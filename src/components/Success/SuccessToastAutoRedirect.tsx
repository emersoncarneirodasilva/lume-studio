"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  href?: string;
}

export default function SuccessToastAutoRedirect({ href = "/" }: Props) {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");
  const toastDisparadoRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      successMessage &&
      toastDisparadoRef.current !== `success:${successMessage}`
    ) {
      toastDisparadoRef.current = `success:${successMessage}`;

      toast.success(decodeURIComponent(successMessage), { duration: 4000 });

      // Se o href for "/login", significa que já estamos no login. Não redireciona!
      if (href === "/login") {
        window.history.replaceState(null, "", window.location.pathname); // Limpa o ?success da barra
        return;
      }

      // Se for o login real (href="/"), manda para a Home
      const timer = setTimeout(() => {
        window.location.assign(href);
      }, 500);

      return () => clearTimeout(timer);
    }

    if (errorMessage && toastDisparadoRef.current !== `error:${errorMessage}`) {
      toastDisparadoRef.current = `error:${errorMessage}`;
      toast.error(decodeURIComponent(errorMessage), { duration: 4000 });
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [successMessage, errorMessage, href]);

  return null;
}
