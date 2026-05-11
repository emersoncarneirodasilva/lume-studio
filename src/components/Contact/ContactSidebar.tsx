import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import fetchImagesByType from "@/src/lib/api/fetchImagesByType";

export default async function ContactSidebar() {
  const imagesData = await fetchImagesByType("Fachada Lume Studio");

  const imagemFachadaLumeStudio =
    imagesData["Fachada Lume Studio"]?.[0] ?? null;

  return (
    <aside className="w-full flex flex-col h-full gap-6">
      {/* CARD DE INFORMAÇÕES */}
      <div className="bg-card-secondary rounded-lg p-10 space-y-10 border border-card-border/50 shadow-inner-sm">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-foreground">Nosso Estúdio</h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 text-brand-gold-dark shadow-sm border border-card-border/50">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Localização
                </p>
                <p className="text-foreground text-sm font-light leading-relaxed">
                  Avenida Qualquer, 000
                  <br />
                  Natal-RN
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 text-brand-gold-dark shadow-sm border border-card-border/50">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Informações
                </p>
                <a
                  href="tel:+5584000000000"
                  className="hover:text-nav-active transition-colors"
                >
                  +55 (84) 00000-0000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 text-brand-gold-dark shadow-sm border border-card-border/50">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  E-mail Direto
                </p>
                <p className="text-foreground text-sm font-light hover:text-brand-gold-dark transition-colors">
                  <a
                    href="mailto:contato@lumestudio.com"
                    className="hover:text-brand-gold-dark transition-colors"
                  >
                    contato@lumestudio.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-card-border/50">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Redes Sociais
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-sm text-foreground/80 hover:text-brand-gold-dark hover:underline underline-offset-4 transition-all"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground/80 hover:text-brand-gold-dark hover:underline underline-offset-4 transition-all"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground/80 hover:text-brand-gold-dark hover:underline underline-offset-4 transition-all"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      {/* IMAGEM DA FACHADA - flex-1 faz com que ela preencha o espaço até o final horizontal do Form */}
      <div className="relative flex-1 min-h-75 rounded-lg overflow-hidden shadow-sm border border-card-border/50">
        <Image
          src={imagemFachadaLumeStudio?.url || "/images/lume-facade.jpg"}
          alt="Lume Studio Exterior"
          fill
          className="object-cover"
        />
      </div>
    </aside>
  );
}
