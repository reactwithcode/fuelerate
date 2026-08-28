# Implementation Plan: Interactive Benefit Showcase

Generated: 2026-08-28
Feature spec: `.claude/features/feature-interactive-benefit-showcase/feature.md`

## Summary

A standalone interactive benefit category selector section for the product page. It renders a three-column layout on desktop (vertical pill list on the left, a per-category image in the centre, and a dark olive detail panel on the right) that updates when the user clicks a category or presses the next arrow. On mobile it becomes a single-column accordion — tapping a pill expands its detail card inline. All content is CMS-driven via schema blocks. No admin setup required.

---

## Human-First Breakdown

### Admin Setup

No admin setup required — this feature works entirely with theme code and section settings. All content is managed in the Shopify customizer.

---

### Code Preparation (before any visitor touches the page)

1. The section file is registered and appears in the customizer sidebar
2. A heading and subtext are visible at the top of the section
3. Below the heading, a vertical list of benefit category pills is rendered — one pill per block, in block order
4. The first pill is marked active (dark olive pill, white text)
5. A centre column to the right of the pill list shows the first block's category image
6. A dark olive detail panel to the right of the image shows the first block's title, description, bullet list, and CTA link
7. A right-pointing arrow button is visible inside the detail panel
8. On mobile: heading + subtext at top, first category pill is expanded with its detail card visible inline, all other pills are collapsed below it

---

### Live Behavior (when a user interacts)

**Desktop:**
1. User clicks a different pill → that pill becomes active (highlighted), previous loses highlight
2. Centre image transitions to the newly active block's image
3. Detail panel content fades/transitions to the new block's title, description, bullets, and CTA
4. User clicks the right arrow → next category in list becomes active, exactly as if clicking the next pill
5. Arrow is clicked on the last category → wraps back to the first

**Mobile:**
1. User taps a collapsed pill → expands inline, showing its dark detail card directly below the pill
2. Previously open card collapses
3. No arrow shown on mobile — all pills are visible so sequential navigation is not needed

---

## Files

### New Files
- `sections/section-interactive-benefit-showcase.liquid` — markup, schema, asset loading
- `assets/section-interactive-benefit-showcase.css` — all component styles, `ibs__*` BEM prefix
- `assets/benefit-showcase.js` — `benefit-showcase` web component

### Modified Files
None.

### Theme Components Reused
- `#f4f3ee`, `#31331e`, `#ffffff` brand colour values — matching the existing CPI section palette
- `Figtree` font — already loaded by the CPI section on product pages; a conditional fallback load is added inside this section file for pages where CPI is absent
- Section padding pattern (`.section-{{ section.id }}-padding` with `{%- style -%}` block) — standard Dawn convention
- `{{ block.shopify_attributes }}` — applied to each block wrapper for customizer editor highlighting

---

## Build Steps

### Step 1: Section skeleton

**Do:** Create `sections/section-interactive-benefit-showcase.liquid` with CSS/JS asset loading, an empty `<benefit-showcase>` custom element wrapper, and a complete schema.

**Files:** `sections/section-interactive-benefit-showcase.liquid`

**Details:**
- Load `section-interactive-benefit-showcase.css` via `stylesheet_tag`
- Load `benefit-showcase.js` via `<script defer>`
- Schema section settings: `heading` (text), `subtext` (textarea), `padding_top` (range 0–120, default 48), `padding_bottom` (range 0–120, default 48)
- Schema block type: `benefit` with fields: `icon` (image_picker), `title` (text), `description` (textarea), `bullets` (textarea, one per line), `cta_text` (text), `cta_url` (url), `category_image` (image_picker)
- Preset: named `"Interactive Benefit Showcase"`, 6 blocks with default titles pre-filled (Neurological & Mental Health, Musculoskeletal Pain & Inflammation, Cardiovascular & Circulatory Health, Immune & Inflammatory Conditions, Hormonal & Metabolic Balance, Specialized Support)
- `{%- style -%}` block for section-id padding using `0.5` multiplier at mobile, full value at 750px+

