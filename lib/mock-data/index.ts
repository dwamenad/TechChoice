import type {
  BrandId,
  DecisionProfile,
  Product,
  ProductCategory,
  PriorityWeights,
  ScoreDimension
} from "@/lib/types";

import { brandStrategies } from "@/lib/mock-data/brands";
import { categoryDefinitions, emptyPriorityWeights } from "@/lib/mock-data/categories";
import { products } from "@/lib/mock-data/products";
import { sampleScenarios } from "@/lib/mock-data/scenarios";

export { brandStrategies, categoryDefinitions, products, sampleScenarios };

export function getCategoryDefinition(category: ProductCategory) {
  return categoryDefinitions[category];
}

export function getBrandsForCategory(category: ProductCategory) {
  return Array.from(
    new Set(
      products
        .filter((product) => product.category === category)
        .map((product) => product.brand)
    )
  ) as BrandId[];
}

export function getProductsForCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

export function buildDefaultPriorityWeights(category: ProductCategory): PriorityWeights {
  const definition = getCategoryDefinition(category);
  const weights = { ...emptyPriorityWeights };

  definition.priorityOptions.forEach((option, index) => {
    const base = index < 2 ? 78 : index < 4 ? 66 : 56;
    weights[option.id as ScoreDimension] = base;
  });

  return weights;
}

export function buildDefaultProfile(category: ProductCategory): DecisionProfile {
  const definition = getCategoryDefinition(category);

  return {
    category,
    brandPreference: "open",
    budget: definition.defaultBudget,
    budgetFlex: "balanced",
    primaryUseCase: definition.useCases[0].id,
    ecosystemPreference: "open",
    hardConstraints: [],
    priorities: buildDefaultPriorityWeights(category)
  };
}

export function getRelatedProducts(product: Product) {
  return products.filter(
    (candidate) =>
      candidate.category === product.category &&
      candidate.brand === product.brand &&
      candidate.id !== product.id
  );
}
