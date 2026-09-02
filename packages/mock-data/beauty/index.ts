import type { BookingStatus } from "@software-factory/booking-core";
import { defineMockScenario } from "../src/index";

export interface BeautyProfessional {
  readonly avatar: string;
  readonly id: string;
  readonly name: string;
  readonly occupation: number;
  readonly revenue: number;
  readonly role: string;
  readonly services: readonly string[];
  readonly weeklyBookings: number;
}

export interface BeautyService {
  readonly active: boolean;
  readonly category: "Color" | "Cabello" | "Manos";
  readonly durationMinutes: number;
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly professionalIds: readonly string[];
}

export interface BeautyClient {
  readonly avatar: string;
  readonly id: string;
  readonly lastVisit: string;
  readonly name: string;
  readonly nextVisit: string | null;
  readonly notes: string;
  readonly phone: string;
  readonly primaryProfessionalId: string;
  readonly services: readonly string[];
  readonly totalSpend: number;
  readonly visits: number;
}

export interface BeautyAppointment {
  readonly clientId: string;
  readonly endTime: string;
  readonly id: string;
  readonly professionalId: string;
  readonly serviceId: string;
  readonly slotSpan: number;
  readonly startSlot: number;
  readonly startTime: string;
  readonly status: BookingStatus;
}

export const beautyProfessionals = [
  {
    avatar: "ML",
    id: "martina-lopez",
    name: "Martina López",
    occupation: 92,
    revenue: 21640,
    role: "Colorista",
    services: ["Balayage Premium", "Color Completo", "Corte + Brushing"],
    weeklyBookings: 28,
  },
  {
    avatar: "JR",
    id: "julieta-ramos",
    name: "Julieta Ramos",
    occupation: 86,
    revenue: 14200,
    role: "Nail Artist",
    services: ["Manicure Semipermanente", "Kapping", "Nail Art"],
    weeklyBookings: 34,
  },
  {
    avatar: "AP",
    id: "agustina-perez",
    name: "Agustina Pérez",
    occupation: 81,
    revenue: 17350,
    role: "Stylist",
    services: ["Corte + Brushing", "Color Completo"],
    weeklyBookings: 25,
  },
] as const satisfies readonly BeautyProfessional[];

export const beautyServices = [
  { active: true, category: "Color", durationMinutes: 120, id: "balayage-premium", name: "Balayage Premium", price: 2400, professionalIds: ["martina-lopez"] },
  { active: true, category: "Cabello", durationMinutes: 60, id: "corte-brushing", name: "Corte + Brushing", price: 850, professionalIds: ["martina-lopez", "agustina-perez"] },
  { active: true, category: "Manos", durationMinutes: 60, id: "manicure-semi", name: "Manicure Semipermanente", price: 700, professionalIds: ["julieta-ramos"] },
  { active: true, category: "Color", durationMinutes: 90, id: "color-completo", name: "Color Completo", price: 1800, professionalIds: ["martina-lopez", "agustina-perez"] },
  { active: true, category: "Manos", durationMinutes: 75, id: "kapping", name: "Kapping", price: 900, professionalIds: ["julieta-ramos"] },
  { active: false, category: "Manos", durationMinutes: 60, id: "nail-art", name: "Nail Art", price: 800, professionalIds: ["julieta-ramos"] },
] as const satisfies readonly BeautyService[];

