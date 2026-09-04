"use client";
import { useState } from "react";
import {
  activities,
  contacts,
  opportunities,
  policies,
  producers,
  products,
  renewals,
  tasks,
} from "@software-factory/mock-data/insurance";
import { Badge, date, Drawer, Intro, Panel, usd } from "../_components/covera";
export default function Clientes() {
  const [selected, setSelected] = useState<string>();
  const contact = contacts.find((x) => x.id === selected);
  const owned = policies.filter((x) => x.contactId === selected);
  return (
    <>
      <Intro
        tag="Portfolio"
        title="Clientes"
        copy="Personas y empresas protegidas por COVERA."
      />
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                {["Cliente", "Coberturas", "Pólizas", "Prima anual", "Productor", "Próxima renovación"].map(
                  (x) => (
                    <th className="px-5 py-4" key={x}>
                      {x}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const rows = policies.filter((p) => p.contactId === c.id);
                return (
                  <tr
                    onClick={() => setSelected(c.id)}
                    className="cursor-pointer border-t hover:bg-emerald-50/40"
                    key={c.id}
                  >
                    <td className="px-5 py-4">
                      <b>{c.name}</b>
                      <p className="text-xs text-slate-400">{c.email}</p>
                    </td>
                    <td className="px-5 py-4">{rows.map(p=>products.find(x=>x.id===p.productId)?.name).join(" · ")||"Por definir"}</td>
                    <td className="px-5 py-4">{rows.length}</td>
                    <td className="px-5 py-4">
                      {usd(rows.reduce((n, p) => n + p.premium, 0))}
                    </td>
                    <td className="px-5 py-4">{producers.find(x=>x.id===rows[0]?.producerId)?.name??"—"}</td>
                    <td className="px-5 py-4">{rows[0]?date([...rows].sort((a,b)=>a.endDate.localeCompare(b.endDate))[0]!.endDate):"—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
      {contact && (
        <Drawer close={() => setSelected(undefined)}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Client profile
          </p>
          <h3 className="mt-4 text-3xl font-semibold">{contact.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {contact.email} · {contact.phone}
          </p>
          <div className="my-7 grid grid-cols-2 gap-3">
            {[
              ["Pólizas", owned.length],
              [
                "Oportunidades",
                opportunities.filter((x) => x.contactId === contact.id).length,
              ],
            ].map(([a, b]) => (
              <div className="rounded-xl border bg-white p-4" key={String(a)}>
                <small>{a}</small>
                <p className="text-2xl font-semibold">{b}</p>
              </div>
            ))}
          </div>
          <h4 className="font-semibold">Coberturas</h4>
          {owned.map((p) => (
            <div className="mt-3 rounded-xl border bg-white p-4" key={p.id}>
              <div className="flex justify-between">
                <b>{products.find((x) => x.id === p.productId)?.name}</b>
                <Badge>{p.status}</Badge>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {p.policyNumber} · {usd(p.premium)} anual
              </p>
            </div>
          ))}
          <h4 className="mt-7 font-semibold">Renovaciones y oportunidades</h4>
          <p className="mt-2 text-sm text-slate-500">{renewals.filter(r=>owned.some(p=>p.id===r.policyId)).length} renovaciones · {opportunities.filter(o=>o.contactId===contact.id).length} oportunidades</p>
          <h4 className="mt-7 font-semibold">Actividad, tareas y notas</h4>
          {activities.filter(a=>a.contactId===contact.id).slice(0,2).map(a=><p className="mt-3 rounded-lg border bg-white p-3 text-sm" key={a.id}>{a.summary}</p>)}
          {tasks.filter(t=>t.contactId===contact.id).slice(0,2).map(t=><p className="mt-3 rounded-lg border bg-white p-3 text-sm" key={t.id}>{t.title}</p>)}
          <button className="mt-3 w-full rounded-lg border bg-white p-3 text-sm">Agregar nota</button>
        </Drawer>
      )}
    </>
  );
}
