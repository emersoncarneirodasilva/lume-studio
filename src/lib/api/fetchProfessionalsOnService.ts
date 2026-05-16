import { ProfessionalOnService } from "@/src/app/interfaces";

export default async function fetchProfessionalsOnService(
  token: string,
  serviceId: string,
): Promise<ProfessionalOnService[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/professionals-on-service/user/${serviceId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["professionals-on-service"] },
  });

  if (!res.ok) {
    let errorMessage = "Erro ao buscar profissionais vinculados ao serviço.";
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
      // Fallback seguro caso o backend quebre
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
