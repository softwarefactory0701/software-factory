# CRM Core v1 — Motor neutral de demos comerciales

## Responsabilidad

CRM Core será la base neutral para demos que comuniquen seguimiento comercial:

```text
Contactos + Oportunidades + Pipeline + Actividades + Tareas
```

Su propuesta general es: **“Cada cliente, oportunidad y seguimiento en un solo lugar.”** SF-006A solo establece contratos con suficiente certeza; NOVA Realty y posteriormente Sales CRM deberán validar cualquier comportamiento reutilizable.

## Modelos

### `Contact`

Representa una persona u organización contactable mediante identidad, teléfono y email opcionales. `metadata` permite conservar fuente, preferencias o información sectorial fuera del Core.

### `Opportunity`

Representa una iniciativa comercial vinculada a un contacto, pipeline y etapa. Su `status` expresa si sigue abierta, fue ganada o perdida. `value` y `ownerId` son opcionales para permitir demos con distinta madurez comercial.

### `Pipeline` y `PipelineStage`

`Pipeline` agrupa una secuencia configurable de etapas. `PipelineStage` contiene únicamente `id`, `label` y `order`. Los nombres inmobiliarios o B2B pertenecen al dataset de cada vertical.

### `Activity`

Registro histórico de algo que ocurrió: nota, llamada, mensaje, reunión o email. Puede relacionarse con contacto, oportunidad o ambos. No ejecuta comunicaciones.

### `Task`

Seguimiento accionable con vencimiento, responsable y estado. Puede relacionarse con contacto, oportunidad o ambos. La próxima acción de una oportunidad debe derivarse de su tarea abierta más próxima.

## Decisiones de dominio

1. **¿Lead es un modelo separado?** No. Es un `Contact` con una oportunidad en una fase temprana. Esto evita duplicar Lead, Contact y Customer.
2. **¿Opportunity admite varios contactos?** No en v1. Un único `contactId` cubre las demos iniciales. Una relación con roles deberá validarse antes de añadirse.
3. **¿Pipeline pertenece al Core?** Sí; es una necesidad neutral de ambos verticales previstos.
4. **¿Stage es entidad o configuración?** Es un objeto de configuración dentro del pipeline. Las oportunidades lo referencian mediante `stageId`.
5. **¿Task y Activity se separan?** Sí. Activity registra el pasado; Task representa trabajo pendiente o completado.
6. **¿Cómo se representa la próxima acción?** Como la tarea `open` con menor `dueAt`. No se duplica en Opportunity.
7. **¿Source entra al Core?** No todavía. Instagram, WhatsApp, portales, web o referido permanecen en metadata vertical.
8. **¿Owner pertenece al Core?** Solo como `ownerId` neutral. Usuarios, equipos, roles y permisos pertenecen al vertical o a producción.
9. **¿Cómo se representan ganadas/perdidas?** Con `OpportunityStatus`: `open`, `won`, `lost`, separado de la etapa.
10. **¿Cómo se evita un ERP?** El Core no modela facturas, cobros, productos, proyectos, contabilidad ni fulfillment.
11. **¿Qué queda en el vertical?** Terminología, fuentes, perfiles, propiedades, visitas, sectores, prioridades y presentación.
12. **¿Cuánto comportamiento necesita una demo?** Solo composición determinista, filtros y cambios locales que ayuden a vender. No necesita automatizaciones ni integridad productiva.

## Reglas semánticas conceptuales

- `stageId` debe pertenecer al `pipelineId` indicado.
- El orden de etapas debe ser estable dentro del pipeline.
- Una Activity o Task debería relacionarse al menos con un contacto u oportunidad.
- Una oportunidad `won` o `lost` conserva su etapa para contexto histórico, pero su resultado proviene de `status`.
- Las fechas son strings ISO en los contratos demo.

SF-006A documenta estas reglas, pero no agrega validadores ni máquinas de estado.

## Elementos descartados de v1

- Modelo separado `Lead` o `Customer`.
- Múltiples contactos por oportunidad.
- Contrato compartido de fuentes.
- Usuarios, roles, equipos y permisos.
- Automatizaciones y reglas de asignación.
- Scoring, forecasting y probabilidad.
- Componentes React, hooks o estado global.
- Email marketing, WhatsApp, call center y helpdesk.
- Facturación, ERP, contabilidad, ecommerce y project management.

## Demo vs. producción

### Demo

- Datos, actividades y métricas deterministas.
- Pipeline y tareas simulados.
- Filtros y cambios en memoria.
- Owners y fuentes ficticios.
- Sin comunicaciones reales.

### Producción futura

- Base de datos, autenticación y permisos.
- Auditoría, privacidad y aislamiento entre organizaciones.
- Deduplificación e importación de contactos.
- Asignación consistente de oportunidades.
- Concurrencia y consistencia del pipeline.
- Integraciones con formularios, email, WhatsApp y portales.
- Consentimientos, preferencias de comunicación y retención.
- Automatizaciones, notificaciones y reporting real.

Una venta inicia una implementación productiva independiente; estos contratos de demo no garantizan seguridad ni operación real.

## Estructura mínima

```text
packages/crm-core/
├── src/
│   ├── index.ts
│   └── types.ts
├── README.md
├── package.json
└── tsconfig.json
```

## Helpers validados en SF-006B

CRM Core v1 incorpora únicamente operaciones deterministas y neutrales: ordenamiento de etapas, agrupación y conteo de oportunidades, resolución del contacto, filtrado de oportunidades abiertas, consulta de tareas y actividades, y derivación de la próxima tarea abierta.

No contiene estado de interfaz, componentes React, persistencia ni reglas inmobiliarias. NOVA valida el primer uso; Sales CRM será la prueba posterior de reutilización sin Property, Visit, AgentProfile ni terminología inmobiliaria.

## Validación VANTAGE

VANTAGE confirmó el mismo flujo neutral fuera de Real Estate sin requerir cambios en contratos ni helpers. Company resultó importante para CRM B2B, pero sigue fuera del Core porque NOVA no necesita ese concepto. CRM Core v1 puede congelarse con los modelos y helpers actuales.

## Application Foundation

SF-008.2 añadió estado demo, reducer, operaciones y selectores puros confirmados por ambos verticales. React y los contratos de consumo visual permanecen en `@software-factory/crm-ui`; Company, Property y Visit siguen fuera del Core.
