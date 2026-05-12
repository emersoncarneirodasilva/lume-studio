export default function PaymentMethodText({ method }: { method?: string }) {
  if (!method)
    return <span className="text-muted-foreground/40">Não informado</span>;

  const labels: Record<string, string> = {
    "A VISTA": "À Vista (Dinheiro / Local)",
    PIX: "Pix",
    "CARTÃO DE CRÉDITO": "Cartão de Crédito",
    "CARTÃO DE DÉBITO": "Cartão de Débito",
    BOLETO: "Boleto",
  };

  return (
    <span className="text-foreground/90 font-medium">
      {labels[method] || method}
    </span>
  );
}
