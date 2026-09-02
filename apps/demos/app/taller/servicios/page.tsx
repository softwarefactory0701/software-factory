import { StatusBadge } from "@software-factory/ui";
import { tallerMechanics, tallerServices } from "@software-factory/mock-data/taller";
import { TallerPageHeader, TallerPanel, formatTallerCurrency } from "../_components/taller-primitives";

export default function TallerServicesPage() {
  return <><TallerPageHeader description="Catálogo operativo con tiempos estándar, precios base y técnicos habilitados." eyebrow="Configuración del trabajo" title="Servicios del taller" />
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{["Todos", "Mantenimiento", "Diagnóstico", "Tren delantero"].map((filter, index) => <button className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${index === 0 ? "bg-[#202321] text-white" : "border border-stone-200 bg-white text-stone-600"}`} key={filter} type="button">{filter}</button>)}</div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tallerServices.map((service) => <TallerPanel className="p-5" key={service.id}><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-amber-700">{service.category}</span><StatusBadge tone={service.active ? "success" : "neutral"}>{service.active ? "Activo" : "Pausado"}</StatusBadge></div><h3 className="mt-5 text-xl font-black tracking-tight">{service.name}</h3><p className="mt-3 text-2xl font-black text-stone-800">{formatTallerCurrency(service.price)}</p><p className="mt-1 text-xs text-stone-400">{service.durationMinutes} minutos estimados</p><div className="mt-5 border-t border-stone-100 pt-4"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-stone-400">Mecánicos habilitados</p><p className="mt-2 text-sm text-stone-600">{service.mechanicIds.map((id) => tallerMechanics.find((item) => item.id === id)?.name.split(" ")[0]).join(" · ")}</p></div></TallerPanel>)}</div>
  </>;
}
