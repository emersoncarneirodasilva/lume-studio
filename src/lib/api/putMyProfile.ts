export interface UpdateProfile {
  name?: string;
  phone?: string;
}

export default async function putMyProfile(token: string, data: UpdateProfile) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar perfil.");
  }

  return res.json();
}
