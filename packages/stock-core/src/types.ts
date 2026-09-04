export type MovementType = "inbound" | "outbound" | "adjustment" | "transfer";
export type AdjustmentDirection = "increase" | "decrease";

export interface Product {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly categoryId: string;
  readonly unit: string;
  readonly unitCost?: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface Location {
  readonly id: string;
  readonly name: string;
  readonly code?: string;
  readonly parentLocationId?: string;
}

export interface StockLevel {
  readonly productId: string;
  readonly locationId: string;
  readonly quantity: number;
}

export interface LowStockThreshold {
  readonly productId: string;
  readonly locationId: string;
  readonly minimumQuantity: number;
}

export interface StockMovement {
  readonly id: string;
  readonly productId: string;
  readonly type: MovementType;
  readonly quantity: number;
  readonly adjustmentDirection?: AdjustmentDirection;
  readonly occurredAt: string;
  readonly sourceLocationId?: string;
  readonly destinationLocationId?: string;
  readonly reference?: string;
  readonly actorName?: string;
  readonly note?: string;
}

export interface StockDemoScenario {
  readonly products: readonly Product[];
  readonly categories: readonly Category[];
  readonly locations: readonly Location[];
  readonly stockLevels: readonly StockLevel[];
  readonly thresholds: readonly LowStockThreshold[];
  readonly movements: readonly StockMovement[];
  readonly demoTimestamp?: string;
}

export interface StockDemoFilters {
  readonly search: string;
  readonly stockStatus: "all" | "ok" | "low" | "out";
  readonly movementType: "all" | MovementType;
}

export interface StockDemoSnapshot {
  readonly stockLevels: readonly StockLevel[];
  readonly movements: readonly StockMovement[];
}

export interface StockDemoState extends StockDemoScenario {
  readonly selectedProductId?: string;
  readonly filters: StockDemoFilters;
  readonly initialSnapshot: StockDemoSnapshot;
}

export type StockAlertSeverity = "critical" | "warning";

export interface StockAlert {
  readonly productId: string;
  readonly locationId?: string;
  readonly status: "low" | "out";
  readonly current: number;
  readonly threshold: number;
  readonly severity: StockAlertSeverity;
  readonly scope: "global" | "location";
}

export interface StockMovementCommand {
  readonly productId: string;
  readonly type: MovementType;
  readonly quantity: number;
  readonly adjustmentDirection?: AdjustmentDirection;
  readonly sourceLocationId?: string;
  readonly destinationLocationId?: string;
  readonly occurredAt?: string;
  readonly reference?: string;
  readonly actorName?: string;
  readonly note?: string;
}

export type StockOperationError =
  | "invalid-quantity"
  | "invalid-product"
  | "location-required"
  | "same-location"
  | "insufficient-stock";

export type StockOperationResult =
  | { readonly ok: true; readonly stockLevels: readonly StockLevel[]; readonly movement: StockMovement }
  | { readonly ok: false; readonly error: StockOperationError };