export const beautyClients = [
  { avatar: "SM", id: "sofia-martinez", lastVisit: "22 ago 2026", name: "Sofía Martínez", nextVisit: "8 sep · 10:00", notes: "Prefiere tonos cálidos. Fórmula guardada en su ficha visual.", phone: "+54 11 5555-0101", primaryProfessionalId: "martina-lopez", services: ["Balayage Premium", "Corte + Brushing"], totalSpend: 12650, visits: 9 },
  { avatar: "CR", id: "camila-ruiz", lastVisit: "26 ago 2026", name: "Camila Ruiz", nextVisit: "8 sep · 11:30", notes: "Le gustan los acabados naturales y citas al mediodía.", phone: "+54 11 5555-0102", primaryProfessionalId: "julieta-ramos", services: ["Manicure Semipermanente", "Nail Art"], totalSpend: 5600, visits: 7 },
  { avatar: "AT", id: "ana-torres", lastVisit: "1 sep 2026", name: "Ana Torres", nextVisit: "8 sep · 13:00", notes: "Cabello fino. Evitar productos con fragancia intensa.", phone: "+54 11 5555-0103", primaryProfessionalId: "martina-lopez", services: ["Corte + Brushing"], totalSpend: 4250, visits: 5 },
  { avatar: "VD", id: "valentina-diaz", lastVisit: "18 ago 2026", name: "Valentina Díaz", nextVisit: "8 sep · 15:30", notes: "Color 6.35. Realizar prueba de mechón antes del servicio.", phone: "+54 11 5555-0104", primaryProfessionalId: "agustina-perez", services: ["Color Completo"], totalSpend: 10800, visits: 8 },
  { avatar: "LM", id: "lucia-mendez", lastVisit: "30 ago 2026", name: "Lucía Méndez", nextVisit: "8 sep · 09:00", notes: "Prefiere forma almendrada y tonos nude.", phone: "+54 11 5555-0105", primaryProfessionalId: "julieta-ramos", services: ["Kapping", "Nail Art"], totalSpend: 7200, visits: 10 },
  { avatar: "ER", id: "emilia-rojas", lastVisit: "14 ago 2026", name: "Emilia Rojas", nextVisit: "8 sep · 12:00", notes: "Primera visita de color. Referencia visual adjunta en producción.", phone: "+54 11 5555-0106", primaryProfessionalId: "agustina-perez", services: ["Color Completo"], totalSpend: 1800, visits: 1 },
  { avatar: "PB", id: "paula-benitez", lastVisit: "28 ago 2026", name: "Paula Benítez", nextVisit: null, notes: "Suele reservar los viernes por la tarde.", phone: "+54 11 5555-0107", primaryProfessionalId: "martina-lopez", services: ["Corte + Brushing", "Color Completo"], totalSpend: 9350, visits: 11 },
  { avatar: "JF", id: "juliana-ferreyra", lastVisit: "3 sep 2026", name: "Juliana Ferreyra", nextVisit: "8 sep · 17:00", notes: "Cliente recurrente. Confirmar diseño de nail art al llegar.", phone: "+54 11 5555-0108", primaryProfessionalId: "julieta-ramos", services: ["Manicure Semipermanente", "Nail Art"], totalSpend: 8800, visits: 12 },
] as const satisfies readonly BeautyClient[];

