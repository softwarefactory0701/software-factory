export type {
  AdjustmentDirection,
  Category,
  Location,
  LowStockThreshold,
  MovementType,
  Product,
  StockLevel,
  StockMovement,
  StockAlert,
  StockAlertSeverity,
  StockDemoFilters,
  StockDemoScenario,
  StockDemoSnapshot,
  StockDemoState,
  StockMovementCommand,
  StockOperationError,
  StockOperationResult,
} from "./types";
export {
  filterProducts,
  getProductStockLevels,
  getProductStockStatus,
  getProductStockTotal,
  getProductThresholdTotal,
  groupStockByLocation,
  movementTypeLabels,
  resolveCategory,
  resolveMovement,
} from "./stock";
export type { ProductStockFilter, ResolvedMovement, StockStatus } from "./stock";
export {
  applyStockMovement,
  createStockDemoState,
  getFilteredStockProducts,
  getGlobalStockAlerts,
  getLocationStockAlerts,
  getStockProductView,
  stockDemoReducer,
} from "./application";
export type { StockLocationView, StockPresentation, StockPresentationAdapter, StockProductView } from "./application";
export { StockDemoProvider, useStockDemo, useStockDemoState } from "./react";
export type { StockFeedback } from "./react";
