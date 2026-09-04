"use client";

import { useState } from "react";
import type { BookingDraft, BookingScenario } from "./types";

export interface BookingCreationFormLabels {
  readonly cancel: string;
  readonly create: string;
  readonly customer: string;
  readonly date: string;
  readonly description?: string;
  readonly eyebrow: string;
  readonly notes?: string;
  readonly resource: string;
  readonly service: string;
  readonly time: string;
  readonly title: string;
}
export interface BookingCreationFormClassNames {
  readonly accentText?: string;
  readonly cancelButton?: string;
  readonly closeButton?: string;
  readonly createButton?: string;
  readonly dialog?: string;
  readonly input?: string;
  readonly label?: string;
  readonly title?: string;
}
export interface BookingCreationFormProps {
  readonly classNames?: BookingCreationFormClassNames;
  readonly defaultCustomerId: string;
  readonly defaultResourceId: string;
  readonly defaultServiceId: string;
  readonly defaultTime: string;
  readonly labels: BookingCreationFormLabels;
  readonly onCancel: () => void;
  readonly onCreate: (draft: BookingDraft) => boolean | void;
  readonly renderAdditionalFields?: (draft: BookingDraft) => React.ReactNode;
  readonly scenario: BookingScenario;
  readonly services?: BookingScenario["services"];
  readonly showNotes?: boolean;
}
export function BookingCreationForm({
  classNames = {},
  defaultCustomerId,
  defaultResourceId,
  defaultServiceId,
  defaultTime,
  labels,
  onCancel,
  onCreate,
  renderAdditionalFields,
  scenario,
  services = scenario.services,
  showNotes = false,
}: BookingCreationFormProps) {
  const [customerId, setCustomerId] = useState(defaultCustomerId);
  const [resourceId, setResourceId] = useState(defaultResourceId);
  const [serviceId, setServiceId] = useState(defaultServiceId);
  const [startTime, setStartTime] = useState(defaultTime);
  const [notes, setNotes] = useState("");
  const draft: BookingDraft = {
    customerId,
    date: scenario.schedule.date,
    notes: notes || undefined,
    resourceId,
    serviceId,
    startTime,
  };
  const input =
    classNames.input ??
    "mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal";
  const label = classNames.label ?? "text-xs font-semibold text-stone-600";
  return (
    <div
      aria-labelledby="new-booking-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div
        className={`w-full max-w-lg rounded-3xl bg-[var(--demo-surface,#fff)] p-5 shadow-2xl sm:p-7 ${classNames.dialog ?? ""}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[.18em] text-[var(--demo-accent)] ${classNames.accentText ?? ""}`}
            >
              {labels.eyebrow}
            </p>
            <h2
              className={`mt-2 font-display text-3xl font-semibold ${classNames.title ?? ""}`}
              id="new-booking-title"
            >
              {labels.title}
            </h2>
            {labels.description ? (
              <p className="mt-1 text-sm text-stone-500">
                {labels.description}
              </p>
            ) : null}
          </div>
          <button
            aria-label="Cerrar"
            className={`grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-500 ${classNames.closeButton ?? ""}`}
            onClick={onCancel}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className={label}>
            {labels.customer}
            <select
              className={input}
              onChange={(e) => setCustomerId(e.target.value)}
              value={customerId}
            >
              {scenario.customers.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            {labels.resource}
            <select
              className={input}
              onChange={(e) => setResourceId(e.target.value)}
              value={resourceId}
            >
              {scenario.resources.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>
          <label className={`${label} sm:col-span-2`}>
            {labels.service}
            <select
              className={input}
              onChange={(e) => setServiceId(e.target.value)}
              value={serviceId}
            >
              {services.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name} · {x.durationMinutes} min
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            {labels.date}
            <input
              className={input}
              readOnly
              type="date"
              value={scenario.schedule.date}
            />
          </label>
          <label className={label}>
            {labels.time}
            <input
              className={input}
              onChange={(e) => setStartTime(e.target.value)}
              type="time"
              value={startTime}
            />
          </label>
          {showNotes ? (
            <label className={`${label} sm:col-span-2`}>
              {labels.notes ?? "Notas"}
              <textarea
                className={input}
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
            </label>
          ) : null}
          {renderAdditionalFields?.(draft)}
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            className={`px-4 py-2.5 text-sm font-semibold text-stone-500 ${classNames.cancelButton ?? ""}`}
            onClick={onCancel}
            type="button"
          >
            {labels.cancel}
          </button>
          <button
            className={`rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white ${classNames.createButton ?? ""}`}
            onClick={() => {
              if (onCreate(draft) !== false) onCancel();
            }}
            type="button"
          >
            {labels.create}
          </button>
        </div>
      </div>
    </div>
  );
}
