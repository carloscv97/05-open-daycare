import type { Parent } from "@/lib/mock-kids";
import { KidAvatar } from "./KidAvatar";

const STATUS_STYLES = {
  active: { label: "ACTIVA", className: "bg-success-soft text-success" },
  pending: { label: "PENDIENTE", className: "bg-[#f7e7a6] text-[#9a7b1e]" },
};

function ParentRow({ parent }: { parent: Parent }) {
  const status = STATUS_STYLES[parent.status];
  const relation = parent.relation === "mother" ? "Mamá" : "Papá";
  const statusLabel = parent.status === "active" ? "activa" : "invitación enviada";

  return (
    <div className="flex items-center gap-3">
      <KidAvatar name={parent.name} variant={parent.avatarVariant} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-extrabold text-text">{parent.name}</p>
        <p className="text-[12.5px] text-text-faint">{relation} · {statusLabel}</p>
      </div>
      <span className={`${status.className} shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold`}>{status.label}</span>
    </div>
  );
}

export function LinkedParents({ parents }: { parents: Parent[] }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4.5">
      <h2 className="mb-3.5 text-[12.5px] font-extrabold tracking-[0.8px] text-[#8a7c6d]">PADRES VINCULADOS</h2>
      <div className="flex flex-col gap-3.5">
        {parents.map((parent) => <ParentRow key={parent.name} parent={parent} />)}
        {parents.length === 0 && <p className="text-[14px] text-text-faint">No hay padres vinculados.</p>}
        <button type="button" className="flex items-center gap-3 pt-2 text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#d8cbba] text-[#b0a290]">
            <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="text-[14.5px] font-extrabold text-[#c5503a]">Vincular otro padre</span>
        </button>
      </div>
    </section>
  );
}
