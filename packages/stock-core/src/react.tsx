"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { applyStockMovement, createStockDemoState, getFilteredStockProducts, getGlobalStockAlerts, getLocationStockAlerts, getStockProductView, stockDemoReducer, type StockPresentationAdapter } from "./application";
import type { StockDemoScenario, StockMovementCommand, StockOperationError } from "./types";

export type StockFeedback = "movement-applied" | "transfer-complete" | "reset-complete" | StockOperationError;

export function useStockDemoState(scenario: StockDemoScenario, adapter?: StockPresentationAdapter) {
  const [state, dispatch] = useReducer(stockDemoReducer, scenario, createStockDemoState);
  const [feedback, setFeedback] = useState<StockFeedback>();
  const liveScenario = useMemo(() => ({ ...state, stockLevels: state.stockLevels, movements: state.movements }), [state]);
  const applyMovement = useCallback((command: StockMovementCommand) => {
    const result = applyStockMovement(state, state.stockLevels, command, state.movements.length + 1);
    if (!result.ok) { setFeedback(result.error); return result; }
    dispatch({ type: "movement-applied", result });
    setFeedback(command.type === "transfer" ? "transfer-complete" : "movement-applied");
    return result;
  }, [state]);
  return {
    state,
    products: state.products,
    filteredProducts: getFilteredStockProducts(state, adapter),
    filteredMovements: state.movements.filter((movement) => state.filters.movementType === "all" || movement.type === state.filters.movementType),
    selectedProduct: state.products.find((product) => product.id === state.selectedProductId),
    selectedProductView: state.selectedProductId ? getStockProductView(liveScenario, state.selectedProductId) : undefined,
    alerts: getGlobalStockAlerts(state, state.stockLevels),
    locationAlerts: getLocationStockAlerts(state, state.stockLevels),
    feedback,
    selectProduct: (productId: string) => dispatch({ type: "select-product", productId }),
    closeProduct: () => dispatch({ type: "select-product", productId: undefined }),
    setSearch: (value: string) => dispatch({ type: "set-search", value }),
    setStockFilter: (value: StockDemoScenario extends never ? never : typeof state.filters.stockStatus) => dispatch({ type: "set-stock-filter", value }),
    setMovementFilter: (value: typeof state.filters.movementType) => dispatch({ type: "set-movement-filter", value }),
    applyMovement,
    reset: () => { dispatch({ type: "reset" }); setFeedback("reset-complete"); },
    clearFeedback: () => setFeedback(undefined),
  };
}

type StockDemoApi = ReturnType<typeof useStockDemoState>;
const StockDemoContext = createContext<StockDemoApi | undefined>(undefined);

export function StockDemoProvider({ scenario, adapter, children }: { readonly scenario: StockDemoScenario; readonly adapter?: StockPresentationAdapter; readonly children: ReactNode }) {
  return <StockDemoContext.Provider value={useStockDemoState(scenario, adapter)}>{children}</StockDemoContext.Provider>;
}

export function useStockDemo() {
  const context = useContext(StockDemoContext);
  if (!context) throw new Error("useStockDemo must be used inside StockDemoProvider");
  return context;
}
