"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function SubmitButton({ text }: { text?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-8 py-4 rounded-lg bg-linear-to-r from-brand-gold-dark to-brand-gold-light text-white font-bold uppercase text-xs tracking-widest transition-all duration-700 hover:brightness-110 hover:shadow-gold hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          Conectando...
        </span>
      ) : (
        text || "Entrar"
      )}
    </button>
  );
}
