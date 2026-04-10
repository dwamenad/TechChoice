import Link from "next/link";

import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/choose", label: "Choose" },
  { href: "/results", label: "Results" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--panel-strong) 88%, transparent 12%)" }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-lg font-bold text-[color:var(--accent)]">
            T
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Intelligent buying
            </p>
            <p className="text-lg font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">TechChoice</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/choose"
            className="hidden h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-5 text-sm font-semibold tracking-[-0.02em] text-[color:var(--accent-ink)] transition hover:-translate-y-0.5 hover:bg-lime-300 md:inline-flex"
          >
            Start a decision
          </Link>
        </div>
      </div>
    </header>
  );
}
