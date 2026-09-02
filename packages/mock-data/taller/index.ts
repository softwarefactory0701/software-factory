import { defineBookingScenario } from "@software-factory/booking-core/scenario";
import type { Booking } from "@software-factory/booking-core/types";
import { defineMockScenario } from "../src/index";

export type WorkOrderStatus = "received" | "diagnosis" | "in_progress" | "waiting_parts" | "ready" | "delivered";

export interface ServiceHistory {
  readonly date: string;
  readonly description: string;
  readonly mileage: number;
  readonly orderId: string;
}

export interface Vehicle {
  readonly clientId: string;
  readonly history: readonly ServiceHistory[];
  readonly id: string;
  readonly lastVisit: string;
  readonly mileage: number;
  readonly model: string;
  readonly nextMaintenance: string;
  readonly plate: string;
  readonly status: "scheduled" | "in_shop" | "ready" | "inactive";
  readonly year: number;
}

export interface WorkOrder {
  readonly clientId: string;
  readonly date: string;
  readonly estimate: number;
  readonly id: string;
  readonly mechanicId: string;
  readonly mileage: number;
  readonly number: number;
  readonly serviceIds: readonly string[];
  readonly status: WorkOrderStatus;
  readonly vehicleId: string;
}

export interface TallerMechanic {
  readonly avatar: string;
  readonly id: string;
  readonly name: string;
  readonly occupation: number;
  readonly revenue: number;
  readonly role: string;
  readonly specialties: readonly string[];
  readonly vehiclesAssigned: number;
  readonly weeklyJobs: number;
}

export interface TallerService {
  readonly active: boolean;
  readonly category: "Mantenimiento" | "Diagnóstico" | "Tren delantero";
  readonly durationMinutes: number;
  readonly id: string;
  readonly mechanicIds: readonly string[];
  readonly name: string;
  readonly price: number;
}

export interface TallerClient {
  readonly id: string;
  readonly lastVisit: string;
  readonly name: string;
  readonly nextBooking: string | null;
  readonly phone: string;
  readonly totalSpend: number;
  readonly visits: number;
}

export type TallerAppointment = Booking & {
  readonly mileage: number;
  readonly orderId?: string;
  readonly vehicleId: string;
};

export const tallerMechanics = [
  { avatar: "JT", id: "juan-torres", name: "Juan Torres", occupation: 88, revenue: 64200, role: "Mecánica general", specialties: ["Motor", "Mantenimiento", "Frenos"], vehiclesAssigned: 3, weeklyJobs: 19 },
  { avatar: "MD", id: "marcelo-diaz", name: "Marcelo Díaz", occupation: 76, revenue: 58400, role: "Diagnóstico y electricidad", specialties: ["Diagnóstico", "Electricidad", "Inyección"], vehiclesAssigned: 2, weeklyJobs: 15 },
  { avatar: "NR", id: "nicolas-romero", name: "Nicolás Romero", occupation: 82, revenue: 61900, role: "Suspensión y frenos", specialties: ["Suspensión", "Frenos", "Alineación"], vehiclesAssigned: 2, weeklyJobs: 17 },
] as const satisfies readonly TallerMechanic[];

export const tallerServices = [
  { active: true, category: "Mantenimiento", durationMinutes: 60, id: "cambio-aceite", mechanicIds: ["juan-torres"], name: "Cambio de aceite", price: 8500 },
  { active: true, category: "Mantenimiento", durationMinutes: 120, id: "service-completo", mechanicIds: ["juan-torres", "marcelo-diaz"], name: "Service completo", price: 18500 },
  { active: true, category: "Tren delantero", durationMinutes: 90, id: "frenos", mechanicIds: ["juan-torres", "nicolas-romero"], name: "Frenos", price: 12000 },
  { active: true, category: "Tren delantero", durationMinutes: 60, id: "alineacion", mechanicIds: ["nicolas-romero"], name: "Alineación", price: 6800 },
  { active: true, category: "Diagnóstico", durationMinutes: 90, id: "diagnostico", mechanicIds: ["marcelo-diaz"], name: "Diagnóstico electrónico", price: 9800 },
  { active: true, category: "Tren delantero", durationMinutes: 120, id: "suspension", mechanicIds: ["nicolas-romero"], name: "Suspensión", price: 16000 },
] as const satisfies readonly TallerService[];

