# Stock Core v1 — Dominio validado por PULSE

## Propósito

Stock Core será la base neutral para demos que necesiten comunicar control de inventario. Su responsabilidad inicial es representar:

```text
Productos + Ubicaciones + Cantidades + Movimientos + Alertas
```

No es un ERP, un ledger contable ni un sistema productivo. SF-004A solo fija contratos con alta certeza; la experiencia PULSE de SF-004B deberá validar cualquier abstracción posterior.

## Contratos propuestos

### `Product`

Identidad del artículo mediante `id`, SKU, nombre, categoría y unidad. `unitCost` es opcional y sirve para estimaciones visuales, no para costeo contable. `metadata` permite que una vertical conserve atributos propios sin agregarlos al Core.

### `Category`

Clasificación simple para navegación, filtros y reportes visuales. No modela árboles ni reglas fiscales.

### `Location`

Lugar neutral donde existe stock. Puede representar un depósito, sector o rack. `parentLocationId` habilita una jerarquía simple sin crear contratos separados para almacenes.

### `StockLevel`

Snapshot determinista de cantidad para una combinación `productId + locationId`. El Core no reconstruye el saldo a partir del historial.

### `LowStockThreshold`

Mínimo esperado para una combinación `productId + locationId`. La alerta “bajo mínimo” puede derivarse visualmente comparando el snapshot con este umbral.

### `StockMovement` y `MovementType`

Registro de una entrada, salida, ajuste o transferencia. La cantidad se expresa como magnitud positiva; el tipo y las ubicaciones determinan su sentido visual. Un ajuste usa `adjustmentDirection` (`increase` o `decrease`) para evitar cantidades con signo ambiguo.

Los tipos son `inbound`, `outbound`, `adjustment` y `transfer`. Una transferencia usa un solo movimiento con origen y destino, evitando dos eventos mock difíciles de correlacionar.

## Decisiones de dominio

1. **¿Dónde vive el stock?** En producto + ubicación. Un total por producto es una vista derivada de todos sus niveles.
2. **¿Cómo se representan múltiples ubicaciones?** Mediante registros `Location` y un `StockLevel` por combinación. `parentLocationId` permite depósito → rack o sector.
3. **¿Cómo se representan transferencias?** Como un movimiento único con `sourceLocationId` y `destinationLocationId`.
4. **¿Los movimientos son inmutables?** Conceptualmente sí en producción: una corrección debería ser otro movimiento. La demo solo presentará registros y cambios locales reversibles.
5. **¿Cómo se obtiene stock actual en la demo?** Desde snapshots deterministas, sin motor contable ni replay de movimientos.
6. **¿Cómo se representa el mínimo?** Por producto + ubicación, mediante `LowStockThreshold`.
7. **¿Supplier pertenece al Core?** Todavía no. PULSE puede aportar proveedores localmente; un segundo caso deberá validar su promoción.
8. **¿Hace falta costo unitario?** Sí, como propiedad opcional para narrativa comercial. No se modelan métodos de costeo, moneda histórica ni impuestos.
9. **¿Cómo se muestra el valor?** Como aproximación determinista: suma de `quantity × unitCost`. Debe etiquetarse como valor aproximado.
10. **¿Qué debe modelarse correctamente?** Identidades, relaciones producto/ubicación, unidades y sentido del movimiento. Usuarios, fechas, referencias, cantidades y acciones pueden ser mock.

## Reglas semánticas para consumidores

- `quantity` en niveles y umbrales no debería ser negativa.
- La cantidad de un movimiento es una magnitud positiva.
- `inbound` requiere conceptualmente destino; `outbound`, origen; `transfer`, ambos.
- Un ajuste requiere ubicación y `adjustmentDirection`; su signo visual depende de esa dirección.
- Estas reglas están documentadas, pero SF-004A no introduce validadores ni errores de dominio.

## Elementos fuera de v1

- `Warehouse`: `Location` cubre la necesidad inicial.
- `Purchase`: implica órdenes, estados y recepción todavía no validados.
- `StockCount`: requiere flujos de conteo físico y conciliación.
- `InventoryValuation`: por ahora es una métrica visual, no un modelo.
- `Supplier`: permanece en PULSE hasta validar reutilización.
- UI, hooks, reducer, filtros y componentes compartidos.
- Contabilidad, facturación, impuestos, POS, ecommerce y compras completas.

## Demo vs. producción

### Demo

- Datos mock y cantidades deterministas.
- Movimientos y cambios simulados.
- Filtros y estado locales.
- Alertas derivadas para presentación.
- Dashboards y valores ficticios.

### Producción futura

- Base de datos y transacciones.
- Locking o estrategia de concurrencia.
- Historial inmutable, idempotencia y auditoría.
- Permisos y seguridad.
- Precisión decimal y reglas por unidad.
- Códigos de barras e importaciones.
- Integraciones con POS y ecommerce.
- Compras y conteos físicos.
- Estrategias reales de valuación.

Una venta inicia un diseño productivo independiente. Los contratos de demo no garantizan integridad operativa.

## Estructura mínima

```text
packages/stock-core/
├── src/
│   ├── index.ts
│   └── types.ts
├── README.md
├── package.json
└── tsconfig.json
```

## Validación SF-004B

PULSE confirmó como neutrales los contratos originales y las siguientes operaciones: resolver niveles, sumar stock por producto, sumar mínimos, derivar estado `ok | low | out`, agrupar cantidades por ubicación, filtrar por texto/estado y resolver referencias de movimientos.

Estos helpers viven en `src/stock.ts` y tienen tests unitarios. Stock Core sigue sin React, estado de demo, valoraciones o conocimiento de PULSE.

Permanecieron locales a PULSE: proveedores, valor aproximado, asociaciones comerciales, métricas globales, presentación de movimientos, jerarquía visual, drawers, modales y acciones simuladas. Autoparts deberá validar cualquier expansión posterior.
