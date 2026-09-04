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
  cancelled: {
    cardClassName: "border-red-200 bg-red-50/90",
    label: "Cancelado",
    tone: "danger",
  },
  completed: {
    cardClassName: "border-stone-200 bg-stone-100/90",
    label: "Finalizado",
    tone: "neutral",
  },
  confirmed: {
    cardClassName: "border-emerald-200 bg-emerald-50/90",
    label: "Confirmado",
    tone: "success",
  },
  in_progress: {
    cardClassName: "border-sky-200 bg-sky-50/90",
    label: "En servicio",
    tone: "info",
  },
  pending: {
    cardClassName: "border-amber-200 bg-amber-50/90",
    label: "Pendiente",
    tone: "warning",
  },
};
const config: BookingVerticalConfig = {
  creationDefaults: { initialStatus: "pending" },
  schedule: beautyBookingScenario.schedule,
  statusPresentation,
  terminology: beautyVertical.terminology,
};
const adapter: BookingPresentationAdapter = {
  customerSecondaryText: (d) => getBeautyClient(d.customer.id)?.phone,
  notes: (d) => getBeautyClient(d.customer.id)?.notes ?? d.booking.notes,
  renderCustomerAvatar: (c) => (
    <BeautyAvatar
      initials={getBeautyClient(c.id)?.avatar ?? c.name.slice(0, 2)}
      name={c.name}
      size="sm"
    />
  ),
  renderResourceAvatar: (r) => (
    <BeautyAvatar
      initials={
        beautyProfessionals.find((x) => x.id === r.id)?.avatar ??
        r.name.slice(0, 2)
      }
      name={r.name}
      size="sm"
    />
  ),
};
const week = [10, 14, 12, 16, 18, 15].map((count, i) => ({
  active: i === 1,
  count,
  id: `beauty-week-${i}`,
  label: ["Lun 7", "Mar 8", "Mié 9", "Jue 10", "Vie 11", "Sáb 12"][i]!,
  load: [72, 87, 76, 91, 96, 83][i],
}));
export function AgendaExperience() {
  const [open, setOpen] = useState(false);
  const crm = useBookingDemo({
    creationDefaults: config.creationDefaults,
    feedbackDuration: 3000,
    feedbackMessages: {
      cancelled: "Cancelación simulada · Podés restaurar la demo",
      completed: "Turno marcado como finalizado en la demo",
      created: "Turno de demostración creado ✓",
      reset: "Demo restaurada al escenario inicial ✓",
    },
    scenario: beautyBookingScenario,
  });
  return (
    <>
      <BeautyPanel className="overflow-hidden">
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
          <>
            <BookingWeekSummary
              activeClassName="border-[#c99b99] bg-[#f7ebe7]"
              cardClassName="rounded-2xl border border-stone-200 bg-[#fffdf9] p-4 text-left transition hover:-translate-y-0.5"
              items={week}
              onSelectDay={() => crm.setView("day")}
              renderCountLabel={() => (
                <p className="text-xs text-stone-400">turnos</p>
              )}
              renderFooter={(item) => (
                <>
                  <div className="mt-4 h-1.5 rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-[#a76f73]"
                      style={{ width: `${item.load}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-stone-400">
                    {item.load}% ocupado
                  </p>
                </>
              )}
            />
            <p className="mx-5 mb-5 rounded-xl bg-stone-50 p-3 text-center text-xs text-stone-400">
              Vista semanal simulada · Seleccioná un día para volver a la agenda
              detallada.
            </p>
          </>
        ) : (
          <BookingDaySchedule
            bookings={crm.bookings}
            onSelectBooking={crm.selectBooking}
            renderCustomerAvatar={adapter.renderCustomerAvatar}
            renderResourceAvatar={adapter.renderResourceAvatar}
            resourceNameInBooking={(name) => `con ${name}`}
            scenario={beautyBookingScenario}
            selectLabel={(name) => `Ver turno de ${name}`}
            statusPresentation={statusPresentation}
          />
        )}
      </BeautyPanel>
      {crm.feedback ? (
        <div className="fixed bottom-24 right-4 z-60 rounded-xl bg-[#292623] px-4 py-3 text-sm font-medium text-white shadow-xl lg:bottom-6">
          {crm.feedback}
        </div>
      ) : null}
      <BookingDetailDrawer
        customerSecondaryText={
          crm.selectedDetail
            ? adapter.customerSecondaryText?.(crm.selectedDetail)
            : undefined
        }
        detail={crm.selectedDetail}
        formatPrice={formatCurrency}
        labels={{
          cancel: "Cancelar turno",
          close: "Cerrar detalle",
          complete: "Marcar finalizado",
          disclaimer: "Acciones locales · No se guardan cambios",
          edit: "Editar turno",
          eyebrow: "Detalle del turno · Demo",
          notes: "Notas",
          price: "Precio",
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
          crm.setFeedback("Edición de turno simulada");
        }}
        renderCustomerAvatar={adapter.renderCustomerAvatar}
        statusPresentation={statusPresentation}
        terminology={beautyVertical.terminology}
      />
      {open ? (
        <BookingCreationForm
          classNames={{
            dialog: "bg-[#fffdf9]",
            accentText: "text-[#a76f73]",
            createButton: "bg-[#292623]",
          }}
          defaultCustomerId={beautyClients[0]!.id}
          defaultResourceId={beautyProfessionals[2]!.id}
          defaultServiceId={beautyServices[1]!.id}
          defaultTime="10:30"
          labels={{
            cancel: "Cancelar",
            create: "Crear turno demo",
            customer: "Cliente",
            date: "Fecha",
            description:
              "Los datos viven en memoria y se eliminan con Reset demo.",
            eyebrow: "Acción simulada",
            resource: "Profesional",
            service: "Servicio",
            time: "Hora",
            title: "Nuevo turno",
          }}
          onCancel={() => setOpen(false)}
              onCreate={crm.createBookingFromDraft}
              scenario={beautyBookingScenario}
              services={beautyServices.filter((service) => service.active)}
        />
      ) : null}
    </>
  );
}
