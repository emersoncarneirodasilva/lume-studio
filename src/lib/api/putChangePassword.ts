import { ChangePassword } from "@/src/app/interfaces";

export default async function putChangePassword(
  token: string,
  data: ChangePassword,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao alterar senha.");
  }

  return res.json();
}
