"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Info,
  RotateCcw,
  Share2,
  ShieldCheck,
  TrendingUp,
  Zap
} from "lucide-react";

import { ComparisonTable } from "@/components/results/comparison-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { buildBrandInsight } from "@/lib/brand-strategy";
import { getCategoryDefinition } from "@/lib/mock-data";
import { runRecommendation } from "@/lib/recommendation-engine";
import { useStore } from "@/store";
import type { DecisionProfile, RecommendationResult, ScoredProduct } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";
import { serializeDecisionProfile } from "@/lib/utils/query-state";

function AlternativeCard({
  label,
  emphasis,
  product,
  fallback
}: {
  label: string;
  emphasis: "value" | "premium";
  product: ScoredProduct | null;
  fallback: string;
}) {
  return (
    <Card className="border-zinc-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge variant={emphasis === "value" ? "success" : "warning"}>{label}</Badge>
          {product ? <strong className="text-sm text-zinc-950">{formatCurrency(product.product.price)}</strong> : null}
        </div>
        {product ? (
          <>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
              {product.product.name}
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-500">{product.product.shortPitch}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="outline">{Math.round(product.score)}/100 match</Badge>
              <Badge variant="outline">{product.product.brand}</Badge>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
              {product.dominantReasons.slice(0, 1).map((reason) => (
                <li key={reason}>• {reason}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-4 text-sm leading-7 text-zinc-500">{fallback}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function ResultsDashboard({ initialProfile }: { initialProfile: DecisionProfile | null }) {
  const router = useRouter();
  const {
    hydrated,
    preferences,
    savedSessions,
    setPreferences,
    setStep,
    saveSession,
    removeSession,
    reset
  } = useStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!initialProfile) {
      return;
    }

    setPreferences(initialProfile);
    setStep(3);
  }, [initialProfile, setPreferences, setStep]);

  const profile = initialProfile ?? (hydrated ? preferences : null);
  const result = useMemo<RecommendationResult | null>(() => {
    if (!profile) {
      return null;
    }
    return runRecommendation(profile);
  }, [profile]);

  if (!profile && !hydrated) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">Loading</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-zinc-950">
              Loading result
            </h1>
          </div>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-zinc-200 bg-white p-10 text-center shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">No result</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-zinc-950">
            No result
          </h1>
          <p className="mt-4 text-base leading-8 text-zinc-500">Run the flow.</p>
          <Link
            href="/choose"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold tracking-[-0.02em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            Open flow
          </Link>
        </div>
      </main>
    );
  }

  const { recommendation, alternatives } = result;
  const activeProfile = result.profile;
  const category = getCategoryDefinition(result.profile.category);
  const brandInsight = buildBrandInsight(recommendation.product, result.profile);
  const savedLabel = `${category.label}: ${recommendation.product.name}`;

  function handleSave() {
    saveSession({
      id: `${recommendation.product.id}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      label: savedLabel,
      profile: activeProfile,
      recommendationId: recommendation.product.id
    });
  }

  async function handleShare() {
    const url = `${window.location.origin}/results?${serializeDecisionProfile(activeProfile)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function handleReset() {
    reset();
    router.push("/choose");
  }

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/choose"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-transparent px-4 text-sm font-semibold tracking-[-0.02em] text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Link>
                <Badge variant="outline">{category.label}</Badge>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                  Best fit
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-5xl">
                  {recommendation.product.name}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 size={16} className="mr-2" />
                {copied ? "Copied" : "Share"}
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden border-none bg-zinc-950 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
              <CardContent className="p-0">
                <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 px-8 py-7">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                      Best fit
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                      {recommendation.product.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-8 text-white/70">
                      {result.summary}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                      Match score
                    </p>
                    <p className="mt-2 text-5xl font-black">
                      {Math.round(recommendation.score)}%
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 px-8 py-7 md:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                      Price
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {formatCurrency(recommendation.product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                      Value score
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {recommendation.product.attributes.value ?? "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                      Brand
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {recommendation.product.brand}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="border-zinc-200">
                <CardContent className="space-y-5 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                      Scores
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                      Why it won
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {recommendation.breakdown.map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-500">{item.label}</span>
                          <strong className="text-zinc-950">{Math.round(item.value)}</strong>
                        </div>
                        <Progress value={item.value} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200">
                <CardContent className="space-y-4 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                      Brand
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                      {recommendation.product.brand} read
                    </h2>
                  </div>
                  <p className="text-sm leading-7 text-zinc-500">{brandInsight}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.05, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <Card className="border-zinc-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp size={18} />
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">Strengths</h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
                {recommendation.product.strengths.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle size={18} />
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">Tradeoffs</h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
                {recommendation.product.tradeoffs.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-zinc-700">
                <Info size={18} />
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                  Watchouts
                </h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
                {recommendation.product.pricingTrapNotes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-2">
          <AlternativeCard
            label="Value"
            emphasis="value"
            product={alternatives.value}
            fallback="No strong cheaper pick."
          />
          <AlternativeCard
            label="Premium"
            emphasis="premium"
            product={alternatives.premium}
            fallback="No strong premium pick."
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Card className="border-zinc-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-zinc-700">
                <Zap size={18} />
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                  Pay more for
                </h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
                {result.whatYouPayExtraFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-zinc-700">
                <ShieldCheck size={18} />
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                  Ignore
                </h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
                {result.marketingRealityCheck.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Card className="border-zinc-200">
          <CardContent className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Compare
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950">
              Against the others
            </h2>
            <div className="mt-6">
              <ComparisonTable entries={result.comparison} category={activeProfile.category} />
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-zinc-200">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Top 5
              </p>
              <div className="mt-5 space-y-4">
                {result.ranking.slice(0, 5).map((entry, index) => (
                  <div
                    key={entry.product.id}
                    className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                          #{index + 1}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                          {entry.product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-zinc-500">
                          {entry.product.shortPitch}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <strong className="text-lg text-zinc-950">{formatCurrency(entry.product.price)}</strong>
                        <p className="mt-1 text-sm text-zinc-500">{Math.round(entry.score)}/100 match</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-zinc-200">
              <CardContent className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                  Low value
                </p>
                <div className="mt-5 space-y-3 text-sm leading-7 text-zinc-500">
                  {result.skippedOptions.length ? (
                    result.skippedOptions.map((item) => <p key={item}>• {item}</p>)
                  ) : (
                    <p>No clear low-value picks.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-200">
              <CardContent className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                  Saved
                </p>
                <div className="mt-5 space-y-3">
                  {savedSessions.length ? (
                    savedSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between gap-4 rounded-[22px] border border-zinc-200 bg-zinc-50 px-4 py-4"
                      >
                        <div>
                          <p className="font-semibold text-zinc-950">{session.label}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {new Date(session.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/results?${serializeDecisionProfile(session.profile)}`}
                            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold tracking-[-0.02em] text-zinc-900 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50"
                          >
                            Open
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSession(session.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-zinc-500">
                      No saved results.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
