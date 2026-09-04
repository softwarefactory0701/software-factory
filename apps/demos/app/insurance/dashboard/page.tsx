"use client";
import {
  contacts,
  coveraMetrics,
  opportunities,
  policies,
  products,
  renewals,
  tasks,
} from "@software-factory/mock-data/insurance";
import { Badge, Intro, Panel, usd } from "../_components/covera";
export default function Page() {
  return (
    <>
      <Intro
        tag="Portfolio control · 08 Sep"
        title="Cobertura bajo control"
        copy="Clientes, pólizas, renovaciones y oportunidades en un solo lugar."
      />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
        <div className="relative overflow-hidden rounded-xl bg-[#17231f] p-8 text-white">
          <p className="text-[10px] uppercase tracking-[.25em] text-emerald-300">
            Prima anual administrada
          </p>
          <p className="mt-4 text-5xl font-semibold">
            {usd(coveraMetrics.annualPremium)}
          </p>
          <p className="mt-8 text-xs text-slate-400">
            128 pólizas activas · cartera demostrativa
          </p>
        </div>
        <Panel className="grid grid-cols-2 gap-5 p-6">
          {[
            [14, "Renovaciones"],
            [9, "Oportunidades"],
            [6, "Seguimientos"],
            [87, "% renovación"],
          ].map((x) => (
            <div key={x[1]}>
              <b className="text-2xl">{x[0]}</b>
              <p className="text-[10px] text-slate-400">{x[1]}</p>
            </div>
          ))}
        </Panel>
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <section>
          <h3 className="text-xl font-semibold">Renovaciones en riesgo</h3>
          <div className="mt-3 divide-y border-y">
            {renewals.slice(0, 4).map((r) => {
              const p = policies.find((x) => x.id === r.policyId)!;
              return (
                <div className="flex justify-between py-4" key={r.policyId}>
                  <div>
                    <b>{products.find((x) => x.id === p.productId)?.name}</b>
                    <p className="text-xs text-slate-500">
                      {contacts.find((x) => x.id === p.contactId)?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge tone={r.risk === "critical" ? "red" : "amber"}>
                      Vence en {r.daysRemaining} días
                    </Badge>
                    <p className="mt-2 text-xs">{usd(p.premium)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <Panel className="p-6">
          <h3 className="text-xl font-semibold">Seguimientos de hoy</h3>
          {tasks.slice(0, 5).map((t) => (
            <div className="mt-4 border-l-2 border-emerald-500 pl-3" key={t.id}>
              <b className="text-sm">{t.title}</b>
              <p className="text-xs text-slate-400">
                {contacts.find((c) => c.id === t.contactId)?.name}
              </p>
            </div>
          ))}
        </Panel>
      </div>
      <Panel className="mt-7 p-6">
        <div className="flex items-center justify-between"><h3 className="text-xl font-semibold">Oportunidades abiertas</h3><span className="text-xs text-emerald-700">{opportunities.filter(o=>o.status==="open").length} activas</span></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">{opportunities.filter(o=>o.status==="open").slice(0,3).map(o=><div className="border-l-2 border-emerald-600 pl-3" key={o.id}><b className="text-sm">{contacts.find(c=>c.id===o.contactId)?.name}</b><p className="text-xs text-slate-500">{o.title}</p><p className="mt-1 font-semibold">{usd(o.value??0)}</p></div>)}</div>
      </Panel>
      <div className="mt-7">
        <h3 className="text-xl font-semibold">Distribución por producto</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
          {products.map((p, i) => (
            <Panel className="p-4" key={p.id}>
              <b>{[38, 24, 18, 16, 12, 10][i]}%</b>
              <p className="mt-1 text-xs text-slate-500">{p.name}</p>
            </Panel>
          ))}
        </div>
      </div>
    </>
  );
}
