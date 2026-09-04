"use client";
import { useState } from "react";
import {
  activities,
  contacts,
  policies,
  producers,
  products,
  renewals,
} from "@software-factory/mock-data/insurance";
import { Badge, Drawer, Intro, Panel, date, usd } from "../_components/covera";
export default function Polizas() {
  const [filter, setFilter] = useState("Todas");
  const [selected, setSelected] = useState<string>();
  const rows = policies.filter(
    (p) => filter === "Todas" || p.status === filter,
  );
  const p = policies.find((x) => x.id === selected);
  return (
    <>
      <Intro
        tag="Policy administration"
        title="Pólizas"
        copy="Cartera emitida, vigencias y coberturas en una vista operativa."
        action={
          <button className="rounded-lg bg-[#11665a] px-4 py-3 text-xs font-bold text-white">
            Nueva póliza
          </button>
        }
      />
      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Todas", "Activa", "Por vencer", "Vencida", "Cancelada"].map((x) => (
          <button
            onClick={() => setFilter(x)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs ${filter === x ? "bg-[#17231f] text-white" : "border bg-white"}`}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-[10px] uppercase text-slate-400">
              <tr>
                {[
                  "Póliza",
                  "Cliente",
                  "Producto",
                  "Compañía",
                  "Vencimiento",
                  "Prima",
                  "Estado",
                ].map((x) => (
                  <th className="px-4 py-4" key={x}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr
                  onClick={() => setSelected(p.id)}
                  className="cursor-pointer border-t hover:bg-emerald-50/40"
                  key={p.id}
                >
                  <td className="px-4 py-4 font-semibold">{p.policyNumber}</td>
                  <td className="px-4 py-4">
                    {contacts.find((x) => x.id === p.contactId)?.name}
                  </td>
                  <td className="px-4 py-4">
                    {products.find((x) => x.id === p.productId)?.name}
                  </td>
                  <td className="px-4 py-4">{p.insurer}</td>
                  <td className="px-4 py-4">{date(p.endDate)}</td>
                  <td className="px-4 py-4">{usd(p.premium)}</td>
                  <td className="px-4 py-4">
                    <Badge
                      tone={
                        p.status === "Vencida"
                          ? "red"
                          : p.status === "Por vencer"
                            ? "amber"
                            : "green"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      {p && (
        <Drawer close={() => setSelected(undefined)}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Policy detail
          </p>
          <h3 className="mt-4 text-3xl font-semibold">
            {products.find((x) => x.id === p.productId)?.name}
          </h3>
          <p className="mt-2 text-slate-500">{p.policyNumber}</p>
          <div className="my-7 grid grid-cols-2 gap-4 border-y py-6 text-sm">
            {[
              ["Cliente", contacts.find((x) => x.id === p.contactId)?.name],
              ["Compañía", p.insurer],
              ["Vigencia", `${date(p.startDate)} — ${date(p.endDate)}`],
              ["Prima", usd(p.premium)],
              ["Productor", producers.find((x) => x.id === p.producerId)?.name],
              ["Estado", p.status],
            ].map(([a, b]) => (
              <div key={a}>
                <small className="text-slate-400">{a}</small>
                <p className="mt-1 font-medium">{b}</p>
              </div>
            ))}
            </div>
            <h4 className="font-semibold">Renovación</h4>
            <p className="mt-2 rounded-lg border bg-white p-3 text-sm">{renewals.find(r=>r.policyId===p.id)?.status??"Planificada"}</p>
            <h4 className="mt-6 font-semibold">Actividad administrativa</h4>
            {activities.filter(a=>a.contactId===p.contactId).slice(0,2).map(a=><p className="mt-2 rounded-lg border bg-white p-3 text-sm" key={a.id}>{a.summary}</p>)}
            <button className="w-full rounded-lg bg-[#11665a] p-3 text-white">
            Gestionar renovación
          </button>
        </Drawer>
      )}
    </>
  );
}
