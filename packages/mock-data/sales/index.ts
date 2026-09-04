import type {
  Activity,
  Contact,
  Opportunity,
  Pipeline,
  Task,
} from "@software-factory/crm-core";
export interface Company {
  readonly id: string;
  readonly name: string;
  readonly industry: string;
  readonly size: string;
  readonly website: string;
  readonly ownerId: string;
  readonly status: "Activa" | "Prospecto";
}
export interface SalesProfile {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
}
export const sellers: SalesProfile[] = [
  { id: "u1", name: "Santiago Luna", role: "Sales Manager", initials: "SL" },
  {
    id: "u2",
    name: "Camila Torres",
    role: "Account Executive",
    initials: "CT",
  },
  {
    id: "u3",
    name: "Nicolás Vega",
    role: "Business Development",
    initials: "NV",
  },
];
const companyNames = [
  ["Grupo Horizonte", "Servicios"],
  ["Logística Central", "Logística"],
  ["Nexo Consulting", "Consultoría"],
  ["Altura Hotels", "Hospitality"],
  ["Vertex Industrial", "Industria"],
  ["Órbita Media", "Marketing"],
  ["Central Supply", "Distribución"],
  ["Delta Services", "Servicios"],
];
export const companies: Company[] = companyNames.map((x, i) => ({
  id: `co${i + 1}`,
  name: x[0]!,
  industry: x[1]!,
  size: ["51–200", "201–500", "11–50"][i % 3]!,
  website: `www.${x[0]!
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "")}.com`,
  ownerId: `u${(i % 3) + 1}`,
  status: i < 3 ? "Activa" : "Prospecto",
}));
const names = [
  "Laura Méndez",
  "Mateo Ríos",
  "Ana Beltrán",
  "Juan Silva",
  "Marina Costa",
  "Felipe Ortiz",
  "Sofía Vidal",
  "Diego Torres",
  "Paula Luna",
  "Tomás Ferrer",
  "Clara Molina",
  "Andrés Paz",
  "Julieta Vega",
  "Bruno Castro",
];
export const contacts: Contact[] = names.map((name, i) => ({
  id: `sc${i + 1}`,
  name,
  email: `${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(" ", ".")}@empresa.com`,
  phone: `+54 11 4800 ${2200 + i}`,
  metadata: {
    companyId: `co${(i % 8) + 1}`,
    role: [
      "Directora de Operaciones",
      "Gerente Comercial",
      "CEO",
      "Head of Growth",
    ][i % 4],
    source: ["LinkedIn", "Web", "Referido", "Outbound", "Evento", "Email"][
      i % 6
    ],
  },
}));
export const pipeline: Pipeline = {
  id: "b2b",
  name: "Ventas B2B",
  stages: [
    "Nuevo",
    "Contactado",
    "Calificado",
    "Demo / Reunión",
    "Propuesta",
    "Negociación",
    "Ganado",
  ].map((label, order) => ({ id: `vs${order + 1}`, label, order })),
};
const titles = [
  "Software de operaciones",
  "Automatización comercial",
  "Optimización logística",
  "Consultoría de procesos",
  "Plataforma de gestión",
  "Integración de canales",
  "Programa enterprise",
  "Servicios administrados",
];
export const opportunities: Opportunity[] = Array.from(
  { length: 14 },
  (_, i) => ({
    id: `so${i + 1}`,
    contactId: `sc${i + 1}`,
    pipelineId: "b2b",
    stageId: `vs${(i % 7) + 1}`,
    title: titles[i % 8]!,
    value: 18000 + (i % 6) * 8000,
    ownerId: `u${(i % 3) + 1}`,
    status: i % 7 === 6 ? "won" : "open",
    createdAt: `2026-08-${18 + i}`,
    metadata: {
      companyId: `co${(i % 8) + 1}`,
      risk: i === 1 || i === 4 || i === 9,
    },
  }),
);
export const tasks: Task[] = Array.from({ length: 12 }, (_, i) => ({
  id: `st${i + 1}`,
  opportunityId: `so${(i % 12) + 1}`,
  contactId: `sc${(i % 12) + 1}`,
  title: [
    "Follow-up propuesta",
    "Preparar demo",
    "Enviar caso de éxito",
    "Llamar al contacto",
  ][i % 4]!,
  dueAt: `2026-09-${String(7 + Math.floor(i / 3)).padStart(2, "0")}T${10 + (i % 6)}:00:00`,
  ownerId: `u${(i % 3) + 1}`,
  status: i === 3 ? "completed" : "open",
}));
export const activities: Activity[] = Array.from({ length: 12 }, (_, i) => ({
  id: `sa${i + 1}`,
  contactId: `sc${(i % 12) + 1}`,
  opportunityId: `so${(i % 12) + 1}`,
  type: ["meeting", "call", "email", "note", "message"][
    i % 5
  ] as Activity["type"],
  occurredAt: `2026-09-${String(8-Math.floor(i/4)).padStart(2,"0")}T${String(15-(i%5)).padStart(2,"0")}:30:00`,
  summary: [
    "Demo realizada",
    "Llamada comercial",
    "Propuesta enviada",
    "Nota agregada",
    "Mensaje enviado",
  ][i % 5]!,
  ownerId: `u${(i % 3) + 1}`,
}));
export const salesMetrics = {
  pipeline: 486000,
  opportunities: 34,
  closing: 7,
  todayTasks: 11,
  conversion: 24,
  revenueWon: 184000,
} as const;
