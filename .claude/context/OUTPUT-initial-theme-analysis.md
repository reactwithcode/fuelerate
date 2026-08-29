# Theme Analysis — Fuelerate (Dawn-based)

Generated: 2026-08-28

## Summary

Dawn-based Shopify theme (recognizable from file naming, component structure, and patterns). Mostly stock Dawn with one significant custom addition: the `custom-product-information` section, which is already substantially built. No third-party page builders. Clean codebase with good separation of concerns.

## File Structure Overview

```
sections/    ~48 files  — mix of Dawn defaults + 1 custom (section-custom-product-information.liquid)
snippets/    ~35 files  — Dawn defaults (product-media-gallery, price, card-product, buy-buttons, etc.)
assets/      ~130 files — CSS components, JS web components, SVGs. Custom cpi-icon-*.svg files added.
templates/   13 files   — JSON templates (Dawn default)
layout/      2 files    — theme.liquid, password.liquid
config/      2 files    — settings_schema.json, settings_data.json
locales/     ~40 files  — full i18n support
```

**Custom files (non-Dawn defaults):**
- `sections/section-custom-product-information.liquid` — already built
- `assets/section-custom-product-information.css` — already built
- `assets/custom-product-information.js` — already built
- `assets/cpi-icon-sleep.svg`, `cpi-icon-muscle.svg`, `cpi-icon-calm.svg`, `cpi-icon-energy.svg`, `cpi-icon-organic.svg`, `cpi-icon-washable.svg`, `cpi-icon-limited-stock.svg`, `cpi-icon-viewing-dot.svg` — all added

---

## CSS Conventions

### Grid System

CSS Grid via utility classes. The theme uses a custom grid class system:

```css
.grid                      /* display: grid */
.grid--1-col               /* single column */
.grid--2-col-tablet        /* 2 columns at 750px+ */
.grid--2-col-desktop       /* 2 columns at 990px+ */
.grid--{n}-col-desktop     /* n columns at desktop */
.grid__item                /* grid child */
```

Flexbox used for inline layouts (badges, nav, avatars). CSS Grid for layout sections.

### Breakpoints

```
Mobile:  < 750px   (default, no query)
Tablet:  ≥ 750px   (@media screen and (min-width: 750px))
Desktop: ≥ 990px   (@media screen and (min-width: 990px))

Inverse queries also used in CPI and some components:
           ≤ 749px  (@media screen and (max-width: 749px))
           ≤ 989px  (@media screen and (max-width: 989px))
```

### Color Variables

Colors are generated from theme settings via `theme.liquid` into CSS custom properties. All values are RGB triplets (no `rgb()` wrapper — applied with `rgba(var(--name), alpha)` pattern):

```css
--color-background          /* scheme background */
--color-foreground          /* scheme text */
--color-background-contrast /* auto-calculated contrast */
--color-shadow
--color-button
--color-button-text
--color-secondary-button
--color-secondary-button-text
--color-link
--color-badge-foreground
--color-badge-background
--color-badge-border
--gradient-background       /* gradient or solid fallback */
```

Typography scale variables:
```css
--font-body-family / --font-body-style / --font-body-weight / --font-body-scale
--font-heading-family / --font-heading-style / --font-heading-weight / --font-heading-scale
```

Other global variables (set in settings_schema):
```css
--page-width                /* max content width */
--spacing-sections-mobile
--spacing-sections-desktop
--media-radius / --media-border-width / --media-border-opacity / --media-shadow-*
--product-card-* / --collection-card-* / --blog-card-*
--text-boxes-*
```

**Note:** The CPI section does NOT use any of these variables. It uses hardcoded brand colors:
- `#31331e` — dark olive (primary text/headings)
- `#f4f3ee` — off-white cream (section background)
- `#ffffff` — white (info panel background)
- `#a8ca1b` — lime green (CTA button, avatar outline)
- `#7aa66f` — sage green (badge dot, viewer badge)
- `rgba(255, 129, 129, 0.3)` — light red (limited stock badge)

