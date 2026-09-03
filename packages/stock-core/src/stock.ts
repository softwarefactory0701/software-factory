import type { Category, Location, LowStockThreshold, MovementType, Product, StockLevel, StockMovement } from "./types";

export type StockStatus = "ok" | "low" | "out";
export type ProductStockFilter = "all" | StockStatus;

export interface ResolvedMovement {
  readonly movement: StockMovement;
  readonly product?: Product;
  readonly sourceLocation?: Location;
  readonly destinationLocation?: Location;
}

export function getProductStockLevels(productId: string, levels: readonly StockLevel[]) {
  return levels.filter((level) => level.productId === productId);
}

export function getProductStockTotal(productId: string, levels: readonly StockLevel[]) {
  return getProductStockLevels(productId, levels).reduce((total, level) => total + level.quantity, 0);
}

export function getProductThresholdTotal(productId: string, thresholds: readonly LowStockThreshold[]) {
  return thresholds.filter((threshold) => threshold.productId === productId).reduce((total, threshold) => total + threshold.minimumQuantity, 0);
}

export function getProductStockStatus(productId: string, levels: readonly StockLevel[], thresholds: readonly LowStockThreshold[]): StockStatus {
  const quantity = getProductStockTotal(productId, levels);
  if (quantity <= 0) return "out";
  return quantity < getProductThresholdTotal(productId, thresholds) ? "low" : "ok";
}

export function groupStockByLocation(levels: readonly StockLevel[]) {
  return levels.reduce<Record<string, number>>((groups, level) => {
    groups[level.locationId] = (groups[level.locationId] ?? 0) + level.quantity;
    return groups;
  }, {});
}

export function filterProducts(products: readonly Product[], levels: readonly StockLevel[], thresholds: readonly LowStockThreshold[], query: string, filter: ProductStockFilter) {
  const normalized = query.trim().toLocaleLowerCase("es");
  return products.filter((product) => {
    const matchesQuery = !normalized || `${product.sku} ${product.name}`.toLocaleLowerCase("es").includes(normalized);
    return matchesQuery && (filter === "all" || getProductStockStatus(product.id, levels, thresholds) === filter);
  });
}

export function resolveMovement(movement: StockMovement, products: readonly Product[], locations: readonly Location[]): ResolvedMovement {
  return {
    movement,
    product: products.find((product) => product.id === movement.productId),
    sourceLocation: locations.find((location) => location.id === movement.sourceLocationId),
    destinationLocation: locations.find((location) => location.id === movement.destinationLocationId),
  };
}

export const movementTypeLabels: Readonly<Record<MovementType, string>> = {
  adjustment: "Ajuste",
  inbound: "Entrada",
  outbound: "Salida",
  transfer: "Transferencia",
};

export function resolveCategory(product: Product, categories: readonly Category[]) {
  return categories.find((category) => category.id === product.categoryId);
}
