import { Suspense } from "react";
import SuccessToastAutoRedirect from "@/src/components/Success/SuccessToastAutoRedirect";
import LoginForm from "@/src/components/Login/LoginForm";
import LoginImage from "@/src/components/Login/LoginImage";

export const metadata = {
  title: "Lume Studio - Login",
  description: "Página de login do Lume Studio.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center bg-background relative overflow-hidden">
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        {/* Aqui está ele! Por padrão redireciona para a Home ("/") */}
        <SuccessToastAutoRedirect redirectToOnSuccess="/" />

        {/* Lado Esquerdo - Formulário de Login */}
        <LoginForm />
      </Suspense>

      {/* Lado Direito - Imagem Estética (Limpa e integrada ao design) */}
      <LoginImage />
    </main>
  );
}