**Verify:** Section appears in customizer. Schema settings are visible. Blocks can be added, removed, and edited.

---

### Step 2: Static markup (hardcoded)

**Do:** Add hardcoded HTML inside the `<benefit-showcase>` wrapper representing the full three-column desktop structure.

**Files:** `sections/section-interactive-benefit-showcase.liquid`

**Details:**
- Outer wrapper: `<div class="ibs section-{{ section.id }}-padding">`
- Left column `<div class="ibs__left">`: section heading `<h2>`, subtext `<p>`, pill list `<ul class="ibs__list">` with 2 hardcoded `<li class="ibs__pill">` items — first has `ibs__pill--active` class
- Centre column `<div class="ibs__image-col">`: single `<img class="ibs__image">` with a placeholder src
- Right column `<div class="ibs__panel">`: `<h3 class="ibs__panel-title">`, `<p class="ibs__panel-description">`, `<ul class="ibs__bullets">` with 2 `<li>` items, `<a class="ibs__cta">` link, `<button class="ibs__arrow" aria-label="Next benefit">` with an SVG right-arrow icon

**Verify:** Three columns render side by side in the browser. Pill list on left, image in centre, dark panel on right.

---

### Step 3: CSS

**Do:** Create `assets/section-interactive-benefit-showcase.css` and style the static markup to match the Figma reference.

**Files:** `assets/section-interactive-benefit-showcase.css`

**Details:**
- `.ibs`: `background-color: #f4f3ee`; CSS Grid three columns — approximately `minmax(280px, 1fr) auto minmax(320px, 380px)`, `min-height: 560px`
- `.ibs__left`: padding `3rem 2rem`; flex column layout; gap between heading, subtext, and list
- `.ibs__list`: list-style none; flex column; gap `0.5rem`; margin 0; padding 0
- `.ibs__pill`: flex row with icon + text; padding `0.75rem 1.25rem`; border-radius `999px`; border `1px solid #31331e`; cursor pointer; `font-family: Figtree`; `color: #31331e`; transition background/color
- `.ibs__pill--active`: `background: #31331e`; `color: #ffffff`; border-color `#31331e`
- `.ibs__image-col`: `position: relative`; overflow hidden
- `.ibs__image`: `width: 100%`; `height: 100%`; `object-fit: cover`; `display: block`; `opacity: 0`; `transition: opacity 0.3s ease`
- `.ibs__image--active`: `opacity: 1`
- `.ibs__panel`: `background: #31331e`; `color: #ffffff`; padding `3rem 2.5rem`; flex column; justify-content space-between; `position: relative`
- `.ibs__panel-title`: serif font (~36px), white, margin-bottom `1rem`
- `.ibs__panel-description`: `font-family: Figtree`; font-size `1rem`; line-height 1.6; margin-bottom `1.5rem`
- `.ibs__bullets`: list-style disc inside; `font-family: Figtree`; font-size `0.9rem`; opacity 0.85; gap `0.4rem`
- `.ibs__panel-content`: `opacity: 0`; `transition: opacity 0.25s ease`; position absolute or managed via active class
- `.ibs__panel-content--active`: `opacity: 1`
- `.ibs__cta`: white; `font-family: Figtree`; text-decoration underline; display flex; align-items center; gap `0.5rem`; margin-top `2rem`
- `.ibs__arrow`: position absolute bottom-right of panel; border `1px solid rgba(255,255,255,0.4)`; border-radius 50%; width/height `48px`; background transparent; color white; cursor pointer; display flex; align-items/justify-content center

**Verify:** Static markup matches the Figma reference visually — correct colours, pill styles, panel typography, arrow button position.

---

### Step 4: Dynamic Liquid

**Do:** Replace all hardcoded content with Liquid, iterating `section.blocks` to render pills and panel content.

