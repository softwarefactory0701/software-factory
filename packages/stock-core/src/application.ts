import { filterProducts, getProductStockLevels, getProductStockStatus, getProductStockTotal, getProductThresholdTotal, resolveCategory } from "./stock";
import type { Location, StockAlert, StockDemoScenario, StockDemoState, StockLevel, StockMovement, StockMovementCommand, StockOperationResult } from "./types";

export interface StockLocationView { readonly location: Location; readonly quantity: number }
export interface StockProductView {
  readonly product: StockDemoScenario["products"][number];
  readonly category?: StockDemoScenario["categories"][number];
  readonly total: number;
  readonly minimum: number;
  readonly status: "ok" | "low" | "out";
  readonly stockByLocation: readonly StockLocationView[];
  readonly recentMovements: readonly StockMovement[];
  readonly primaryLocation?: Location;
}

export interface StockPresentation {
  readonly title: string;
  readonly subtitle?: string;
  readonly secondaryMetadata?: string;
  readonly primaryLocation?: string;
  readonly supplierDisplay?: string;
  readonly statusLabel?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface StockPresentationAdapter {
  readonly presentProduct?: (view: StockProductView) => StockPresentation;
  readonly searchText?: (product: StockDemoScenario["products"][number]) => string;
}

export function createStockDemoState(scenario: StockDemoScenario): StockDemoState {
  const stockLevels = scenario.stockLevels.map((level) => ({ ...level }));
  const movements = scenario.movements.map((movement) => ({ ...movement }));
  return { ...scenario, stockLevels, movements, filters: { search: "", stockStatus: "all", movementType: "all" }, initialSnapshot: { stockLevels, movements } };
}

function quantityAt(levels: readonly StockLevel[], productId: string, locationId: string) {
  return levels.find((level) => level.productId === productId && level.locationId === locationId)?.quantity ?? 0;
}

function setQuantity(levels: readonly StockLevel[], productId: string, locationId: string, quantity: number): readonly StockLevel[] {
  const exists = levels.some((level) => level.productId === productId && level.locationId === locationId);
  return exists
    ? levels.map((level) => level.productId === productId && level.locationId === locationId ? { ...level, quantity } : level)
    : [...levels, { productId, locationId, quantity }];
}

export function applyStockMovement(scenario: Pick<StockDemoScenario, "products" | "locations">, levels: readonly StockLevel[], command: StockMovementCommand, sequence: number): StockOperationResult {
  if (!Number.isFinite(command.quantity) || command.quantity <= 0) return { ok: false, error: "invalid-quantity" };
  if (!scenario.products.some((product) => product.id === command.productId)) return { ok: false, error: "invalid-product" };
  const sourceRequired = command.type === "outbound" || command.type === "transfer" || (command.type === "adjustment" && command.adjustmentDirection === "decrease");
  const destinationRequired = command.type === "inbound" || command.type === "transfer" || (command.type === "adjustment" && command.adjustmentDirection === "increase");
  const source = command.sourceLocationId;
  const destination = command.destinationLocationId;
  if ((sourceRequired && !source) || (destinationRequired && !destination) || (command.type === "adjustment" && !command.adjustmentDirection)) return { ok: false, error: "location-required" };
  if ((source && !scenario.locations.some((location) => location.id === source)) || (destination && !scenario.locations.some((location) => location.id === destination))) return { ok: false, error: "location-required" };
  if (command.type === "transfer" && source === destination) return { ok: false, error: "same-location" };
  if (sourceRequired && source && quantityAt(levels, command.productId, source) < command.quantity) return { ok: false, error: "insufficient-stock" };

  let next = levels;
  if (sourceRequired && source) next = setQuantity(next, command.productId, source, quantityAt(next, command.productId, source) - command.quantity);
  if (destinationRequired && destination) next = setQuantity(next, command.productId, destination, quantityAt(next, command.productId, destination) + command.quantity);
  const movement: StockMovement = {
    ...command,
    id: `stock-demo-${sequence}`,
    occurredAt: command.occurredAt ?? "2026-09-08T14:00:00",
  };
  return { ok: true, stockLevels: next, movement };
}

export function getGlobalStockAlerts(scenario: Pick<StockDemoScenario, "products" | "thresholds">, levels: readonly StockLevel[]): StockAlert[] {
  return scenario.products.flatMap((product) => {
    const current = getProductStockTotal(product.id, levels);
    const threshold = getProductThresholdTotal(product.id, scenario.thresholds);
    const status = getProductStockStatus(product.id, levels, scenario.thresholds);
    return status === "ok" ? [] : [{ productId: product.id, current, threshold, status, severity: status === "out" ? "critical" : "warning", scope: "global" as const }];
  });
}

export function getLocationStockAlerts(scenario: Pick<StockDemoScenario, "thresholds">, levels: readonly StockLevel[]): StockAlert[] {
  return scenario.thresholds.flatMap((threshold) => {
    const current = quantityAt(levels, threshold.productId, threshold.locationId);
    const status = current <= 0 ? "out" : current < threshold.minimumQuantity ? "low" : "ok";
    return status === "ok" ? [] : [{ productId: threshold.productId, locationId: threshold.locationId, current, threshold: threshold.minimumQuantity, status, severity: status === "out" ? "critical" : "warning", scope: "location" as const }];
  });
}

export function getStockProductView(scenario: StockDemoScenario, productId: string): StockProductView | undefined {
  const product = scenario.products.find((item) => item.id === productId);
  if (!product) return undefined;
  const productLevels = getProductStockLevels(productId, scenario.stockLevels);
  const stockByLocation = productLevels.map((level) => ({ location: scenario.locations.find((location) => location.id === level.locationId)! , quantity: level.quantity })).filter((entry) => entry.location);
  return {
    product,
    category: resolveCategory(product, scenario.categories),
    total: getProductStockTotal(productId, scenario.stockLevels),
    minimum: getProductThresholdTotal(productId, scenario.thresholds),
    status: getProductStockStatus(productId, scenario.stockLevels, scenario.thresholds),
    stockByLocation,
    recentMovements: scenario.movements.filter((movement) => movement.productId === productId).slice(0, 5),
    primaryLocation: stockByLocation[0]?.location,
  };
}

export function getFilteredStockProducts(state: StockDemoState, adapter?: StockPresentationAdapter) {
  const base = filterProducts(state.products, state.stockLevels, state.thresholds, "", state.filters.stockStatus);
  const query = state.filters.search.trim().toLocaleLowerCase("es");
  return base.filter((product) => !query || `${product.sku} ${product.name} ${adapter?.searchText?.(product) ?? ""}`.toLocaleLowerCase("es").includes(query));
}

export type StockDemoAction =
  | { readonly type: "select-product"; readonly productId?: string }
  | { readonly type: "set-search"; readonly value: string }
  | { readonly type: "set-stock-filter"; readonly value: StockDemoState["filters"]["stockStatus"] }
  | { readonly type: "set-movement-filter"; readonly value: StockDemoState["filters"]["movementType"] }
  | { readonly type: "movement-applied"; readonly result: Extract<StockOperationResult, { ok: true }> }
  | { readonly type: "reset" };

export function stockDemoReducer(state: StockDemoState, action: StockDemoAction): StockDemoState {
  if (action.type === "select-product") return { ...state, selectedProductId: action.productId };
  if (action.type === "set-search") return { ...state, filters: { ...state.filters, search: action.value } };
  if (action.type === "set-stock-filter") return { ...state, filters: { ...state.filters, stockStatus: action.value } };
  if (action.type === "set-movement-filter") return { ...state, filters: { ...state.filters, movementType: action.value } };
  if (action.type === "movement-applied") return { ...state, stockLevels: action.result.stockLevels, movements: [action.result.movement, ...state.movements] };
  return { ...state, stockLevels: state.initialSnapshot.stockLevels.map((level) => ({ ...level })), movements: state.initialSnapshot.movements.map((movement) => ({ ...movement })), selectedProductId: undefined, filters: { search: "", stockStatus: "all", movementType: "all" } };
}
