export interface ProgressBarProps {
  readonly className?: string;
  readonly label?: string;
  readonly value: number;
}

export function ProgressBar({ className = "", label, value }: ProgressBarProps) {
  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-stone-600">{label}</span>
          <span className="font-semibold text-stone-800">{boundedValue}%</span>
        </div>
      ) : null}
      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={boundedValue}
        className="h-2 overflow-hidden rounded-full bg-stone-100"
        role="progressbar"
      >
        <div className="h-full rounded-full bg-[var(--demo-accent,#a76f73)]" style={{ width: `${boundedValue}%` }} />
      </div>
    </div>
  );
}
