"use client";
import {
  companies,
  opportunities,
  salesMetrics,
  sellers,
  tasks,
} from "@software-factory/mock-data/sales";
import { Intro, Panel, usd, Badge } from "../_components/vantage";
export default function Page() {
  return (
    <>
      <Intro
        tag="Revenue cockpit · 08 Sep"
        title="Control de ventas"
        copy="Qué está por cerrar, qué se está enfriando y qué necesita acción hoy."
      />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
        <div className="relative overflow-hidden rounded-xl bg-[#101820] p-8 text-white">
          <p className="text-[10px] uppercase tracking-[.25em] text-cyan-300">
            Pipeline activo
          </p>
          <p className="mt-4 text-5xl font-semibold">
            {usd(salesMetrics.pipeline)}
          </p>
          <p className="mt-8 text-xs text-slate-400">
            34 oportunidades · 7 negocios próximos a cerrar
          </p>
          <span className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-blue-400/20" />
        </div>
        <Panel className="p-6">
          <p className="text-xs text-slate-400">Conversión</p>
          <p className="mt-2 text-4xl font-semibold">24%</p>
          <div className="mt-6 h-2 bg-slate-100">
            <div className="h-full w-1/4 bg-blue-600" />
          </div>
          <p className="mt-3 text-xs text-emerald-600">+3.1 pts este mes</p>
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x rounded-xl border bg-white py-5">
        {[
          [34, "Oportunidades"],
          [7, "Por cerrar"],
          [11, "Seguimientos hoy"],
        ].map((x) => (
          <div className="px-5" key={x[1]}>
            <b className="text-2xl">{x[0]}</b>
            <p className="text-[10px] uppercase text-slate-400">{x[1]}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <section>
          <h3 className="text-xl font-semibold">Necesitan atención</h3>
          <div className="mt-3 divide-y border-y">
            {opportunities
              .filter((o) => o.metadata?.risk)
              .map((o) => (
                <div className="flex justify-between py-4" key={o.id}>
                  <div>
                    <b>
                      {
                        companies.find((c) => c.id === o.metadata?.companyId)
                          ?.name
                      }
                    </b>
                    <p className="text-xs text-slate-500">{o.title}</p>
                  </div>
                  <div className="text-right">
                    <b>{usd(o.value ?? 0)}</b>
                    <p>
                      <Badge tone="amber">Follow-up vencido</Badge>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <Panel className="p-6">
          <h3 className="text-xl font-semibold">Próximos cierres</h3>
          {opportunities.slice(4, 8).map((o) => (
            <div className="mt-4 flex justify-between border-b pb-3" key={o.id}>
              <span className="text-sm">
                {companies.find((c) => c.id === o.metadata?.companyId)?.name}
              </span>
              <b className="text-sm">{usd(o.value ?? 0)}</b>
            </div>
          ))}
        </Panel>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {sellers.map((s, i) => (
          <Panel className="p-5" key={s.id}>
            <p className="text-xs text-slate-500">{s.name}</p>
            <b className="mt-2 block text-xl">{[12, 9, 8][i]} oportunidades</b>
            <p className="mt-2 text-xs text-blue-600">
              {
                tasks.filter((t) => t.ownerId === s.id && t.status === "open")
                  .length
              }{" "}
              acciones abiertas
            </p>
          </Panel>
        ))}
      </div>
    </>
  );
}
