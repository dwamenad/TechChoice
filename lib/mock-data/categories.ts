import type { CategoryDefinition, ProductCategory, PriorityWeights } from "@/lib/types";

export const categoryDefinitions: Record<ProductCategory, CategoryDefinition> = {
  smartphones: {
    id: "smartphones",
    label: "Smartphones",
    description: "Phones for daily use, content, travel, and ecosystem fit.",
    eyebrow: "Pocket tech",
    defaultBudget: 1000,
    recommendedPriceBand: [500, 1400],
    heroQuestion: "Which phone best fits your real daily priorities, not the ad campaign?",
    priorityOptions: [
      { id: "performance", label: "Performance", description: "Responsiveness, multitasking, and future headroom." },
      { id: "battery", label: "Battery", description: "How safely it gets through a long day." },
      { id: "portability", label: "Portability", description: "Pocket comfort and one-hand use." },
      { id: "camera", label: "Camera", description: "Photo, video, and zoom quality." },
      { id: "display", label: "Display", description: "Brightness, smoothness, and readability." },
      { id: "gaming", label: "Gaming", description: "Sustained performance and thermal comfort." },
      { id: "longevity", label: "Longevity", description: "Update runway and long-term confidence." },
      { id: "value", label: "Value", description: "How much capability you get for the spend." }
    ],
    useCases: [
      { id: "school", label: "Student", description: "Value-aware and dependable." },
      { id: "content-creation", label: "Content creation", description: "Camera and editing quality matter." },
      { id: "travel", label: "Travel", description: "Battery and portability lead." },
      { id: "gaming", label: "Gaming", description: "Sustained performance matters." },
      { id: "commute", label: "Daily carry", description: "Comfort and convenience first." }
    ],
    hardConstraints: [
      { id: "apple-ecosystem", label: "Must work with Apple ecosystem", description: "Prefer lower switching friction for Apple users." },
      { id: "lightweight-only", label: "Lightweight only", description: "Filter toward easy-carry options." },
      { id: "avoid-expensive-upgrades", label: "Avoid expensive upgrades", description: "Penalize products with steeper upsell pressure." },
      { id: "best-battery-life", label: "Best battery life", description: "Favor endurance above most other factors." },
      { id: "no-refurbished-products", label: "No refurbished products", description: "Keep the recommendations new-only." }
    ],
    commonMarketingNoise: [
      "Camera specs can matter less than battery and comfort.",
      "Ultra-tier materials can be more about status signaling than a meaningful daily gain.",
      "A launch discount can change value dramatically even when the list price looks intimidating."
    ]
  },
  laptops: {
    id: "laptops",
    label: "Laptops",
    description: "Portable computers for school, work, coding, and media production.",
    eyebrow: "Work surface",
    defaultBudget: 1600,
    recommendedPriceBand: [900, 2400],
    heroQuestion: "Where does it make sense to stop spending on a laptop for your workload?",
    priorityOptions: [
      { id: "performance", label: "Performance", description: "Compiling, editing, and sustained multitasking." },
      { id: "battery", label: "Battery", description: "How often you can leave the charger behind." },
      { id: "portability", label: "Portability", description: "Weight and travel comfort." },
      { id: "display", label: "Display", description: "Clarity, color, and general visual quality." },
      { id: "gaming", label: "Gaming", description: "GPU headroom and thermal capacity." },
      { id: "longevity", label: "Longevity", description: "How safe the purchase feels over multiple years." },
      { id: "software", label: "Workflow fit", description: "OS polish and day-to-day software confidence." },
      { id: "value", label: "Value", description: "How rational the spend is for the gains you get." }
    ],
    useCases: [
      { id: "school", label: "School", description: "Battery and value first." },
      { id: "coding", label: "Coding", description: "Keyboard, display, and sustained performance." },
      { id: "content-creation", label: "Content creation", description: "Color, media, and export speed." },
      { id: "travel", label: "Travel", description: "Portable and durable enough for frequent movement." },
      { id: "gaming", label: "Gaming", description: "Graphics headroom matters." },
      { id: "hybrid-work", label: "Hybrid work", description: "Video calls, docs, and battery balance." }
    ],
    hardConstraints: [
      { id: "lightweight-only", label: "Lightweight only", description: "Favor slimmer devices and avoid bulk." },
      { id: "good-for-video-editing", label: "Good for video editing", description: "Push toward display and performance-heavy machines." },
      { id: "best-for-school", label: "Best for school", description: "Value-aware, durable, and battery-safe." },
      { id: "avoid-expensive-upgrades", label: "Avoid expensive upgrades", description: "Penalize steep configuration ladders." },
      { id: "best-battery-life", label: "Best battery life", description: "Reward endurance aggressively." },
      { id: "best-for-coding", label: "Best for coding", description: "Favor keyboard/display/workflow-friendly machines." }
    ],
    commonMarketingNoise: [
      "Specs can matter less than battery and thermals.",
      "High-end creator and gaming tiers can become poor value if your work is mostly browser, docs, and light dev.",
      "Storage and memory upsells are often where laptop pricing gets slippery."
    ]
  },
  tablets: {
    id: "tablets",
    label: "Tablets",
    description: "Lightweight screens for travel, reading, notes, and touch-first work.",
    eyebrow: "Glass + pen",
    defaultBudget: 900,
    recommendedPriceBand: [400, 1400],
    heroQuestion: "Do you need a tablet, or are you being nudged into a pricier hybrid than you need?",
    priorityOptions: [
      { id: "performance", label: "Performance", description: "Headroom for multitasking, art, and creative apps." },
      { id: "battery", label: "Battery", description: "How long it lasts away from power." },
      { id: "portability", label: "Portability", description: "Weight, hand feel, and travel ease." },
      { id: "display", label: "Display", description: "Reading comfort, brightness, and color." },
      { id: "longevity", label: "Longevity", description: "How future-safe the device feels." },
      { id: "software", label: "App fit", description: "Whether the software model fits your workflow." },
      { id: "value", label: "Value", description: "How rational the spend feels." }
    ],
    useCases: [
      { id: "reading", label: "Reading", description: "Comfort, battery, and lightness first." },
      { id: "travel", label: "Travel", description: "Portable and battery safe." },
      { id: "school", label: "School", description: "Notes, reading, and value." },
      { id: "content-creation", label: "Creative notes", description: "Drawing, markup, and touch-first work." },
      { id: "hybrid-work", label: "Hybrid work", description: "Productivity and accessory flexibility." }
    ],
    hardConstraints: [
      { id: "apple-ecosystem", label: "Must work with Apple ecosystem", description: "Keep the fit tight for Apple-heavy users." },
      { id: "lightweight-only", label: "Lightweight only", description: "Bias toward easy-hold tablets." },
      { id: "best-for-school", label: "Best for school", description: "Reward value and note-taking comfort." },
      { id: "avoid-expensive-upgrades", label: "Avoid expensive upgrades", description: "Penalize accessory and storage pressure." },
      { id: "best-battery-life", label: "Best battery life", description: "Reward all-day travel safety." }
    ],
    commonMarketingNoise: [
      "Add-ons can change the real price.",
      "Pro-tier tablets often sell aspiration more than practical necessity.",
      "A slightly larger display is not always worth a big portability penalty."
    ]
  },
  headphones: {
    id: "headphones",
    label: "Headphones",
    description: "Noise-cancelling and everyday audio gear for travel, calls, and focus.",
    eyebrow: "Audio fit",
    defaultBudget: 350,
    recommendedPriceBand: [150, 650],
    heroQuestion: "Where does the premium audio tier actually improve your day, and where is it just prestige?",
    priorityOptions: [
      { id: "audio", label: "Sound", description: "Overall sound quality and tuning confidence." },
      { id: "battery", label: "Battery", description: "How long they last between charges." },
      { id: "portability", label: "Portability", description: "Case size and daily-carry convenience." },
      { id: "comfort", label: "Comfort", description: "Long-session wear comfort." },
      { id: "gaming", label: "Low latency", description: "How safe they feel for gaming and video sync." },
      { id: "longevity", label: "Longevity", description: "Build, support, and long-term trust." },
      { id: "software", label: "Companion app", description: "Controls, transparency modes, and ecosystem software." },
      { id: "value", label: "Value", description: "How much peace of mind you get for the money." }
    ],
    useCases: [
      { id: "commute", label: "Commute", description: "Portability and ANC first." },
      { id: "travel", label: "Travel", description: "Comfort and battery over long sessions." },
      { id: "hybrid-work", label: "Calls + focus", description: "All-day comfort and reliable controls." },
      { id: "gaming", label: "Low latency", description: "Less lag for games and video." },
      { id: "content-creation", label: "Creative listening", description: "Sound quality matters most." }
    ],
    hardConstraints: [
      { id: "lightweight-only", label: "Lightweight only", description: "Bias toward easier carry and smaller cases." },
      { id: "avoid-expensive-upgrades", label: "Avoid expensive upgrades", description: "Penalize prestige-heavy pricing." },
      { id: "best-battery-life", label: "Best battery life", description: "Push toward endurance." },
      { id: "no-refurbished-products", label: "No refurbished products", description: "Keep the shortlist new-only." }
    ],
    commonMarketingNoise: [
      "Comfort can matter more than premium materials.",
      "The flagship pair is not always the best travel or commute buy.",
      "Spatial audio branding can be less important than fit and ANC consistency."
    ]
  },
  smartwatches: {
    id: "smartwatches",
    label: "Smartwatches",
    description: "Wearables for notifications, health tracking, endurance, and ecosystem convenience.",
    eyebrow: "Wrist tech",
    defaultBudget: 500,
    recommendedPriceBand: [200, 900],
    heroQuestion: "Do you need smartwatch polish, endurance, or serious health and fitness depth?",
    priorityOptions: [
      { id: "battery", label: "Battery", description: "How often you have to charge it." },
      { id: "portability", label: "Comfort", description: "How wearable it feels every day." },
      { id: "display", label: "Display", description: "Readability and general interaction quality." },
      { id: "health", label: "Health tracking", description: "Sensors, fitness depth, and training value." },
      { id: "longevity", label: "Longevity", description: "How robust the purchase feels long term." },
      { id: "software", label: "Companion software", description: "App quality and ecosystem integration." },
      { id: "value", label: "Value", description: "How sensible the spend is." }
    ],
    useCases: [
      { id: "fitness", label: "Fitness", description: "Training, recovery, and sensor depth." },
      { id: "commute", label: "Daily convenience", description: "Notifications and wrist comfort." },
      { id: "travel", label: "Travel", description: "Battery safety matters." },
      { id: "outdoors", label: "Outdoors", description: "Durability and endurance first." },
      { id: "hybrid-work", label: "Desk + life", description: "General smartwatch balance." }
    ],
    hardConstraints: [
      { id: "apple-ecosystem", label: "Must work with Apple ecosystem", description: "Favor Apple-friendly fit." },
      { id: "lightweight-only", label: "Lightweight only", description: "Bias toward easier daily wear." },
      { id: "avoid-expensive-upgrades", label: "Avoid expensive upgrades", description: "Penalize premium-tier pressure." },
      { id: "best-battery-life", label: "Best battery life", description: "Reward endurance aggressively." },
      { id: "no-refurbished-products", label: "No refurbished products", description: "Keep the shortlist new-only." }
    ],
    commonMarketingNoise: [
      "Battery and comfort beat flashy case materials.",
      "Extra adventure branding often matters less than battery and comfort.",
      "If you're mostly after notifications and rings, the top-tier watch can be overkill."
    ]
  }
};

export const emptyPriorityWeights: PriorityWeights = {
  performance: 40,
  battery: 40,
  portability: 40,
  camera: 40,
  display: 40,
  gaming: 40,
  longevity: 40,
  value: 40,
  audio: 40,
  comfort: 40,
  health: 40,
  software: 40
};
