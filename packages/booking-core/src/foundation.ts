"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createBookingFromDraft as buildBooking,
  type BookingCreationDefaults,
} from "./application";
import { useBookingDemoState } from "./demo-state";
import { getBookingDetailFromBookings } from "./scenario";
import type { BookingDraft, BookingScenario, BookingStatus } from "./types";

export interface BookingFeedbackMessages {
  readonly cancelled?: string;
  readonly completed?: string;
  readonly created?: string;
  readonly reset?: string;
}

export interface UseBookingDemoOptions {
  readonly creationDefaults: BookingCreationDefaults;
  readonly feedbackDuration?: number;
  readonly feedbackMessages?: BookingFeedbackMessages;
  readonly scenario: BookingScenario;
}

export function useBookingDemo({
  creationDefaults,
  feedbackDuration = 2400,
  feedbackMessages,
  scenario,
}: UseBookingDemoOptions) {
  const demo = useBookingDemoState(scenario);
  const [feedback, setFeedback] = useState<string | null>(null);
  useEffect(() => {
    if (!feedback) return undefined;
    const timer = window.setTimeout(() => setFeedback(null), feedbackDuration);
    return () => window.clearTimeout(timer);
  }, [feedback, feedbackDuration]);
  const selectedBooking = demo.state.bookings.find(
    (item) => item.id === demo.state.selectedBookingId,
  );
  const selectedDetail = demo.state.selectedBookingId
    ? getBookingDetailFromBookings(
        scenario,
        demo.state.bookings,
        demo.state.selectedBookingId,
      )
    : undefined;
  const createFromDraft = useCallback(
    (draft: BookingDraft) => {
      const booking = buildBooking(
        scenario,
        draft,
        creationDefaults,
        `booking-demo-${demo.state.bookings.length + 1}`,
      );
      if (!booking) return false;
      demo.createBooking(booking);
      setFeedback(feedbackMessages?.created ?? null);
      return true;
    },
    [creationDefaults, demo, feedbackMessages?.created, scenario],
  );
  const updateSelected = useCallback(
    (status: BookingStatus, message?: string) => {
      if (!demo.state.selectedBookingId) return;
      demo.updateBookingStatus(demo.state.selectedBookingId, status);
      demo.closeDetail();
      setFeedback(message ?? null);
    },
    [demo],
  );
  return {
    bookings: demo.state.bookings,
    cancelSelected: () =>
      updateSelected("cancelled", feedbackMessages?.cancelled),
    closeDetail: demo.closeDetail,
    completeSelected: () =>
      updateSelected("completed", feedbackMessages?.completed),
    createBookingFromDraft: createFromDraft,
    feedback,
    reset: () => {
      demo.resetDemo();
      setFeedback(feedbackMessages?.reset ?? null);
    },
    selectBooking: demo.selectBooking,
    selectedBooking,
    selectedDetail,
    setFeedback,
    setView: demo.setView,
    state: demo.state,
  };
}
