import { Badge } from "@software-factory/ui";
import type { CSSProperties, ReactNode } from "react";

export interface DemoNavigationItem {
  readonly href: string;
  readonly icon?: ReactNode;
  readonly label: string;
}

export interface DemoShellTheme {
  readonly accent: string;
  readonly background: string;
  readonly foreground: string;
  readonly sidebar: string;
  readonly surface: string;
}

export interface DemoShellProps {
  readonly brandMark?: string;
  readonly businessName: string;
  readonly children: ReactNode;
  readonly currentPath?: string;
  readonly demoLabel?: string;
  readonly footerText?: string;
  readonly mobileNavigation?: readonly DemoNavigationItem[];
  readonly mobileOverflowIcon?: ReactNode;
  readonly mobileOverflowLabel?: string;
  readonly mobileOverflowNavigation?: readonly DemoNavigationItem[];
  readonly navigation: readonly DemoNavigationItem[];
  readonly pageTitle: string;
  readonly profileLabel?: string;
  readonly theme?: DemoShellTheme;
}

const defaultTheme: DemoShellTheme = {
  accent: "#b7797d",
  background: "#f8fafc",
  foreground: "#1e293b",
  sidebar: "#0f172a",
  surface: "#ffffff",
};

export function DemoShell({
  brandMark,
  businessName,
  children,
  currentPath,
  demoLabel = "DEMO",
  footerText = "Demo by Software Factory",
  mobileNavigation,
  mobileOverflowIcon,
  mobileOverflowLabel = "Más",
  mobileOverflowNavigation = [],
  navigation,
  pageTitle,
  profileLabel = "Perfil de muestra",
  theme = defaultTheme,
}: DemoShellProps) {
  const style = {
    "--demo-accent": theme.accent,
    "--demo-background": theme.background,
    "--demo-foreground": theme.foreground,
    "--demo-sidebar": theme.sidebar,
    "--demo-surface": theme.surface,
  } as CSSProperties;
  const mobileItems = mobileNavigation ?? navigation;
  const mobileOverflowActive = mobileOverflowNavigation.some((item) => item.href === currentPath);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--demo-background)] text-[var(--demo-foreground)]" style={style}>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-[var(--demo-sidebar)] px-4 py-6 text-white lg:flex">
        <div className="flex items-center gap-3 px-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 font-display text-lg text-[#ead8ce]">
            {brandMark ?? businessName.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold tracking-wide">{businessName}</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Beauty management</p>
          </div>
        </div>

        <div className="my-6 h-px bg-white/10" />

        <nav aria-label="Navegación principal" className="flex-1 space-y-1">
          {navigation.map((item) => {
            const active = item.href === currentPath;
            return (
              <a
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-white/12 font-semibold text-white shadow-sm" : "text-white/60 hover:bg-white/7 hover:text-white"}`}
                href={item.href}
                key={item.href}
              >
                <span className={active ? "text-[#e7c7c4]" : "text-white/45 group-hover:text-white/75"}>{item.icon}</span>
                {item.label}
                {active ? <span className="ml-auto size-1.5 rounded-full bg-[#d9a8a5]" /> : null}
              </a>
            );
          })}
        </nav>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <Badge className="bg-[#ead8ce] text-[#4b3636]">{demoLabel}</Badge>
            <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(110,231,183,0.1)]" />
          </div>
          <p className="mt-3 text-[11px] leading-5 text-white/45">Entorno de demostración</p>
        </div>
        <p className="mt-4 text-center text-[10px] tracking-wide text-white/30">{footerText}</p>
      </aside>

      <div className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[var(--demo-background)]/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-360 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--demo-sidebar)] font-display text-sm text-white lg:hidden">
                {brandMark ?? businessName.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-stone-400">AURA / {pageTitle}</p>
                <h1 className="truncate font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">{pageTitle}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-[#ead8ce] text-[#4b3636] lg:hidden">{demoLabel}</Badge>
              <div className="hidden items-center gap-3 rounded-full border border-stone-200 bg-[var(--demo-surface)] py-1.5 pl-3 pr-1.5 sm:flex">
                <span className="text-xs font-medium text-stone-600">{profileLabel}</span>
                <span className="grid size-8 place-items-center rounded-full bg-[#ead8ce] text-xs font-bold text-[#594142]">AV</span>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-72px)] max-w-360 p-4 pb-32 sm:p-6 sm:pb-32 lg:p-8 lg:pb-10">{children}</main>

        <nav aria-label="Navegación móvil" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-stone-200 bg-[var(--demo-surface)]/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(41,38,35,0.08)] backdrop-blur lg:hidden">
          {mobileItems.map((item) => {
            const active = item.href === currentPath;
            return (
              <a
                aria-current={active ? "page" : undefined}
                className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition ${active ? "bg-[#f4e9e4] text-[#7c5558]" : "text-stone-400"}`}
                href={item.href}
                key={item.href}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            );
          })}
          {mobileOverflowNavigation.length > 0 ? (
            <details className="group relative min-w-0">
              <summary className={`flex cursor-pointer list-none flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition [&::-webkit-details-marker]:hidden ${mobileOverflowActive ? "bg-[#f4e9e4] text-[#7c5558]" : "text-stone-400"}`}>
                <span>{mobileOverflowIcon}</span>
                {mobileOverflowLabel}
              </summary>
              <div className="absolute bottom-full right-0 mb-3 w-56 overflow-hidden rounded-2xl border border-stone-200 bg-[var(--demo-surface)] p-2 shadow-2xl">
                <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[.16em] text-stone-400">Más opciones</p>
                {mobileOverflowNavigation.map((item) => {
                  const active = item.href === currentPath;
                  return <a aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold ${active ? "bg-[#f4e9e4] text-[#7c5558]" : "text-stone-600"}`} href={item.href} key={item.href}><span>{item.icon}</span>{item.label}</a>;
                })}
                <div className="mx-3 my-2 h-px bg-stone-100" />
                <p className="px-3 py-1 text-[10px] text-stone-400">Demo by Software Factory</p>
              </div>
            </details>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
