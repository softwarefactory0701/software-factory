import type { ReactNode } from "react";
import { BeautyShell } from "./_components/beauty-shell";

export default function BeautyLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <BeautyShell>{children}</BeautyShell>;
}
