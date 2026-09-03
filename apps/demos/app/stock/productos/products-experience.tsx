"use client";

import { filterProducts, movementTypeLabels, resolveMovement, type ProductStockFilter } from "@software-factory/stock-core";
import { pulseLocations, pulseMovements, pulseProducts, pulseStockLevels, pulseThresholds } from "@software-factory/mock-data/stock";
import { useState } from "react";
import { productView } from "../_components/pulse-data";
import { PageIntro, Panel, StatusPill, money } from "../_components/pulse-ui";

export function ProductsExperience() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ProductStockFilter>("all");
  const [selected, setSelected] = useState<string>();
  const [modal, setModal] = useState(false);
  const products = filterProducts(pulseProducts, pulseStockLevels, pulseThresholds, query, filter).map(productView);
  const detail = selected ? productView(pulseProducts.find((product) => product.id === selected)!) : undefined;

  return <>
    <PageIntro eyebrow="Catálogo operativo" title="Productos" description="Stock total, mínimos y distribución por ubicación." action={<button className="rounded-xl bg-[#15242d] px-5 py-3 text-sm font-bold text-white" onClick={() => setModal(true)}>+ Nuevo producto</button>} />
    <div className="mb-4 flex flex-col gap-3 lg:flex-row">
      <input className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500" onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por producto o SKU" value={query} />
      <div className="flex gap-2 overflow-x-auto">
        {([["all", "Todos"], ["ok", "Stock correcto"], ["low", "Bajo mínimo"], ["out", "Agotados"]] as const).map(([id, label]) => <button className={`whitespace-nowrap rounded-xl border px-4 py-3 text-xs font-bold ${filter === id ? "border-[#15242d] bg-[#15242d] text-white" : "border-slate-200 bg-white text-slate-600"}`} key={id} onClick={() => setFilter(id)}>{label}</button>)}
      </div>
    </div>
    <Panel className="overflow-hidden">
      <div className="hidden grid-cols-[.7fr_2fr_1fr_.7fr_.7fr_1fr_.8fr] gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid"><span>SKU</span><span>Producto</span><span>Categoría</span><span>Stock</span><span>Mínimo</span><span>Ubicación</span><span>Estado</span></div>
      <div className="divide-y divide-slate-100">{products.map((view) => <button className="grid w-full gap-3 p-5 text-left hover:bg-slate-50 md:grid-cols-[.7fr_2fr_1fr_.7fr_.7fr_1fr_.8fr] md:items-center" key={view.product.id} onClick={() => setSelected(view.product.id)}><span className="text-xs font-bold text-teal-700">{view.product.sku}</span><span><b className="block text-sm">{view.product.name}</b><small className="text-slate-400 md:hidden">{view.category} · {view.location}</small></span><span className="hidden text-xs text-slate-500 md:block">{view.category}</span><span className="text-2xl font-bold md:text-sm">{view.total}</span><span className="hidden text-sm text-slate-500 md:block">{view.minimum}</span><span className="hidden text-xs text-slate-500 md:block">{view.location}</span><StatusPill status={view.status} /></button>)}</div>
    </Panel>

    {detail ? <div className="fixed inset-0 z-50 bg-slate-950/30" onMouseDown={() => setSelected(undefined)}>
      <aside aria-label={`Detalle de ${detail.product.name}`} className="absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto bg-white p-5 shadow-2xl sm:p-7" onMouseDown={(event) => event.stopPropagation()}>
        <button className="float-right rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-100" onClick={() => setSelected(undefined)}>Cerrar ×</button>
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">{detail.product.sku}</p>
        <h3 className="mt-2 pr-16 text-2xl font-bold">{detail.product.name}</h3>
        <div className="mt-3 flex items-center gap-3"><StatusPill status={detail.status} /><span className="text-sm text-slate-500">{detail.category}</span></div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[["Stock total", `${detail.total} ${detail.product.unit}`], ["Stock mínimo", `${detail.minimum} ${detail.product.unit}`], ["Costo unitario", money(detail.product.unitCost ?? 0)], ["Valor aproximado", money(detail.total * (detail.product.unitCost ?? 0))]].map(([label, value]) => <div className="rounded-xl bg-slate-50 p-4" key={label}><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-lg font-bold">{value}</p></div>)}
        </div>

        <h4 className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-slate-500">Dónde está</h4>
        <div className="mt-3 divide-y rounded-xl border border-slate-200">{detail.levels.map((level) => <div className="flex items-center justify-between p-4" key={level.locationId}><div><p className="font-semibold">{pulseLocations.find((location) => location.id === level.locationId)?.name}</p><p className="mt-1 text-xs text-slate-400">Ubicación operativa</p></div><b className="text-lg">{level.quantity} <span className="text-xs font-medium text-slate-400">{detail.product.unit}</span></b></div>)}</div>

        <h4 className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-slate-500">Últimos movimientos</h4>
        <div className="mt-3 space-y-2">
          {pulseMovements.filter((movement) => movement.productId === detail.product.id).map((movement) => {
            const resolved = resolveMovement(movement, pulseProducts, pulseLocations);
            const sign = movement.type === "inbound" || movement.adjustmentDirection === "increase" ? "+" : movement.type === "transfer" ? "" : "−";
            return <div className="rounded-xl border border-slate-100 bg-slate-50 p-4" key={movement.id}><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">{movementTypeLabels[movement.type]}</span><b className="text-lg">{sign}{movement.quantity}</b></div><p className="mt-2 text-xs text-slate-500">{resolved.sourceLocation?.code ?? "Recepción"} → {resolved.destinationLocation?.code ?? "Salida"}</p><p className="mt-1 text-[10px] text-slate-400">08 sep · {movement.occurredAt.slice(11, 16)} · {movement.reference}</p></div>;
          })}
          <p className="pt-2 text-sm text-slate-400">Proveedor principal: {detail.supplier?.name ?? "Sin asignar"}</p>
        </div>
      </aside>
    </div> : null}

    {modal ? <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-4"><Panel className="w-full max-w-md p-6"><h3 className="text-xl font-bold">Nuevo producto</h3><p className="mt-2 text-sm text-slate-500">Alta simulada para presentación comercial.</p><div className="mt-5 space-y-3">{["SKU", "Nombre del producto", "Categoría", "Stock inicial"].map((label) => <input className="w-full rounded-xl border border-slate-200 p-3 text-sm" key={label} placeholder={label} />)}</div><div className="mt-5 flex justify-end gap-2"><button className="px-4 py-2 text-sm" onClick={() => setModal(false)}>Cancelar</button><button className="rounded-lg bg-[#15242d] px-4 py-2 text-sm font-bold text-white" onClick={() => setModal(false)}>Crear simulado</button></div></Panel></div> : null}
  </>;
}
