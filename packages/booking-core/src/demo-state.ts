"use client";

import { useReducer } from "react";
import type { Booking, BookingScenario, BookingStatus, BookingView } from "./types";

export interface BookingDemoState {
  readonly bookings: readonly Booking[];
  readonly initialBookings: readonly Booking[];
  readonly selectedBookingId: string | null;
  readonly view: BookingView;
}

export type BookingDemoAction =
  | { readonly bookingId: string; readonly type: "select_booking" }
  | { readonly type: "close_detail" }
  | { readonly booking: Booking; readonly type: "create_booking" }
  | { readonly bookingId: string; readonly status: BookingStatus; readonly type: "update_status" }
  | { readonly type: "reset" }
  | { readonly type: "set_view"; readonly view: BookingView };

export function createBookingDemoState(scenario: BookingScenario): BookingDemoState {
  return {
    bookings: [...scenario.bookings],
    initialBookings: [...scenario.bookings],
    selectedBookingId: null,
    view: "day",
  };
}

export function bookingDemoReducer(state: BookingDemoState, action: BookingDemoAction): BookingDemoState {
  switch (action.type) {
    case "select_booking":
      return { ...state, selectedBookingId: action.bookingId };
    case "close_detail":
      return { ...state, selectedBookingId: null };
    case "create_booking":
      return { ...state, bookings: [...state.bookings.filter((item) => item.id !== action.booking.id), action.booking] };
    case "update_status":
      return {
        ...state,
        bookings: state.bookings.map((booking) => booking.id === action.bookingId ? { ...booking, status: action.status } : booking),
      };
    case "set_view":
      return { ...state, view: action.view };
    case "reset":
      return { ...state, bookings: [...state.initialBookings], selectedBookingId: null, view: "day" };
  }
}

export function useBookingDemoState(scenario: BookingScenario) {
  const [state, dispatch] = useReducer(bookingDemoReducer, scenario, createBookingDemoState);

  return {
    closeDetail: () => dispatch({ type: "close_detail" }),
    createBooking: (booking: Booking) => dispatch({ booking, type: "create_booking" }),
    resetDemo: () => dispatch({ type: "reset" }),
    selectBooking: (bookingId: string) => dispatch({ bookingId, type: "select_booking" }),
    setView: (view: BookingView) => dispatch({ type: "set_view", view }),
    state,
    updateBookingStatus: (bookingId: string, status: BookingStatus) => dispatch({ bookingId, status, type: "update_status" }),
  };
}
