import { cn } from "@/lib/utils/cn";

export function ProgressBar({
  value,
  className
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("score-track", className)}>
      <div className="score-fill transition-[width] duration-500" style={{ width: `${Math.max(4, Math.round(value))}%` }} />
    </div>
  );
}
