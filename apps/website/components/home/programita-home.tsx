"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { demoHref, demos, intentions, programitas, type ProgramitaIntent } from "../../data/commercial";

const problems = [
  ["Verdulería", "Saber qué tengo y qué comprar.", "stock", "primary"],
  ["Librería", "Controlar miles de productos.", "stock", "minor"],
  ["Taller", "Ordenar turnos, autos y trabajos.", "turnos", "primary"],
  ["Belleza / Barbería", "Agenda y clientes, en orden.", "turnos", "primary"],
  ["Restaurante", "Organizar mis reservas.", "reservas", "minor"],
  ["Inmobiliaria", "Que no se pierda ningún lead.", "ventas", "primary"],
  ["Depósito", "Ver qué entra, sale y falta.", "stock", "minor"],
] as const;

const models = [
  ["Programita", "Ya está hecho.", "Elegís. Configuramos. Usás.", "Mensual"],
  ["Programita +", "Casi está hecho.", "Partimos de una base y la adaptamos a tu negocio.", "Implementación + mensualidad"],
  ["A medida", "No existe.", "Bueno. Lo hacemos.", "Cotización"],
] as const;

function selectIntent(intent: ProgramitaIntent) {
  window.dispatchEvent(new CustomEvent("programita:intent", { detail: intent }));
  document.querySelector("#programitas")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function Hero() {
  const [query, setQuery] = useState("");
  const aliases: Array<[RegExp, ProgramitaIntent]> = [[/stock|inventario|producto|comprar/i, "stock"], [/turno|agenda|cita/i, "turnos"], [/reserva|mesa|disponibilidad/i, "reservas"], [/cliente|crm|fidel/i, "clientes"], [/venta|lead|oportunidad/i, "ventas"], [/tienda|ecommerce|pedido|catálogo/i, "tienda"]];
  const submit = (event: FormEvent) => { event.preventDefault(); selectIntent(aliases.find(([pattern]) => pattern.test(query))?.[1] ?? "clientes"); };
  return <section className="hero" id="inicio"><div className="hero-noise" aria-hidden /><div className="shell hero-shell"><div className="hero-brand"><p className="hero-kicker">Software para la gente.</p><h1>PROGRAMITA<span>.</span></h1><div className="hero-question"><h2>¿Qué querés mejorar<br />de tu negocio?</h2><p>El nombre es lo único chiquito.</p></div></div><div className="hero-action"><div className="hero-orbit" aria-hidden><span>LATAM</span><span>HECHO PARA<br />NEGOCIOS REALES</span></div><form className="finder" onSubmit={submit}><label htmlFor="business-problem">Contanos qué querés resolver</label><div className="finder-input"><input id="business-problem" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej: controlar mi stock, organizar turnos..." /><button type="submit">Encontrar mi Programita <span aria-hidden>↓</span></button></div><div className="intentions" aria-label="Problemas frecuentes">{intentions.map((item) => <button type="button" key={item.id} onClick={() => selectIntent(item.id)}>{item.label}</button>)}</div></form><small className="hero-note">SIN PALABRAS RARAS · SIN HUMO · HECHO PARA USAR</small></div></div></section>;
}

function Problems() {
  return <section className="problems"><div className="problems-title"><div className="shell"><span>01 / LA VIDA REAL</span><h2>Todo negocio tiene un <em>quilombo.</em></h2><p>No todos necesitan el mismo Programita.</p></div></div><div className="shell problem-wall">{problems.map(([business, quote, intent, weight], index) => <button key={business} className={`problem-note note-${index + 1} is-${weight}`} onClick={() => selectIntent(intent)}><span>0{index + 1}</span><small>{business}</small><strong>{quote}</strong><i>Ver solución ↘</i></button>)}<a className="problem-other" href="#contacto"><small>¿Y TU NEGOCIO?</small><strong>Tengo un problema distinto.</strong><span>Contanos →</span></a></div></section>;
}

function Programitas() {
  const [activeId, setActiveId] = useState<ProgramitaIntent>("stock");
  useEffect(() => { const handler = (event: Event) => setActiveId((event as CustomEvent<ProgramitaIntent>).detail); window.addEventListener("programita:intent", handler); return () => window.removeEventListener("programita:intent", handler); }, []);
  const activeIndex = programitas.findIndex((product) => product.id === activeId);
  const active = programitas[activeIndex] ?? programitas[0];
  return <section className="programitas" id="programitas"><div className="shell"><header className="section-head horizontal"><div><span>02 / LOS PROGRAMITAS</span><h2>Hay uno<br />para eso.</h2></div><p>Productos claros para problemas concretos. Elegí uno, miralo funcionar y después vemos cómo llevarlo a tu negocio.</p></header><div className="product-showcase"><nav aria-label="Elegir Programita" role="tablist">{programitas.map((product, index) => <button aria-controls="programita-panel" aria-selected={active.id === product.id} className={active.id === product.id ? "is-active" : ""} key={product.id} onClick={() => setActiveId(product.id)} role="tab"><span>0{index + 1}</span><b>{product.name.replace("Programita ", "")}</b><i aria-hidden>→</i></button>)}</nav><article id="programita-panel" role="tabpanel"><div className="showcase-copy"><div><small>{active.status} · DEMO {active.demo}</small><h3>{active.name}</h3><ul>{active.features.split(" · ").map((feature) => <li key={feature}>{feature}</li>)}</ul><p>{active.copy}</p></div><a href={demoHref(active.path)} target="_blank" rel="noreferrer">Probar demo <span aria-hidden>↗</span><small>Entorno de demostración</small></a></div><div className="showcase-screen" key={active.id}><div className="browser-top"><span /><span /><span /><b>{active.demo} / DEMO</b></div><Image src={active.image} alt={`Vista de demostración de ${active.name}`} fill priority={active.id === "stock"} sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 900px) calc(100vw - 246px), (max-width: 1360px) calc(100vw - 318px), 1082px" /></div></article></div><div className="all-demos"><div><small>¿QUERÉS MIRAR MÁS?</small><p>Explorá nuestras demos especializadas.</p></div><nav aria-label="Demos especializadas">{demos.map((demo) => <a key={demo.brand} href={demoHref(demo.path)} target="_blank" rel="noreferrer"><b>{demo.brand}</b><span>{demo.label}</span><i aria-hidden>↗</i></a>)}</nav></div></div></section>;
}

