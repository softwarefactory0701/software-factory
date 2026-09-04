"use client";
import { useMemo, useRef } from "react";
import { useCrmDemo } from "@software-factory/crm-ui";
import {
  activities,
  companies,
  contacts,
  opportunities as seed,
  pipeline,
  sellers,
  tasks,
} from "@software-factory/mock-data/sales";
import {
  getNextTask,
  groupOpportunitiesByStage,
  type Opportunity,
} from "@software-factory/crm-core";
import { Avatar, Badge, Drawer, dt, Intro, usd } from "../_components/vantage";
export function Pipeline() {
  const crm=useCrmDemo({opportunities:seed,tasks,activities});
  const ops=crm.state.opportunities;const selected=crm.selectedOpportunity;const stage=crm.activeStageId||"vs1";
  const ref = useRef<HTMLDivElement>(null);
  const groups = useMemo(
    () => groupOpportunitiesByStage(ops, pipeline.stages),
    [ops],
  );
  const move=(id:string,s:string)=>s==="vs7"?crm.markWon(id,s):crm.moveOpportunity(id,s);
  return (
    <>
      <Intro
        tag="Deal velocity"
        title="Pipeline"
        copy="El pulso completo de las oportunidades B2B."
        action={
          <button
            className="rounded-lg border bg-white px-4 py-2 text-xs"
            onClick={crm.reset}
          >
            Reset demo
          </button>
        }
      />
      <div className="mb-4 hidden justify-end gap-2 md:flex">
        <button
          onClick={() =>
            ref.current?.scrollBy({ left: -600, behavior: "smooth" })
          }
          className="rounded-lg border bg-white px-3 py-2"
        >
          ←
        </button>
        <button
          onClick={() =>
            ref.current?.scrollBy({ left: 600, behavior: "smooth" })
          }
          className="rounded-lg border bg-white px-3 py-2"
        >
          →
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 md:hidden">
        {pipeline.stages.map((s) => (
          <button
            className={`shrink-0 rounded-full px-4 py-2 text-xs ${stage === s.id ? "bg-blue-600 text-white" : "border bg-white"}`}
            onClick={() => crm.setActiveStageId(s.id)}
            key={s.id}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="hidden snap-x gap-4 overflow-x-auto [scrollbar-width:none] md:flex"
      >
        {pipeline.stages.map((s) => (
          <Column
            key={s.id}
            label={s.label}
            items={groups[s.id] ?? []}
            pick={(o)=>crm.selectOpportunity(o.id)}
          />
        ))}
      </div>
      <div className="md:hidden">
        <Column
          label={pipeline.stages.find((s) => s.id === stage)?.label ?? ""}
          items={groups[stage] ?? []}
          pick={(o)=>crm.selectOpportunity(o.id)}
        />
      </div>
      {selected && (
        <Detail
          item={selected}
          close={crm.closeSelection}
          move={move}
          lose={crm.markLost}
          addNote={(id)=>crm.addNote({id:`demo-note-${crm.state.activities.length+1}`,opportunityId:id,type:"note",occurredAt:"2026-09-08T17:30:00",summary:"Nota comercial agregada"})}
        />
      )}
    </>
  );
}
function Column({
  label,
  items,
  pick,
}: {
  readonly label: string;
  readonly items: Opportunity[];
  readonly pick: (o: Opportunity) => void;
}) {
  return (
    <section className="w-full shrink-0 snap-start border-t-2 border-blue-500 bg-slate-100/70 p-3 md:w-[285px]">
      <header className="mb-4 py-2">
        <p className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </p>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{items.length} oportunidades</span>
          <b className="text-slate-900">
            {usd(items.reduce((n, o) => n + (o.value ?? 0), 0))}
          </b>
        </div>
      </header>
      {items.map((o) => {
        const co = companies.find((c) => c.id === o.metadata?.companyId);
        const ct = contacts.find((c) => c.id === o.contactId);
        const owner = sellers.find((s) => s.id === o.ownerId);
        const task = getNextTask(tasks, { opportunityId: o.id });
        return (
          <button
            onClick={() => pick(o)}
            className="mb-3 w-full rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1"
            key={o.id}
          >
            <div className="flex justify-between">
              <b>{co?.name}</b>
              {Boolean(o.metadata?.risk) && <Badge tone="amber">Atención</Badge>}
            </div>
            <p className="mt-2 text-xs text-slate-500">{o.title}</p>
            <p className="mt-4 text-xl font-semibold">{usd(o.value ?? 0)}</p>
            <p className="mt-4 text-xs">{ct?.name}</p>
            {task && (
              <div className="mt-4 border-t pt-3">
                <p className="text-[9px] font-bold uppercase text-blue-600">
                  Próxima acción
                </p>
                <p className="text-xs">
                  {task.title} · {dt(task.dueAt)}
                </p>
              </div>
            )}
            <div className="mt-3 flex items-center gap-2">
              <Avatar name={owner?.name ?? ""} />
              <span className="text-[10px] text-slate-400">{owner?.name}</span>
            </div>
          </button>
        );
      })}
    </section>
  );
}
function Detail({
  item,
  close,
  move,
  lose,
  addNote,
}: {
  readonly item: Opportunity;
  readonly close: () => void;
  readonly move: (a: string, b: string) => void;
  readonly lose: (id:string) => void;
  readonly addNote: (id:string) => void;
}) {
  const co = companies.find((c) => c.id === item.metadata?.companyId);
  const ct = contacts.find((c) => c.id === item.contactId);
  const owner = sellers.find((s) => s.id === item.ownerId);
  return (
    <Drawer onClose={close}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
        Opportunity intelligence
      </p>
      <h3 className="mt-4 text-3xl font-semibold">{co?.name}</h3>
      <p className="mt-1 text-slate-500">{item.title}</p>
      <p className="mt-6 text-4xl font-semibold">{usd(item.value ?? 0)}</p>
      <div className="my-6 grid grid-cols-2 gap-4 border-y py-5 text-sm">
        <div>
          <small>Contacto</small>
          <p>{ct?.name}</p>
        </div>
        <div>
          <small>Responsable</small>
          <p>{owner?.name}</p>
        </div>
      </div>
      <h4 className="font-semibold">Timeline</h4>
      {activities
        .filter((a) => a.opportunityId === item.id)
        .concat(activities.slice(0, 2))
        .slice(0, 4)
        .map((a) => (
          <div className="mt-3 border-l-2 border-blue-500 pl-4" key={a.id}>
            <b className="text-sm">{a.summary}</b>
            <p className="text-xs text-slate-400">{dt(a.occurredAt)}</p>
          </div>
        ))}
      <select
        className="mt-7 w-full rounded-lg border bg-white p-3"
        value={item.stageId}
        onChange={(e) => move(item.id, e.target.value)}
      >
        {pipeline.stages.map((s) => (
          <option value={s.id} key={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => move(item.id, "vs7")}
          className="rounded-lg bg-emerald-600 p-3 text-white"
        >
          Marcar ganada
        </button>
        <button onClick={()=>lose(item.id)} className="rounded-lg border p-3">Marcar perdida</button>
        <button onClick={()=>addNote(item.id)} className="rounded-lg border p-3">Agregar nota</button>
        <button className="rounded-lg border p-3">Nueva tarea</button>
      </div>
    </Drawer>
  );
}
