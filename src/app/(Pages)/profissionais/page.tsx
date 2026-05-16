import { Metadata } from "next";
import ProfessionalsCTA from "@/src/components/Professionals/ProfessionalsCTA";
import ProfessionalsGrid from "@/src/components/Professionals/ProfessionalsGrid";
import ProfessionalsHero from "@/src/components/Professionals/ProfessionalsHero";
import fetchProfessionals from "@/src/lib/api/fetchProfessionals";
import fetchServicesByProfessional from "@/src/lib/api/fetchServicesByProfessional";
import fetchAvailabilityByProfessional from "@/src/lib/api/fetchAvailabilityByProfessional";

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

  const data = await fetchProfessionals(page, 4);

  // A DIFERENÇA CORRIGIDA: Criamos um array de promises flat e disparamos absolutamente TUDO ao mesmo tempo
  const professionalsWithDetails = await Promise.all(
    data.professionals.map((pro) =>
      Promise.all([
        fetchServicesByProfessional(pro.id),
        fetchAvailabilityByProfessional(pro.id),
      ]).then(([services, availability]) => ({
        ...pro,
        services,
        availability,
      })),
    ),
  );

  return (
    <main>
      <ProfessionalsHero />

      <ProfessionalsGrid
        teamData={professionalsWithDetails}
        totalPages={data.totalPages}
        currentPage={data.currentPage}
      />

      <ProfessionalsCTA />
    </main>
  );
}
