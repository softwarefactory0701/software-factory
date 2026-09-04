"use client";
import { useMemo, useRef } from "react";
import { useCrmDemo } from "@software-factory/crm-ui";
import {
  activities,
  agents,
  contacts,
  opportunities as seed,
  pipeline,
  properties,
  tasks,
} from "@software-factory/mock-data/inmobiliaria";
import {
  getNextTask,
  groupOpportunitiesByStage,
  resolveOpportunityContact,
  sortPipelineStages,
  type Opportunity,
} from "@software-factory/crm-core";
import {
  Avatar,
  Drawer,
  Intro,
  Pill,
  shortDate,
  usd,
} from "../_components/nova-ui";
export function PipelineExperience() {
  const crm=useCrmDemo({opportunities:seed,tasks,activities});const items=crm.state.opportunities;const selected=crm.selectedOpportunity;const mobileStage=crm.activeStageId||"s1";
  const board = useRef<HTMLDivElement>(null);
  const stages = sortPipelineStages(pipeline.stages);
  const groups = useMemo(
    () => groupOpportunitiesByStage(items, stages),
    [items, stages],
  );
  const move=(id:string,stageId:string)=>stageId==="s7"?crm.markWon(id,stageId):crm.moveOpportunity(id,stageId);
  const scroll = (direction: number) =>
    board.current?.scrollBy({ left: direction * 590, behavior: "smooth" });
  return (
    <>
      <Intro
        eyebrow="Deal room · 7 etapas"
        title="Pipeline comercial"
        description="Una vista boutique del recorrido de cada interesado, desde la consulta hasta el cierre."
        action={
          <button
            onClick={() => {
              crm.reset();
            }}
            className="nova-button"
          >
            Restablecer demo
          </button>
        }
      />
      <div className="md:hidden">
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[.2em] text-stone-500">
          Etapa activa
        </p>
        <div className="nova-scroll -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-4">
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => crm.setActiveStageId(s.id)}
              className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs ${mobileStage === s.id ? "bg-[#17324d] text-white" : "border border-stone-300 bg-white"}`}
            >
              {s.label} · {groups[s.id]?.length ?? 0}
            </button>
          ))}
        </div>
        <Stage
          label={stages.find((s) => s.id === mobileStage)?.label ?? "Etapa"}
          items={groups[mobileStage] ?? []}
          onSelect={(o)=>crm.selectOpportunity(o.id)}
        />
      </div>
      <div className="hidden md:block">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] text-stone-400">
            Deslizá o usá los controles para recorrer las 7 etapas
          </p>
          <div className="flex gap-2">
            <button
              aria-label="Etapas anteriores"
              className="nova-arrow"
              onClick={() => scroll(-1)}
            >
              ←
            </button>
            <button
              aria-label="Etapas siguientes"
              className="nova-arrow"
              onClick={() => scroll(1)}
            >
              →
            </button>
          </div>
        </div>
        <div className="nova-board-wrap">
          <div ref={board} className="nova-board nova-scroll">
            {stages.map((s) => (
              <Stage
                key={s.id}
                label={s.label}
                items={groups[s.id] ?? []}
                onSelect={(o)=>crm.selectOpportunity(o.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <OpportunityDrawer
          item={selected}
          onClose={crm.closeSelection}
          move={move}
          lose={crm.markLost}
          addNote={(id)=>crm.addNote({id:`nova-note-${crm.state.activities.length+1}`,opportunityId:id,type:"note",occurredAt:"2026-09-08T17:30:00",summary:"Nota comercial agregada"})}
        />
      )}
    </>
  );
}
function Stage({
  label,
  items,
  onSelect,
}: {
  readonly label: string;
  readonly items: Opportunity[];
  readonly onSelect: (o: Opportunity) => void;
}) {
  const total = items.reduce((sum, x) => sum + (x.value ?? 0), 0);
  return (
    <section className="nova-stage w-full shrink-0 md:w-[286px]">
      <header className="mb-5 border-t border-[#b99966] px-1 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#263d50]">
          {label}
        </p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-xs text-stone-400">{items.length} oportunidades</p>
          <p className="text-sm font-semibold text-[#17324d]">{usd(total)}</p>
        </div>
      </header>
      <div className="space-y-4">
        {items.map((o) => {
          const c = resolveOpportunityContact(o, contacts);
          const p = properties.find((x) => x.id === o.metadata?.propertyId);
          const task = getNextTask(tasks, { opportunityId: o.id });
          const a = agents.find((x) => x.id === o.ownerId);
          return (
            <button
              onClick={() => onSelect(o)}
              className="nova-opportunity nova-card-lift w-full text-left"
              key={o.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg font-semibold text-[#152d42]">
                    {c?.name}
                  </p>
                  <p className="mt-3 text-xs font-medium text-[#344a5c]">
                    {p?.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-400">{p?.zone}</p>
                </div>
                <Avatar name={a?.name ?? ""} />
              </div>
              <p className="mt-5 text-xl font-semibold tracking-tight text-[#17324d]">
                {usd(o.value ?? 0)}
              </p>
              {task && (
                <div className="mt-5 border-t border-stone-200/60 pt-3">
                  <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#9a7543]">
                    Próxima acción
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-stone-600">
                    {task.title}
                  </p>
                  <p className="text-[10px] text-stone-400">
                    {shortDate(task.dueAt)}
                  </p>
                </div>
              )}
              <p className="mt-3 text-[10px] text-stone-400">
                Asesor · {a?.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
function OpportunityDrawer({
  item,
  onClose,
  move,
  lose,
  addNote,
}: {
  readonly item: Opportunity;
  readonly onClose: () => void;
  readonly move: (id: string, stage: string) => void;
  readonly lose: (id:string) => void;
  readonly addNote: (id:string) => void;
}) {
  const c = resolveOpportunityContact(item, contacts);
  const p = properties.find((x) => x.id === item.metadata?.propertyId);
  const a = agents.find((x) => x.id === item.ownerId);
  const task = getNextTask(tasks, { opportunityId: item.id });
  const history = activities.filter((x) => x.opportunityId === item.id);
  return (
    <Drawer title="Oportunidad NOVA" onClose={onClose}>
      <div className="border-b border-stone-200 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#9a7543]">
          {p?.zone} · {p?.type}
        </p>
        <h3 className="mt-2 font-serif text-3xl font-semibold text-[#142b40]">
          {p?.title}
        </h3>
        <p className="mt-5 text-4xl font-semibold tracking-tight text-[#17324d]">
          {usd(item.value ?? 0)}
        </p>
      </div>
      <div className="flex items-center justify-between py-5">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-stone-400">
            Interesado
          </p>
          <p className="mt-1 font-medium">{c?.name}</p>
        </div>
        <Pill tone="sand">
          {pipeline.stages.find((s) => s.id === item.stageId)?.label}
        </Pill>
      </div>
      <div className="flex items-center gap-3 border-b border-stone-200 pb-5">
        <Avatar name={a?.name ?? ""} />
        <div>
          <p className="text-sm font-medium">{a?.name}</p>
          <p className="text-xs text-stone-400">Asesor responsable</p>
        </div>
      </div>
      {task && (
        <div className="mt-6 border-l-2 border-[#c09b65] bg-white/60 p-4">
          <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#8a6635]">
            Próxima acción
          </p>
          <p className="mt-2 font-medium">{task.title}</p>
          <p className="text-xs text-stone-500">{shortDate(task.dueAt)}</p>
        </div>
      )}
      <h4 className="mt-8 font-serif text-xl font-semibold">
        Timeline comercial
      </h4>
      <div className="mt-5 border-l border-[#c9aa78] pl-5">
        {(history.length ? history : activities.slice(0, 3)).map((x, i) => (
          <div className="relative pb-6" key={x.id}>
            <span className="absolute -left-[25px] top-1 h-2 w-2 rounded-full bg-[#17324d]" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
              {i === 0 ? "Hoy" : i === 1 ? "Ayer" : "05 Sep"}
            </p>
            <p className="mt-1 text-sm">{x.summary}</p>
          </div>
        ))}
      </div>
      <label className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-stone-500">
        Mover a etapa
        <select
          className="nova-input mt-2 w-full p-3 text-sm font-normal normal-case"
          value={item.stageId}
          onChange={(e) => move(item.id, e.target.value)}
        >
          {pipeline.stages.map((s) => (
            <option value={s.id} key={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <button
          onClick={() => move(item.id, "s7")}
          className="nova-button-primary"
        >
          Marcar ganada
        </button>
        <button onClick={()=>lose(item.id)} className="nova-button">Marcar perdida</button>
        <button onClick={()=>addNote(item.id)} className="nova-button">Agregar nota</button>
      </div>
    </Drawer>
  );
}
