# Taller — TORQUE Garage

## Propósito

TORQUE Garage es la segunda demo vertical de Software Factory y la primera validación de Booking Core fuera de Beauty. Está dirigida a talleres mecánicos, centros de servicio, detailing, neumáticos, mecánica rápida y operaciones especializadas.

La demo comunica una operación moderna, técnica y ordenada. No es un sistema productivo.

## Dolores y propuesta de valor

- Visibilidad limitada sobre vehículos dentro del taller.
- Seguimiento informal de diagnósticos, repuestos y entregas.
- Agenda desconectada de vehículos y órdenes.
- Historial mecánico disperso.
- Poca claridad sobre carga, ticket y desempeño del equipo.

TORQUE reúne el día de trabajo en una experiencia: ingresos, agenda por mecánico, órdenes, vehículos, clientes, servicios y métricas comerciales.

## Módulos

- Dashboard: KPIs, estado del taller, carga, demanda y actividad semanal.
- Agenda: turnos por mecánico reutilizando Booking Core.
- Órdenes: flujo y detalle visual de trabajos.
- Vehículos: ficha, estado, kilometraje e historial.
- Clientes: vehículos asociados, visitas y órdenes recientes.
- Servicios: tiempos, precios base, categorías y mecánicos habilitados.
- Mecánicos: carga, asignaciones, facturación y especialidades.
- Reportes: indicadores para el dueño del taller.
- Configuración: identidad, horarios, moneda y equipo.

## Escenario y terminología

El escenario es fijo: martes 8 de septiembre de 2026. Contiene tres mecánicos, ocho clientes, ocho vehículos, ocho turnos y ocho órdenes coherentes. Personas, patentes, importes e historias son ficticios.

- Booking / Bookings: Turno / Turnos.
- Customer / Customers: Cliente / Clientes.
- Resource / Resources: Mecánico / Mecánicos.
- Service / Services: Servicio / Servicios.

## Dominio específico

`Vehicle`, `WorkOrder`, `WorkOrderStatus` y `ServiceHistory` se definen dentro del dataset Taller. No forman parte de Booking Core. Un turno relaciona vehículo, kilometraje y orden como contexto del vertical.

## Validación de Booking Core

Se reutilizaron contratos, escenario, helpers, escala horaria, columnas, cards, toolbar, selección, drawer, estado local y reset.

Taller aporta terminología, escenario, horario, estados visuales, avatares, moneda, copy, metadata y modal de alta. Booking Core incorporó solo un callback opcional `renderBookingMetadata` para mostrar vehículo y patente sin añadir conceptos automotrices. Beauty no lo configura y conserva su salida.

Dashboard, órdenes, vehículos, clientes, servicios, mecánicos, reportes y configuración son composición propia de Taller. No se copiaron componentes Beauty.

Existe duplicación deliberada en page headers, paneles, formatters, modales y vista semanal. Con solo dos verticales, extraerlos ocultaría diferencias comerciales reales.

## Demo vs. producción

Todos los datos, métricas, estados, filtros, búsquedas, altas y acciones son simulados. Los cambios de agenda viven en memoria y Reset demo restaura el escenario.

No existe backend, base de datos, autenticación, disponibilidad real, prevención de solapamientos, facturación, pagos, stock, proveedores, VIN lookup, notificaciones, integraciones ni persistencia.

Una versión productiva futura podría incorporar recepción digital, presupuestos aprobables, inventario, compras, facturación, recordatorios e integraciones automotrices después de una venta.
