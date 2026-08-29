# Implementation Plan: Comparison Table

Generated: 2026-08-29
Feature spec: `.claude/features/feature-comparison-table/feature.md`

## Summary

A custom Shopify section that displays a side-by-side product comparison table. Rows compare the brand's product (Terra Therapy) against 4 competitors across 4 fixed attribute columns: "How it works", "What to consider", "Cost over time", "Side effects". On desktop, all columns are visible in a single grid. On mobile, the Solution column is pinned and the user swipes through the 4 attribute columns one at a time with pagination dots. Includes a real add-to-cart button using the Shopify cart API.

## Human-First Breakdown

### Admin Setup

No admin setup required. The section works entirely with theme code and section settings. The only required configuration is selecting a product in the theme customizer for the cart button — this is done in the section settings after the section is installed.

### Code Preparation (before any visitor touches the page)

1. The section file loads Figtree (Google Fonts), the section CSS, and the JS web component
2. The brand's product row is rendered from dedicated section settings (not a block) — always first, always highlighted dark olive
3. Competitor rows are rendered from schema blocks (up to N competitors, each with an image picker and 4 text fields)
4. On desktop: each row is a CSS grid with `grid-template-columns: 190px repeat(4, 1fr)` — the `.ct__col-viewport` and `.ct__col-track` divs use `display: contents` so their child cells participate directly in the parent row grid
5. On mobile: each row switches to `display: flex` — the `.ct__col-viewport` clips to show one content column, and `.ct__col-track` slides horizontally
6. Pagination dots (4) sit below the card, hidden on desktop
7. The cart button reads `data-variant-id` from a Liquid-resolved product picker setting — it is not rendered if no product is selected

### Live Behavior (when a user interacts)

**Desktop:**
1. Page loads — full 5-column table is visible
2. Terra Therapy row is visually highlighted (dark olive background, white text, background image)
3. User clicks ADD TO CART — button is disabled, POST to `/cart/add.js` fires
4. On success — `publish(PUB_SUB_EVENTS.cartUpdate)` triggers the existing cart drawer
5. On error — inline error message appears below the button for 4 seconds

**Mobile:**
1. Page loads — Solution column visible on left, "How it works" column on right, dot 1 active
2. User swipes left — all `.ct__col-track` elements slide in sync to the next column
3. Dots update to match active column
4. User taps a dot — jumps directly to that column
5. At first/last column — swipe in the exhausted direction is clamped (no wraparound)
6. ADD TO CART — same cart API behavior as desktop

## Files

### New Files
- `sections/section-comparison-table.liquid` — markup, schema, asset loading
- `assets/section-comparison-table.css` — all component styles
- `assets/comparison-table.js` — web component (carousel + cart)

### Asset Files (already in assets/)
- `ct-bg-ours.png` — background texture for the Terra Therapy row
- `ct-product-photo.png` — default product photo fallback
- `ct-logo-terra-therapy.png` — default brand logo fallback
- `ct-icon-sleeping-pills.png`, `ct-icon-pain-meds.png`, `ct-icon-chiropractor.png`, `ct-icon-supplements.png` — competitor icon fallbacks

### Modified Files
- None — section is fully self-contained

### Theme Components Reused
- `.page-width` — standard Dawn page container
- `publish()` + `PUB_SUB_EVENTS.cartUpdate` from `pubsub.js` / `constants.js` — triggers the existing cart drawer on successful add-to-cart
- `all_products[handle]` Liquid object — resolves the product picker setting to access `first_available_variant.id`
- Figtree + Recoleta fonts — same load pattern as the CPI section

## Build Steps

### Step 1: Section skeleton ✅ Complete

**Files:** `sections/section-comparison-table.liquid`, `assets/section-comparison-table.css`, `assets/comparison-table.js`

Section loads cleanly, schema fully defined, fonts load.

### Step 2: Markup — brand row + competitor blocks ✅ Complete

Brand row rendered from dedicated section settings (not a block). Competitor rows rendered from `section.blocks`. Fallback assets wired up when no image is uploaded.

**Key deviation from plan:** Brand row uses dedicated schema settings (`our_name`, `our_logo`, `our_product_image`, `our_row_bg`, `our_how_it_works`, etc.) rather than a first-block approach. This is strictly better — the brand row can never be accidentally reordered in the customizer.

### Step 3: Desktop CSS ✅ Complete

`grid-template-columns: 190px repeat(4, 1fr)` on `.ct__row`. `.ct__col-viewport` and `.ct__col-track` use `display: contents` so their child cells participate directly in the ancestor grid — clean, no wrappers to fight.

### Step 4: Mobile CSS ✅ Complete

Each `.ct__row` switches to `display: flex`. `.ct__col-viewport` clips to one column width. `.ct__col-track` is a flex row that slides with `transform: translateX`. Each track cell is `flex: 0 0 100%`.

### Step 5: Web component — carousel ✅ Complete

`comparison-table` custom element handles: dot clicks, swipe detection, synchronized `goTo()` across all `.ct__col-track` elements (one per row), `ResizeObserver` to recalculate offsets on viewport resize, `display: contents` guard to skip transforms on desktop.

### Step 6: Cart button ⬅ In progress

**Do:** Replace the current `<a href>` CTA link with a real cart API button.

**Files:** `sections/section-comparison-table.liquid`, `assets/comparison-table.js`, `assets/section-comparison-table.css`

**Liquid:** Add `product` type setting to schema. Replace `button_url` (url) with `button_product` (product). Resolve the product picker to `first_available_variant.id` and write it to `data-variant-id` on a `<button>` element. Hide the button entirely if no product is configured or no available variant exists.

**JS:** Add `handleCartClick()` to the web component — POST to `/cart/add.js`, publish `cartUpdate` on success, show inline error on failure, toggle `disabled` state during fetch.

**CSS:** Add `disabled` opacity rule and `.ct__cart-error` error text style.

**Verify:** Clicking ADD TO CART adds the product, cart drawer opens. No product configured → button not rendered. Cart API failure → error message appears.

### Step 7: Edge cases & polish

- Empty competitor block (no image, no text): renders gracefully with placeholder + blank cells
- Single block: table renders normally
- Tablet (750px–989px): tightened padding, smaller fonts already handled in CSS
- Verify no layout breakage at any viewport width

## Risks & Considerations

1. **`display: contents` and accessibility** — screen readers may not correctly associate header cells with data cells when the table is built from divs with `display: contents`. Acceptable for a marketing section but worth noting.

2. **Row height alignment** — the `display: contents` trick relies on each row being its own grid, not a shared grid across all rows. This means the Solution column and attribute column cells within the *same row* are auto-height aligned, but cross-row alignment is independent. This is correct behavior for this design.

3. **Cart drawer dependency** — `publish(PUB_SUB_EVENTS.cartUpdate)` expects `cart-drawer.js` to be listening. It is loaded globally in this theme, but if the section is ever used on a page without the cart drawer, the item will be added silently without visual feedback.

4. **`first_available_variant`** — if the selected product is fully sold out, no variant is returned and the button is hidden. This is correct, but worth verifying in QA.

5. **Recoleta font** — used for the heading and CTA button. Loaded via `@font-face` referencing Shopify CDN URLs. If those CDN URLs ever change, the font silently falls back to serif. Low risk but documented.

## Open Questions

None — all decisions resolved during scoping.
