# Beauty — Blueprint comercial

## Estado

- Fase: SF-001B — Beauty Blueprint + Design System
- Demo: AURA Beauty Studio
- Escenario: un martes de alta ocupación
- Fecha ficticia: 8 de septiembre de 2026

Beauty es la primera experiencia vertical de Software Factory. Es una demostración comercial navegable, no un SaaS funcional ni una base de producción.

## Target

- salones de belleza y peluquerías;
- nail studios;
- barberías premium;
- centros de estética;
- spas pequeños.

La experiencia debe hacer que la persona que administra uno de estos negocios reconozca su operación, su lenguaje y sus prioridades sin sentir que observa un template administrativo genérico.

## Problema comercial

Un salón coordina tiempo, talento, clientas y servicios con distintos niveles de duración y rentabilidad. La información suele estar fragmentada entre agendas, mensajes y memoria del equipo. Para vender una solución resulta más efectivo mostrar el día real del negocio que describir una lista abstracta de funcionalidades.

## Propuesta de valor

AURA comunica tres beneficios:

1. Control diario: agenda por profesional, estados claros y próximos turnos.
2. Atención personal: historial, preferencias y contexto de cada clienta.
3. Visión gerencial: ocupación, recurrencia, servicios y desempeño del equipo.

## Módulos y pantallas

### Dashboard

Resumen comercial con los cuatro KPIs definidos, próximos turnos, actividad semanal, servicios vendidos, ocupación y profesionales destacadas.

### Agenda

Pantalla principal organizada por Martina López, Julieta Ramos y Agustina Pérez. Incluye vista diaria responsive, resumen semanal y estados Confirmado, Pendiente, En servicio, Finalizado y Cancelado.

### Clientes

Listado buscable y ficha seleccionable con teléfono ficticio, visitas, gasto acumulado, profesional habitual, servicios, próximas visitas y notas.

### Servicios

Carta visual con duración, precio, categoría, estado y profesionales asociados.

### Profesionales

Perfiles con especialidad, turnos semanales, ocupación, facturación y servicios principales.

### Reportes

Vista para dueña o gerente con facturación, ocupación, servicios vendidos, recurrencia, desempeño profesional y cancelaciones.

### Configuración

Representación visual de identidad, operación y preferencias. Ningún cambio se persiste ni dispara integraciones.

## Escenario demo

La presentación comienza en el Dashboard durante un martes con 14 turnos y 87% de ocupación. Continúa en la Agenda para mostrar el trabajo simultáneo del equipo, abre la creación simulada de un turno y luego recorre la ficha de una clienta recurrente. Finalmente, Reportes comunica control del negocio desde la perspectiva gerencial.

Todos los datos viven en `@software-factory/mock-data/beauty`, se relacionan mediante identificadores y permanecen deterministas. Los teléfonos usan el rango ficticio `5555-01xx`.

## Terminología

| Concepto neutral | Beauty singular | Beauty plural |
| --- | --- | --- |
| customer | Cliente | Clientes |
| resource | Profesional | Profesionales |
| booking | Turno | Turnos |
| service | Servicio | Servicios |

## Qué es visual o mock

- KPIs, ingresos, ocupación y tendencias.
- Todos los nombres, teléfonos, notas e historiales.
- Turnos, estados y distribución horaria.
- Búsqueda y selección de clientes, que operan solamente en memoria local.
- Selector día/semana de Agenda.
- Modal de nuevo turno y su confirmación visual.
- Preferencias de Configuración.

No existe base de datos, autenticación, backend, persistencia remota, pagos, WhatsApp, correo ni APIs externas.

## Funcionalidades potenciales de producción

Estas posibilidades no forman parte de la demo actual y requerirían un proyecto independiente:

- disponibilidad y prevención de superposiciones;
- autenticación, permisos y auditoría;
- base de datos e historial real;
- reservas online y señas;
- recordatorios y confirmaciones;
- caja, pagos y facturación;
- inventario de productos e insumos;
- reportes calculados desde datos reales;
- migración, backups, privacidad y operación.

## Elementos reutilizables futuros

- `DemoShell`: theming, navegación desktop/mobile, identidad y guardrails de demo.
- `StatCard`, `StatusBadge`, `SectionHeader`, `ProgressBar` y primitives de tabla.
- Contratos neutrales de estados de Booking Core.
- Contrato de vertical con términos plurales, metadata y tema.

Booking Core v1 comparte la escala horaria, columnas por recurso, cards seleccionables, drawer y estado demo. Beauty conserva su resumen semanal, modal comercial, terminología, metadata y presentación visual.
