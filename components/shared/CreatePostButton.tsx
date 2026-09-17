"use client";

export function CreatePostButton({ onCreatePost }: { onCreatePost?: (trigger: HTMLButtonElement) => void }) {
  return <button type="button" onClick={(event) => onCreatePost?.(event.currentTarget)} aria-label="Nueva publicación" aria-haspopup="dialog" className="fixed bottom-20 right-5 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-coral text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)] transition hover:brightness-95 hover:shadow-[0_10px_20px_-8px_rgba(238,129,100,0.9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a] lg:hidden"><svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></button>;
}
