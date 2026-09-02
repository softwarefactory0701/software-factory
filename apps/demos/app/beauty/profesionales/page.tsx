import { beautyProfessionals } from "@software-factory/mock-data/beauty";
import { ProgressBar, SectionHeader, StatCard, StatusBadge } from "@software-factory/ui";
import { BeautyIcon } from "../_components/beauty-icon";
import { BeautyAvatar, BeautyPageIntro, BeautyPanel } from "../_components/beauty-primitives";
import { formatCurrency } from "../_components/beauty-utils";

export default function BeautyProfessionalsPage() {
  return (
    <>
      <BeautyPageIntro description="Visibilidad sobre la agenda, especialidad y aporte de cada integrante." title="El talento detrás de AURA" />
      <div className="grid gap-5 xl:grid-cols-3">
        {beautyProfessionals.map((professional, index) => (
          <BeautyPanel className="overflow-hidden" key={professional.id}>
            <div className="h-20 bg-gradient-to-r from-[#ead8ce] via-[#f3e8e0] to-[#efe4d5]" />
            <div className="px-5 pb-5">
              <div className="-mt-7 flex items-end justify-between gap-3"><BeautyAvatar initials={professional.avatar} name={professional.name} size="lg" />{index === 0 ? <StatusBadge tone="warning">Top de la semana</StatusBadge> : <StatusBadge tone="success">Disponible</StatusBadge>}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-stone-900">{professional.name}</h3><p className="text-sm text-[#a76f73]">{professional.role}</p>
              <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#faf6f1] p-3"><p className="text-[10px] text-stone-400">Turnos esta semana</p><p className="mt-1 font-display text-2xl font-semibold">{professional.weeklyBookings}</p></div><div className="rounded-xl bg-[#faf6f1] p-3"><p className="text-[10px] text-stone-400">Facturación</p><p className="mt-1 font-display text-2xl font-semibold">{formatCurrency(professional.revenue)}</p></div></div>
              <ProgressBar className="mt-5" label="Ocupación" value={professional.occupation} />
              <div className="mt-5 border-t border-stone-100 pt-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Servicios principales</p><div className="mt-2 flex flex-wrap gap-2">{professional.services.map((service) => <StatusBadge key={service}>{service}</StatusBadge>)}</div></div>
            </div>
          </BeautyPanel>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard detail="Escenario de alta demanda" icon={<BeautyIcon name="calendar" />} label="Turnos del equipo" value="87" />
        <StatCard detail="Promedio visual semanal" icon={<BeautyIcon name="spark" />} label="Ocupación media" value="86%" />
        <StatCard detail="Sin cálculo ni cobro real" icon={<BeautyIcon name="revenue" />} label="Facturación generada" value="$53.190" />
      </div>

      <BeautyPanel className="mt-6 p-5 sm:p-6"><SectionHeader description="La agenda se distribuye según especialidad y preferencia de las clientas." title="Cobertura del equipo" /><div className="mt-6 grid gap-4 md:grid-cols-3">{[{ area: "Color", people: "Martina · Agustina", coverage: "Cobertura completa" }, { area: "Styling", people: "Agustina · Martina", coverage: "Cobertura completa" }, { area: "Nails", people: "Julieta", coverage: "Especialista dedicada" }].map((item) => <div className="rounded-xl border border-stone-100 p-4" key={item.area}><p className="font-display text-xl font-semibold">{item.area}</p><p className="mt-2 text-sm text-stone-600">{item.people}</p><p className="mt-3 text-xs text-emerald-600">● {item.coverage}</p></div>)}</div></BeautyPanel>
    </>
  );
}
