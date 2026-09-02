"use client";

import {
  BookingDaySchedule,
  BookingDetailDrawer,
  BookingViewToolbar,
  getBookingDetailFromBookings,
  useBookingDemoState,
  type Booking,
  type BookingStatus,
  type BookingStatusMap,
  type Customer,
  type Resource,
} from "@software-factory/booking-core";
import {
  beautyBookingScenario,
  beautyClients,
  beautyProfessionals,
  beautyServices,
} from "@software-factory/mock-data/beauty";
import { beautyVertical } from "@software-factory/verticals/beauty";
import { useState } from "react";
import { BeautyAvatar, BeautyPanel } from "../_components/beauty-primitives";
import { formatCurrency, getBeautyClient } from "../_components/beauty-utils";

const statusPresentation: BookingStatusMap = {
  cancelled: { cardClassName: "border-red-200 bg-red-50/90", label: "Cancelado", tone: "danger" },
  completed: { cardClassName: "border-stone-200 bg-stone-100/90", label: "Finalizado", tone: "neutral" },
  confirmed: { cardClassName: "border-emerald-200 bg-emerald-50/90", label: "Confirmado", tone: "success" },
  in_progress: { cardClassName: "border-sky-200 bg-sky-50/90", label: "En servicio", tone: "info" },
  pending: { cardClassName: "border-amber-200 bg-amber-50/90", label: "Pendiente", tone: "warning" },
};

const weekSummary = [
  { day: "Lun 7", load: 72, total: 10 },
  { day: "Mar 8", load: 87, total: 14 },
  { day: "Mié 9", load: 76, total: 12 },
  { day: "Jue 10", load: 91, total: 16 },
  { day: "Vie 11", load: 96, total: 18 },
  { day: "Sáb 12", load: 83, total: 15 },
] as const;

function customerAvatar(customer: Customer) {
  const beautyCustomer = getBeautyClient(customer.id);
  return <BeautyAvatar initials={beautyCustomer?.avatar ?? customer.name.slice(0, 2)} name={customer.name} size="sm" />;
}

function resourceAvatar(resource: Resource) {
  const professional = beautyProfessionals.find((item) => item.id === resource.id);
  return <BeautyAvatar initials={professional?.avatar ?? resource.name.slice(0, 2)} name={resource.name} size="sm" />;
}

