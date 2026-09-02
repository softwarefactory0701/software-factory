import type { ReactNode } from "react";

export interface StatCardProps {
  readonly detail?: string;
  readonly icon?: ReactNode;
  readonly label: string;
  readonly value: string;
}

export function StatCard({ detail, icon, label, value }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-stone-200/80 bg-[var(--demo-surface,#fff)] p-5 shadow-[0_8px_30px_rgba(50,40,30,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900">{value}</p>
        </div>
        {icon ? <span className="grid size-10 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--demo-accent,#a76f73)_12%,white)] text-[var(--demo-accent,#a76f73)]">{icon}</span> : null}
      </div>
      {detail ? <p className="mt-4 text-xs font-medium text-stone-500">{detail}</p> : null}
    </article>
  );
}
