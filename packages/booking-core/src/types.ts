export type BookingStatus = "confirmed" | "pending" | "in_progress" | "completed" | "cancelled";
export type BookingView = "day" | "week";
export type EntityMetadata = Readonly<Record<string, unknown>>;

export interface Customer {
  readonly id: string;
  readonly metadata?: EntityMetadata;
  readonly name: string;
}

export interface Resource {
  readonly id: string;
  readonly metadata?: EntityMetadata;
  readonly name: string;
  readonly role: string;
}

export interface Service {
  readonly durationMinutes: number;
  readonly id: string;
  readonly metadata?: EntityMetadata;
  readonly name: string;
  readonly price?: number;
}

export interface Booking {
  readonly customerId: string;
  readonly end: string;
  readonly id: string;
  readonly notes?: string;
  readonly resourceId: string;
  readonly serviceId: string;
  readonly start: string;
  readonly status: BookingStatus;
}

export interface BookingTerminology {
  readonly booking: string;
  readonly bookings: string;
  readonly customer: string;
  readonly customers: string;
  readonly resource: string;
  readonly resources: string;
  readonly service: string;
  readonly services: string;
}

export interface BookingSchedule {
  readonly date: string;
  readonly endTime: string;
  readonly resourceIds: readonly string[];
  readonly slotMinutes: number;
  readonly startTime: string;
}

export interface BookingScenario {
  readonly bookings: readonly Booking[];
  readonly customers: readonly Customer[];
  readonly id: string;
  readonly resources: readonly Resource[];
  readonly schedule: BookingSchedule;
  readonly services: readonly Service[];
}

export interface TimeSlot {
  readonly index: number;
  readonly label: string;
  readonly minutesFromStart: number;
}

export interface ScheduleColumn {
  readonly bookings: readonly Booking[];
  readonly resource: Resource;
}

export interface BookingDetail {
  readonly booking: Booking;
  readonly customer: Customer;
  readonly resource: Resource;
  readonly service: Service;
}
