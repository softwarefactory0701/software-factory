import { Badge, Card } from "@software-factory/ui";

const principles = [
  "Experiencias visuales realistas",
  "Datos completamente ficticios",
  "Acciones seguras y simuladas",
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Badge>SOFTWARE FACTORY</Badge>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-7xl">
          Software vertical que se puede explorar antes de comprar.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Construimos demos comerciales navegables para presentar soluciones específicas de cada industria. Cada producto vendido se desarrolla después como una solución de producción independiente.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <Card key={principle}>
              <span className="text-sm font-bold text-amber-700">0{index + 1}</span>
              <h2 className="mt-4 text-lg font-semibold">{principle}</h2>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-slate-950 p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">Principio central</p>
          <p className="mt-4 text-3xl font-bold">Demo ≠ Producción</p>
          <p className="mt-3 max-w-2xl text-slate-300">
            Una demo comunica valor. No procesa pagos, no autentica usuarios reales y no conecta servicios externos.
          </p>
        </div>
      </section>
    </main>
  );
}
