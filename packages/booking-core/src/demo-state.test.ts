import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bookingDemoReducer, createBookingDemoState } from "./demo-state";
import { defineBookingScenario, getBookingDetail } from "./scenario";
import { addMinutes, createBookingFromDraft } from "./application";
import type { Booking, BookingScenario } from "./types";

const initialBooking: Booking = {
  customerId: "customer-1",
  end: "2026-09-08T10:00:00",
  id: "booking-1",
  resourceId: "resource-1",
  serviceId: "service-1",
  start: "2026-09-08T09:00:00",
  status: "confirmed",
};

const scenario: BookingScenario = defineBookingScenario({
  bookings: [initialBooking],
  customers: [{ id: "customer-1", name: "Customer One" }],
  id: "neutral-scenario",
  resources: [{ id: "resource-1", name: "Resource One", role: "Primary resource" }],
  schedule: { date: "2026-09-08", endTime: "18:00", resourceIds: ["resource-1"], slotMinutes: 30, startTime: "09:00" },
  services: [{ durationMinutes: 60, id: "service-1", name: "Service One", price: 100 }],
});

describe("Booking Core demo state", () => {
  it("adds minutes and creates a booking from a neutral draft", () => {
    assert.equal(addMinutes("23:30", 45), "24:15");
    const booking = createBookingFromDraft(scenario, { customerId: "customer-1", date: "2026-09-08", resourceId: "resource-1", serviceId: "service-1", startTime: "10:30" }, { initialStatus: "pending" }, "booking-draft");
    assert.equal(booking?.end, "2026-09-08T11:30:00");
    assert.equal(booking?.status, "pending");
  });
  it("resolves a neutral booking detail from scenario references", () => {
    const detail = getBookingDetail(scenario, "booking-1");
    assert.equal(detail?.customer.name, "Customer One");
    assert.equal(detail?.resource.name, "Resource One");
    assert.equal(detail?.service.name, "Service One");
  });

  it("selects and closes a booking detail", () => {
    const initial = createBookingDemoState(scenario);
    const selected = bookingDemoReducer(initial, { bookingId: "booking-1", type: "select_booking" });
    assert.equal(selected.selectedBookingId, "booking-1");
    assert.equal(bookingDemoReducer(selected, { type: "close_detail" }).selectedBookingId, null);
  });

  it("applies a simulated status change without mutating the initial snapshot", () => {
    const initial = createBookingDemoState(scenario);
    const changed = bookingDemoReducer(initial, { bookingId: "booking-1", status: "completed", type: "update_status" });
    assert.equal(changed.bookings[0]?.status, "completed");
    assert.equal(changed.initialBookings[0]?.status, "confirmed");
  });

  it("adds a simulated booking to memory", () => {
    const initial = createBookingDemoState(scenario);
    const created = bookingDemoReducer(initial, { booking: { ...initialBooking, id: "booking-2" }, type: "create_booking" });
    assert.deepEqual(created.bookings.map((booking) => booking.id), ["booking-1", "booking-2"]);
  });

  it("resets bookings, selection and view to the deterministic scenario", () => {
    let state = createBookingDemoState(scenario);
    state = bookingDemoReducer(state, { booking: { ...initialBooking, id: "booking-2" }, type: "create_booking" });
    state = bookingDemoReducer(state, { bookingId: "booking-1", type: "select_booking" });
    state = bookingDemoReducer(state, { type: "set_view", view: "week" });
    state = bookingDemoReducer(state, { type: "reset" });
    assert.deepEqual(state.bookings, [initialBooking]);
    assert.equal(state.selectedBookingId, null);
    assert.equal(state.view, "day");
  });
});
