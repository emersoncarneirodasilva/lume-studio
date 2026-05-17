import { Suspense } from "react";
import ForgotPasswordForm from "@/src/components/ForgotPassword/ForgotPasswordForm";
import ForgotPasswordImage from "@/src/components/ForgotPassword/ForgotPasswordImage";
import SuccessToastAutoRedirect from "@/src/components/Success/SuccessToastAutoRedirect";

export const metadata = {
  title: "Lume Studio - Recuperar Senha",
  description: "Recupere o acesso à sua conta exclusiva no Lume Studio.",
};

export default function ForgotPasswordPage() {
  // Key dinâmica para o Suspense forçar o re-render e disparar o Toast do Sonner
  const uniqueKey = `${Date.now()}`;

  return (
    // Mantendo items-stretch para garantir alinhamento perfeito com a imagem lateral
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch bg-background relative overflow-hidden">
      {/* Componente que escuta os erros (?error=...) na URL e exibe o Sonner */}
      <Suspense fallback={null} key={uniqueKey}>
        <SuccessToastAutoRedirect redirectToOnSuccess="/login" />
      </Suspense>

      {/* Lado Esquerdo - Formulário de Recuperação */}
      <ForgotPasswordForm />

      {/* Lado Direito - Imagem Estética (Espelhada das outras telas) */}
      <ForgotPasswordImage />
    </main>
  );
}
