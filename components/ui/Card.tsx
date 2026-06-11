import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-surface card-line ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-line/30 hover:shadow-lg hover:shadow-primary/5"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
