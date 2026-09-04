import type { VerticalDemoMetadata, VerticalNavigationItem, VerticalTheme } from "./types";
export interface StockTerminology { readonly product: string; readonly products: string; readonly movement: string; readonly movements: string; readonly location: string; readonly locations: string; readonly supplier: string; readonly suppliers: string }
export interface StockVerticalConfig {
  readonly businessName: string; readonly configuration: { readonly currency: string; readonly locale: string }; readonly demo: VerticalDemoMetadata; readonly demoDataKey: string; readonly modules: readonly string[]; readonly navigation: readonly VerticalNavigationItem[]; readonly terminology: StockTerminology;
  readonly movementLabels: { readonly inbound: string; readonly outbound: string; readonly adjustment: string; readonly transfer: string }; readonly stockLabels: { readonly ok: string; readonly low: string; readonly out: string }; readonly alertLabels: { readonly critical: string; readonly warning: string }; readonly theme: VerticalTheme;
}
export function defineStockVertical(config: StockVerticalConfig): StockVerticalConfig { return config; }
