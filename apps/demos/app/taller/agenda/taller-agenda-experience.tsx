"use client";
import {
  BookingCreationForm,
  BookingDaySchedule,
  BookingDetailDrawer,
  BookingViewToolbar,
  BookingWeekSummary,
  useBookingDemo,
  type BookingDetail,
  type BookingPresentationAdapter,
  type BookingStatusMap,
  type BookingVerticalConfig,
} from "@software-factory/booking-core";
import {
  tallerAppointments,
  tallerBookingScenario,
  tallerClients,
  tallerMechanics,
  tallerServices,
  tallerVehicles,
} from "@software-factory/mock-data/taller";
import { tallerVertical } from "@software-factory/verticals/taller";
import { useState } from "react";
import {
  TallerPanel,
  formatTallerCurrency,
} from "../_components/taller-primitives";
const statusPresentation: BookingStatusMap = {
  cancelled: {
    cardClassName: "border-red-200 bg-red-50",
    label: "Cancelado",
    tone: "danger",
  },
  completed: {
    cardClassName: "border-stone-200 bg-stone-100",
    label: "Finalizado",
    tone: "neutral",
  },
  confirmed: {
    cardClassName: "border-emerald-200 bg-emerald-50",
    label: "Confirmado",
    tone: "success",
  },
  in_progress: {
    cardClassName: "border-amber-300 bg-amber-50",
    label: "En trabajo",
    tone: "warning",
  },
  pending: {
    cardClassName: "border-sky-200 bg-sky-50",
    label: "Por recibir",
    tone: "info",
  },
};
const config: BookingVerticalConfig = {
  creationDefaults: { initialStatus: "pending" },
  schedule: tallerBookingScenario.schedule,
  statusPresentation,
  terminology: tallerVertical.terminology,
};
function vehicle(d: BookingDetail) {
  const a = tallerAppointments.find((x) => x.id === d.booking.id);
  return a ? tallerVehicles.find((x) => x.id === a.vehicleId) : undefined;
}
const adapter: BookingPresentationAdapter = {
  customerSecondaryText: (d) =>
    tallerClients.find((x) => x.id === d.customer.id)?.phone,
  notes: (d) => {
    const v = vehicle(d);
    return v
      ? `${v.model} ${v.year} · ${v.plate} · ${v.mileage.toLocaleString("es-AR")} km`
      : d.booking.notes;
  },
  renderBookingMetadata: (d) => {
    const v = vehicle(d);
    return (
      <span className="taller-booking-primary">
        {v?.model ?? d.booking.notes}{" "}
        {v ? <span className="font-mono">· {v.plate}</span> : null}
      </span>
    );
  },
  renderCustomerAvatar: (c) => (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-[10px] font-black text-amber-800">
      {c.name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")}
    </span>
  ),
  renderResourceAvatar: (r) => (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#272b28] text-[10px] font-black text-amber-200">
      {tallerMechanics.find((x) => x.id === r.id)?.avatar ?? "TG"}
    </span>
  ),
};
const week = [9, 12, 10, 14, 13, 7].map((count, i) => ({
  active: i === 1,
  count,
  id: `taller-week-${i}`,
  label: ["Lun 7", "Mar 8", "Mié 9", "Jue 10", "Vie 11", "Sáb 12"][i]!,
}));
export function TallerAgendaExperience() {
  const [open, setOpen] = useState(false);
  const crm = useBookingDemo({
    creationDefaults: config.creationDefaults,
    feedbackMessages: {
      cancelled: "Turno cancelado en la demo",
      completed: "Trabajo marcado como finalizado",
      created: "Turno de demostración creado",
      reset: "Demo restaurada al escenario inicial",
    },
    scenario: tallerBookingScenario,
  });
  return (
    <>
      <TallerPanel className="taller-agenda overflow-hidden">
        <BookingViewToolbar
          labels={{
            create: "Nuevo turno",
            day: "Día",
            reset: "Reset demo",
            today: "Hoy",
            week: "Semana",
          }}
          onCreate={() => setOpen(true)}
          onReset={crm.reset}
          onViewChange={crm.setView}
          view={crm.state.view}
        />
        {crm.state.view === "week" ? (
          <BookingWeekSummary
            activeClassName="border-amber-400 bg-amber-50"
            cardClassName="rounded-xl border border-stone-200 bg-white p-4 text-left"
            items={week}
            onSelectDay={() => crm.setView("day")}
            renderCountLabel={() => (
              <p className="text-[10px] text-stone-400">vehículos</p>
            )}
          />
        ) : (
          <BookingDaySchedule
            bookings={crm.bookings}
            onSelectBooking={crm.selectBooking}
            renderBookingMetadata={adapter.renderBookingMetadata}
            renderCustomerAvatar={adapter.renderCustomerAvatar}
            renderResourceAvatar={adapter.renderResourceAvatar}
            resourceNameInBooking={(name) => `Asignado a ${name}`}
            scenario={tallerBookingScenario}
            selectLabel={(name) => `Ver turno de ${name}`}
            statusPresentation={statusPresentation}
          />
        )}
      </TallerPanel>
      <BookingDetailDrawer
        customerSecondaryText={
          crm.selectedDetail
            ? adapter.customerSecondaryText?.(crm.selectedDetail)
            : undefined
        }
        detail={crm.selectedDetail}
        formatPrice={formatTallerCurrency}
        labels={{
          cancel: "Cancelar turno",
          close: "Cerrar detalle",
          complete: "Marcar finalizado",
          disclaimer: "Acciones simuladas · No se guardan cambios",
          edit: "Editar turno",
          eyebrow: "Detalle operativo · Demo",
          notes: "Vehículo y orden",
          price: "Precio base",
          status: "Estado",
          time: "Horario",
        }}
        notes={
          crm.selectedDetail ? adapter.notes?.(crm.selectedDetail) : undefined
        }
        onCancel={crm.cancelSelected}
        onClose={crm.closeDetail}
        onComplete={crm.completeSelected}
        onEdit={() => {
          crm.closeDetail();
          crm.setFeedback("Edición simulada");
        }}
        renderCustomerAvatar={adapter.renderCustomerAvatar}
        statusPresentation={statusPresentation}
        terminology={tallerVertical.terminology}
      />
      {crm.feedback ? (
        <div className="fixed bottom-24 right-4 z-60 rounded-xl bg-[#202321] px-4 py-3 text-sm font-bold text-white shadow-xl lg:bottom-6">
          {crm.feedback}
        </div>
      ) : null}
      {open ? (
        <BookingCreationForm
          classNames={{
            dialog: "rounded-2xl bg-[#fffefa]",
            accentText: "font-bold text-amber-700",
            createButton: "bg-[#202321]",
            label: "text-xs font-bold text-stone-600",
            title: "text-2xl font-black",
          }}
          defaultCustomerId={tallerClients[0]!.id}
          defaultResourceId={tallerMechanics[0]!.id}
          defaultServiceId={tallerServices[0]!.id}
          defaultTime="17:30"
          labels={{
            cancel: "Cancelar",
            create: "Crear turno demo",
            customer: "Cliente",
            date: "Fecha",
            eyebrow: "Acción simulada",
            resource: "Mecánico",
            service: "Servicio",
            time: "Hora",
            title: "Nuevo turno de taller",
          }}
          onCancel={() => setOpen(false)}
          onCreate={(draft) => {
            const item = tallerVehicles.find((x) => x.clientId === draft.customerId);
            return crm.createBookingFromDraft({
              ...draft,
              notes: item ? `${item.model} · ${item.plate} · ${item.mileage.toLocaleString("es-AR")} km` : undefined,
            });
          }}
          scenario={tallerBookingScenario}
        />
      ) : null}
    </>
  );
}
