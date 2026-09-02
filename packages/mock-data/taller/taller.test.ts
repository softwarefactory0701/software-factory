import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { tallerAppointments, tallerClients, tallerMechanics, tallerServices, tallerVehicles, tallerWorkOrders } from "./index";

const hasId = (items: readonly { readonly id: string }[], id: string) => items.some((item) => item.id === id);

describe("Taller deterministic scenario", () => {
  it("keeps customers, vehicles, orders and bookings referentially coherent", () => {
    for (const vehicle of tallerVehicles) assert.equal(hasId(tallerClients, vehicle.clientId), true);

    for (const order of tallerWorkOrders) {
      const vehicle = tallerVehicles.find((item) => item.id === order.vehicleId);
      assert.equal(vehicle?.clientId, order.clientId);
      assert.equal(hasId(tallerClients, order.clientId), true);
      assert.equal(hasId(tallerMechanics, order.mechanicId), true);
      assert.equal(order.serviceIds.every((id) => hasId(tallerServices, id)), true);
    }

    for (const booking of tallerAppointments) {
      const vehicle = tallerVehicles.find((item) => item.id === booking.vehicleId);
      assert.equal(vehicle?.clientId, booking.customerId);
      assert.equal(hasId(tallerClients, booking.customerId), true);
      assert.equal(hasId(tallerMechanics, booking.resourceId), true);
      assert.equal(hasId(tallerServices, booking.serviceId), true);
      assert.equal(booking.orderId ? hasId(tallerWorkOrders, booking.orderId) : true, true);
    }
  });
});
