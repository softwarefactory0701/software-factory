import { defineVertical } from "../src/types";

export const beautyVertical = defineVertical({
  businessName: "AURA Beauty Studio",
  configuration: {
    currency: "ARS",
    locale: "es-AR",
    weekStartsOn: "monday",
  },
  demo: {
    disclaimer: "Datos ficticios · Acciones simuladas",
    internalName: "Beauty",
    scenarioName: "Un martes de alta ocupación en AURA",
    shownName: "AURA Beauty Studio",
  },
  demoDataKey: "beauty-aura-v1",
  modules: ["dashboard", "booking", "customers", "services", "resources", "reports", "settings"],
  navigation: [
    { href: "/beauty/dashboard", label: "Dashboard", module: "dashboard" },
    { href: "/beauty/agenda", label: "Agenda", module: "booking" },
    { href: "/beauty/clientes", label: "Clientes", module: "customers" },
    { href: "/beauty/servicios", label: "Servicios", module: "services" },
    { href: "/beauty/profesionales", label: "Profesionales", module: "resources" },
    { href: "/beauty/reportes", label: "Reportes", module: "reports" },
    { href: "/beauty/configuracion", label: "Configuración", module: "settings" },
  ],
  terminology: {
    booking: "Turno",
    bookings: "Turnos",
    customer: "Cliente",
    customers: "Clientes",
    resource: "Profesional",
    resources: "Profesionales",
    service: "Servicio",
    services: "Servicios",
  },
  theme: {
    accentColor: "#a76f73",
    backgroundColor: "#f7f3ed",
    foregroundColor: "#292623",
    logoText: "AURA",
    mutedColor: "#8d8177",
    sidebarColor: "#292623",
    surfaceColor: "#fffdf9",
  },
} as const);

export type BeautyConfiguration = typeof beautyVertical.configuration;
