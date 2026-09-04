"use client";
import {
  BookingCreationForm,
  BookingDaySchedule,
  BookingDetailDrawer,
  BookingViewToolbar,
  BookingWeekSummary,
  useBookingDemo,
  type BookingPresentationAdapter,
  type BookingStatusMap,
  type BookingVerticalConfig,
} from "@software-factory/booking-core";
import {
  nexusBookingScenario,
  nexusPatients,
  nexusProfessionals,
  nexusServices,
} from "@software-factory/mock-data/consultorio";
import { consultorioVertical } from "@software-factory/verticals/consultorio";
import { useState } from "react";
import {
  NexusPanel,
  formatNexusCurrency,
} from "../_components/nexus-primitives";
const statusPresentation: BookingStatusMap = {
  cancelled: {
    cardClassName: "border-stone-200 bg-stone-100",
    label: "Cancelado",
    tone: "neutral",
  },
  completed: {
    cardClassName: "border-[#dce5e1] bg-[#f1f5f3]",
    label: "Finalizado",
    tone: "success",
  },
  confirmed: {
    cardClassName: "border-[#b9d8ce] bg-[#eaf4f0]",
    label: "Confirmado",
    tone: "success",
  },
  in_progress: {
    cardClassName: "border-[#9fc7c5] bg-[#e7f2f3]",
    label: "En consulta",
    tone: "info",
  },
  pending: {
    cardClassName: "border-[#e4d8ad] bg-[#faf6e9]",
    label: "En espera",
    tone: "warning",
  },
};
const config: BookingVerticalConfig = {
  creationDefaults: { initialStatus: "confirmed" },
  schedule: nexusBookingScenario.schedule,
  statusPresentation,
  terminology: consultorioVertical.terminology,
};
const adapter: BookingPresentationAdapter = {
  customerSecondaryText: (d) => {
    const p = nexusPatients.find((x) => x.id === d.customer.id);
    return p ? `${p.phone} · ${p.email}` : undefined;
  },
  notes: (d) =>
    nexusPatients.find((x) => x.id === d.customer.id)?.note.text ??
    d.booking.notes,
  renderCustomerAvatar: (c) => (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#dcebe5] text-[10px] font-semibold text-[#285f59]">
      {c.name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")}
    </span>
  ),
  renderResourceAvatar: (r) => (
    <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#345c58] text-[10px] font-semibold text-white">
      {nexusProfessionals.find((x) => x.id === r.id)?.avatar ?? "NX"}
    </span>
  ),
};
const week = [14, 18, 16, 19, 17, 9].map((count, i) => ({
  active: i === 1,
  count,
  id: `nexus-week-${i}`,
  label: ["Lun 7", "Mar 8", "Mié 9", "Jue 10", "Vie 11", "Sáb 12"][i]!,
}));
export function NexusAgendaExperience() {
  const [open, setOpen] = useState(false);
  const crm = useBookingDemo({
    creationDefaults: config.creationDefaults,
    feedbackMessages: {
      cancelled: "Turno cancelado en la demo",
      completed: "Consulta marcada como finalizada",
      created: "Turno de demostración creado",
      reset: "Demo restaurada al escenario inicial",
    },
    scenario: nexusBookingScenario,
  });
  return (
    <>
      <NexusPanel className="overflow-hidden">
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
            activeClassName="border-[#91bcb0] bg-[#e8f2ef]"
            cardClassName="rounded-2xl border border-[#dbe3df] bg-white p-4 text-left"
            items={week}
            onSelectDay={() => crm.setView("day")}
            renderCountLabel={() => (
              <p className="text-[10px] text-[#82908d]">turnos</p>
            )}
          />
        ) : (
          <BookingDaySchedule
            bookings={crm.bookings}
            onSelectBooking={crm.selectBooking}
            renderCustomerAvatar={adapter.renderCustomerAvatar}
            renderResourceAvatar={adapter.renderResourceAvatar}
            resourceNameInBooking={(name) => `con ${name}`}
            scenario={nexusBookingScenario}
            selectLabel={(name) => `Ver turno de ${name}`}
            showStatusOnCompactBookings
            statusPresentation={statusPresentation}
          />
        )}
      </NexusPanel>
      <BookingDetailDrawer
        customerSecondaryText={
          crm.selectedDetail
            ? adapter.customerSecondaryText?.(crm.selectedDetail)
            : undefined
        }
        detail={crm.selectedDetail}
        formatPrice={formatNexusCurrency}
        labels={{
          cancel: "Cancelar turno",
          close: "Cerrar detalle",
          complete: "Marcar finalizado",
          disclaimer:
            "Acciones administrativas simuladas · No se guardan cambios",
          edit: "Editar turno",
          eyebrow: "Detalle administrativo · Demo",
          notes: "Nota administrativa",
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
        terminology={consultorioVertical.terminology}
      />
      {crm.feedback ? (
        <div className="fixed bottom-24 right-4 z-60 rounded-2xl bg-[#263836] px-4 py-3 text-sm font-semibold text-white shadow-xl lg:bottom-6">
          {crm.feedback}
        </div>
      ) : null}
      {open ? (
        <BookingCreationForm
          classNames={{
            dialog: "bg-[#fffefb]",
            accentText: "text-[#347b78]",
            createButton: "rounded-2xl bg-[#263836]",
            input:
              "mt-2 w-full rounded-2xl border border-[#dbe3df] bg-white p-3 font-normal",
                label: "text-xs font-semibold text-[#526663]",
                title: "text-2xl",
          }}
          defaultCustomerId={nexusPatients[0]!.id}
          defaultResourceId={nexusProfessionals[0]!.id}
          defaultServiceId={nexusServices[0]!.id}
          defaultTime="17:30"
          labels={{
            cancel: "Cancelar",
            create: "Crear turno demo",
            customer: "Paciente",
            date: "Fecha",
            description: "Gestión exclusivamente administrativa.",
            eyebrow: "Acción simulada",
            resource: "Profesional",
            service: "Tipo de consulta",
            time: "Hora",
            title: "Nuevo turno",
          }}
          onCancel={() => setOpen(false)}
          onCreate={(draft) =>
            crm.createBookingFromDraft({
              ...draft,
              notes: nexusPatients.find((x) => x.id === draft.customerId)?.note
                .text,
            })
          }
          scenario={nexusBookingScenario}
        />
      ) : null}
    </>
  );
}
