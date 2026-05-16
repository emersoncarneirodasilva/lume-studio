import { Suspense } from "react";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import ResetPasswordForm from "@/src/components/ResetPassword/ResetPasswordForm";
import ResetPasswordImage from "@/src/components/ResetPassword/ResetPasswordImage";

export const metadata = {
  title: "Lume Studio - Redefinir Senha",
  description:
    "Crie uma nova senha para acessar sua conta exclusiva no Lume Studio.",
};

interface ResetPasswordPageProps {
  params: Promise<{ token: string }> | { token: string };
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  // Garante a compatibilidade com Next.js mais recente resolvendo a Promise de params
  const resolvedParams = await params;
  const token = resolvedParams.token;

  const uniqueKey = `${Date.now()}`;

  return (
    // Mantendo items-stretch para garantir que os dois lados fiquem 100% colados no topo e no rodapé
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch bg-background relative overflow-hidden">
      {/* Componente que escuta os erros (?error=...) na URL e exibe o Sonner */}
      <Suspense fallback={null} key={uniqueKey}>
        <EditProfileFeedback />
      </Suspense>

      {/* Lado Esquerdo - Formulário de Redefinição */}
      <ResetPasswordForm token={token} />

      {/* Lado Direito - Imagem Estética (Perfeitamente alinhada e integrada) */}
      <ResetPasswordImage />
    </main>
  );
}
