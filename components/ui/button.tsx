import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "default" | "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-[color:var(--foreground)] text-[color:var(--panel-strong)] hover:-translate-y-0.5 hover:opacity-92",
  primary:
    "bg-[color:var(--foreground)] text-[color:var(--panel-strong)] hover:-translate-y-0.5 hover:opacity-92",
  secondary:
    "bg-[color:var(--accent)] text-[color:var(--accent-ink)] hover:-translate-y-0.5 hover:bg-lime-300",
  outline:
    "border-[color:var(--line)] bg-[color:var(--panel-strong)] text-[color:var(--foreground)] hover:-translate-y-0.5 hover:bg-[color:var(--panel)]",
  ghost:
    "bg-transparent text-[color:var(--muted)] hover:bg-[color:var(--panel)] hover:text-[color:var(--foreground)]"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
  icon: "h-11 w-11 px-0"
};

export function Button({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-transparent font-semibold tracking-[-0.02em] transition disabled:pointer-events-none disabled:opacity-45",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
