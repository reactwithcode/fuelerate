# [Feature Name]

## Brief

Build a custom product page section, matching this Figma design:
https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-1611&t=hkRG3yppfvd372zY-0 and https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-3426&t=hkRG3yppfvd372zY-0

**Hero Image + Product Info Split Layout**
The top of the section uses a two-column split layout: a large hero product image on one side and all key product information on the other. This is the primary above-the-fold view customers see on the product page. It should feel premium and focused — the image dominates visually while the info column gives shoppers everything they need to make a purchase decision without scrolling.

**"Why You Need This" 6-Icon Grid**
Below the hero, a 6-icon trust/benefit grid communicates the product's key selling points. Each item consists of an icon and a short label or descriptor. This section answers the "why should I buy this?" question quickly and visually, reducing purchase hesitation. The icons and copy should be manageable through section settings.

**Real Customer Photo Row**
A horizontal row of real customer photos (user-generated content style) to build social proof. This is distinct from a standard review section — it's a visual strip of lifestyle or in-use photos that make the product feel tried and trusted. Photos should be configurable through blocks so the client can update them without code changes.

**Add to Cart Button**
A prominent, fixed or inline Add to Cart button positioned clearly within the product info column. It should follow the theme's existing cart interaction pattern (drawer or redirect) and remain visible and accessible, especially on mobile.

**Accordion Tabs — Description / Who Is It For / Shipping / Care**
Below the main product section, a set of accordion-style tabs provides expanded product details without cluttering the primary layout. The four tabs are: Description, Who Is It For, Shipping, and Care. Each tab's content should be editable through section blocks so the client can manage copy independently for each product.

---

## Scoping Questions

Generated: 2026-08-28
Chosen approach: Option A — Custom Liquid Section

### Q1: Where does the trust bar live?

The reference images show a full-width strip. The question is where it sits in the page hierarchy.

- [x] a) Global — below the header on every page (site-wide)
- [ ] b) Product page only — between the CPI section and the footer
- [ ] c) Configurable — a standalone section the client can place anywhere in the customizer

**Notes:**  

---

### Q2: How many items, and should the count be flexible?

The design shows exactly 4 items. Should this be locked at 4, or should the client be able to add/remove items?

- [ ] a) Fixed at 4 — cleaner layout, no risk of breaking the grid
- [x] b) Flexible via blocks — client can add/remove items (we'd need to handle odd counts gracefully)

**Notes:**  

---

### Q3: How should the icons be handled?

The trust bar uses icons (shield, flag, box, tree). We have two approaches:

- [ ] a) SVG files in `assets/` — we add the 4 SVG files, client cannot swap them without a developer (same pattern as CPI section)
- [x] b) Image upload per block — client can upload any icon image via the customizer (more flexible, but loses crisp SVG rendering)

**Notes:**  

---

### Q4: Should the background color be hardcoded or configurable?

The design uses the brand's dark olive (`#31331e`). The CPI section also hardcodes brand colors.

- [ ] a) Hardcode the dark olive — consistent with CPI section pattern, no risk of the client breaking the look
- [x] b) Make it configurable — add a color setting so it can adapt to different page contexts

**Notes:**  

---

### Q5: Mobile layout — vertical stack or horizontal scroll?

The mobile reference shows items stacked vertically (one per row). An alternative is a horizontal scrollable strip.

- [x] a) Vertical stack — exactly as shown in the reference image
- [ ] b) Horizontal scroll (2 items per row on mobile)
- [ ] c) Follow the Figma — check the Figma file for the intended mobile behaviour

**Notes:** Confirmed from Figma (node 1:3426) — mobile is `flex-col` with 5px gap, 23px top/bottom padding, 19px left/right. Text drops from 20px (desktop) to 16px. No scroll, no grid — pure vertical stack.

---

### Recommendations

