import { getBrandStrategy } from "@/lib/brand-strategy";
import { getCategoryDefinition, getProductsForCategory } from "@/lib/mock-data";
import type {
  DecisionProfile,
  HardConstraintId,
  Product,
  RecommendationResult,
  ScoredProduct,
  ScoreDimension
} from "@/lib/types";
import { clamp, formatCurrency } from "@/lib/utils/format";

function getRelevantDimensions(profile: DecisionProfile) {
  return getCategoryDefinition(profile.category).priorityOptions.map((option) => option.id);
}

function getAttribute(product: Product, dimension: ScoreDimension) {
  return product.attributes[dimension] ?? 50;
}

function scoreBudgetFit(price: number, budget: number, flex: DecisionProfile["budgetFlex"]) {
  const allowance = flex === "strict" ? 1.02 : flex === "balanced" ? 1.15 : 1.24;

  if (price <= budget) {
    const targetRatio = flex === "strict" ? 0.82 : flex === "balanced" ? 0.9 : 1;
    const ratio = price / Math.max(budget, 1);
    const distance = Math.min(Math.abs(targetRatio - ratio) / targetRatio, 1);
    return 72 + (1 - distance) * 28;
  }

  if (price <= budget * allowance) {
    const overRatio = (price - budget) / budget;
    return 65 - overRatio * 120;
  }

  return Math.max(12, 56 - ((price - budget) / budget) * 140);
}

function scoreUseCaseFit(product: Product, profile: DecisionProfile) {
  return product.useCaseTags.includes(profile.primaryUseCase) ? 100 : 58;
}

function scoreEcosystemFit(product: Product, profile: DecisionProfile) {
  if (profile.ecosystemPreference === "open") {
    return 82;
  }

  if (product.ecosystems.includes(profile.ecosystemPreference)) {
    return 100;
  }

  if (profile.ecosystemPreference === "apple" && product.brand === "Apple") {
    return 100;
  }

  return 18;
}

function matchesConstraint(product: Product, constraint: HardConstraintId) {
  switch (constraint) {
    case "apple-ecosystem":
      return product.ecosystems.includes("apple") || product.brand === "Apple";
    case "lightweight-only":
      return (product.attributes.portability ?? product.attributes.comfort ?? 0) >= 84;
    case "good-for-video-editing":
      return (product.attributes.performance ?? 0) >= 84 && (product.attributes.display ?? 0) >= 86;
    case "best-for-school":
      return product.useCaseTags.includes("school") || ((product.attributes.value ?? 0) >= 80 && (product.attributes.battery ?? 0) >= 78);
    case "best-battery-life":
      return (product.attributes.battery ?? 0) >= 86;
    case "best-for-coding":
      return product.useCaseTags.includes("coding") || ((product.attributes.performance ?? 0) >= 82 && (product.attributes.display ?? 0) >= 80);
    case "no-refurbished-products":
      return !product.refurbished;
    case "avoid-expensive-upgrades":
      return true;
    default:
      return true;
  }
}

function getCandidates(profile: DecisionProfile) {
  return getProductsForCategory(profile.category).filter((product) => {
    if (profile.brandPreference !== "open" && product.brand !== profile.brandPreference) {
      return false;
    }

    return true;
  });
}

function weightedUtility(product: Product, profile: DecisionProfile) {
  const dimensions = getRelevantDimensions(profile);
  const totalWeight = dimensions.reduce((sum, dimension) => sum + (profile.priorities[dimension] ?? 40), 0);

  const total = dimensions.reduce((sum, dimension) => {
    return sum + getAttribute(product, dimension) * (profile.priorities[dimension] ?? 40);
  }, 0);

  return total / totalWeight;
}

function scoreValueAdjusted(product: Product, utility: number) {
  return utility * 0.62 + (product.attributes.value ?? 50) * 0.38;
}

function scoreTrapPenalty(product: Product, profile: DecisionProfile) {
  const aggressivePenalty = profile.hardConstraints.includes("avoid-expensive-upgrades");
  const base = product.upsellPressure * (aggressivePenalty ? 0.12 : 0.05);
  const accessory = (product.accessoryBurden ?? 0) * (aggressivePenalty ? 0.45 : 0.18);
  return base + accessory;
}

