# Software Factory — Visión

## Qué es Software Factory

Software Factory es una plataforma para crear y presentar demos comerciales de software verticalizado. Su propósito es permitir que un potencial cliente recorra una experiencia convincente, comprenda cómo una solución se adapta a su industria y pueda tomar una decisión de compra con menos incertidumbre.

Software Factory no es un SaaS multiindustria ni el producto final que utilizará el cliente. Es la infraestructura compartida para construir demostraciones.

## Estrategia de demos

Cada demo debe representar con claridad el flujo de trabajo que el cliente quiere resolver. Usará datos ficticios, estados controlados y acciones simuladas para contar una historia comercial coherente.

La demo debe:

- ser navegable y visualmente realista;
- mostrar el valor de la solución en pocos minutos;
- usar identidades, registros y métricas ficticias;
- responder de forma predecible durante una presentación;
- indicar claramente que se trata de una demostración.

La regla de alcance es:

> En una demo solamente desarrollamos aquello que ayuda a vender.

## Demo vs. producción

Una demo optimiza comunicación, velocidad de iteración y claridad visual. Una aplicación de producción optimiza seguridad, integridad, disponibilidad, operación y necesidades contractuales del cliente.

Por lo tanto, una demo no debe confundirse, desplegarse ni evolucionar directamente como producto de producción. En esta etapa no incluye autenticación real, base de datos, pagos, mensajería, correo, APIs externas, backend complejo ni persistencia real.

Cuando una demo genera una venta, el producto de producción se inicia como un proyecto independiente. Puede reutilizar conocimiento, lenguaje visual y decisiones validadas, pero debe diseñar expresamente su arquitectura, seguridad, datos, integraciones y operación.

## Estrategia de verticalización

Una vertical traduce capacidades genéricas al lenguaje y contexto de una industria. Define:

- identidad y nombre ficticio del negocio;
- terminología de recursos, reservas, clientes y servicios;
- navegación y módulos visibles;
- tema visual;
- configuración y datos ficticios;
- extensiones particulares del sector.

Por ejemplo, Beauty puede llamar `Profesional` al recurso y `Turno` a la reserva. Taller puede reutilizar el mismo modelo de reservas usando `Mecánico` y `Turno`, y agregar en el futuro módulos propios de vehículos y órdenes.

La vertical configura y compone; no debe copiar el motor compartido.

## Arquitectura basada en cores

Los cores representan capacidades visuales reutilizables, no backends compartidos:

- `booking-core`: contratos y, progresivamente, componentes para turnos y reservas;
- `stock-core`: futuro motor visual de inventario;
- `crm-core`: futuro motor visual de relaciones y ventas.

Beauty será la primera vertical sobre Booking Core. Taller y Consultorio deberán poder reutilizar ese core cambiando configuración, terminología, tema, datos y extensiones puntuales.

## Modelo de reutilización

La reutilización ocurre en capas:

1. `ui` aporta primitivas visuales agnósticas al negocio.
2. `demo-shell` aporta el marco común de navegación y presentación.
3. Los cores aportan modelos y experiencias visuales de una capacidad.
4. `verticals` define cómo una industria configura, nombra y extiende esas capacidades.
5. `mock-data` proporciona conjuntos de datos explícitamente ficticios.
6. Las apps publican el sitio institucional y el catálogo navegable de demostraciones.

Una abstracción se incorpora al core cuando existe evidencia de reutilización. Las particularidades permanecen en la vertical. Esto evita tanto la duplicación como la generalización prematura.

## Guardrails

- Toda pantalla de demo debe mostrar un indicador `DEMO`.
- Los datos deben ser ficticios y reconocibles como tales.
- Las acciones que aparenten modificar datos deben ser locales, reversibles y simuladas.
- Una integración externa requiere una decisión explícita en una fase posterior.
- El código de demo no debe presentarse como base lista para producción.
