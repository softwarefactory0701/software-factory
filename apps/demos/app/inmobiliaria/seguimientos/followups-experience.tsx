"use client";
import { useCrmDemo } from "@software-factory/crm-ui";
import {
  activities,
  agents,
  contacts,
  opportunities,
  properties,
  tasks as seed,
} from "@software-factory/mock-data/inmobiliaria";
import { Avatar, Intro, Pill, shortDate } from "../_components/nova-ui";
export function FollowupsExperience() {
  const crm=useCrmDemo({opportunities,tasks:seed,activities});const items=crm.state.tasks;const toggle=crm.toggleTask;
  const groups = [
    [
      "ATRASADAS",
      items.filter((t) => t.dueAt < "2026-09-08T10:00" && t.status === "open"),
    ],
    [
      "HOY",
      items.filter(
        (t) =>
          t.dueAt.startsWith("2026-09-08") && t.dueAt >= "2026-09-08T10:00",
      ),
    ],
    ["PRÓXIMAS", items.filter((t) => t.dueAt > "2026-09-08T23:59")],
  ] as const;
  return (
    <>
      <Intro
        eyebrow="Action desk"
        title="Seguimientos"
        description="Prioridad y contexto para que ninguna conversación pierda impulso."
        action={
          <button
            onClick={crm.reset}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold"
          >
            Restablecer demo
          </button>
        }
      />
      {groups.map(([label, tasks]) => (
        <section className="mb-8" key={label}>
          <div className="mb-2 flex items-center gap-4">
            <p
              className={`text-[10px] font-bold tracking-[.22em] ${label === "ATRASADAS" ? "text-[#a05f3d]" : "text-[#9a7543]"}`}
            >
              {label}
            </p>
            <span className="h-px flex-1 bg-stone-200" />
            <span className="text-xs text-stone-400">{tasks.length}</span>
          </div>
          <div className="divide-y divide-stone-200">
            {tasks.map((t) => {
              const o = opportunities.find((x) => x.id === t.opportunityId);
              const p = properties.find(
                (x) => x.id === o?.metadata?.propertyId,
              );
              const a = agents.find((x) => x.id === t.ownerId);
              return (
                <div
                  className={`grid gap-3 py-5 sm:grid-cols-[34px_1fr_1fr_150px_170px] sm:items-center ${t.status === "completed" ? "opacity-45" : ""}`}
                  key={t.id}
                >
                  <button
                    onClick={() => toggle(t.id)}
                    className={`h-5 w-5 rounded-full border ${t.status === "completed" ? "border-[#17324d] bg-[#17324d]" : "border-stone-400"}`}
                    aria-label="Cambiar estado"
                  />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a7543]">
                      {t.title.split(" ")[0]}
                    </p>
                    <p className="mt-1 font-semibold">
                      {contacts.find((c) => c.id === t.contactId)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{p?.title}</p>
                    <p className="text-[10px] text-stone-400">{p?.zone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{shortDate(t.dueAt)}</p>
                    {label === "ATRASADAS" && (
                      <Pill tone="sand">Requiere atención</Pill>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar name={a?.name ?? ""} />
                    <span className="text-xs text-stone-500">{a?.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
