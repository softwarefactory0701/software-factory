import type { BookingView } from "./types";

export interface BookingViewToolbarLabels {
  readonly create: string;
  readonly day: string;
  readonly reset: string;
  readonly today: string;
  readonly week: string;
}

export interface BookingViewToolbarProps {
  readonly labels: BookingViewToolbarLabels;
  readonly onCreate: () => void;
  readonly onReset: () => void;
  readonly onViewChange: (view: BookingView) => void;
  readonly view: BookingView;
}

export function BookingViewToolbar({ labels, onCreate, onReset, onViewChange, view }: BookingViewToolbarProps) {
  const [createPrefix, ...createRest] = labels.create.split(" ");
  const compactCreateLabel = createRest.join(" ") || createPrefix;

  return (
    <div className="flex flex-col items-stretch justify-between gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:px-5">
      <div className="flex rounded-xl bg-stone-100 p-1">
        {(["day", "week"] as const).map((option) => (
          <button
            aria-pressed={view === option}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${view === option ? "bg-white text-stone-900 shadow-sm" : "text-stone-400"}`}
            key={option}
            onClick={() => onViewChange(option)}
            type="button"
          >
            {option === "day" ? labels.day : labels.week}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-start">
        <button className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600" onClick={() => onViewChange("day")} type="button">{labels.today}</button>
        <button className="rounded-xl px-2 py-2 text-[11px] font-semibold text-stone-400 transition hover:text-stone-700" onClick={onReset} type="button">↺ {labels.reset}</button>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#292623] px-3 py-2 text-xs font-semibold text-white shadow-sm sm:px-4" onClick={onCreate} type="button">
          <span aria-hidden="true" className="text-base leading-none">+</span>
          <span>{createRest.length > 0 ? <span className="hidden sm:inline">{createPrefix} </span> : null}{compactCreateLabel}</span>
        </button>
      </div>
    </div>
  );
}
