"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StepService from "./StepService";
import StepProfessional from "./StepProfessional";
import StepDateTime from "./StepDateTime";
import { UserProfile } from "@/src/lib/api/fetchMyProfile";
import { generateConciergeWhatsAppLink } from "@/src/utils/generateConciergeWhatsAppLink";

export interface Service {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  duration?: number;
}

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

interface AppointmentWrapperProps {
  initialServices: any[];
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

  const handleServiceSelect = (service: any) => {
    setSelection((prev) => ({ ...prev, service }));
    setStep(2);
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelection((prev) => ({ ...prev, professional }));
    setStep(3);
  };

  const handleFinish = (dateFormatted: string, hour: string) => {
    const { service, professional } = selection;

    // Gera o link usando a utilidade componentizada externa
    const whatsappUrl = generateConciergeWhatsAppLink({
      service,
      professional,
      user,
      dateFormatted,
      hour,
    });

    if (!whatsappUrl) {
      toast.error("Ocorreu um erro ao gerar o link de agendamento.");
      return;
    }

    toast.success("Horário reservado com sucesso!", {
      description: `Conectando você ao Concierge Lume para finalizar seu agendamento...`,
      duration: 3500,
    });

    setTimeout(() => {
      // 1. Abre o WhatsApp de forma segura e evita bloqueios de pop-up no mobile
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // 2. Redireciona o usuário de volta para a Home do site de forma suave
      router.push("/");
    }, 1200);
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
