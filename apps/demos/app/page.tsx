import { DEMO_NOTICE } from "@software-factory/mock-data";
import { Badge, Card } from "@software-factory/ui";

const verticals = [
  { description: "Gestión visual para salones, estudios y spas.", href: "/beauty", name: "Beauty", status: "Demo disponible" },
  { description: "Vertical planificada.", name: "Taller", status: "Próximamente" },
  { description: "Vertical planificada.", name: "Consultorio", status: "Próximamente" },
  { description: "Vertical planificada.", name: "Stock", status: "Próximamente" },
  { description: "Vertical planificada.", name: "Autoparts", status: "Próximamente" },
  { description: "Vertical planificada.", name: "Inmobiliaria", status: "Próximamente" },
  { description: "Vertical planificada.", name: "Sales", status: "Próximamente" },
] as const;

export default function DemosPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge>DEMO</Badge>
            <h1 className="mt-4 text-4xl font-bold">Catálogo de verticales</h1>
            <p className="mt-2 text-slate-600">Experiencias comerciales navegables por industria.</p>
          </div>
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">{DEMO_NOTICE}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((vertical) => (
            <Card className={`flex min-h-48 flex-col justify-between ${vertical.name === "Beauty" ? "border-rose-200 bg-[#fffaf7]" : ""}`} key={vertical.name}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{vertical.status}</p>
                <h2 className="mt-2 text-2xl font-semibold">{vertical.name}</h2>
                <p className="mt-2 text-sm text-slate-500">{vertical.description}</p>
              </div>
              {"href" in vertical ? <a className="mt-6 text-sm font-semibold text-rose-700" href={vertical.href}>Explorar demo →</a> : <span className="mt-6 text-sm text-slate-500">Próximamente</span>}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
