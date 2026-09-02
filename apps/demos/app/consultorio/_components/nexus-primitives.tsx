import type { HTMLAttributes, ReactNode } from "react";

export function NexusPanel({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-3xl border border-[#dbe3df] bg-[#fffefb] shadow-[0_10px_40px_rgba(38,56,54,.045)] ${className}`} {...props} />;
}

export function NexusPageHeader({ eyebrow, title, description, action }: { readonly action?: ReactNode; readonly description: string; readonly eyebrow: string; readonly title: string }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#347b78]">{eyebrow}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.035em] text-[#263432] sm:text-4xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#71817e]">{description}</p></div>{action}</div>;
}

export function NexusSectionTitle({ title, detail }: { readonly detail?: string; readonly title: string }) {
  return <div><h3 className="text-lg font-semibold tracking-tight text-[#263432]">{title}</h3>{detail ? <p className="mt-1 text-xs text-[#7c8986]">{detail}</p> : null}</div>;
}

export function formatNexusCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", { currency: "ARS", maximumFractionDigits: 0, style: "currency" }).format(value);
}
