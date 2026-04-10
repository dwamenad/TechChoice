"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { startTransition, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  Laptop,
  Settings2,
  Smartphone,
  Tablet,
  Target,
  Wallet,
  Watch
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/store";
import {
  buildDefaultPriorityWeights,
  categoryDefinitions,
  getBrandsForCategory,
  getCategoryDefinition
} from "@/lib/mock-data";
import { runRecommendation } from "@/lib/recommendation-engine";
import type { BrandId, EcosystemPreference, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/format";
import { serializeDecisionProfile } from "@/lib/utils/query-state";

const steps = [
  { title: "Category", description: "Category, brand, ecosystem." },
  { title: "Basics", description: "Budget and use case." },
  { title: "Priorities", description: "Weight the factors." },
  { title: "Constraints", description: "Set limits. Run it." }
] as const;

const categoryIcons = {
  smartphones: Smartphone,
  laptops: Laptop,
  tablets: Tablet,
  headphones: Headphones,
  smartwatches: Watch
} satisfies Record<ProductCategory, typeof Smartphone>;

const ecosystemOptions: Array<{
  id: EcosystemPreference;
  label: string;
}> = [
  { id: "open", label: "Open to all" },
  { id: "apple", label: "Apple" },
  { id: "android", label: "Android" },
  { id: "windows", label: "Windows" },
  { id: "microsoft", label: "Microsoft" },
  { id: "google", label: "Google" },
  { id: "samsung", label: "Samsung" },
  { id: "sony", label: "Sony" },
  { id: "garmin", label: "Garmin" }
];

const budgetFlexCopy = {
  strict: "Tight.",
  balanced: "Some flex.",
  stretch: "Stretch."
} as const;

function getBudgetConfig(category: ProductCategory) {
  switch (category) {
    case "smartphones":
      return { min: 250, max: 2000, step: 50 };
    case "laptops":
      return { min: 500, max: 4200, step: 100 };
    case "tablets":
      return { min: 250, max: 2600, step: 50 };
    case "headphones":
      return { min: 75, max: 1200, step: 25 };
    case "smartwatches":
      return { min: 100, max: 1600, step: 25 };
    default:
      return { min: 200, max: 3000, step: 50 };
  }
}

function getSliderNumber(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function DecisionWizard({ initialCategory }: { initialCategory?: ProductCategory }) {
  const router = useRouter();
  const {
    hydrated,
    step,
    preferences,
    setStep,
    setCategory,
    setPreferences,
    setPriority,
    toggleConstraint,
    calculateResult,
    nextStep,
    prevStep
  } = useStore();

  useEffect(() => {
    if (!hydrated || !initialCategory) {
      return;
    }

    if (preferences.category !== initialCategory) {
      setCategory(initialCategory);
    }
  }, [hydrated, initialCategory, preferences.category, setCategory]);

  const definition = getCategoryDefinition(preferences.category);
  const availableBrands = getBrandsForCategory(preferences.category);
  const budgetConfig = getBudgetConfig(preferences.category);
  const preview = useMemo(() => runRecommendation(preferences), [preferences]);
  const previewRecommendation = preview.recommendation;
  const activeUseCase = definition.useCases.find((item) => item.id === preferences.primaryUseCase);

  if (!hydrated) {
    return (
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">Loading</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-zinc-950">
              Loading draft
            </h1>
          </div>
        </div>
      </main>
    );
  }

  function handlePriorityReset() {
    const priorities = buildDefaultPriorityWeights(preferences.category);
    setPreferences({ priorities });
  }

  function handleFinish() {
    const result = calculateResult();
    startTransition(() => {
      router.push(`/results?${serializeDecisionProfile(result.profile)}`);
    });
  }

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-zinc-400">Flow</p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <h1 className="text-4xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-5xl">
                  Set the decision
                </h1>
              </div>
              <Badge variant="outline" className="px-4 py-2 text-[11px]">
                Step {step + 1} of {steps.length}
              </Badge>
            </div>
          </div>

          <Card className="bg-[color:var(--panel-strong)]">
            <CardContent className="space-y-8 p-6 md:p-8">
              <div className="grid gap-3 md:grid-cols-4">
                {steps.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setStep(index)}
                    className={cn(
                      "rounded-[22px] border px-4 py-4 text-left transition",
                      index === step
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : index < step
                          ? "border-zinc-200 bg-white text-zinc-950"
                          : "border-zinc-200 bg-zinc-50 text-zinc-400"
                    )}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em]">
                      Step {index + 1}
                    </p>
                    <p className="mt-3 text-base font-semibold tracking-[-0.03em]">{item.title}</p>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                  {steps[step].title}
                </p>
                <p className="text-lg leading-8 text-zinc-500">{steps[step].description}</p>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  {step === 0 ? (
                    <div className="space-y-8">
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {Object.values(categoryDefinitions).map((category) => {
                          const Icon = categoryIcons[category.id];

                          return (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => setCategory(category.id)}
                              className={cn(
                                "rounded-[24px] border p-5 text-left transition hover:-translate-y-0.5",
                                preferences.category === category.id
                                  ? "border-zinc-950 bg-zinc-950 text-white"
                                  : "border-zinc-200 bg-white text-zinc-950 hover:border-zinc-300"
                              )}
                            >
                              <Icon
                                size={24}
                                className={preferences.category === category.id ? "text-lime-300" : "text-zinc-400"}
                              />
                              <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                                {category.label}
                              </h2>
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid gap-8 xl:grid-cols-2">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                            <Target size={16} />
                            <span>Brand</span>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => setPreferences({ brandPreference: "open" })}
                              className={cn(
                                "rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5",
                                preferences.brandPreference === "open"
                                  ? "border-lime-300 bg-lime-200 text-zinc-950"
                                  : "border-zinc-200 bg-white text-zinc-700"
                              )}
                            >
                              Any brand
                            </button>
                            {availableBrands.map((brand) => (
                              <button
                                key={brand}
                                type="button"
                                onClick={() =>
                                  setPreferences({ brandPreference: brand as BrandId | "open" })
                                }
                                className={cn(
                                  "rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5",
                                  preferences.brandPreference === brand
                                    ? "border-zinc-950 bg-zinc-950 text-white"
                                    : "border-zinc-200 bg-white text-zinc-700"
                                )}
                              >
                                {brand}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                            <Settings2 size={16} />
                            <span>Ecosystem</span>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {ecosystemOptions.map((option) => (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setPreferences({ ecosystemPreference: option.id })}
                                className={cn(
                                  "rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5",
                                  preferences.ecosystemPreference === option.id
                                    ? "border-zinc-950 bg-zinc-950 text-white"
                                    : "border-zinc-200 bg-white text-zinc-700"
                                )}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="space-y-10">
                      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                            <Wallet size={16} />
                            <span>Budget</span>
                          </div>

                            <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                            <div className="flex items-end justify-between gap-4">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">
                                  Budget ceiling
                                </p>
                                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                                  {formatCurrency(preferences.budget)}
                                </p>
                              </div>
                                <p className="max-w-[12rem] text-right text-sm leading-6 text-zinc-500">
                                Band {formatCurrency(definition.recommendedPriceBand[0])} -{" "}
                                {formatCurrency(definition.recommendedPriceBand[1])}
                              </p>
                            </div>
                            <Slider
                              value={[preferences.budget]}
                              min={budgetConfig.min}
                              max={budgetConfig.max}
                              step={budgetConfig.step}
                              onValueChange={(value) =>
                                setPreferences({ budget: getSliderNumber(value) })
                              }
                              className="mt-6"
                            />
                            <input
                              type="number"
                              min={budgetConfig.min}
                              max={budgetConfig.max}
                              step={budgetConfig.step}
                              value={preferences.budget}
                              onChange={(event) =>
                                setPreferences({
                                  budget: Math.max(
                                    budgetConfig.min,
                                    Math.min(budgetConfig.max, Number(event.target.value))
                                  )
                                })
                              }
                              className="mt-5 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                            <Target size={16} />
                            <span>Budget mode</span>
                          </div>
                          <div className="grid gap-3">
                            {Object.entries(budgetFlexCopy).map(([id, copy]) => (
                              <button
                                key={id}
                                type="button"
                                onClick={() => setPreferences({ budgetFlex: id as typeof preferences.budgetFlex })}
                                className={cn(
                                  "rounded-[22px] border p-4 text-left transition hover:-translate-y-0.5",
                                  preferences.budgetFlex === id
                                    ? "border-zinc-950 bg-zinc-950 text-white"
                                    : "border-zinc-200 bg-white text-zinc-900"
                                )}
                              >
                                <p className="font-semibold capitalize">{id}</p>
                                <p className="mt-2 text-sm leading-7 opacity-72">{copy}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                          <Target size={16} />
                            <span>Use case</span>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {definition.useCases.map((useCase) => (
                            <button
                              key={useCase.id}
                              type="button"
                              onClick={() => setPreferences({ primaryUseCase: useCase.id })}
                              className={cn(
                                "rounded-[22px] border p-4 text-left transition hover:-translate-y-0.5",
                                preferences.primaryUseCase === useCase.id
                                  ? "border-zinc-950 bg-zinc-950 text-white"
                                  : "border-zinc-200 bg-white text-zinc-900"
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-semibold tracking-[-0.02em]">{useCase.label}</p>
                                {preferences.primaryUseCase === useCase.id ? (
                                  <Check size={16} className="text-lime-300" />
                                ) : null}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="space-y-8">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                          <Settings2 size={16} />
                          <span>Priorities</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handlePriorityReset}>
                          Reset
                        </Button>
                      </div>
                      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                        {definition.priorityOptions.map((option) => {
                          const value = preferences.priorities[option.id];
                          const level = value < 35 ? "Low" : value > 70 ? "High" : "Mid";

                          return (
                            <div key={option.id} className="space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-semibold capitalize tracking-[-0.02em] text-zinc-900">
                                    {option.label}
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    value < 35 ? "secondary" : value > 70 ? "default" : "outline"
                                  }
                                >
                                  {level}
                                </Badge>
                              </div>
                              <Slider
                                value={[value]}
                                min={10}
                                max={100}
                                step={5}
                                onValueChange={(next) =>
                                  setPriority(option.id, getSliderNumber(next))
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="space-y-5">
                      <div className="grid gap-3 md:grid-cols-2">
                        {definition.hardConstraints.map((constraint) => {
                          const active = preferences.hardConstraints.includes(constraint.id);

                          return (
                            <button
                              key={constraint.id}
                              type="button"
                              onClick={() => toggleConstraint(constraint.id)}
                              className={cn(
                                "flex items-start justify-between gap-4 rounded-[22px] border p-4 text-left transition hover:-translate-y-0.5",
                                active
                                  ? "border-zinc-950 bg-zinc-950 text-white"
                                  : "border-zinc-200 bg-white text-zinc-900"
                              )}
                            >
                              <div>
                                <p className="font-semibold tracking-[-0.02em]">{constraint.label}</p>
                              </div>
                              {active ? <Check size={16} className="mt-1 text-lime-300" /> : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6">
                {step === 0 ? (
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-transparent px-5 text-sm font-semibold tracking-[-0.02em] text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Home
                  </Link>
                ) : (
                  <Button variant="ghost" size="md" onClick={prevStep}>
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}>
                    Reset
                  </Button>
                  {step < steps.length - 1 ? (
                    <Button onClick={nextStep}>
                      Next
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleFinish}>
                      Results
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Preview
                </p>
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
                  {previewRecommendation.product.name}
                </h2>
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {preview.summary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div
                  className="rounded-[22px] p-4"
                  style={{ border: "1px solid var(--line)", background: "var(--panel)" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Match
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">
                    {Math.round(previewRecommendation.score)}
                  </p>
                </div>
                <div
                  className="rounded-[22px] p-4"
                  style={{ border: "1px solid var(--line)", background: "var(--panel)" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Price
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">
                    {formatCurrency(previewRecommendation.product.price)}
                  </p>
                </div>
              </div>

              <div
                className="rounded-[22px] p-5"
                style={{ border: "1px solid var(--line)", background: "var(--panel)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[color:var(--muted)]">
                  Setup
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{definition.label}</Badge>
                  <Badge variant="outline">
                    {preferences.brandPreference === "open" ? "All brands" : preferences.brandPreference}
                  </Badge>
                  <Badge variant="outline">{formatCurrency(preferences.budget)}</Badge>
                  <Badge variant="outline">{activeUseCase?.label ?? preferences.primaryUseCase}</Badge>
                </div>

              </div>
            </CardContent>
          </Card>

          <Card className="border-none text-[color:var(--panel-strong)]" style={{ background: "var(--foreground)", boxShadow: "var(--shadow-soft)" }}>
            <CardContent className="space-y-4 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                Lens
              </p>
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                {definition.label}
              </h3>
              <p className="text-sm leading-7 text-white/70">
                Mock data.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
