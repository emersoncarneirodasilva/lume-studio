export async function postForgotPassword(email: string) {
  const url = process.env.NEXT_PUBLIC_URL;
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/password/forgot`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, url, slug }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    let message = "E-mail inválido.";

    try {
      const text = await res.text();
      const json = JSON.parse(text);
      if (json?.message) message = json.message;
      else if (typeof json === "string") message = json;
    } catch {
      // Se der erro no parse, mantém a mensagem padrão
    }

    throw new Error(message);
  }

  return await res.json();
}
