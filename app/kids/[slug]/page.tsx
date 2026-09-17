import Link from "next/link";
import { notFound } from "next/navigation";
import { KidAlerts } from "@/components/kids/KidAlerts";
import { KidAvatar } from "@/components/kids/KidAvatar";
import { KidProfileDetails } from "@/components/kids/KidProfileDetails";
import { LinkedParents } from "@/components/kids/LinkedParents";
import { MobileNavigation } from "@/components/shared/MobileNavigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { getKidBySlug } from "@/lib/mock-kids";

export default async function KidProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kid = getKidBySlug(slug);

  if (!kid) notFound();

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[820px] px-5 py-8 pb-24 sm:px-10 sm:pt-[34px] sm:pb-20">
          <Link href="/kids" className="mb-5 inline-flex items-center gap-[7px] text-sm font-bold text-text-muted transition hover:text-text">
            <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a Niños
          </Link>

          <div className="flex flex-col gap-[18px] lg:flex-row lg:gap-[26px]">
            <section className="flex min-w-0 flex-1 flex-col gap-[18px]">
              <header className="flex flex-wrap items-center gap-[18px]">
                <KidAvatar name={kid.name} variant={kid.avatarVariant} size="lg" />
                <div className="min-w-0 flex-1">
                  <h1 className="font-display text-[28px] font-semibold text-text">{kid.name}</h1>
                  <p className="mt-[3px] text-[15px] text-text-muted">{kid.ageLabel} · Sala {kid.room}</p>
                </div>
                <button type="button" className="rounded-xl border border-border bg-surface px-4 py-[9px] text-sm font-bold text-[#6e6359]">Editar</button>
              </header>

              <KidAlerts alertNote={kid.alertNote} />
              <KidProfileDetails kid={kid} />
            </section>

            <aside className="flex w-full shrink-0 flex-col gap-3.5 lg:w-[300px]">
              <button type="button" className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-text py-[13px] text-[15px] font-extrabold text-white">
                <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                Resumen del día
              </button>
              <LinkedParents kidName={kid.name} parents={kid.parents} />
            </aside>
          </div>
        </div>
      </main>
      <MobileNavigation />
    </div>
  );
}
