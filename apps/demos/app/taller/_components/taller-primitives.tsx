import type { HTMLAttributes, ReactNode } from "react";

export function TallerPanel({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-[#d9d8d2] bg-[#fffefa] shadow-[0_10px_35px_rgba(31,35,32,.045)] ${className}`} {...props} />;
}

export function TallerPageHeader({ eyebrow, title, description, action }: { readonly action?: ReactNode; readonly description: string; readonly eyebrow: string; readonly title: string }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">{eyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-[-.035em] text-[#202321] sm:text-4xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">{description}</p></div>{action}</div>;
}

export function TallerSectionTitle({ title, detail }: { readonly detail?: string; readonly title: string }) {
  return <div><h3 className="text-lg font-bold tracking-tight text-[#252925]">{title}</h3>{detail ? <p className="mt-1 text-xs text-stone-500">{detail}</p> : null}</div>;
}

export function formatTallerCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", { currency: "ARS", maximumFractionDigits: 0, style: "currency" }).format(value);
}

export function vehicleInitials(model: string) {
  return model.split(" ").slice(0, 2).map((part) => part[0]).join("");
}
