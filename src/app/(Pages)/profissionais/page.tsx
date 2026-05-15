import { Metadata } from "next";
import ProfessionalsCTA from "@/src/components/Professionals/ProfessionalsCTA";
import ProfessionalsGrid from "@/src/components/Professionals/ProfessionalsGrid";
import ProfessionalsHero from "@/src/components/Professionals/ProfessionalsHero";
import fetchProfessionals from "@/src/lib/api/fetchProfessionals";

export const metadata: Metadata = {
  title: "Nossos Profissionais | Lume Studio",
  description:
    "Conheça os talentos por trás do Lume Studio. Uma equipe selecionada para cuidar de você com exclusividade e alta performance.",
};

export default async function ProfessionalsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const data = await fetchProfessionals(page, 4);

  return (
    <main>
      <ProfessionalsHero />

      <ProfessionalsGrid
        teamData={data.professionals}
        totalPages={data.totalPages}
        currentPage={data.currentPage}
      />

      <ProfessionalsCTA />
    </main>
  );
}
