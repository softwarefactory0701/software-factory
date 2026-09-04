# VANTAGE Sales CRM

VANTAGE es la demo B2B de CRM Family para agencias, consultoras, distribuidoras, proveedores y equipos comerciales. Su propuesta es: **Cada cliente, oportunidad y próxima acción en un solo lugar.**

## Dolores y módulos

Resuelve visualmente oportunidades enfriándose, seguimientos olvidados y baja visibilidad del equipo mediante Dashboard, Pipeline, Contactos, Empresas, Actividad, Seguimientos, Reportes y Configuración.

## Escenario

Escenario determinista del 8 de septiembre de 2026 con 14 contactos, 8 empresas, 14 oportunidades, 3 vendedores, 12 actividades y 12 tareas. Las métricas globales son comerciales y no necesitan derivarse del recorte visible.

## Modelos y CRM Core

Reutiliza `Contact`, `Opportunity`, `Pipeline`, `PipelineStage`, `Activity` y `Task`, además de agrupación, resolución y próxima tarea de CRM Core. `Company` y `SalesProfile` son modelos locales: NOVA no necesitó cuentas B2B, por lo que no existe evidencia suficiente para llevar Company al Core.

## Demo y producción

La demo usa datos ficticios y cambios en memoria. No incluye backend, persistencia, autenticación ni integraciones. Una producción futura necesitaría seguridad, auditoría, permisos, base de datos, comunicaciones, automatización y reporting real.

## Comparación con NOVA

NOVA agrega Property, Visit y AgentProfile con semántica inmobiliaria. VANTAGE agrega Company, SalesProfile y riesgo visual B2B. Ambas comparten el ciclo Contact–Opportunity–Pipeline–Activity–Task sin compartir componentes visuales sectoriales.
