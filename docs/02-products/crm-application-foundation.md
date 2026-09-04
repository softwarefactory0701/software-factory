# CRM Application Foundation

## Propósito

La foundation conecta el dominio neutral de CRM Core con las presentaciones de NOVA y VANTAGE. Evita que cada vertical vuelva a implementar selección, movimiento de etapas, outcomes, tareas, actividad y reset.

## Arquitectura

```text
CRM Core (tipos, reducer, operaciones, selectores)
  → CRM UI (hook headless y contratos de presentación/configuración)
    → Vertical (modelos y adapters sectoriales)
      → Brand UI (cards, drawers, copy y estilos)
```

CRM Core no contiene React. `@software-factory/crm-ui` ofrece `useCrmDemo`, sin renderizar componentes ni imponer diseño.

## Responsabilidades compartidas

- Selección y cierre de oportunidad.
- Movimiento de etapa y outcomes won/lost.
- Completar o reabrir tareas.
- Agregar Activities simuladas.
- Reset determinista.
- Selectores temporales, por owner y de valor.
- Timeline neutral.
- Etapa activa para navegación responsive.

## Contratos

`CrmTerminology`, `CrmVerticalConfig`, `OwnerProfile` y `OpportunityPresentationAdapter` cubren las necesidades confirmadas por NOVA y VANTAGE. No constituyen un sistema dinámico de campos.

## Fuera de alcance

Company, Property, Visit, risk, dashboards, reportes, rutas, autenticación, persistencia, tenants, permisos, formularios y plugins permanecen fuera.

## Futuro vertical

Un vertical futuro aporta escenario CRM, pipeline, terminología, owners, adapter de presentación, modelos sectoriales y componentes visuales. Consume el mismo hook para el comportamiento funcional.

## Riesgos y límites

La foundation está diseñada para demos deterministas en memoria. No resuelve concurrencia, seguridad, auditoría ni almacenamiento productivo. Los adapters deben permanecer pequeños para evitar un renderer universal lleno de condiciones.
## Validación con COVERA

SF-009 confirma la fundación con un tercer vertical, Insurance. COVERA reutiliza sin modificaciones el estado de oportunidades, selección, movimientos de etapa, cierre ganado/perdido, tareas, notas, actividad, timeline y reset mediante `useCrmDemo`.

`ProducerProfile` extiende el contrato neutral `OwnerProfile`; los modelos de póliza, producto y renovación permanecen locales. El escenario incluye algunos clientes empresa, pero no exige todavía promover `Account` al Core: para esta demo, `Contact.metadata.kind` es suficiente. Esta decisión evita anticipar un modelo corporativo hasta que más de un vertical requiera comportamiento compartido.
