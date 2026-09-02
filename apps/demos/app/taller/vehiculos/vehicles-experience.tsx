"use client";

import { tallerClients, tallerServices, tallerVehicles, tallerWorkOrders, type Vehicle, type WorkOrderStatus } from "@software-factory/mock-data/taller";
import { StatusBadge, type StatusTone } from "@software-factory/ui";
import { useEffect, useState } from "react";
import { TallerPanel, formatTallerCurrency, vehicleInitials } from "../_components/taller-primitives";

const states: Record<Vehicle["status"], { label: string; tone: StatusTone }> = {
  scheduled: { label: "Programado", tone: "info" },
  in_shop: { label: "En taller", tone: "warning" },
  ready: { label: "Listo", tone: "success" },
  inactive: { label: "Sin actividad", tone: "neutral" },
};

const orderLabels: Record<WorkOrderStatus, string> = {
  received: "Recibido", diagnosis: "Diagnóstico", in_progress: "En trabajo",
  waiting_parts: "Esperando repuesto", ready: "Listo", delivered: "Entregado",
};

function VehicleDetail({ vehicle, onClose }: { readonly onClose: () => void; readonly vehicle: Vehicle }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  const client = tallerClients.find((item) => item.id === vehicle.clientId)!;
  const recentOrders = tallerWorkOrders.filter((item) => item.vehicleId === vehicle.id).slice(0, 3);
  const [brand = vehicle.model, ...modelParts] = vehicle.model.split(" ");
  const model = modelParts.join(" ") || vehicle.model;
  const fields = [
    ["Marca", brand], ["Modelo", model], ["Año", String(vehicle.year)], ["Patente", vehicle.plate],
    ["Cliente", client.name], ["Kilometraje actual", `${vehicle.mileage.toLocaleString("es-AR")} km`],
    ["Última visita", vehicle.lastVisit], ["Próximo mantenimiento", vehicle.nextMaintenance], ["Estado", states[vehicle.status].label],
  ];

  return <div aria-labelledby="vehicle-title" aria-modal="true" className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-[2px]" role="dialog">
    <button aria-label="Cerrar detalle" className="absolute inset-0 size-full" onClick={onClose} type="button" />
    <aside className="absolute inset-y-0 right-0 w-full max-w-lg overflow-y-auto bg-[#fffefa] p-5 shadow-2xl sm:p-7">
      <div className="flex items-start justify-between"><div><span className="grid size-14 place-items-center rounded-xl bg-[#252a26] text-sm font-black text-amber-200">{vehicleInitials(vehicle.model)}</span><h2 className="mt-5 text-3xl font-black" id="vehicle-title">{vehicle.model}</h2><p className="mt-1 text-sm text-stone-500">{vehicle.year} · <span className="font-mono font-bold">{vehicle.plate}</span></p></div><button aria-label="Cerrar" autoFocus className="grid size-9 place-items-center rounded-full bg-stone-100" onClick={onClose} type="button">×</button></div>
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#252a26] p-4 text-white"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/40">Estado actual</p><p className="mt-1 text-sm font-bold">{client.name}</p></div><StatusBadge tone={states[vehicle.status].tone}>{states[vehicle.status].label}</StatusBadge></div>
      <dl className="mt-6 grid grid-cols-2 gap-x-5 border-y border-stone-200 py-2">{fields.map(([label, value]) => <div className="min-w-0 border-b border-stone-100 py-3 last:border-0" key={label}><dt className="text-[10px] font-bold uppercase tracking-[.08em] text-stone-400">{label}</dt><dd className={`mt-1 truncate text-sm font-bold text-stone-700 ${label === "Patente" ? "font-mono" : ""}`}>{value}</dd></div>)}</dl>
      <h3 className="mt-7 text-lg font-black">Historial del vehículo</h3>
      <div className="mt-4 space-y-3">{vehicle.history.map((item) => <div className="flex gap-4 rounded-xl border border-stone-200 p-4" key={item.orderId}><div className="w-20 shrink-0"><p className="font-mono text-xs font-black text-amber-700">{item.date}</p><p className="mt-1 text-[9px] text-stone-400">{item.mileage.toLocaleString("es-AR")} km</p></div><div><p className="text-sm font-bold">{item.description}</p><p className="mt-1 text-[10px] text-stone-400">{item.orderId.toUpperCase()}</p></div></div>)}</div>
      {recentOrders.length > 0 ? <><h3 className="mt-7 text-lg font-black">Órdenes recientes</h3><div className="mt-4 space-y-3">{recentOrders.map((order) => <div className="rounded-xl bg-stone-100 p-4" key={order.id}><div className="flex items-center justify-between gap-3"><p className="font-mono text-xs font-black text-amber-700">OT #{order.number}</p><span className="text-[10px] font-bold text-stone-500">{orderLabels[order.status]}</span></div><p className="mt-2 text-sm font-bold">{order.serviceIds.map((id) => tallerServices.find((item) => item.id === id)?.name).join(" · ")}</p><p className="mt-2 text-xs text-stone-500">{formatTallerCurrency(order.estimate)} · {order.date}</p></div>)}</div></> : null}
      <p className="mt-7 text-center text-[10px] text-stone-400">Ficha ficticia · No se guardan cambios</p>
    </aside>
  </div>;
}

export function VehiclesExperience() {
  const [selected, setSelected] = useState<Vehicle>();
  return <>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row"><input aria-label="Buscar vehículo" className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm sm:max-w-sm" placeholder="Buscar por modelo, patente o cliente..." /><button className="rounded-xl bg-[#202321] px-4 py-3 text-sm font-bold text-white" type="button">+ Nuevo vehículo</button></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tallerVehicles.map((vehicle) => {
      const client = tallerClients.find((item) => item.id === vehicle.clientId)!;
      return <button aria-label={`Ver ficha de ${vehicle.model}`} className="text-left" key={vehicle.id} onClick={() => setSelected(vehicle)} type="button"><TallerPanel className="h-full p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-xl bg-[#252a26] text-xs font-black text-amber-200">{vehicleInitials(vehicle.model)}</span><StatusBadge tone={states[vehicle.status].tone}>{states[vehicle.status].label}</StatusBadge></div><h3 className="mt-5 text-xl font-black">{vehicle.model}</h3><p className="mt-1 text-sm text-stone-500">{vehicle.year} · <span className="font-mono font-bold text-stone-700">{vehicle.plate}</span></p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4"><div><p className="text-[10px] uppercase text-stone-400">Cliente</p><p className="mt-1 truncate text-xs font-bold">{client.name}</p></div><div><p className="text-[10px] uppercase text-stone-400">Kilometraje</p><p className="mt-1 text-xs font-bold">{vehicle.mileage.toLocaleString("es-AR")} km</p></div><div><p className="text-[10px] uppercase text-stone-400">Última visita</p><p className="mt-1 text-xs font-bold">{vehicle.lastVisit}</p></div><div><p className="text-[10px] uppercase text-stone-400">Próximo service</p><p className="mt-1 text-xs font-bold text-amber-700">{vehicle.nextMaintenance}</p></div></div></TallerPanel></button>;
    })}</div>
    {selected ? <VehicleDetail onClose={() => setSelected(undefined)} vehicle={selected} /> : null}
  </>;
}
