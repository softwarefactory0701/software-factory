"use client";
import {
  companies,
  contacts,
  opportunities,
  pipeline,
  sellers,
  tasks,
} from "@software-factory/mock-data/sales";
import { getNextTask } from "@software-factory/crm-core";
import { Avatar, Badge, dt, Intro, usd } from "../_components/vantage";
export default function Page() {
  return (
    <>
      <Intro
        tag="Revenue relationships"
        title="Contactos"
        copy="Personas con contexto comercial, no una agenda telefónica."
      />
      <div className="mb-6 flex gap-3">
        <input
          className="w-full rounded-lg border bg-white p-3"
          placeholder="Buscar contacto o empresa…"
        />
        <select className="rounded-lg border bg-white px-4">
          <option>Todos</option>
          <option>Seguimiento hoy</option>
          <option>Sin actividad</option>
          <option>Con oportunidad</option>
          <option>Ganados</option>
        </select>
      </div>
      <div className="divide-y border-y">
        {contacts.map((c) => {
          const o = opportunities.find((x) => x.contactId === c.id);
          const co = companies.find((x) => x.id === c.metadata?.companyId);
          const owner = sellers.find((x) => x.id === o?.ownerId);
          const task = o && getNextTask(tasks, { opportunityId: o.id });
          return (
            <div
              className="grid gap-3 py-5 lg:grid-cols-[1fr_1fr_1fr_.8fr_1fr] lg:items-center"
              key={c.id}
            >
              <div className="flex gap-3">
                <Avatar name={c.name} />
                <div>
                  <b>{c.name}</b>
                  <p className="text-xs text-slate-400">
                    {String(c.metadata?.role)}
                  </p>
                </div>
              </div>
              <div>
                <b className="text-sm">{co?.name}</b>
                <p className="text-xs text-slate-400">{co?.industry}</p>
              </div>
              <div>
                <p className="text-sm">{o?.title}</p>
                <b>{usd(o?.value ?? 0)}</b>
              </div>
              <div>
                {o && (
                  <Badge>
                    {pipeline.stages.find((s) => s.id === o.stageId)?.label}
                  </Badge>
                )}
                <p className="mt-2 text-xs">{owner?.name}</p>
              </div>
              <div>
                <p className="text-xs text-blue-700">
                  {task?.title ?? "Sin próxima acción"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {task && dt(task.dueAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
