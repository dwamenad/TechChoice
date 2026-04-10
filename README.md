# TechChoice

TechChoice is a consumer tech decision engine. It helps users choose the right product by scoring devices against budget, priorities, ecosystem fit, and hard constraints.

The app is built with:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zustand
- motion
- local reusable UI components
- deterministic mock data and scoring logic

## What it does

Users:

1. pick a category
2. set budget and budget mode
3. choose a primary use case
4. weight priorities
5. add hard constraints
6. get one best-fit recommendation plus value and premium alternatives

The results layer explains:

- why the top pick ranked first
- where premium pricing is justified
- which marketing claims probably do not matter
- which options are weak value

## Routes

- `/` home
- `/choose` guided flow
- `/results` recommendation output
- `/products` browse and compare
- `/about` methodology
- `/api/recommend` engine endpoint

## Local run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Data model

Shared types live in `lib/types/index.ts`.

Products include:

- category, brand, tier, and price
- score attributes such as performance, battery, display, camera, value, and longevity
- ecosystem tags and use-case tags
- strengths, tradeoffs, pricing-trap notes, and short summaries
- brand-pressure signals such as upsell pressure, lock-in pressure, and accessory burden

Decision profiles include:

- category
- brand preference
- budget
- budget flex
- primary use case
- ecosystem preference
- hard constraints
- priority weights

## Recommendation engine

The engine in `lib/recommendation-engine/engine.ts` is deterministic and transparent.

It:

1. selects products for the chosen category and optional brand
2. filters by hard constraints
3. computes weighted utility from category-specific priority dimensions
4. adds budget fit, use-case fit, ecosystem fit, longevity, and value adjustment
5. applies penalties for upsell pressure, accessory burden, and premium-anchor pressure
6. flags dominated options
7. returns the best fit, a cheaper value option, a premium option, and the comparison payload used by the UI

This is not a fake AI wrapper. The ranking is inspectable and rule-based.

## State and UI

State lives in `lib/state/decision-store.tsx`.

Zustand stores:

- the current step
- the active decision profile
- the last computed result
- saved sessions
- local hydration state

The UI is split across:

- `components/choose/` for the guided flow
- `components/results/` for the recommendation output
- `components/products/` for browse and manual compare
- `components/ui/` for local primitives such as slider, card, badge, progress, and table

## Project structure

- `app/` routes and route handler
- `components/` route surfaces and UI primitives
- `lib/mock-data/` seeded categories, products, and defaults
- `lib/recommendation-engine/` scoring and ranking
- `lib/brand-strategy/` brand insight helpers
- `lib/state/` Zustand store and persistence
- `lib/types/` shared contracts
- `lib/utils/` formatting and URL-state helpers

## Mock data

The current seeded catalog includes:

- smartphones
- laptops
- tablets
- headphones
- smartwatches

Brands include Apple, Samsung, Google, Microsoft, Dell, Lenovo, Sony, Bose, and Garmin.

This app uses mock data. It does not claim live prices, stock, or retailer integrations.

## Replacing mock data later

The seams are already isolated:

- replace `lib/mock-data/products.ts` with a normalized live feed
- keep `lib/types/index.ts` as the product contract
- keep `lib/recommendation-engine/engine.ts` as the ranking layer
- expand `app/api/recommend/route.ts` to fetch or hydrate live pricing before scoring

## Suggested next steps

1. Add tests for scoring, filtering, and dominated-option detection.
2. Add schema validation for product feeds and profile payloads.
3. Replace the mock catalog with live product and pricing data.
4. Add authenticated cloud-saved sessions.
5. Add analytics and reliability signals.

## Notes

- Draft decisions and saved sessions persist locally in the browser.
- Results are shareable through URL parameters.
- The API route returns the same deterministic output used by the UI.