**Files:** `sections/section-interactive-benefit-showcase.liquid`

**Details:**
- Section heading: `{{ section.settings.heading | escape }}`
- Section subtext: `{{ section.settings.subtext | escape }}`
- Pills: `{% for block in section.blocks %}` → `<li class="ibs__pill{% if forloop.first %} ibs__pill--active{% endif %}" data-index="{{ forloop.index0 }}" {{ block.shopify_attributes }}>`. Render `block.settings.icon` as `<img>` if present, then `{{ block.settings.title | escape }}`
- Centre images: render all `block.settings.category_image` as `<img class="ibs__image{% if forloop.first %} ibs__image--active{% endif %}">` with `data-index`. Wrap all in `.ibs__image-col`. If no image on a block, output nothing for that index (JS will skip).
- Panel content: render all blocks as `<div class="ibs__panel-content{% if forloop.first %} ibs__panel-content--active{% endif %}" data-index="{{ forloop.index0 }}">` containing title, description, bullets, and CTA. All panels live in DOM simultaneously — JS shows/hides via the active class.
- Bullets: split `block.settings.bullets` by newline: `{% assign bullet_lines = block.settings.bullets | newline_to_br | split: '<br />' %}` then iterate
- CTA: `{% if block.settings.cta_url != blank %}<a class="ibs__cta" href="{{ block.settings.cta_url }}">{{ block.settings.cta_text | default: 'Explore the science behind these benefits' }}</a>{% endif %}`

**Verify:** Editing block titles in the customizer updates pill labels and panel headings. Adding a block adds a new pill. Removing a block removes it from both list and panel.

---

### Step 5: Web component (JS)

**Do:** Create `assets/benefit-showcase.js` with the `benefit-showcase` custom element managing all interactive state.

**Files:** `assets/benefit-showcase.js`

**Details:**
```
if (!customElements.get('benefit-showcase')) {
  customElements.define('benefit-showcase', class BenefitShowcase extends HTMLElement {
    connectedCallback() {
      this.pills = Array.from(this.querySelectorAll('.ibs__pill'))
      this.images = Array.from(this.querySelectorAll('.ibs__image'))
      this.panels = Array.from(this.querySelectorAll('.ibs__panel-content'))
      this.arrow = this.querySelector('.ibs__arrow')
      this.currentIndex = 0

      this.pills.forEach((pill, i) => pill.addEventListener('click', () => this.activate(i)))
      if (this.arrow) this.arrow.addEventListener('click', () => this.activate((this.currentIndex + 1) % this.pills.length))

      if (this.pills.length <= 1 && this.arrow) this.arrow.style.display = 'none'
    }

    activate(index) {
      this.pills[this.currentIndex]?.classList.remove('ibs__pill--active')
      this.images[this.currentIndex]?.classList.remove('ibs__image--active')
      this.panels[this.currentIndex]?.classList.remove('ibs__panel-content--active')

      this.currentIndex = index

      this.pills[this.currentIndex]?.classList.add('ibs__pill--active')
      this.images[this.currentIndex]?.classList.add('ibs__image--active')
      this.panels[this.currentIndex]?.classList.add('ibs__panel-content--active')

      this.pills.forEach((pill, i) => pill.setAttribute('aria-selected', i === this.currentIndex ? 'true' : 'false'))
    }

    disconnectedCallback() {
      this.pills.forEach((pill, i) => pill.removeEventListener('click', () => this.activate(i)))
      if (this.arrow) this.arrow.removeEventListener('click', () => {})
    }
  })
}
```

**Verify:** Clicking pills switches active state across pill, image, and panel. Arrow advances through categories and wraps from last to first.

---

### Step 6: Mobile CSS and behaviour

**Do:** Add responsive styles so the section becomes a single-column accordion at mobile/tablet breakpoints.

**Files:** `assets/section-interactive-benefit-showcase.css`

