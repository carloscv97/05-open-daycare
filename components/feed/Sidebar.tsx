import { Avatar } from "./Avatar";

const navigation = [
  { label: "Feed", icon: "home", active: true },
  { label: "Niños", icon: "children" },
  { label: "Avisos", icon: "bell" },
  { label: "Mi cuenta", icon: "user" },
];

function NavigationIcon({ icon }: { icon: string }) {
  if (icon === "home") return <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />;
  if (icon === "children") return <><circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" /></>;
  if (icon === "bell") return <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>;
  return <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>;
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
      <div className="flex items-center gap-[11px] px-2 pb-[22px] pt-1">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-gradient-to-br from-[#f8c3a8] to-[#f2937a] text-white">
          <svg aria-hidden="true" className="h-[21px] w-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </div>
        <div><p className="font-display text-[17px] font-semibold leading-none text-text">OpenDayCare</p><p className="mt-0.5 text-[11.5px] text-text-faint">Sala Soles</p></div>
      </div>
      <button type="button" className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] px-3 py-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]">
        <svg aria-hidden="true" className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>Nueva publicación
      </button>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Navegación principal">
        {navigation.map((item) => <button key={item.label} type="button" className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-left text-[14.5px] ${item.active ? "bg-coral-soft font-extrabold text-coral-dark" : "font-semibold text-[#6e6359]"}`}>
          <svg aria-hidden="true" className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><NavigationIcon icon={item.icon} /></svg>{item.label}
        </button>)}
      </nav>
      <div className="mt-2.5 border-t border-border pt-3.5"><div className="flex items-center gap-[11px] px-2 py-1.5"><Avatar name="Caro Giménez" variant="teacher" size="sm" /><div className="min-w-0 flex-1"><p className="text-sm font-extrabold text-text">Caro Giménez</p><p className="text-xs text-text-faint">Maestra · Soles</p></div><span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-canvas text-text-muted"><svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg></span></div></div>
    </aside>
  );
}
