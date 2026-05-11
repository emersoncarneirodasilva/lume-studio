import ProfessionalsCTA from "@/src/components/Professionals/ProfessionalsCTA";
import ProfessionalsGrid from "@/src/components/Professionals/ProfessionalsGrid";
import ProfessionalsHero from "@/src/components/Professionals/ProfessionalsHero";
import fetchProfessionals from "@/src/lib/api/fetchProfessionals";

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
