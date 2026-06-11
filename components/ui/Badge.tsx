import type { ReactNode } from "react";

type Tone = "teal" | "gold" | "muted" | "success" | "danger";

const tones: Record<Tone, string> = {
  teal: "bg-primary/10 text-primary dark:text-primary-strong",
  gold: "bg-accent/15 text-accent",
  muted: "bg-surface-2 text-muted",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
};

export function Badge({
  tone = "muted",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
