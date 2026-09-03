import { defineVertical } from "../src/types";
export const stockVertical=defineVertical({
 businessName:"PULSE Inventory",configuration:{currency:"ARS",locale:"es-AR",scheduleEndHour:18,scheduleStartHour:8,weekStartsOn:"monday"},
 demo:{disclaimer:"Datos ficticios · Acciones simuladas",internalName:"Stock",scenarioName:"Operación del 8 de septiembre de 2026",shownName:"PULSE Inventory"},demoDataKey:"stock-pulse-v1",
 modules:["dashboard","products","movements","locations","alerts","suppliers","reports","settings"],
 navigation:[{href:"/stock/dashboard",label:"Dashboard",module:"dashboard"},{href:"/stock/productos",label:"Productos",module:"products"},{href:"/stock/movimientos",label:"Movimientos",module:"movements"},{href:"/stock/ubicaciones",label:"Ubicaciones",module:"locations"},{href:"/stock/alertas",label:"Alertas",module:"alerts"},{href:"/stock/proveedores",label:"Proveedores",module:"suppliers"},{href:"/stock/reportes",label:"Reportes",module:"reports"},{href:"/stock/configuracion",label:"Configuración",module:"settings"}],
 terminology:{booking:"Movimiento",bookings:"Movimientos",customer:"Proveedor",customers:"Proveedores",resource:"Ubicación",resources:"Ubicaciones",service:"Producto",services:"Productos"},
 theme:{accentColor:"#14b8a6",backgroundColor:"#f3f6f7",foregroundColor:"#15242d",logoText:"P",mutedColor:"#667780",sidebarColor:"#111d26",surfaceColor:"#ffffff"}
} as const);
