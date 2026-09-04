# Inmobiliaria — NOVA Realty

## Estado

NOVA Realty es el primer vertical navegable de CRM Family. SF-006B implementa su escenario comercial determinista sobre CRM Core v1.

## Target

- Inmobiliarias y brokers.
- Pequeños equipos comerciales inmobiliarios.
- Desarrolladoras.
- Asesores inmobiliarios.
- Equipos de venta de propiedades.

## Problemas

- Interesados repartidos entre WhatsApp, llamadas, Instagram, portales y planillas.
- Seguimientos olvidados y oportunidades sin próxima acción.
- Poca claridad sobre quién atendió a cada persona.
- Propiedades e interesados sin una relación visible.
- Visitas y tareas comerciales dispersas.
- Falta de trazabilidad, conversión y visibilidad del pipeline.

## Propuesta de valor

> Cada interesado, propiedad y oportunidad en un solo lugar.

## Módulos futuros

### Dashboard

Lectura ejecutiva con 48 leads activos, 27 oportunidades, 12 visitas semanales, USD 1.420.000 de pipeline y 18% de conversión. Incluirá seguimientos de hoy, oportunidades por etapa, fuentes, actividad semanal y asesores.

### Pipeline

Pantalla estrella con etapas configuradas localmente:

1. Nuevo lead.
2. Contactado.
3. Interesado.
4. Visita agendada.
5. Negociación.
6. Reserva.
7. Cerrado.

Cada card podrá mostrar contacto, propiedad, valor, asesor, última actividad y próxima tarea. No se necesita drag-and-drop real inicialmente.

### Interesados

Listado y detalle con contacto, propiedad de interés, presupuesto, fuente, asesor, etapa, actividad y próxima tarea. El detalle reunirá oportunidades, propiedades vistas, actividades, tareas y notas comerciales.

### Propiedades

Catálogo local con tipo, operación, precio, moneda, ubicación, dormitorios, baños, superficie, estado, interesados y próximas visitas. Las imágenes, si se usan, serán assets locales o placeholders.

### Visitas

Agenda simple con fecha/hora, interesado, propiedad, asesor, estado y próxima acción. No requiere un calendario complejo nuevo.

### Seguimientos

Tareas organizadas en Hoy, Atrasadas y Próximas. Ejemplos: llamar a un interesado, enviar una ficha, confirmar una visita o solicitar documentación.

### Reportes

Oportunidades activas, valor del pipeline, conversión, fuentes, etapas, visitas, desempeño por asesor y propiedades con mayor interés. Todo determinista.

### Configuración

Identidad, pipeline, etapas, asesores, fuentes y preferencias visuales simuladas.

## Escenario NOVA Realty

El escenario futuro representará una jornada comercial fija con contactos, oportunidades, actividades y tareas coherentes. Algunos ejemplos conceptuales:

- Lucía Fernández · Departamento 2 ambientes en Palermo · llamar hoy 11:30.
- Carlos Gómez · Casa en Nordelta · visita mañana 16:00.
- Mariana Torres · Proyecto Tulum · enviar propuesta.

Todos los nombres, propiedades, importes, fuentes, notas y acciones serán ficticios.

## Modelos específicos de Real Estate

### `Property`

Entidad local con título, tipo, operación, precio, moneda, ubicación, dormitorios, baños, superficie, estado y metadata.

### `PropertyStatus`

Estados iniciales: `available`, `reserved`, `sold`, `rented`.

### `Visit`

Relaciona propiedad, contacto, agente, fecha y estado `scheduled | completed | cancelled`, con notas administrativas opcionales.

### `AgentProfile`

Perfil local del asesor usado para presentación, asignación mock y reportes. CRM Core solo recibe su identificador como `ownerId`.

Property, Visit y AgentProfile no pertenecen a CRM Core.

## Uso previsto de CRM Core

NOVA adaptará interesados a `Contact`; negocios sobre propiedades a `Opportunity`; el flujo inmobiliario a `Pipeline`; llamadas y reuniones a `Activity`; y seguimientos a `Task`.

Fuente, propiedad relacionada, preferencias de búsqueda y presupuesto específico pueden permanecer en metadata o modelos locales hasta que exista evidencia de reutilización.

## Demo vs. producción

La demo utilizará pipeline, filtros, tareas y actividades simuladas en memoria. No tendrá backend, autenticación, comunicaciones, portales, captación automática ni persistencia.

Una versión productiva futura deberá considerar permisos y visibilidad por asesor, deduplicación, asignación de leads, auditoría, concurrencia, privacidad, consentimientos, importaciones, integraciones, multiempresa y reporting real.

## Implementación SF-006B

La demo vive bajo `/inmobiliaria` e incluye Dashboard, Pipeline, Interesados, Propiedades, Visitas, Seguimientos, Reportes y Configuración. El pipeline admite selección, cambio local de etapa y restablecimiento del escenario; las demás acciones son visuales y simuladas.

El dataset está fijado al 8 de septiembre de 2026. Property, Visit y AgentProfile siguen siendo modelos locales del vertical. No existen backend, autenticación, base de datos, integraciones ni persistencia.

## Roadmap conceptual

1. **SF-006B — NOVA Realty Demo:** experiencia navegable y validación inicial de CRM Core.
2. **Pulido comercial:** mejoras pequeñas guiadas por revisión visual y venta.
3. **Sales CRM:** segundo vertical sin Property, Visit, AgentProfile ni terminología inmobiliaria.
4. **Producción:** solo ante una venta, con arquitectura, permisos, datos e integraciones definidos para el cliente.

Sales CRM será la prueba real de reutilización. Hasta entonces CRM Core debe permanecer limitado a contratos.
