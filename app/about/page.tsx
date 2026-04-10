import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About | TechChoice"
};

export default function AboutPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <SectionHeading
          eyebrow="About"
          title="How TechChoice works"
          copy="A transparent product-ranking engine for consumer tech."
        />

        <section className="panel-surface-strong space-y-8 p-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Product</h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              TechChoice helps users choose the right device for their needs instead of defaulting to flagship marketing or spec overload.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Data</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <li>• Products carry price, score attributes, strengths, tradeoffs, and pricing-trap notes.</li>
              <li>• Profiles include category, brand, budget, budget mode, use case, ecosystem, constraints, and priority weights.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Engine</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <li>• Filters by category, brand preference, and hard constraints.</li>
              <li>• Scores weighted utility from the selected priorities.</li>
              <li>• Adds budget fit, use-case fit, ecosystem fit, longevity, and value adjustment.</li>
              <li>• Penalizes upsell pressure, accessory burden, and brand anchoring.</li>
              <li>• Flags dominated options and returns best, value, and premium picks.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">State + UI</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <li>• Zustand stores the decision flow, draft profile, saved sessions, and computed result.</li>
              <li>• The multi-step flow and results surface stay separate from the scoring logic.</li>
              <li>• The slider, cards, badges, and tables are local reusable UI primitives.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Stack</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <li>• Next.js App Router, React, TypeScript, Tailwind CSS, Zustand, and motion.</li>
              <li>• Local mock data today, with clear seams for live product feeds later.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
