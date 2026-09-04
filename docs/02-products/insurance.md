# COVERA Insurance Operations CRM

COVERA es el tercer vertical de la familia CRM y una demo comercial para agencias, productores y corredores de seguros modernos. Su dolor principal es la dispersión de clientes, pólizas, vencimientos y trabajo comercial. La propuesta de valor es reunir “Clientes, pólizas, renovaciones y oportunidades en un solo lugar”, con datos ficticios y acciones locales.

## Alcance v1

- Dashboard ejecutivo de cartera.
- Pipeline comercial de siete etapas.
- Clientes y detalle de coberturas.
- Administración visual de pólizas.
- Mesa de renovaciones priorizada.
- Actividad, tareas, reportes y configuración simulada.

No incluye backend, autenticación, emisión real, integraciones con aseguradoras, cotizadores, pagos ni persistencia.

## Demo frente a producción

Esta versión vende y valida la experiencia; no gestiona seguros reales. Una evolución productiva requeriría persistencia, autenticación, permisos, auditoría, cifrado, segregación por cliente, backups e integraciones seguras con aseguradoras. También debería aplicar minimización de datos personales, control de acceso, trazabilidad y políticas de retención antes de incorporar información sensible.

## Reutilización CRM

El pipeline y los seguimientos consumen `useCrmDemo`. Las oportunidades, contactos, tareas, actividades y pipeline pertenecen a CRM Core. `Policy`, `PolicyStatus`, `InsuranceProduct`, `ProducerProfile` y `RenewalContext` son extensiones locales del vertical.

La fecha narrativa del escenario es el 8 de septiembre de 2026. Todo el contenido es determinista y exclusivamente demostrativo.

## Comparación de la familia

- NOVA agrega propiedades, interesados y visitas sobre el CRM compartido.
- VANTAGE agrega empresas, revenue context y venta consultiva B2B.
- COVERA agrega pólizas, productos, aseguradoras y contexto de renovación.

## Roadmap productivo posible

Persistencia y seguridad; gestión de usuarios y permisos; configuración por cliente; importación de cartera; workflows auditables; integraciones con compañías; documentos; notificaciones y métricas verificables. Nada de este roadmap forma parte de la demo v1.
