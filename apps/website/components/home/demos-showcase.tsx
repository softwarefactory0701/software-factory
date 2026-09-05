"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { demoHref, demoProducts } from "../../data/commercial";
import { Arrow, Container, Eyebrow, Section } from "../ui/primitives";

const total: number = demoProducts.length;
const loopedProducts = Array.from({ length: 3 }, (_, set) => demoProducts.map((demo, logicalIndex) => ({ demo, logicalIndex, set }))).flat();

export function DemosShowcase() {
  const railRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);
  const physicalIndexRef = useRef<number>(total);
  const dragRef = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [physicalIndex, setPhysicalIndex] = useState<number>(total);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const cards = useCallback(() => Array.from(railRef.current?.querySelectorAll<HTMLElement>(".demo-carousel-item") ?? []), []);
  const centeredLeft = useCallback((rail: HTMLElement, card: HTMLElement) => {
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    return rail.scrollLeft + cardRect.left - railRect.left - (rail.clientWidth - cardRect.width) / 2;
  }, []);
  const jumpTo = useCallback((index: number) => {
    const rail = railRef.current;
    const card = cards()[index];
    if (!rail || !card) return;
    const behavior = rail.style.scrollBehavior;
    rail.style.scrollBehavior = "auto";
    rail.scrollLeft = centeredLeft(rail, card);
    rail.style.scrollBehavior = behavior;
    physicalIndexRef.current = index;
    setPhysicalIndex(index);
    setActiveIndex(index % total);
  }, [cards, centeredLeft]);
  const normalize = useCallback(() => {
    const current = physicalIndexRef.current;
    if (current < total) jumpTo(current + total);
    else if (current >= total * 2) jumpTo(current - total);
  }, [jumpTo]);
  const updateActive = useCallback(() => {
    const rail = railRef.current;
    const items = cards();
    if (!rail || items.length === 0) return;
    const railRect = rail.getBoundingClientRect();
    const center = railRect.left + railRect.width / 2;
    let closest = physicalIndexRef.current;
    let distance = Infinity;
    items.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const next = Math.abs(rect.left + rect.width / 2 - center);
      if (next < distance) { closest = index; distance = next; }
    });
    physicalIndexRef.current = closest;
    setPhysicalIndex(closest);
    setActiveIndex(closest % total);
  }, [cards]);
  const onScroll = useCallback(() => {
    if (!initializedRef.current) return;
    updateActive();
    if (settleRef.current) clearTimeout(settleRef.current);
    settleRef.current = setTimeout(normalize, 140);
  }, [normalize, updateActive]);

  useLayoutEffect(() => {
    initializedRef.current = false;
    const frame = window.requestAnimationFrame(() => { jumpTo(total); initializedRef.current = true; });
    const onResize = () => jumpTo(physicalIndexRef.current);
    window.addEventListener("resize", onResize);
    return () => { window.cancelAnimationFrame(frame); initializedRef.current = false; window.removeEventListener("resize", onResize); if (settleRef.current) clearTimeout(settleRef.current); };
  }, [jumpTo]);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    const target = physicalIndexRef.current + direction;
    const card = cards()[target];
    if (!rail || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { jumpTo(target); normalize(); }
    else rail.scrollTo({ left: centeredLeft(rail, card), behavior: "smooth" });
  };
  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest("a, button, input, select, textarea")) {
      dragRef.current.moved = false;
      return;
    }
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { active: true, moved: false, startX: event.clientX, scrollLeft: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };
  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag.active) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.moved = true;
    rail.scrollLeft = drag.scrollLeft - distance;
  };
  const pointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    updateActive();
  };

  return <Section id="demos" className="demos-section"><Container wide>
    <div className="demos-carousel-header"><div><Eyebrow>Demos navegables</Eyebrow><h2 className="section-title">No te lo contamos.<br />Te dejamos probarlo.</h2><p>Explorá entornos demostrativos con datos ficticios y descubrí cómo podría sentirse una solución para tu negocio.</p></div><div className="carousel-controls" aria-label="Controles del carrusel"><button aria-label="Ver demo anterior" onClick={() => move(-1)} type="button"><span aria-hidden>←</span></button><button aria-label="Ver siguiente demo" onClick={() => move(1)} type="button"><span aria-hidden>→</span></button></div></div>
    <div aria-label="Demos navegables, carrusel infinito" className={`demo-carousel${isDragging ? " is-dragging" : ""}`} onClickCapture={(event) => { const target = event.target; if (target instanceof Element && target.closest("a, button")) { dragRef.current.moved = false; return; } if (dragRef.current.moved) { event.preventDefault(); event.stopPropagation(); dragRef.current.moved = false; } }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }} onPointerCancel={pointerEnd} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onScroll={onScroll} ref={railRef} role="region" tabIndex={0}>
      <ol className="demo-carousel-track">{loopedProducts.map(({ demo, set }, index) => {
        const clone = set !== 1;
        return <li aria-current={!clone && physicalIndex === index ? "true" : undefined} aria-hidden={clone || undefined} className={`demo-carousel-item${physicalIndex === index ? " is-active" : ""}`} key={`${set}-${demo.brand}`}><article><div className="demo-carousel-copy"><span>{demo.family} · Demo</span><h3>{demo.brand}</h3><strong>{demo.niche}</strong><p>{demo.description}</p></div><div className="demo-real-preview"><Image alt={clone ? "" : `Captura de la demo ${demo.brand} para ${demo.niche}`} fill loading="lazy" sizes="(max-width: 600px) 82vw, (max-width: 1100px) 58vw, 650px" src={`/products/${demo.brand.toLowerCase()}.png`} /></div><a aria-label={`Abrir demo ${demo.brand} para ${demo.niche}`} href={demoHref(demo.path)} tabIndex={clone ? -1 : undefined}>Abrir demo <Arrow /></a></article></li>;
      })}</ol>
    </div>
    <div className="carousel-progress" aria-hidden><span>{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><div><i style={{ width: `${(activeIndex + 1) / total * 100}%` }} /></div></div>
  </Container></Section>;
}
