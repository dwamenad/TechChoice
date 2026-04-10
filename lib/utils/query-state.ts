import type {
  DecisionProfile,
  HardConstraintId,
  PriorityWeights,
  ProductCategory,
  ScoreDimension,
  UseCaseId
} from "@/lib/types";
import { buildDefaultProfile, getCategoryDefinition } from "@/lib/mock-data";
import { clamp } from "@/lib/utils/format";

const DIMENSION_SEPARATOR = ",";
const PAIR_SEPARATOR = ":";

function parseWeightPairs(value: string | null, base: PriorityWeights) {
  if (!value) {
    return base;
  }

  const next = { ...base };
  value.split(DIMENSION_SEPARATOR).forEach((pair) => {
    const [dimension, raw] = pair.split(PAIR_SEPARATOR);
    if (!dimension || !raw) {
      return;
    }
    next[dimension as ScoreDimension] = clamp(Number(raw), 10, 100);
  });
  return next;
}

export function serializeDecisionProfile(profile: DecisionProfile) {
  const params = new URLSearchParams();
  params.set("category", profile.category);
  params.set("brand", profile.brandPreference);
  params.set("budget", String(profile.budget));
  params.set("flex", profile.budgetFlex);
  params.set("useCase", profile.primaryUseCase);
  params.set("ecosystem", profile.ecosystemPreference);

  if (profile.hardConstraints.length) {
    params.set("constraints", profile.hardConstraints.join(DIMENSION_SEPARATOR));
  }

  const weights = Object.entries(profile.priorities)
    .map(([key, value]) => `${key}${PAIR_SEPARATOR}${value}`)
    .join(DIMENSION_SEPARATOR);

  params.set("weights", weights);
  return params.toString();
}

export function deserializeDecisionProfile(
  input:
    | URLSearchParams
    | Record<string, string | string[] | undefined>
    | undefined
    | null
) {
  const params =
    input instanceof URLSearchParams
      ? input
      : new URLSearchParams(
          Object.entries(input ?? {}).flatMap(([key, value]) =>
            Array.isArray(value)
              ? value.map((item) => [key, item])
              : value
                ? [[key, value]]
                : []
          )
        );

  const rawCategory = params.get("category") as ProductCategory | null;
  const category = rawCategory ?? "smartphones";
  const defaults = buildDefaultProfile(category);
  const definition = getCategoryDefinition(category);

  return {
    ...defaults,
    brandPreference: (params.get("brand") as DecisionProfile["brandPreference"]) ?? defaults.brandPreference,
    budget: clamp(Number(params.get("budget") ?? defaults.budget), 200, 4500),
    budgetFlex: (params.get("flex") as DecisionProfile["budgetFlex"]) ?? defaults.budgetFlex,
    primaryUseCase: (params.get("useCase") as UseCaseId) ?? definition.useCases[0].id,
    ecosystemPreference:
      (params.get("ecosystem") as DecisionProfile["ecosystemPreference"]) ??
      defaults.ecosystemPreference,
    hardConstraints: (params.get("constraints") ?? "")
      .split(DIMENSION_SEPARATOR)
      .filter(Boolean) as HardConstraintId[],
    priorities: parseWeightPairs(params.get("weights"), defaults.priorities)
  } satisfies DecisionProfile;
}