function addMinutes(time: string, durationMinutes: number): string {
  const [hours = "0", minutes = "0"] = time.split(":");
  const total = Number(hours) * 60 + Number(minutes) + durationMinutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function AgendaExperience() {
  const { closeDetail, createBooking, resetDemo, selectBooking, setView, state, updateBookingStatus } = useBookingDemoState(beautyBookingScenario);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [newCustomerId, setNewCustomerId] = useState<string>(beautyClients[0].id);
  const [newResourceId, setNewResourceId] = useState<string>(beautyProfessionals[2].id);
  const [newServiceId, setNewServiceId] = useState<string>(beautyServices[1].id);
  const [newTime, setNewTime] = useState("10:30");
  const selectedDetail = state.selectedBookingId
    ? getBookingDetailFromBookings(beautyBookingScenario, state.bookings, state.selectedBookingId)
    : undefined;
  const selectedBeautyClient = selectedDetail ? getBeautyClient(selectedDetail.customer.id) : undefined;

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 3000);
  }

  function simulateBooking() {
    const service = beautyServices.find((item) => item.id === newServiceId);
    if (!service) return;
    const booking: Booking = {
      customerId: newCustomerId,
      end: `${beautyBookingScenario.schedule.date}T${addMinutes(newTime, service.durationMinutes)}:00`,
      id: "turno-demo-creado",
      notes: "Turno creado durante la demostración.",
      resourceId: newResourceId,
      serviceId: newServiceId,
      start: `${beautyBookingScenario.schedule.date}T${newTime}:00`,
      status: "pending",
    };
    createBooking(booking);
    setModalOpen(false);
    showFeedback("Turno de demostración creado ✓");
  }

  function simulateStatus(status: BookingStatus, message: string) {
    if (!selectedDetail) return;
    updateBookingStatus(selectedDetail.booking.id, status);
    closeDetail();
    showFeedback(message);
  }

  function handleReset() {
    resetDemo();
    showFeedback("Demo restaurada al escenario inicial ✓");
  }

  return (
    <>
      <BeautyPanel className="overflow-hidden">
        <BookingViewToolbar
          labels={{ create: "Nuevo turno", day: "Día", reset: "Reset demo", today: "Hoy", week: "Semana" }}
          onCreate={() => setModalOpen(true)}
          onReset={handleReset}
          onViewChange={setView}
          view={state.view}
        />

        {state.view === "week" ? (
          <div className="p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
              {weekSummary.map((day) => (
                <button className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${day.day === "Mar 8" ? "border-[#c99b99] bg-[#f7ebe7]" : "border-stone-200 bg-[#fffdf9]"}`} key={day.day} onClick={() => setView("day")} type="button">
                  <p className="text-xs font-semibold text-stone-500">{day.day}</p><p className="mt-3 font-display text-3xl font-semibold text-stone-900">{day.total}</p><p className="text-xs text-stone-400">turnos</p>
                  <div className="mt-4 h-1.5 rounded-full bg-stone-100"><div className="h-full rounded-full bg-[#a76f73]" style={{ width: `${day.load}%` }} /></div><p className="mt-2 text-[10px] text-stone-400">{day.load}% ocupado</p>
                </button>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-stone-50 p-3 text-center text-xs text-stone-400">Vista semanal simulada · Seleccioná un día para volver a la agenda detallada.</p>
          </div>
        ) : (
          <BookingDaySchedule
            bookings={state.bookings}
            onSelectBooking={selectBooking}
            renderCustomerAvatar={customerAvatar}
            renderResourceAvatar={resourceAvatar}
            resourceNameInBooking={(resourceName) => `con ${resourceName}`}
            scenario={beautyBookingScenario}
            selectLabel={(customerName) => `Ver turno de ${customerName}`}
            statusPresentation={statusPresentation}
          />
        )}
      </BeautyPanel>

      {feedback ? <div className="fixed bottom-24 right-4 z-60 rounded-xl bg-[#292623] px-4 py-3 text-sm font-medium text-white shadow-xl lg:bottom-6">{feedback}</div> : null}

      <BookingDetailDrawer
        customerSecondaryText={selectedBeautyClient?.phone}
        detail={selectedDetail}
        formatPrice={formatCurrency}
        labels={{ cancel: "Cancelar turno", close: "Cerrar detalle", complete: "Marcar finalizado", disclaimer: "Acciones locales · No se guardan cambios", edit: "Editar turno", eyebrow: "Detalle del turno · Demo", notes: "Notas", price: "Precio", status: "Estado", time: "Horario" }}
        notes={selectedBeautyClient?.notes ?? selectedDetail?.booking.notes}
        onCancel={() => simulateStatus("cancelled", "Cancelación simulada · Podés restaurar la demo")}
        onClose={closeDetail}
        onComplete={() => simulateStatus("completed", "Turno marcado como finalizado en la demo")}
        onEdit={() => { closeDetail(); showFeedback("Edición de turno simulada"); }}
        renderCustomerAvatar={customerAvatar}
        statusPresentation={statusPresentation}
        terminology={beautyVertical.terminology}
      />

      {modalOpen ? (
        <div aria-labelledby="new-booking-title" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm" role="dialog">
          <div className="w-full max-w-lg rounded-3xl bg-[#fffdf9] p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a76f73]">Acción simulada</p><h2 className="mt-2 font-display text-3xl font-semibold" id="new-booking-title">Nuevo turno</h2><p className="mt-1 text-sm text-stone-500">Los datos viven en memoria y se eliminan con Reset demo.</p></div><button aria-label="Cerrar" className="grid size-9 place-items-center rounded-full bg-stone-100 text-stone-500" onClick={() => setModalOpen(false)} type="button">×</button></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-stone-600">Cliente<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" onChange={(event) => setNewCustomerId(event.target.value)} value={newCustomerId}>{beautyClients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label>
              <label className="text-xs font-semibold text-stone-600">Profesional<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" onChange={(event) => setNewResourceId(event.target.value)} value={newResourceId}>{beautyProfessionals.map((professional) => <option key={professional.id} value={professional.id}>{professional.name}</option>)}</select></label>
              <label className="text-xs font-semibold text-stone-600 sm:col-span-2">Servicio<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" onChange={(event) => setNewServiceId(event.target.value)} value={newServiceId}>{beautyServices.filter((service) => service.active).map((service) => <option key={service.id} value={service.id}>{service.name} · {service.durationMinutes} min</option>)}</select></label>
              <label className="text-xs font-semibold text-stone-600">Fecha<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" readOnly type="date" value={beautyBookingScenario.schedule.date} /></label>
              <label className="text-xs font-semibold text-stone-600">Hora<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" onChange={(event) => setNewTime(event.target.value)} type="time" value={newTime} /></label>
            </div>
            <div className="mt-7 flex justify-end gap-3"><button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-500" onClick={() => setModalOpen(false)} type="button">Cancelar</button><button className="rounded-xl bg-[#292623] px-5 py-2.5 text-sm font-semibold text-white" onClick={simulateBooking} type="button">Crear turno demo</button></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
