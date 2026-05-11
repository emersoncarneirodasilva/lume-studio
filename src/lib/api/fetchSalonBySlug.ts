export async function fetchSalonBySlug() {
  const slug = process.env.NEXT_PUBLIC_SLUG;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salons/${slug}`, {
    method: "GET",
    next: { tags: ["salon"] },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Erro ao buscar dados do salão:", errorData);
    throw new Error("Salão não encontrado.");
  }

  return await res.json();
}
