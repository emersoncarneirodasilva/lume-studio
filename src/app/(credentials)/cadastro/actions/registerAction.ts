"use server";

import { fetchSalonBySlug } from "@/src/lib/api/fetchSalonBySlug";
import { CreateUserPayload, postUser } from "@/src/lib/api/postUser";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!name || !email || !phone || !password) {
    redirect(
      `/cadastro?error=${encodeURIComponent(
        "Todos os campos são obrigatórios",
      )}`,
    );
  }

  let salon;
  let redirectTo: string | null = null;

  // 1. Busca o salão
  try {
    salon = await fetchSalonBySlug();
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Erro ao buscar informações do salão.";

    // Em vez de dar redirect aqui dentro, apenas guardamos o caminho:
    redirectTo = `/cadastro?error=${encodeURIComponent(message)}`;
  }

  // Se deu erro ao buscar o salão, redireciona agora (fora do catch)
  if (redirectTo) {
    redirect(redirectTo);
  }

  if (!salon?.id) {
    redirect(`/cadastro?error=${encodeURIComponent("Salão não encontrado.")}`);
  }

  // 2. Cria o usuário
  const payload: CreateUserPayload = {
    name,
    email,
    password,
    phone,
    salonId: salon.id,
  };

  try {
    await postUser(payload);
    // Sucesso! Guarda o redirecionamento para a tela de login
    redirectTo = `/login?success=${encodeURIComponent("Cadastro feito com sucesso!")}`;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Erro ao criar usuário.";

    // Guarda o redirecionamento de erro
    redirectTo = `/cadastro?error=${encodeURIComponent(message)}`;
  }

  // 3. Executa o redirecionamento de forma limpa e segura para o Next.js
  if (redirectTo) {
    redirect(redirectTo);
  }
}
