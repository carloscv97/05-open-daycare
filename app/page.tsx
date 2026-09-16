import { FeedComposer } from "@/components/home/FeedComposer";
import { FeedPostCard } from "@/components/home/FeedPostCard";
import { CreatePostButton } from "@/components/feed/CreatePostButton";
import { MobileNavigation } from "@/components/feed/MobileNavigation";
import { Sidebar } from "@/components/feed/Sidebar";
import { feedPosts } from "@/lib/mock-feed";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[760px] px-5 py-8 pb-24 sm:px-10 sm:pt-[34px] sm:pb-20">
          <header className="mb-6">
            <p className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-dark">GUARDERÍA · SALA SOLES</p>
            <h1 className="font-display text-3xl font-semibold text-text">Buenas, Caro</h1>
            <p className="mt-1 text-[14.5px] text-text-muted">12 niños · martes 17 jun</p>
          </header>

          <FeedComposer />

          <div className="mb-3.5 mt-6 flex items-center gap-3.5">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8a7c6d]">PUBLICADO HOY</span>
            <span className="h-px flex-1 bg-[#e7dac8]" />
          </div>

          <section className="flex flex-col gap-4" aria-label="Publicaciones de hoy">
            {feedPosts.map((post) => <FeedPostCard key={post.id} post={post} />)}
          </section>
        </div>
      </main>
      <CreatePostButton />
      <MobileNavigation />
    </div>
  );
}
