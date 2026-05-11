"use client";

import ProfessionalsCard from "./ProfessionalsCard";
import Pagination from "../Pagination";
import { parseProfessionalBio } from "@/src/utils/parseProfessionalBio";

export interface ProfessionalGridItem {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

interface ProfessionalsGridProps {
  teamData: ProfessionalGridItem[];
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
            const { role, bio } = parseProfessionalBio(pro.bio);
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
