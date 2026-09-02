"use client";

import { tallerClients, tallerMechanics, tallerServices, tallerVehicles, tallerWorkOrders, type WorkOrder, type WorkOrderStatus } from "@software-factory/mock-data/taller";
import { StatusBadge, type StatusTone } from "@software-factory/ui";
import { useEffect, useState } from "react";
import { TallerPanel, formatTallerCurrency } from "../_components/taller-primitives";

const statuses: Record<WorkOrderStatus, { label: string; tone: StatusTone }> = {
  received: { label: "Recibido", tone: "neutral" },
  diagnosis: { label: "Diagnóstico", tone: "info" },
  in_progress: { label: "En trabajo", tone: "warning" },
  waiting_parts: { label: "Esperando repuesto", tone: "warning" },
  ready: { label: "Listo", tone: "success" },
  delivered: { label: "Entregado", tone: "success" },
};

const flowColumns = ["received", "diagnosis", "in_progress", "waiting_parts", "ready"] as const;

function OrderDetail({ order, onClose }: { readonly onClose: () => void; readonly order: WorkOrder }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  const vehicle = tallerVehicles.find((item) => item.id === order.vehicleId)!;
  const client = tallerClients.find((item) => item.id === order.clientId)!;
  const mechanic = tallerMechanics.find((item) => item.id === order.mechanicId)!;

  return <div aria-labelledby="order-title" aria-modal="true" className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-[2px]" role="dialog">
    <button aria-label="Cerrar detalle" className="absolute inset-0 size-full" onClick={onClose} type="button" />
    <aside className="absolute inset-y-0 right-0 w-full max-w-lg overflow-y-auto bg-[#fffefa] p-5 shadow-2xl sm:p-7">
      <div className="flex justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700">OT #{order.number} · Demo</p><h2 className="mt-2 text-3xl font-black tracking-tight" id="order-title">{vehicle.model}</h2><p className="mt-1 font-mono text-sm font-bold text-stone-500">{vehicle.plate}</p></div><button aria-label="Cerrar" autoFocus className="grid size-9 place-items-center rounded-full bg-stone-100" onClick={onClose} type="button">×</button></div>
      <div className="mt-7 rounded-2xl bg-[#252a26] p-5 text-white"><div className="flex items-center justify-between"><span className="text-xs text-white/50">Estado actual</span><StatusBadge tone={statuses[order.status].tone}>{statuses[order.status].label}</StatusBadge></div><p className="mt-5 text-3xl font-black">{formatTallerCurrency(order.estimate)}</p><p className="text-xs text-white/45">Estimado de la orden</p></div>
      <dl className="mt-6 divide-y divide-stone-200 border-y border-stone-200">{[["Cliente", client.name], ["Mecánico", mechanic.name], ["Kilometraje", `${order.mileage.toLocaleString("es-AR")} km`], ["Fecha", order.date]].map(([label, value]) => <div className="flex justify-between gap-4 py-3.5" key={label}><dt className="text-xs font-bold text-stone-400">{label}</dt><dd className="text-sm font-semibold text-stone-700">{value}</dd></div>)}</dl>
      <div className="mt-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-stone-400">Trabajos</p><div className="mt-3 space-y-2">{order.serviceIds.map((id) => <div className="flex items-center gap-3 rounded-xl border border-stone-200 p-3 text-sm font-semibold" key={id}><span className="size-2 rounded-full bg-amber-500" />{tallerServices.find((item) => item.id === id)?.name}</div>)}</div></div>
      <button className="mt-8 w-full rounded-xl bg-[#202321] px-4 py-3 text-sm font-bold text-white" onClick={onClose} type="button">Actualizar orden · Simulado</button><p className="mt-3 text-center text-[10px] text-stone-400">No se guardan cambios</p>
    </aside>
  </div>;
}

