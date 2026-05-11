"use server";

import { postForgotPassword } from "@/src/lib/api/postForgotPassword";
import { redirect } from "next/navigation";

export async function handleForgotPassword(formData: FormData) {
  const email = formData.get("email")?.toString()?.trim();

  // Validação primária
  if (!email) {
    redirect(
      `/esqueci-senha?error=${encodeURIComponent(
        "Preencha o campo de e-mail.",
      )}`,
    );
  }

  let redirectTo: string | null = null;

  try {
    await postForgotPassword(email);
    // Sucesso! Redireciona para o login informando para verificar a caixa de entrada
    redirectTo = `/login?success=${encodeURIComponent(
      "Link de redefinição enviado para seu e-mail.",
    )}`;
  } catch (err: unknown) {
    // Captura a mensagem exata tratada na API (ex: "E-mail não encontrado.")
    const message =
      err instanceof Error ? err.message : "Erro ao enviar o e-mail.";

    redirectTo = `/esqueci-senha?error=${encodeURIComponent(message)}`;
  }

  // Executa o redirecionamento de forma limpa e segura, fora do try/catch
  if (redirectTo) {
    redirect(redirectTo);
  }
}
