# TechChoice

TechChoice is a no-build static web app that recommends the strongest current tech product inside a selected company lineup.

It combines:

- official store pricing snapshots
- inferred marketing and pricing tactics from official product pages
- a user-configurable scoring model for budget, buying posture, and priorities

## Run it

You can open `index.html` directly in a browser, but a local server is cleaner:

```bash
cd "/Users/kwakufinest/Documents/New project/TechChoice"
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## What is inside

- `index.html`: app shell
- `styles.css`: visual system and layout
- `data.js`: product dataset, company strategy notes, and source trail
- `app.js`: recommendation engine and rendering logic

## Scoring model

The recommendation score blends:

- feature match against the chosen priorities
- budget fit against the current ceiling
- baseline value score for the product tier
- style fit for `Value`, `Balanced`, or `Premium` posture
- current deal signal when official pricing is below observed list price

## Source notes

Snapshot date for the current seed data: **April 10, 2026**

The app uses official store or product pages for pricing and lineup structure. Company strategy summaries are inference from those official pages, not third-party analyst commentary.

Official source links used in the seed dataset:

- Apple Buy iPhone: <https://www.apple.com/shop/buy-iphone>
- Apple Buy Mac: <https://www.apple.com/shop/buy-mac>
- Samsung Galaxy S25: <https://www.samsung.com/us/smartphones/galaxy-s25/>
- Samsung Galaxy S25 FE: <https://www.samsung.com/us/smartphones/galaxy-s25-fe/>
- Samsung Galaxy S25 Edge: <https://www.samsung.com/us/smartphones/galaxy-s25-edge/>
- Samsung Galaxy S25 Ultra: <https://www.samsung.com/us/smartphones/galaxy-s25-ultra/>
- Google Store Phones: <https://store.google.com/us/category/phones?hl=en-US>
- Google Pixel 10: <https://store.google.com/us/product/pixel_10?hl=en-US>
- Google Pixel 10 Pro: <https://store.google.com/us/product/pixel_10_pro?hl=en-US>
- Google Pixel 10 Pro Fold: <https://store.google.com/us/product/pixel_10_pro_fold?hl=en-US>
- Microsoft Surface Laptop 13-inch: <https://www.microsoft.com/en-us/d/surface-laptop-copilot-pc-13-inch/8mzbmmcjzqv3>
- Microsoft Surface Laptop 15-inch: <https://www.microsoft.com/en-us/store/configure/surface-laptop-15-inch/8mzbmmcjzqc4/>
- Microsoft Surface Pro 12-inch: <https://www.microsoft.com/en-us/d/surface-pro-copilot-pc-12-inch/8mzbmmcjzqv2>
- Microsoft Surface Pro 13-inch: <https://www.microsoft.com/en-us/d/surface-pro-copilot-pc/8N9T09P96CMJ/0CJ3>
