# Software Factory — Commercial Website Concept

## Objetivo y audiencia

La web presenta Software Factory como una compañía de producto tecnológico para dueños y responsables de negocios que necesitan resolver un problema operativo concreto. Las demos no son productos finales: muestran familias reutilizables y prueban su adaptación. Commercial Website v1 está lista para presentación comercial interna.

## Mensaje y sitemap

**Software pensado para negocios reales.** Creamos soluciones simples, especializadas y preparadas para crecer. La navegación inicial reúne Home, Soluciones, Demos, Precios, Software a medida y Contacto mediante anchors; no incluye CMS, blog ni formularios.

## Familias

- Reservas: AURA, TORQUE y NEXUS.
- Inventario: PULSE y PARTX.
- CRM: NOVA, VANTAGE y COVERA.

Las marcas son ejemplos de verticalización. La navegación comercial prioriza el problema y la familia.

## Dirección visual y home

Warm white, tinta y graphite construyen una base editorial. Un azul tecnológico profundo funciona como acento controlado. La home combina Hero, problema/solución, familias, demos, proceso, software a medida, precios, CTA final y footer. Escala, tracking, whitespace, bordes mínimos y mockups abstractos aportan el carácter premium.

## Estrategia de demos

`NEXT_PUBLIC_DEMOS_BASE_URL` define el host público de `apps/demos`. En desarrollo puede usarse `http://localhost:3001`; sin variable, los enlaces conservan rutas relativas al mismo origen y no inventan un dominio. Cada pieza identifica discretamente que es una demo. El showroom utiliza un carrusel circular sin autoplay: clones visuales inaccesibles rodean la secuencia real y la posición se normaliza silenciosamente al finalizar el scroll.

## Precios y futuras fases

Los precios son referencias dolarizadas: US$ 39, US$ 69 y US$ 129 mensuales, más Custom. Implementación y personalización se cotizan por proyecto.

SF-WEB-003 incorporó un Image Stream con capturas reales, Background Paths, morph de familias, galería real, progreso por scroll y Velaris CSS. WebGL queda como evaluación futura solamente si aporta una mejora perceptible sin comprometer carga, fallback, accesibilidad ni reduced motion.
