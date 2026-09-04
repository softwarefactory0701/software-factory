import { defineVertical } from "../src/types";

export const inmobiliariaVertical=defineVertical({
 businessName:"NOVA Realty",configuration:{currency:"USD",locale:"es-AR",scheduleEndHour:19,scheduleStartHour:9,weekStartsOn:"monday"},
 demo:{disclaimer:"Entorno de demostración",internalName:"Inmobiliaria",scenarioName:"Operación del 8 de septiembre de 2026",shownName:"NOVA Realty"},demoDataKey:"inmobiliaria-nova-v1",
 modules:["dashboard","pipeline","contacts","properties","visits","tasks","reports","settings"],
 navigation:[{href:"/inmobiliaria/dashboard",label:"Dashboard",module:"dashboard"},{href:"/inmobiliaria/pipeline",label:"Pipeline",module:"pipeline"},{href:"/inmobiliaria/interesados",label:"Interesados",module:"contacts"},{href:"/inmobiliaria/propiedades",label:"Propiedades",module:"properties"},{href:"/inmobiliaria/visitas",label:"Visitas",module:"visits"},{href:"/inmobiliaria/seguimientos",label:"Seguimientos",module:"tasks"},{href:"/inmobiliaria/reportes",label:"Reportes",module:"reports"},{href:"/inmobiliaria/configuracion",label:"Configuración",module:"settings"}],
 terminology:{booking:"Visita",bookings:"Visitas",customer:"Interesado",customers:"Interesados",resource:"Agente",resources:"Agentes",service:"Propiedad",services:"Propiedades"},
 theme:{accentColor:"#17324d",backgroundColor:"#f6f3ed",foregroundColor:"#24282d",logoText:"N",mutedColor:"#6f716f",sidebarColor:"#18232e",surfaceColor:"#fffdf9"}
} as const);
