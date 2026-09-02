import {
  beautyAppointments,
  beautyDashboard,
  beautyProfessionals,
} from "@software-factory/mock-data/beauty";
import { bookingTime } from "@software-factory/booking-core";
import { ProgressBar, SectionHeader, StatCard, StatusBadge } from "@software-factory/ui";
import { BeautyIcon, type BeautyIconName } from "../_components/beauty-icon";
import { BeautyAvatar, BeautyPageIntro, BeautyPanel } from "../_components/beauty-primitives";
import {
  formatCurrency,
  getBeautyClient,
  getBeautyProfessional,
  getBeautyService,
} from "../_components/beauty-utils";

const statusLabels = {
  cancelled: "Cancelado",
  completed: "Finalizado",
  confirmed: "Confirmado",
  in_progress: "En servicio",
  pending: "Pendiente",
} as const;

const statusTones = {
  cancelled: "danger",
  completed: "neutral",
  confirmed: "success",
  in_progress: "info",
  pending: "warning",
} as const;

const upcomingIds = ["turno-01", "turno-05", "turno-02", "turno-08"];
const upcomingAppointments = upcomingIds.flatMap((id) => {
  const appointment = beautyAppointments.find((item) => item.id === id);
  return appointment ? [appointment] : [];
});

export default function BeautyDashboardPage() {
  return (
    <>
      <BeautyPageIntro
        action={
          <a className="inline-flex items-center gap-2 rounded-xl bg-[#292623] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d3834]" href="/beauty/agenda">
            Ver agenda <BeautyIcon className="size-4" name="chevron" />
          </a>
        }
        description="Una vista clara de la operación de hoy y de la salud del estudio."
        eyebrow="Martes, 8 de septiembre"
        title="Buenos días, Alejandra"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {beautyDashboard.kpis.map((kpi) => (
          <StatCard
            detail={kpi.change}
            icon={<BeautyIcon className="size-5" name={kpi.icon as BeautyIconName} />}
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
          />
        ))}
      </div>

      <BeautyPanel className="mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-5 py-4 sm:px-6">
          <div><h2 className="font-display text-xl font-semibold text-stone-900">Ahora en el salón</h2><p className="mt-0.5 text-xs text-stone-400">Estado simulado de la operación actual</p></div>
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-stone-400"><span className="size-2 rounded-full bg-emerald-400" /> En vivo · Demo</span>
        </div>
        <div className="grid divide-y divide-stone-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {beautyDashboard.salonStatus.map((item) => {
            const professional = getBeautyProfessional(item.professionalId);
            if (!professional) return null;
            return (
              <div className="flex items-center gap-3 px-5 py-4" key={item.professionalId}>
                <BeautyAvatar initials={professional.avatar} name={professional.name} size="sm" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-stone-800">{professional.name}</p><p className="truncate text-xs text-stone-500">{item.client ? `${item.client} · ${item.detail}` : item.detail}</p></div>
                <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
              </div>
            );
          })}
        </div>
      </BeautyPanel>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
        <BeautyPanel className="overflow-hidden">
          <div className="border-b border-stone-100 p-5 sm:p-6">
            <SectionHeader
              action={<span className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-500">Hoy</span>}
              description="El equipo tiene una jornada dinámica y bien distribuida."
              title="Próximos turnos"
            />
          </div>
          <div className="divide-y divide-stone-100">
            {upcomingAppointments.map((appointment) => {
              const client = getBeautyClient(appointment.customerId);
              const professional = getBeautyProfessional(appointment.resourceId);
              const service = getBeautyService(appointment.serviceId);
              if (!client || !professional || !service) return null;

              return (
                <div className="grid grid-cols-[3.5rem_1fr] gap-3 p-4 transition hover:bg-[#fbf7f2] sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:px-6" key={appointment.id}>
                  <div>
                    <p className="font-display text-lg font-semibold text-stone-900">{bookingTime(appointment.start)}</p>
                    <p className="text-[10px] text-stone-400">{service.durationMinutes} min</p>
                  </div>
                  <div className="flex min-w-0 items-center gap-3">
                    <BeautyAvatar initials={client.avatar} name={client.name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-stone-800">{client.name}</p>
                      <p className="truncate text-xs text-stone-500">{service.name} · {professional.name}</p>
                    </div>
                  </div>
                  <StatusBadge className="col-start-2 mt-1 sm:col-auto sm:mt-0" tone={statusTones[appointment.status]}>
                    {statusLabels[appointment.status]}
                  </StatusBadge>
                </div>
              );
            })}
          </div>
        </BeautyPanel>

        <BeautyPanel className="p-5 sm:p-6">
          <SectionHeader description="Capacidad reservada para la jornada." title="Ocupación de hoy" />
          <div className="mt-7 flex items-center justify-center">
            <div className="relative grid size-44 place-items-center rounded-full" style={{ background: "conic-gradient(#a76f73 0 87%, #eee7df 87% 100%)" }}>
              <div className="grid size-32 place-items-center rounded-full bg-[#fffdf9] text-center">
                <div>
                  <p className="font-display text-4xl font-semibold text-stone-900">87%</p>
                  <p className="text-xs text-stone-400">ocupado</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-stone-100 pt-5 text-center">
            <div><p className="font-display text-xl font-semibold">14</p><p className="text-xs text-stone-400">turnos</p></div>
            <div><p className="font-display text-xl font-semibold">3</p><p className="text-xs text-stone-400">profesionales</p></div>
          </div>
        </BeautyPanel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <BeautyPanel className="p-5 sm:p-6">
          <SectionHeader description="Turnos atendidos y previstos durante la semana." title="Actividad semanal" />
          <div className="mt-7 flex h-52 items-end gap-3 sm:gap-5">
            {beautyDashboard.weeklyActivity.map((item) => (
              <div className="flex h-full flex-1 flex-col justify-end text-center" key={item.day}>
                <p className="mb-2 hidden text-[10px] font-semibold text-stone-400 sm:block">{formatCurrency(item.revenue)}</p>
                <div className="mx-auto w-full max-w-12 rounded-t-xl bg-[#d8b1aa] transition hover:bg-[#a76f73]" style={{ height: `${item.appointments * 8}px` }} />
                <p className="mt-3 text-xs font-semibold text-stone-500">{item.day}</p>
              </div>
            ))}
          </div>
        </BeautyPanel>

        <BeautyPanel className="p-5 sm:p-6">
          <SectionHeader description="Preferencias del escenario comercial de esta semana." title="Servicios más vendidos" />
          <div className="mt-6 space-y-5">
            {beautyDashboard.servicePerformance.map((service) => (
              <div key={service.name}>
                <ProgressBar label={service.name} value={service.percentage} />
                <p className="mt-1 text-right text-[10px] text-stone-400">{service.bookings} turnos</p>
              </div>
            ))}
          </div>
        </BeautyPanel>
      </div>

      <BeautyPanel className="mt-6 p-5 sm:p-6">
        <SectionHeader description="Desempeño visual de la semana actual." title="Profesionales destacadas" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {beautyProfessionals.map((professional) => (
            <article className="rounded-2xl bg-[#faf6f1] p-4" key={professional.id}>
              <div className="flex items-center gap-3">
                <BeautyAvatar initials={professional.avatar} name={professional.name} />
                <div><p className="text-sm font-semibold text-stone-800">{professional.name}</p><p className="text-xs text-stone-400">{professional.role}</p></div>
              </div>
              <ProgressBar className="mt-5" label="Ocupación" value={professional.occupation} />
              <div className="mt-4 flex justify-between text-xs text-stone-500"><span>{professional.weeklyBookings} turnos</span><span className="font-semibold text-stone-700">{formatCurrency(professional.revenue)}</span></div>
            </article>
          ))}
        </div>
      </BeautyPanel>
    </>
  );
}
