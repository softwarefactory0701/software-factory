import { StatusBadge } from "@software-factory/ui";
import type { ReactNode } from "react";
import type { Booking, BookingScenario, Customer, Resource } from "./types";
import type { BookingStatusMap } from "./presentation";
import {
  bookingTime,
  createTimeSlots,
  getBookingDetailFromBookings,
  getScheduleColumns,
  timeToMinutes,
} from "./scenario";

export interface BookingDayScheduleProps {
  readonly bookings: readonly Booking[];
  readonly onSelectBooking: (bookingId: string) => void;
  readonly resourceNameInBooking?: (resourceName: string) => string;
  readonly renderCustomerAvatar?: (customer: Customer) => ReactNode;
  readonly renderResourceAvatar?: (resource: Resource) => ReactNode;
  readonly scenario: BookingScenario;
  readonly selectLabel: (customerName: string) => string;
  readonly statusPresentation: BookingStatusMap;
}

function DefaultAvatar({ name }: { readonly name: string }) {
  const initials = name.split(" ").slice(0, 2).map((part) => part[0]).join("");
  return <span className="grid size-8 shrink-0 place-items-center rounded-full bg-stone-100 text-[10px] font-semibold text-stone-600">{initials}</span>;
}

export function BookingDaySchedule({
  bookings,
  onSelectBooking,
  resourceNameInBooking = (resourceName) => resourceName,
  renderCustomerAvatar,
  renderResourceAvatar,
  scenario,
  selectLabel,
  statusPresentation,
}: BookingDayScheduleProps) {
  const slots = createTimeSlots(scenario.schedule);
  const columns = getScheduleColumns(scenario, bookings);
  const slotHeight = 52;
  const scheduleHeight = (slots.length - 1) * slotHeight;
  const gridColumns = `4.5rem repeat(${columns.length}, minmax(0, 1fr))`;

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <div className="min-w-240">
          <div className="grid border-b border-stone-100" style={{ gridTemplateColumns: gridColumns }}>
            <div className="border-r border-stone-100" />
            {columns.map(({ resource }) => (
              <div className="flex items-center gap-3 border-r border-stone-100 px-4 py-4 last:border-r-0" key={resource.id}>
                {renderResourceAvatar?.(resource) ?? <DefaultAvatar name={resource.name} />}
                <div><p className="text-sm font-semibold text-stone-800">{resource.name}</p><p className="text-[11px] text-stone-400">{resource.role}</p></div>
              </div>
            ))}
          </div>
          <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
            <div className="relative border-r border-stone-100 bg-stone-50/30" style={{ height: `${scheduleHeight}px` }}>
              {slots.map((slot) => <span className="absolute right-3 -translate-y-1/2 text-[10px] font-medium text-stone-400" key={slot.label} style={{ top: `${slot.index * slotHeight}px` }}>{slot.label}</span>)}
            </div>
            {columns.map(({ bookings: columnBookings, resource }) => (
              <div className="relative border-r border-stone-100 last:border-r-0" key={resource.id} style={{ height: `${scheduleHeight}px` }}>
                {slots.map((slot) => <div className="absolute inset-x-0 border-t border-stone-100" key={slot.label} style={{ top: `${slot.index * slotHeight}px` }} />)}
                {columnBookings.map((booking) => {
                  const detail = getBookingDetailFromBookings(scenario, bookings, booking.id);
                  if (!detail) return null;
                  const startTime = bookingTime(booking.start);
                  const endTime = bookingTime(booking.end);
                  const startOffset = (timeToMinutes(startTime) - timeToMinutes(scenario.schedule.startTime)) / scenario.schedule.slotMinutes;
                  const duration = (timeToMinutes(endTime) - timeToMinutes(startTime)) / scenario.schedule.slotMinutes;
                  const presentation = statusPresentation[booking.status];
                  return (
                    <button
                      aria-label={selectLabel(detail.customer.name)}
                      className={`absolute inset-x-2 overflow-hidden rounded-xl border p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--demo-accent)] ${presentation.cardClassName}`}
                      key={booking.id}
                      onClick={() => onSelectBooking(booking.id)}
                      style={{ height: `${Math.max(duration * slotHeight - 8, 44)}px`, top: `${startOffset * slotHeight + 4}px` }}
                      type="button"
                    >
                      <p className="text-[10px] font-bold text-stone-500">{startTime}—{endTime}</p>
                      <p className="mt-1 truncate text-xs font-semibold text-stone-800">{detail.customer.name}</p>
                      <p className="truncate text-[10px] text-stone-500">{detail.service.name}</p>
                      {duration >= 2.5 ? <StatusBadge className="mt-2" tone={presentation.tone}>{presentation.label}</StatusBadge> : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divide-y divide-stone-100 md:hidden">
        {[...bookings].sort((a, b) => a.start.localeCompare(b.start)).map((booking) => {
          const detail = getBookingDetailFromBookings(scenario, bookings, booking.id);
          if (!detail) return null;
          const presentation = statusPresentation[booking.status];
          return (
            <button className="w-full p-4 text-left transition hover:bg-stone-50" key={booking.id} onClick={() => onSelectBooking(booking.id)} type="button">
              <div className="flex items-start gap-3">
                <div className="w-12 shrink-0"><p className="font-display text-lg font-semibold">{bookingTime(booking.start)}</p><p className="text-[10px] text-stone-400">{bookingTime(booking.end)}</p></div>
                {renderCustomerAvatar?.(detail.customer) ?? <DefaultAvatar name={detail.customer.name} />}
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-stone-800">{detail.customer.name}</p><p className="truncate text-xs text-stone-500">{detail.service.name}</p><p className="mt-1 text-[10px] text-stone-400">{resourceNameInBooking(detail.resource.name)}</p><StatusBadge className="mt-2" tone={presentation.tone}>{presentation.label}</StatusBadge></div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
