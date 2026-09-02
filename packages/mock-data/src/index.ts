export const DEMO_NOTICE = "Datos ficticios · Acciones simuladas";

export interface MockDataset<T> {
  readonly generatedFor: "demo";
  readonly records: readonly T[];
}

export function defineMockDataset<T>(records: readonly T[]): MockDataset<T> {
  return { generatedFor: "demo", records };
}

export interface MockScenario<T> {
  readonly data: T;
  readonly generatedFor: "demo";
}

export function defineMockScenario<T>(data: T): MockScenario<T> {
  return { data, generatedFor: "demo" };
}
