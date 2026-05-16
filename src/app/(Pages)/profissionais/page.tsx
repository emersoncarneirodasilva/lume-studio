import { Metadata } from "next";
import ProfessionalsCTA from "@/src/components/Professionals/ProfessionalsCTA";
import ProfessionalsGrid from "@/src/components/Professionals/ProfessionalsGrid";
import ProfessionalsHero from "@/src/components/Professionals/ProfessionalsHero";
import fetchDetailedProfessionals from "@/src/lib/api/fetchDetailedProfessionals";

export const metadata: Metadata = {
  title: "Nossos Profissionais | Lume Studio",
  description:
    "Conheça os talentos por trás do Lume Studio. Uma equipe selecionada para cuidar de você com exclusividade e alta performance.",
};

export const revalidate = 0;

export default async function ProfessionalsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  // UMA ÚNICA chamada de rede! Traz profissionais, serviços e disponibilidades juntos
  const data = await fetchDetailedProfessionals(page, 4);

  return (
    <main>
      <ProfessionalsHero />

      {/* Passamos os profissionais direto! O 'data.professionals' já está no formato exato 
        que o seu grid espera, sem precisar de nenhum map ou Promise.all na página.
      */}
      <ProfessionalsGrid
        teamData={data.professionals}
        totalPages={data.totalPages}
        currentPage={data.currentPage}
      />

      <ProfessionalsCTA />
    </main>
  );
}