function Models() { return <section className="models" id="modelos"><div className="shell"><header className="section-head horizontal"><div><span>03 / CÓMO EMPEZAR</span><h2>Tres formas.<br />Una buena decisión.</h2></div><p>No todos necesitan el mismo Programita. Por eso hay una forma de empezar para cada negocio.</p></header><div className="model-grid">{models.map(([name, title, copy, mode], index) => <article className={index === 1 ? "is-center" : ""} key={name}><span>0{index + 1}</span><div><h3>{name}</h3><strong>{title}</strong><p>{copy}</p></div><small>{mode}</small></article>)}</div><blockquote><span>Software para la gente no significa software barato.</span><strong>Significa que hay una forma de entrar.</strong></blockquote></div></section>; }

function Campaign() { return <section className="campaign" aria-label="Manifiesto Programita"><div className="campaign-ticker"><span>PROGRAMITA • SOFTWARE PARA LA GENTE • PROGRAMITA • SOFTWARE PARA LA GENTE • </span></div><div className="shell campaign-stage"><header><small>04 / UN POCO DE PERSONALIDAD</small><h2><span>El software</span><span>es aburrido.</span><em><span>Programita</span><span>no.</span></em></h2><p className="campaign-end">Humor para llamar la atención.<br />Producto para demostrar.<br /><strong>Resultados para vender.</strong></p></header><div className="campaign-collage"><div className="classified"><small>SE BUSCA</small><strong>Dueño que todavía controle su negocio en un cuaderno.</strong><i>Recompensa: tiempo libre.</i></div><div className="sticker">¡PROGRAMITAAAA!</div><div className="price-sign"><span>47</span><b>mensajes para confirmar una reserva.</b></div><div className="mini-sign">SOFTWARE<br />FRESQUITO<br /><small>recién actualizado</small></div></div></div></section>; }

function Cases() {
  const cases = [
    { name: "MARTINA", subname: "BEACH CLUB", scope: "Web · Reservas · Manager · Fidelización", number: "01" },
    { name: "YACHT", subname: "RIVIERA MAYA", scope: "Bookings · Fleet · CRM · Financial Intelligence", number: "02" },
    { name: "AUTOWORKS", subname: "", scope: "Ecommerce · Taller · Turnos · Operación", number: "03" },
  ] as const;
  return <section className="cases" id="casos"><div className="shell"><header><span>05 / CASOS REALES</span><p>Y atrás del chiste...</p><h2>Hacemos software<br /><em>en serio.</em></h2></header><div className="case-list">{cases.map(({ name, subname, scope, number }) => <article key={name}><div className="case-meta"><span>CASE / {number}</span><h3>{name} {subname}</h3><p>{scope}</p></div><div className="case-visual-slot" aria-label={`Área visual reservada para ${name} ${subname}`}><span>{name}</span><small>Área visual reservada</small></div></article>)}</div><a className="light-link" href="#contacto">Ver lo que hacemos ↘</a></div></section>;
}

function Latam() { return <section className="latam"><div className="shell latam-grid"><div><span>06 / DE ACÁ PARA ALLÁ</span><h2>Software para la gente.<br /><em>De verdad.</em></h2><p>Desde un negocio de barrio hasta una operación internacional.</p></div><div className="latam-poster" aria-label="Mercados en los que podemos trabajar"><b>MX</b><b>AR</b><b>CO</b><strong>LATAM</strong><small>Y CLIENTES<br />INTERNACIONALES</small></div></div></section>; }

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (event.currentTarget.checkValidity()) setSent(true); else event.currentTarget.reportValidity(); };
  return <section className="contact" id="contacto"><div className="shell contact-grid"><div><span>07 / HABLEMOS</span><h2>¿No existe tu<br />Programita?</h2><strong>TE LO<br />HACEMOS.</strong><p>Contanos qué hacés hoy, qué te complica y qué debería funcionar mejor.</p></div>{sent ? <div className="form-success" role="status"><b>¡LISTO!</b><h3>Ya entendimos la idea.</h3><p>Esta experiencia es de presentación: no se enviaron ni almacenaron tus datos.</p><button onClick={() => setSent(false)}>Volver al formulario</button></div> : <form onSubmit={submit}><label>Nombre<input name="name" autoComplete="name" required /></label><label>Negocio / empresa<input name="company" autoComplete="organization" required /></label><label>País<input name="country" autoComplete="country-name" required /></label><label>WhatsApp o email<input name="contact" autoComplete="email" required /></label><label className="full">¿Qué querés resolver?<textarea name="problem" rows={4} required /></label><button className="full" type="submit">Contanos tu problema <span aria-hidden>↗</span></button><small className="full">Formulario de demostración · No envía ni almacena datos.</small></form>}</div></section>;
}

export function ProgramitaHome() { return <><Hero /><Problems /><Programitas /><Models /><section className="custom-bridge" id="a-medida"><div className="shell"><span>¿NECESITÁS ALGO MÁS?</span><h2>Lo adaptamos.<br />O te lo hacemos.</h2><a href="#contacto">Hablemos de tu negocio ↘</a></div></section><Campaign /><Cases /><Latam /><Contact /></>; }
