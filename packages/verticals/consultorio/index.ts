import { defineVertical } from "../src/types";

export const consultorioVertical = defineVertical({
  businessName: "NEXUS Consultorios",
  configuration: { currency: "ARS", locale: "es-AR", weekStartsOn: "monday" },
  demo: {
    disclaimer: "Datos ficticios · Acciones simuladas",
    internalName: "Consultorio",
    scenarioName: "Una jornada administrativa en NEXUS",
    shownName: "NEXUS Consultorios",
  },
  demoDataKey: "consultorio-nexus-v1",
  modules: ["dashboard", "booking", "consultations", "customers", "resources", "services", "reports", "settings"],
  navigation: [
    { href: "/consultorio/dashboard", label: "Dashboard", module: "dashboard" },
    { href: "/consultorio/agenda", label: "Agenda", module: "booking" },
    { href: "/consultorio/consultas", label: "Consultas", module: "consultations" },
    { href: "/consultorio/pacientes", label: "Pacientes", module: "customers" },
    { href: "/consultorio/profesionales", label: "Profesionales", module: "resources" },
    { href: "/consultorio/servicios", label: "Servicios", module: "services" },
    { href: "/consultorio/reportes", label: "Reportes", module: "reports" },
    { href: "/consultorio/configuracion", label: "Configuración", module: "settings" },
  ],
  terminology: {
    booking: "Turno", bookings: "Turnos", customer: "Paciente", customers: "Pacientes",
    resource: "Profesional", resources: "Profesionales", service: "Consulta", services: "Consultas",
  },
  theme: {
    accentColor: "#347b78", backgroundColor: "#f3f5f1", foregroundColor: "#263432", logoText: "NX",
    mutedColor: "#71817e", sidebarColor: "#263836", surfaceColor: "#fffefb",
  },
} as const);

export type ConsultorioConfiguration = typeof consultorioVertical.configuration;
