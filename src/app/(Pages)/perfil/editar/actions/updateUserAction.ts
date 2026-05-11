"use server";

import putMyProfile from "@/src/lib/api/putMyProfile";
import putChangePassword from "@/src/lib/api/putChangePassword";
import { redirect } from "next/navigation";

export async function updateUserAction(formData: FormData) {
  const token = formData.get("token")?.toString() || "";

  const name = formData.get("name")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";

  const newPassword = formData.get("newPassword")?.toString().trim() || "";
  const currentPassword =
    formData.get("currentPassword")?.toString().trim() || "";

  if (!token) {
    redirect(
      `/perfil/editar?error=${encodeURIComponent(
        "Token inválido. Faça login novamente.",
      )}`,
    );
  }

  // 1. Validação prévia de campos de senha vazios (Garante a consistência antes das APIs)
  if (newPassword !== "" && currentPassword === "") {
    redirect(
      `/perfil/editar?error=${encodeURIComponent("Para cadastrar uma nova senha, informe a senha atual.")}`,
    );
  }

  if (newPassword === "" && currentPassword !== "") {
    redirect(
      `/perfil/editar?error=${encodeURIComponent("Você inseriu a senha atual, mas não definiu a nova senha.")}`,
    );
  }

  let redirectTo: string | null = null;

  try {
    // 2. Atualizar dados do perfil (enviando o payload limpo que a API já espera)
    if (name || phone) {
      await putMyProfile(token, { name, phone });
    }

    // 3. Atualizar senha se ambos os campos estiverem preenchidos
    if (newPassword !== "" && currentPassword !== "") {
      await putChangePassword(token, {
        oldPassword: currentPassword,
        newPassword,
      });
    }

    // Sucesso!
    redirectTo = `/perfil?success=${encodeURIComponent("Perfil atualizado com sucesso!")}`;
  } catch (err: any) {
    // Tratamento robusto para pegar a mensagem exata do backend
    let message = "Erro ao atualizar perfil.";

    if (err instanceof Error) {
      message = err.message;
    } else if (err && typeof err === "object" && "message" in err) {
      message = String(err.message);
    } else if (typeof err === "string") {
      message = err;
    }

    redirectTo = `/perfil/editar?error=${encodeURIComponent(message)}`;
  }

  // Redirecionamento limpo fora do bloco try/catch para o Next.js fluir perfeitamente
  if (redirectTo) {
    redirect(redirectTo);
  }
}
