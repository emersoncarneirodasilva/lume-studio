import { Suspense } from "react";
import EditProfileFeedback from "@/src/components/Edit/EditProfileFeedback";
import RegisterForm from "@/src/components/Register/RegisterForm";
import ReigsterImage from "@/src/components/Register/RegisterImage";

export const metadata = {
  title: "Lume Studio - Cadastro",
  description: "Crie sua conta exclusiva no Lume Studio.",
};

export default function RegisterPage() {
  const uniqueKey = `${Date.now()}`;

  return (
    // Corrigido: Usando items-stretch para garantir que os dois lados fiquem 100% colados no topo e no rodapé
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch bg-background relative overflow-hidden">
      {/* Componente que escuta os erros (?error=...) na URL e exibe o Sonner */}
      <Suspense fallback={null} key={uniqueKey}>
        <EditProfileFeedback />
      </Suspense>

      {/* Lado Esquerdo - Formulário de Cadastro */}
      <RegisterForm />

      {/* Lado Direito - Imagem Estética (Perfeitamente alinhada no topo e rodapé) */}
      <ReigsterImage />
    </main>
  );
}
