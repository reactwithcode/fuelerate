# [Feature Name]

## Brief

Build a custom product page section, matching this Figma design desktop:
https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-1744&t=4jOoUmIxKiys88Dy-0, https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2763&t=4jOoUmIxKiys88Dy-0, https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2870&t=4jOoUmIxKiys88Dy-0, https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2923&t=4jOoUmIxKiys88Dy-0, https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2975&t=4jOoUmIxKiys88Dy-0, https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-3027&t=4jOoUmIxKiys88Dy-0, https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-3079&t=4jOoUmIxKiys88Dy-0

Build a custom product page section, matching this Figma design mobile:
https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-3543&t=4jOoUmIxKiys88Dy-0

### Feature Overview

This is a custom interactive benefit showcase section intended for the product page. It replicates a multi-part Figma design across both desktop and mobile layouts. The section is composed of five distinct parts that work together to present the product compellingly and drive conversion.

### 1. Hero Split Layout (Product Image + Product Info)

The top of the section features a two-column split layout. The left column displays a prominent hero product image, while the right column contains the product title, a short description, pricing, and the primary Add to Cart button. This layout is the anchor of the section and should adapt to a stacked single-column layout on mobile.

### 2. "Why You Need This" Benefit Grid

Below the hero, a grid of six icons with short labels communicates the product's key benefits at a glance. Each icon is paired with a heading and a brief supporting line. The icons and copy should be manageable from the section schema so the client can update them without developer help. The grid should be 3 columns on desktop and 2 columns on mobile.

### 3. Real Customer Photo Row

A horizontal row of real customer lifestyle photos to build social proof. This acts as a visual testimonial strip — authentic, unpolished imagery that shows the product in use. The number of photos and the images themselves should be editable via schema settings. On mobile, this should either scroll horizontally or stack in a 2-column grid.

### 4. Add to Cart Button (Sticky or Repeated CTA)

A clear, prominent Add to Cart button is present in the hero area and may be repeated below the benefit grid as a secondary CTA. The button should link to the actual Shopify product form and trigger the cart behavior consistent with the rest of the theme (drawer or redirect, depending on theme settings).

### 5. Accordion Info Tabs

At the bottom of the section, a set of accordion-style expandable panels covers additional product information: Description, Who Is It For, Shipping, and Care. Only one panel should be open at a time. The panel labels and content should be editable via schema blocks so the client can reorder, rename, or update the copy.

---

## Scoping Questions

Generated: 2026-08-28
Chosen approach: Option A — Custom Liquid Section + Web Component

---

### Q1: Scope clarification — what exactly is this section?

Looking at your reference images, the section shown is an **interactive benefit category selector**: a left panel with a vertical pill list, a centre anatomy image, and a right dark detail panel that updates on click. But the original brief also mentions a hero layout, customer photo row, Add to Cart button, and accordion tabs.

The existing CPI section already handles the hero image, product info, ATC button, and accordion tabs. So I want to confirm the exact scope of this new section.

- [x] a) This section is only the interactive benefit selector (left list + centre image + right detail panel) as shown in the reference images. The other elements (hero, ATC, accordions) live in the CPI section.
- [ ] b) This section should include additional elements beyond the benefit selector — specify in Notes below.

**Notes:**  
[Add any clarification here]

---

### Q2: Centre image — does each benefit category have its own image?

The desktop layout appears to show a changing anatomy/body image between the category list and the dark detail panel (brain for neurological, heart for cardiovascular, etc.). Each block would need an image field in its schema settings.

- [x] a) Yes — each benefit category block should have its own image (uploaded by client via customizer)
- [ ] b) No — there is no per-category centre image; the layout is just the list + dark right panel
- [ ] c) There is one shared background image for the whole section, not per-category

**Notes:**  
[Add any clarification here]

---

### Q3: Navigation arrows — what do the prev/next arrows on the detail panel do?

The desktop detail panel shows left and right arrow buttons. Options for their behaviour:

- [x, only to right. exactly like on the reference] a) They cycle through benefit categories sequentially (next/previous), as an alternative to clicking the list items
- [ ] b) They are decorative only — no functionality needed
- [ ] c) They are not present in the final design — ignore them

**Notes:**  
[Add any clarification here]

---

### Q4: Category icons — how should client manage the pill icons?

Each category pill in the left list shows a small icon (the same icon set already used in the CPI section). Options:

- [ ] a) Use the existing `cpi-icon-*.svg` files already in assets — client picks from a fixed set via a select setting
- [x] b) Client uploads their own SVG/image per block via the customizer image picker
- [ ] c) Icons are hardcoded per block — not changeable by client

**Notes:**  
[Add any clarification here]

---

### Q5: CTA link in the detail panel — per-category or global?

Each detail panel shows "Explore the science behind these benefits" with a link. Should this link be:

- [x] a) Configurable per benefit block (each category can link to a different page/anchor)
- [ ] b) One global URL setting for the whole section (same link for all categories)
- [ ] c) No link needed — the text is decorative/informational only

**Notes:**  
[Add any clarification here]

---

### Q6: Default active state on page load

When the page first loads, which category should be shown as active?

- [x] a) First category in the list — always expanded/active by default
- [ ] b) No category active — right panel is empty or shows a placeholder until the user clicks
- [ ] c) Configurable — client picks the default active block in the customizer

**Notes:**  
[Add any clarification here]

