"use client";

import { parseProfessionalBio } from "@/src/utils/parseProfessionalBio";
import ProfessionalsCard from "./ProfessionalsCard";
import Pagination from "../Pagination";
// 🔹 Importamos a nova interface global que criamos para o profissional detalhado
import { DetailedProfessional } from "@/src/app/interfaces";

interface ProfessionalsGridProps {
  // 🔥 Substituímos o tipo antigo pelo nosso tipo oficial e profundo vindo do servidor
  teamData: DetailedProfessional[];
  totalPages: number;
  currentPage: number;
}

export default function ProfessionalsGrid({
  teamData,
  totalPages,
  currentPage,
}: ProfessionalsGridProps) {
  return (
    <section
      id="professionals-menu"
      className="pb-40 px-6 md:px-12 bg-background"
    >
      <div className="container-lume">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {teamData.map((pro, index) => {
            // Se o bio vier nulo do banco, tratamos para string vazia para o parser não quebrar
            const { role, bio } = parseProfessionalBio(pro.bio || "");
            const isStaggered = index % 2 !== 0;

            return (
              <ProfessionalsCard
                key={pro.id}
                id={pro.id}
                name={pro.name}
                role={role}
                bio={bio}
                image={pro.avatarUrl || "/images/placeholder-pro.jpg"}
                className={isStaggered ? "md:mt-64" : ""}
                initialServices={pro.services} // 🔹 Injetado instantaneamente sem loaders!
                initialAvailability={pro.availability} // 🔹 Injetado instantaneamente sem loaders!
              />
            );
          })}
        </div>

        <div className="mt-20">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/profissionais"
          />
        </div>
      </div>
    </section>
  );
}
