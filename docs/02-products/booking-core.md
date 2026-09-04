# Booking Core v1

## Responsabilidad

Booking Core representa reservas de forma neutral para las demos de Software Factory. Su propósito es permitir que verticales distintas compongan una agenda navegable sin copiar contratos, estado local, selección o estructura visual.

La primera extracción proviene de la Agenda Beauty ya validada. Solo se promovieron patrones observados y reutilizables.

## Qué no hace

Booking Core v1 no es un backend ni un motor productivo. No implementa:

- base de datos o persistencia;
- disponibilidad o prevención de double booking;
- autenticación, permisos o auditoría;
- pagos, señas o facturación;
- email, WhatsApp o sincronización de calendarios;
- zonas horarias complejas;
- reglas operativas de una industria;
- APIs.

## Contratos

### Booking

Referencia `customerId`, `serviceId` y `resourceId`; define `start`, `end`, `status` y notas opcionales.

### Customer

Identidad neutral con nombre y metadata opcional.

### Resource

Entidad que presta o recibe la asignación temporal. Incluye nombre, rol/tipo y metadata opcional.

### Service

Actividad reservable con duración, precio opcional y metadata opcional.

### BookingStatus

Estados de presentación soportados: `confirmed`, `pending`, `in_progress`, `completed` y `cancelled`. No implican transiciones ni reglas productivas.

### BookingSchedule y BookingScenario

`BookingSchedule` fija fecha, rango horario, tamaño de slot y orden de recursos. `BookingScenario` agrupa schedule, bookings, customers, resources y services en un dataset determinista.

`BookingDetail`, `TimeSlot` y `ScheduleColumn` son composiciones derivadas para presentación.

## Relación con verticales

El Core nunca decide si un recurso se llama Profesional, Mecánico o Médico. Recibe `BookingTerminology`, presentación de estados, textos de acciones, avatares y tema desde el consumidor.

La vertical es responsable de:

- terminología singular/plural;
- branding y colores;
- copy comercial;
- metadata y contenido adicional;
- adaptación de sus datos al escenario neutral.

## Componentes reutilizables

- `BookingViewToolbar`: selector día/semana, creación simulada y reset.
- `BookingDaySchedule`: escala horaria, columnas por recurso, cards y selección responsive.
- `BookingDetailDrawer`: estructura accesible del detalle y acciones simuladas.
- `BookingCreationForm`: formulario neutral de creación desde draft.
- `BookingWeekSummary`: resumen semanal visual y no productivo.

La coordinación reusable se documenta en `booking-application-foundation.md`.

## Estado de demo

`useBookingDemoState` utiliza un reducer en memoria. Permite:

- seleccionar y cerrar un booking;
- cambiar la vista;
- agregar un booking simulado;
- cambiar su estado visual;
- restaurar el escenario inicial con `Reset demo`.

No usa `localStorage`. Recargar la página o ejecutar reset restaura el dataset determinista.

`useBookingDemo` compone ese reducer con detalle seleccionado, creación desde `BookingDraft`, acciones completar/cancelar y feedback temporal local. `BookingScenario.schedule` es la única fuente operativa del horario.

## Cómo Beauty lo consume

`@software-factory/mock-data/beauty` define `beautyBookingScenario` con fecha fija 8 de septiembre de 2026. La Agenda consume el hook y los tres componentes del Core, y aporta términos, labels, status styles, avatares, teléfonos y notas de AURA.

Dashboard, clientes, servicios, profesionales y reportes siguen siendo componentes Beauty.

## Estrategia de escenarios

Cada vertical debe adaptar sus entidades a `BookingScenario`. Los datos adicionales permanecen en la vertical o dentro de metadata cuando sean necesarios para presentación. El Core resuelve relaciones por identificadores y no calcula métricas de negocio.

## Límite demo vs. producción

Las mutaciones son locales, reversibles y puramente visuales. El Core permite demostrar una experiencia; no garantiza integridad, concurrencia, seguridad ni operación real. Una venta inicia una implementación de producción independiente.
