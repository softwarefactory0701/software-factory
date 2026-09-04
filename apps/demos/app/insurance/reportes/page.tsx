"use client";
import { Intro, Panel } from "../_components/covera";
const products = [
  ["Auto", 38],
  ["Hogar", 24],
  ["Vida", 18],
  ["Comercio", 12],
  ["Otros", 8],
];
export default function Reportes() {
  return (
    <>
      <Intro
        tag="Portfolio intelligence"
        title="Reportes"
        copy="Lectura ejecutiva del crecimiento y la salud de la cartera."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <p className="text-xs font-bold uppercase text-slate-400">
            Prima anual · últimos 6 meses
          </p>
          <div className="mt-8 flex h-48 items-end gap-3">
            {[58, 66, 64, 78, 86, 94].map((h, i) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={i}>
                <div
                  className="w-full rounded-t bg-emerald-700/90"
                  style={{ height: `${h}%` }}
                />
                <small className="text-slate-400">
                  {["Abr", "May", "Jun", "Jul", "Ago", "Sep"][i]}
                </small>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <p className="text-xs font-bold uppercase text-slate-400">
            Mix de productos
          </p>
          {products.map(([n, v]) => (
            <div className="mt-5" key={n}>
              <div className="flex justify-between text-sm">
                <span>{n}</span>
                <b>{v}%</b>
              </div>
              <div className="mt-2 h-1.5 rounded bg-slate-100">
                <div
                  className="h-full rounded bg-[#11665a]"
                  style={{ width: `${v}%` }}
                />
              </div>
            </div>
          ))}
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {[
          ["87%", "Tasa de renovación"],
          ["USD 1.453", "Prima promedio"],
          ["4,2", "Pólizas por productor"],
        ].map(([v, l]) => (
          <Panel className="p-6" key={l}>
            <p className="text-3xl font-semibold">{v}</p>
            <p className="mt-2 text-xs text-slate-500">{l}</p>
          </Panel>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel className="p-6"><h3 className="font-semibold">Insurance Intelligence</h3>{[["Oportunidades por etapa","12 · 7 etapas"],["Cartera por productor","Lucía 41% · Tomás 33% · Valentina 26%"],["Aseguradoras más utilizadas","Aurea 31% · Mapfre Demo 27%"]].map(([a,b])=><div className="mt-4 border-t pt-4" key={a}><p className="text-xs text-slate-400">{a}</p><b className="text-sm">{b}</b></div>)}</Panel>
        <Panel className="p-6"><h3 className="font-semibold">Crecimiento de cartera</h3>{[["Renovaciones por mes","14 Sep · 18 Oct · 21 Nov"],["Cross-sell visual","23 clientes con potencial"],["Cancelaciones mock","3,1% de la cartera"]].map(([a,b])=><div className="mt-4 border-t pt-4" key={a}><p className="text-xs text-slate-400">{a}</p><b className="text-sm">{b}</b></div>)}</Panel>
      </div>
    </>
  );
}
