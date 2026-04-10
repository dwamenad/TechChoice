import type { BrandStrategy } from "@/lib/types";

export const brandStrategies: BrandStrategy[] = [
  {
    brand: "Apple",
    premiumAnchorScore: 94,
    bundleStrategy: "Trade-in credits, financing, and services bundles do more work than raw markdowns.",
    upsellTendency: "Apple uses clean step-up ladders that make the middle tier feel safer than the base tier.",
    ecosystemLockInPressure: "Very high. Continuity and accessories lower switching appetite.",
    discountFrequency: "Rare on direct pricing, common on trade-in and carrier credits.",
    segmentationStrategy: "Entry, mainstream, premium design, then Pro/Ultra tiers with deliberate feature clustering.",
    pricingInsight: "Apple often protects the headline price and moves buyers through financing confidence rather than obvious discounting."
  },
  {
    brand: "Samsung",
    premiumAnchorScore: 83,
    bundleStrategy: "Aggressive pre-order promos, trade-ins, and accessory bundles are central to the pitch.",
    upsellTendency: "Samsung creates visible hardware jumps between FE, standard, Plus, and Ultra tiers.",
    ecosystemLockInPressure: "Moderate. The Galaxy ecosystem helps, but direct-store offers often do the heavier lifting.",
    discountFrequency: "Frequent on direct store and launch windows.",
    segmentationStrategy: "Wide tier spread with a value anchor and a no-compromise Ultra peak.",
    pricingInsight: "Samsung often wins by making premium hardware feel reachable right now, not by holding a pristine list price."
  },
  {
    brand: "Google",
    premiumAnchorScore: 76,
    bundleStrategy: "Trade-in, financing, and software-value messaging soften the premium gap.",
    upsellTendency: "Google tends to upsell via AI workflows, camera credibility, and update longevity more than pure specs.",
    ecosystemLockInPressure: "Moderate. Android flexibility remains, but Pixel convenience grows with other Google devices.",
    discountFrequency: "Periodic store promos and strong launch incentives.",
    segmentationStrategy: "A clean path from value A-series to Pro and Fold tiers.",
    pricingInsight: "Google usually sells usefulness and intelligence first, then closes with a better-than-expected promo."
  },
  {
    brand: "Microsoft",
    premiumAnchorScore: 74,
    bundleStrategy: "Price protection, trade-in, and accessory attachment help justify Surface pricing.",
    upsellTendency: "Microsoft differentiates more by form factor and screen size than by raw silicon tiers.",
    ecosystemLockInPressure: "Moderate. Windows familiarity matters, but the pull is softer than Apple.",
    discountFrequency: "Seasonal and frequent enough to matter.",
    segmentationStrategy: "Portable laptop, larger-screen laptop, and premium 2-in-1 lanes.",
    pricingInsight: "Surface pricing works best when Copilot+, pen support, and Windows continuity all matter together."
  },
  {
    brand: "Dell",
    premiumAnchorScore: 71,
    bundleStrategy: "Configuration discounting and business-style promotions shape the offer more than bundles.",
    upsellTendency: "Dell often nudges buyers into higher memory and OLED display configs quickly.",
    ecosystemLockInPressure: "Low. The push is more about specs and build than lock-in.",
    discountFrequency: "Frequent configuration-level promos.",
    segmentationStrategy: "Compact premium XPS, creator-focused XPS, and gaming-led performance lines.",
    pricingInsight: "Dell often makes premium configurations look only slightly more expensive until you notice the cumulative option pricing."
  },
  {
    brand: "Lenovo",
    premiumAnchorScore: 64,
    bundleStrategy: "Promos are common, and Lenovo often competes by over-delivering hardware for the price.",
    upsellTendency: "Upsells are real, but the base configs usually remain credible.",
    ecosystemLockInPressure: "Low.",
    discountFrequency: "Frequent.",
    segmentationStrategy: "Clear separation between mainstream portability, creator productivity, and gaming performance.",
    pricingInsight: "Lenovo tends to compete on pragmatic value and spec density rather than prestige pricing."
  },
  {
    brand: "Sony",
    premiumAnchorScore: 87,
    bundleStrategy: "Sony leans on product reputation and feature leadership more than bundle theatrics.",
    upsellTendency: "Premium audio tiers are sold on perceived refinement and feature completeness.",
    ecosystemLockInPressure: "Low to moderate, except for creator workflows.",
    discountFrequency: "Seasonal and moderate.",
    segmentationStrategy: "Top-tier hero products and slightly simplified follow-on options.",
    pricingInsight: "Sony is often selling category leadership, so the price premium can be real even when the gain is subtle."
  },
  {
    brand: "Bose",
    premiumAnchorScore: 84,
    bundleStrategy: "Bose relies on comfort, ANC reputation, and clean promotional windows over large bundles.",
    upsellTendency: "The upsell is usually about refinement rather than a dramatically different feature set.",
    ecosystemLockInPressure: "Low.",
    discountFrequency: "Seasonal and moderate.",
    segmentationStrategy: "Mainstream premium with a clearly signaled flagship tier.",
    pricingInsight: "Bose often prices the flagship for peace of mind and comfort certainty, not maximum feature aggression."
  },
  {
    brand: "Garmin",
    premiumAnchorScore: 78,
    bundleStrategy: "Garmin rarely bundles aggressively and instead leans on training depth and endurance.",
    upsellTendency: "Higher tiers are sold through athlete-specific metrics and battery promises.",
    ecosystemLockInPressure: "Moderate for fitness users who care about historical data and coaching.",
    discountFrequency: "Less frequent than mainstream smartwatch brands.",
    segmentationStrategy: "Fitness-first tiers built around battery, sensors, and sport-specific depth.",
    pricingInsight: "Garmin usually asks users to pay for endurance and training credibility, not smartwatch polish."
  }
];
