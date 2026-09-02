"use client";

import { DemoShell } from "@software-factory/demo-shell";
import { beautyVertical } from "@software-factory/verticals/beauty";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BeautyIcon, type BeautyIconName } from "./beauty-icon";

const moduleIcons: Record<string, BeautyIconName> = {
  booking: "calendar",
  customers: "users",
  dashboard: "dashboard",
  reports: "chart",
  resources: "user",
  services: "scissors",
  settings: "settings",
};

const navigation = beautyVertical.navigation.map((item) => ({
  ...item,
  icon: <BeautyIcon className="size-4.5" name={moduleIcons[item.module] ?? "spark"} />,
}));

const mobileNavigation = navigation.slice(0, 4).map((item) => item.href === "/beauty/dashboard" ? { ...item, label: "Inicio" } : item);
const mobileOverflowNavigation = navigation.slice(4);

export function BeautyShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const currentItem = beautyVertical.navigation.find((item) => pathname === item.href);

  return (
    <DemoShell
      brandMark="A"
      businessName={beautyVertical.businessName}
      currentPath={pathname}
      mobileNavigation={mobileNavigation}
      mobileOverflowIcon={<BeautyIcon className="size-4.5" name="more" />}
      mobileOverflowNavigation={mobileOverflowNavigation}
      navigation={navigation}
      pageTitle={currentItem?.label ?? "Beauty"}
      profileLabel="Alejandra · Administradora"
      theme={{
        accent: beautyVertical.theme.accentColor,
        background: beautyVertical.theme.backgroundColor,
        foreground: beautyVertical.theme.foregroundColor,
        sidebar: beautyVertical.theme.sidebarColor,
        surface: beautyVertical.theme.surfaceColor,
      }}
    >
      {children}
    </DemoShell>
  );
}
