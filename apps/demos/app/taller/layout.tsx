import type { ReactNode } from "react";
import { TallerShell } from "./_components/taller-shell";

export default function TallerLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <TallerShell>{children}</TallerShell>;
}
