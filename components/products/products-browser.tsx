"use client";

import { useDeferredValue, useMemo, useState } from "react";

import { categoryDefinitions, products } from "@/lib/mock-data";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/format";

export function ProductsBrowser() {
  const [category, setCategory] = useState<keyof typeof categoryDefinitions>("smartphones");
  const [query, setQuery] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query);

  const filteredProducts = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return products.filter((product) => {
      if (product.category !== category) {
        return false;
      }
      if (!normalized) {
        return true;
      }
      return `${product.name} ${product.brand}`.toLowerCase().includes(normalized);
    });
  }, [category, deferredQuery]);

  const compareProducts = useMemo(
    () => products.filter((product) => compareIds.includes(product.id)),
    [compareIds]
  );

  function toggleCompare(productId: string) {
    setCompareIds((current) => {
      if (current.includes(productId)) {
        return current.filter((item) => item !== productId);
      }

      return [...current, productId].slice(-3);
    });
  }

  const compareDimensions = categoryDefinitions[category].priorityOptions.slice(0, 6);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="section-eyebrow">Browse</p>
            <h1 className="text-5xl font-semibold tracking-[-0.05em]">Products</h1>
            <p className="section-copy">Browse and compare.</p>
          </div>

          <div className="panel-surface-strong p-6">
            <div className="flex flex-wrap gap-3">
              {Object.values(categoryDefinitions).map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    setCategory(entry.id);
                    setCompareIds([]);
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5",
                    category === entry.id
                      ? "border-black/12 bg-[color:var(--foreground)] text-white"
                      : "border-black/10 bg-white/76"
                  )}
                >
                  {entry.label}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${categoryDefinitions[category].label.toLowerCase()}…`}
              className="mt-5 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3"
            />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const selected = compareIds.includes(product.id);
            return (
              <article key={product.id} className="panel-surface p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-eyebrow">{product.brand}</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{product.name}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      selected
                        ? "border-black/12 bg-[color:var(--accent)] text-[color:var(--accent-ink)]"
                        : "border-black/10 bg-white/76"
                    )}
                  >
                    {selected ? "Selected" : "Compare"}
                  </button>
                </div>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{product.shortPitch}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full border border-black/8 bg-white/76 px-3 py-2 text-sm">
                    {product.tier}
                  </span>
                  <span className="rounded-full border border-black/8 bg-white/76 px-3 py-2 text-sm">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[color:var(--muted)]">
                  {product.strengths.slice(0, 3).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <section className="panel-surface-strong p-6">
          <p className="section-eyebrow">Manual compare</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Compare {compareProducts.length || "up to 3"}
          </h2>
          {compareProducts.length >= 2 ? (
            <div className="mt-6 overflow-x-auto rounded-[28px] border border-black/8 bg-white/76">
              <table className="min-w-full divide-y divide-black/8 text-left text-sm">
                <thead>
                  <tr className="text-black/55">
                    <th className="px-5 py-4 font-medium">Metric</th>
                    {compareProducts.map((product) => (
                      <th key={product.id} className="px-5 py-4 font-medium">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/6">
                  <tr>
                    <td className="px-5 py-4 font-medium">Price</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="px-5 py-4">{formatCurrency(product.price)}</td>
                    ))}
                  </tr>
                  {compareDimensions.map((dimension) => (
                    <tr key={dimension.id}>
                      <td className="px-5 py-4 font-medium">{dimension.label}</td>
                      {compareProducts.map((product) => (
                        <td key={product.id} className="px-5 py-4">
                          {product.attributes[dimension.id] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-5 py-4 font-medium">Price traps</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="px-5 py-4 text-[color:var(--muted)]">
                        {product.pricingTrapNotes[0]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              Pick 2 products.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
