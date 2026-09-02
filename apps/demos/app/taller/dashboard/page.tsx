import { ProgressBar, StatusBadge } from "@software-factory/ui";
import { tallerClients, tallerDashboard, tallerMechanics, tallerServices, tallerVehicles, tallerWorkOrders, type WorkOrderStatus } from "@software-factory/mock-data/taller";
import { TallerIcon } from "../_components/taller-icon";
import { TallerPageHeader, TallerPanel, TallerSectionTitle } from "../_components/taller-primitives";

const statusPresentation: Record<WorkOrderStatus, { label: string; tone: "neutral" | "info" | "warning" | "success" }> = {
  received: { label: "RECIBIDO", tone: "neutral" }, diagnosis: { label: "DIAGNÓSTICO", tone: "info" }, in_progress: { label: "EN TRABAJO", tone: "warning" },
  waiting_parts: { label: "ESPERANDO REPUESTO", tone: "warning" }, ready: { label: "LISTO PARA ENTREGAR", tone: "success" }, delivered: { label: "ENTREGADO", tone: "success" },
};

export default function TallerDashboardPage() {
  const highlighted = tallerWorkOrders.slice(0, 3);
  const maxJobs = Math.max(...tallerDashboard.weekly.map((item) => item.jobs));
  return <>
    <TallerPageHeader action={<a className="inline-flex items-center gap-2 rounded-xl bg-[#202321] px-4 py-3 text-sm font-bold text-white" href="/taller/ordenes">Ver órdenes <span aria-hidden>→</span></a>} description="Una vista operativa de ingresos, trabajos activos y entregas del día." eyebrow="Martes, 8 de septiembre · Operación en vivo" title="El taller, bajo control" />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tallerDashboard.kpis.map((item, index) => <TallerPanel className="p-5" key={item.label}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-stone-500">{item.label}</p><p className="mt-3 text-3xl font-black tracking-tight text-[#202321]">{item.value}</p></div><span className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-700"><TallerIcon name={index === 0 ? "vehicles" : index === 3 ? "chart" : "wrench"} /></span></div><p className="mt-4 text-xs text-stone-500">{item.detail}</p></TallerPanel>)}
    </div>

    <TallerPanel className="mt-5 overflow-hidden">
      <div className="flex items-center justify-between border-b border-stone-200 p-5 sm:p-6"><TallerSectionTitle detail="Seguimiento comercial de las órdenes que requieren atención" title="Estado del taller" /><span className="hidden text-xs font-bold uppercase tracking-[.15em] text-stone-400 sm:block">7 vehículos activos</span></div>
      <div className="divide-y divide-stone-200">
        {highlighted.map((order) => {
          const vehicle = tallerVehicles.find((item) => item.id === order.vehicleId)!;
          const client = tallerClients.find((item) => item.id === order.clientId)!;
          const services = order.serviceIds.map((id) => tallerServices.find((item) => item.id === id)?.name).filter(Boolean).join(" + ");
          return <a className="grid gap-4 p-5 transition hover:bg-stone-50 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6" href="/taller/ordenes" key={order.id}><div className="flex min-w-0 items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl border border-stone-200 bg-stone-100 text-xs font-black text-stone-600">{vehicle.model.split(" ").slice(0,2).map((word) => word[0]).join("")}</span><div className="min-w-0"><div className="flex flex-wrap items-baseline gap-2"><p className="font-bold text-[#202321]">{vehicle.model} {vehicle.year}</p><span className="font-mono text-xs font-bold text-amber-700">{vehicle.plate}</span></div><p className="mt-1 truncate text-sm text-stone-500">{services}</p><p className="mt-1 text-[11px] text-stone-400">{client.name} · OT #{order.number}</p></div></div><StatusBadge tone={statusPresentation[order.status].tone}>{statusPresentation[order.status].label}</StatusBadge></a>;
        })}
      </div>
    </TallerPanel>

    <div className="mt-5 grid gap-5 xl:grid-cols-3">
      <TallerPanel className="p-5 sm:p-6"><TallerSectionTitle detail="Ocupación simulada por especialista" title="Carga del taller" /><div className="mt-6 space-y-5">{tallerMechanics.map((item) => <ProgressBar key={item.id} label={item.name} value={item.occupation} />)}</div></TallerPanel>
      <TallerPanel className="p-5 sm:p-6"><TallerSectionTitle detail="Demanda sobre el escenario actual" title="Servicios más solicitados" /><div className="mt-6 space-y-5">{tallerDashboard.services.map((item) => <ProgressBar key={item.name} label={item.name} value={item.value} />)}</div></TallerPanel>
      <TallerPanel className="p-5 sm:p-6"><TallerSectionTitle detail="Ingresos planificados por día" title="Actividad semanal" /><div className="mt-8 flex h-40 items-end gap-3">{tallerDashboard.weekly.map((item) => <div className="flex flex-1 flex-col items-center gap-2" key={item.day}><span className="text-[10px] font-bold text-stone-500">{item.jobs}</span><div className="w-full rounded-t-md bg-[#d97706]" style={{ height: `${Math.max(18, item.jobs / maxJobs * 110)}px` }} /><span className="text-[10px] text-stone-400">{item.day}</span></div>)}</div></TallerPanel>
    </div>
  </>;
}
