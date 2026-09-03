# Autoparts — PARTX Auto Parts

## Propósito y target

PARTX es una demo comercial para repuesteras, tiendas de autopartes, distribuidores, importadores, talleres con depósito y comercios especializados.

> Encontrá el repuesto correcto, sabé dónde está y evitá perder ventas por falta de stock.

Busca resolver catálogo disperso, búsquedas lentas por vehículo, faltantes difíciles de anticipar, ubicaciones poco claras y pérdida de ventas por no confirmar disponibilidad.

## Estado

PARTX v1 es una demo visual con datos ficticios y estado local. No es un catálogo automotriz técnico ni un inventario productivo. Las compatibilidades y códigos existen para presentación y no deben utilizarse para decisiones mecánicas reales.

## Pantallas

- Dashboard: KPIs, ventas en riesgo, movimientos, categorías, marcas y actividad.
- Repuestos: búsqueda por código, nombre, marca o vehículo; filtros y drawer.
- Compatibilidad: selección mock de vehículo y repuestos relacionados.
- Movimientos: entradas, salidas, ajustes y transferencias.
- Ubicaciones: zonas técnicas, racks y mostrador.
- Alertas: prioridad, demanda y reposición estimada.
- Proveedores: marcas, productos, lead time y recepción.
- Reportes: valor, rotación, categorías, marcas y ubicaciones.
- Configuración: identidad y preferencias simuladas.

## Escenario

El escenario fijo corresponde al 8 de septiembre de 2026. Contiene 20 repuestos visibles, seis categorías, nueve ubicaciones, diez compatibilidades, cuatro proveedores y seis movimientos. Las métricas comerciales globales son 3.842 repuestos, 74 bajo mínimo, 12 agotados, 31 movimientos y $6.850.000 de valor aproximado.

## Modelos específicos

`AutoPartMetadata` aporta código de pieza, fabricante, marca, referencias OEM opcionales, compatibilidades y demanda. `VehicleCompatibility` representa marca, modelo, años, versión y motor opcionales. `PartxSupplier` modela contexto comercial de abastecimiento.

Todos permanecen en `@software-factory/mock-data/autoparts`. No forman parte de Stock Core y no pretenden ser un sistema automotriz universal.

## Uso de Stock Core

PARTX reutiliza directamente `Product`, `Category`, `Location`, `StockLevel`, `LowStockThreshold`, `StockMovement`, `MovementType` y los helpers de total, mínimo, estado, agrupación y resolución de movimientos.

El adaptador local `partView` combina esos resultados neutrales con metadata, compatibilidades y proveedor. Stock Core no necesitó cambios.

## PULSE vs. PARTX

Ambos verticales comparten el dominio de inventario, pero no sus componentes visuales. PULSE prioriza cantidades y reposición general; PARTX prioriza código de pieza, fabricante, compatibilidad y disponibilidad comercial.

La duplicación actual en shells verticales, headers, cards, filtros, tablas, drawers y gráficos es deliberada. Dos experiencias confirman patrones de composición, pero todavía no justifican un paquete React de Stock ni un modelo compartido de proveedores.

## Qué es mock

Nombres, códigos, fitment, referencias OEM, cantidades, valores, fechas, demanda, lead times, búsquedas, filtros y acciones son ficticios. No existe persistencia, backend, consulta VIN ni acceso a catálogos externos.

## Producción futura

Ante una venta podrían analizarse lector de códigos, VIN, catálogos y equivalencias de fabricantes, OEM reales, sucursales, ecommerce, POS, compras, reservas, ventas e integración con talleres. Cada capacidad requeriría fuentes verificadas, reglas productivas, seguridad e infraestructura independientes.

## Aprendizajes de reutilización

Stock Core v1 soportó un segundo vertical profundamente especializado sin incorporar conceptos automotrices. Los contratos y helpers neutrales pueden congelarse. Proveedores, valoraciones, demanda, prioridades y UI deben permanecer fuera hasta que más experiencias demuestren una abstracción estable.
