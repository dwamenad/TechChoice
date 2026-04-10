import type { DecisionProfile } from "@/lib/types";

export const sampleScenarios: Array<{
  title: string;
  blurb: string;
  profile: DecisionProfile;
}> = [
  {
    title: "Best laptop for a student under $1200",
    blurb: "Battery-first, school-friendly, and wary of spec traps.",
    profile: {
      category: "laptops",
      brandPreference: "open",
      budget: 1200,
      budgetFlex: "strict",
      primaryUseCase: "school",
      ecosystemPreference: "open",
      hardConstraints: ["best-for-school", "avoid-expensive-upgrades", "best-battery-life"],
      priorities: {
        performance: 62,
        battery: 94,
        portability: 88,
        camera: 40,
        display: 68,
        gaming: 32,
        longevity: 86,
        value: 95,
        audio: 40,
        comfort: 40,
        health: 40,
        software: 74
      }
    }
  },
  {
    title: "Best phone for content creation",
    blurb: "Camera and display matter more than pure thrift.",
    profile: {
      category: "smartphones",
      brandPreference: "open",
      budget: 1200,
      budgetFlex: "balanced",
      primaryUseCase: "content-creation",
      ecosystemPreference: "open",
      hardConstraints: ["avoid-expensive-upgrades"],
      priorities: {
        performance: 82,
        battery: 72,
        portability: 60,
        camera: 98,
        display: 90,
        gaming: 55,
        longevity: 76,
        value: 66,
        audio: 40,
        comfort: 40,
        health: 40,
        software: 70
      }
    }
  },
  {
    title: "Best tablet for travel and reading",
    blurb: "Light, simple, and good enough without paying for a faux-pro setup.",
    profile: {
      category: "tablets",
      brandPreference: "open",
      budget: 750,
      budgetFlex: "balanced",
      primaryUseCase: "reading",
      ecosystemPreference: "open",
      hardConstraints: ["lightweight-only", "avoid-expensive-upgrades", "best-battery-life"],
      priorities: {
        performance: 48,
        battery: 82,
        portability: 96,
        camera: 40,
        display: 86,
        gaming: 28,
        longevity: 72,
        value: 90,
        audio: 40,
        comfort: 40,
        health: 40,
        software: 64
      }
    }
  }
];
