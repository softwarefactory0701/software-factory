export type ProgramitaIntent = "stock" | "turnos" | "reservas" | "clientes" | "ventas" | "tienda";

export const intentions: ReadonlyArray<{ id: ProgramitaIntent; label: string }> = [
  { id: "stock", label: "Stock" }, { id: "reservas", label: "Reservas" },
  { id: "turnos", label: "Turnos" }, { id: "clientes", label: "Clientes" },
  { id: "ventas", label: "Ventas" }, { id: "tienda", label: "Ecommerce" },
];

export const programitas = [
  { id: "stock", name: "Programita Stock", features: "Inventario · Compras · Proveedores", copy: "Para saber qué tenés, dónde está y qué hace falta.", demo: "PULSE", path: "/stock/dashboard", image: "/products/pulse.png", status: "Consultar" },
  { id: "turnos", name: "Programita Turnos", features: "Agenda · Clientes · Servicios", copy: "Para ordenar el día sin vivir pendiente del teléfono.", demo: "AURA", path: "/beauty/dashboard", image: "/products/aura.png", status: "Consultar" },
  { id: "reservas", name: "Programita Reservas", features: "Disponibilidad · Reservas · Clientes", copy: "Para recibir reservas y tener cada horario bajo control.", demo: "NEXUS", path: "/consultorio/dashboard", image: "/products/nexus.png", status: "Próximamente" },
  { id: "ventas", name: "Programita Ventas", features: "Leads · Pipeline · Seguimiento", copy: "Para que ninguna oportunidad termine en el olvido.", demo: "VANTAGE", path: "/sales/dashboard", image: "/products/vantage.png", status: "Consultar" },
  { id: "tienda", name: "Programita Tienda", features: "Productos · Ecommerce · Pedidos", copy: "Para vender y organizar el catálogo desde un mismo lugar.", demo: "PARTX", path: "/autoparts/dashboard", image: "/products/partx.png", status: "Próximamente" },
  { id: "clientes", name: "Programita Clientes", features: "CRM · Fidelización · Comunicación", copy: "Para conocer a tus clientes y saber cuál es el próximo paso.", demo: "NOVA", path: "/inmobiliaria/dashboard", image: "/products/nova.png", status: "Consultar" },
] as const;

export const demos = [
  { brand: "AURA", label: "Belleza", path: "/beauty/dashboard" }, { brand: "TORQUE", label: "Taller", path: "/taller/dashboard" },
  { brand: "NEXUS", label: "Consultorios", path: "/consultorio/dashboard" }, { brand: "PULSE", label: "Inventario", path: "/stock/dashboard" },
  { brand: "PARTX", label: "Autopartes", path: "/autoparts/dashboard" }, { brand: "NOVA", label: "Inmobiliaria", path: "/inmobiliaria/dashboard" },
  { brand: "VANTAGE", label: "Ventas B2B", path: "/sales/dashboard" }, { brand: "COVERA", label: "Seguros", path: "/insurance/dashboard" },
] as const;

export function demoHref(path: string) {
  const base = process.env.NEXT_PUBLIC_DEMOS_BASE_URL;
  return base ? `${base.replace(/\/$/, "")}${path}` : path;
}