**Details:**
- At `max-width: 989px`: change `.ibs` to single column (display block or single-col grid); hide `.ibs__image-col` (`display: none`); hide `.ibs__arrow`
- `.ibs__pill` on mobile: full width, border-radius `12px` (not fully pill-shaped), acts as an accordion trigger
- `.ibs__panel-content` on mobile: `display: none` by default; rendered inline directly below its pill (re-order DOM via Liquid so each panel follows its pill — use a `{% for %}` loop that outputs `pill + panel-content` pairs rather than two separate lists)
- `.ibs__panel-content--active` on mobile: `display: block`; styled as a dark olive card with padding, title, description, bullets, CTA

Note: the DOM structure needs to change from Step 4's two-list approach. On mobile, each pill and its panel must be adjacent siblings. The solution: wrap each pill + panel pair in a `<div class="ibs__item">` — on desktop, the list and panel columns are rendered from CSS grid spanning, on mobile they stack naturally.

**Verify:** At 375px viewport — first category expanded, others collapsed. Tapping a pill closes the current one and opens the new one. Centre image column not visible.

---

### Step 7: Edge cases

**Do:** Add guards for missing data and single-block state.

**Files:** `sections/section-interactive-benefit-showcase.liquid`, `assets/benefit-showcase.js`

**Details:**
- No CTA URL: already handled in Step 4 with the `{% if block.settings.cta_url != blank %}` check
- No centre image: wrap the `<img>` in `{% if block.settings.category_image != blank %}` — if no block has an image, add class `ibs--no-images` to the outer wrapper; CSS hides `.ibs__image-col` when this class is present
- Single block: handled in JS `connectedCallback` — `if (this.pills.length <= 1) this.arrow.style.display = 'none'`
- Empty bullets: wrap the `<ul>` in `{% if block.settings.bullets != blank %}`

**Verify:** Remove CTA URL from a block → link disappears. Set section to 1 block → arrow hidden. Leave bullets blank → no empty list rendered. Remove all category images → centre column collapses.

---

### Step 8: Schema polish

**Do:** Review all schema labels, confirm the preset works cleanly, and verify padding settings apply correctly.

**Files:** `sections/section-interactive-benefit-showcase.liquid`

**Details:**
- Ensure all schema labels are human-readable (no technical jargon)
- Preset includes 6 blocks with title pre-filled, all other fields blank — renders without broken images
- Confirm `section-{{ section.id }}-padding` applies padding to the correct wrapper element
- Add `"tag": "section"` and `"class": "section"` to schema root for consistency with Dawn conventions

**Verify:** Drop the section onto a fresh page from the preset — 6 pills render, first is active, no broken images or empty states that look broken, padding controls work in customizer.

---

## Risks & Considerations

- **Figtree font on pages without CPI:** The CPI section loads Figtree — if this section is used on a page without CPI, the font falls back to the browser default. Add the same `<link>` font tag the CPI uses inside this section file, so it self-loads when needed. This is a minor deviation from the Dawn font-loading pattern but acceptable for a custom section.
- **Panel content height transition:** Detail panel content varies in length per block. A simple `opacity` transition avoids layout jumps (the panel has a fixed height container). If content is significantly longer than the panel, consider `overflow: hidden` with a `min-height` on the panel.
- **DOM restructure for mobile (Step 6):** The three-column desktop layout and the stacked-pair mobile layout require a `<div class="ibs__item">` wrapper per block (pill + panel-content as siblings). This needs to be set up correctly in Step 4 — the CSS grid approach handles the visual separation between columns, not separate DOM lists. Plan for this during Step 4 markup so Step 6 isn't a DOM rewrite.
- **Customizer live preview:** Web components re-run `connectedCallback` when blocks are added/removed in the customizer. Verify event listeners don't double-bind after customizer edits. The `if (!customElements.get(...))` guard handles re-registration, but re-querying elements in `connectedCallback` each time is important.

---

## Open Questions

None — all scoping questions resolved. Ready to build.
