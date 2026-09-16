import type { PostType } from "@/lib/mock-feed";

const badgeStyles: Record<PostType, { label: string; color: string; background: string }> = {
  achievement: { label: "LOGRO", color: "text-success", background: "bg-success-soft" },
  activity: { label: "ACTIVIDAD", color: "text-[#2e89a6]", background: "bg-[#c7e7f1]" },
  announcement: { label: "ANUNCIO", color: "text-info", background: "bg-info-soft" },
};

export function PostTypeBadge({ type }: { type: PostType }) {
  const badge = badgeStyles[type];

  return (
    <span className={`${badge.background} ${badge.color} inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold tracking-[0.5px]`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {badge.label}
    </span>
  );
}
