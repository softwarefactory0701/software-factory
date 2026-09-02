import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { nexusAppointments, nexusConsultations, nexusPatients, nexusProfessionals, nexusServices } from "./index";

const hasId = (items: readonly { readonly id: string }[], id: string) => items.some((item) => item.id === id);

describe("Consultorio administrative scenario", () => {
  it("keeps patients, professionals, services and consultations coherent", () => {
    for (const booking of nexusAppointments) {
      assert.equal(hasId(nexusPatients, booking.customerId), true);
      assert.equal(hasId(nexusProfessionals, booking.resourceId), true);
      assert.equal(hasId(nexusServices, booking.serviceId), true);
      assert.equal(nexusConsultations.some((item) => item.bookingId === booking.id), true);
    }
  });

  it("does not contain prohibited clinical record concepts", () => {
    const serialized = JSON.stringify({ nexusConsultations, nexusPatients }).toLowerCase();
    for (const term of ["diagnóstico", "enfermedad", "medicamento", "receta", "laboratorio", "historia clínica", "expediente clínico"]) assert.equal(serialized.includes(term), false);
  });
});
