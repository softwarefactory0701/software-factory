"use client";

import { DemoShell } from "@software-factory/demo-shell";
import { consultorioVertical } from "@software-factory/verticals/consultorio";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NexusIcon, type NexusIconName } from "./nexus-icon";

const moduleIcons: Record<string, NexusIconName> = { booking: "agenda", consultations: "consultations", customers: "patients", dashboard: "dashboard", reports: "reports", resources: "professionals", services: "services", settings: "settings" };
const navigation = consultorioVertical.navigation.map((item) => ({ ...item, icon: <NexusIcon className="size-4.5" name={moduleIcons[item.module] ?? "dashboard"} /> }));
const mobileNavigation = navigation.slice(0, 4).map((item) => item.href === "/consultorio/dashboard" ? { ...item, label: "Inicio" } : item);
const mobileOverflowNavigation = navigation.slice(4);

export function NexusShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const currentItem = consultorioVertical.navigation.find((item) => pathname === item.href);
  return <DemoShell brandMark="N" businessName={consultorioVertical.businessName} contextLabel="NEXUS" currentPath={pathname} mobileNavigation={mobileNavigation} mobileOverflowIcon={<NexusIcon className="size-4.5" name="more" />} mobileOverflowNavigation={mobileOverflowNavigation} navigation={navigation} pageTitle={currentItem?.label ?? "Consultorio"} productLabel="Gestión de consultorios" profileInitials="AM" profileLabel="Ana · Recepción" theme={{ accent: "#347b78", accentSoft: "#e8f2ef", accentText: "#286563", background: "#f3f5f1", badgeBackground: "#dcebe5", badgeText: "#285f59", brandMarkColor: "#b7d7cb", foreground: "#263432", navigationDot: "#7daf9d", navigationIcon: "#9dcaba", sidebar: "#263836", surface: "#fffefb" }}>{children}</DemoShell>;
}
