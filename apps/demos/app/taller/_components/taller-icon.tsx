import type { SVGProps } from "react";

export type TallerIconName = "calendar" | "chart" | "customers" | "dashboard" | "more" | "orders" | "resources" | "services" | "settings" | "vehicles" | "wrench";

const paths: Record<TallerIconName, React.ReactNode> = {
  calendar: <><rect height="15" rx="2" width="16" x="4" y="5"/><path d="M8 3v4M16 3v4M4 10h16"/></>,
  chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
  customers: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.7-4 2.5-6 5.5-6s4.8 2 5.5 6M16 6.5a3 3 0 0 1 0 5.5M17 14c2.2.5 3.4 2.1 3.8 5"/></>,
  dashboard: <><rect height="6" rx="1" width="7" x="3" y="3"/><rect height="10" rx="1" width="7" x="14" y="3"/><rect height="10" rx="1" width="7" x="3" y="12"/><rect height="6" rx="1" width="7" x="14" y="16"/></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
  orders: <><path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h4"/></>,
  resources: <><circle cx="12" cy="7" r="4"/><path d="M5 21c.8-5 3-8 7-8s6.2 3 7 8"/></>,
  services: <><path d="m14 6 4-3 3 3-3 4M14 6l4 4-9 9-4 1 1-4z"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></>,
  vehicles: <><path d="M3 15V9l2-4h14l2 4v6M5 15h14M6 15v3M18 15v3M7 11h2M15 11h2"/></>,
  wrench: <path d="M14 6a5 5 0 0 0-7 6L2 17l5 5 5-5a5 5 0 0 0 6-7l-3 3-3-3z"/>,
};

export function TallerIcon({ className = "size-5", name, ...props }: { readonly name: TallerIconName } & SVGProps<SVGSVGElement>) {
  return <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24" {...props}>{paths[name]}</svg>;
}
