"use client";

import { beautyProfessionals, beautyServices } from "@software-factory/mock-data/beauty";
import { SectionHeader, StatusBadge } from "@software-factory/ui";
import { useState } from "react";
import { BeautyPageIntro, BeautyPanel } from "../_components/beauty-primitives";
import { formatCurrency } from "../_components/beauty-utils";

const filters = ["Todos", "Cabello", "Color", "Manos"] as const;
type ServiceFilter = (typeof filters)[number];

export function ServicesExperience() {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("Todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const filteredServices = beautyServices.filter((service) => activeFilter === "Todos" || service.category === activeFilter);

  function simulateServiceCreation() {
    setModalOpen(false);
    setFeedback(true);
    window.setTimeout(() => setFeedback(false), 3000);
  }

  return (
    <>
      <BeautyPageIntro
        action={<button className="inline-flex items-center gap-2 rounded-xl bg-[#292623] px-4 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={() => setModalOpen(true)} type="button"><span className="text-lg leading-none">+</span> Nuevo servicio</button>}
        description="Una carta de servicios clara, rentable y conectada con el talento del equipo."
        title="Servicios de AURA"
      />

      <div className="mb-5 flex max-w-full gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => <button aria-pressed={activeFilter === filter} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeFilter === filter ? "bg-[#292623] text-white" : "border border-stone-200 bg-[#fffdf9] text-stone-500 hover:border-[#c9a5a3]"}`} key={filter} onClick={() => setActiveFilter(filter)} type="button">{filter}</button>)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => {
          const professionals = service.professionalIds.flatMap((id) => {
            const professional = beautyProfessionals.find((item) => item.id === id);
            return professional ? [professional.name.split(" ")[0]] : [];
          });
          return (
            <BeautyPanel className={`flex min-h-64 flex-col p-5 ${service.active ? "" : "opacity-65"}`} key={service.id}>
              <div className="flex items-start justify-between gap-3"><StatusBadge tone={service.category === "Manos" ? "info" : service.category === "Color" ? "warning" : "neutral"}>{service.category}</StatusBadge><StatusBadge tone={service.active ? "success" : "neutral"}>{service.active ? "Activo" : "Inactivo"}</StatusBadge></div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-stone-900">{service.name}</h3>
              <div className="mt-3 flex items-baseline gap-3"><span className="font-display text-3xl font-semibold text-[#8b6265]">{formatCurrency(service.price)}</span><span className="text-xs text-stone-400">{service.durationMinutes} minutos</span></div>
              <div className="mt-auto border-t border-stone-100 pt-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Realizado por</p><p className="mt-2 text-sm font-medium text-stone-700">{professionals.join(" · ")}</p></div>
            </BeautyPanel>
          );
        })}
      </div>

      <BeautyPanel className="mt-6 p-5 sm:p-6">
        <SectionHeader description="Lectura comercial del mix actual, sin cálculos productivos." title="Composición de la carta" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[{ label: "Color", value: "2 servicios", detail: "Mayor ticket promedio" }, { label: "Cabello", value: "1 servicio", detail: "Alta recurrencia" }, { label: "Manos", value: "3 servicios", detail: "Mayor frecuencia" }].map((item) => <div className="rounded-2xl bg-[#faf6f1] p-4" key={item.label}><p className="text-xs font-semibold text-[#a76f73]">{item.label}</p><p className="mt-2 font-display text-xl font-semibold">{item.value}</p><p className="mt-1 text-xs text-stone-400">{item.detail}</p></div>)}
        </div>
      </BeautyPanel>

      {feedback ? <div className="fixed bottom-24 right-4 z-60 rounded-xl bg-[#292623] px-4 py-3 text-sm font-medium text-white shadow-xl lg:bottom-6">Servicio de demostración creado ✓</div> : null}

      {modalOpen ? (
        <div aria-labelledby="new-service-title" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm" role="dialog">
          <div className="w-full max-w-lg rounded-3xl bg-[#fffdf9] p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a76f73]">Acción simulada</p><h2 className="mt-2 font-display text-3xl font-semibold" id="new-service-title">Nuevo servicio</h2><p className="mt-1 text-sm text-stone-500">Completá una ficha visual para la presentación.</p></div><button aria-label="Cerrar" className="grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-500" onClick={() => setModalOpen(false)} type="button">×</button></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-stone-600 sm:col-span-2">Nombre<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue="Tratamiento Nutritivo" /></label>
              <label className="text-xs font-semibold text-stone-600">Categoría<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue="Cabello"><option>Cabello</option><option>Color</option><option>Manos</option></select></label>
              <label className="text-xs font-semibold text-stone-600">Duración<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue="60 minutos"><option>45 minutos</option><option>60 minutos</option><option>90 minutos</option></select></label>
              <label className="text-xs font-semibold text-stone-600">Precio<input className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal" defaultValue="1200" inputMode="numeric" /></label>
              <label className="text-xs font-semibold text-stone-600">Profesional<select className="mt-2 w-full rounded-xl border border-stone-200 bg-white p-3 text-sm font-normal">{beautyProfessionals.map((professional) => <option key={professional.id}>{professional.name}</option>)}</select></label>
            </div>
            <div className="mt-7 flex justify-end gap-3"><button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-500" onClick={() => setModalOpen(false)} type="button">Cancelar</button><button className="rounded-xl bg-[#292623] px-5 py-2.5 text-sm font-semibold text-white" onClick={simulateServiceCreation} type="button">Crear servicio demo</button></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
