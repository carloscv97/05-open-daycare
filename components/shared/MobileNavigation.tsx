"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Feed", icon: "home", href: "/" },
  { label: "Niños", icon: "children", href: "/kids" },
  { label: "Avisos", icon: "bell" },
  { label: "Cuenta", icon: "user" },
];

function NavigationIcon({ icon }: { icon: string }) {
  if (icon === "home") return <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />;
  if (icon === "children") return <><circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" /></>;
  if (icon === "bell") return <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>;
  return <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>;
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex h-16 items-center justify-around border-t border-border bg-surface px-4 lg:hidden" aria-label="Navegación móvil">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : item.href === "/kids" && pathname.startsWith("/kids");
        const className = `flex min-w-12 flex-col items-center gap-0.5 text-xs font-extrabold ${active ? "text-coral-dark" : "text-text-muted"}`;
        const content = <>
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <NavigationIcon icon={item.icon} />
          </svg>
          {item.label}
        </>;

        return item.href ? <Link key={item.label} href={item.href} className={className}>{content}</Link> : <button key={item.label} type="button" className={className}>{content}</button>;
      })}
    </nav>
  );
}
