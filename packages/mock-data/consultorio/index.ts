import { defineBookingScenario } from "@software-factory/booking-core/scenario";
import type { Booking } from "@software-factory/booking-core/types";
import { defineMockScenario } from "../src/index";

export type ConsultationStatus = "confirmed" | "waiting" | "in_session" | "completed" | "cancelled";
export type AttendanceStatus = "attended" | "scheduled" | "cancelled";

export interface AdministrativeNote { readonly id: string; readonly text: string; }
export interface AdministrativeHistory { readonly attendance: AttendanceStatus; readonly date: string; readonly professionalId: string; readonly serviceId: string; }

export interface NexusPatient {
  readonly email: string; readonly habitualProfessionalId: string; readonly history: readonly AdministrativeHistory[];
  readonly id: string; readonly lastVisit: string; readonly name: string; readonly nextVisit: string | null;
  readonly note: AdministrativeNote; readonly phone: string; readonly totalConsultations: number; readonly totalSpend: number;
}

export interface NexusProfessional {
  readonly avatar: string; readonly availableHours: string; readonly id: string; readonly name: string;
  readonly occupation: number; readonly patientsSeen: number; readonly principalServices: readonly string[];
  readonly role: string; readonly weeklyBookings: number;
}

export interface NexusService {
  readonly active: boolean; readonly category: "Medicina general" | "Nutrición" | "Fisioterapia";
  readonly durationMinutes: number; readonly id: string; readonly name: string; readonly price: number;
  readonly professionalIds: readonly string[];
}

export interface Consultation {
  readonly administrativeNote: string; readonly bookingId: string; readonly id: string;
  readonly nextAction: string; readonly status: ConsultationStatus;
}

export type NexusAppointment = Booking;

export const nexusProfessionals = [
  { avatar: "MR", availableHours: "15:00—17:30", id: "martin-rios", name: "Dr. Martín Ríos", occupation: 84, patientsSeen: 24, principalServices: ["Primera consulta", "Control"], role: "Medicina general", weeklyBookings: 31 },
  { avatar: "LM", availableHours: "14:30—16:00", id: "laura-mendez", name: "Dra. Laura Méndez", occupation: 78, patientsSeen: 19, principalServices: ["Consulta nutricional", "Seguimiento"], role: "Nutrición", weeklyBookings: 26 },
  { avatar: "ST", availableHours: "13:30—15:30", id: "sofia-torres", name: "Lic. Sofía Torres", occupation: 81, patientsSeen: 22, principalServices: ["Evaluación fisioterapéutica", "Sesión"], role: "Fisioterapia", weeklyBookings: 29 },
] as const satisfies readonly NexusProfessional[];

export const nexusServices = [
  { active: true, category: "Medicina general", durationMinutes: 45, id: "primera-consulta", name: "Primera consulta", price: 900, professionalIds: ["martin-rios"] },
  { active: true, category: "Medicina general", durationMinutes: 30, id: "control", name: "Control", price: 650, professionalIds: ["martin-rios"] },
  { active: true, category: "Nutrición", durationMinutes: 60, id: "consulta-nutricional", name: "Consulta nutricional", price: 1000, professionalIds: ["laura-mendez"] },
  { active: true, category: "Nutrición", durationMinutes: 30, id: "seguimiento", name: "Seguimiento", price: 650, professionalIds: ["laura-mendez"] },
  { active: true, category: "Fisioterapia", durationMinutes: 60, id: "evaluacion-fisio", name: "Evaluación fisioterapéutica", price: 950, professionalIds: ["sofia-torres"] },
  { active: true, category: "Fisioterapia", durationMinutes: 45, id: "sesion", name: "Sesión", price: 800, professionalIds: ["sofia-torres"] },
] as const satisfies readonly NexusService[];

