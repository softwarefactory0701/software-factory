import type { ReactNode, SVGProps } from "react";

export type NexusIconName = "agenda" | "consultations" | "dashboard" | "more" | "patients" | "professionals" | "reports" | "services" | "settings";

const paths: Record<NexusIconName, ReactNode> = {
  agenda: <><rect height="15" rx="3" width="16" x="4" y="5"/><path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h5"/></>,
  consultations: <><rect height="16" rx="3" width="16" x="4" y="4"/><path d="M8 9h8M8 13h5M8 17h3"/></>,
  dashboard: <><path d="M4 13a8 8 0 1 1 16 0"/><path d="m12 13 4-4M5 18h14"/></>,
  more: <><circle cx="5" cy="12" fill="currentColor" r="1"/><circle cx="12" cy="12" fill="currentColor" r="1"/><circle cx="19" cy="12" fill="currentColor" r="1"/></>,
  patients: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.7-4 2.5-6 5.5-6s4.8 2 5.5 6M16 7h5M18.5 4.5v5"/></>,
  professionals: <><circle cx="12" cy="7" r="4"/><path d="M5 21c.8-5 3-8 7-8s6.2 3 7 8M9 18h6"/></>,
  reports: <><path d="M4 20V10M10 20V5M16 20v-7M22 20H2"/></>,
  services: <><path d="M5 6h14M5 12h14M5 18h14"/><circle cx="9" cy="6" fill="currentColor" r="1.5"/><circle cx="15" cy="12" fill="currentColor" r="1.5"/><circle cx="11" cy="18" fill="currentColor" r="1.5"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></>,
};

export function NexusIcon({ className = "size-5", name, ...props }: { readonly name: NexusIconName } & SVGProps<SVGSVGElement>) {
  return <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" viewBox="0 0 24 24" {...props}>{paths[name]}</svg>;
}
