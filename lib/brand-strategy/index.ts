import { brandStrategies } from "@/lib/mock-data";
import type { BrandId, BrandStrategy, DecisionProfile, Product } from "@/lib/types";

export function getBrandStrategy(brand: BrandId): BrandStrategy {
  return brandStrategies.find((entry) => entry.brand === brand)!;
}

export function buildBrandInsight(product: Product, profile: DecisionProfile) {
  const strategy = getBrandStrategy(product.brand);
  const lines = [strategy.pricingInsight];

  if (strategy.premiumAnchorScore > 84 && profile.budgetFlex !== "stretch") {
    lines.push("This brand uses premium anchoring heavily, so the middle of the lineup often looks safer than it really is.");
  }

  if (profile.hardConstraints.includes("avoid-expensive-upgrades")) {
    lines.push(`Upsell tendency: ${strategy.upsellTendency}`);
  }

  if (profile.ecosystemPreference !== "open") {
    lines.push(`Lock-in pressure: ${strategy.ecosystemLockInPressure}`);
  }

  return lines.join(" ");
}
