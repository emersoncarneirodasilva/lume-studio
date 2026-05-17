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

      const decodedMsg = decodeURIComponent(successMessage);
      toast.success(decodedMsg, { duration: 4000 });

      // 🚨 BLINDAGEM MÁXIMA: Se a mensagem for de link enviado, cadastro ou redefinição,
      // NUNCA deixa ir para a Home. Trava o usuário no login e limpa a URL.
      const msgLower = decodedMsg.toLowerCase();
      const isOtherFlow =
        msgLower.includes("link") ||
        msgLower.includes("enviado") ||
        msgLower.includes("cadast") ||
        msgLower.includes("recupera") ||
        msgLower.includes("redefin");

      if (isOtherFlow || href === "/login") {
        window.history.replaceState(null, "", window.location.pathname);
        return;
      }

      // Se for o sucesso do Login real, aí sim vai para a Home após o tempo do toast
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
