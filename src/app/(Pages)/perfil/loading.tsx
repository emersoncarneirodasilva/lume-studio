export default function ProfileLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        <div className="w-10 h-10 border-2 border-brand-gold-dark border-b-transparent rounded-full animate-spin" />

        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold-dark animate-pulse">
          Sincronizando seu perfil Lume...
        </span>
      </div>
    </div>
  );
}
