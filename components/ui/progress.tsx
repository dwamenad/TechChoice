import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full", className)}
      style={{ background: "color-mix(in srgb, var(--foreground) 14%, transparent 86%)" }}
      {...props}
    >
      <div
        className="h-full rounded-full bg-[color:var(--foreground)] transition-[width]"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
