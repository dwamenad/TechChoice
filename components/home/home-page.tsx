import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { categoryDefinitions } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils/format";

export function HomePage() {
  return (
    <main>
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--muted)]">
              TechChoice
            </p>
            <h1 className="text-5xl font-semibold leading-[0.94] tracking-[-0.08em] text-[color:var(--foreground)] md:text-7xl">
              A decision engine for consumer tech.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              Weight priorities, filter constraints, and get one clear recommendation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/choose"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--foreground)] px-6 text-sm font-semibold tracking-[-0.02em] text-white transition hover:-translate-y-0.5 hover:opacity-92"
                style={{ color: "#fff" }}
              >
                Start
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-6 text-sm font-semibold tracking-[-0.02em] text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:bg-[color:var(--panel)]"
              >
                Method
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {Object.values(categoryDefinitions).map((category) => (
              <Link
                key={category.id}
                href={`/choose?category=${category.id}`}
                className="rounded-[24px] border bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-0.5"
                style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-soft)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  {category.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                  {category.label}
                </h2>
                <p className="mt-6 text-sm font-semibold text-[color:var(--foreground)]">
                  {formatCurrency(category.recommendedPriceBand[0])} -{" "}
                  {formatCurrency(category.recommendedPriceBand[1])}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--muted)]">
              How it works
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
              Three quick steps
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Profile",
                copy: "Set category, budget, and use case."
              },
              {
                title: "Score",
                copy: "Weight priorities and constraints."
              },
              {
                title: "Compare",
                copy: "Read the best fit and tradeoffs."
              }
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{item.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:pb-16">
        <div
          className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[30px] px-8 py-10 md:flex-row md:items-end md:justify-between"
          style={{ background: "var(--foreground)", color: "var(--panel-strong)" }}
        >
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/45">Start here</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
              Clear scoring. Clear tradeoffs.
            </h2>
            <p className="text-base leading-8" style={{ color: "var(--hero-muted)" }}>
              Local mock data for now.
            </p>
          </div>
          <Link
            href="/choose"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold tracking-[-0.02em] text-[color:var(--accent-ink)] transition hover:-translate-y-0.5 hover:bg-lime-300"
          >
            Open flow
          </Link>
        </div>
      </section>
    </main>
  );
}
