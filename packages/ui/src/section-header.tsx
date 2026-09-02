import type { ReactNode } from "react";

export interface SectionHeaderProps {
  readonly action?: ReactNode;
  readonly description?: string;
  readonly eyebrow?: string;
  readonly title: string;
}

export function SectionHeader({ action, description, eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--demo-accent,#a76f73)]">{eyebrow}</p> : null}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
