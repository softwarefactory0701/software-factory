"use client";
import { sellers, pipeline } from "@software-factory/mock-data/sales";
import { Badge, Intro, Panel } from "../_components/vantage";
export default function Page() {
  return (
    <>
      <Intro
        tag="Workspace control"
        title="Configuración"
        copy="Identidad, equipo y parámetros simulados de VANTAGE."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="overflow-hidden">
          <div className="bg-slate-950 p-7 text-white">
            <p className="text-2xl font-semibold">
              VANTAGE<span className="text-blue-400">/</span>Sales
            </p>
            <p className="mt-2 text-xs text-slate-400">Sales Operations CRM</p>
          </div>
          <div className="p-6">
            {sellers.map((s) => (
              <div className="flex justify-between border-b py-3" key={s.id}>
                <div>
                  <b>{s.name}</b>
                  <p className="text-xs text-slate-400">{s.role}</p>
                </div>
                <Badge tone="green">Activo</Badge>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <h3 className="text-xl font-semibold">Pipeline y preferencias</h3>
          <p className="mt-4 text-sm text-slate-500">
            {pipeline.stages.length} etapas configuradas
          </p>
          {[
            ["Moneda", "USD"],
            ["Fuentes", "6 activas"],
            ["Actividades", "5 tipos"],
            ["Notificaciones", "Simuladas"],
          ].map((x) => (
            <div key={x[0]} className="flex justify-between border-b py-4 text-sm">
              <span>{x[0]}</span>
              <b>{x[1]}</b>
            </div>
          ))}
          <button className="mt-6 w-full rounded-lg bg-blue-600 p-3 text-white">
            Guardar cambios simulados
          </button>
        </Panel>
      </div>
    </>
  );
}