export const tallerClients = [
  { id: "martin-suarez", lastVisit: "4 sep 2026", name: "Martín Suárez", nextBooking: "8 sep · 08:30", phone: "+54 11 5555-1201", totalSpend: 84600, visits: 8 },
  { id: "carolina-vega", lastVisit: "28 ago 2026", name: "Carolina Vega", nextBooking: "8 sep · 09:00", phone: "+54 11 5555-1202", totalSpend: 57200, visits: 6 },
  { id: "diego-sosa", lastVisit: "16 jun 2026", name: "Diego Sosa", nextBooking: "8 sep · 10:30", phone: "+54 11 5555-1203", totalSpend: 49300, visits: 5 },
  { id: "laura-mendez", lastVisit: "2 sep 2026", name: "Laura Méndez", nextBooking: "8 sep · 12:00", phone: "+54 11 5555-1204", totalSpend: 68100, visits: 7 },
  { id: "federico-rojas", lastVisit: "19 ago 2026", name: "Federico Rojas", nextBooking: "8 sep · 14:00", phone: "+54 11 5555-1205", totalSpend: 41500, visits: 4 },
  { id: "valeria-ortiz", lastVisit: "31 ago 2026", name: "Valeria Ortiz", nextBooking: "8 sep · 15:30", phone: "+54 11 5555-1206", totalSpend: 36200, visits: 3 },
  { id: "pablo-acosta", lastVisit: "7 sep 2026", name: "Pablo Acosta", nextBooking: "8 sep · 16:00", phone: "+54 11 5555-1207", totalSpend: 75400, visits: 9 },
  { id: "sofia-castro", lastVisit: "11 ago 2026", name: "Sofía Castro", nextBooking: "8 sep · 17:00", phone: "+54 11 5555-1208", totalSpend: 22900, visits: 2 },
] as const satisfies readonly TallerClient[];

export const tallerVehicles = [
  { clientId: "martin-suarez", history: [{ date: "04/09/26", description: "Frenos", mileage: 68120, orderId: "ot-1034" }, { date: "16/06/26", description: "Service", mileage: 62200, orderId: "ot-988" }, { date: "11/02/26", description: "Alineación", mileage: 54700, orderId: "ot-901" }], id: "bmw-m340i", lastVisit: "4 sep 2026", mileage: 68450, model: "BMW M340i", nextMaintenance: "80.000 km", plate: "AA 123 BB", status: "in_shop", year: 2022 },
  { clientId: "carolina-vega", history: [{ date: "28/08/26", description: "Diagnóstico", mileage: 91200, orderId: "ot-1029" }], id: "ford-ranger", lastVisit: "28 ago 2026", mileage: 92310, model: "Ford Ranger", nextMaintenance: "100.000 km", plate: "AB 456 CD", status: "in_shop", year: 2021 },
  { clientId: "diego-sosa", history: [{ date: "16/06/26", description: "Service completo", mileage: 44800, orderId: "ot-989" }], id: "audi-a3", lastVisit: "16 jun 2026", mileage: 48620, model: "Audi A3", nextMaintenance: "60.000 km", plate: "AC 789 EF", status: "ready", year: 2020 },
  { clientId: "laura-mendez", history: [{ date: "02/09/26", description: "Cambio de aceite", mileage: 35800, orderId: "ot-1040" }], id: "toyota-hilux", lastVisit: "2 sep 2026", mileage: 36440, model: "Toyota Hilux", nextMaintenance: "45.000 km", plate: "AD 321 GH", status: "in_shop", year: 2023 },
  { clientId: "federico-rojas", history: [{ date: "19/08/26", description: "Suspensión", mileage: 77500, orderId: "ot-1018" }], id: "golf-gti", lastVisit: "19 ago 2026", mileage: 78990, model: "Volkswagen Golf GTI", nextMaintenance: "90.000 km", plate: "AE 654 JK", status: "scheduled", year: 2019 },
  { clientId: "valeria-ortiz", history: [{ date: "31/08/26", description: "Alineación", mileage: 52100, orderId: "ot-1031" }], id: "honda-hrv", lastVisit: "31 ago 2026", mileage: 52780, model: "Honda HR-V", nextMaintenance: "60.000 km", plate: "AF 908 LM", status: "scheduled", year: 2021 },
  { clientId: "pablo-acosta", history: [{ date: "07/09/26", description: "Frenos", mileage: 110400, orderId: "ot-1046" }], id: "chevrolet-cruze", lastVisit: "7 sep 2026", mileage: 110850, model: "Chevrolet Cruze", nextMaintenance: "120.000 km", plate: "AG 147 NP", status: "in_shop", year: 2018 },
  { clientId: "sofia-castro", history: [{ date: "11/08/26", description: "Service", mileage: 24600, orderId: "ot-1007" }], id: "peugeot-208", lastVisit: "11 ago 2026", mileage: 25800, model: "Peugeot 208", nextMaintenance: "35.000 km", plate: "AH 258 QR", status: "scheduled", year: 2024 },
] as const satisfies readonly Vehicle[];

