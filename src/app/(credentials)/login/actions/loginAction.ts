"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { postLogin } from "@/src/lib/api/postLogin";

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=Por favor, preencha todos os campos.");
  }

  let loginSucesso = false;

  const hoursToExpire = parseInt(
    process.env.NEXT_PUBLIC_HOURS_TO_EXPIRE || "5",
    10,
  );

  const maxAgeInSeconds = 60 * 60 * hoursToExpire;

  try {
    const data = await postLogin(email, password);

    if (data?.token) {
      const cookieStore = await cookies();
      cookieStore.set("user_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: maxAgeInSeconds,
        path: "/",
        sameSite: "lax",
      });

      loginSucesso = true;
    } else {
      throw new Error("Falha ao gerar sessão de acesso.");
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "E-mail ou senha incorretos.";

    redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
  }

  if (loginSucesso) {
    redirect("/");
  }
}
