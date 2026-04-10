(function () {
  const data = window.TechChoiceData;

  const styleOptions = [
    {
      id: "value",
      label: "Value",
      description: "Favor lower spend, headroom, and practical value."
    },
    {
      id: "balanced",
      label: "Balanced",
      description: "Aim for the safest all-around fit."
    },
    {
      id: "premium",
      label: "Premium",
      description: "Pay for a better ceiling when it is justified."
    }
  ];

  const styleBias = {
    value: {
      performance: 0.95,
      battery: 1.05,
      portability: 1.05,
      camera: 0.95,
      creativity: 0.95,
      flexibility: 1.0,
      ecosystem: 0.95,
      ai: 0.95
    },
    balanced: {
      performance: 1.05,
      battery: 1.05,
      portability: 1.0,
      camera: 1.05,
      creativity: 1.0,
      flexibility: 1.0,
      ecosystem: 1.0,
      ai: 1.0
    },
    premium: {
      performance: 1.18,
      battery: 1.06,
      portability: 0.96,
      camera: 1.18,
      creativity: 1.15,
      flexibility: 1.1,
      ecosystem: 1.05,
      ai: 1.08
    }
  };

  const baseWeights = {
    performance: 1.1,
    camera: 1.0,
    battery: 1.0,
    portability: 0.95,
    ecosystem: 0.92,
    ai: 0.95,
    creativity: 1.0,
    flexibility: 1.0
  };

  const reasonCopy = {
    performance: "it is one of the stronger performance picks in this lineup",
    camera: "it leans harder into photo and content quality than most peers here",
    battery: "battery endurance is one of its safer bets",
    portability: "it keeps carry comfort high without giving away too much",
    ecosystem: "the surrounding platform fit is a real advantage if you stay inside this brand",
    ai: "its AI and workflow features are central rather than superficial",
    creativity: "it is better aligned with display-heavy and creative work",
    flexibility: "the form factor adapts better to touch, pen, and mixed-use workflows"
  };

  const state = {
    company: "Apple",
    category: "Phone",
    budget: 1200,
    style: "balanced",
    primary: "performance",
    secondary: "battery",
    dealSensitivity: 55,
    selectedProductId: null,
    selectedPresetId: null
  };

  const elements = {
    heroMetrics: document.getElementById("heroMetrics"),
    presetGrid: document.getElementById("presetGrid"),
    companySelect: document.getElementById("companySelect"),
    categorySelect: document.getElementById("categorySelect"),
    budgetRange: document.getElementById("budgetRange"),
    budgetNumber: document.getElementById("budgetNumber"),
    budgetValue: document.getElementById("budgetValue"),
    styleSegment: document.getElementById("styleSegment"),
    primaryPriority: document.getElementById("primaryPriority"),
    secondaryPriority: document.getElementById("secondaryPriority"),
    dealSensitivity: document.getElementById("dealSensitivity"),
    dealSensitivityValue: document.getElementById("dealSensitivityValue"),
    contextHint: document.getElementById("contextHint"),
    winnerPanel: document.getElementById("winnerPanel"),
    resultsList: document.getElementById("resultsList"),
    intelligencePanel: document.getElementById("intelligencePanel"),
    sourcesPanel: document.getElementById("sourcesPanel")
  };

  function currency(value) {
    const maximumFractionDigits = Number.isInteger(value) ? 0 : 2;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits
    }).format(value);
  }

  function percent(value) {
    return `${Math.round(value)}%`;
  }

  function sentenceCase(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function getCompanyNames() {
    return Object.keys(data.companies);
  }

  function getCompanyCategories(company) {
    return [...new Set(
      data.products
        .filter((product) => product.company === company)
        .map((product) => product.category)
    )];
  }

  function getLineup(company, category) {
    return data.products.filter(
      (product) => product.company === company && product.category === category
    );
  }

  function getPriorityOptions(category) {
    return data.priorities[category] || [];
  }

  function dealScore(product) {
    if (!product.listPrice || product.listPrice <= product.salePrice) {
      return 0;
    }
    return ((product.listPrice - product.salePrice) / product.listPrice) * 100;
  }

  function budgetFit(product) {
    const budget = Math.max(state.budget, 1);
    const price = product.salePrice;
    if (price <= budget) {
      const ratio = price / budget;
      const target = state.style === "value" ? 0.72 : state.style === "balanced" ? 0.88 : 0.97;
      const distance = Math.min(Math.abs(ratio - target) / target, 1);
      return 68 + (1 - distance) * 32;
    }
    const overRatio = (price - budget) / budget;
    return Math.max(8, 62 - overRatio * 115);
  }

  function buildWeights(category) {
    const options = getPriorityOptions(category);
    const weights = {};

    options.forEach((option) => {
      const id = option.id;
      let weight = baseWeights[id] || 1;

      if (state.primary === id) {
        weight += 0.9;
      }

      if (state.secondary === id) {
        weight += 0.45;
      }

      weight *= styleBias[state.style][id] || 1;
      weights[id] = weight;
    });

    return weights;
  }

  function scoreProduct(product, lineup) {
    const weights = buildWeights(product.category);
    const weightEntries = Object.entries(weights);
    const featureTotal = weightEntries.reduce(
      (sum, [feature, weight]) => sum + (product.attributes[feature] || 50) * weight,
      0
    );
    const weightTotal = weightEntries.reduce((sum, [, weight]) => sum + weight, 0);
    const featureScore = featureTotal / weightTotal;
    const budgetScore = budgetFit(product);
    const currentDeal = dealScore(product);
    const styleScore = product.styleFit[state.style];
    const valueScore = product.value;
    const dealInfluence = currentDeal * (0.24 + state.dealSensitivity / 140);

    const overall =
      featureScore * 0.56 +
      budgetScore * 0.18 +
      valueScore * 0.1 +
      styleScore * 0.1 +
      dealInfluence * 0.06;

    const breakdown = {
      "Feature match": featureScore,
      "Budget fit": budgetScore,
      "Value floor": valueScore,
      "Style fit": styleScore,
      "Current deal": Math.min(100, currentDeal * 3.2)
    };

    const relative = {};
    Object.keys(weights).forEach((feature) => {
      const values = lineup.map((item) => item.attributes[feature] || 50);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const current = product.attributes[feature] || 50;
      relative[feature] = max === min ? 100 : ((current - min) / (max - min)) * 100;
    });

    return {
      product,
      score: Math.round(overall),
      breakdown,
      featureScore,
      budgetScore,
      currentDeal,
      styleScore,
      valueScore,
      relative
    };
  }

  function buildReasons(result) {
    const reasons = [];
    const topFeatureEntries = Object.entries(result.relative)
      .sort((a, b) => b[1] - a[1])
      .filter(([, value]) => value >= 55)
      .slice(0, 2);

    if (result.budgetScore >= 78 && result.product.salePrice <= state.budget) {
      const headroom = Math.max(0, state.budget - result.product.salePrice);
      reasons.push(
        `${currency(result.product.salePrice)} stays inside your ceiling with ${currency(headroom)} of room.`
      );
    }

    if (result.currentDeal >= 10) {
      reasons.push(
        `The current official price signal is ${percent(result.currentDeal)} below list, which materially improves value.`
      );
    }

    if (result.styleScore >= 88) {
      reasons.push(
        `Its positioning closely matches a ${state.style} buying posture inside ${result.product.company}'s lineup.`
      );
    }

    topFeatureEntries.forEach(([feature]) => {
      reasons.push(sentenceCase(reasonCopy[feature]) + ".");
    });

    if (!reasons.length) {
      reasons.push("It balances the fewest tradeoffs against the rules you set.");
    }

    return reasons.slice(0, 4);
  }

  function buildTradeoffs(result) {
    const tradeoffs = [];
    const product = result.product;

    if (product.salePrice > state.budget) {
      tradeoffs.push(
        `${currency(product.salePrice - state.budget)} over your current ceiling before accessories or tax.`
      );
    }

    if ((product.attributes.portability || 100) < 75) {
      tradeoffs.push("Carry comfort is weaker than the smaller options in this same lineup.");
    }

    if ((product.attributes.battery || 100) < 76) {
      tradeoffs.push("Battery stamina is the clearest operational compromise here.");
    }

    if ((product.attributes.camera || 100) < 80 && product.category === "Phone") {
      tradeoffs.push("Camera ambition is not the strongest story inside this company stack.");
    }

    if ((product.attributes.creativity || 100) < 78 && product.category === "Laptop") {
      tradeoffs.push("It is less compelling for display-sensitive creative work than the next tier up.");
    }

    if (product.category === "Hybrid" && product.priceNote.toLowerCase().includes("keyboard")) {
      tradeoffs.push("Total cost can climb once keyboard and pen accessories are included.");
    }

    if (!tradeoffs.length) {
      tradeoffs.push(product.watchout);
    }

    return tradeoffs.slice(0, 3);
  }

  function renderHeroMetrics() {
    elements.heroMetrics.innerHTML = "";

    const metrics = [
      {
        value: String(getCompanyNames().length),
        label: "Major brands in the current seed dataset."
      },
      {
        value: String(data.products.length),
        label: "Curated products scored with pricing and positioning signals."
      },
      {
        value: data.snapshotDate,
        label: "Pricing snapshot date for the official source trail."
      }
    ];

    metrics.forEach((metric) => {
      const card = document.createElement("div");
      card.className = "metric-card";
      card.innerHTML = `<strong>${metric.value}</strong><span>${metric.label}</span>`;
      elements.heroMetrics.appendChild(card);
    });
  }

  function renderPresetButtons() {
    elements.presetGrid.innerHTML = "";

    data.presets.forEach((preset) => {
      const button = document.createElement("button");
      button.className = "preset-button";
      if (state.selectedPresetId === preset.id) {
        button.classList.add("active");
      }
      button.type = "button";
      button.innerHTML = `<strong>${preset.label}</strong><span>${preset.description}</span>`;
      button.addEventListener("click", () => {
        state.selectedPresetId = preset.id;
        Object.assign(state, preset.settings);
        syncPriorityOptions();
        syncBudgetInputs();
        renderPresetButtons();
        renderStyleSegment();
        render();
      });
      elements.presetGrid.appendChild(button);
    });
  }

  function renderCompanyOptions() {
    elements.companySelect.innerHTML = "";
    getCompanyNames().forEach((company) => {
      const option = document.createElement("option");
      option.value = company;
      option.textContent = company;
      elements.companySelect.appendChild(option);
    });
    elements.companySelect.value = state.company;
  }

  function syncCategoryOptions() {
    const categories = getCompanyCategories(state.company);

    if (!categories.includes(state.category)) {
      state.category = categories[0];
    }

    elements.categorySelect.innerHTML = "";
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      elements.categorySelect.appendChild(option);
    });
    elements.categorySelect.value = state.category;
  }

  function syncPriorityOptions() {
    const options = getPriorityOptions(state.category);
    const optionIds = options.map((option) => option.id);

    if (!optionIds.includes(state.primary)) {
      state.primary = optionIds[0];
    }

    if (!optionIds.includes(state.secondary) || state.secondary === state.primary) {
      state.secondary = optionIds.find((id) => id !== state.primary) || optionIds[0];
    }

    elements.primaryPriority.innerHTML = "";
    elements.secondaryPriority.innerHTML = "";

    options.forEach((option) => {
      const primaryOption = document.createElement("option");
      primaryOption.value = option.id;
      primaryOption.textContent = option.label;
      elements.primaryPriority.appendChild(primaryOption);

      const secondaryOption = document.createElement("option");
      secondaryOption.value = option.id;
      secondaryOption.textContent = option.label;
      elements.secondaryPriority.appendChild(secondaryOption);
    });

    elements.primaryPriority.value = state.primary;
    elements.secondaryPriority.value = state.secondary;
  }

  function renderStyleSegment() {
    elements.styleSegment.innerHTML = "";

    styleOptions.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option.label;
      if (state.style === option.id) {
        button.classList.add("active");
      }
      button.addEventListener("click", () => {
        state.style = option.id;
        state.selectedPresetId = null;
        renderPresetButtons();
        renderStyleSegment();
        render();
      });
      elements.styleSegment.appendChild(button);
    });
  }

  function syncBudgetInputs() {
    elements.budgetRange.value = String(state.budget);
    elements.budgetNumber.value = String(state.budget);
    elements.budgetValue.textContent = currency(state.budget);
  }

  function syncDealSensitivity() {
    elements.dealSensitivity.value = String(state.dealSensitivity);
    const descriptor =
      state.dealSensitivity < 35
        ? "Low"
        : state.dealSensitivity < 70
          ? "Medium"
          : "High";
    elements.dealSensitivityValue.textContent = `${descriptor} (${state.dealSensitivity})`;
  }

  function renderHint() {
    const company = data.companies[state.company];
    const priority = getPriorityOptions(state.category).find(
      (option) => option.id === state.primary
    );

    elements.contextHint.innerHTML = `
      <strong>${state.company} signal.</strong>
      <br />
      ${company.tone}
      <br /><br />
      <strong>Primary rule:</strong> ${priority.label} means TechChoice will over-weight ${priority.blurb.toLowerCase()}
    `;
  }

  function renderWinner(result) {
    const product = result.product;
    const reasons = buildReasons(result);
    const tradeoffs = buildTradeoffs(result);
    const breakdownEntries = Object.entries(result.breakdown);
    const tags = [
      product.tier,
      `${state.company} ${state.category.toLowerCase()} line`,
      result.currentDeal > 0 ? `${percent(result.currentDeal)} promo delta` : "Firm price signal"
    ];

    elements.winnerPanel.innerHTML = `
      <div class="winner-head">
        <div>
          <p class="section-kicker">Top recommendation</p>
          <h2>${product.name}</h2>
          <p class="winner-subtitle">${product.summary}</p>
        </div>
        <div class="score-pill">${result.score}/100</div>
      </div>
      <div class="winner-body">
        <div class="winner-copy">
          <div class="meta-row">
            <span class="meta-chip"><strong>Current price</strong> ${currency(product.salePrice)}</span>
            <span class="meta-chip"><strong>List</strong> ${currency(product.listPrice)}</span>
            <span class="meta-chip"><strong>Budget</strong> ${currency(state.budget)}</span>
          </div>
          <div class="tag-row">
            ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div>
            <p class="section-kicker">Why it wins</p>
            <ul class="reason-list">
              ${reasons.map((reason) => `<li>${reason}</li>`).join("")}
            </ul>
          </div>
          <div>
            <p class="section-kicker">Watchouts</p>
            <ul class="tradeoffs">
              ${tradeoffs.map((tradeoff) => `<li>${tradeoff}</li>`).join("")}
            </ul>
          </div>
          <p class="price-note"><strong>Pricing read:</strong> ${product.priceNote}</p>
        </div>
        <div>
          <p class="section-kicker">Score breakdown</p>
          <div class="score-grid">
            ${breakdownEntries
              .map(
                ([label, value]) => `
                  <div class="score-row">
                    <div class="score-row-head">
                      <span>${label}</span>
                      <strong>${Math.round(value)}</strong>
                    </div>
                    <div class="score-bar">
                      <div class="score-fill" style="width:${Math.max(4, Math.round(value))}%"></div>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderResults(results) {
    elements.resultsList.innerHTML = "";

    results.forEach((result, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "result-card";
      if (state.selectedProductId === result.product.id) {
        card.classList.add("active");
      }

      const dealLabel =
        result.currentDeal > 0
          ? `<span class="small-pill">${percent(result.currentDeal)} below list</span>`
          : `<span class="small-pill">No major markdown signal</span>`;

      card.innerHTML = `
        <div class="result-head">
          <span class="rank-badge">#${index + 1}</span>
          <div class="result-title">
            <h3>${result.product.name}</h3>
            <div class="tag-row">
              <span class="small-pill">${result.product.tier}</span>
              ${dealLabel}
            </div>
          </div>
          <div class="result-price">
            <strong>${currency(result.product.salePrice)}</strong>
            <span>Match ${result.score}/100</span>
          </div>
        </div>
        <p>${result.product.highlight}</p>
      `;

      card.addEventListener("click", () => {
        state.selectedProductId = result.product.id;
        render();
      });

      elements.resultsList.appendChild(card);
    });
  }

  function renderIntelligence(results) {
    const company = data.companies[state.company];
    const ladderMarkup = results
      .map((result) => {
        const maxPrice = Math.max(...results.map((item) => item.product.listPrice));
        const width = (result.product.salePrice / maxPrice) * 100;
        return `
          <div class="ladder-row">
            <div>
              <strong>${result.product.shortName}</strong>
            </div>
            <div class="ladder-bar">
              <div class="ladder-fill" style="width:${width}%"></div>
            </div>
            <div>
              <strong>${currency(result.product.salePrice)}</strong>
            </div>
          </div>
        `;
      })
      .join("");

    elements.intelligencePanel.innerHTML = `
      <div class="panel-head">
        <p class="section-kicker">${state.company} playbook</p>
        <h2>How this brand is selling you the ladder</h2>
      </div>
      <p class="snapshot-note">${company.coreStrategy}</p>
      <div class="intel-grid">
        <div class="intel-stack">
          <div class="strategy-box">
            <h3>Pricing and marketing reads</h3>
            <ul class="strategy-list">
              ${company.pricingPlaybook.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="strategy-box">
            <h3>Optimization angle</h3>
            <p>${company.optimizationAngle}</p>
          </div>
        </div>
        <div class="ladder-box">
          <h3>${state.category} price ladder</h3>
          <div class="price-ladder">${ladderMarkup}</div>
        </div>
      </div>
    `;
  }

  function renderSources() {
    const company = data.companies[state.company];
    const cards = company.sourceKeys
      .map((key) => data.sources[key])
      .filter(Boolean)
      .map(
        (source) => `
          <div class="source-card">
            <h3><a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a></h3>
            <p>${source.note}</p>
          </div>
        `
      )
      .join("");

    elements.sourcesPanel.innerHTML = `
      <p class="snapshot-note">
        Snapshot date: <strong>${data.snapshotDate}</strong>. Pricing and lineup notes come from official store or product pages. Strategy summaries are inference from how those official pages position the lineup, not third-party analyst reports.
      </p>
      <div class="source-grid">${cards}</div>
    `;
  }

  function render() {
    const lineup = getLineup(state.company, state.category);
    const results = lineup
      .map((product) => scoreProduct(product, lineup))
      .sort((a, b) => b.score - a.score);

    if (!results.length) {
      elements.winnerPanel.innerHTML = "<p>No products available for this selection.</p>";
      elements.resultsList.innerHTML = "";
      elements.intelligencePanel.innerHTML = "";
      elements.sourcesPanel.innerHTML = "";
      return;
    }

    if (!state.selectedProductId || !results.some((result) => result.product.id === state.selectedProductId)) {
      state.selectedProductId = results[0].product.id;
    }

    const selected = results.find((result) => result.product.id === state.selectedProductId) || results[0];

    renderHint();
    renderWinner(selected);
    renderResults(results);
    renderIntelligence(results);
    renderSources();
  }

  function bindEvents() {
    elements.companySelect.addEventListener("change", (event) => {
      state.company = event.target.value;
      state.selectedPresetId = null;
      syncCategoryOptions();
      syncPriorityOptions();
      renderPresetButtons();
      render();
    });

    elements.categorySelect.addEventListener("change", (event) => {
      state.category = event.target.value;
      state.selectedPresetId = null;
      syncPriorityOptions();
      renderPresetButtons();
      render();
    });

    elements.budgetRange.addEventListener("input", (event) => {
      state.budget = Number(event.target.value);
      state.selectedPresetId = null;
      syncBudgetInputs();
      renderPresetButtons();
      render();
    });

    elements.budgetNumber.addEventListener("input", (event) => {
      const nextValue = Number(event.target.value);
      if (Number.isFinite(nextValue)) {
        state.budget = Math.max(400, Math.min(2500, nextValue));
        state.selectedPresetId = null;
        syncBudgetInputs();
        renderPresetButtons();
        render();
      }
    });

    elements.primaryPriority.addEventListener("change", (event) => {
      state.primary = event.target.value;
      state.selectedPresetId = null;
      if (state.primary === state.secondary) {
        const nextSecondary = getPriorityOptions(state.category)
          .map((option) => option.id)
          .find((id) => id !== state.primary);
        state.secondary = nextSecondary || state.primary;
      }
      syncPriorityOptions();
      renderPresetButtons();
      render();
    });

    elements.secondaryPriority.addEventListener("change", (event) => {
      state.secondary = event.target.value;
      state.selectedPresetId = null;
      if (state.secondary === state.primary) {
        const nextSecondary = getPriorityOptions(state.category)
          .map((option) => option.id)
          .find((id) => id !== state.primary);
        state.secondary = nextSecondary || state.primary;
      }
      syncPriorityOptions();
      renderPresetButtons();
      render();
    });

    elements.dealSensitivity.addEventListener("input", (event) => {
      state.dealSensitivity = Number(event.target.value);
      state.selectedPresetId = null;
      syncDealSensitivity();
      renderPresetButtons();
      render();
    });
  }

  function init() {
    renderHeroMetrics();
    renderCompanyOptions();
    syncCategoryOptions();
    syncPriorityOptions();
    renderPresetButtons();
    renderStyleSegment();
    syncBudgetInputs();
    syncDealSensitivity();
    bindEvents();
    render();
  }

  init();
})();
