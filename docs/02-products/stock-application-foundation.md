# Stock Application Foundation

## Responsabilidad

La Foundation convierte Stock Core en un escenario de demo reutilizable y mutable en memoria. PULSE y PARTX consumen el mismo estado, operaciones, selección, filtros, alertas y detalle base.

## Escenario y estado

`StockDemoScenario` recibe productos, categorías, ubicaciones, niveles, mínimos y movimientos deterministas. `StockDemoState` agrega selección, filtros y un snapshot inicial para reset. No usa API, storage ni backend.

## Movimientos y stock negativo

`applyStockMovement` es pura. Entrada suma en destino; salida resta en origen; ajuste suma o resta según `adjustmentDirection`; transferencia resta del origen y suma al destino atómicamente, generando un solo `StockMovement`. Los IDs usan una secuencia local y el timestamp de demo por defecto es fijo.

La demo prohíbe niveles negativos. Una salida, transferencia o ajuste negativo sin stock suficiente devuelve `insufficient-stock` y no modifica ningún nivel. Cantidad, producto y ubicaciones se validan antes de producir estado.

## Alertas

Las alertas son derivadas. `getGlobalStockAlerts` compara el total del producto con la suma de mínimos y conserva el comportamiento anterior. `getLocationStockAlerts` compara cada ubicación con su mínimo para revelar faltantes que el total podría ocultar. `out` produce `critical`; `low`, `warning`.

## Product view y adapters

`getStockProductView` resuelve producto, categoría, total, mínimo, estado global, stock por ubicación, ubicación principal y movimientos recientes. `StockPresentationAdapter` permite extender búsqueda y presentación. PARTX mantiene localmente OEM, marca, demanda y compatibilidad. Los proveedores permanecen locales.

## React

Operaciones, reducer y selectores permanecen puros. `StockDemoProvider` conserva un escenario por vertical y `useStockDemo` expone estado, productos filtrados, selección, alertas, movimientos, acciones, feedback y reset. Toda mutación desaparece al recargar.

## Qué no hace

No implementa persistencia, concurrencia, usuarios, compras, POS, barcode, ecommerce, costeo, lotes, vencimientos, forecasting, multi-tenancy ni integraciones. Una venta requiere arquitectura productiva independiente.

## Nuevo vertical

Un futuro vertical aporta escenario, `StockVerticalConfig`, brand UI y un adapter opcional. Puede reutilizar provider y operaciones básicas sin copiar comportamiento de PULSE o PARTX.
