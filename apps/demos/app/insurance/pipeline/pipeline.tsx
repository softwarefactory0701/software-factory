"use client";
import { useMemo, useRef } from "react";
import {
  activities,
  contacts,
  opportunities,
  pipeline,
  policies,
  producers,
  products,
  renewals,
  tasks,
} from "@software-factory/mock-data/insurance";
import {
  buildOpportunityTimeline,
  groupOpportunitiesByStage,
  getNextTask,
  type Opportunity,
} from "@software-factory/crm-core";
import { useCrmDemo } from "@software-factory/crm-ui";
import { Avatar, Badge, Drawer, Intro, usd } from "../_components/covera";
export function InsurancePipeline() {
  const crm = useCrmDemo({ opportunities, tasks, activities });
  const active = crm.activeStageId || "is1";
  const groups = useMemo(
    () => groupOpportunitiesByStage(crm.state.opportunities, pipeline.stages),
    [crm.state.opportunities],
  );
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="min-w-0 overflow-hidden">
      <Intro
        tag="Coverage opportunities"
        title="Pipeline"
        copy="Nuevas pólizas, renovaciones y cross-sell avanzando hacia emisión."
        action={
          <button
            onClick={crm.reset}
            className="rounded-lg border bg-white px-4 py-2 text-xs"
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
      <div className="flex gap-2 overflow-x-auto pb-4 [scrollbar-width:none] md:hidden">
        {pipeline.stages.map((s) => (
          <button
            onClick={() => crm.setActiveStageId(s.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs ${active === s.id ? "bg-[#11665a] text-white" : "border bg-white"}`}
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
          <Stage
            label={s.label}
            items={groups[s.id] ?? []}
            select={crm.selectOpportunity}
            key={s.id}
          />
        ))}
      </div>
      <div className="md:hidden">
        <Stage
          label={pipeline.stages.find((s) => s.id === active)?.label ?? ""}
          items={groups[active] ?? []}
          select={crm.selectOpportunity}
        />
      </div>
      {crm.selectedOpportunity && (
        <Detail
          item={crm.selectedOpportunity}
          close={crm.closeSelection}
          move={(id, s) =>
            s === "is7" ? crm.markWon(id, s) : crm.moveOpportunity(id, s)
          }
          lose={crm.markLost}
          note={(id) =>
            crm.addNote({
              id: `covera-note-${crm.state.activities.length + 1}`,
              opportunityId: id,
              type: "note",
              occurredAt: "2026-09-08T17:30:00",
              summary: "Nota de cobertura agregada",
            })
          }
        />
      )}
    </div>
  );
}
function Stage({
  label,
  items,
  select,
}: {
  readonly label: string;
  readonly items: Opportunity[];
  readonly select: (id: string) => void;
}) {
  return (
    <section className="w-full shrink-0 snap-start border-t-2 border-emerald-600 bg-[#e9eeea] p-3 md:w-[290px]">
      <div className="mb-4 py-2">
        <b className="text-[10px] uppercase tracking-wider">{label}</b>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{items.length} oportunidades</span>
          <b>{usd(items.reduce((n, o) => n + (o.value ?? 0), 0))}</b>
        </div>
      </div>
      {items.map((o) => {
        const p = policies.find((x) => x.id === o.metadata?.policyId);
        const renewal = renewals.find((x) => x.policyId === p?.id);
        const owner = producers.find((x) => x.id === o.ownerId);
        const task = getNextTask(tasks, { opportunityId: o.id });
        return (
          <button
            onClick={() => select(o.id)}
            className="mb-3 w-full rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1"
            key={o.id}
          >
            <div className="flex justify-between">
              <b>{contacts.find((c) => c.id === o.contactId)?.name}</b>
              {renewal && renewal.daysRemaining < 10 && (
                <Badge tone="amber">{renewal.daysRemaining} días</Badge>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">{o.title}</p>
            <p className="mt-1 text-[10px] text-slate-400">
              {products.find((x) => x.id === p?.productId)?.name} · {p?.insurer}
            </p>
            <p className="mt-4 text-xl font-semibold">
              {usd(o.value ?? 0)}{" "}
              <small className="text-[9px] font-normal">anual</small>
            </p>
            {task && (
              <div className="mt-4 border-t pt-3">
                <p className="text-[9px] font-bold uppercase text-emerald-700">
                  Próxima acción
                </p>
                <p className="text-xs">{task.title}</p>
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
  note,
}: {
  readonly item: Opportunity;
  readonly close: () => void;
  readonly move: (a: string, b: string) => void;
  readonly lose: (id: string) => void;
  readonly note: (id: string) => void;
}) {
  const p = policies.find((x) => x.id === item.metadata?.policyId);
  return (
    <Drawer close={close}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
        Coverage opportunity
      </p>
      <h3 className="mt-4 text-3xl font-semibold">
        {contacts.find((c) => c.id === item.contactId)?.name}
      </h3>
      <p className="text-slate-500">{item.title}</p>
      <p className="mt-6 text-4xl font-semibold">{usd(item.value ?? 0)}</p>
      <div className="my-6 grid grid-cols-2 gap-4 border-y py-5 text-sm">
        <div>
          <small>Póliza</small>
          <p>{p?.policyNumber}</p>
        </div>
        <div>
          <small>Productor</small>
          <p>{producers.find((x) => x.id === item.ownerId)?.name}</p>
        </div>
      </div>
      <h4 className="font-semibold">Timeline</h4>
      {buildOpportunityTimeline(item.id, activities, tasks)
        .concat(buildOpportunityTimeline(opportunities[0]!.id, activities))
        .slice(0, 4)
        .map((x, i) => (
          <div
            className="mt-3 border-l-2 border-emerald-600 pl-4"
            key={`${x.id}-${i}`}
          >
            <b className="text-sm">{x.label}</b>
            <p className="text-xs text-slate-400">
              {x.occurredAt.slice(0, 10)}
            </p>
          </div>
        ))}
      <select
        value={item.stageId}
        onChange={(e) => move(item.id, e.target.value)}
        className="mt-7 w-full rounded-lg border bg-white p-3"
      >
        {pipeline.stages.map((s) => (
          <option value={s.id} key={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => move(item.id, "is7")}
          className="rounded-lg bg-emerald-700 p-3 text-white"
        >
          Marcar emitida
        </button>
        <button onClick={() => lose(item.id)} className="rounded-lg border p-3">
          Marcar perdida
        </button>
        <button onClick={() => note(item.id)} className="rounded-lg border p-3">
          Agregar nota
        </button>
        <button className="rounded-lg border p-3">Nueva tarea</button>
      </div>
    </Drawer>
  );
}
