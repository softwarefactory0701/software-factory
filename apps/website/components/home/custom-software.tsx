"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Reveal } from "../motion/reveal";
import { Arrow, Container, Eyebrow, Section } from "../ui/primitives";
import { VelarisBackground } from "./velaris-background";

type Errors = Partial<Record<"name" | "company" | "need" | "method" | "contact", string>>;
const planNames: Record<string, string> = { start: "Start", business: "Business", pro: "Pro", custom: "Custom" };
const subscribeToUrl = (callback: () => void) => { window.addEventListener("popstate", callback); return () => window.removeEventListener("popstate", callback); };
const getSearch = () => window.location.search;
const getServerSearch = () => "";

export function CustomSoftware() {
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const search = useSyncExternalStore(subscribeToUrl, getSearch, getServerSearch);
  const interest = new URLSearchParams(search).get("interest") ?? "";
  const plan = planNames[interest] ?? "";
  const selectedNeed = need || (interest === "custom" ? "custom" : "");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    for (const key of ["name", "company", "need", "method", "contact"] as const) if (!String(data.get(key) ?? "").trim()) next[key] = "Completá este campo.";
    const method = String(data.get("method") ?? "");
    const contact = String(data.get("contact") ?? "").trim();
    if (method === "email" && contact && !/^\S+@\S+\.\S+$/.test(contact)) next.contact = "Ingresá un email válido.";
    if (method === "whatsapp" && contact && !/^[+\d][\d\s()-]{7,}$/.test(contact)) next.contact = "Ingresá un número de WhatsApp válido.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return <Section id="software-medida" className="custom-section custom-section--form"><Container wide><div className="custom-panel custom-panel--form"><VelarisBackground />
    <Reveal><div className="custom-copy"><Eyebrow dark>Software a medida</Eyebrow><h2>Contanos qué<br />necesitás.</h2><p>Entendemos qué querés resolver y vemos juntos si conviene adaptar una de nuestras soluciones o construir algo a medida.</p><div className="capabilities">{["Web apps", "Automatización", "Integraciones", "Dashboards", "Herramientas internas"].map((item) => <span key={item}>{item}</span>)}</div></div></Reveal>
    <Reveal delay={100}><div id="contacto" className="contact-anchor">{sent ? <div className="contact-success" role="status"><span aria-hidden>✓</span><Eyebrow dark>Consulta recibida</Eyebrow><h3>Gracias por contarnos.</h3><p>Nos pondremos en contacto para entender mejor tu operación.</p><small>Esta es una confirmación de demostración. No se enviaron ni almacenaron datos.</small><button className="button button--light" type="button" onClick={() => { setSent(false); setErrors({}); }}>Nueva consulta</button></div> : <form className="custom-form" noValidate onSubmit={submit}>
      {plan ? <p className="contact-context">Consulta por plan <strong>{plan}</strong></p> : null}
      <div className="custom-form-grid"><label htmlFor="contact-name">Nombre<input aria-describedby={errors.name ? "contact-name-error" : undefined} aria-invalid={Boolean(errors.name)} id="contact-name" name="name" autoComplete="name" />{errors.name ? <small className="field-error" id="contact-name-error">{errors.name}</small> : null}</label><label htmlFor="contact-company">Empresa / negocio<input aria-describedby={errors.company ? "contact-company-error" : undefined} aria-invalid={Boolean(errors.company)} id="contact-company" name="company" autoComplete="organization" />{errors.company ? <small className="field-error" id="contact-company-error">{errors.company}</small> : null}</label></div>
      <label htmlFor="contact-need">Qué querés resolver<select aria-invalid={Boolean(errors.need)} id="contact-need" name="need" value={selectedNeed} onChange={(event) => setNeed(event.target.value)}><option value="">Seleccioná una opción</option><option value="booking">Reservas / agenda</option><option value="stock">Inventario / stock</option><option value="crm">CRM / ventas</option><option value="custom">Software a medida</option><option value="unsure">No estoy seguro</option></select>{errors.need ? <small className="field-error">{errors.need}</small> : null}</label>
      <div className="custom-form-grid"><label htmlFor="contact-method">Cómo preferís que te contactemos<select aria-invalid={Boolean(errors.method)} id="contact-method" name="method" defaultValue=""><option value="">Elegí un medio</option><option value="whatsapp">WhatsApp</option><option value="email">Email</option></select>{errors.method ? <small className="field-error">{errors.method}</small> : null}</label><label htmlFor="contact-value">WhatsApp o email<input aria-describedby={errors.contact ? "contact-value-error" : undefined} aria-invalid={Boolean(errors.contact)} id="contact-value" name="contact" autoComplete="email" />{errors.contact ? <small className="field-error" id="contact-value-error">{errors.contact}</small> : null}</label></div>
      <label htmlFor="contact-message">Mensaje <span>(opcional)</span><textarea id="contact-message" name="message" rows={3} placeholder="Algo más que debamos saber" /></label>
      <button className="button button--light" type="submit">Quiero hablar sobre mi proyecto <Arrow /></button><small>Comportamiento demo · No se envían ni almacenan datos</small>
    </form>}</div></Reveal>
  </div></Container></Section>;
}