function OrderList({ onSelect }: { readonly onSelect: (order: WorkOrder) => void }) {
  return <TallerPanel className="overflow-hidden">
    <div className="hidden grid-cols-[.7fr_1.4fr_1fr_1fr_.8fr] gap-4 border-b border-stone-200 bg-stone-50 px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-stone-400 md:grid"><span>Orden</span><span>Vehículo / cliente</span><span>Trabajos</span><span>Responsable</span><span>Estado</span></div>
    <div className="divide-y divide-stone-200">{tallerWorkOrders.map((order) => {
      const vehicle = tallerVehicles.find((item) => item.id === order.vehicleId)!;
      const client = tallerClients.find((item) => item.id === order.clientId)!;
      const mechanic = tallerMechanics.find((item) => item.id === order.mechanicId)!;
      return <button className="grid w-full gap-3 p-5 text-left transition hover:bg-stone-50 md:grid-cols-[.7fr_1.4fr_1fr_1fr_.8fr] md:items-center" key={order.id} onClick={() => onSelect(order)} type="button"><div><p className="font-mono text-sm font-black text-amber-700">OT #{order.number}</p><p className="text-[10px] text-stone-400">{order.date}</p></div><div><p className="font-bold">{vehicle.model} {vehicle.year}</p><p className="mt-1 text-xs text-stone-500"><span className="font-mono font-bold">{vehicle.plate}</span> · {client.name}</p></div><p className="line-clamp-2 text-xs text-stone-600">{order.serviceIds.map((id) => tallerServices.find((item) => item.id === id)?.name).join(" · ")}</p><div><p className="text-sm font-semibold">{mechanic.name}</p><p className="text-[10px] text-stone-400">{order.mileage.toLocaleString("es-AR")} km</p></div><StatusBadge tone={statuses[order.status].tone}>{statuses[order.status].label}</StatusBadge></button>;
    })}</div>
  </TallerPanel>;
}

function OrderFlow({ onSelect }: { readonly onSelect: (order: WorkOrder) => void }) {
  return <div className="overflow-x-auto pb-3"><div className="grid min-w-275 grid-cols-5 gap-3">
    {flowColumns.map((status) => {
      const orders = tallerWorkOrders.filter((order) => order.status === status);
      return <section className="rounded-2xl border border-stone-200 bg-stone-100/70 p-3" key={status}>
        <div className="mb-3 flex items-center justify-between gap-2 px-1"><h3 className="text-xs font-black uppercase tracking-[.1em] text-stone-600">{statuses[status].label}</h3><span className="grid size-6 place-items-center rounded-full bg-white text-[10px] font-black text-stone-500">{orders.length}</span></div>
        <div className="space-y-3">{orders.map((order) => {
          const vehicle = tallerVehicles.find((item) => item.id === order.vehicleId)!;
          const client = tallerClients.find((item) => item.id === order.clientId)!;
          const mechanic = tallerMechanics.find((item) => item.id === order.mechanicId)!;
          const primary = tallerServices.find((item) => item.id === order.serviceIds[0]);
          return <button className="w-full rounded-xl border border-stone-200 bg-[#fffefa] p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" key={order.id} onClick={() => onSelect(order)} type="button"><p className="font-mono text-xs font-black text-amber-700">OT #{order.number}</p><p className="mt-3 text-sm font-black text-stone-900">{vehicle.model}</p><p className="mt-1 font-mono text-[11px] font-bold text-stone-500">{vehicle.plate}</p><p className="mt-3 text-xs text-stone-600">{client.name}</p><div className="my-3 h-px bg-stone-100" /><p className="text-xs font-semibold text-stone-700">{primary?.name}</p><p className="mt-2 text-[10px] text-stone-400">{mechanic.name}</p></button>;
        })}{orders.length === 0 ? <div className="rounded-xl border border-dashed border-stone-300 p-5 text-center text-[10px] text-stone-400">Sin órdenes</div> : null}</div>
      </section>;
    })}
  </div></div>;
}

export function OrdersExperience() {
  const [selected, setSelected] = useState<WorkOrder>();
  const [view, setView] = useState<"list" | "flow">("list");

  return <>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1">{["Todas", "Recibido", "En trabajo", "Esperando repuesto", "Listo"].map((item, index) => <button className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${index === 0 ? "bg-[#202321] text-white" : "border border-stone-200 bg-white text-stone-600"}`} key={item} type="button">{item}</button>)}</div>
      <div aria-label="Vista de órdenes" className="flex rounded-xl border border-stone-200 bg-white p-1" role="group"><button aria-pressed={view === "list"} className={`rounded-lg px-4 py-2 text-xs font-bold ${view === "list" ? "bg-[#202321] text-white" : "text-stone-500"}`} onClick={() => setView("list")} type="button">Lista</button><button aria-pressed={view === "flow"} className={`rounded-lg px-4 py-2 text-xs font-bold ${view === "flow" ? "bg-[#202321] text-white" : "text-stone-500"}`} onClick={() => setView("flow")} type="button">Flujo</button></div>
    </div>
    {view === "list" ? <OrderList onSelect={setSelected} /> : <OrderFlow onSelect={setSelected} />}
    {selected ? <OrderDetail onClose={() => setSelected(undefined)} order={selected} /> : null}
  </>;
}
