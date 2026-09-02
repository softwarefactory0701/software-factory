import { beautyDashboard, beautyProfessionals, beautyReports } from "@software-factory/mock-data/beauty";
import { ProgressBar, SectionHeader, StatCard } from "@software-factory/ui";
import { BeautyIcon } from "../_components/beauty-icon";
import { BeautyAvatar, BeautyPageIntro, BeautyPanel } from "../_components/beauty-primitives";
import { formatCurrency } from "../_components/beauty-utils";

export default function BeautyReportsPage() {
  const maxRevenue = Math.max(...beautyReports.monthlyRevenue.map((item) => item.value));
  return (
    <>
      <BeautyPageIntro description="Indicadores simples para tomar decisiones con más confianza y menos intuición." eyebrow="Resumen gerencial · Septiembre 2026" title="El negocio, bajo control" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard detail="+5,7% vs. agosto" icon={<BeautyIcon name="revenue" />} label="Facturación mensual" value="$336.000" />
        <StatCard detail="126 clientas activas" icon={<BeautyIcon name="users" />} label="Clientes recurrentes" value={`${beautyReports.recurringCustomers}%`} />
        <StatCard detail="Meta comercial: 85%" icon={<BeautyIcon name="spark" />} label="Ocupación promedio" value="87%" />
        <StatCard detail="-1,2 pts vs. agosto" icon={<BeautyIcon name="calendar" />} label="Cancelaciones" value={`${beautyReports.cancellationRate}%`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
        <BeautyPanel className="p-5 sm:p-6">
          <SectionHeader description="Evolución visual de los últimos seis meses." title="Facturación" />
          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-6">
            {beautyReports.monthlyRevenue.map((item) => <div className="flex h-full flex-1 flex-col justify-end text-center" key={item.label}><p className="mb-2 hidden text-[10px] text-stone-400 sm:block">{formatCurrency(item.value)}</p><div className={`mx-auto w-full max-w-14 rounded-t-xl ${item.label === "Sep" ? "bg-[#a76f73]" : "bg-[#ddc4bb]"}`} style={{ height: `${(item.value / maxRevenue) * 190}px` }} /><p className="mt-3 text-xs font-semibold text-stone-500">{item.label}</p></div>)}
          </div>
        </BeautyPanel>
        <BeautyPanel className="p-5 sm:p-6">
          <SectionHeader description="Participación estimada por demanda." title="Servicios más vendidos" />
          <div className="mt-6 space-y-5">{beautyDashboard.servicePerformance.map((service) => <div key={service.name}><ProgressBar label={service.name} value={service.percentage} /><p className="mt-1 text-right text-[10px] text-stone-400">{service.bookings} reservas</p></div>)}</div>
        </BeautyPanel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <BeautyPanel className="p-5 sm:p-6"><SectionHeader description="Comparativa visual del aporte del equipo." title="Desempeño por profesional" /><div className="mt-6 space-y-4">{beautyProfessionals.map((professional) => <div className="flex items-center gap-3 rounded-xl bg-[#faf6f1] p-3" key={professional.id}><BeautyAvatar initials={professional.avatar} name={professional.name} size="sm" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><p className="truncate text-sm font-semibold text-stone-700">{professional.name}</p><p className="text-xs font-semibold text-stone-700">{formatCurrency(professional.revenue)}</p></div><div className="mt-2 h-1.5 rounded-full bg-white"><div className="h-full rounded-full bg-[#a76f73]" style={{ width: `${professional.occupation}%` }} /></div></div></div>)}</div></BeautyPanel>
        <BeautyPanel className="p-5 sm:p-6"><SectionHeader description="Señales para proteger la agenda y la recurrencia." title="Clientes y cancelaciones" /><div className="mt-7 grid grid-cols-2 gap-4"><div className="rounded-2xl bg-[#faf6f1] p-5 text-center"><p className="font-display text-4xl font-semibold">126</p><p className="mt-1 text-xs text-stone-400">clientes recurrentes</p></div><div className="rounded-2xl bg-[#faf6f1] p-5 text-center"><p className="font-display text-4xl font-semibold">9</p><p className="mt-1 text-xs text-stone-400">cancelaciones</p></div></div><div className="mt-5 rounded-xl border border-[#ead8ce] bg-[#fcf6f2] p-4"><p className="text-xs font-semibold text-[#8b6265]">Lectura comercial</p><p className="mt-2 text-sm leading-6 text-stone-600">La recurrencia se mantiene sólida y la tasa de cancelación está por debajo del 5%. En producción, estos datos ayudarían a decidir campañas y políticas de reserva.</p></div></BeautyPanel>
      </div>
    </>
  );
}
