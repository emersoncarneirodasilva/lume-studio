export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  salonId: string;
}

export async function postUser(payload: CreateUserPayload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Erro ao criar usuário:", errorData);
      throw new Error(errorData?.message || "Erro ao criar usuário.");
    }

    return await res.json();
  } catch (err: unknown) {
    let message = "Erro ao criar usuário.";
    if (err instanceof Error) message = err.message;
    throw new Error(message);
  }
}
