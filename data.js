window.TechChoiceData = {
  snapshotDate: "April 10, 2026",
  priorities: {
    Phone: [
      {
        id: "performance",
        label: "Performance",
        blurb: "Gaming, editing, and heavy multitasking."
      },
      {
        id: "camera",
        label: "Camera & content",
        blurb: "Photo, video, zoom, and creator quality."
      },
      {
        id: "battery",
        label: "Battery life",
        blurb: "How safely it handles a full day."
      },
      {
        id: "portability",
        label: "Portability",
        blurb: "Pocket comfort, size, and carry ease."
      },
      {
        id: "ecosystem",
        label: "Ecosystem fit",
        blurb: "How much the surrounding platform matters."
      },
      {
        id: "ai",
        label: "AI features",
        blurb: "Assistant, productivity, and search workflows."
      }
    ],
    Laptop: [
      {
        id: "performance",
        label: "Performance",
        blurb: "Compiling, editing, rendering, and multitasking."
      },
      {
        id: "battery",
        label: "Battery life",
        blurb: "Staying productive away from the charger."
      },
      {
        id: "portability",
        label: "Portability",
        blurb: "Weight, footprint, and travel comfort."
      },
      {
        id: "creativity",
        label: "Creative work",
        blurb: "Display quality and media-friendly capability."
      },
      {
        id: "ecosystem",
        label: "Ecosystem fit",
        blurb: "How much the surrounding platform matters."
      },
      {
        id: "ai",
        label: "AI productivity",
        blurb: "NPU-led workflows and smart assistance."
      }
    ],
    Hybrid: [
      {
        id: "performance",
        label: "Performance",
        blurb: "Responsiveness for mixed laptop-tablet work."
      },
      {
        id: "battery",
        label: "Battery life",
        blurb: "How long the device lasts on the move."
      },
      {
        id: "portability",
        label: "Portability",
        blurb: "Weight and one-handed mobility."
      },
      {
        id: "flexibility",
        label: "Flexibility",
        blurb: "How well it adapts to keyboard, pen, and touch."
      },
      {
        id: "ecosystem",
        label: "Ecosystem fit",
        blurb: "Integration with the rest of your setup."
      },
      {
        id: "ai",
        label: "AI productivity",
        blurb: "NPU-led workflows and assistant features."
      }
    ]
  },
  presets: [
    {
      id: "student",
      label: "Student",
      description: "Budget-aware, battery-first, low regret.",
      settings: {
        budget: 900,
        style: "value",
        primary: "battery",
        secondary: "portability",
        dealSensitivity: 75
      }
    },
    {
      id: "creator",
      label: "Creator",
      description: "Performance and creative output over pure thrift.",
      settings: {
        budget: 1500,
        style: "premium",
        primary: "camera",
        secondary: "performance",
        dealSensitivity: 35
      }
    },
    {
      id: "traveler",
      label: "Road warrior",
      description: "Carry comfort, battery, and dependable fit.",
      settings: {
        budget: 1300,
        style: "balanced",
        primary: "portability",
        secondary: "battery",
        dealSensitivity: 50
      }
    },
    {
      id: "power",
      label: "Power user",
      description: "Top-tier speed with lighter budget pressure.",
      settings: {
        budget: 1900,
        style: "premium",
        primary: "performance",
        secondary: "ai",
        dealSensitivity: 20
      }
    }
  ],
  companies: {
    Apple: {
      tone: "Premium ladder, firm pricing, ecosystem pull.",
      coreStrategy:
        "Apple generally protects headline pricing and uses trade-in, financing, and carrier bill credits to reduce sticker shock while keeping its premium ladder intact.",
      pricingPlaybook: [
        "Relies on trade-in and monthly financing more than headline discounting.",
        "Builds a clean step-up ladder: entry, mainstream, design-led premium, then Pro.",
        "Uses Apple Intelligence and cross-device continuity to justify moving up the stack."
      ],
      optimizationAngle:
        "Apple tends to optimize for long-term customer lifetime value: ecosystem lock-in, resale confidence, and support consistency more than raw specs-per-dollar.",
      sourceKeys: ["apple-iphone", "apple-mac"]
    },
    Samsung: {
      tone: "Broad coverage, aggressive direct-store promotions, spec leadership.",
      coreStrategy:
        "Samsung covers more price tiers directly and leans much harder on launch promos, trade-in credits, and bundle-style value to make flagship hardware feel more attainable.",
      pricingPlaybook: [
        "Uses aggressive instant trade-in credits and direct-store pricing promos.",
        "Makes Galaxy AI a shared narrative across the lineup while keeping clear spec jumps between FE, base, Edge, and Ultra.",
        "Pushes form-factor differentiation: value, mainstream flagship, slim premium, and no-compromise Ultra."
      ],
      optimizationAngle:
        "Samsung is often optimizing for visible hardware advantage per dollar and quick conversion at the moment of purchase, especially for people willing to trade in a device.",
      sourceKeys: ["samsung-s25", "samsung-s25-fe", "samsung-s25-edge", "samsung-s25-ultra"]
    },
    Google: {
      tone: "AI-first positioning, strong camera story, clean Android value.",
      coreStrategy:
        "Google tends to pair AI-heavy messaging with camera credibility and then sweeten the pitch through trade-in, financing, and periodic direct-store promos.",
      pricingPlaybook: [
        "Frames Gemini and on-device assistance as reasons to upgrade, not just specs.",
        "Keeps a clear value path from A-series through Pro and Fold.",
        "Highlights long software support and trade-in convenience to reduce platform-switch friction."
      ],
      optimizationAngle:
        "Google is optimizing for perceived intelligence and everyday helpfulness. The best fits show up when AI workflows, camera quality, and update longevity matter more than brand prestige alone.",
      sourceKeys: ["google-phones", "google-pixel-10", "google-pixel-10-pro", "google-pixel-fold"]
    },
    Microsoft: {
      tone: "Copilot+ productivity, price protection, Windows flexibility.",
      coreStrategy:
        "Microsoft positions Surface around Copilot+ productivity, battery, portability, and Windows flexibility, then reduces hesitation with price protection, trade-in, and free-return policies.",
      pricingPlaybook: [
        "Uses temporary promos and price-protection language to reassure buyers.",
        "Splits the line by work style: portable laptop, larger-screen laptop, and flexible 2-in-1.",
        "Leans hard into Copilot+ PC and NPU messaging as the new reason to refresh."
      ],
      optimizationAngle:
        "Microsoft is optimizing for productivity confidence. Surface works best when you want Windows, touch or pen flexibility, and a clear AI-PC story without moving into gaming-laptop territory.",
      sourceKeys: ["microsoft-laptop-13", "microsoft-laptop-15", "microsoft-pro-12", "microsoft-pro-13"]
    }
  },
  sources: {
    "apple-iphone": {
      label: "Apple Buy iPhone",
      url: "https://www.apple.com/shop/buy-iphone",
      note:
        "Official Apple Store page used for iPhone lineup pricing, trade-in language, and carrier-bill-credit positioning."
    },
    "apple-mac": {
      label: "Apple Buy Mac",
      url: "https://www.apple.com/shop/buy-mac",
      note:
        "Official Apple Store page used for MacBook pricing and Apple Intelligence positioning."
    },
    "samsung-s25": {
      label: "Samsung Galaxy S25",
      url: "https://www.samsung.com/us/smartphones/galaxy-s25/",
      note:
        "Official Samsung product page used for Galaxy AI framing, pricing references, and direct-buy incentives."
    },
    "samsung-s25-fe": {
      label: "Samsung Galaxy S25 FE",
      url: "https://www.samsung.com/us/smartphones/galaxy-s25-fe/",
      note:
        "Official Samsung page used for FE-tier pricing and value-oriented lineup placement."
    },
    "samsung-s25-edge": {
      label: "Samsung Galaxy S25 Edge",
      url: "https://www.samsung.com/us/smartphones/galaxy-s25-edge/",
      note:
        "Official Samsung page used for slim-design premium positioning and current pricing reference."
    },
    "samsung-s25-ultra": {
      label: "Samsung Galaxy S25 Ultra",
      url: "https://www.samsung.com/us/smartphones/galaxy-s25-ultra/",
      note:
        "Official Samsung page used for Ultra-tier pricing, camera leadership, and promo references."
    },
    "google-phones": {
      label: "Google Store Phones",
      url: "https://store.google.com/us/category/phones?hl=en-US",
      note:
        "Official Google Store category page used for current lineup structure and comparative phone positioning."
    },
    "google-pixel-10": {
      label: "Google Pixel 10",
      url: "https://store.google.com/us/product/pixel_10?hl=en-US",
      note:
        "Official Google Store page used for Pixel 10 pricing, Gemini messaging, and support claims."
    },
    "google-pixel-10-pro": {
      label: "Google Pixel 10 Pro",
      url: "https://store.google.com/us/product/pixel_10_pro?hl=en-US",
      note:
        "Official Google Store page used for Pixel 10 Pro pricing and premium AI-camera positioning."
    },
    "google-pixel-fold": {
      label: "Google Pixel 10 Pro Fold",
      url: "https://store.google.com/us/product/pixel_10_pro_fold?hl=en-US",
      note:
        "Official Google Store page used for foldable-tier pricing and multitasking positioning."
    },
    "microsoft-laptop-13": {
      label: "Microsoft Surface Laptop 13-inch",
      url: "https://www.microsoft.com/en-us/d/surface-laptop-copilot-pc-13-inch/8mzbmmcjzqv3",
      note:
        "Official Microsoft Store page used for 13-inch Surface Laptop pricing, battery claims, and trade-in/price-protection policy."
    },
    "microsoft-laptop-15": {
      label: "Microsoft Surface Laptop 15-inch",
      url: "https://www.microsoft.com/en-us/store/configure/surface-laptop-15-inch/8mzbmmcjzqc4/",
      note:
        "Official Microsoft Store page used for 15-inch Surface Laptop pricing and current promo detail."
    },
    "microsoft-pro-12": {
      label: "Microsoft Surface Pro 12-inch",
      url: "https://www.microsoft.com/en-us/d/surface-pro-copilot-pc-12-inch/8mzbmmcjzqv2",
      note:
        "Official Microsoft Store page used for Surface Pro 12 pricing and flexibility/AI positioning."
    },
    "microsoft-pro-13": {
      label: "Microsoft Surface Pro 13-inch",
      url: "https://www.microsoft.com/en-us/d/surface-pro-copilot-pc/8N9T09P96CMJ/0CJ3",
      note:
        "Official Microsoft Store page used for Surface Pro 13 pricing reference and Copilot+ positioning."
    }
  },
  products: [
    {
      id: "apple-iphone-17e",
      company: "Apple",
      category: "Phone",
      name: "iPhone 17e",
      shortName: "17e",
      listPrice: 599,
      salePrice: 599,
      priceNote: "Entry Apple phone tier with Apple Trade In and carrier-credit messaging.",
      tier: "Entry",
      value: 84,
      styleFit: { value: 94, balanced: 76, premium: 58 },
      attributes: {
        performance: 75,
        camera: 74,
        battery: 78,
        portability: 88,
        ecosystem: 97,
        ai: 78
      },
      summary:
        "The lowest-friction way into the current Apple phone stack if ecosystem fit matters more than max camera ambition.",
      highlight:
        "Strong Apple baseline without paying for Pro features you may not use.",
      watchout:
        "The camera and display story are clearly weaker than the Air and Pro tiers.",
      sourceKeys: ["apple-iphone"]
    },
    {
      id: "apple-iphone-17",
      company: "Apple",
      category: "Phone",
      name: "iPhone 17",
      shortName: "17",
      listPrice: 799,
      salePrice: 799,
      priceNote: "Standard flagship rung with Apple financing and carrier bill-credit support.",
      tier: "Mainstream",
      value: 82,
      styleFit: { value: 82, balanced: 94, premium: 70 },
      attributes: {
        performance: 84,
        camera: 84,
        battery: 83,
        portability: 86,
        ecosystem: 98,
        ai: 80
      },
      summary:
        "Balanced Apple flagship for buyers who want a safe long-term choice without crossing into Pro pricing.",
      highlight:
        "Best all-around Apple phone for most buyers who want minimal downside.",
      watchout:
        "If camera or zoom matters a lot, the Pro tier is where Apple concentrates its real flex.",
      sourceKeys: ["apple-iphone"]
    },
    {
      id: "apple-iphone-air",
      company: "Apple",
      category: "Phone",
      name: "iPhone Air",
      shortName: "Air",
      listPrice: 999,
      salePrice: 999,
      priceNote: "Design-led premium step-up with the same trade-in and carrier-credit playbook.",
      tier: "Design premium",
      value: 73,
      styleFit: { value: 60, balanced: 86, premium: 92 },
      attributes: {
        performance: 86,
        camera: 88,
        battery: 74,
        portability: 97,
        ecosystem: 98,
        ai: 83
      },
      summary:
        "Apple's design-first premium option for people who care about thinness and feel as much as raw output.",
      highlight:
        "The strongest Apple choice when portability and industrial design are your main levers.",
      watchout:
        "Battery headroom is the main compromise compared with the larger Pro phones.",
      sourceKeys: ["apple-iphone"]
    },
    {
      id: "apple-iphone-17-pro",
      company: "Apple",
      category: "Phone",
      name: "iPhone 17 Pro",
      shortName: "17 Pro",
      listPrice: 1099,
      salePrice: 1099,
      priceNote: "Apple's core Pro-tier price point; discounts usually show up as credits, not markdowns.",
      tier: "Pro",
      value: 76,
      styleFit: { value: 56, balanced: 82, premium: 98 },
      attributes: {
        performance: 95,
        camera: 96,
        battery: 89,
        portability: 78,
        ecosystem: 99,
        ai: 86
      },
      summary:
        "The right Apple phone when you genuinely want Pro-level camera and compute instead of just a nicer badge.",
      highlight:
        "Apple's cleanest no-compromise pick without stepping into the largest chassis.",
      watchout:
        "You pay real money for the Pro ladder, and Apple is less likely to cut the headline price.",
      sourceKeys: ["apple-iphone"]
    },
    {
      id: "apple-macbook-neo",
      company: "Apple",
      category: "Laptop",
      name: "MacBook Neo",
      shortName: "MacBook Neo",
      listPrice: 599,
      salePrice: 599,
      priceNote: "New Apple entry laptop tier that opens the Mac ladder at a much lower price.",
      tier: "Entry",
      value: 88,
      styleFit: { value: 95, balanced: 74, premium: 52 },
      attributes: {
        performance: 70,
        battery: 82,
        portability: 95,
        creativity: 72,
        ecosystem: 97,
        ai: 79
      },
      summary:
        "A low-cost Mac door into the Apple stack, especially appealing for students or basic productivity work.",
      highlight:
        "Unusually strong Apple value if your workload is light and portability matters.",
      watchout:
        "This is not the right pick if you expect sustained creative or pro-class performance.",
      sourceKeys: ["apple-mac"]
    },
    {
      id: "apple-macbook-air",
      company: "Apple",
      category: "Laptop",
      name: "MacBook Air",
      shortName: "Air",
      listPrice: 1099,
      salePrice: 1099,
      priceNote: "Mainstream Mac notebook rung with Apple Intelligence and ecosystem messaging.",
      tier: "Mainstream",
      value: 82,
      styleFit: { value: 82, balanced: 96, premium: 72 },
      attributes: {
        performance: 88,
        battery: 94,
        portability: 92,
        creativity: 85,
        ecosystem: 98,
        ai: 83
      },
      summary:
        "The safest Mac recommendation if you want long battery life, low weight, and a strong everyday performance floor.",
      highlight:
        "Apple's best balance of mobility, battery, and long-horizon ownership confidence.",
      watchout:
        "If your work routinely pushes sustained thermals or heavier media pipelines, the Pro tier still separates itself.",
      sourceKeys: ["apple-mac"]
    },
    {
      id: "apple-macbook-pro",
      company: "Apple",
      category: "Laptop",
      name: "MacBook Pro",
      shortName: "Pro",
      listPrice: 1699,
      salePrice: 1699,
      priceNote: "Pro-tier Mac pricing with Apple holding list price and selling the step-up on workflow gains.",
      tier: "Pro",
      value: 70,
      styleFit: { value: 50, balanced: 82, premium: 98 },
      attributes: {
        performance: 99,
        battery: 90,
        portability: 72,
        creativity: 96,
        ecosystem: 98,
        ai: 86
      },
      summary:
        "The Mac choice when you know you'll use the headroom for serious creative or engineering work.",
      highlight:
        "High-ceiling Apple laptop for demanding workflows where the Air would eventually feel constrained.",
      watchout:
        "You're paying for capability and display quality more than pure portability or thrift.",
      sourceKeys: ["apple-mac"]
    },
    {
      id: "samsung-galaxy-s25-fe",
      company: "Samsung",
      category: "Phone",
      name: "Galaxy S25 FE",
      shortName: "S25 FE",
      listPrice: 649.99,
      salePrice: 649.99,
      priceNote: "Value-oriented Galaxy flagship tier built to keep Samsung in budget conversations.",
      tier: "Value flagship",
      value: 91,
      styleFit: { value: 96, balanced: 80, premium: 58 },
      attributes: {
        performance: 81,
        camera: 79,
        battery: 85,
        portability: 82,
        ecosystem: 76,
        ai: 84
      },
      summary:
        "Samsung's strongest value anchor if you want the Galaxy stack without paying for the Ultra's extremes.",
      highlight:
        "The cleanest Samsung pick when value and battery matter more than bragging rights.",
      watchout:
        "Camera ambition and premium finish still sit a step below the rest of the S25 ladder.",
      sourceKeys: ["samsung-s25-fe"]
    },
    {
      id: "samsung-galaxy-s25",
      company: "Samsung",
      category: "Phone",
      name: "Galaxy S25",
      shortName: "S25",
      listPrice: 799.99,
      salePrice: 719.99,
      priceNote: "Direct Samsung pricing was observed below MSRP, with trade-in messaging active.",
      tier: "Mainstream",
      value: 84,
      styleFit: { value: 82, balanced: 95, premium: 72 },
      attributes: {
        performance: 87,
        camera: 85,
        battery: 86,
        portability: 89,
        ecosystem: 77,
        ai: 87
      },
      summary:
        "A balanced Galaxy flagship that benefits the most when Samsung is actively promoting direct-store pricing.",
      highlight:
        "The safest Samsung recommendation for most people, especially when promos narrow the gap to the FE.",
      watchout:
        "If you really care about top-tier zoom or pen workflows, Samsung keeps those concentrated in the Ultra.",
      sourceKeys: ["samsung-s25"]
    },
    {
      id: "samsung-galaxy-s25-edge",
      company: "Samsung",
      category: "Phone",
      name: "Galaxy S25 Edge",
      shortName: "S25 Edge",
      listPrice: 1099.99,
      salePrice: 1099.99,
      priceNote: "Premium slim-design position inside the S25 ladder.",
      tier: "Design premium",
      value: 69,
      styleFit: { value: 50, balanced: 82, premium: 96 },
      attributes: {
        performance: 89,
        camera: 86,
        battery: 73,
        portability: 97,
        ecosystem: 77,
        ai: 85
      },
      summary:
        "Samsung's thin-and-light prestige phone for buyers who care about industrial design first.",
      highlight:
        "The right Samsung choice when you want a dramatic design statement without jumping to the Ultra's bulk.",
      watchout:
        "Battery tradeoffs are the tax you pay for the form factor.",
      sourceKeys: ["samsung-s25-edge"]
    },
    {
      id: "samsung-galaxy-s25-ultra",
      company: "Samsung",
      category: "Phone",
      name: "Galaxy S25 Ultra",
      shortName: "S25 Ultra",
      listPrice: 1299.99,
      salePrice: 1169.99,
      priceNote: "Samsung has recently paired the Ultra with visible direct-store savings and trade-in incentives.",
      tier: "Ultra flagship",
      value: 78,
      styleFit: { value: 54, balanced: 80, premium: 99 },
      attributes: {
        performance: 99,
        camera: 99,
        battery: 96,
        portability: 64,
        ecosystem: 80,
        ai: 92
      },
      summary:
        "The Galaxy choice if you want Samsung's full feature story, especially camera reach and battery headroom.",
      highlight:
        "Most complete Samsung phone when price pressure matters less than capability ceiling.",
      watchout:
        "Size and carry comfort are the obvious compromise, even before you factor in price.",
      sourceKeys: ["samsung-s25-ultra"]
    },
    {
      id: "google-pixel-9a",
      company: "Google",
      category: "Phone",
      name: "Pixel 9a",
      shortName: "9a",
      listPrice: 499,
      salePrice: 499,
      priceNote: "A-series value anchor that keeps Pixel in the sub-$500 conversation.",
      tier: "Value flagship",
      value: 93,
      styleFit: { value: 98, balanced: 80, premium: 56 },
      attributes: {
        performance: 72,
        camera: 87,
        battery: 84,
        portability: 87,
        ecosystem: 73,
        ai: 84
      },
      summary:
        "The strongest Google pick when you care about practical value, camera quality, and update runway more than status.",
      highlight:
        "Exceptional value anchor in the Pixel stack, especially for budget-conscious buyers.",
      watchout:
        "It cannot match the top Pixel tiers on raw speed or premium materials.",
      sourceKeys: ["google-phones"]
    },
    {
      id: "google-pixel-10",
      company: "Google",
      category: "Phone",
      name: "Pixel 10",
      shortName: "10",
      listPrice: 799,
      salePrice: 799,
      priceNote: "Core Pixel tier with Gemini and 7-year update framing.",
      tier: "Mainstream",
      value: 85,
      styleFit: { value: 82, balanced: 95, premium: 72 },
      attributes: {
        performance: 85,
        camera: 90,
        battery: 87,
        portability: 86,
        ecosystem: 75,
        ai: 91
      },
      summary:
        "The steady middle of the Pixel line if you want Google's AI story without paying Pro money.",
      highlight:
        "Strong camera and AI mix with fewer compromises than the A-series.",
      watchout:
        "Google saves its best camera and premium hardware flex for the Pro line.",
      sourceKeys: ["google-phones", "google-pixel-10"]
    },
    {
      id: "google-pixel-10-pro",
      company: "Google",
      category: "Phone",
      name: "Pixel 10 Pro",
      shortName: "10 Pro",
      listPrice: 999,
      salePrice: 749,
      priceNote: "Observed on Google Store with a notable direct promo below MSRP.",
      tier: "Pro",
      value: 88,
      styleFit: { value: 84, balanced: 93, premium: 90 },
      attributes: {
        performance: 93,
        camera: 96,
        battery: 90,
        portability: 83,
        ecosystem: 76,
        ai: 98
      },
      summary:
        "The sharpest Pixel if you want Google's full AI pitch plus premium camera hardware and a strong direct-store deal.",
      highlight:
        "Combines Google's strongest AI story with a discount signal that materially improves value right now.",
      watchout:
        "At full MSRP it would be a more straightforward premium choice than a value choice.",
      sourceKeys: ["google-pixel-10-pro"]
    },
    {
      id: "google-pixel-10-pro-fold",
      company: "Google",
      category: "Phone",
      name: "Pixel 10 Pro Fold",
      shortName: "10 Pro Fold",
      listPrice: 1799,
      salePrice: 1499,
      priceNote: "Foldable flagship with multitasking-centric positioning and a visible promo below list.",
      tier: "Foldable flagship",
      value: 68,
      styleFit: { value: 36, balanced: 72, premium: 99 },
      attributes: {
        performance: 95,
        camera: 94,
        battery: 78,
        portability: 60,
        ecosystem: 78,
        ai: 99
      },
      summary:
        "Google's most ambitious phone if AI-heavy multitasking and foldable utility are worth paying for.",
      highlight:
        "The best Pixel when you actively want a foldable workflow and Google's top-tier AI stack.",
      watchout:
        "This is a premium-category purchase with real cost and portability penalties.",
      sourceKeys: ["google-pixel-fold"]
    },
    {
      id: "microsoft-surface-laptop-13",
      company: "Microsoft",
      category: "Laptop",
      name: "Surface Laptop 13-inch",
      shortName: "Laptop 13",
      listPrice: 899.99,
      salePrice: 899.99,
      priceNote: "Surface entry laptop tier with trade-in and price-protection messaging on Microsoft Store.",
      tier: "Portable productivity",
      value: 84,
      styleFit: { value: 92, balanced: 82, premium: 64 },
      attributes: {
        performance: 78,
        battery: 87,
        portability: 92,
        creativity: 74,
        ecosystem: 82,
        ai: 91
      },
      summary:
        "The cleanest Microsoft choice if you want Windows, Copilot+ features, and strong portability without overspending.",
      highlight:
        "Strong fit for practical laptop buyers who want a modern Windows ultraportable.",
      watchout:
        "Creative headroom is limited compared with larger and higher-spec machines.",
      sourceKeys: ["microsoft-laptop-13"]
    },
    {
      id: "microsoft-surface-laptop-15",
      company: "Microsoft",
      category: "Laptop",
      name: "Surface Laptop 15-inch",
      shortName: "Laptop 15",
      listPrice: 1299.99,
      salePrice: 1099.97,
      priceNote: "Observed on Microsoft Store with a current promo below list on select configurations.",
      tier: "Large-screen productivity",
      value: 79,
      styleFit: { value: 68, balanced: 88, premium: 92 },
      attributes: {
        performance: 92,
        battery: 92,
        portability: 70,
        creativity: 88,
        ecosystem: 82,
        ai: 92
      },
      summary:
        "A stronger Microsoft fit if you want more screen, more battery, and more sustained comfort than the 13-inch model provides.",
      highlight:
        "Good large-screen Windows productivity pick, especially when Microsoft's promo pricing is active.",
      watchout:
        "You trade away the most travel-friendly form factor for the added screen and battery comfort.",
      sourceKeys: ["microsoft-laptop-15"]
    },
    {
      id: "microsoft-surface-pro-12",
      company: "Microsoft",
      category: "Hybrid",
      name: "Surface Pro 12-inch",
      shortName: "Pro 12",
      listPrice: 799.99,
      salePrice: 799.99,
      priceNote: "Flexible 2-in-1 starting point; keyboard sold separately on Microsoft Store.",
      tier: "Flexible value hybrid",
      value: 84,
      styleFit: { value: 92, balanced: 84, premium: 70 },
      attributes: {
        performance: 80,
        battery: 74,
        portability: 94,
        flexibility: 97,
        ecosystem: 82,
        ai: 91
      },
      summary:
        "Microsoft's best value 2-in-1 if pen, touch, and keyboard flexibility matter more than max battery life.",
      highlight:
        "Excellent hybrid choice when portability and workflow flexibility are both central.",
      watchout:
        "Remember the keyboard and charger details when comparing total cost.",
      sourceKeys: ["microsoft-pro-12"]
    },
    {
      id: "microsoft-surface-pro-13",
      company: "Microsoft",
      category: "Hybrid",
      name: "Surface Pro 13-inch",
      shortName: "Pro 13",
      listPrice: 899.99,
      salePrice: 899.99,
      priceNote: "Copilot+ 2-in-1 tier positioned above the 12-inch model for buyers who want more room and premium polish.",
      tier: "Premium hybrid",
      value: 82,
      styleFit: { value: 82, balanced: 92, premium: 86 },
      attributes: {
        performance: 86,
        battery: 80,
        portability: 88,
        flexibility: 95,
        ecosystem: 82,
        ai: 93
      },
      summary:
        "The stronger Surface Pro if you want a 2-in-1 but do not want the 12-inch model's tighter limits.",
      highlight:
        "Best all-around Surface hybrid when you want tablet flexibility without feeling underpowered.",
      watchout:
        "Once accessories are included, the total spend can approach stronger clamshell laptops.",
      sourceKeys: ["microsoft-pro-13"]
    }
  ]
};
