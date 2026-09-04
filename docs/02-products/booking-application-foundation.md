# Booking Application Foundation

La Booking Application Foundation coordina el comportamiento reutilizable de Agenda sin imponer identidad sectorial. Vive dentro de `booking-core` porque la familia ya compartía el reducer y los componentes; no se creó otro paquete.

## Arquitectura

```text
Booking Core (contratos, helpers y reducer)
  → Booking Application Foundation (`useBookingDemo`)
    → configuración + presentation adapter del vertical
      → UI y branding de AURA, TORQUE o NEXUS
```

`useBookingDemo` expone bookings, selección y detalle resuelto, vista, creación desde draft, completar, cancelar, reset y feedback local. Cada ruta conserva una instancia independiente; no existe estado global.

## Creación desde draft

`BookingDraft` contiene customer, resource, service, fecha, hora, notas y metadata neutral. `createBookingFromDraft` resuelve el servicio, aplica su duración, calcula el final y usa el estado inicial de `BookingCreationDefaults`. No verifica disponibilidad ni solapamientos.

`BookingCreationForm` cubre selectores, fecha, hora y notas opcionales. Labels y clases conservan la marca; el slot adicional es limitado y no constituye un constructor de formularios.

## Presentación

`BookingVerticalConfig` reúne terminología, estados, defaults y la referencia al schedule del escenario. `BookingPresentationAdapter` resuelve títulos, metadata, texto secundario, notas y avatares sin mover modelos sectoriales al Core. La unión `BookingStatus` no cambió.

## Horario y semana

`BookingScenario.schedule` es la única fuente operativa de fecha, apertura, cierre, recursos y tamaño de slot. Las definiciones generales de vertical ya no duplican apertura/cierre. `BookingWeekSummary` es solamente un resumen visual determinista; no constituye un calendario semanal productivo.

## Fuera de alcance

No incluye backend, disponibilidad, prevención de reservas dobles, zonas horarias, recurrencia, múltiples días o recursos, pagos, notificaciones, providers globales, tenants, ClientConfig ni plugins.

## Cuarto vertical

Un nuevo vertical aporta escenario, modelos sectoriales, `BookingVerticalConfig`, adapter de presentación, datos semanales, branding y módulos externos a Agenda. Puede componer coordinador, toolbar, agenda, drawer, formulario y resumen semanal sin copiar el controlador completo.
