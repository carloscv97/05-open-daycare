export function KidAlerts({ alertNote }: { alertNote?: string }) {
  if (!alertNote) {
    return (
      <section className="flex gap-3.5 rounded-2xl bg-[#fff3e9] p-4 text-[#8a6b50]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#f8d6bb] text-[#ad7352]">
          <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-extrabold">Alergias y notas</h2>
          <p className="mt-0.5 text-[14.5px] leading-6">No hay alergias ni notas registradas.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex gap-3.5 rounded-2xl bg-[#fbdad6] p-4 text-[#b25249]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#f4a8a0] text-white">
        <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      </div>
      <div>
        <h2 className="text-[15px] font-extrabold text-[#c5413a]">Alergias y notas</h2>
        <p className="mt-0.5 text-[14.5px] leading-6">{alertNote}</p>
      </div>
    </section>
  );
}
