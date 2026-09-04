import type { ReactNode } from "react";
import type {
  BookingDetail,
  BookingSchedule,
  BookingTerminology,
  Customer,
  Resource,
} from "./types";
import type { BookingCreationDefaults } from "./application";
import type { BookingStatusMap } from "./presentation";

export interface BookingVerticalConfig {
  readonly creationDefaults: BookingCreationDefaults;
  readonly labels?: Readonly<Record<string, string>>;
  readonly schedule: BookingSchedule;
  readonly statusPresentation: BookingStatusMap;
  readonly terminology: BookingTerminology;
}

export interface BookingPresentationAdapter {
  readonly bookingSubtitle?: (detail: BookingDetail) => string;
  readonly bookingTitle?: (detail: BookingDetail) => string;
  readonly customerSecondaryText?: (
    detail: BookingDetail,
  ) => string | undefined;
  readonly notes?: (detail: BookingDetail) => string | undefined;
  readonly renderBookingMetadata?: (detail: BookingDetail) => ReactNode;
  readonly renderCustomerAvatar?: (customer: Customer) => ReactNode;
  readonly renderResourceAvatar?: (resource: Resource) => ReactNode;
  readonly secondaryMetadata?: (detail: BookingDetail) => string | undefined;
}
