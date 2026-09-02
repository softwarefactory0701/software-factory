import { beautyVertical } from "@software-factory/verticals/beauty";
import { SectionHeader, StatusBadge } from "@software-factory/ui";
import { BeautyPageIntro, BeautyPanel } from "../_components/beauty-primitives";

const settings = [
  { description: "Lunes a sábado · 09:00 a 19:00", label: "Horario del estudio", value: "Configurado" },
  { description: "Duración, precio y profesionales asociados", label: "Carta de servicios", value: "6 servicios" },
  { description: "Colorista, Nail Artist y Stylist", label: "Equipo profesional", value: "3 perfiles" },
];

export default function BeautySettingsPage() {
  return (
    <>
      <BeautyPageIntro description="Una vista comercial de cómo AURA podría adaptar la experiencia a su operación." title="Configuración del estudio" />
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <BeautyPanel className="p-5 sm:p-6"><SectionHeader description="Información que identifica al negocio dentro de la experiencia." title="Identidad de marca" /><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-stone-500">Nombre comercial<input className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm font-normal text-stone-700" readOnly value={beautyVertical.businessName} /></label><label className="text-xs font-semibold text-stone-500">Moneda y región<input className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm font-normal text-stone-700" readOnly value="ARS · Español (Argentina)" /></label></div><div className="mt-5"><p className="text-xs font-semibold text-stone-500">Paleta visual</p><div className="mt-3 flex gap-3">{Object.entries({ Marfil: "#f7f3ed", Nude: "#a76f73", Grafito: "#292623", Blanco: "#fffdf9" }).map(([name, color]) => <div className="text-center" key={name}><span className="block size-10 rounded-full border border-stone-200 shadow-sm" style={{ backgroundColor: color }} /><span className="mt-1 block text-[9px] text-stone-400">{name}</span></div>)}</div></div></BeautyPanel>
          <BeautyPanel className="overflow-hidden"><div className="p-5 sm:p-6"><SectionHeader description="Datos de demostración que describen la operación de AURA." title="Operación" /></div><div className="divide-y divide-stone-100">{settings.map((setting) => <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6" key={setting.label}><div><p className="text-sm font-semibold text-stone-700">{setting.label}</p><p className="mt-1 text-xs text-stone-400">{setting.description}</p></div><StatusBadge tone="success">{setting.value}</StatusBadge></div>)}</div></BeautyPanel>
          <BeautyPanel className="p-5 sm:p-6"><SectionHeader description="Estas opciones son exclusivamente ilustrativas en la demo." title="Preferencias visuales" /><div className="mt-5 space-y-4">{[{ label: "Recordatorios de turnos", enabled: true }, { label: "Resumen diario para gerencia", enabled: true }, { label: "Solicitar seña al reservar", enabled: false }].map((item) => <div className="flex items-center justify-between rounded-xl bg-[#faf6f1] p-4" key={item.label}><div><p className="text-sm font-semibold text-stone-700">{item.label}</p><p className="mt-1 text-[10px] text-stone-400">Configuración simulada · Sin envío ni cobro real</p></div><span aria-label={item.enabled ? "Activado" : "Desactivado"} className={`relative h-6 w-11 rounded-full ${item.enabled ? "bg-[#a76f73]" : "bg-stone-300"}`} role="img"><span className={`absolute top-1 size-4 rounded-full bg-white shadow-sm ${item.enabled ? "right-1" : "left-1"}`} /></span></div>)}</div></BeautyPanel>
        </div>
        <BeautyPanel className="h-fit overflow-hidden xl:sticky xl:top-24"><div className="bg-[#292623] p-7 text-center text-white"><span className="mx-auto grid size-16 place-items-center rounded-full border border-white/20 font-display text-3xl text-[#ead8ce]">A</span><p className="mt-4 font-display text-2xl font-semibold">AURA</p><p className="text-xs uppercase tracking-[.22em] text-white/45">Beauty Studio</p></div><div className="p-5"><StatusBadge tone="warning">DEMO activa</StatusBadge><p className="mt-4 text-sm leading-6 text-stone-600">Esta configuración presenta cómo podría verse el sistema de un salón premium. No guarda cambios ni conecta servicios externos.</p><div className="mt-5 rounded-xl bg-[#faf6f1] p-4"><p className="text-xs font-semibold text-stone-700">Demo by Software Factory</p><p className="mt-1 text-[10px] leading-4 text-stone-400">Escenario: {beautyVertical.demo.scenarioName}</p></div></div></BeautyPanel>
      </div>
    </>
  );
}
