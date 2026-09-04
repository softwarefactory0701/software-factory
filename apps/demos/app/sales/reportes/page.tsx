"use client";
import {
  companies,
  opportunities,
  pipeline,
  salesMetrics,
  sellers,
} from "@software-factory/mock-data/sales";
import { countOpportunitiesByStage } from "@software-factory/crm-core";
import { Intro, Panel, usd } from "../_components/vantage";
export default function Page() {
  const counts = countOpportunitiesByStage(opportunities);
  return (
    <>
      <Intro
        tag="Revenue intelligence"
        title="Inteligencia de ventas"
        copy="Conversión, velocidad y riesgo sin ruido operativo."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-950 p-7 text-white">
          <small>Pipeline activo</small>
          <p className="mt-3 text-3xl font-semibold">
            {usd(salesMetrics.pipeline)}
          </p>
        </div>
        <Panel className="p-6">
          <small>Revenue ganado</small>
          <p className="mt-3 text-3xl font-semibold">
            {usd(salesMetrics.revenueWon)}
          </p>
        </Panel>
        <Panel className="p-6">
          <small>Conversión</small>
          <p className="mt-3 text-3xl font-semibold">24%</p>
        </Panel>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Panel className="p-6">
          <h3 className="text-xl font-semibold">Oportunidades por etapa</h3>
          {pipeline.stages.map((s, i) => (
            <div
              className="mt-4 grid grid-cols-[120px_1fr_24px] gap-3 text-xs"
              key={s.id}
            >
              <span>{s.label}</span>
              <div className="h-5 bg-slate-100">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${100 - i * 11}%`, opacity: 1 - i * 0.08 }}
                />
              </div>
              <b>{counts[s.id] ?? 0}</b>
            </div>
          ))}
        </Panel>
        <Panel className="p-6">
          <h3 className="text-xl font-semibold">Origen de oportunidades</h3>
          {[
            ["LinkedIn", 34],
            ["Referido", 26],
            ["Web", 21],
            ["Outbound", 19],
            ].map((x) => (
              <div key={x[0]} className="mt-5">
              <div className="flex justify-between text-xs">
                <span>{x[0]}</span>
                <b>{x[1]}%</b>
              </div>
              <div className="mt-2 h-2 bg-slate-100">
                <div
                  className="h-full bg-cyan-500"
                  style={{ width: `${x[1]}%` }}
                />
              </div>
            </div>
          ))}
        </Panel>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {sellers.map((s, i) => (
          <Panel className="p-5" key={s.id}>
            <p className="text-xs text-slate-400">{s.name}</p>
            <b className="mt-2 block text-xl">{[12, 9, 8][i]} oportunidades</b>
            <p className="text-xs text-blue-600">
              {companies[i]?.name} · cuenta destacada
            </p>
          </Panel>
        ))}
      </div>
    </>
  );
}
