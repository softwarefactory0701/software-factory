"use client";
import {
  activities,
  companies,
  opportunities,
  sellers,
} from "@software-factory/mock-data/sales";
import { Avatar, dt, Intro } from "../_components/vantage";
export default function Page() {
  return (
    <>
      <Intro
        tag="Team signal"
        title="Actividad"
        copy="Todo lo que hizo el equipo queda registrado."
      />
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {["Todas", "Llamadas", "Reuniones", "Emails", "Notas", "Mensajes"].map(
          (x) => (
            <button
              className="shrink-0 rounded-full border bg-white px-4 py-2 text-xs"
              key={x}
            >
              {x}
            </button>
          ),
        )}
      </div>
      {["HOY", "AYER"].map((day, di) => (
        <section className="mb-8" key={day}>
          <p className="border-b pb-3 text-[10px] font-bold tracking-[.25em] text-blue-600">
            {day}
          </p>
          {activities.slice(di * 6, di * 6 + 6).map((a) => {
            const o = opportunities.find((x) => x.id === a.opportunityId);
            const co = companies.find((x) => x.id === o?.metadata?.companyId);
            const owner = sellers.find((x) => x.id === a.ownerId);
            return (
              <div
                className="grid gap-3 border-b py-5 sm:grid-cols-[90px_1fr_1fr_180px] sm:items-center"
                key={a.id}
              >
                <b>{dt(a.occurredAt).split(", ")[1]}</b>
                <div>
                  <b>{a.summary}</b>
                  <p className="text-xs text-slate-400">{a.type}</p>
                </div>
                <p>{co?.name}</p>
                <div className="flex items-center gap-2">
                  <Avatar name={owner?.name ?? ""} />
                  <span className="text-xs">{owner?.name}</span>
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </>
  );
}
