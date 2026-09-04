import type {
  Booking,
  BookingDraft,
  BookingScenario,
  BookingStatus,
} from "./types";
import { timeToMinutes } from "./scenario";

export interface BookingCreationDefaults {
  readonly defaultNotes?: string;
  readonly initialStatus: BookingStatus;
}

export function addMinutes(time: string, durationMinutes: number): string {
  const total = timeToMinutes(time) + durationMinutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function createBookingFromDraft(
  scenario: BookingScenario,
  draft: BookingDraft,
  defaults: BookingCreationDefaults,
  id = `booking-demo-${scenario.bookings.length + 1}`,
): Booking | undefined {
  const service = scenario.services.find((item) => item.id === draft.serviceId);
  if (!service) return undefined;
  return {
    customerId: draft.customerId,
    end: `${draft.date}T${addMinutes(draft.startTime, service.durationMinutes)}:00`,
    id,
    metadata: draft.metadata,
    notes: draft.notes ?? defaults.defaultNotes,
    resourceId: draft.resourceId,
    serviceId: draft.serviceId,
    start: `${draft.date}T${draft.startTime}:00`,
    status: defaults.initialStatus,
  };
}
