"use client";
import {
  activities,
  contacts,
  opportunities,
  tasks,
} from "@software-factory/mock-data/insurance";
import { useCrmDemo } from "@software-factory/crm-ui";
import { Intro, Panel } from "../_components/covera";
export default function Seguimientos() {
  const crm = useCrmDemo({ opportunities, tasks, activities });
  return (
    <>
      <Intro
        tag="Action queue"
        title="Seguimientos"
        copy="Tareas priorizadas para renovaciones y nuevas coberturas."
        action={
          <button
            onClick={crm.reset}
            className="rounded-lg border bg-white px-4 py-2 text-xs"
          >
            Reset demo
          </button>
        }
      />
      <div className="space-y-8">
        {[{title:"Atrasados",test:(d:string)=>d.slice(0,10)<"2026-09-08"},{title:"Hoy",test:(d:string)=>d.slice(0,10)==="2026-09-08"},{title:"Próximos",test:(d:string)=>d.slice(0,10)>"2026-09-08"},{title:"Completados",test:()=>true,completed:true}].map(group=><section key={group.title}><h3 className="mb-3 text-lg font-semibold">{group.title}</h3><div className="grid gap-4 lg:grid-cols-2">
        {crm.state.tasks.filter(t=>group.completed?t.status==="completed":t.status!=="completed"&&group.test(t.dueAt)).map((t) => (
          <Panel
            className={`p-5 ${t.status === "completed" ? "opacity-50" : ""}`}
            key={t.id}
          >
            <div className="flex items-start gap-4">
              <button
                aria-label="Cambiar estado"
                onClick={() => crm.toggleTask(t.id)}
                className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${t.status === "completed" ? "border-emerald-700 bg-emerald-700 text-white" : "bg-white"}`}
              >
                {t.status === "completed" ? "✓" : ""}
              </button>
              <div>
                <b className={t.status === "completed" ? "line-through" : ""}>
                  {t.title}
                </b>
                <p className="mt-1 text-sm text-slate-500">
                  {contacts.find((x) => x.id === t.contactId)?.name}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {t.dueAt.slice(0, 10)} · {t.dueAt.slice(11, 16)}
                </p>
              </div>
            </div>
          </Panel>
        ))}
        </div></section>)}
      </div>
    </>
  );
}