### Naming Convention

Dawn uses a mix of:
- **BEM-like** for components: `.product__media-wrapper`, `.product__info-container`, `.card__heading`
- **Block utility** classes: `.page-width`, `.isolate`, `.gradient`, `.color-{scheme}`
- **Component prefix**: `.slider-`, `.collection-`, `.collapsible-`

The CPI section uses a clean `cpi__*` BEM prefix throughout: `.cpi`, `.cpi__layout`, `.cpi__gallery`, `.cpi__info`, `.cpi__badge`, etc.

### Spacing Patterns

No spacing utility classes. Spacing is done with:
- `gap` on flex/grid containers
- `margin` on individual elements
- Section padding via the section-id pattern (see below)
- `var(--spacing-sections-mobile)` / `var(--spacing-sections-desktop)` for `.section + .section` margin

### Page Width / Containers

```css
.page-width {
  max-width: var(--page-width);  /* typically 1200–1440px from settings */
  margin: 0 auto;
  padding: 0 1.5rem;             /* mobile */
}

@media (min-width: 750px) {
  .page-width { padding: 0 5rem; }
}
```

Also available: `.page-width--narrow` (max 72.6rem), `.page-width-desktop` (no padding mobile), `.page-width-tablet`.

The CPI section does NOT use `.page-width`. Its layout spans full-width at mobile and uses its own 2-column grid at 990px+.

---

## JavaScript Conventions

### Base Files (do not modify)

Loaded globally in `theme.liquid` with `defer="defer"`:

| File | Purpose |
|------|---------|
| `constants.js` | Shared constants and PUB_SUB_EVENTS enum |
| `pubsub.js` | Pub/sub event system (`subscribe()`, `publish()`) |
| `global.js` | Core utilities: `getFocusableElements`, `trapFocus`, `HTMLUpdateUtility`, `QuantityInput`, `SectionId`, `onKeyUpEscape`, `pauseAllMedia` |
| `cart-disclosure-modal.js` | Cart disclosure modal |
| `cart-disclosure-tooltip.js` | Cart disclosure tooltip |
| `details-disclosure.js` | `<details>` disclosure component |
| `details-modal.js` | Modal via details element |
| `search-form.js` | Search form component |
| `standard-actions-override.js` | Shopify standard events integration |
| `animations.js` | Scroll-triggered animations (conditional on settings) |

### Existing Components

Web components registered with `customElements.define()`:

| Tag | File | Purpose |
|-----|------|---------|
| `collection-component` | theme.liquid (inline) | Standard events view tracking |
| `product-component` | theme.liquid (inline) | Standard events view tracking |
| `quantity-input` | global.js | +/− quantity stepper |
| `product-info` | product-info.js | Full product page info coordinator |
| `product-form` | product-form.js | Add-to-cart form with cart API |
| `slider-component` | (from slider CSS/JS) | Horizontal slider/carousel |
| `pickup-availability` | pickup-availability.js | Store pickup widget |
| `product-modal` | product-modal.js | Product media zoom modal |
| `product-model` | product-model.js | 3D model viewer |
| `media-gallery` | media-gallery.js | Product image gallery |
| `cart-drawer` | cart-drawer.js | Slide-out cart drawer |
| `cart-notification` | cart-notification.js | Add to cart notification |
| `predictive-search` | predictive-search.js | Live search |
| `facets-form` | facets.js | Collection filter facets |
| `localization-form` | localization-form.js | Language/country selector |
| **`product-info-tabs`** | **custom-product-information.js** | **CPI tab switcher (custom)** |

### Event Patterns

Pub/sub via `pubsub.js`:
```js
subscribe(PUB_SUB_EVENTS.cartUpdate, callback)
publish(PUB_SUB_EVENTS.cartUpdate, data)
```

`PUB_SUB_EVENTS` constants defined in `constants.js` (e.g. `cartUpdate`, `quantityUpdate`, `variantChange`).