export const tallerWorkOrders = [
  { clientId: "martin-suarez", date: "08/09/26", estimate: 18500, id: "ot-1048", mechanicId: "juan-torres", mileage: 68450, number: 1048, serviceIds: ["cambio-aceite", "frenos", "diagnostico"], status: "in_progress", vehicleId: "bmw-m340i" },
  { clientId: "carolina-vega", date: "08/09/26", estimate: 9800, id: "ot-1049", mechanicId: "marcelo-diaz", mileage: 92310, number: 1049, serviceIds: ["diagnostico"], status: "waiting_parts", vehicleId: "ford-ranger" },
  { clientId: "diego-sosa", date: "08/09/26", estimate: 18500, id: "ot-1050", mechanicId: "juan-torres", mileage: 48620, number: 1050, serviceIds: ["service-completo"], status: "ready", vehicleId: "audi-a3" },
  { clientId: "laura-mendez", date: "08/09/26", estimate: 8500, id: "ot-1051", mechanicId: "juan-torres", mileage: 36440, number: 1051, serviceIds: ["cambio-aceite"], status: "diagnosis", vehicleId: "toyota-hilux" },
  { clientId: "federico-rojas", date: "08/09/26", estimate: 16000, id: "ot-1052", mechanicId: "nicolas-romero", mileage: 78990, number: 1052, serviceIds: ["suspension"], status: "received", vehicleId: "golf-gti" },
  { clientId: "valeria-ortiz", date: "08/09/26", estimate: 6800, id: "ot-1053", mechanicId: "nicolas-romero", mileage: 52780, number: 1053, serviceIds: ["alineacion"], status: "received", vehicleId: "honda-hrv" },
  { clientId: "pablo-acosta", date: "08/09/26", estimate: 12000, id: "ot-1054", mechanicId: "nicolas-romero", mileage: 110850, number: 1054, serviceIds: ["frenos"], status: "in_progress", vehicleId: "chevrolet-cruze" },
  { clientId: "sofia-castro", date: "08/09/26", estimate: 18500, id: "ot-1055", mechanicId: "marcelo-diaz", mileage: 25800, number: 1055, serviceIds: ["service-completo"], status: "received", vehicleId: "peugeot-208" },
] as const satisfies readonly WorkOrder[];

