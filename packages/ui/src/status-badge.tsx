import type { HTMLAttributes } from "react";

export type StatusTone = "neutral" | "success" | "warning" | "info" | "danger";

const toneClasses: Record<StatusTone, string> = {
  danger: "bg-red-50 text-red-700 ring-red-200",
  info: "bg-sky-50 text-sky-700 ring-sky-200",
  neutral: "bg-stone-100 text-stone-600 ring-stone-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
};

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  readonly tone?: StatusTone;
}

export function StatusBadge({ className = "", tone = "neutral", ...props }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
}
