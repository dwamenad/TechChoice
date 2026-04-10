import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[color:var(--foreground)] text-[color:var(--panel-strong)]",
  secondary: "bg-[color:var(--panel)] text-[color:var(--muted)]",
  outline: "border border-[color:var(--line)] bg-[color:var(--panel-strong)] text-[color:var(--muted)]",
  success: "bg-lime-100 text-lime-900",
  warning: "bg-amber-100 text-amber-900"
};

export function Badge({ className, variant = "secondary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
