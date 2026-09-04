"use client";
import {
  contacts,
  policies,
  producers,
  products,
  renewals,
} from "@software-factory/mock-data/insurance";
import { Badge, Intro, Panel, usd } from "../_components/covera";
const groups = [
  {
    risk: "critical",
    title: "Atención inmediata",
    copy: "Vencen en menos de 10 días",
  },
  { risk: "attention", title: "Próximas", copy: "Contactar y cotizar" },
  { risk: "planned", title: "Planificadas", copy: "Seguimiento preventivo" },
] as const;
export default function Renovaciones() {
  return (
    <>
      <Intro
        tag="Renewal desk"
        title="Renovaciones"
        copy="Priorización comercial de vencimientos y retención de cartera."
      />
      <div className="grid gap-5 xl:grid-cols-3">
        {groups.map((g) => (
          <Panel className="p-4" key={g.risk}>
            <div className="mb-4">
              <h3 className="font-semibold">{g.title}</h3>
              <p className="text-xs text-slate-400">{g.copy}</p>
            </div>
            {renewals
              .filter((x) => x.risk === g.risk)
              .map((r) => {
                const p = policies.find((x) => x.id === r.policyId)!;
                return (
                  <article
                    className="mb-3 rounded-xl border bg-white p-4"
                    key={r.policyId}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <b>
                          {contacts.find((x) => x.id === p.contactId)?.name}
                        </b>
                        <p className="text-xs text-slate-500">
                          {products.find((x) => x.id === p.productId)?.name} ·{" "}
                          {p.policyNumber}
                        </p>
                      </div>
                      <Badge
                        tone={
                          g.risk === "critical"
                            ? "red"
                            : g.risk === "attention"
                              ? "amber"
                              : "green"
                        }
                      >
                        {r.daysRemaining} días
                      </Badge>
                    </div>
                    <p className="mt-4 text-xl font-semibold">
                      {usd(p.premium)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Productor: {producers.find(x=>x.id===p.producerId)?.name}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <span className="text-[10px] uppercase text-slate-400">
                        {r.status}
                      </span>
                      <button className="text-xs font-semibold text-emerald-700">
                        Gestionar →
                      </button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]"><button className="rounded border p-2">Contactar</button><button className="rounded border p-2">Crear oportunidad</button><button className="rounded border p-2">Marcar gestionada</button><button className="rounded border p-2">Ver cliente</button></div>
                  </article>
                );
              })}
          </Panel>
        ))}
      </div>
    </>
  );
}
