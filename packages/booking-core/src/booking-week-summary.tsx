import type { ReactNode } from "react";
export interface BookingWeekSummaryItem {
  readonly active?: boolean;
  readonly count: number;
  readonly id: string;
  readonly label: string;
  readonly load?: number;
}
export interface BookingWeekSummaryProps {
  readonly activeClassName: string;
  readonly cardClassName: string;
  readonly className?: string;
  readonly items: readonly BookingWeekSummaryItem[];
  readonly onSelectDay: () => void;
  readonly renderCountLabel: (item: BookingWeekSummaryItem) => ReactNode;
  readonly renderFooter?: (item: BookingWeekSummaryItem) => ReactNode;
}
export function BookingWeekSummary({
  activeClassName,
  cardClassName,
  className = "grid gap-3 p-5 sm:grid-cols-3 lg:grid-cols-6",
  items,
  onSelectDay,
  renderCountLabel,
  renderFooter,
}: BookingWeekSummaryProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <button
          className={`${cardClassName} ${item.active ? activeClassName : ""}`}
          key={item.id}
          onClick={onSelectDay}
          type="button"
        >
          <p className="text-xs font-semibold text-stone-500">{item.label}</p>
          <p className="mt-3 font-display text-3xl font-semibold">
            {item.count}
          </p>
          {renderCountLabel(item)}
          {renderFooter?.(item)}
        </button>
      ))}
    </div>
  );
}
