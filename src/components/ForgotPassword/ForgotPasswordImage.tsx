import Image from "next/image";

export default function ForgotPasswordImage() {
  return (
    <aside className="relative w-full h-full hidden lg:block overflow-hidden group">
      {/* Degradê linear suave */}
      <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent z-10 pointer-events-none w-1/3" />

      {/* Vinheta escura */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 z-10 pointer-events-none" />

      <Image
        src="/images/lume-esqueci-senha.jpg"
        alt="Lume Studio - Recuperação de Acesso"
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102 group-hover:scale-100"
        priority
      />
    </aside>
  );
}
