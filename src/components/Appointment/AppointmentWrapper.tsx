"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import StepService from "./StepService";
import StepProfessional from "./StepProfessional";
import StepDateTime from "./StepDateTime";
import { Service } from "@/src/lib/api/fetchServices";

export interface Professional {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string | null;
}

interface SelectionState {
  service: Service | null;
  professional: Professional | null;
}

const LUME_CONCIERGE_PHONE = "84988599843";

interface AppointmentWrapperProps {
  initialServices: Service[];
  token: string; // 🌟 1. Recebe o token vindo com segurança do Server Component (page.tsx)
}

export default function AppointmentWrapper({
  initialServices,
  token, // 🌟 2. Desestrutura a nova prop
}: AppointmentWrapperProps) {
  const [step, setStep] = useState<number>(1);
  const [selection, setSelection] = useState<SelectionState>({
    service: null,
    professional: null,
  });

  const handleServiceSelect = (service: Service) => {
    setSelection((prev) => ({ ...prev, service }));
    setStep(2);
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelection((prev) => ({ ...prev, professional }));
    setStep(3);
  };

  const handleFinish = (dateFormatted: string, hour: string) => {
    const { service, professional } = selection;

    const formattedPrice = service?.price
      ? service.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "";

    toast.success("Horário reservado com sucesso!", {
      description: `Encaminhando você para o Concierge Lume...`,
      duration: 4000,
    });

    const msg =
      `*SOLICITAÇÃO DE AGENDAMENTO | LUME STUDIO*\n\n` +
      `Olá. Selecionei um serviço através do site e desejo confirmar minha reserva:\n\n` +
      `*Serviço:* ${service?.name}\n` +
      `*Valor:* ${formattedPrice}\n` +
      `*Especialista:* ${professional?.name}\n` +
      `*Data:* ${dateFormatted}\n` +
      `*Horário:* ${hour}\n\n` +
      `Aguardo as instruções para finalização do agendamento.`;

    setTimeout(() => {
      window.open(
        `https://wa.me/55${LUME_CONCIERGE_PHONE}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    }, 800);
  };

  return (
    <div className="relative w-full">
      <Toaster position="bottom-right" richColors closeButton />

      {/* PASSO 1: Catálogo Executivo com Dados Reais */}
      {step === 1 && (
        <StepService
          services={initialServices}
          onSelect={handleServiceSelect}
        />
      )}

      {/* PASSO 2: Seleção de Especialistas filtrados por serviço via API */}
      {step === 2 && selection.service && (
        <StepProfessional
          serviceId={selection.service.id}
          token={token} // 🌟 3. Injeta o token com segurança no fetch do cliente
          onSelect={handleProfessionalSelect}
          onBack={() => setStep(1)}
        />
      )}

      {/* PASSO 3: Calendário Limpo do Profissional */}
      {step === 3 && selection.professional && (
        <StepDateTime
          professionalId={selection.professional.id}
          professionalName={selection.professional.name}
          onBack={() => setStep(2)}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}
