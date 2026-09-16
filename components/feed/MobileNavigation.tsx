const items = ["Feed", "Niños", "Avisos", "Cuenta"];

export function MobileNavigation() {
  return <nav className="fixed inset-x-0 bottom-0 z-10 flex h-16 items-center justify-around border-t border-border bg-surface px-4 lg:hidden" aria-label="Navegación móvil">{items.map((item) => <button key={item} type="button" className={`text-xs font-extrabold ${item === "Feed" ? "text-coral-dark" : "text-text-muted"}`}>{item}</button>)}</nav>;
}
