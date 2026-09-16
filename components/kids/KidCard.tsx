import Link from "next/link";
import type { Kid } from "@/lib/mock-kids";
import { KidAvatar } from "./KidAvatar";

export function KidCard({ kid }: { kid: Kid }) {
  const parentLabel = kid.parents.length === 1 ? "1 padre vinculado" : `${kid.parents.length} padres vinculados`;

  return (
    <Link href={`/kids/${kid.slug}`} className="flex min-w-0 items-center gap-3.5 rounded-[18px] border border-border bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition hover:-translate-y-0.5 hover:border-[#f2a78e]">
      <KidAvatar name={kid.name} variant={kid.avatarVariant} />
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-display text-base font-semibold text-text">{kid.name}</h2>
        <p className="text-[13px] text-text-faint">{kid.ageLabel} · {parentLabel}</p>
      </div>
      {kid.listBadge ? (
        <span className="shrink-0 rounded-full bg-coral-soft px-2.5 py-[5px] text-[11px] font-extrabold text-coral-dark">{kid.listBadge}</span>
      ) : (
        <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#cbb89f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}