function scoreBrandPressurePenalty(product: Product, profile: DecisionProfile) {
  const strategy = getBrandStrategy(product.brand);
  let penalty = 0;

  if (profile.budgetFlex === "strict") {
    penalty += strategy.premiumAnchorScore * 0.04;
  } else if (profile.budgetFlex === "balanced") {
    penalty += strategy.premiumAnchorScore * 0.02;
  }

  if (profile.ecosystemPreference === "open") {
    penalty += product.lockInPressure * 0.015;
  }

  return penalty;
}

function buildDominantReasons(product: Product, profile: DecisionProfile, budgetFit: number, ecosystemFit: number) {
  const dimensionLabels = new Map(
    getCategoryDefinition(profile.category).priorityOptions.map((option) => [option.id, option.label])
  );

  const topDimensions = getRelevantDimensions(profile)
    .map((dimension) => ({
      dimension,
      priority: profile.priorities[dimension],
      score: getAttribute(product, dimension)
    }))
    .sort((a, b) => b.priority * b.score - a.priority * a.score)
    .slice(0, 2);

  const reasons = topDimensions.map(
    (item) => `${dimensionLabels.get(item.dimension)}: strong.`
  );

  if (budgetFit >= 84) {
    reasons.push("Budget fit.");
  }

  if (ecosystemFit >= 96 && profile.ecosystemPreference !== "open") {
    reasons.push("Ecosystem fit.");
  }

  return reasons.slice(0, 4);
}

function buildCautionReasons(product: Product, profile: DecisionProfile) {
  const cautions = [...product.tradeoffs];

  if (profile.hardConstraints.includes("avoid-expensive-upgrades")) {
    cautions.push(product.pricingTrapNotes[0] ?? "Watch upgrades.");
  }

  return cautions.slice(0, 3);
}

function scoreProduct(product: Product, profile: DecisionProfile): ScoredProduct {
  const utility = weightedUtility(product, profile);
  const budgetFit = scoreBudgetFit(product.price, profile.budget, profile.budgetFlex);
  const useCaseFit = scoreUseCaseFit(product, profile);
  const ecosystemFit = scoreEcosystemFit(product, profile);
  const valueAdjusted = scoreValueAdjusted(product, utility);
  const trapPenalty = scoreTrapPenalty(product, profile);
  const brandPressurePenalty = scoreBrandPressurePenalty(product, profile);

  const rawScore =
    utility * 0.38 +
    valueAdjusted * 0.22 +
    budgetFit * 0.14 +
    useCaseFit * 0.1 +
    ecosystemFit * 0.08 +
    (product.attributes.longevity ?? 72) * 0.08;

  const score = clamp(rawScore - trapPenalty * 0.32 - brandPressurePenalty * 0.22, 0, 100);

  return {
    product,
    score,
    weightedUtility: utility,
    valueAdjustedScore: valueAdjusted,
    budgetFit,
    useCaseFit,
    ecosystemFit,
    trapPenalty,
    brandPressurePenalty,
    dominantReasons: buildDominantReasons(product, profile, budgetFit, ecosystemFit),
    cautionReasons: buildCautionReasons(product, profile),
    dominated: false,
    breakdown: [
      { label: "Weighted utility", value: utility },
      { label: "Value-adjusted", value: valueAdjusted },
      { label: "Budget fit", value: budgetFit },
      { label: "Use-case fit", value: useCaseFit },
      { label: "Ecosystem fit", value: ecosystemFit }
    ]
  };
}

function markDominated(ranking: ScoredProduct[]) {
  return ranking.map((current) => {
    const better = ranking.find((other) => {
      if (other.product.id === current.product.id) {
        return false;
      }

      return (
        other.product.price <= current.product.price + 60 &&
        other.weightedUtility >= current.weightedUtility + 4 &&
        other.valueAdjustedScore >= current.valueAdjustedScore - 1
      );
    });

    return better
      ? {
          ...current,
          dominated: true,
          dominatedBy: better.product.name
        }
      : current;
  });
}

function pickValueAlternative(ranking: ScoredProduct[], recommendation: ScoredProduct) {
  return (
    ranking.find(
      (item) =>
        item.product.id !== recommendation.product.id &&
        item.product.price <= recommendation.product.price - 80
    ) ?? null
  );
}

function pickPremiumAlternative(ranking: ScoredProduct[], recommendation: ScoredProduct) {
  return (
    ranking.find(
      (item) =>
        item.product.id !== recommendation.product.id &&
        item.product.price >= recommendation.product.price + 120 &&
        item.weightedUtility >= recommendation.weightedUtility
    ) ?? null
  );
}

