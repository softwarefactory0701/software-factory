import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyStockMovement, createStockDemoState, getFilteredStockProducts, getGlobalStockAlerts, getLocationStockAlerts, getStockProductView, stockDemoReducer } from "./application";
import type { StockDemoScenario, StockMovementCommand } from "./types";

const scenario: StockDemoScenario = {
  products: [{ id: "p1", sku: "P-1", name: "Producto", categoryId: "c1", unit: "un" }], categories: [{ id: "c1", name: "General" }], locations: [{ id: "a", name: "A" }, { id: "b", name: "B" }],
  stockLevels: [{ productId: "p1", locationId: "a", quantity: 8 }, { productId: "p1", locationId: "b", quantity: 2 }], thresholds: [{ productId: "p1", locationId: "a", minimumQuantity: 10 }], movements: [],
};
const run = (command: StockMovementCommand, levels = scenario.stockLevels) => applyStockMovement(scenario, levels, command, 1);

describe("Stock Application Foundation", () => {
  it("applies stock in", () => { const result = run({ productId: "p1", type: "inbound", quantity: 3, destinationLocationId: "a" }); assert.equal(result.ok && result.stockLevels[0]?.quantity, 11); });
  it("applies stock out", () => { const result = run({ productId: "p1", type: "outbound", quantity: 3, sourceLocationId: "a" }); assert.equal(result.ok && result.stockLevels[0]?.quantity, 5); });
  it("applies positive and negative adjustments", () => {
    const plus = run({ productId: "p1", type: "adjustment", adjustmentDirection: "increase", quantity: 2, destinationLocationId: "a" }); assert.equal(plus.ok && plus.stockLevels[0]?.quantity, 10);
    const minus = run({ productId: "p1", type: "adjustment", adjustmentDirection: "decrease", quantity: 2, sourceLocationId: "a" }); assert.equal(minus.ok && minus.stockLevels[0]?.quantity, 6);
  });
  it("transfers atomically with one movement", () => { const result = run({ productId: "p1", type: "transfer", quantity: 3, sourceLocationId: "a", destinationLocationId: "b" }); assert.ok(result.ok); if (result.ok) { assert.deepEqual(result.stockLevels.map((level) => level.quantity), [5, 5]); assert.equal(result.movement.type, "transfer"); } });
  it("rejects insufficient stock without changing levels", () => { const result = run({ productId: "p1", type: "outbound", quantity: 9, sourceLocationId: "a" }); assert.deepEqual(result, { ok: false, error: "insufficient-stock" }); assert.equal(scenario.stockLevels[0]?.quantity, 8); });
  it("resets levels, movements, selection and filters", () => {
    const initial = createStockDemoState(scenario); const changed = { ...initial, stockLevels: [{ productId: "p1", locationId: "a", quantity: 1 }], movements: [{ id: "new", productId: "p1", type: "inbound" as const, quantity: 1, occurredAt: "2026-09-08T14:00:00" }], selectedProductId: "p1", filters: { ...initial.filters, search: "x" } };
    const reset = stockDemoReducer(changed, { type: "reset" }); assert.deepEqual(reset.stockLevels, scenario.stockLevels); assert.deepEqual(reset.movements, []); assert.equal(reset.selectedProductId, undefined); assert.equal(reset.filters.search, "");
  });
  it("derives global and location alerts separately", () => { assert.equal(getGlobalStockAlerts(scenario, scenario.stockLevels).length, 0); const alerts = getLocationStockAlerts(scenario, scenario.stockLevels); assert.equal(alerts[0]?.scope, "location"); assert.equal(alerts[0]?.status, "low"); });
  it("builds the neutral product detail view", () => { const view = getStockProductView(scenario, "p1"); assert.equal(view?.category?.name, "General"); assert.equal(view?.total, 10); assert.equal(view?.stockByLocation.length, 2); assert.equal(view?.primaryLocation?.id, "a"); });
  it("keeps selection and extensible search/filter behavior pure", () => { let state = createStockDemoState(scenario); state = stockDemoReducer(state, { type: "select-product", productId: "p1" }); state = stockDemoReducer(state, { type: "set-search", value: "hotel" }); assert.equal(state.selectedProductId, "p1"); assert.equal(getFilteredStockProducts(state, { searchText: () => "hotel" }).length, 1); });
});
