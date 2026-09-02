export interface VerticalTerminology {
  readonly booking: string;
  readonly bookings: string;
  readonly customer: string;
  readonly customers: string;
  readonly resource: string;
  readonly resources: string;
  readonly service: string;
  readonly services: string;
}

export interface VerticalNavigationItem {
  readonly href: string;
  readonly label: string;
  readonly module: string;
}

export interface VerticalTheme {
  readonly accentColor: string;
  readonly backgroundColor: string;
  readonly foregroundColor: string;
  readonly logoText: string;
  readonly mutedColor: string;
  readonly sidebarColor: string;
  readonly surfaceColor: string;
}

export interface VerticalDemoMetadata {
  readonly disclaimer: string;
  readonly internalName: string;
  readonly scenarioName: string;
  readonly shownName: string;
}

export interface VerticalDefinition<TConfig extends Record<string, unknown> = Record<string, unknown>> {
  readonly businessName: string;
  readonly configuration: TConfig;
  readonly demo: VerticalDemoMetadata;
  readonly demoDataKey: string;
  readonly modules: readonly string[];
  readonly navigation: readonly VerticalNavigationItem[];
  readonly terminology: VerticalTerminology;
  readonly theme: VerticalTheme;
}

export function defineVertical<TConfig extends Record<string, unknown>>(
  definition: VerticalDefinition<TConfig>,
): VerticalDefinition<TConfig> {
  return definition;
}
