"use client";

import { StatusBadge } from "@software-factory/ui";
import { useEffect, type ReactNode } from "react";
import type { BookingDetail, BookingTerminology, Customer } from "./types";
import type { BookingStatusMap } from "./presentation";
import { bookingTime } from "./scenario";

export interface BookingDetailDrawerLabels {
  readonly cancel: string;
  readonly close: string;
  readonly complete: string;
  readonly disclaimer: string;
  readonly edit: string;
  readonly eyebrow: string;
  readonly notes: string;
  readonly price: string;
  readonly status: string;
  readonly time: string;
}

export interface BookingDetailDrawerProps {
  readonly customerSecondaryText?: string;
  readonly detail?: BookingDetail;
  readonly formatPrice: (price: number) => string;
  readonly labels: BookingDetailDrawerLabels;
  readonly notes?: string;
  readonly onCancel: () => void;
  readonly onClose: () => void;
  readonly onComplete: () => void;
  readonly onEdit: () => void;
  readonly renderCustomerAvatar?: (customer: Customer) => ReactNode;
  readonly statusPresentation: BookingStatusMap;
  readonly terminology: BookingTerminology;
}

export function BookingDetailDrawer({
  customerSecondaryText,
  detail,
  formatPrice,
  labels,
  notes,
  onCancel,
  onClose,
  onComplete,
  onEdit,
  renderCustomerAvatar,
  statusPresentation,
  terminology,
}: BookingDetailDrawerProps) {
  useEffect(() => {
    if (!detail) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [detail, onClose]);

  if (!detail) return null;
  const presentation = statusPresentation[detail.booking.status];
  const fields = [
    { label: terminology.customer, value: detail.customer.name },
    { label: terminology.service, value: detail.service.name },
    { label: terminology.resource, value: detail.resource.name },
    { label: labels.time, value: `${bookingTime(detail.booking.start)}—${bookingTime(detail.booking.end)}` },
    { label: labels.price, value: detail.service.price === undefined ? "—" : formatPrice(detail.service.price) },
    { label: labels.status, value: presentation.label },
  ];

  return (
    <div aria-labelledby="booking-detail-title" aria-modal="true" className="fixed inset-0 z-50 bg-stone-950/35 backdrop-blur-[2px]" role="dialog">
      <button aria-label={labels.close} className="absolute inset-0 size-full cursor-default" onClick={onClose} type="button" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-[var(--demo-surface,#fff)] p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[var(--demo-accent)]">{labels.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-semibold" id="booking-detail-title">{detail.customer.name}</h2><p className="mt-1 text-sm text-stone-500">{detail.service.name}</p></div>
          <button aria-label={labels.close} autoFocus className="grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-500" onClick={onClose} type="button">×</button>
        </div>

        <div className="mt-7 flex items-center gap-3 rounded-2xl bg-stone-50 p-4">{renderCustomerAvatar?.(detail.customer)}<div><p className="text-sm font-semibold text-stone-800">{detail.customer.name}</p>{customerSecondaryText ? <p className="text-xs text-stone-400">{customerSecondaryText}</p> : null}</div><StatusBadge className="ml-auto" tone={presentation.tone}>{presentation.label}</StatusBadge></div>

        <dl className="mt-6 divide-y divide-stone-100 border-y border-stone-100">
          {fields.map((item) => <div className="flex items-center justify-between gap-4 py-3.5" key={item.label}><dt className="text-xs font-semibold text-stone-400">{item.label}</dt><dd className="text-right text-sm font-medium text-stone-700">{item.value}</dd></div>)}
        </dl>

        {notes ? <div className="mt-6 rounded-2xl border border-[color-mix(in_srgb,var(--demo-accent)_25%,white)] bg-[color-mix(in_srgb,var(--demo-accent)_6%,white)] p-4"><p className="text-xs font-semibold text-[var(--demo-accent)]">{labels.notes}</p><p className="mt-2 text-sm leading-6 text-stone-600">{notes}</p></div> : null}

        <div className="mt-auto space-y-2 pt-8">
          <button className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white" onClick={onEdit} type="button">{labels.edit}</button>
          <button className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" onClick={onComplete} type="button">{labels.complete}</button>
          <button className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-red-600" onClick={onCancel} type="button">{labels.cancel}</button>
          <p className="pt-2 text-center text-[10px] text-stone-400">{labels.disclaimer}</p>
        </div>
      </aside>
    </div>
  );
}
