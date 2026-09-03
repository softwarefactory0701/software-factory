# Depósito — PULSE Inventory

## Estado

PULSE Inventory es la primera demo navegable de Stock Family. Vive en `/stock`; se eligió esta raíz porque identifica la familia neutral y no ata futuras experiencias a un único tipo de depósito.

## Target

- Depósitos y almacenes internos.
- Comercios con inventario.
- Pequeñas distribuidoras.
- Negocios que administran stock con Excel o papel.
- Empresas que ya poseen POS pero necesitan mayor control de inventario.

## Problemas

- Desconocer el stock real y dónde se encuentra.
- Productos repartidos entre ubicaciones sin una vista central.
- Entradas y salidas sin trazabilidad clara.
- Productos agotados o debajo del mínimo.
- Reposición y compras sin seguimiento suficiente.
- Desconocer el valor aproximado del inventario.
- Dificultad para decidir qué reponer.

## Propuesta de valor

> Controlá qué tenés, dónde está y qué necesitás reponer.

PULSE complementa la operación existente. No pretende sustituir el POS, la administración, la contabilidad ni el ecommerce del negocio.

## Escenario comercial

El escenario futuro será determinista y mostrará:

- 1.284 productos.
- 36 productos bajo mínimo.
- 18 movimientos del día.
- $2.480.000 de valor aproximado de inventario.

Ejemplos iniciales:

| SKU | Producto | Categoría | Stock | Mínimo | Ubicación |
| --- | --- | --- | ---: | ---: | --- |
| PRD-001 | Guantes nitrilo caja x100 | Seguridad | 124 | 40 | Rack A-02 |
| PRD-002 | Cinta de embalaje 48 mm | Embalaje | 32 | 50 | Rack B-04 |
| PRD-003 | Caja corrugada mediana | Embalaje | 280 | 100 | Sector C |

La demo implementa 18 productos visibles, ocho ubicaciones jerárquicas, niveles y mínimos coherentes, ocho movimientos representativos y cuatro proveedores ficticios. Las métricas globales representan un catálogo comercial mayor y no se calculan desde las filas visibles.

## Blueprint de pantallas

### Dashboard

KPIs principales, alertas de reposición, últimas entradas y salidas, stock por categoría, movimientos semanales y ubicaciones con mayor inventario.

### Productos

Listado con SKU, producto, categoría, stock actual, mínimo, ubicación, costo, valor y estado. Debe permitir comprender existencias y reposición rápidamente.

### Movimientos

Timeline o tabla con producto, cantidad, tipo, origen, destino, fecha/hora, usuario ficticio y referencia opcional:

- Entrada: `+50 unidades`.
- Salida: `-12 unidades`.
- Ajuste: `-3 unidades`.
- Transferencia: `A-02 → B-01`.

### Ubicaciones

Vista de Depósito principal, racks A-01, A-02, B-01 y B-04, y Sector C. La jerarquía será simple y visual; no se construirá un gestor complejo de almacenes.

### Alertas

Priorizar bajo mínimo y agotado. Exceso de stock y ausencia de movimientos pueden aparecer después si aportan valor comercial. No habrá motor real de reglas.

### Proveedores

Vista local de PULSE con nombre, contacto, productos asociados, última entrada, lead time visual y estado. No implementará compras reales ni se promoverá todavía a Stock Core.

### Reportes

Valor aproximado, productos bajo mínimo, entradas vs. salidas, productos con mayor movimiento, distribución por categoría e inventario por ubicación. Todo será determinista.

### Configuración

Identidad del negocio, unidades, moneda y preferencias visuales simuladas. No incluirá integraciones ni configuración productiva.

## Principios para SF-004B

- Construir una demo comercial, no un sistema operativo real.
- Mantener datos y métricas deterministas.
- Usar estado local y acciones reversibles.
- Etiquetar claramente el valor de inventario como aproximado.
- Mantener proveedores y composición visual dentro de PULSE.
- No introducir compras, conteos físicos ni contabilidad.
- No diseñar para Autoparts antes de validar PULSE.

## Implementación validada

- Dashboard, Productos, Movimientos, Ubicaciones, Alertas, Proveedores, Reportes y Configuración.
- Búsqueda y filtros locales de productos.
- Drawer de producto con stock por ubicación y movimientos.
- Filtros y modal simulado de movimientos.
- Alertas revisables en memoria con Reset demo.
- Ubicaciones desplegables con productos asociados.
- Navegación mobile: Inicio, Productos, Movimientos, Alertas y Más.

No existe backend, persistencia ni reconstrucción del stock desde movimientos. Los valores, gráficos y cambios son deterministas o locales.

## Roadmap conceptual

1. **SF-004B — PULSE Demo:** experiencia navegable con dataset mock.
2. **Pulido comercial:** ajustar jerarquía y escenarios a partir de revisión visual.
3. **Autoparts:** segundo vertical con código de pieza, marca, modelo, año, compatibilidad y fabricante, sin contaminar Stock Core.
4. **Producción:** solo ante una venta, con arquitectura, persistencia, concurrencia, auditoría e integraciones definidas para el cliente.

Autoparts será la prueba real de reutilización. Hasta entonces, Stock Core debe permanecer pequeño.