- **SVGs over image uploads (Q3):** The CPI section uses inline SVGs loaded from `assets/` — it's the cleaner pattern and the icons are a fixed part of the brand. Image uploads add flexibility but introduce quality/scaling risks with non-SVG uploads.
- **Blocks for items (Q2):** Even if the client sticks to 4, blocks give them the ability to reorder and edit text without a developer. Low overhead to implement and much better long-term.
- **Hardcode the color (Q4):** The CPI section sets the pattern here. Fuelerate has a strong brand palette — giving color controls risks the client accidentally making it off-brand.
- **Check Figma for mobile (Q5):** The static screenshot shows vertical stack, but the Figma may specify something different. Worth confirming before building.

## Extended Brief

Generated: 2026-08-28

### Chosen Approach

Custom Liquid section (`section-trust-bar.liquid`) — self-contained, no JS required, configurable via the theme customizer using blocks.

### Requirements

- Full-width trust bar with a configurable background color (default: `#31331e` dark olive)
- Each trust item is a block containing: one image upload (icon) and one text field (label)
- Desktop: all items in a single horizontal row, spaced evenly, centered at max ~1178px
- Mobile: items stacked vertically, one per row
- Font: Figtree Regular (already loaded by the CPI section — reuse the same `<link>` tag pattern)
- Text color: white (`#ffffff`), hardcoded
- Icon size: 36×36px on both breakpoints
- Desktop text: 20px / Mobile text: 16px
- Desktop padding: ~28px top and bottom
- Mobile padding: 23px top/bottom, 19px left/right
- A preset so the section appears in the customizer Add Section list and can be added to any page

### Where It Lives

Global — a standalone section the client can add to any page template via the theme customizer. Not tied to the product page or any specific template. Ships with one unconfigured preset.

### Data Sources

All content is managed through section blocks in the customizer:
- Each block: `image` (image_picker) + `text` (text field)
- No metafields, no product data, no Liquid objects — purely section settings

### User Interaction

Static — no JS, no interactivity. The bar is display-only. Items are rendered server-side.

### Customizer Settings

**Section-level:**
- Background color (color picker, default `#31331e`)
- Padding top / Padding bottom (range sliders)

**Block-level (one block = one trust item):**
- Icon image (image_picker)
- Label text (text)

**Not configurable:** text color (always white), icon size (always 36×36px), font (always Figtree).

### Decisions Made

- **Global section over product-page-only** — gives the client flexibility to use the trust bar anywhere without developer involvement
- **Blocks for items** — flexible count, reorderable, each item independently editable
- **Image upload over SVG assets** — client can swap icons without a developer; trade-off accepted (see below)
- **Configurable background** — allows the section to adapt if used in different page contexts
- **Vertical stack on mobile** — confirmed directly from Figma (node 1:3426)

### Edge Cases to Handle

- **No blocks added** — section renders nothing (or an empty bar); not a crash, just invisible
- **Block with no image** — render the text only, skip the `<img>` tag gracefully
- **Block with no text** — render the icon only, skip the `<p>` tag
- **Odd number of items on desktop** — flexbox `justify-between` handles this naturally; no grid lock-in
- **Long label text** — don't use `whitespace-nowrap` in the Liquid output; allow wrapping on small screens
- **Non-SVG icon uploads** — acceptable, but crisp rendering not guaranteed at all sizes (accepted trade-off)

### Out of Scope

- Animation or scroll effects
- Link on each trust item
- Hover states
- Countdown timers or dynamic content
- Any cart or product interaction

### Dependencies

- Figtree font — already loaded by the CPI section via a `<link>` tag inside `section-custom-product-information.liquid`. If the trust bar appears on a page without the CPI section, Figtree won't load. We'll add the same `<link>` tag inside `section-trust-bar.liquid` to make it self-contained.
- No JS dependencies

### Accepted Trade-offs

- **Image uploads instead of SVG assets** — the client chose flexibility over guaranteed rendering quality. If icons look soft or pixelated, the fix is switching to SVG files in `assets/` and exposing an icon picker in the schema.

### Needs Client Clarification

None — all decisions resolved.

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
