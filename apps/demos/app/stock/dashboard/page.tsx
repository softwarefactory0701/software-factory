import { movementTypeLabels, resolveMovement } from "@software-factory/stock-core";
import { pulseCategories, pulseLocations, pulseMetrics, pulseMovements, pulseProducts, pulseWeeklyActivity } from "@software-factory/mock-data/stock";
import { pulseProductViews } from "../_components/pulse-data";
import { Bar, PageIntro, Panel, StatusPill, money } from "../_components/pulse-ui";

export default function Page() {
  const attention = pulseProductViews.filter((product) => product.status !== "ok").slice(0, 4);
  const categoryValues = [76, 91, 43, 58, 67];
  return <>
    <PageIntro eyebrow="Martes, 8 de septiembre · Operación en vivo" title="Control de inventario" description="Qué tenés, dónde está y qué necesitás reponer, en una sola vista." />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[["Productos", "1.284", "Catálogo activo"], ["Bajo mínimo", "36", "Requieren atención"], ["Movimientos hoy", "18", "Entradas y salidas"], ["Valor inventario", money(pulseMetrics.inventoryValue), "Valor aproximado"]].map(([label, value, note]) => <Panel className="p-5" key={label}><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold tracking-tight">{value}</p><p className="mt-4 text-xs text-slate-400">{note}</p></Panel>)}
    </div>

    <Panel className="mt-5 overflow-hidden">
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_2fr] md:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Estado del inventario</p><h3 className="mt-2 text-lg font-bold">96,9% en estado correcto</h3><p className="mt-1 text-xs text-slate-500">Lectura comercial del catálogo completo.</p></div>
        <div><div className="grid grid-cols-3 gap-2 sm:gap-3"><div className="rounded-xl bg-teal-50 p-3 sm:p-4"><p className="text-2xl font-bold text-teal-800">1.244</p><p className="mt-1 text-[10px] font-bold uppercase text-teal-700">Correctos</p></div><div className="rounded-xl bg-amber-50 p-3 sm:p-4"><p className="text-2xl font-bold text-amber-800">36</p><p className="mt-1 text-[10px] font-bold uppercase text-amber-700">Bajo mínimo</p></div><div className="rounded-xl bg-red-50 p-3 sm:p-4"><p className="text-2xl font-bold text-red-800">4</p><p className="mt-1 text-[10px] font-bold uppercase text-red-700">Agotados</p></div></div><div className="mt-3 flex h-2 overflow-hidden rounded-full bg-slate-100"><span className="bg-teal-500" style={{ width: "96.9%" }} /><span className="bg-amber-400" style={{ width: "2.8%" }} /><span className="min-w-1 bg-red-500" style={{ width: ".3%" }} /></div></div>
      </div>
    </Panel>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
      <Panel><div className="border-b border-slate-100 p-5"><h3 className="text-lg font-bold">Necesitan atención</h3><p className="text-xs text-slate-500">Reposición prioritaria del escenario</p></div><div className="divide-y divide-slate-100">{attention.map((view) => <div className="flex items-center gap-4 p-4 sm:p-5" key={view.product.id}><div className="min-w-0 flex-1"><p className="truncate font-semibold">{view.product.name}</p><p className="mt-1 text-xs text-slate-500">{view.total} disponibles · Mínimo {view.minimum} · {view.location}</p></div><StatusPill status={view.status} /></div>)}</div></Panel>
      <Panel><div className="p-5"><h3 className="text-lg font-bold">Últimos movimientos</h3></div><div className="divide-y divide-slate-100">{pulseMovements.slice(0, 4).map((movement) => { const resolved = resolveMovement(movement, pulseProducts, pulseLocations); return <div className="p-4" key={movement.id}><div className="flex justify-between gap-3"><p className="text-sm font-semibold">{resolved.product?.name}</p><span className="text-[10px] font-bold uppercase text-teal-700">{movementTypeLabels[movement.type]}</span></div><p className="mt-1 text-xs text-slate-400">{movement.quantity} unidades · {movement.occurredAt.slice(11, 16)}</p></div>; })}</div></Panel>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-3">
      <Panel className="p-5"><h3 className="font-bold">Stock por categoría</h3><div className="mt-5 space-y-4">{pulseCategories.map((category, index) => <div key={category.id}><div className="mb-1 flex justify-between text-xs"><span>{category.name}</span><b>{categoryValues[index]}%</b></div><Bar value={categoryValues[index] ?? 50} /></div>)}</div></Panel>
      <Panel className="p-5"><h3 className="font-bold">Actividad semanal</h3><div className="mt-6 flex h-40 items-end gap-3">{pulseWeeklyActivity.map((item) => <div className="flex flex-1 flex-col items-center gap-2" key={item.day}><div className="flex h-30 items-end gap-1"><span className="w-2 rounded-t bg-teal-500" style={{ height: `${item.inbound}%` }} /><span className="w-2 rounded-t bg-slate-700" style={{ height: `${item.outbound}%` }} /></div><span className="text-[10px] text-slate-400">{item.day}</span></div>)}</div></Panel>
      <Panel className="p-5"><h3 className="font-bold">Distribución por ubicación</h3><div className="mt-5 space-y-4">{[["Rack A", 82], ["Rack B", 68], ["Sector C", 54]].map(([name, value]) => <div key={name}><div className="mb-1 flex justify-between text-xs"><span>{name}</span><b>{value}%</b></div><Bar value={Number(value)} tone="navy" /></div>)}</div></Panel>
    </div>
  </>;
}