export const tallerAppointments = [
  { customerId: "martin-suarez", end: "2026-09-08T10:00:00", id: "turno-t01", mileage: 68450, orderId: "ot-1048", resourceId: "juan-torres", serviceId: "frenos", start: "2026-09-08T08:30:00", status: "in_progress", vehicleId: "bmw-m340i" },
  { customerId: "diego-sosa", end: "2026-09-08T12:30:00", id: "turno-t02", mileage: 48620, orderId: "ot-1050", resourceId: "juan-torres", serviceId: "service-completo", start: "2026-09-08T10:30:00", status: "completed", vehicleId: "audi-a3" },
  { customerId: "laura-mendez", end: "2026-09-08T13:00:00", id: "turno-t03", mileage: 36440, orderId: "ot-1051", resourceId: "juan-torres", serviceId: "cambio-aceite", start: "2026-09-08T12:00:00", status: "confirmed", vehicleId: "toyota-hilux" },
  { customerId: "carolina-vega", end: "2026-09-08T10:30:00", id: "turno-t04", mileage: 92310, orderId: "ot-1049", resourceId: "marcelo-diaz", serviceId: "diagnostico", start: "2026-09-08T09:00:00", status: "pending", vehicleId: "ford-ranger" },
  { customerId: "sofia-castro", end: "2026-09-08T14:00:00", id: "turno-t05", mileage: 25800, orderId: "ot-1055", resourceId: "marcelo-diaz", serviceId: "service-completo", start: "2026-09-08T12:00:00", status: "confirmed", vehicleId: "peugeot-208" },
  { customerId: "federico-rojas", end: "2026-09-08T16:00:00", id: "turno-t06", mileage: 78990, orderId: "ot-1052", resourceId: "nicolas-romero", serviceId: "suspension", start: "2026-09-08T14:00:00", status: "confirmed", vehicleId: "golf-gti" },
  { customerId: "valeria-ortiz", end: "2026-09-08T16:30:00", id: "turno-t07", mileage: 52780, orderId: "ot-1053", resourceId: "nicolas-romero", serviceId: "alineacion", start: "2026-09-08T15:30:00", status: "confirmed", vehicleId: "honda-hrv" },
  { customerId: "pablo-acosta", end: "2026-09-08T17:30:00", id: "turno-t08", mileage: 110850, orderId: "ot-1054", resourceId: "nicolas-romero", serviceId: "frenos", start: "2026-09-08T16:00:00", status: "in_progress", vehicleId: "chevrolet-cruze" },
] as const satisfies readonly TallerAppointment[];

export const tallerBookingScenario = defineBookingScenario({
  bookings: tallerAppointments,
  customers: tallerClients,
  id: "taller-torque-2026-09-08",
  resources: tallerMechanics,
  schedule: { date: "2026-09-08", endTime: "19:00", resourceIds: tallerMechanics.map((item) => item.id), slotMinutes: 30, startTime: "08:00" },
  services: tallerServices,
});

export const tallerDashboard = {
  kpis: [
    { detail: "4 ingresos antes de las 10:00", label: "Vehículos hoy", value: "12" },
    { detail: "58% de capacidad operativa", label: "En taller", value: "7" },
    { detail: "Entrega prevista antes de las 18:00", label: "Listos para entregar", value: "3" },
    { detail: "Estimado sobre órdenes abiertas", label: "Facturación prevista", value: "$48.700" },
  ],
  services: [{ name: "Service completo", value: 84 }, { name: "Frenos", value: 71 }, { name: "Diagnóstico", value: 59 }, { name: "Cambio de aceite", value: 52 }],
  weekly: [{ day: "Lun", jobs: 9 }, { day: "Mar", jobs: 12 }, { day: "Mié", jobs: 10 }, { day: "Jue", jobs: 14 }, { day: "Vie", jobs: 13 }, { day: "Sáb", jobs: 7 }],
} as const;

export const tallerReports = {
  monthlyRevenue: 914000,
  averageTicket: 14750,
  completedJobs: 62,
  recurringVehicles: 71,
} as const;

export const tallerMockDataset = defineMockScenario({
  appointments: tallerAppointments, bookingScenario: tallerBookingScenario, clients: tallerClients,
  dashboard: tallerDashboard, mechanics: tallerMechanics, orders: tallerWorkOrders, reports: tallerReports,
  scenarioDate: "2026-09-08", services: tallerServices, vehicles: tallerVehicles,
});
