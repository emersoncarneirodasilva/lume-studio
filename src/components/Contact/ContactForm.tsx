"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    natureza: "",
    prazo: "Próximas semanas",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();

    const numeroTelefone = "5584988599843";

    const texto =
      `*Nova Consulta - Lume Studio*%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Serviço:* ${formData.natureza}%0A` +
      `*Prazo:* ${formData.prazo}%0A%0A` +
      `*Visão Criativa:*%0A${formData.mensagem}`;

    const link = `https://wa.me/${numeroTelefone}?text=${texto}`;

    // 1. Abre o WhatsApp
    window.open(link, "_blank");

    // 2. Dispara o Toast de Sucesso (Estilo Premium)
    toast.success("Solicitação enviada com sucesso!", {
      description: "Iniciando seu atendimento no WhatsApp...",
      duration: 4000,
    });

    // 3. Reseta o formulário
    setFormData({
      nome: "",
      email: "",
      natureza: "",
      prazo: "Próximas semanas",
      mensagem: "",
    });
  };

  return (
    <div
      id="consultoria"
      className="bg-card-primary rounded-lg p-8 md:p-12 shadow-sm border border-card-border transition-colors duration-300 h-full scroll-mt-48"
    >
      {/* Toaster posicionado no canto inferior direito */}
      <Toaster position="bottom-right" richColors closeButton />

      <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-10">
        Inicie sua Consulta
      </h2>

      <form onSubmit={handleWhatsAppSend} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nome */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Julianne Moore"
              className="w-full bg-background border border-card-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-brand-gold-dark transition-colors text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          {/* E-mail */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Endereço de E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="julianne@email.com"
              className="w-full bg-background border border-card-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-brand-gold-dark transition-colors text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Natureza da Consulta */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Natureza da Consulta
            </label>
            <div className="relative">
              <select
                name="natureza"
                required
                value={formData.natureza}
                onChange={handleChange}
                className="w-full bg-background border border-card-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-brand-gold-dark transition-colors text-foreground appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Selecione um serviço...
                </option>

                <optgroup label="Cabelo & Imagem">
                  <option value="Corte e Visagismo">Corte e Visagismo</option>
                  <option value="Mechas e Coloração">Mechas e Coloração</option>
                  <option value="Tratamentos de Luxo">
                    Tratamentos e Nutrição de Luxo
                  </option>
                </optgroup>

                <optgroup label="Corpo & Bem-estar">
                  <option value="Massagem Relaxante">
                    Massagem Relaxante Lume
                  </option>
                  <option value="Drenagem Linfática">Drenagem Linfática</option>
                </optgroup>

                <optgroup label="Estética & Unhas">
                  <option value="Unhas de Gel e Spa">
                    Unhas de Gel e Spa de Mãos
                  </option>
                  <option value="Design de Sobrancelhas">
                    Design de Sobrancelhas & Cílios
                  </option>
                  <option value="Maquiagem Profissional">
                    Maquiagem Profissional
                  </option>
                </optgroup>

                <optgroup label="Momentos Especiais">
                  <option value="Noivas e Eventos">
                    Noivas e Produção de Eventos
                  </option>
                </optgroup>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Expectativa de Prazo */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Expectativa de Prazo
            </label>
            <div className="relative">
              <select
                name="prazo"
                value={formData.prazo}
                onChange={handleChange}
                className="w-full bg-background border border-card-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-brand-gold-dark transition-colors text-foreground appearance-none cursor-pointer"
              >
                <option>Urgente (Esta semana)</option>
                <option>Próximas semanas</option>
                <option>Sem pressa (Planejamento)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Visão Criativa */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Sua Visão Criativa
          </label>
          <textarea
            name="mensagem"
            required
            value={formData.mensagem}
            onChange={handleChange}
            rows={5}
            placeholder="Conte-nos sobre o que você imagina para seu novo visual..."
            className="w-full bg-background border border-card-border rounded-lg px-4 py-4 focus:outline-none focus:border-brand-gold-dark transition-colors text-foreground resize-none placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-5 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-[11px] sm:text-[12px] tracking-[0.2em] transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3"
          >
            <span>solicitar uma consulta</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