### Third-Party Libraries

None beyond Shopify's own CDN assets (`model-viewer-ui.css` for 3D). No Swiper, Flickity, etc.

**CPI-specific:** Loads `Figtree` from Google Fonts inline in the section file — this is a pattern deviation (most themes load fonts via theme.liquid using Shopify's font picker).

### Script Loading

Standard pattern: `<script src="{{ 'file.js' | asset_url }}" defer="defer"></script>`

Conditional loading inside sections (only load what's needed):
```liquid
{%- unless section.settings.quick_add == 'none' -%}
  <script src="{{ 'product-form.js' | asset_url }}" defer="defer"></script>
{%- endunless -%}
```

---

## Liquid Conventions

### Section Wrapper Pattern

Most sections follow this outer structure:

```liquid
<div class="color-{{ section.settings.color_scheme }} isolate gradient">
  <div class="[section-name] section-{{ section.id }}-padding">
    <div class="page-width">
      <!-- content -->
    </div>
  </div>
</div>
```

The CPI section deviates — it does not use `color_scheme` or `page-width`. It uses its own `.cpi` wrapper with hardcoded brand styles.

### Section Padding Approach

Standard Dawn pattern (used in most sections):
```liquid
{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }
  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}
```

**CPI deviation:** Uses `0.5` multiplier (not `0.75`), and applies padding only to `.cpi__info` (not the outer wrapper):
```liquid
.section-{{ section.id }}-padding .cpi__info {
  padding-top: {{ section.settings.padding_top | times: 0.5 | round: 0 }}px;
```

### Standard Schema Settings

These appear in almost every section:
- `color_scheme` (type: `color_scheme`, default: `scheme-1`)
- `padding_top` (type: `range`, min: 0, max: 100, step: 4, unit: px, default: 36)
- `padding_bottom` (type: `range`, min: 0, max: 100, step: 4, unit: px, default: 36)

**CPI deviation:** No `color_scheme`. Padding max is 120 (not 100). Default padding is 48.

### Section Structure

Standard anatomy of a Dawn section file:
1. CSS `stylesheet_tag` links
2. Conditional CSS (variant picker, volume pricing, etc.)
3. `{%- style -%}` block for section-id padding
4. JS `<script defer>` tags
5. HTML markup wrapped in color scheme + page-width divs
6. `{% schema %}` block at bottom

### Snippet Patterns

Key snippets and their purpose:
- `card-product` — product card used in collections/featured
- `price` — price display with sale/compare logic
- `product-media-gallery` — main product image gallery
- `product-variant-picker` — swatch/select variant picker
- `buy-buttons` — product form + payment buttons
- `icon-accordion` — SVG chevron icon for accordions

Naming convention: hyphenated, descriptive (`card-product`, `icon-accordion`, `product-media-gallery`).

### Translation Approach

Dawn uses `t:` keys throughout, referencing `locales/en.default.json` and schema keys from `locales/en.default.schema.json`.

Pattern: `"label": "t:sections.all.padding.padding_top"` in schema. In markup: `{{ 'sections.featured_collection.view_all' | t }}`.

**CPI section deviation:** Uses hardcoded English strings in schema (`"label": "Product title"`) and hardcoded defaults. Not using translation keys at all. This is acceptable for a custom/client-specific section but worth noting for i18n completeness.

### Block Patterns

Blocks are filtered by type before rendering:
```liquid
assign benefit_blocks = section.blocks | where: 'type', 'benefit'
```

Then iterated separately where needed. This is the CPI pattern and is a clean approach.

Standard Dawn blocks use `{{ block.shopify_attributes }}` on the wrapping element for theme editor highlighting.

---

## Schema Conventions

### Common Settings

Settings that appear in most/all sections:
```json
{ "type": "color_scheme", "id": "color_scheme", "label": "t:sections.all.colors.label", "default": "scheme-1" }
{ "type": "range", "id": "padding_top", "min": 0, "max": 100, "step": 4, "unit": "px", "default": 36 }
{ "type": "range", "id": "padding_bottom", "min": 0, "max": 100, "step": 4, "unit": "px", "default": 36 }
```

### Color Scheme Handling

Sections apply `class="color-{{ section.settings.color_scheme }} gradient"` to the outer wrapper. The theme.liquid generates the CSS variables per scheme. `gradient` applies `background: var(--gradient-background)`.

The CPI section bypasses this entirely with hardcoded `background-color: #f4f3ee` and `#ffffff`.

### Padding / Spacing Approach

Standard: `0.75` mobile multiplier, 750px breakpoint. Range: 0–100px, step 4, default 36px.
CPI: `0.5` mobile multiplier, 750px breakpoint. Range: 0–120px, default 48px.

### Preset Patterns

Every section includes at least one preset:
```json
"presets": [{ "name": "t:sections.featured-collection.presets.name" }]
```

CPI includes a rich preset with all block types pre-populated with default content — this is the right approach for a complex section.

---

## Visual Analysis

Reference images found in `.claude/features/feature-custom-product-information/reference/`.

### Layout Patterns

**Desktop:** Full-bleed section. Left column = product image gallery (large main image + 2×2 grid of thumbnails, sticky on scroll). Right column = white info panel with all product details, benefits, CTA, and tabs. No `.page-width` constraint — goes edge-to-edge.

**Mobile:** Stacked single column. Image first, info panel below. Full-width CTA button.

### Typography Hierarchy

- Product title: Large serif (`Recoleta`-style), ~48px desktop / ~32px mobile, dark olive
- Price: Serif, ~36px, dark olive
- Badges/labels: `Figtree` sans-serif, 14–16px
- Body/benefits text: `Figtree`, 16px
- Tab labels: `Figtree`, 16px
- Tab content: `Figtree`, 14px, muted

### Color Usage

Cream background (`#f4f3ee`) for gallery side. White (`#ffffff`) for info panel. Dark olive (`#31331e`) for all text. Lime green (`#a8ca1b`) for CTA and avatar outlines. Sage green accents for badges.

### Component Patterns

- Image gallery with sticky main + thumbnail grid
- Badge pills (limited stock, live viewers count)
- 3-column benefit grid with small icons
- Full-width rounded CTA button
- Circular avatar row with green outline
- Horizontal scrollable tab nav with underline-active indicator
- Accordion-style (tabs, not `<details>` elements)

---

## Recommendations

1. **The CPI section is already built.** `section-custom-product-information.liquid`, `.css`, and `.js` all exist with complete markup, styles, and the tab web component. Before building anything new, review what's already there — the scoping and planning phase should focus on gaps, not starting from scratch.

2. **Google Fonts loaded in section** — The section loads `Figtree` via a `<link>` tag inside the section liquid file. This works but fires a render-blocking request per page. Dawn normally loads fonts via `theme.liquid` using Shopify's font picker. For this custom section it's acceptable, but flag it if performance becomes a concern.

3. **CPI does not use theme color variables** — This means it won't respond to theme color scheme changes. That's intentional for this brand-specific design, but document it so future developers don't expect it to.

4. **Tabs vs Accordions** — The design reference shows what appears to be tabs (Description / Who is it for / Shipping / Care). The implementation chose tabs (not `<details>` accordions). The mobile screenshot shows them as stacked accordions. This is worth verifying against the final Figma spec during QA.

5. **Add to Cart button is non-functional** — The current CPI `<button>` has no form or cart logic. It's a static `type="button"`. For a real product page, this needs to connect to Shopify's cart API (`product-form.js` or a direct fetch). This is the biggest functional gap in the current implementation.

6. **Price is hardcoded** — Current implementation uses text fields for price display. For a live product page, prices should come from `product.price` and `product.compare_at_price` Liquid objects. This is fine for an assessment/demo but would need to change for production.
