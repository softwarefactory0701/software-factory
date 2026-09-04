"use client";
import { useCrmDemo } from "@software-factory/crm-ui";
import {
  activities,
  companies,
  opportunities,
  sellers,
  tasks as seed,
} from "@software-factory/mock-data/sales";
import { Avatar, Badge, dt, Intro } from "../_components/vantage";
export function Followups() {
  const crm=useCrmDemo({opportunities,tasks:seed,activities});const tasks=crm.state.tasks;
  const groups = [
    [
      "ATRASADOS",
      tasks.filter((t) => t.dueAt < "2026-09-08T10:00" && t.status === "open"),
    ],
    ["HOY", tasks.filter((t) => t.dueAt.startsWith("2026-09-08"))],
    [
      "PRÓXIMOS",
      tasks.filter((t) => t.dueAt > "2026-09-08T23:59" && t.status === "open"),
    ],
    ["COMPLETADOS", tasks.filter((t) => t.status === "completed")],
  ] as const;
  return (
    <>
      <Intro
        tag="Execution queue"
        title="Seguimientos"
        copy="Qué tiene que hacer el equipo hoy, en orden de prioridad."
        action={
          <button
            onClick={crm.reset}
            className="rounded-lg border bg-white px-4 py-2 text-xs"
          >
            Reset demo
          </button>
        }
      />
      {groups.map(([label, items]) => (
        <section className="mb-8" key={label}>
          <p className="border-b pb-3 text-[10px] font-bold tracking-[.22em] text-blue-600">
            {label} · {items.length}
          </p>
          {items.map((t) => {
            const o = opportunities.find((x) => x.id === t.opportunityId);
            const co = companies.find((x) => x.id === o?.metadata?.companyId);
            const owner = sellers.find((x) => x.id === t.ownerId);
            return (
              <div
                className="grid gap-3 border-b py-5 sm:grid-cols-[1fr_1fr_180px_180px_auto] sm:items-center"
                key={t.id}
              >
                <div>
                  <b>{t.title}</b>
                  <p className="text-xs text-slate-400">{co?.name}</p>
                </div>
                <p className="text-sm">{o?.title}</p>
                <p className="text-xs">{dt(t.dueAt)}</p>
                <div className="flex items-center gap-2">
                  <Avatar name={owner?.name ?? ""} />
                  <span className="text-xs">{owner?.name}</span>
                </div>
                <button
                  onClick={() => crm.toggleTask(t.id)}
                >
                  <Badge tone="green">Completar</Badge>
                </button>
              </div>
            );
          })}
        </section>
      ))}
    </>
  );
}
