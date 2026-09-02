"use client";

import {
  beautyAppointments,
  beautyClients,
  beautyProfessionals,
  beautyServices,
} from "@software-factory/mock-data/beauty";
import { StatusBadge, type StatusTone } from "@software-factory/ui";
import { useState } from "react";
import { BeautyAvatar, BeautyPanel } from "../_components/beauty-primitives";
import { formatCurrency, getBeautyClient, getBeautyProfessional, getBeautyService } from "../_components/beauty-utils";

const statusMeta: Record<(typeof beautyAppointments)[number]["status"], { label: string; tone: StatusTone; card: string }> = {
  cancelled: { card: "border-red-200 bg-red-50/90", label: "Cancelado", tone: "danger" },
  completed: { card: "border-stone-200 bg-stone-100/90", label: "Finalizado", tone: "neutral" },
  confirmed: { card: "border-emerald-200 bg-emerald-50/90", label: "Confirmado", tone: "success" },
  "in-service": { card: "border-sky-200 bg-sky-50/90", label: "En servicio", tone: "info" },
  pending: { card: "border-amber-200 bg-amber-50/90", label: "Pendiente", tone: "warning" },
};

const timeSlots = Array.from({ length: 21 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

const weekSummary = [
  { day: "Lun 7", load: 72, total: 10 },
  { day: "Mar 8", load: 87, total: 14 },
  { day: "Mié 9", load: 76, total: 12 },
  { day: "Jue 10", load: 91, total: 16 },
  { day: "Vie 11", load: 96, total: 18 },
  { day: "Sáb 12", load: 83, total: 15 },
];

export function AgendaExperience() {
  const [view, setView] = useState<"day" | "week">("day");
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const selectedAppointment = beautyAppointments.find((appointment) => appointment.id === selectedAppointmentId);
  const selectedClient = selectedAppointment ? getBeautyClient(selectedAppointment.clientId) : undefined;
  const selectedProfessional = selectedAppointment ? getBeautyProfessional(selectedAppointment.professionalId) : undefined;
  const selectedService = selectedAppointment ? getBeautyService(selectedAppointment.serviceId) : undefined;

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 3000);
  }

  function simulateBooking() {
    setModalOpen(false);
    showFeedback("Turno de demostración creado ✓");
  }

  function simulateAppointmentAction(message: string) {
    setSelectedAppointmentId(null);
    showFeedback(message);
  }

  return (
    <>
      <BeautyPanel className="overflow-hidden">
        <div className="flex flex-col items-stretch justify-between gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:px-5">
          <div className="flex rounded-xl bg-stone-100 p-1">
            {(["day", "week"] as const).map((option) => (
              <button
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${view === option ? "bg-white text-stone-900 shadow-sm" : "text-stone-400"}`}
                key={option}
                onClick={() => setView(option)}
                type="button"
              >
                {option === "day" ? "Día" : "Semana"}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <button className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600" type="button">Hoy</button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#292623] px-3 py-2 text-xs font-semibold text-white shadow-sm sm:px-4" onClick={() => setModalOpen(true)} type="button">
              <span className="text-base leading-none">+</span> <span><span className="hidden sm:inline">Nuevo </span>turno</span>
            </button>
          </div>
        </div>

        {view === "week" ? (
          <div className="p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
              {weekSummary.map((day) => (
                <button className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${day.day === "Mar 8" ? "border-[#c99b99] bg-[#f7ebe7]" : "border-stone-200 bg-[#fffdf9]"}`} key={day.day} onClick={() => setView("day")} type="button">
                  <p className="text-xs font-semibold text-stone-500">{day.day}</p>
                  <p className="mt-3 font-display text-3xl font-semibold text-stone-900">{day.total}</p>
                  <p className="text-xs text-stone-400">turnos</p>
                  <div className="mt-4 h-1.5 rounded-full bg-stone-100"><div className="h-full rounded-full bg-[#a76f73]" style={{ width: `${day.load}%` }} /></div>
                  <p className="mt-2 text-[10px] text-stone-400">{day.load}% ocupado</p>
                </button>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-stone-50 p-3 text-center text-xs text-stone-400">Vista semanal simulada · Seleccioná un día para volver a la agenda detallada.</p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <div className="min-w-240">
                <div className="grid grid-cols-[4.5rem_repeat(3,minmax(0,1fr))] border-b border-stone-100">
                  <div className="border-r border-stone-100" />
                  {beautyProfessionals.map((professional) => (
                    <div className="flex items-center gap-3 border-r border-stone-100 px-4 py-4 last:border-r-0" key={professional.id}>
                      <BeautyAvatar initials={professional.avatar} name={professional.name} size="sm" />
                      <div><p className="text-sm font-semibold text-stone-800">{professional.name}</p><p className="text-[11px] text-stone-400">{professional.role}</p></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[4.5rem_repeat(3,minmax(0,1fr))]">
                  <div className="relative h-260 border-r border-stone-100 bg-stone-50/30">
                    {timeSlots.map((time, index) => <span className="absolute right-3 -translate-y-1/2 text-[10px] font-medium text-stone-400" key={time} style={{ top: `${index * 52}px` }}>{time}</span>)}
                  </div>
                  {beautyProfessionals.map((professional) => (
                    <div className="relative h-260 border-r border-stone-100 last:border-r-0" key={professional.id}>
                      {timeSlots.map((time, index) => <div className="absolute inset-x-0 border-t border-stone-100" key={time} style={{ top: `${index * 52}px` }} />)}
                      {beautyAppointments.filter((appointment) => appointment.professionalId === professional.id).map((appointment) => {
                        const client = getBeautyClient(appointment.clientId);
                        const service = getBeautyService(appointment.serviceId);
                        if (!client || !service) return null;
                        const meta = statusMeta[appointment.status];
                        return (
                          <button aria-label={`Ver turno de ${client.name}`} className={`absolute inset-x-2 overflow-hidden rounded-xl border p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#a76f73] ${meta.card}`} key={appointment.id} onClick={() => setSelectedAppointmentId(appointment.id)} style={{ height: `${appointment.slotSpan * 52 - 8}px`, top: `${appointment.startSlot * 52 + 4}px` }} type="button">
                            <p className="text-[10px] font-bold text-stone-500">{appointment.startTime}—{appointment.endTime}</p>
                            <p className="mt-1 truncate text-xs font-semibold text-stone-800">{client.name}</p>
                            <p className="truncate text-[10px] text-stone-500">{service.name}</p>
                            {appointment.slotSpan >= 2.5 ? <StatusBadge className="mt-2" tone={meta.tone}>{meta.label}</StatusBadge> : null}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-stone-100 md:hidden">
              {[...beautyAppointments].sort((a, b) => a.startTime.localeCompare(b.startTime)).map((appointment) => {
                const client = getBeautyClient(appointment.clientId);
                const service = getBeautyService(appointment.serviceId);
                const professional = beautyProfessionals.find((item) => item.id === appointment.professionalId);
                if (!client || !service || !professional) return null;
                const meta = statusMeta[appointment.status];
                return (
                  <button className="w-full p-4 text-left transition hover:bg-[#fbf7f2]" key={appointment.id} onClick={() => setSelectedAppointmentId(appointment.id)} type="button">
                    <div className="flex items-start gap-3">
                      <div className="w-12 shrink-0"><p className="font-display text-lg font-semibold">{appointment.startTime}</p><p className="text-[10px] text-stone-400">{appointment.endTime}</p></div>
                      <BeautyAvatar initials={client.avatar} name={client.name} size="sm" />
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-stone-800">{client.name}</p><p className="truncate text-xs text-stone-500">{service.name}</p><p className="mt-1 text-[10px] text-stone-400">con {professional.name}</p><StatusBadge className="mt-2" tone={meta.tone}>{meta.label}</StatusBadge></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </BeautyPanel>

      {feedback ? <div className="fixed bottom-24 right-4 z-60 rounded-xl bg-[#292623] px-4 py-3 text-sm font-medium text-white shadow-xl lg:bottom-6">{feedback}</div> : null}

      {selectedAppointment && selectedClient && selectedProfessional && selectedService ? (
        <div aria-labelledby="booking-detail-title" aria-modal="true" className="fixed inset-0 z-50 bg-stone-950/35 backdrop-blur-[2px]" role="dialog">
          <button aria-label="Cerrar detalle" className="absolute inset-0 size-full cursor-default" onClick={() => setSelectedAppointmentId(null)} type="button" />
          <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-[#fffdf9] p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a76f73]">Detalle del turno · Demo</p><h2 className="mt-2 font-display text-3xl font-semibold" id="booking-detail-title">{selectedClient.name}</h2><p className="mt-1 text-sm text-stone-500">{selectedService.name}</p></div>
              <button aria-label="Cerrar" className="grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-500" onClick={() => setSelectedAppointmentId(null)} type="button">×</button>
            </div>

            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-[#faf6f1] p-4"><BeautyAvatar initials={selectedClient.avatar} name={selectedClient.name} /><div><p className="text-sm font-semibold text-stone-800">{selectedClient.name}</p><p className="text-xs text-stone-400">{selectedClient.phone}</p></div><StatusBadge className="ml-auto" tone={statusMeta[selectedAppointment.status].tone}>{statusMeta[selectedAppointment.status].label}</StatusBadge></div>

            <dl className="mt-6 divide-y divide-stone-100 border-y border-stone-100">
              {[{ label: "Cliente", value: selectedClient.name }, { label: "Servicio", value: selectedService.name }, { label: "Profesional", value: selectedProfessional.name }, { label: "Horario", value: `${selectedAppointment.startTime}—${selectedAppointment.endTime}` }, { label: "Precio", value: formatCurrency(selectedService.price) }, { label: "Estado", value: statusMeta[selectedAppointment.status].label }].map((item) => <div className="flex items-center justify-between gap-4 py-3.5" key={item.label}><dt className="text-xs font-semibold text-stone-400">{item.label}</dt><dd className="text-right text-sm font-medium text-stone-700">{item.value}</dd></div>)}
            </dl>

            <div className="mt-6 rounded-2xl border border-[#ead8ce] bg-[#fcf6f2] p-4"><p className="text-xs font-semibold text-[#8b6265]">Notas</p><p className="mt-2 text-sm leading-6 text-stone-600">{selectedClient.notes}</p></div>

            <div className="mt-auto space-y-2 pt-8">
              <button className="w-full rounded-xl bg-[#292623] px-4 py-3 text-sm font-semibold text-white" onClick={() => simulateAppointmentAction("Edición de turno simulada")} type="button">Editar turno</button>
              <button className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" onClick={() => simulateAppointmentAction("Turno marcado como finalizado en la demo")} type="button">Marcar finalizado</button>
              <button className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-red-600" onClick={() => simulateAppointmentAction("Cancelación simulada · Los datos no cambiaron")} type="button">Cancelar turno</button>
              <p className="pt-2 text-center text-[10px] text-stone-400">Acciones locales · No se guardan cambios</p>
            </div>
          </aside>
        </div>
      ) : null}

      {modalOpen ? (
        <div aria-labelledby="new-booking-title" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm" role="dialog">
          <div className="w-full max-w-lg rounded-3xl bg-[#fffdf9] p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a76f73]">Acción simulada</p><h2 className="mt-2 font-display text-3xl font-semibold" id="new-booking-title">Nuevo turno</h2><p className="mt-1 text-sm text-stone-500">Los datos no se guardarán fuera de esta demo.</p></div>
              <button aria-label="Cerrar" className="grid size-9 place-items-center rounded-full bg-stone-100 text-stone-500" onClick={() => setModalOpen(false)} type="button">×</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-stone-600">Cliente<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue={beautyClients[0].id}>{beautyClients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label>
              <label className="text-xs font-semibold text-stone-600">Profesional<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal">{beautyProfessionals.map((professional) => <option key={professional.id}>{professional.name}</option>)}</select></label>
              <label className="text-xs font-semibold text-stone-600 sm:col-span-2">Servicio<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal">{beautyServices.filter((service) => service.active).map((service) => <option key={service.id}>{service.name} · {service.durationMinutes} min</option>)}</select></label>
              <label className="text-xs font-semibold text-stone-600">Fecha<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue="2026-09-08" type="date" /></label>
              <label className="text-xs font-semibold text-stone-600">Hora<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue="16:30" type="time" /></label>
            </div>
            <div className="mt-7 flex justify-end gap-3"><button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-500" onClick={() => setModalOpen(false)} type="button">Cancelar</button><button className="rounded-xl bg-[#292623] px-5 py-2.5 text-sm font-semibold text-white" onClick={simulateBooking} type="button">Crear turno demo</button></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
