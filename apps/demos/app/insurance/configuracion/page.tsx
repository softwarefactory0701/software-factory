"use client";
import {
  insurers,
  pipeline,
  producers,
  products,
} from "@software-factory/mock-data/insurance";
import { Intro, Panel } from "../_components/covera";
export default function Configuracion() {
  return (
    <>
      <Intro
        tag="Demo settings"
        title="Configuración"
        copy="Parámetros visibles de la operación COVERA. Los cambios son simulados."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {[
          ["Equipo", producers.map((x) => `${x.name} · ${x.role}`)],
          ["Productos", products.map((x) => x.name)],
          ["Compañías", [...insurers]],
          ["Etapas del pipeline", pipeline.stages.map((x) => x.label)],
          ["Identidad y moneda", ["COVERA · Insurance Operations CRM", "USD · Español (AR)"]],
          ["Fuentes y alertas", ["Referidos · Web · Cartera", "Alertas a 60, 30, 15 y 7 días"]],
        ].map(([title, items]) => (
          <Panel className="p-6" key={String(title)}>
            <h3 className="font-semibold">{title as string}</h3>
            <div className="mt-4 divide-y">
              {(items as string[]).map((x) => (
                <div className="flex justify-between py-3 text-sm" key={x}>
                  <span>{x}</span>
                  <span className="text-emerald-700">Activo</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
