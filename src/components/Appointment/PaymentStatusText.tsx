export default function PaymentStatusText({
  status,
}: {
  status: "PENDING" | "PAID" | "REFUNDED" | "PARTIALLY_PAID";
}) {
  const styles = {
    PAID: { text: "text-emerald-500", label: "Pago" },
    PENDING: { text: "text-amber-500", label: "Pendente" },
    PARTIALLY_PAID: { text: "text-sky-400", label: "Pago Parcial" },
    REFUNDED: {
      text: "text-muted-foreground/50",
      label: "Reembolsado/Cancelado",
    },
  };

  const current = styles[status] || styles.PENDING;
  return <span className={`font-medium ${current.text}`}>{current.label}</span>;
}
