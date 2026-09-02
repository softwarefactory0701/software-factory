# Consultorio — NEXUS Consultorios

## Propósito y target

NEXUS es una demo administrativa para consultorios particulares, nutrición, fisioterapia, psicología, odontología, medicina general y pequeños centros profesionales. Busca mostrar cómo organizar recepción, agenda, asistencia y relación administrativa con pacientes.

No es software de diagnóstico ni un expediente clínico.

## Dolores y propuesta de valor

- Agenda fragmentada entre profesionales.
- Recepción sin una vista clara de llegadas y pendientes.
- Seguimiento administrativo disperso.
- Poco contexto sobre próximas visitas y asistencia.
- Escasa visibilidad comercial de ocupación y demanda.

NEXUS reúne agenda, consultas del día, pacientes, profesionales, servicios y reportes en una experiencia tranquila y operativa.

## Módulos

- Dashboard: KPIs, próximas consultas, estado de jornada y demanda.
- Agenda: turnos por profesional mediante Booking Core.
- Consultas: centro administrativo del día y próximas acciones.
- Pacientes: contacto, próximas visitas e historial de asistencia.
- Profesionales: ocupación, disponibilidad y tipos de consulta.
- Servicios: duración, precio y profesionales disponibles.
- Reportes: indicadores administrativos y comerciales.
- Configuración: identidad, horarios, moneda y preferencias conceptuales.

## Escenario

El escenario es determinista y representa el 8 de septiembre de 2026. Incluye 18 turnos, 10 pacientes, 3 profesionales, 6 servicios y 18 consultas administrativas relacionadas.

Los teléfonos usan numeración ficticia y los emails el dominio reservado `example.test`.

## Terminología

- Booking / Bookings: Turno / Turnos.
- Customer / Customers: Paciente / Pacientes.
- Resource / Resources: Profesional / Profesionales.
- Service / Services: Consulta / Consultas.

## Booking Core

NEXUS reutiliza sin cambios contratos, escenario, escala horaria, columnas, booking cards, toolbar, selección, drawer, estado en memoria, creación simulada y Reset demo.

El vertical aporta terminología, presentación de estados, tema, avatares, labels, notas administrativas y escenario. No fue necesario añadir metadata visual ni modificar el Core.

Los estados se adaptan de esta forma:

- `confirmed` → Confirmado.
- `pending` → En espera.
- `in_progress` → En consulta.
- `completed` → Finalizado.
- `cancelled` → Cancelado.

## Modelos específicos

`Consultation`, `ConsultationStatus`, `AdministrativeNote` y `AdministrativeHistory` permanecen en `mock-data/consultorio`. No pertenecen a Booking Core.

## Límite administrativo vs. clínico

La demo solo contiene contacto, agenda, especialidad, tipo de consulta, asistencia, precios y notas simples de coordinación. No contiene diagnósticos, enfermedades, medicamentos, recetas, laboratorios, estudios, historia clínica, expedientes ni decisiones clínicas.

Existe un test automatizado que protege parte de este límite revisando términos clínicos prohibidos dentro del escenario.

## Qué es mock

Todos los nombres, contactos, turnos, importes, métricas, búsquedas, filtros y acciones son ficticios. Las interacciones viven en memoria y no persisten.

## Producción futura

Después de una venta podrían evaluarse agenda real, permisos, recordatorios, confirmaciones, cobros, facturación e integraciones. Las capacidades clínicas o sanitarias requerirían un producto independiente, requisitos regulatorios, seguridad y diseño específico; no son una evolución automática de esta demo.

## Aprendizajes de reutilización

Después de Beauty, Taller y Consultorio, Booking Core demuestra que la agenda diaria, sus contratos y su estado demo son estables en tres industrias. Los dashboards, fichas, pipelines, modales de alta y vistas semanales deben continuar cerca de cada vertical.

No conviene crear todavía un Core para clientes/pacientes, un motor de workflows, un sistema genérico de historiales ni un schema universal de metadata. Las diferencias comerciales y semánticas siguen siendo mayores que la duplicación observada.
