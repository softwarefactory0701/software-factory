import type { HTMLAttributes, ReactNode } from "react";

export function BeautyPanel({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={`rounded-2xl border border-stone-200/80 bg-[#fffdf9] shadow-[0_10px_35px_rgba(51,43,38,0.045)] ${className}`} {...props} />;
}

export interface BeautyAvatarProps {
  readonly initials: string;
  readonly name: string;
  readonly size?: "sm" | "md" | "lg";
}

const avatarSizes = { lg: "size-14 text-base", md: "size-10 text-xs", sm: "size-8 text-[10px]" };

export function BeautyAvatar({ initials, name, size = "md" }: BeautyAvatarProps) {
  return (
    <span aria-label={name} className={`grid shrink-0 place-items-center rounded-full bg-[#ead8ce] font-semibold tracking-wide text-[#694b4d] ${avatarSizes[size]}`} role="img">
      {initials}
    </span>
  );
}

export interface BeautyPageIntroProps {
  readonly action?: ReactNode;
  readonly description: string;
  readonly eyebrow?: string;
  readonly title: string;
}

export function BeautyPageIntro({ action, description, eyebrow = "AURA Beauty Studio", title }: BeautyPageIntroProps) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a76f73]">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#292623] sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}
