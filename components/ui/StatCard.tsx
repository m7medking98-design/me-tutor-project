import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export function StatCard({
  icon,
  label,
  value,
  sub,
  gold = false,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  gold?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
        </div>
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl ${
            gold ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary dark:text-primary-strong"
          }`}
        >
          {icon}
        </span>
      </div>
    </Card>
  );
}
