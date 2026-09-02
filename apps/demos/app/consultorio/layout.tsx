import type { ReactNode } from "react";
import { NexusShell } from "./_components/nexus-shell";

export default function ConsultorioLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <NexusShell>{children}</NexusShell>;
}