export const nexusPatients = [
  { email: "lucia.fernandez@example.test", habitualProfessionalId: "martin-rios", history: [{ attendance: "attended", date: "22 ago 2026", professionalId: "martin-rios", serviceId: "control" }, { attendance: "attended", date: "3 jul 2026", professionalId: "martin-rios", serviceId: "primera-consulta" }], id: "lucia-fernandez", lastVisit: "22 ago 2026", name: "Lucía Fernández", nextVisit: "8 sep · 10:00", note: { id: "nota-01", text: "Prefiere turnos por la tarde." }, phone: "+54 11 5555-2101", totalConsultations: 8, totalSpend: 5900 },
  { email: "carlos.gomez@example.test", habitualProfessionalId: "laura-mendez", history: [{ attendance: "attended", date: "12 ago 2026", professionalId: "laura-mendez", serviceId: "seguimiento" }], id: "carlos-gomez", lastVisit: "12 ago 2026", name: "Carlos Gómez", nextVisit: "8 sep · 10:30", note: { id: "nota-02", text: "Solicita confirmación al momento de reservar." }, phone: "+54 11 5555-2102", totalConsultations: 5, totalSpend: 4100 },
  { email: "mariana.torres@example.test", habitualProfessionalId: "sofia-torres", history: [{ attendance: "attended", date: "29 ago 2026", professionalId: "sofia-torres", serviceId: "sesion" }], id: "mariana-torres", lastVisit: "29 ago 2026", name: "Mariana Torres", nextVisit: "8 sep · 11:15", note: { id: "nota-03", text: "Prefiere recibir opciones de horario por la mañana." }, phone: "+54 11 5555-2103", totalConsultations: 7, totalSpend: 5600 },
  { email: "andres-costa@example.test", habitualProfessionalId: "martin-rios", history: [{ attendance: "attended", date: "18 ago 2026", professionalId: "martin-rios", serviceId: "control" }], id: "andres-costa", lastVisit: "18 ago 2026", name: "Andrés Costa", nextVisit: "8 sep · 08:30", note: { id: "nota-04", text: "Prefiere el primer turno disponible." }, phone: "+54 11 5555-2104", totalConsultations: 4, totalSpend: 2850 },
  { email: "valentina-ruiz@example.test", habitualProfessionalId: "laura-mendez", history: [{ attendance: "attended", date: "25 ago 2026", professionalId: "laura-mendez", serviceId: "consulta-nutricional" }], id: "valentina-ruiz", lastVisit: "25 ago 2026", name: "Valentina Ruiz", nextVisit: "8 sep · 09:30", note: { id: "nota-05", text: "Disponibilidad habitual los martes." }, phone: "+54 11 5555-2105", totalConsultations: 6, totalSpend: 5200 },
  { email: "pablo-mendez@example.test", habitualProfessionalId: "sofia-torres", history: [{ attendance: "attended", date: "30 ago 2026", professionalId: "sofia-torres", serviceId: "sesion" }], id: "pablo-mendez", lastVisit: "30 ago 2026", name: "Pablo Méndez", nextVisit: "8 sep · 08:30", note: { id: "nota-06", text: "Prefiere turnos de 45 minutos." }, phone: "+54 11 5555-2106", totalConsultations: 9, totalSpend: 7200 },
  { email: "camila-rojas@example.test", habitualProfessionalId: "martin-rios", history: [{ attendance: "attended", date: "1 sep 2026", professionalId: "martin-rios", serviceId: "primera-consulta" }], id: "camila-rojas", lastVisit: "1 sep 2026", name: "Camila Rojas", nextVisit: "8 sep · 13:00", note: { id: "nota-07", text: "Solicita comprobante administrativo." }, phone: "+54 11 5555-2107", totalConsultations: 3, totalSpend: 2450 },
  { email: "federico-sosa@example.test", habitualProfessionalId: "laura-mendez", history: [{ attendance: "attended", date: "27 ago 2026", professionalId: "laura-mendez", serviceId: "seguimiento" }], id: "federico-sosa", lastVisit: "27 ago 2026", name: "Federico Sosa", nextVisit: "8 sep · 14:00", note: { id: "nota-08", text: "Prefiere turnos después de las 16:00." }, phone: "+54 11 5555-2108", totalConsultations: 6, totalSpend: 4550 },
  { email: "julia-acosta@example.test", habitualProfessionalId: "sofia-torres", history: [{ attendance: "cancelled", date: "20 ago 2026", professionalId: "sofia-torres", serviceId: "evaluacion-fisio" }], id: "julia-acosta", lastVisit: "6 ago 2026", name: "Julia Acosta", nextVisit: "8 sep · 14:30", note: { id: "nota-09", text: "Confirmar disponibilidad con anticipación." }, phone: "+54 11 5555-2109", totalConsultations: 2, totalSpend: 1600 },
  { email: "diego-ortiz@example.test", habitualProfessionalId: "martin-rios", history: [{ attendance: "attended", date: "14 ago 2026", professionalId: "martin-rios", serviceId: "control" }], id: "diego-ortiz", lastVisit: "14 ago 2026", name: "Diego Ortiz", nextVisit: "8 sep · 15:00", note: { id: "nota-10", text: "Prefiere contacto telefónico administrativo." }, phone: "+54 11 5555-2110", totalConsultations: 11, totalSpend: 8050 },
] as const satisfies readonly NexusPatient[];