---

### Q7: Number of benefit categories — fixed or flexible?

The design shows exactly 6 categories. Should the client be able to add or remove blocks?

- [ ] a) Fixed at 6 — client can edit content but not add/remove blocks
- [x] b) Flexible — client can add or remove blocks freely (layout should handle fewer or more than 6 gracefully)
- [ ] c) Flexible with a max cap — e.g. between 4 and 8

**Notes:**  
[Add any clarification here]

---

### Recommendations

1. **Brief vs reference images mismatch** — The brief mentions hero layout, customer photos, and ATC button, but the reference images show only the interactive benefit selector. I'm assuming Q1 resolves this, but confirm before build starts.

2. **Reuse existing SVG icons** — The project already has 8 custom `cpi-icon-*.svg` files in assets. Reusing these is the lowest-friction path. If the client needs different icons, we add new SVGs rather than switching to an image picker.

3. **Animation between states** — A CSS opacity/transform fade (no JS animation library) is my recommendation for transitioning the right panel content. Simple, performant, and maintainable.

4. **Mobile accordion is single-open** — The mobile design clearly shows only one category expanded at a time. This is confirmed and will be built that way (no need to ask the client).

5. **Do not use `<details>` for mobile** — Even though the mobile layout looks like an accordion, using `<details>` would create markup/interaction complexity at the desktop breakpoint. The web component will handle both desktop (click list → update panel) and mobile (click pill → expand inline) with the same underlying logic.

## Extended Brief

Generated: 2026-08-28

### Chosen Approach

Custom Liquid section + web component (Option A). Three files: `section-interactive-benefit-showcase.liquid`, `section-interactive-benefit-showcase.css`, `benefit-showcase.js`.

---

### Requirements

- Render a standalone interactive benefit category selector section
- Left panel: section heading, subtext, vertical pill list — active pill highlighted in dark olive
- Centre: full-height image that changes with the active category (one image per block)
- Right panel: dark olive card with active category title, description, bullet points, CTA link, and a right-pointing arrow to advance to the next category
- First category active by default on page load
- Right arrow advances to next category sequentially, wrapping back to the first after the last
- Mobile: stacked accordion — tapping a pill expands an inline dark detail card; only one open at a time; first open by default
- All text content, images, and links editable via schema settings and blocks

---

### Where It Lives

Standalone section, available in the theme customizer for any template. Intended for the product page, below the existing CPI section. Can be added elsewhere without code changes.

---

### Data Sources

All content comes from section schema settings and blocks — no Liquid objects, metafields, or external APIs required. Fully static CMS-driven.

---

### User Interaction

- **Click a pill** → activates that category; updates centre image and right detail panel (desktop) or expands inline card (mobile)
- **Right arrow** → advances to next category in sequence; wraps to first after last
- **Default** → first block active on page load, both desktop and mobile

---

### Customizer Settings

**Section-level:**
- Heading (text)
- Subtext (textarea)
- Padding top / padding bottom (range)

**Blocks (type: `benefit`) — flexible, no fixed count:**
- Icon image (image picker)
- Category title (text) — used as pill label and detail panel heading
- Description (textarea)
- Bullet points (textarea — one bullet per line)
- CTA link text (text)
- CTA link URL (url)
- Category image (image picker) — shown in the centre column when this block is active

**Not configurable by client:** colours, typography, layout breakpoints — all hardcoded to match the Figma brand spec.

---

### Decisions Made

- **Scope is the benefit selector only** — hero, ATC button, customer photos, and accordion tabs belong to the existing CPI section (Q1)
- **Per-category centre image** — each block has its own image field, uploaded via customizer (Q2)
- **Right arrow only, no left** — sequential forward navigation, wraps to first (Q3)
- **Icon is a client-uploaded image**, not a fixed SVG set (Q4)
- **CTA link is per-block** — each category can link to a different URL (Q5)
- **First block active on load** — no empty state needed (Q6)
- **Flexible block count** — client can add or remove blocks; layout handles any number gracefully (Q7)
- **No animation library** — CSS opacity/transform transition only

---

### Edge Cases to Handle

- Fewer than 6 blocks: pill list and layout degrade gracefully — no fixed-column assumptions
- No CTA URL set on a block: hide the CTA anchor entirely, do not render a broken link
- No centre image set on a block: hide the centre image column or collapse it; do not show a broken img
- Empty bullet points field: bullet list does not render — no empty `<ul>`
- Single block: right arrow is hidden or disabled — no point cycling through one item
- Last category selected, arrow clicked: wrap back to first

---

### Out of Scope

- Hero split layout, customer photo row, Add to Cart button, accordion info tabs (CPI section)
- Left/previous arrow
- Variant selection or cart integration
- Any animation library

---

### Dependencies

- Existing CPI section (`section-custom-product-information.liquid`) — this section sits alongside it, not inside it
- No shared JS or CSS dependencies needed

---

### Notes

- CSS prefix: `ibs__` (interactive benefit showcase) — keeps styles fully scoped, no collision with `cpi__` classes
- Colours are hardcoded brand values matching CPI: `#31331e` (dark olive), `#f4f3ee` (cream), `#ffffff` (white) — does not use theme color scheme variables
- Font: `Figtree` (already loaded by the CPI section on product pages — no extra font request needed if both sections are used together)
- Web component tag: `benefit-showcase`

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
