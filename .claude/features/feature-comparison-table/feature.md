# Comparison Table

## Brief

Build a custom Shopify section that displays a side-by-side product comparison table, matching the Figma designs for desktop and mobile:

- Desktop: https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2405&t=4jOoUmIxKiys88Dy-0
- Mobile: https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-4012&t=4jOoUmIxKiys88Dy-0

### Section Header

The table is introduced by a headline and optional subtext that sets the context — for example, "How we stack up" or "Why choose Fuelerate?". These are fully editable via schema settings so the client can update the copy without touching code.

### Product Columns

The table has multiple columns — one per product being compared. Each column includes a product name and a visual indicator (logo or label) to distinguish Fuelerate from competitors. The number of columns is controlled by blocks in the schema, allowing the client to add or remove products from the customizer.

### Feature Rows

Each row represents a specific feature or attribute (e.g. "No artificial sweeteners", "Informed Sport certified", "Zero sugar"). Rows are defined as schema blocks so the client can manage them from the theme customizer. Each cell in a row displays either a checkmark (feature present), a cross (feature absent), or a custom text value — depending on what best represents the comparison.

### Visual Differentiation for the Brand Column

The Fuelerate column is visually highlighted to draw attention — for example with a distinct background color, border, or label like "Best choice". This is a static design treatment, not a dynamic toggle, to keep the implementation clean and predictable.

### Call-to-Action

The Fuelerate column includes a prominent CTA button (e.g. "Shop Now" or "Add to Cart") positioned at the top or bottom of the column. The button label and link are editable via schema settings.

### Mobile Layout

On small screens the table collapses to a horizontally scrollable layout so all columns remain visible without wrapping. The feature row labels are pinned to the left so the user always knows what each row refers to while scrolling sideways.

### Schema & Content Management

All visible text — headline, subtext, product names, feature row labels, button label, and button link — is managed through Shopify schema settings and blocks. Nothing is hardcoded. The section is available on any template via a preset so the client can add it wherever needed.

---

## Scoping Questions

Generated: 2026-08-29
Chosen approach: Option A — Custom Shopify Section (Liquid + CSS + Web Component)

---

### Q1: Schema structure — how should rows and columns be organized?

This is the core architectural decision. The design has rows (solutions/competitors) and columns (comparison attributes). There are two ways to structure this in the schema:

- **Option a) Row-based blocks** *(recommended)* — Each schema block = one row (one competitor). The block contains: an image, a label, and one text field per attribute column. Column headers (e.g. "How it works", "What to consider") are fixed section-level settings. Clean, simple to manage in the customizer. The downside is the number of columns is fixed in code.
- **Option b) Fully dynamic rows + columns** — Columns are also defined as blocks. Anything can be added or removed. Maximally flexible but significantly more complex to build and awkward to manage in the customizer (no visual connection between a column block and its cell values).

- [ ] a) Row-based blocks (fixed columns, rows are blocks)
- [ ] b) Fully dynamic (both rows and columns are blocks)

**Notes:**  
[Add any client clarification or extra context here]

---

### Q2: Should the number of attribute columns be fixed or configurable?

The Figma shows exactly 4 attribute columns: *How it works*, *What to consider*, *Cost over time*, *Side effects*. Should these be:

- [x] a) Fixed at 4 — column headers are editable section settings but you can't add/remove columns *(recommended — keeps schema simple and mobile carousel predictable)*
- [ ] b) Configurable — client can add or remove columns from the customizer (requires more complex schema and carousel logic)

**Notes:**  
[Add any client clarification or extra context here]

---

### Q3: Mobile layout — confirm the carousel behavior

From the mobile reference image, the layout appears to work like this: the "Solution" column (with product names and images) is pinned on the left, and the user swipes through the attribute columns one at a time using pagination dots at the bottom.

- [x] a) Yes — pinned Solution column + swipeable attribute columns with pagination dots *(matches the reference image)*
- [ ] b) Simple horizontal scroll — the whole table scrolls sideways (no JS, no dots, easier to build)
- [ ] c) Something else — add notes below

**Notes:**  
[Add any client clarification or extra context here]

---

### Q4: ADD TO CART button — functional or CTA link?

The button appears below the table on both desktop and mobile.

- [x, make adds to cart via Shopify's cart API as default] a) CTA link — a styled button with a configurable label and URL (works on any page, no cart logic needed) *(recommended — more flexible, comparison tables often live on landing/marketing pages)*
- [ ] b) Real cart button — connected to a specific product via a product picker setting, adds to cart via Shopify's cart API

**Notes:**  
[Add any client clarification or extra context here]

---

### Q5: Solution column — product images or icons?

Each row in the "Solution" column has an image (the reference shows a terra therapy logo, pill icons, a chiro icon, etc.).

- [x, use default Hardcoded SVG icons] a) Uploaded images — each row block has an image_picker setting so the client can upload any image *(recommended — most flexible)*
- [ ] b) Hardcoded SVG icons — fixed icons baked into the section code (faster to build but not editable by client)

**Notes:**  
[Add any client clarification or extra context here]

---

### Q6: Color approach — match CPI brand colors or use theme color scheme?

The existing CPI section uses hardcoded brand colors (`#f4f3ee` cream, `#31331e` dark olive, `#a8ca1b` lime green) and does not respond to the theme's color scheme settings.

- [x] a) Match CPI brand colors — hardcoded, consistent with the rest of the product page *(recommended — this section will likely sit alongside the CPI section)*
- [ ] b) Use theme color scheme system — responds to theme settings, more flexible across different pages

**Notes:**  
[Add any client clarification or extra context here]

---

### Recommendations

