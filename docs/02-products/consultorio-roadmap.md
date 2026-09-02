# NEXUS Consultorios — Roadmap conceptual

## Propósito

Este roadmap conserva la visión de evolución de NEXUS si una demo genera una oportunidad comercial. No constituye alcance comprometido ni autoriza implementar funcionalidades. Cada fase de producción deberá definirse a partir de un cliente real, sus procesos, su país y el tipo de institución.

## Fase 1 — NEXUS Management

Gestión administrativa representada actualmente por la demo comercial:

- Agenda.
- Pacientes.
- Profesionales.
- Servicios.
- Consultas administrativas.
- Reportes.
- Configuración.

El objetivo es ordenar la operación del consultorio sin almacenar información clínica sensible.

## Fase 2 — NEXUS Production Core

Base productiva que se evaluaría únicamente cuando exista un cliente real:

- Autenticación y usuarios.
- Roles y permisos.
- Base de datos y persistencia real.
- Agenda y disponibilidad reales.
- Pacientes reales.
- Configuración del negocio.
- Recordatorios.
- Backups.
- Auditoría.
- Controles de seguridad.

Esta fase deberá convertir el escenario validado comercialmente en un producto independiente, con requisitos y arquitectura propios.

## Fase 3 — NEXUS Clinical

Módulo profesional y clínico potencial. Podría contemplar historia clínica, antecedentes, alergias, evoluciones, consultas anteriores, diagnósticos, observaciones, mediciones según especialidad, estudios, documentos, PDFs, imágenes, archivos adjuntos, profesional responsable, fecha y hora de cada registro y línea temporal del paciente.

Estos conceptos son exclusivamente una dirección futura. No forman parte de la demo ni deben añadirse como una simple extensión de los mocks administrativos.

### Seguridad y datos sensibles

Cualquier implementación de NEXUS Clinical deberá diseñarse específicamente para tratar información sensible. Como mínimo, el análisis de producción deberá considerar:

- Permisos por rol y acceso mínimo necesario.
- Cifrado apropiado para datos almacenados y en tránsito.
- Sesiones seguras y recuperación de cuenta.
- Auditoría y registro de accesos y modificaciones.
- Backups y procedimientos de recuperación.
- Aislamiento entre organizaciones.
- Control de archivos, descargas y adjuntos.
- Consentimiento y políticas de retención.
- Cumplimiento de la legislación aplicable en el país de implementación.

No se asume una regulación universal. Los requisitos deberán revisarse según el país, la jurisdicción, la especialidad y el tipo de institución antes de diseñar o vender el módulo.

## Fase 4 — NEXUS Patient

Portal privado potencial para pacientes:

- Próximos turnos.
- Reserva, reprogramación y cancelación.
- Historial de consultas que hayan sido compartidas.
- Documentos y estudios compartidos.
- Indicaciones compartidas.
- Pagos y recibos futuros.
- Perfil y profesionales.
- Comunicaciones.

La información clínica interna no equivale a la información visible para el paciente. En producción, los profesionales deberán poder decidir qué contenido permanece interno y qué contenido se comparte, sujeto a permisos, trazabilidad y legislación aplicable.

## Fase 5 — NEXUS Automation

Automatizaciones administrativas potenciales:

- Recordatorios y confirmaciones.
- WhatsApp y emails.
- Recuperación de pacientes.
- Avisos.
- Flujos administrativos automatizados.

Los canales, consentimientos, proveedores y reglas se definirán solo para una implementación real.

## Criterio de avance

Ninguna fase se inicia por completar la anterior de forma conceptual. El avance depende de una necesidad comercial validada, un cliente concreto y una definición independiente de alcance, seguridad y operación.
