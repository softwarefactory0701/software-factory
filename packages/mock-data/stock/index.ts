import type { Category, Location, LowStockThreshold, Product, StockLevel, StockMovement } from "@software-factory/stock-core";

export interface PulseSupplier { readonly id: string; readonly name: string; readonly contact: string; readonly productIds: readonly string[]; readonly lastReceipt: string; readonly leadTimeDays: number; readonly status: "active" | "review"; }
export interface PulseMetrics { readonly products: number; readonly lowStock: number; readonly movementsToday: number; readonly inventoryValue: number; }

export const pulseMetrics: PulseMetrics = { products: 1284, lowStock: 36, movementsToday: 18, inventoryValue: 2480000 };
export const pulseCategories: Category[] = [
  { id:"seg",name:"Seguridad" },{ id:"emb",name:"Embalaje" },{ id:"eti",name:"Etiquetado" },{ id:"lim",name:"Limpieza" },{ id:"pap",name:"Papelería" },
];
export const pulseLocations: Location[] = [
  {id:"dep",name:"Depósito principal",code:"DEP"},{id:"ra",name:"Rack A",code:"A",parentLocationId:"dep"},{id:"a01",name:"Rack A-01",code:"A-01",parentLocationId:"ra"},{id:"a02",name:"Rack A-02",code:"A-02",parentLocationId:"ra"},{id:"rb",name:"Rack B",code:"B",parentLocationId:"dep"},{id:"b01",name:"Rack B-01",code:"B-01",parentLocationId:"rb"},{id:"b04",name:"Rack B-04",code:"B-04",parentLocationId:"rb"},{id:"sc",name:"Sector C",code:"C",parentLocationId:"dep"},
];
const productRows = [
 ["PRD-001","Guantes nitrilo caja x100","seg","caja",6800],["PRD-002","Cinta de embalaje 48 mm","emb","unidad",1250],["PRD-003","Caja corrugada mediana","emb","unidad",860],["PRD-004","Film stretch 50 cm","emb","rollo",7400],["PRD-005","Etiquetas térmicas 100x150","eti","rollo",8900],["PRD-006","Marcadores permanentes negros","pap","caja",4200],["PRD-007","Guantes de trabajo talle M","seg","par",3900],["PRD-008","Bolsas industriales 80x110","emb","paquete",5100],["PRD-009","Precintos plásticos 200 mm","emb","bolsa",2800],["PRD-010","Papel térmico 80 mm","pap","rollo",1700],["PRD-011","Protector burbuja 1 m","emb","rollo",12600],["PRD-012","Cajas pequeñas x25","emb","paquete",9400],["PRD-013","Alcohol industrial 5 L","lim","bidón",11800],["PRD-014","Máscaras antipolvo x20","seg","caja",7600],["PRD-015","Paños absorbentes x50","lim","paquete",6300],["PRD-016","Etiquetas frágil x500","eti","rollo",4600],["PRD-017","Fleje plástico 12 mm","emb","rollo",15200],["PRD-018","Dispensador cinta manual","emb","unidad",9800],
] as const;
export const pulseProducts: Product[] = productRows.map(([sku,name,categoryId,unit,unitCost],index)=>({id:`p${index+1}`,sku,name,categoryId,unit,unitCost}));
const totals=[124,32,280,86,0,68,14,72,190,44,21,125,18,38,64,0,27,12];
const minimums=[40,50,100,35,30,25,25,40,80,30,15,50,12,20,30,20,18,8];
const primary=["a02","b04","sc","a01","b01","a02","b04","sc","a01","b01","sc","sc","a02","b04","a01","b01","sc","a02"];
export const pulseStockLevels: StockLevel[] = pulseProducts.flatMap((product,index)=>{
  const total=totals[index] ?? 0; const locationId=primary[index] ?? "a01";
  if(index===0) return [{productId:product.id,locationId:"a02",quantity:80},{productId:product.id,locationId:"b01",quantity:44}];
  if(index===3) return [{productId:product.id,locationId:"a01",quantity:60},{productId:product.id,locationId:"b04",quantity:26}];
  return [{productId:product.id,locationId,quantity:total}];
});
export const pulseThresholds: LowStockThreshold[] = pulseProducts.map((product,index)=>({productId:product.id,locationId:primary[index] ?? "a01",minimumQuantity:minimums[index] ?? 0}));
export const pulseSuppliers: PulseSupplier[] = [
 {id:"s1",name:"Delta Insumos",contact:"Marina · +54 11 5555-3301",productIds:["p1","p7","p14"],lastReceipt:"05 sep 2026",leadTimeDays:3,status:"active"},
 {id:"s2",name:"PackSur Distribuciones",contact:"Lucas · +54 11 5555-3302",productIds:["p2","p3","p4","p8","p9","p11","p12","p17","p18"],lastReceipt:"07 sep 2026",leadTimeDays:2,status:"active"},
 {id:"s3",name:"Código Logístico",contact:"Paula · +54 11 5555-3303",productIds:["p5","p10","p16"],lastReceipt:"29 ago 2026",leadTimeDays:5,status:"review"},
 {id:"s4",name:"Higiene Central",contact:"Diego · +54 11 5555-3304",productIds:["p13","p15"],lastReceipt:"02 sep 2026",leadTimeDays:4,status:"active"},
];
export const pulseMovements: StockMovement[] = [
 {id:"m1",productId:"p1",type:"inbound",quantity:50,destinationLocationId:"a02",occurredAt:"2026-09-08T09:42:00",actorName:"Lucía Fernández",reference:"Recepción compra #OC-1842"},
 {id:"m2",productId:"p2",type:"outbound",quantity:12,sourceLocationId:"b04",occurredAt:"2026-09-08T10:15:00",actorName:"Mateo Silva",reference:"Pedido interno #PI-225"},
 {id:"m3",productId:"p4",type:"transfer",quantity:20,sourceLocationId:"a01",destinationLocationId:"b04",occurredAt:"2026-09-08T10:38:00",actorName:"Ana Torres",reference:"Reubicación #TR-091"},
 {id:"m4",productId:"p7",type:"adjustment",quantity:3,adjustmentDirection:"decrease",sourceLocationId:"b04",occurredAt:"2026-09-08T11:06:00",actorName:"Ana Torres",reference:"Control visual #AJ-038"},
 {id:"m5",productId:"p3",type:"outbound",quantity:24,sourceLocationId:"sc",occurredAt:"2026-09-08T11:31:00",actorName:"Mateo Silva",reference:"Despacho #DS-804"},
 {id:"m6",productId:"p10",type:"inbound",quantity:30,destinationLocationId:"b01",occurredAt:"2026-09-08T12:04:00",actorName:"Lucía Fernández",reference:"Recepción #OC-1845"},
 {id:"m7",productId:"p11",type:"transfer",quantity:5,sourceLocationId:"sc",destinationLocationId:"a01",occurredAt:"2026-09-08T12:28:00",actorName:"Ana Torres",reference:"Reubicación #TR-092"},
 {id:"m8",productId:"p13",type:"inbound",quantity:10,destinationLocationId:"a02",occurredAt:"2026-09-08T13:12:00",actorName:"Lucía Fernández",reference:"Recepción #OC-1847"},
];
export const pulseWeeklyActivity=[{day:"Lun",inbound:42,outbound:31},{day:"Mar",inbound:58,outbound:39},{day:"Mié",inbound:35,outbound:45},{day:"Jue",inbound:64,outbound:52},{day:"Vie",inbound:49,outbound:37},{day:"Sáb",inbound:22,outbound:18}];
