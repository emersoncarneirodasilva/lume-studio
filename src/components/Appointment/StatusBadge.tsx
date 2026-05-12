import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<
    string,
    { bg: string; text: string; label: string; icon: any }
  > = {
    PENDING: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      label: "Aguardando",
      icon: Clock,
    },
    CONFIRMED: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      label: "Confirmado",
      icon: CheckCircle2,
    },
    COMPLETED: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      label: "Concluído",
      icon: CheckCircle2,
    },
    CANCELED: {
      bg: "bg-rose-500/10",
      text: "text-rose-500",
      label: "Cancelado",
      icon: XCircle,
    },
  };

  const current = styles[status] || styles.PENDING;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${current.bg} ${current.text}`}
    >
      <Icon size={12} />
      {current.label}
    </span>
  );
}
