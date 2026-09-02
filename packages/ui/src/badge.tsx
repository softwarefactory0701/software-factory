import type { HTMLAttributes } from "react";

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-amber-900 ${className}`}
      {...props}
    />
  );
}
