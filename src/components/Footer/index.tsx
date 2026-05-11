import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { name: "INÍCIO", path: "/" },
    { name: "SERVIÇOS", path: "/servicos" },
    { name: "PROFISSIONAIS", path: "/profissionais" },
    { name: "SOBRE", path: "/sobre" },
    { name: "CONTATO", path: "/contato" },
  ];

  const socialLinks = [
    { name: "INSTAGRAM", url: "#" },
    { name: "FACEBOOK", url: "#" },
    { name: "LINKEDIN", url: "#" },
  ];

  return (
    <footer className="bg-(--footer-bg) text-foreground pt-16 pb-8 px-6 md:px-12">
      <div className="container-lume">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1: Logo e Descrição */}
          <div className="flex flex-col items-center md:items-start gap-6 lg:mr-12">
            <Image
              src="/images/logo.png"
              alt="Lume Studio Logo"
              width={80}
              height={40}
              className="h-auto opacity-90"
            />
            <p className="text-sm leading-relaxed text-(--footer-text-muted) max-w-xs text-center md:text-left">
              Moldando a beleza com precisão e sensibilidade artística, em cada
              detalhe.
            </p>
          </div>

          {/* Coluna 2: Navegação Dinâmica */}
          <div>
            <h4 className="text-nav-active text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Navegação
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-(--footer-text-muted)">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="hover:text-nav-active transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Conecte-se Dinâmico */}
          <div>
            <h4 className="text-nav-active text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Conecte-se
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-(--footer-text-muted)">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-nav-active transition-colors"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 className="text-nav-active text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Contato
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-(--footer-text-muted)">
              <li className="uppercase tracking-wide">
                Avenida Qualquer, 0000
                <br />
                Natal, RN
              </li>
              <li className="mt-2 font-medium text-foreground">
                <a
                  href="tel:+5584000000000"
                  className="hover:text-nav-active transition-colors"
                >
                  +55 (84) 00000-0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="pt-8 border-t border-(--header-border) flex justify-start">
          <p className="text-[10px] md:text-xs tracking-[0.15em] text-(--footer-text-muted) uppercase">
            © {currentYear} Lume Studio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
