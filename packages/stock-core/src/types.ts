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
