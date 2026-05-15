import {
  Service,
  Professional,
} from "@/src/components/Appointment/AppointmentWrapper";
import { UserProfile } from "@/src/lib/api/fetchMyProfile";
import { formatDuration } from "@/src/utils/formatDuration";

interface GenerateMessageProps {
  service: Service | null;
  professional: Professional | null;
  user: UserProfile | null | undefined;
  dateFormatted: string;
  hour: string;
}

export function generateConciergeWhatsAppLink(
  props: GenerateMessageProps,
): string | null {
  const { service, professional, user, dateFormatted, hour } = props;
  const phone = process.env.NEXT_PUBLIC_PHONE;

  if (!phone) {
    console.error("Erro: NEXT_PUBLIC_PHONE não configurado no .env");
    return null;
  }

  const duration = formatDuration(service?.duration ?? 0);
  const formattedPrice = service?.price
    ? service.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "";

  const msg =
    `*SOLICITAÇÃO DE AGENDAMENTO | LUME STUDIO*\n\n` +
    `Olá! Gostaria de confirmar o meu agendamento realizado através do site:\n\n` +
    `*MEUS DADOS*\n` +
    `*Nome:* ${user?.name || "Não informado"}\n` +
    `*E-mail:* ${user?.email || "Não informado"}\n` +
    `*Telefone:* ${user?.phone || "Não informado"}\n\n` +
    `*DETALHES DO AGENDAMENTO*\n` +
    `*Serviço:* ${service?.name || "Não informado"}\n` +
    `*Duração:* ${duration}\n` +
    `*Valor:* ${formattedPrice}\n` +
    `*Especialista:* ${professional?.name || "Não informado"}\n` +
    `*Data:* ${dateFormatted}\n` +
    `*Horário:* ${hour}\n\n` +
    `Fico no aguardo das instruções para a finalização do meu atendimento. Obrigado!`;

  return `https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`;
}
