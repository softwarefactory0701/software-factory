"use client";

import { DemoShell } from "@software-factory/demo-shell";
import { tallerVertical } from "@software-factory/verticals/taller";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TallerIcon, type TallerIconName } from "./taller-icon";

const moduleIcons: Record<string, TallerIconName> = {
  booking: "calendar", customers: "customers", dashboard: "dashboard", orders: "orders", reports: "chart",
  resources: "resources", services: "services", settings: "settings", vehicles: "vehicles",
};

const navigation = tallerVertical.navigation.map((item) => ({ ...item, icon: <TallerIcon className="size-4.5" name={moduleIcons[item.module] ?? "wrench"} /> }));
const mobileNavigation = navigation.slice(0, 4).map((item) => item.href === "/taller/dashboard" ? { ...item, label: "Inicio" } : item);
const mobileOverflowNavigation = navigation.slice(4);

export function TallerShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const currentItem = tallerVertical.navigation.find((item) => pathname === item.href);
  return <DemoShell
    brandMark="TG"
    businessName={tallerVertical.businessName}
    contextLabel="TORQUE"
    currentPath={pathname}
    mobileNavigation={mobileNavigation}
    mobileOverflowIcon={<TallerIcon className="size-4.5" name="more" />}
    mobileOverflowNavigation={mobileOverflowNavigation}
    navigation={navigation}
    pageTitle={currentItem?.label ?? "Taller"}
    productLabel="Workshop operations"
    profileInitials="RM"
    profileLabel="Ramiro · Jefe de taller"
    theme={{
      accent: tallerVertical.theme.accentColor, accentSoft: "#fff3dc", accentText: "#9a5706",
      background: tallerVertical.theme.backgroundColor, badgeBackground: "#ffedc5", badgeText: "#744006", brandMarkColor: "#fde68a",
      foreground: tallerVertical.theme.foregroundColor, navigationDot: "#d97706", navigationIcon: "#fbbf24",
      sidebar: tallerVertical.theme.sidebarColor, surface: tallerVertical.theme.surfaceColor,
    }}
  >{children}</DemoShell>;
}
