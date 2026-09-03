import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getProductStockStatus, getProductStockTotal, groupStockByLocation, resolveMovement } from "./stock";
import type { Location, LowStockThreshold, Product, StockLevel, StockMovement } from "./types";

const products: Product[] = [{ id: "p1", sku: "P-1", name: "Producto", categoryId: "c1", unit: "un" }];
const locations: Location[] = [{ id: "a", name: "A" }, { id: "b", name: "B" }];
const levels: StockLevel[] = [{ productId: "p1", locationId: "a", quantity: 8 }, { productId: "p1", locationId: "b", quantity: 4 }];
const thresholds: LowStockThreshold[] = [{ productId: "p1", locationId: "a", minimumQuantity: 10 }, { productId: "p1", locationId: "b", minimumQuantity: 5 }];

describe("Stock Core", () => {
  it("derives total stock and status across locations", () => {
    assert.equal(getProductStockTotal("p1", levels), 12);
    assert.equal(getProductStockStatus("p1", levels, thresholds), "low");
    assert.equal(getProductStockStatus("p1", [{ productId: "p1", locationId: "a", quantity: 0 }], thresholds), "out");
    assert.equal(getProductStockStatus("p1", [{ productId: "p1", locationId: "a", quantity: 20 }], thresholds), "ok");
  });

  it("groups quantities by location", () => assert.deepEqual(groupStockByLocation(levels), { a: 8, b: 4 }));

  it("keeps a transfer as one movement with resolved origin and destination", () => {
    const movement: StockMovement = { id: "m1", productId: "p1", type: "transfer", quantity: 3, occurredAt: "2026-09-08T10:00:00", sourceLocationId: "a", destinationLocationId: "b" };
    const resolved = resolveMovement(movement, products, locations);
    assert.equal(resolved.product?.id, "p1");
    assert.equal(resolved.sourceLocation?.id, "a");
    assert.equal(resolved.destinationLocation?.id, "b");
  });
});
