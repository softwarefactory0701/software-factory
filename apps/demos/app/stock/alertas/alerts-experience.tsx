"use client";

import { useState } from "react";
import { pulseProductViews } from "../_components/pulse-data";
import { PageIntro, Panel, StatusPill } from "../_components/pulse-ui";

export function AlertsExperience() {
  const [reviewed, setReviewed] = useState<string[]>([]);
  const alerts = pulseProductViews.filter((view) => view.status !== "ok").sort((a, b) => a.status === b.status ? 0 : a.status === "out" ? -1 : 1);

  return <>
    <PageIntro eyebrow="Reposición prioritaria" title="Alertas" description="Productos bajo mínimo o agotados, ordenados por urgencia comercial." action={reviewed.length ? <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold" onClick={() => setReviewed([])}>Reset demo</button> : undefined} />
    <div className="mb-5 flex flex-wrap gap-3 text-xs"><span className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-bold text-red-700">CRÍTICO · Agotados primero</span><span className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 font-bold text-amber-700">ALTO · Debajo del mínimo</span></div>
    <div className="grid gap-4 lg:grid-cols-2">
      {alerts.map((view) => {
        const critical = view.status === "out";
        return <Panel className={`overflow-hidden ${reviewed.includes(view.product.id) ? "opacity-55" : ""}`} key={view.product.id}>
          <div className={`border-l-4 p-5 ${critical ? "border-red-500" : "border-amber-400"}`}>
            <div className="flex items-start justify-between gap-3">
              <div><span className={`text-[10px] font-black uppercase tracking-[.16em] ${critical ? "text-red-700" : "text-amber-700"}`}>{critical ? "Crítico" : "Alto"}</span><p className="mt-2 text-xs font-bold text-teal-700">{view.product.sku}</p><h3 className="mt-1 font-bold">{view.product.name}</h3><p className="mt-2 text-sm text-slate-500">{view.total} disponibles · Mínimo {view.minimum}</p><p className="mt-1 text-xs text-slate-400">{view.location} · {view.supplier?.name ?? "Proveedor sin asignar"}</p></div>
              <StatusPill status={view.status} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2"><button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold">Ver producto</button><button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold" onClick={() => setReviewed((ids) => ids.includes(view.product.id) ? ids : [...ids, view.product.id])}>Marcar revisado</button><button className="rounded-lg bg-[#15242d] px-3 py-2 text-xs font-bold text-white">Crear reposición</button></div>
          </div>
        </Panel>;
      })}
    </div>
  </>;
}
