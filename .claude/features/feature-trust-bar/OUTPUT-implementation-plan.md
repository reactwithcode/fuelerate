# Implementation Plan: Trust Bar

Generated: 2026-08-28
Feature spec: `.claude/features/feature-trust-bar/feature.md`

## Summary

A full-width trust bar section displaying icon + text trust signals (e.g. "90-Day Guarantee", "Ships in 2–6 Days"). Items are managed as blocks in the customizer — client can add, remove, and reorder. Desktop: horizontal row. Mobile: vertical stack. No JavaScript required.

---

## Human-First Breakdown

### Admin Setup (human tasks in Shopify admin)

No admin setup required — this feature works entirely with theme code and section settings. The client manages all trust bar content directly in the customizer.

### Code Preparation (before any visitor touches the page)

1. A full-width dark olive strip exists on the page (color configurable via section settings)
2. Inside it, a centered container holds all the trust items (max ~1178px)
3. On desktop, items sit side-by-side in a single horizontal row, evenly spaced
4. On mobile, items stack vertically, one per row, with small gaps between them
5. Each item has a 36×36px icon on the left and a text label on the right (8px gap)
6. If a block has no icon, only the text renders; if no text, only the icon renders
7. If no blocks are added at all, the section renders nothing

### Live Behavior (when a user interacts)

None — this section is display-only. No user interaction.

---

## Files

### New Files
- `sections/section-trust-bar.liquid` — markup, schema, Figtree font link, CSS asset loading
- `assets/section-trust-bar.css` — all styles, desktop and mobile

### Modified Files
None.

### Theme Components Reused
- Figtree font `<link>` tag — same self-contained pattern as `section-custom-product-information.liquid`
- Section-id padding pattern — using the CPI `0.5` mobile multiplier
- `{{ block.shopify_attributes }}` — for theme editor block highlighting

---

## Build Steps

### Step 1: Section skeleton

**Do:** Create the Liquid file with asset loading, dynamic style block, empty wrapper, and full schema.
**Files:** `sections/section-trust-bar.liquid`
**Details:**
- Add Figtree `<link>` tag at the top (makes the section self-contained regardless of what else is on the page)
- Load `section-trust-bar.css` via `stylesheet_tag`
- `{%- style -%}` block outputs `--trust-bar-bg: {{ section.settings.background_color }}` and section-id padding with `0.5` mobile multiplier at `750px` breakpoint
- Outer wrapper: `<div class="trust-bar section-{{ section.id }}-padding">`
- Schema: name `"Trust Bar"`, tag `"section"`, class `"section"`
- Settings: `background_color` (color, default `#31331e`), `padding_top` (range, 0–120, step 4, default 28), `padding_bottom` (range, 0–120, step 4, default 28)
- Block type `item` with two settings: `icon` (image_picker, label "Icon") and `label` (text, label "Label")
- Preset: `"Trust Bar"` with 4 pre-filled blocks (labels only — no preset images)

**Verify:** Section appears in the customizer Add Section panel. Adding it to a page renders a visible (but visually unstyled) bar.

---

### Step 2: Static markup

**Do:** Add hardcoded HTML for 4 trust items to nail down structure before making it dynamic.
**Files:** `sections/section-trust-bar.liquid`
**Details:**
- `.trust-bar__inner` — centered container (becomes the flex row on desktop)
- `.trust-bar__items` — flex container for all items
- `.trust-bar__item` — individual item wrapper
- `.trust-bar__icon` — 36×36 wrapper for the `<img>`
- `.trust-bar__label` — `<p>` tag for the text
- Use placeholder text and a placeholder `<img src="">` for all 4 items

**Verify:** Four items render in the browser. Before CSS is applied they will stack — that's expected at this stage.

---

### Step 3: CSS

**Do:** Create the full stylesheet matching the Figma spec for both breakpoints.
**Files:** `assets/section-trust-bar.css`
**Details:**

Desktop (default):
- `.trust-bar` — `background-color: var(--trust-bar-bg)`, `width: 100%`
- `.trust-bar__inner` — `max-width: 1178px`, `margin: 0 auto`, `display: flex`, `justify-content: space-between`, `align-items: center`, `padding: 0 1.5rem`
- `.trust-bar__items` — `display: flex`, `justify-content: space-between`, `align-items: center`, `width: 100%`
- `.trust-bar__item` — `display: flex`, `align-items: center`, `gap: 8px`
- `.trust-bar__icon` — `width: 36px`, `height: 36px`, `flex-shrink: 0`
- `.trust-bar__icon img` — `width: 100%`, `height: 100%`, `object-fit: contain`
- `.trust-bar__label` — `font-family: 'Figtree', sans-serif`, `font-size: 20px`, `font-weight: 400`, `line-height: 1.11`, `color: #ffffff`, `margin: 0`

Mobile (`@media screen and (max-width: 749px)`):
- `.trust-bar__items` — `flex-direction: column`, `align-items: flex-start`, `gap: 5px`, `padding: 23px 19px`
- `.trust-bar__label` — `font-size: 16px`

**Verify:** 4 hardcoded items display correctly on desktop (horizontal, evenly spaced) and mobile (vertical stack). Matches the Figma screenshots and reference images.

---

### Step 4: Dynamic data

**Do:** Replace hardcoded items with a Liquid block loop.
**Files:** `sections/section-trust-bar.liquid`
**Details:**
- Wrap the items container in `{% if section.blocks.size > 0 %}...{% endif %}` so an empty section renders nothing
- Loop: `{% for block in section.blocks %}`
- Add `{{ block.shopify_attributes }}` to `.trust-bar__item` for theme editor highlighting
- Icon: `{% if block.settings.icon != blank %}<div class="trust-bar__icon"><img src="{{ block.settings.icon | image_url: width: 72 }}" width="36" height="36" alt="" loading="eager"></div>{% endif %}`
- Label: `{% if block.settings.label != blank %}<p class="trust-bar__label">{{ block.settings.label }}</p>{% endif %}`

**Verify:** Adding, removing, and reordering blocks in the customizer updates the bar live. Block with no icon shows text only. Block with no text shows icon only. Empty section (no blocks) renders nothing.

---

### Step 5: Schema polish and preset

**Do:** Finalize the preset with the 4 default Fuelerate trust labels pre-filled.
**Files:** `sections/section-trust-bar.liquid`
**Details:**
- Preset blocks with labels: `"90-Day Results-Backed Guarantee"`, `"Designed in USA"`, `"Ships in 2–6 Days"`, `"A Tree Planted per Order"`
- No preset images — client uploads icons per block after adding the section
- Confirm background color default is `#31331e` and padding defaults are 28px

**Verify:** Dropping the section fresh into any page shows 4 labeled items with no icons, dark olive background, correct spacing. Client can upload icons independently per block.

---

## Risks & Considerations

- **Figtree double-load** — if the CPI section is on the same page, Figtree loads from two `<link>` tags. Browsers deduplicate the actual download, so no functional issue — just a minor redundancy.
- **Long label text** — avoid `white-space: nowrap` in the Liquid output. Long text should wrap rather than overflow, especially on mid-size screens.
- **Image upload quality** — accepted trade-off. PNG/JPG uploads at 36px will work but won't be as crisp as SVGs. If this becomes an issue, the fix is switching to SVG assets in `assets/` with an icon picker in the schema.
- **Eager loading on icons** — at 36×36px, these are tiny assets. No need for `loading="lazy"`.

## Open Questions

None — all decisions resolved during scoping.

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-implementation-plan.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