export const nexusAppointments = [
  { customerId: "andres-costa", end: "2026-09-08T09:00:00", id: "nx-01", resourceId: "martin-rios", serviceId: "control", start: "2026-09-08T08:30:00", status: "completed" },
  { customerId: "camila-rojas", end: "2026-09-08T10:15:00", id: "nx-02", resourceId: "martin-rios", serviceId: "primera-consulta", start: "2026-09-08T09:30:00", status: "completed" },
  { customerId: "lucia-fernandez", end: "2026-09-08T11:00:00", id: "nx-03", resourceId: "martin-rios", serviceId: "control", start: "2026-09-08T10:30:00", status: "completed" },
  { customerId: "diego-ortiz", end: "2026-09-08T12:00:00", id: "nx-04", resourceId: "martin-rios", serviceId: "control", start: "2026-09-08T11:30:00", status: "in_progress" },
  { customerId: "camila-rojas", end: "2026-09-08T13:45:00", id: "nx-05", resourceId: "martin-rios", serviceId: "primera-consulta", start: "2026-09-08T13:00:00", status: "confirmed" },
  { customerId: "diego-ortiz", end: "2026-09-08T15:30:00", id: "nx-06", resourceId: "martin-rios", serviceId: "control", start: "2026-09-08T15:00:00", status: "pending" },
  { customerId: "valentina-ruiz", end: "2026-09-08T09:30:00", id: "nx-07", resourceId: "laura-mendez", serviceId: "consulta-nutricional", start: "2026-09-08T08:30:00", status: "completed" },
  { customerId: "carlos-gomez", end: "2026-09-08T10:00:00", id: "nx-08", resourceId: "laura-mendez", serviceId: "seguimiento", start: "2026-09-08T09:30:00", status: "completed" },
  { customerId: "carlos-gomez", end: "2026-09-08T11:30:00", id: "nx-09", resourceId: "laura-mendez", serviceId: "consulta-nutricional", start: "2026-09-08T10:30:00", status: "pending" },
  { customerId: "valentina-ruiz", end: "2026-09-08T12:30:00", id: "nx-10", resourceId: "laura-mendez", serviceId: "seguimiento", start: "2026-09-08T12:00:00", status: "completed" },
  { customerId: "federico-sosa", end: "2026-09-08T14:30:00", id: "nx-11", resourceId: "laura-mendez", serviceId: "seguimiento", start: "2026-09-08T14:00:00", status: "pending" },
  { customerId: "federico-sosa", end: "2026-09-08T17:00:00", id: "nx-12", resourceId: "laura-mendez", serviceId: "consulta-nutricional", start: "2026-09-08T16:00:00", status: "confirmed" },
  { customerId: "pablo-mendez", end: "2026-09-08T09:15:00", id: "nx-13", resourceId: "sofia-torres", serviceId: "sesion", start: "2026-09-08T08:30:00", status: "completed" },
  { customerId: "mariana-torres", end: "2026-09-08T10:15:00", id: "nx-14", resourceId: "sofia-torres", serviceId: "sesion", start: "2026-09-08T09:30:00", status: "completed" },
  { customerId: "mariana-torres", end: "2026-09-08T12:15:00", id: "nx-15", resourceId: "sofia-torres", serviceId: "evaluacion-fisio", start: "2026-09-08T11:15:00", status: "pending" },
  { customerId: "pablo-mendez", end: "2026-09-08T13:15:00", id: "nx-16", resourceId: "sofia-torres", serviceId: "sesion", start: "2026-09-08T12:30:00", status: "completed" },
  { customerId: "julia-acosta", end: "2026-09-08T15:30:00", id: "nx-17", resourceId: "sofia-torres", serviceId: "evaluacion-fisio", start: "2026-09-08T14:30:00", status: "pending" },
  { customerId: "julia-acosta", end: "2026-09-08T17:15:00", id: "nx-18", resourceId: "sofia-torres", serviceId: "sesion", start: "2026-09-08T16:30:00", status: "cancelled" },
] as const satisfies readonly NexusAppointment[];

