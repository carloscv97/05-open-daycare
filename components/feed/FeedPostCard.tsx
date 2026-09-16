import type { FeedPost } from "@/lib/mock-feed";

import { Avatar } from "./Avatar";
import { PostTypeBadge } from "./PostTypeBadge";

export function FeedPostCard({ post }: { post: FeedPost }) {
  const isAnnouncement = post.type === "announcement";

  return (
    <article className="rounded-[20px] border border-border bg-surface px-5 py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)] sm:px-[22px]">
      <div className="mb-3.5 flex items-center gap-3">
        <Avatar name={post.author} variant={isAnnouncement ? "announcement" : "child"} />
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[16.5px] font-semibold text-text">{post.author}</h2>
          <p className="text-[12.5px] text-text-faint">{post.time} · publicado por vos</p>
        </div>
        <PostTypeBadge type={post.type} />
      </div>

      <p className="mb-2.5 text-[12.5px] text-text-faint">Para: {post.audience}</p>
      <p className="text-[15.5px] leading-[1.55] text-text-body">{post.body}</p>

      {post.hasPhoto && (
        <div className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#dbcdba] bg-[#f4ece1] text-[#b0a290]">
          <svg aria-hidden="true" className="h-[30px] w-[30px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <span className="text-[13.5px]">Foto · pintando con témperas</span>
        </div>
      )}

      <footer className="mt-4 flex items-center gap-[18px] border-t border-border-subtle pt-3.5 text-sm font-bold">
        <span className="flex items-center gap-1.5 text-coral">
          <svg aria-hidden="true" className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {post.likes}
        </span>
        <span className="flex items-center gap-1.5 text-text-muted">
          <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </svg>
          {post.comments}
        </span>
        <span className="flex-1" />
        <span className="text-coral-dark">Editar</span>
      </footer>
    </article>
  );
}