function comparePremiumDelta(recommendation: ScoredProduct, premiumAlternative: ScoredProduct | null, profile: DecisionProfile) {
  if (!premiumAlternative) {
    return ["No strong premium step-up."];
  }

  const labels = new Map(
    getCategoryDefinition(profile.category).priorityOptions.map((option) => [option.id, option.label])
  );

  const improvements = getRelevantDimensions(profile)
    .map((dimension) => ({
      label: labels.get(dimension) ?? dimension,
      delta: getAttribute(premiumAlternative.product, dimension) - getAttribute(recommendation.product, dimension)
    }))
    .filter((entry) => entry.delta >= 6)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 3);

  if (!improvements.length) {
    return [
      `${premiumAlternative.product.name} costs ${formatCurrency(
        premiumAlternative.product.price - recommendation.product.price
      )} more without a big gain.`
    ];
  }

  return [
    `${premiumAlternative.product.name} asks for ${formatCurrency(
      premiumAlternative.product.price - recommendation.product.price
    )} more for ${improvements.map((item) => item.label.toLowerCase()).join(", ")}.`,
    premiumAlternative.product.pricingTrapNotes[0] ?? "Only if you need it."
  ];
}

function buildRealityCheck(
  recommendation: ScoredProduct,
  ranking: ScoredProduct[],
  profile: DecisionProfile
) {
  const category = getCategoryDefinition(profile.category);
  const strategy = getBrandStrategy(recommendation.product.brand);
  const dominated = ranking
    .filter((item) => item.dominated)
    .slice(0, 2)
    .map((item) => `${item.product.name}: ${item.dominatedBy} is the better buy.`);

  return [
    category.commonMarketingNoise[0],
    strategy.pricingInsight,
    ...dominated
  ].slice(0, 3);
}

function buildSummary(recommendation: ScoredProduct, profile: DecisionProfile, valueAlternative: ScoredProduct | null) {
  const topPriorities = getRelevantDimensions(profile)
    .map((dimension) => ({
      dimension,
      weight: profile.priorities[dimension]
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map((entry) => {
      const option = getCategoryDefinition(profile.category).priorityOptions.find(
        (item) => item.id === entry.dimension
      );
      return option?.label.toLowerCase() ?? entry.dimension;
    });

  const budgetSentence =
    recommendation.product.price <= profile.budget
      ? "In budget."
      : "Over budget.";

  const altSentence = valueAlternative
    ? `Cheaper: ${valueAlternative.product.name}.`
    : "No clear cheaper match.";

  return `${recommendation.product.name} ranks first for ${topPriorities.join(" + ")}. ${budgetSentence} ${altSentence}`;
}

export function runRecommendation(profile: DecisionProfile): RecommendationResult {
  const considered = getCandidates(profile);
  const filtered = considered.filter((product) =>
    profile.hardConstraints.every((constraint) => matchesConstraint(product, constraint))
  );
  const evaluationPool = filtered.length ? filtered : considered;

  const ranked = markDominated(
    evaluationPool
      .map((product) => scoreProduct(product, profile))
      .sort((a, b) => b.score - a.score)
  );

  const recommendation = ranked.find((item) => !item.dominated) ?? ranked[0];
  const valueAlternative = pickValueAlternative(ranked, recommendation);
  const premiumAlternative = pickPremiumAlternative(ranked, recommendation);
  const comparison = [
    recommendation,
    valueAlternative,
    premiumAlternative
  ].filter(Boolean) as ScoredProduct[];

  return {
    profile,
    consideredCount: considered.length,
    filteredCount: evaluationPool.length,
    recommendation,
    alternatives: {
      value: valueAlternative,
      premium: premiumAlternative
    },
    ranking: ranked,
    comparison,
    summary: buildSummary(recommendation, profile, valueAlternative),
    whySelected: recommendation.dominantReasons,
    whatYouPayExtraFor: comparePremiumDelta(recommendation, premiumAlternative, profile),
    marketingRealityCheck: buildRealityCheck(recommendation, ranked, profile),
    companyInsight: `${getBrandStrategy(recommendation.product.brand).segmentationStrategy} ${recommendation.product.priceStory}`,
    skippedOptions: ranked
      .filter((item) => item.dominated)
      .slice(0, 3)
      .map((item) => `${item.product.name}: ${item.dominatedBy} is the stronger buy.`)
  };
}