export const beautyAppointments = [
  { clientId: "paula-benitez", endTime: "10:00", id: "turno-10", professionalId: "martina-lopez", serviceId: "corte-brushing", slotSpan: 2, startSlot: 0, startTime: "09:00", status: "completed" },
  { clientId: "sofia-martinez", endTime: "12:00", id: "turno-01", professionalId: "martina-lopez", serviceId: "balayage-premium", slotSpan: 4, startSlot: 2, startTime: "10:00", status: "in-service" },
  { clientId: "ana-torres", endTime: "14:00", id: "turno-02", professionalId: "martina-lopez", serviceId: "corte-brushing", slotSpan: 2, startSlot: 8, startTime: "13:00", status: "confirmed" },
  { clientId: "valentina-diaz", endTime: "15:30", id: "turno-11", professionalId: "martina-lopez", serviceId: "corte-brushing", slotSpan: 2, startSlot: 11, startTime: "14:30", status: "confirmed" },
  { clientId: "paula-benitez", endTime: "17:30", id: "turno-03", professionalId: "martina-lopez", serviceId: "color-completo", slotSpan: 3, startSlot: 14, startTime: "16:00", status: "pending" },
  { clientId: "lucia-mendez", endTime: "10:15", id: "turno-04", professionalId: "julieta-ramos", serviceId: "kapping", slotSpan: 2.5, startSlot: 0, startTime: "09:00", status: "completed" },
  { clientId: "camila-ruiz", endTime: "12:30", id: "turno-05", professionalId: "julieta-ramos", serviceId: "manicure-semi", slotSpan: 2, startSlot: 5, startTime: "11:30", status: "confirmed" },
  { clientId: "ana-torres", endTime: "14:30", id: "turno-12", professionalId: "julieta-ramos", serviceId: "manicure-semi", slotSpan: 2, startSlot: 9, startTime: "13:30", status: "pending" },
  { clientId: "lucia-mendez", endTime: "16:15", id: "turno-13", professionalId: "julieta-ramos", serviceId: "kapping", slotSpan: 2.5, startSlot: 12, startTime: "15:00", status: "confirmed" },
  { clientId: "juliana-ferreyra", endTime: "18:00", id: "turno-06", professionalId: "julieta-ramos", serviceId: "nail-art", slotSpan: 2, startSlot: 16, startTime: "17:00", status: "confirmed" },
  { clientId: "camila-ruiz", endTime: "10:30", id: "turno-14", professionalId: "agustina-perez", serviceId: "corte-brushing", slotSpan: 2, startSlot: 1, startTime: "09:30", status: "completed" },
  { clientId: "emilia-rojas", endTime: "13:30", id: "turno-07", professionalId: "agustina-perez", serviceId: "color-completo", slotSpan: 3, startSlot: 6, startTime: "12:00", status: "in-service" },
  { clientId: "valentina-diaz", endTime: "17:00", id: "turno-08", professionalId: "agustina-perez", serviceId: "color-completo", slotSpan: 3, startSlot: 13, startTime: "15:30", status: "confirmed" },
  { clientId: "sofia-martinez", endTime: "19:00", id: "turno-09", professionalId: "agustina-perez", serviceId: "corte-brushing", slotSpan: 2, startSlot: 18, startTime: "18:00", status: "cancelled" },
] as const satisfies readonly BeautyAppointment[];

export const beautyDashboard = {
  kpis: [
    { change: "+3 vs. martes anterior", icon: "calendar", label: "Turnos de hoy", value: "14" },
    { change: "82% ya confirmado", icon: "revenue", label: "Facturación prevista", value: "$18.450" },
    { change: "+5% esta semana", icon: "spark", label: "Ocupación", value: "87%" },
    { change: "4 llegaron por recomendación", icon: "users", label: "Clientes nuevos", value: "6" },
  ],
  salonStatus: [
    { client: "Sofía Martínez", detail: "Balayage Premium", professionalId: "martina-lopez", status: "En servicio", tone: "info" },
    { client: null, detail: "Disponible hasta 11:30", professionalId: "julieta-ramos", status: "Disponible", tone: "success" },
    { client: "Emilia Rojas", detail: "Color Completo", professionalId: "agustina-perez", status: "En servicio", tone: "info" },
  ],
  servicePerformance: [
    { bookings: 18, name: "Balayage Premium", percentage: 88 },
    { bookings: 15, name: "Manicure Semi", percentage: 74 },
    { bookings: 12, name: "Corte + Brushing", percentage: 59 },
    { bookings: 9, name: "Color Completo", percentage: 44 },
  ],
  weeklyActivity: [
    { appointments: 10, day: "Lun", revenue: 12400 },
    { appointments: 14, day: "Mar", revenue: 18450 },
    { appointments: 12, day: "Mié", revenue: 15100 },
    { appointments: 16, day: "Jue", revenue: 21000 },
    { appointments: 18, day: "Vie", revenue: 23800 },
    { appointments: 15, day: "Sáb", revenue: 19600 },
  ],
} as const;

export const beautyReports = {
  cancellationRate: 4.8,
  monthlyRevenue: [
    { label: "Abr", value: 242000 },
    { label: "May", value: 268000 },
    { label: "Jun", value: 251000 },
    { label: "Jul", value: 294000 },
    { label: "Ago", value: 318000 },
    { label: "Sep", value: 336000 },
  ],
  recurringCustomers: 68,
  totalCustomers: 186,
} as const;

export const beautyMockDataset = defineMockScenario({
  appointments: beautyAppointments,
  clients: beautyClients,
  dashboard: beautyDashboard,
  professionals: beautyProfessionals,
  reports: beautyReports,
  scenarioDate: "2026-09-08",
  services: beautyServices,
});
