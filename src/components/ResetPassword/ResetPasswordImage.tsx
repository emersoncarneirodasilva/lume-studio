import Image from "next/image";

export default function ResetPasswordImage() {
  return (
    <aside className="relative w-full h-full hidden lg:block overflow-hidden group">
      {/* Degradê linear suave para fundir a foto com o fundo claro do formulário à esquerda */}
      <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent z-10 pointer-events-none w-1/3" />

      {/* Vinheta escura muito sutil nas bordas externas apenas para dar profundidade de estúdio */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 z-10 pointer-events-none" />

      <Image
        src="/images/lume-redefinir-senha.jpg"
        alt="Lume Studio - Redefinição Segura"
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102 group-hover:scale-100"
        priority
      />
    </aside>
  );
}
