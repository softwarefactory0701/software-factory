import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = { title: "Programita — Software para la gente", description: "Software útil para negocios reales. Elegí un Programita, adaptalo a tu negocio o hagamos uno a medida.", robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
