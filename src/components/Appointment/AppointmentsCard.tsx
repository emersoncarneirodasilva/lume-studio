import { Calendar, Clock, User, CreditCard, Wallet } from "lucide-react";
import { formatDate, formatDuration, formatTime } from "@/src/utils/dateTime";
import StatusBadge from "./StatusBadge";
import PaymentStatusText from "./PaymentStatusText";
import PaymentMethodText from "./PaymentMethodText";
import { Appointment } from "@/src/lib/api/fetchAppointments";

interface AppointmentsCardProps {
  appointment: Appointment;
}

export default function AppointmentsCard({
  appointment,
}: AppointmentsCardProps) {
  // 1. Calcula o preço final (mantido idêntico)
  const finalPrice = appointment.payment
    ? appointment.payment.amount
    : appointment.services.reduce(
        (acc: number, curr: any) => acc + curr.service.price,
        0,
      );

  // 2. Nova Inteligência de Fallback Baseada no Status do Agendamento
  const getDynamicPaymentStatus = () => {
    // Se existir um pagamento real registrado no banco, ele sempre manda na regra
    if (appointment.payment?.status) {
      return appointment.payment.status;
    }

    // Caso contrário (como no histórico mockado/adaptado), inferimos pelo status do agendamento
    if (appointment.status === "COMPLETED") return "PAID";
    if (appointment.status === "CANCELED") return "REFUNDED";

    // Fallback padrão para agendamentos ativos sem pagamento vinculado ainda
    return "PENDING";
  };

  const paymentStatus = getDynamicPaymentStatus();

  return (
    <div className="bg-card-secondary border border-card-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between space-y-6 hover:border-brand-gold-dark/30 transition-all duration-300">
      {/* Topo do Card: Data, Hora e Status */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-medium text-sm capitalize">
            <Calendar size={14} className="text-brand-gold-dark" />
            {formatDate(appointment.scheduledAt)}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
            <Clock size={14} className="text-muted-foreground/50" />
            Horário: {formatTime(appointment.scheduledAt)}
          </div>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      {/* Serviços Solicitados */}
      <div className="border-t border-b border-card-border/40 py-4 space-y-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 block">
          Serviços & Profissionais
        </span>
        {appointment.services.map((s: any) => (
          <div key={s.id} className="flex justify-between items-center text-sm">
            <div className="space-y-0.5">
              <p className="font-medium text-foreground/90">{s.service.name}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-light">
                <div className="flex items-center gap-1.5">
                  <User size={12} className="text-brand-gold-dark/60" />
                  <span>Profissional: {s.professional.name}</span>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground/60">
                  <Clock size={12} className="text-brand-gold-dark/60" />
                  <span>{formatDuration(s.service.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé do Card */}
      <div className="flex justify-between items-end">
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground/70 font-light">
            <CreditCard
              size={13}
              className="text-muted-foreground/50 transition-colors"
            />
            <span className="min-w-28.75">Status do Pagamento:</span>
            <PaymentStatusText status={paymentStatus} />
          </div>

          {appointment.payment?.method && (
            <div className="flex items-center gap-2 text-muted-foreground/70 font-light">
              <Wallet
                size={13}
                className="text-muted-foreground/50 transition-colors"
              />
              <span className="min-w-28.75">Forma de Retenção:</span>
              <PaymentMethodText method={appointment.payment.method} />
            </div>
          )}
        </div>

        <span className="text-2xl md:text-3xl text-foreground font-semibold tracking-tight">
          {finalPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  );
}
