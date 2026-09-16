import { Avatar } from "@/components/shared/Avatar";

export function FeedComposer() {
  return (
    <button type="button" className="flex w-full items-center gap-3.5 rounded-[18px] border border-border bg-surface px-[18px] py-3.5 text-left shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]">
      <Avatar name="Caro Giménez" variant="teacher" size="sm" />
      <span className="flex-1 text-[15px] text-text-faint">Compartí un momento...</span>
      <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-coral-soft text-coral" aria-hidden="true">
        <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>
    </button>
  );
}
