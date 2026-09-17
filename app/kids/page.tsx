import { AddKidDialog } from "@/components/kids/AddKidDialog";
import { KidCard } from "@/components/kids/KidCard";
import { MobileNavigation } from "@/components/shared/MobileNavigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { kids } from "@/lib/mock-kids";

export default function KidsPage() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[880px] px-5 py-8 pb-24 sm:px-10 sm:pt-[34px] sm:pb-20">
          <header className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-dark">GESTIÓN</p>
              <h1 className="font-display text-3xl font-semibold text-text">Niños</h1>
            </div>
            <AddKidDialog />
          </header>

          <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-border bg-surface px-4 py-3">
            <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#b0a290]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input aria-label="Buscar niño" placeholder="Buscar niño…" className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-text placeholder:text-[#b6a99b] outline-none" />
          </div>

          <div className="mb-3.5 flex items-center gap-3">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-text">SALA SOLES</span>
            <span className="text-[13px] text-text-faint">8 niños</span>
            <span className="h-px flex-1 bg-[#e7dac8]" />
          </div>

          <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2" aria-label="Niños de Sala Soles">
            {kids.map((kid) => <KidCard key={kid.slug} kid={kid} />)}
          </section>
        </div>
      </main>
      <MobileNavigation />
    </div>
  );
}
