"use server";

import { putResetPassword } from "@/src/lib/api/putResetPassword";
import { redirect } from "next/navigation";

export async function resetPasswordAction(formData: FormData) {
  const token = formData.get("token")?.toString();
  const newPassword = formData.get("new-password")?.toString();
  const confirmPassword = formData.get("confirm-password")?.toString();

  let redirectTo: string | null = null;

  // Se não houver token, o usuário nem deveria estar aqui. Mandamos para o esqueci-senha.
  if (!token) {
    redirect(
      `/esqueci-senha?error=${encodeURIComponent("Token inválido ou expirado.")}`,
    );
  }

  // Validações básicas de preenchimento e correspondência
  if (!newPassword || !confirmPassword) {
    redirect(
      `/redefinir-senha/${token}?error=${encodeURIComponent(
        "Preencha todos os campos.",
      )}`,
    );
  }

  if (newPassword !== confirmPassword) {
    redirect(
      `/redefinir-senha/${token}?error=${encodeURIComponent(
        "As senhas não coincidem.",
      )}`,
    );
  }

  try {
    const result = await putResetPassword(token, newPassword);

    if (!result.success) {
      // Se a API retornou erro controlado (ex: Token expirado)
      redirectTo = `/redefinir-senha/${token}?error=${encodeURIComponent(
        result.message || "Erro ao redefinir senha.",
      )}`;
    } else {
      // Sucesso absoluto! Mandamos para a tela de login para ele usar a nova senha
      redirectTo = `/login?success=${encodeURIComponent(
        "Sua senha foi redefinida com sucesso.",
      )}`;
    }
  } catch (err: unknown) {
    // Se a chamada de fetch estourar por erro de rede ou servidor caindo
    const message =
      err instanceof Error
        ? err.message
        : "Não foi possível redefinir sua senha.";

    redirectTo = `/redefinir-senha/${token}?error=${encodeURIComponent(message)}`;
  }

  // Realiza o redirect final de forma limpa e segura
  if (redirectTo) {
    redirect(redirectTo);
  }
}
