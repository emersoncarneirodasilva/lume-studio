"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StepService from "./StepService";
import StepProfessional from "./StepProfessional";
import StepDateTime from "./StepDateTime";
import { generateConciergeWhatsAppLink } from "@/src/utils/generateConciergeWhatsAppLink";
import {
  UserProfile,
  Service as ServiceType,
  ProfessionalData as Professional,
} from "@/src/app/interfaces";

interface SelectionState {
  service: ServiceType | null;
  professional: Professional | null;
}

interface AppointmentWrapperProps {
  initialServices: ServiceType[];
  token: string;
  user?: UserProfile | null;
}

export default function AppointmentWrapper({
  initialServices,
  token,
  user,
}: AppointmentWrapperProps) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [selection, setSelection] = useState<SelectionState>({
    service: null,
    professional: null,
  });

  const handleServiceSelect = (service: ServiceType) => {
    setSelection((prev) => ({ ...prev, service }));
    setStep(2);
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelection((prev) => ({ ...prev, professional }));
    setStep(3);
  };

  const handleFinish = (dateFormatted: string, hour: string) => {
    const { service, professional } = selection;

    if (!service || !professional) {
      toast.error("Selecione serviço e especialista antes de finalizar.", {
        duration: 4000,
      });
      return;
    }

    const whatsappUrl = generateConciergeWhatsAppLink({
      service,
      professional,
      user,
      dateFormatted,
      hour,
    });

    if (!whatsappUrl) {
      toast.error("Erro de configuração", {
        description:
          "O canal de agendamentos via WhatsApp está indisponível no momento. Por favor, tente mais tarde.",
        duration: 5000,
      });
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast.success("Horário reservado com sucesso!", {
      description: `Conectando você ao Concierge Lume para finalizar seu agendamento...`,
      duration: 3500,
    });

    setTimeout(() => {
      router.push("/");
    }, 900);
  };

  return (
    <div className="relative w-full">
      {/* PASSO 1: Catálogo Executivo com Dados Reais */}
      {step === 1 && (
        <StepService
          services={initialServices}
          onSelect={handleServiceSelect}
        />
      )}

      {/* PASSO 2: Seleção de Especialistas */}
      {step === 2 && selection.service && (
        <StepProfessional
          serviceId={selection.service.id}
          token={token}
          onSelect={handleProfessionalSelect}
          onBack={() => setStep(1)}
        />
      )}

      {/* PASSO 3: Calendário do Profissional */}
      {step === 3 && selection.professional && (
        <StepDateTime
          professionalId={selection.professional.id}
          professionalName={selection.professional.name}
          token={token}
          onBack={() => setStep(2)}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}