function consultationStatus(status: Booking["status"]): ConsultationStatus {
  return ({ confirmed: "confirmed", pending: "waiting", in_progress: "in_session", completed: "completed", cancelled: "cancelled" } as const)[status];
}

export const nexusConsultations = nexusAppointments.map((booking, index) => ({
  administrativeNote: nexusPatients.find((item) => item.id === booking.customerId)?.note.text ?? "Sin nota administrativa.",
  bookingId: booking.id,
  id: `consulta-${String(index + 1).padStart(2, "0")}`,
  nextAction: booking.status === "completed" ? "Registrar asistencia" : booking.status === "cancelled" ? "Ofrecer nueva fecha" : booking.status === "in_progress" ? "Preparar próxima recepción" : "Confirmar llegada",
  status: consultationStatus(booking.status),
})) satisfies readonly Consultation[];

export const nexusBookingScenario = defineBookingScenario({
  bookings: nexusAppointments, customers: nexusPatients, id: "consultorio-nexus-2026-09-08", resources: nexusProfessionals,
  schedule: { date: "2026-09-08", endTime: "19:00", resourceIds: nexusProfessionals.map((item) => item.id), slotMinutes: 15, startTime: "08:00" },
  services: nexusServices,
});

export const nexusDashboard = {
  kpis: [{ label: "Turnos de hoy", value: "18", detail: "Jornada completa" }, { label: "Pacientes atendidos", value: "9", detail: "50% de la agenda" }, { label: "Pendientes", value: "6", detail: "Incluye espera y consulta" }, { label: "Ocupación", value: "82%", detail: "+4% vs. semana anterior" }],
  weeklyOccupation: [{ day: "Lun", value: 74 }, { day: "Mar", value: 82 }, { day: "Mié", value: 78 }, { day: "Jue", value: 86 }, { day: "Vie", value: 80 }, { day: "Sáb", value: 55 }],
  typeDemand: [{ name: "Control", value: 82 }, { name: "Sesión", value: 73 }, { name: "Seguimiento", value: 61 }, { name: "Primera consulta", value: 48 }],
  timeDemand: [{ label: "08—10", value: 72 }, { label: "10—12", value: 91 }, { label: "12—15", value: 64 }, { label: "15—18", value: 83 }],
} as const;

export const nexusReports = { averageOccupation: 79, cancellationRate: 5.6, monthlyConsultations: 286, recurringPatients: 67 } as const;

export const nexusMockDataset = defineMockScenario({ appointments: nexusAppointments, bookingScenario: nexusBookingScenario, consultations: nexusConsultations, dashboard: nexusDashboard, patients: nexusPatients, professionals: nexusProfessionals, reports: nexusReports, scenarioDate: "2026-09-08", services: nexusServices });
