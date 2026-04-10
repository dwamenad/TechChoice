export type ProductCategory =
  | "smartphones"
  | "laptops"
  | "tablets"
  | "headphones"
  | "smartwatches";

export type BudgetFlex = "strict" | "balanced" | "stretch";

export type EcosystemPreference =
  | "open"
  | "apple"
  | "android"
  | "windows"
  | "microsoft"
  | "google"
  | "samsung"
  | "sony"
  | "garmin";

export type UseCaseId =
  | "school"
  | "content-creation"
  | "travel"
  | "coding"
  | "gaming"
  | "hybrid-work"
  | "reading"
  | "commute"
  | "fitness"
  | "outdoors";

export type HardConstraintId =
  | "apple-ecosystem"
  | "lightweight-only"
  | "good-for-video-editing"
  | "best-for-school"
  | "avoid-expensive-upgrades"
  | "best-battery-life"
  | "best-for-coding"
  | "no-refurbished-products";

export type ScoreDimension =
  | "performance"
  | "battery"
  | "portability"
  | "camera"
  | "display"
  | "gaming"
  | "longevity"
  | "value"
  | "audio"
  | "comfort"
  | "health"
  | "software";

export type PriorityWeights = Record<ScoreDimension, number>;

export type BrandId =
  | "Apple"
  | "Samsung"
  | "Google"
  | "Microsoft"
  | "Dell"
  | "Lenovo"
  | "Sony"
  | "Bose"
  | "Garmin";

export interface Product {
  id: string;
  name: string;
  brand: BrandId;
  category: ProductCategory;
  tier: string;
  price: number;
  msrp?: number;
  attributes: Partial<Record<ScoreDimension, number>>;
  ecosystems: EcosystemPreference[];
  useCaseTags: UseCaseId[];
  strengths: string[];
  tradeoffs: string[];
  pricingTrapNotes: string[];
  marketingPositioning: string[];
  summary: string;
  shortPitch: string;
  priceStory: string;
  upsellPressure: number;
  discountPressure: number;
  lockInPressure: number;
  accessoryBurden?: number;
  refurbished?: boolean;
}

export interface BrandStrategy {
  brand: BrandId;
  premiumAnchorScore: number;
  bundleStrategy: string;
  upsellTendency: string;
  ecosystemLockInPressure: string;
  discountFrequency: string;
  segmentationStrategy: string;
  pricingInsight: string;
}

export interface CategoryOption<T extends string> {
  id: T;
  label: string;
  description: string;
}

export interface CategoryDefinition {
  id: ProductCategory;
  label: string;
  description: string;
  eyebrow: string;
  defaultBudget: number;
  recommendedPriceBand: [number, number];
  heroQuestion: string;
  priorityOptions: CategoryOption<ScoreDimension>[];
  useCases: CategoryOption<UseCaseId>[];
  hardConstraints: CategoryOption<HardConstraintId>[];
  commonMarketingNoise: string[];
}

export interface DecisionProfile {
  category: ProductCategory;
  brandPreference: BrandId | "open";
  budget: number;
  budgetFlex: BudgetFlex;
  primaryUseCase: UseCaseId;
  ecosystemPreference: EcosystemPreference;
  hardConstraints: HardConstraintId[];
  priorities: PriorityWeights;
}

export interface ScoredProduct {
  product: Product;
  score: number;
  weightedUtility: number;
  valueAdjustedScore: number;
  budgetFit: number;
  useCaseFit: number;
  ecosystemFit: number;
  trapPenalty: number;
  brandPressurePenalty: number;
  dominantReasons: string[];
  cautionReasons: string[];
  dominated: boolean;
  dominatedBy?: string;
  breakdown: Array<{
    label: string;
    value: number;
  }>;
}

export interface RecommendationResult {
  profile: DecisionProfile;
  consideredCount: number;
  filteredCount: number;
  recommendation: ScoredProduct;
  alternatives: {
    value: ScoredProduct | null;
    premium: ScoredProduct | null;
  };
  ranking: ScoredProduct[];
  comparison: ScoredProduct[];
  summary: string;
  whySelected: string[];
  whatYouPayExtraFor: string[];
  marketingRealityCheck: string[];
  companyInsight: string;
  skippedOptions: string[];
}

export interface SavedSession {
  id: string;
  createdAt: string;
  label: string;
  profile: DecisionProfile;
  recommendationId: string;
}
