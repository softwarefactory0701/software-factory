import type{Metadata}from"next";import type{ReactNode}from"react";import"./globals.css";
export const metadata:Metadata={description:"Soluciones de reservas, inventario y CRM adaptadas a negocios reales.",robots:{follow:false,index:false},title:"Software Factory — Software para negocios reales"};
export default function RootLayout({children}:Readonly<{children:ReactNode}>){return <html lang="es"><body>{children}</body></html>}
