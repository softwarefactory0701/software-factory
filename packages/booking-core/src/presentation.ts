import type { StatusTone } from "@software-factory/ui";
import type { BookingStatus } from "./types";

export interface BookingStatusPresentation {
  readonly cardClassName: string;
  readonly label: string;
  readonly tone: StatusTone;
}

export type BookingStatusMap = Readonly<Record<BookingStatus, BookingStatusPresentation>>;
