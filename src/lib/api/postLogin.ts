export async function postLogin(email: string, password: string) {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, slug }),
    cache: "no-store",
  });

  if (!res.ok) {
    let message = "Credenciais inválidas.";

    try {
      const buffer = await res.arrayBuffer();
      const text = new TextDecoder("utf-8").decode(buffer);
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
