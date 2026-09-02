"use client";

import { BookingDaySchedule, BookingDetailDrawer, BookingViewToolbar, getBookingDetailFromBookings, useBookingDemoState, type Booking, type BookingDetail, type BookingStatusMap, type Customer, type Resource } from "@software-factory/booking-core";
import { tallerAppointments, tallerBookingScenario, tallerClients, tallerMechanics, tallerServices, tallerVehicles } from "@software-factory/mock-data/taller";
import { tallerVertical } from "@software-factory/verticals/taller";
import { useState } from "react";
import { TallerPanel, formatTallerCurrency } from "../_components/taller-primitives";

const statusPresentation: BookingStatusMap = {
  cancelled: { cardClassName: "border-red-200 bg-red-50", label: "Cancelado", tone: "danger" },
  completed: { cardClassName: "border-stone-200 bg-stone-100", label: "Finalizado", tone: "neutral" },
  confirmed: { cardClassName: "border-emerald-200 bg-emerald-50", label: "Confirmado", tone: "success" },
  in_progress: { cardClassName: "border-amber-300 bg-amber-50", label: "En trabajo", tone: "warning" },
  pending: { cardClassName: "border-sky-200 bg-sky-50", label: "Por recibir", tone: "info" },
};

function mechanicAvatar(resource: Resource) {
  const mechanic = tallerMechanics.find((item) => item.id === resource.id);
  return <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#272b28] text-[10px] font-black text-amber-200">{mechanic?.avatar ?? "TG"}</span>;
}

function customerAvatar(customer: Customer) {
  return <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-[10px] font-black text-amber-800">{customer.name.split(" ").map((word) => word[0]).slice(0,2).join("")}</span>;
}

function appointmentVehicle(detail: BookingDetail) {
  const appointment = tallerAppointments.find((item) => item.id === detail.booking.id);
  return appointment ? tallerVehicles.find((item) => item.id === appointment.vehicleId) : undefined;
}

