"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, Info } from "lucide-react";
import fetchServicesByProfessional from "@/src/lib/api/fetchServicesByProfessional";
import fetchAvailabilityByProfessional from "@/src/lib/api/fetchAvailabilityByProfessional";
import {
  daysMapFull,
  formatAvailability,
} from "@/src/utils/formatAvailability";
import { Availability, PublicService } from "@/src/app/interfaces";

interface ProfessionalsCardProps {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  className?: string;
}

export default function ProfessionalsCard({
  id,
  name,
  role,
  image,
  bio,
  className = "",
}: ProfessionalsCardProps) {
  const [services, setServices] = useState<PublicService[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [formattedText, setFormattedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);

        const [sData, aData] = await Promise.all([
          fetchServicesByProfessional(id),
          fetchAvailabilityByProfessional(id),
        ]);

        if (isMounted) {
          setServices(sData);
          setAvailability(aData);
          setFormattedText(formatAvailability(aData));
        }
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className={`flex flex-col space-y-8 max-w-lg ${className}`}>
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-card-secondary shadow-sm">
        <Image
          src={image || "/images/placeholder.png"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000"
          priority
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold-dark">
            {role}
          </span>

          <h3 className="text-4xl font-serif text-foreground tracking-tight">
            {name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground font-light line-clamp-4">
          {bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {!loading &&
            services.map((svc) => (
              <span
                key={svc.id}
                className="px-3 py-1 bg-card-secondary border border-card-border rounded-full text-[9px] font-bold text-muted-foreground uppercase"
              >
                {svc.name}
              </span>
            ))}
        </div>

        <div className="pt-6 border-t border-card-border flex items-center gap-3 relative">
          <Clock className="w-4 h-4 text-muted-foreground/60" />

          <div className="flex-1 space-y-0.5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Disponibilidade
            </p>

            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                {loading ? "Sincronizando..." : formattedText}
              </p>

              {!loading && availability.length > 0 && (
                <div
                  className="relative cursor-help"
                  onMouseEnter={() => setShowDetails(true)}
                  onMouseLeave={() => setShowDetails(false)}
                >
                  <Info className="w-3 h-3 text-brand-gold-dark hover:text-brand-gold transition-colors" />

                  {showDetails && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-card-secondary border border-card-border rounded-xl shadow-xl z-50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark mb-2">
                        Horários Detalhados
                      </p>

                      <div className="space-y-1.5">
                        {availability
                          .sort((a, b) => a.weekday - b.weekday)
                          .map((day) => (
                            <div
                              key={day.id}
                              className="flex justify-between text-[10px] text-muted-foreground"
                            >
                              <span>{daysMapFull[day.weekday]}</span>
                              <span className="font-mono">
                                {day.startTime}-{day.endTime}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
