import { pricingPlans } from "../../data/commercial";
import { Reveal } from "../motion/reveal";
import { Arrow, Container, Eyebrow, Section } from "../ui/primitives";

const details: Record<string, readonly string[]> = { Start: ["1 proceso principal", "Configuración inicial", "Soporte básico"], Business: ["Trabajo en equipo", "Automatizaciones", "Reportes"], Pro: ["Más módulos", "Integraciones", "Soporte prioritario"], Custom: ["Alcance personalizado", "Integración con tu operación", "Implementación a medida"] };

export function Pricing() {
  return <Section id="precios" className="pricing-section pricing-section--editorial"><Container><Reveal><div className="section-heading-row"><div><Eyebrow>Precios</Eyebrow><h2 className="section-title">Empezá chico.<br />Crece cuando lo necesites.</h2></div><p>Cuatro formas simples de comenzar. Elegimos la adecuada después de entender tu operación.</p></div></Reveal><div className="pricing-editorial">{pricingPlans.map((plan, index) => <Reveal delay={index * 55} key={plan.name}><article className={plan.featured ? "is-featured" : ""}>{plan.featured ? <span className="plan-label">Más elegido</span> : null}<div className="plan-heading"><h3>{plan.name}</h3><span>0{index + 1}</span></div><div className="plan-price"><b>{plan.price}</b>{plan.suffix ? <span>{plan.suffix}</span> : null}</div><p>{plan.copy}</p><ul>{details[plan.name]?.map((item) => <li key={item}>{item}</li>)}</ul><a href={`?interest=${plan.name.toLowerCase()}#contacto`}>Consultar <Arrow /></a></article></Reveal>)}</div><p className="pricing-note">La implementación y personalización inicial se cotizan según cada proyecto.</p></Container></Section>;
}
