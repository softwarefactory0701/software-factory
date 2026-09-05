"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { demoHref, demoProducts, productFamilies } from "../../data/commercial";
import { Reveal } from "../motion/reveal";
import { Arrow, Container, Eyebrow, Section } from "../ui/primitives";

const images: Record<string, string> = { AURA: "/products/aura.png", TORQUE: "/products/torque.png", NEXUS: "/products/nexus.png", PULSE: "/products/pulse.png", PARTX: "/products/partx.png", NOVA: "/products/nova.png", VANTAGE: "/products/vantage.png", COVERA: "/products/covera.png" };

export function ProductFamilies() {
  const [active, setActive] = useState(0);
  const [vertical, setVertical] = useState(0);
  const reduced = useReducedMotion();
  const family = productFamilies[active]!;
  const product = family.products[vertical] ?? family.products[0]!;
  const demo = demoProducts.find((item) => item.brand === product.brand);
  const chooseFamily = (index: number) => { setActive(index); setVertical(0); };
  return <Section id="soluciones" className="families"><Container wide>
    <Reveal><Eyebrow>Soluciones</Eyebrow><h2 className="section-title">Una base sólida.<br />Adaptada a cada negocio.</h2></Reveal>
    <div className="family-tabs" role="tablist" aria-label="Familias de producto">{productFamilies.map((item, index) => <button aria-selected={active === index} className={active === index ? "is-active" : ""} key={item.id} onClick={() => chooseFamily(index)} role="tab"><span>0{index + 1}</span>{item.id === "crm" ? "CRM" : item.id}</button>)}</div>
    <article className={`family-stage family-stage--${family.accent}`} id={`familia-${family.id}`}>
      <div className="family-copy"><Eyebrow>{family.eyebrow}</Eyebrow><h3>{family.title}</h3><p>{family.copy}</p><div className="vertical-selector" role="tablist" aria-label={`Soluciones para ${family.id}`}>{family.products.map((item, index) => <button aria-selected={vertical === index} className={vertical === index ? "is-active" : ""} key={item.brand} onClick={() => setVertical(index)} role="tab"><span><b>{item.brand}</b><small>{item.niche}</small></span><i aria-hidden>↗</i></button>)}</div><p className="family-adaptable">Estas son algunas aplicaciones.<br />La misma base puede adaptarse a otros negocios con una operación similar.</p></div>
      <div className="family-showcase"><motion.div animate={reduced ? { opacity: 1, y: 0 } : { opacity: [.76, 1], y: [6, 0] }} initial={false} key={product.brand} transition={{ duration: reduced ? 0 : .28, ease: [.22, 1, .36, 1] }}><div className="showcase-context"><span>{product.brand}</span><b>Software para {product.niche.toLowerCase()}</b><small>{product.detail}</small></div><div className="family-real-screen"><div className="real-screen-bar"><span /><span /><span /><b>{product.brand} · {product.niche}</b></div><Image alt={`${product.brand}, software para ${product.niche}`} fill sizes="(max-width: 900px) 92vw, 58vw" src={images[product.brand]!} /></div><a className="text-link showcase-link" href={demo ? demoHref(demo.path) : "#demos"}>Explorar {product.brand} <Arrow /></a></motion.div></div>
    </article>
  </Container></Section>;
}
