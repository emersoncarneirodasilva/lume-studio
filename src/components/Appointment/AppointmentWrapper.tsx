"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import StepService from "./StepService";
import StepProfessional from "./StepProfessional";
import StepDateTime from "./StepDateTime";

// --- INTERFACES ---
export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  imageUrl?: string | null;
  category: { name: string };
}

export interface Professional {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string | null;
  email?: string;
  phone?: string;
}

export interface ProfessionalWithAvailability extends Professional {
  disponibilidade: {
    dia: string;
    horas: string[];
  }[];
}

interface SelectionState {
  service: Service | null;
  professional: Professional | null;
  fullProfessionalData: ProfessionalWithAvailability | null;
}

const LUME_CONCIERGE_PHONE = "84988599843";

// --- COMPONENTE ---

interface AppointmentWrapperProps {
  initialServices: Service[];
}

export default function AppointmentWrapper({
  initialServices,
}: AppointmentWrapperProps) {
  const [step, setStep] = useState<number>(1);
  const [selection, setSelection] = useState<SelectionState>({
    service: null,
    professional: null,
    fullProfessionalData: null,
  });

  // Funções de navegação
  const handleServiceSelect = (service: Service) => {
    setSelection((prev) => ({ ...prev, service }));
    setStep(2);
  };

  const handleProfessionalSelect = (pro: Professional) => {
    setSelection((prev) => ({ ...prev, professional: pro }));
    setStep(3);
  };

  const handleFinish = (day: string, hour: string) => {
    const { service, professional } = selection;

    const formattedPrice = service?.price
      ? service.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "";

    // 1. Dispara o Toast de Sucesso
    toast.success("Horário selecionado com sucesso!", {
      description: `Iniciando seu agendamento com ${professional?.name}...`,
      duration: 4000,
    });

    const msg =
      `*SOLICITAÇÃO DE AGENDAMENTO | LUME STUDIO*\n\n` +
      `Olá. Selecionei um serviço através do site e desejo confirmar minha reserva:\n\n` +
      `*Serviço:* ${service?.name}\n` +
      `*Valor:* ${formattedPrice}\n` +
      `*Especialista:* ${professional?.name}\n` +
      `*Data:* ${day}\n` +
      `*Horário:* ${hour}\n\n` +
      `Aguardo as instruções para finalização do agendamento.`;

    // 2. Abre o WhatsApp após um micro-delay para o usuário ver o Toast
    setTimeout(() => {
      window.open(
        `https://wa.me/55${LUME_CONCIERGE_PHONE}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    }, 800);
  };

  return (
    <div className="relative">
      {/* Toaster posicionado para o fluxo de agendamento */}
      <Toaster position="bottom-right" richColors closeButton />

      {/* PASSO 1: Escolha do Serviço */}
      {step === 1 && (
        <StepService
          services={initialServices}
          onSelect={handleServiceSelect}
        />
      )}

      {/* PASSO 2: Escolha do Profissional */}
      {step === 2 && selection.service && (
        <StepProfessional
          serviceId={selection.service.id}
          onSelect={handleProfessionalSelect}
          onBack={() => setStep(1)}
        />
      )}

      {/* PASSO 3: Escolha de Data/Hora */}
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