function addMinutes(time: string, minutes: number) {
  const [hours = 0, mins = 0] = time.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function TallerAgendaExperience() {
  const { state, closeDetail, createBooking, resetDemo, selectBooking, setView, updateBookingStatus } = useBookingDemoState(tallerBookingScenario);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState<string>(tallerClients[0].id);
  const [resourceId, setResourceId] = useState<string>(tallerMechanics[0].id);
  const [serviceId, setServiceId] = useState<string>(tallerServices[0].id);
  const [time, setTime] = useState("17:30");
  const selectedDetail = state.selectedBookingId ? getBookingDetailFromBookings(tallerBookingScenario, state.bookings, state.selectedBookingId) : undefined;
  const selectedClient = selectedDetail ? tallerClients.find((item) => item.id === selectedDetail.customer.id) : undefined;
  const selectedVehicle = selectedDetail ? appointmentVehicle(selectedDetail) : undefined;

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2400);
  }

  function createDemoBooking() {
    const service = tallerServices.find((item) => item.id === serviceId)!;
    const vehicle = tallerVehicles.find((item) => item.clientId === customerId) ?? tallerVehicles[0];
    const booking: Booking = { customerId, end: `${tallerBookingScenario.schedule.date}T${addMinutes(time, service.durationMinutes)}:00`, id: "turno-demo", notes: `${vehicle.model} · ${vehicle.plate} · ${vehicle.mileage.toLocaleString("es-AR")} km`, resourceId, serviceId, start: `${tallerBookingScenario.schedule.date}T${time}:00`, status: "pending" };
    createBooking(booking); setModalOpen(false); showFeedback("Turno de demostración creado");
  }

  function updateSelected(status: "completed" | "cancelled", message: string) {
    if (state.selectedBookingId) updateBookingStatus(state.selectedBookingId, status);
    closeDetail(); showFeedback(message);
  }

  return <>
    <TallerPanel className="taller-agenda overflow-hidden">
      <BookingViewToolbar labels={{ create: "Nuevo turno", day: "Día", reset: "Reset demo", today: "Hoy", week: "Semana" }} onCreate={() => setModalOpen(true)} onReset={() => { resetDemo(); showFeedback("Demo restaurada al escenario inicial"); }} onViewChange={setView} view={state.view} />
      {state.view === "week" ? <div className="grid gap-3 p-5 sm:grid-cols-3 lg:grid-cols-6">{[9,12,10,14,13,7].map((jobs, index) => <button className={`rounded-xl border p-4 text-left ${index === 1 ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white"}`} key={index} onClick={() => setView("day")} type="button"><p className="text-xs font-bold text-stone-500">{["Lun 7","Mar 8","Mié 9","Jue 10","Vie 11","Sáb 12"][index]}</p><p className="mt-3 text-3xl font-black">{jobs}</p><p className="text-[10px] text-stone-400">vehículos</p></button>)}</div> : <BookingDaySchedule bookings={state.bookings} onSelectBooking={selectBooking} renderBookingMetadata={(detail) => { const vehicle = appointmentVehicle(detail); return vehicle ? <span className="taller-booking-primary">{vehicle.model} · <span className="font-mono">{vehicle.plate}</span></span> : <span className="taller-booking-primary">{detail.booking.notes}</span>; }} renderCustomerAvatar={customerAvatar} renderResourceAvatar={mechanicAvatar} resourceNameInBooking={(name) => `Asignado a ${name}`} scenario={tallerBookingScenario} selectLabel={(name) => `Ver turno de ${name}`} statusPresentation={statusPresentation} />}
    </TallerPanel>

    <BookingDetailDrawer customerSecondaryText={selectedClient?.phone} detail={selectedDetail} formatPrice={formatTallerCurrency} labels={{ cancel: "Cancelar turno", close: "Cerrar detalle", complete: "Marcar finalizado", disclaimer: "Acciones simuladas · No se guardan cambios", edit: "Editar turno", eyebrow: "Detalle operativo · Demo", notes: "Vehículo y orden", price: "Precio base", status: "Estado", time: "Horario" }} notes={selectedVehicle ? `${selectedVehicle.model} ${selectedVehicle.year} · ${selectedVehicle.plate} · ${selectedVehicle.mileage.toLocaleString("es-AR")} km${tallerAppointments.find((item) => item.id === selectedDetail?.booking.id)?.orderId ? ` · ${tallerAppointments.find((item) => item.id === selectedDetail?.booking.id)?.orderId?.toUpperCase()}` : ""}` : selectedDetail?.booking.notes} onCancel={() => updateSelected("cancelled", "Turno cancelado en la demo")} onClose={closeDetail} onComplete={() => updateSelected("completed", "Trabajo marcado como finalizado")} onEdit={() => { closeDetail(); showFeedback("Edición simulada"); }} renderCustomerAvatar={customerAvatar} statusPresentation={statusPresentation} terminology={tallerVertical.terminology} />

    {feedback ? <div className="fixed bottom-24 right-4 z-60 rounded-xl bg-[#202321] px-4 py-3 text-sm font-bold text-white shadow-xl lg:bottom-6">{feedback}</div> : null}
    {modalOpen ? <div aria-labelledby="new-taller-booking" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-stone-950/50 p-4 backdrop-blur-sm" role="dialog"><div className="w-full max-w-lg rounded-2xl bg-[#fffefa] p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700">Acción simulada</p><h2 className="mt-2 text-2xl font-black" id="new-taller-booking">Nuevo turno de taller</h2></div><button aria-label="Cerrar" className="grid size-9 place-items-center rounded-full bg-stone-100" onClick={() => setModalOpen(false)} type="button">×</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold text-stone-600">Cliente<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 font-normal" onChange={(event) => setCustomerId(event.target.value)} value={customerId}>{tallerClients.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="text-xs font-bold text-stone-600">Mecánico<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 font-normal" onChange={(event) => setResourceId(event.target.value)} value={resourceId}>{tallerMechanics.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="text-xs font-bold text-stone-600 sm:col-span-2">Servicio<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 font-normal" onChange={(event) => setServiceId(event.target.value)} value={serviceId}>{tallerServices.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.durationMinutes} min</option>)}</select></label><label className="text-xs font-bold text-stone-600">Fecha<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 font-normal" readOnly type="date" value={tallerBookingScenario.schedule.date}/></label><label className="text-xs font-bold text-stone-600">Hora<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 font-normal" onChange={(event) => setTime(event.target.value)} type="time" value={time}/></label></div><div className="mt-7 flex justify-end gap-3"><button className="px-4 py-2 text-sm font-bold text-stone-500" onClick={() => setModalOpen(false)} type="button">Cancelar</button><button className="rounded-xl bg-[#202321] px-5 py-2.5 text-sm font-bold text-white" onClick={createDemoBooking} type="button">Crear turno demo</button></div></div></div> : null}
  </>;
}
