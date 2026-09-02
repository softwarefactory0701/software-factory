export type BookingStatus = "confirmed" | "pending" | "in-service" | "completed" | "cancelled";

export interface Resource {
  readonly id: string;
  readonly name: string;
}

export interface Customer {
  readonly id: string;
  readonly name: string;
}

export interface Service {
  readonly durationMinutes: number;
  readonly id: string;
  readonly name: string;
}

export interface Booking {
  readonly customerId: string;
  readonly endsAt: string;
  readonly id: string;
  readonly resourceId: string;
  readonly serviceId: string;
  readonly startsAt: string;
  readonly status: BookingStatus;
}

export interface BookingCoreLabels {
  readonly booking: string;
  readonly bookingPlural: string;
  readonly customer: string;
  readonly resource: string;
  readonly service: string;
}
