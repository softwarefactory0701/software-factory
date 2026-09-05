export const productFamilies = [
  {id:"reservas",eyebrow:"Reservas / Operación",title:"Tu agenda, tu equipo y tus clientes. Todo en orden.",copy:"Organizá turnos, profesionales, servicios y seguimiento desde una experiencia adaptada a tu negocio.",accent:"blue",products:[{brand:"AURA",niche:"Salones de belleza",detail:"Agenda, clientes y equipo del salón."},{brand:"TORQUE",niche:"Talleres automotrices",detail:"Turnos y operación alrededor del vehículo."},{brand:"NEXUS",niche:"Consultorios",detail:"Agenda profesional y atención de pacientes."}]},
  {id:"inventario",eyebrow:"Inventario / Stock",title:"Sabé qué tenés, dónde está y qué necesita atención.",copy:"Controlá productos, movimientos, ubicaciones y alertas con una lectura clara de toda tu operación.",accent:"teal",products:[{brand:"PULSE",niche:"Stock y depósitos",detail:"Inventario visual para equipos operativos."},{brand:"PARTX",niche:"Repuestos y autopartes",detail:"Stock técnico con compatibilidad vehicular."}]},
  {id:"crm",eyebrow:"CRM / Ventas y clientes",title:"Cada oportunidad con un próximo paso.",copy:"Centralizá contactos, oportunidades, tareas y seguimiento en un sistema adaptado a la forma real en que vende tu negocio.",accent:"violet",products:[{brand:"NOVA",niche:"Inmobiliarias",detail:"Propiedades, interesados y pipeline comercial."},{brand:"VANTAGE",niche:"Ventas B2B",detail:"Cuentas, oportunidades y actividad comercial."},{brand:"COVERA",niche:"Seguros",detail:"Clientes, pólizas y renovaciones."}]},
] as const;

export const demoProducts = [
  {brand:"AURA",family:"Reservas",niche:"Salones de belleza",description:"Agenda, clientes y operación.",path:"/beauty/dashboard",tone:"rose",size:"large"},
  {brand:"TORQUE",family:"Reservas",niche:"Talleres automotrices",description:"Agenda de taller, vehículos y órdenes.",path:"/taller/dashboard",tone:"orange",size:"small"},
  {brand:"NEXUS",family:"Reservas",niche:"Consultorios",description:"Agenda profesional y pacientes.",path:"/consultorio/dashboard",tone:"cyan",size:"small"},
  {brand:"PULSE",family:"Inventario",niche:"Stock y depósitos",description:"Productos, movimientos y alertas.",path:"/stock/dashboard",tone:"teal",size:"wide"},
  {brand:"PARTX",family:"Inventario",niche:"Repuestos y autopartes",description:"Inventario técnico y compatibilidad vehicular.",path:"/autoparts/dashboard",tone:"steel",size:"small"},
  {brand:"NOVA",family:"CRM",niche:"Inmobiliarias",description:"Propiedades, interesados y pipeline comercial.",path:"/inmobiliaria/dashboard",tone:"sand",size:"large"},
  {brand:"VANTAGE",family:"CRM",niche:"Ventas B2B",description:"Cuentas, oportunidades y seguimiento.",path:"/sales/dashboard",tone:"indigo",size:"small"},
  {brand:"COVERA",family:"CRM",niche:"Seguros",description:"Clientes, pólizas y renovaciones.",path:"/insurance/dashboard",tone:"green",size:"wide"},
] as const;

export const processSteps = [
  ["01","Entendemos tu operación","Nos mostrás cómo trabajás hoy y dónde se pierde más tiempo."],
  ["02","Te mostramos una solución","Explorás una experiencia concreta antes de tomar una decisión."],
  ["03","La adaptamos a tu negocio","Ajustamos procesos, lenguaje e identidad a tu forma de trabajar."],
  ["04","La implementamos","Ponemos en marcha una solución lista para tu operación real."],
  ["05","Seguimos mejorándola","La tecnología acompaña los cambios y el crecimiento del negocio."],
] as const;

export const pricingPlans = [
  {name:"Start",price:"US$ 39",suffix:"/ mes",copy:"Para ordenar el primer proceso importante.",featured:false},
  {name:"Business",price:"US$ 69",suffix:"/ mes",copy:"Para equipos que necesitan más control.",featured:true},
  {name:"Pro",price:"US$ 129",suffix:"/ mes",copy:"Para operaciones con mayor profundidad.",featured:false},
  {name:"Custom",price:"Cotización",suffix:"",copy:"Para una solución construida a tu medida.",featured:false},
] as const;

export function demoHref(path:string){const base=process.env.NEXT_PUBLIC_DEMOS_BASE_URL;return base?`${base.replace(/\/$/,"")}${path}`:path}
