import type {
  Booking,
  BookingDetail,
  BookingScenario,
  BookingSchedule,
  ScheduleColumn,
  TimeSlot,
} from "./types";

export function defineBookingScenario<const TScenario extends BookingScenario>(scenario: TScenario): TScenario {
  return scenario;
}

export function getBookingDetail(scenario: BookingScenario, bookingId: string): BookingDetail | undefined {
  const booking = scenario.bookings.find((item) => item.id === bookingId);
  if (!booking) return undefined;

  const customer = scenario.customers.find((item) => item.id === booking.customerId);
  const resource = scenario.resources.find((item) => item.id === booking.resourceId);
  const service = scenario.services.find((item) => item.id === booking.serviceId);
  if (!customer || !resource || !service) return undefined;

  return { booking, customer, resource, service };
}

export function getBookingDetailFromBookings(
  scenario: BookingScenario,
  bookings: readonly Booking[],
  bookingId: string,
): BookingDetail | undefined {
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking) return undefined;

  const customer = scenario.customers.find((item) => item.id === booking.customerId);
  const resource = scenario.resources.find((item) => item.id === booking.resourceId);
  const service = scenario.services.find((item) => item.id === booking.serviceId);
  if (!customer || !resource || !service) return undefined;

  return { booking, customer, resource, service };
}

export function getScheduleColumns(
  scenario: BookingScenario,
  bookings: readonly Booking[] = scenario.bookings,
): readonly ScheduleColumn[] {
  return scenario.schedule.resourceIds.flatMap((resourceId) => {
    const resource = scenario.resources.find((item) => item.id === resourceId);
    if (!resource) return [];
    return [{ resource, bookings: bookings.filter((booking) => booking.resourceId === resourceId) }];
  });
}

export function createTimeSlots(schedule: BookingSchedule): readonly TimeSlot[] {
  const start = timeToMinutes(schedule.startTime);
  const end = timeToMinutes(schedule.endTime);
  const slots: TimeSlot[] = [];

  for (let minutes = start, index = 0; minutes <= end; minutes += schedule.slotMinutes, index += 1) {
    slots.push({ index, label: minutesToTime(minutes), minutesFromStart: minutes - start });
  }

  return slots;
}

export function bookingTime(isoDateTime: string): string {
  return isoDateTime.slice(11, 16);
}

export function timeToMinutes(time: string): number {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function minutesToTime(totalMinutes: number): string {
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`;
}
