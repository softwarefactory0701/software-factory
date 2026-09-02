import { defineVertical } from "../src/types";

export const tallerVertical = defineVertical({
  businessName: "TORQUE Garage",
  configuration: { currency: "ARS", locale: "es-AR", scheduleEndHour: 19, scheduleStartHour: 8, weekStartsOn: "monday" },
  demo: {
    disclaimer: "Datos ficticios · Acciones simuladas",
    internalName: "Taller",
    scenarioName: "Un martes operativo en TORQUE Garage",
    shownName: "TORQUE Garage",
  },
  demoDataKey: "taller-torque-v1",
  modules: ["dashboard", "booking", "orders", "vehicles", "customers", "services", "resources", "reports", "settings"],
  navigation: [
    { href: "/taller/dashboard", label: "Dashboard", module: "dashboard" },
    { href: "/taller/agenda", label: "Agenda", module: "booking" },
    { href: "/taller/ordenes", label: "Órdenes", module: "orders" },
    { href: "/taller/vehiculos", label: "Vehículos", module: "vehicles" },
    { href: "/taller/clientes", label: "Clientes", module: "customers" },
    { href: "/taller/servicios", label: "Servicios", module: "services" },
    { href: "/taller/mecanicos", label: "Mecánicos", module: "resources" },
    { href: "/taller/reportes", label: "Reportes", module: "reports" },
    { href: "/taller/configuracion", label: "Configuración", module: "settings" },
  ],
  terminology: {
    booking: "Turno", bookings: "Turnos", customer: "Cliente", customers: "Clientes",
    resource: "Mecánico", resources: "Mecánicos", service: "Servicio", services: "Servicios",
  },
  theme: {
    accentColor: "#d97706", backgroundColor: "#f3f2ef", foregroundColor: "#202321", logoText: "TG",
    mutedColor: "#747974", sidebarColor: "#202321", surfaceColor: "#fffefa",
  },
} as const);

export type TallerConfiguration = typeof tallerVertical.configuration;
