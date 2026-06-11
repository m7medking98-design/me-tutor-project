"use client";

export function ProgressBar({
  value,
  gold = false,
  className = "",
}: {
  /** 0..100 */
  value: number;
  gold?: boolean;
  className?: string;
}) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-surface-2 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${
          gold ? "bg-accent" : "bg-primary"
        }`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
