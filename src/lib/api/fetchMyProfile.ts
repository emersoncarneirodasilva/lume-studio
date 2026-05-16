import { UserProfile } from "@/src/app/interfaces";

export default async function fetchMyProfile(
  token: string,
): Promise<UserProfile> {
  const slug = process.env.NEXT_PUBLIC_SLUG;
  if (!slug) throw new Error("Slug não foi definido.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me?slug=${encodeURIComponent(
      slug,
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["myProfile"] },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar usuário.");
  }

  return res.json();
}
