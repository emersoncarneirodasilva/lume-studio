import { User, Phone, Lock } from "lucide-react";
import { UserProfile } from "@/src/lib/api/fetchMyProfile";
import SubmitButton from "@/src/components/Buttons/SubmitButton";
import { updateUserAction } from "@/src/app/(Pages)/perfil/editar/actions/updateUserAction";

interface EditProfileFormProps {
  user: UserProfile;
  token: string;
}

export default async function EditProfileForm({
  user,
  token,
}: EditProfileFormProps) {
  return (
    <form
      action={updateUserAction}
      className="w-full bg-header-bg/40 backdrop-blur-md border border-card-border rounded-2xl p-8 md:p-10 shadow-2xl transition-all duration-300 space-y-8"
    >
      <input type="hidden" name="token" value={token} />

      {/* Seção 1: Dados Pessoais */}
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-serif text-foreground tracking-wide">
            Dados Pessoais
          </h2>
          <div className="h-px w-full bg-card-border/50" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2"
          >
            <User size={12} className="text-brand-gold-dark" />
            Nome Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name}
            className="w-full border border-card-border rounded-lg px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-gold-dark focus:border-brand-gold-dark focus:outline-none placeholder:text-muted-foreground bg-card-secondary text-foreground transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2"
          >
            <Phone size={12} className="text-brand-gold-dark" />
            Telefone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            defaultValue={user.phone}
            className="w-full border border-card-border rounded-lg px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-gold-dark focus:border-brand-gold-dark focus:outline-none placeholder:text-muted-foreground bg-card-secondary text-foreground transition-all duration-300"
          />
        </div>
      </div>

      {/* Seção 2: Segurança */}
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-serif text-foreground tracking-wide">
            Segurança{" "}
            <span className="text-[10px] tracking-normal font-sans font-normal text-muted-foreground">
              (Opcional)
            </span>
          </h2>
          <div className="h-px w-full bg-card-border/50" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="currentPassword"
            className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2"
          >
            <Lock size={12} className="text-brand-gold-dark" />
            Senha Atual
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            minLength={6}
            placeholder="Confirme sua senha para validar"
            className="w-full border border-card-border rounded-lg px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-gold-dark focus:border-brand-gold-dark focus:outline-none placeholder:text-muted-foreground bg-card-secondary text-foreground transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="newPassword"
            className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2"
          >
            <Lock size={12} className="text-brand-gold-dark" />
            Nova Senha
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            minLength={6}
            placeholder="Deixe em branco para manter a atual"
            className="w-full border border-card-border rounded-lg px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-gold-dark focus:border-brand-gold-dark focus:outline-none placeholder:text-muted-foreground bg-card-secondary text-foreground transition-all duration-300"
          />
        </div>
      </div>

      <div className="pt-4">
        <SubmitButton text="Salvar Alterações" />
      </div>
    </form>
  );
}