Based on the reference images and theme analysis, here's what I'd flag proactively:

1. **Highlighted row is the first row, not a toggle.** The Figma design always highlights the brand's row at the top. I'd recommend treating the first block as the "featured" row rather than adding a toggle — simpler, and the client would never want a competitor highlighted anyway.

2. **Mobile dots require a web component.** The column carousel with swipeable dots can't be done with CSS alone. A small web component (similar to the existing `product-info-tabs` pattern in `custom-product-information.js`) is the right call — self-contained, no global scope pollution.

3. **Desktop table needs a sticky first column.** On desktop, if the table is wide, the Solution column should stay visible. This is achievable with `position: sticky; left: 0` on the first column cells — no JS needed.

4. **Cell content is text-only (no checkmarks/crosses).** Unlike what the initial brief described, the Figma reference shows text descriptions in each cell, not icon indicators. Worth confirming — if it's all text, the schema is much simpler.

5. **This section will likely sit on the same page as the CPI section.** The font, colors, and button style should be consistent — matching CPI's `Figtree` font, cream background, and lime green button.

## Extended Brief

Generated: 2026-08-29

### Chosen Approach

Custom Shopify section built with Liquid + CSS + a vanilla JS Web Component for the mobile column carousel. No app, no library, consistent with how the existing CPI section was built.

### Requirements

- Section header: editable headline and optional subheading via schema settings
- Table: 5 visible columns — a pinned "Solution" column + 4 fixed attribute columns
- Rows are schema blocks; the client can add/remove/reorder rows from the theme customizer
- First block is always rendered as the highlighted brand row (dark olive background, no toggle needed)
- Each row block: image (image_picker with SVG fallback), solution label, and 4 text fields (one per attribute column)
- Attribute column headers are editable section settings (fixed at 4 — not dynamically addable)
- All cell content is plain text — no checkmark/cross icons
- Desktop: full table visible, Solution column sticky with `position: sticky; left: 0` (CSS only)
- Mobile: Solution column pinned left, user swipes through the 4 attribute columns one at a time — pagination dots at the bottom indicate which column is active
- CTA button: real add-to-cart using Shopify's cart API. Product selected via a product picker setting. Adds the first available variant by default (no variant selector in this section)
- Colors and font match the CPI section exactly (hardcoded brand palette, Figtree font)
- Section available on all templates via a preset

### Where It Lives

A standalone section, usable on any template via the theme customizer. Likely placed on the product page below or near the CPI section, but not coupled to it.

### Data Sources

- All content (heading, column headers, row labels, cell text, button label) from schema settings and blocks
- Product for the cart button: selected via a `product` type schema setting
- Row images: uploaded via image_picker per block; falls back to a default SVG asset when no image is set

### User Interaction

- **Desktop:** No interaction beyond the page — the full table is visible at once
- **Mobile:** User swipes left/right on the attribute columns panel to switch between the 4 columns. Pagination dots update to reflect the active column. Touch/swipe handled by the `comparison-table` web component
- **CTA button:** Clicking submits an add-to-cart request to Shopify's cart API for the configured product (first variant). On success, triggers the existing cart drawer (using the pub/sub `cartUpdate` event already in the theme)

### Customizer Settings

**Section settings:**
- `heading` — text, default: "Why We Are Really Different"
- `subheading` — textarea, optional
- `col_1_header` through `col_4_header` — text, defaults: "How it works", "What to consider", "Cost over time", "Side effects"
- `button_label` — text, default: "ADD TO CART"
- `button_product` — product picker (for cart API)
- `padding_top`, `padding_bottom` — range, 0–120px, default 48px (matching CPI)

**Row block settings (type: `row`):**
- `image` — image_picker, optional
- `label` — text (solution name)
- `col_1_text` through `col_4_text` — textarea (one per attribute column)

**Not configurable:** column count, colors, font, highlighted row (always first block)

### Decisions Made

- **Row-based schema** chosen over fully dynamic — column count is fixed at 4, keeping the schema and carousel logic simple and predictable
- **First block = featured row** — avoids a "is_featured" toggle; the brand row is always first by design
- **Real cart button** — adds to cart via Shopify's cart API using the existing pub/sub system to trigger the cart drawer, same pattern used by `product-form.js`
- **Image picker + SVG fallback** — clients can upload custom images per row, but default SVG icons ship in assets so the section works out of the box
- **CPI brand colors hardcoded** — section does not participate in theme color schemes, consistent with the CPI section it will sit alongside

### Edge Cases to Handle

- Row block added with no image: render a placeholder SVG from assets
- Product picker left empty: hide the button entirely rather than showing a broken cart request
- Single row block: table still renders (no minimum enforced)
- Mobile carousel at first/last column: disable swipe in the exhausted direction, keep dots accurate
- Cart API error: show a brief inline error message near the button ("Something went wrong, please try again")

### Out of Scope

- Checkmark / cross cell indicators (text-only cells)
- Variant selector (adds first available variant only)
- Dynamic column count (always exactly 4 attribute columns)
- Multiple CTA buttons (one button for the whole section)
- Animation between carousel columns beyond a CSS transition

### Dependencies

- `pubsub.js` and `constants.js` — already loaded globally, needed for `cartUpdate` event after add-to-cart
- `cart-drawer.js` — already in theme, will open automatically on `cartUpdate`
- Figtree font — loaded inline in the section file, same pattern as the CPI section

### Notes

- Match the visual style of the CPI section closely — cream background, dark olive text, lime green button, Figtree font
- SVG icons for the default rows (Terra Therapy logo, pill, spine/chiro, capsule) should go in `assets/` with a `ct-icon-` prefix to avoid collisions with existing `cpi-icon-` files

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
