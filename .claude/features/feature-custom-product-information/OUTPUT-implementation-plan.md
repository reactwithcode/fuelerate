# Implementation Plan: Custom Product Information

Generated: 2026-08-28
Feature spec: `.claude/features/feature-custom-product-information/feature.md`

---

## Summary

A custom product page section (`section-custom-product-information`) that displays a two-column hero layout (gallery left, product info right), a 6-icon benefits grid, customer photo social proof, and collapsible tabs/accordions. The section is ~80% built — the remaining work is: wiring up live pricing and a real Shopify cart form, adding a variant selector, switching the tabs markup to `<details>`/`<summary>` for mobile accordion support, loading the Recoleta font via `@font-face`, and adding the section to the product template.

---

## Human-First Breakdown

### Admin Setup

No admin setup required — this feature works entirely through theme code and section customizer settings.

### Code Preparation (before any visitor touches the page)

1. Recoleta font loads via `@font-face` in the CSS using the Shopify CDN `.otf` URLs
2. The gallery shows the main image from the schema picker, falling back to `product.featured_image` when no image is set
3. Product title is pulled from `product.title` (live from the product object)
4. Badges show conditionally — limited stock badge from schema checkbox/text, viewers badge only when text is not blank
5. Price row driven by Liquid: sale price always shows; compare-at and discount badge only appear when `product.compare_at_price > product.price`
6. All variant data is embedded as JSON in the page for JS to use
7. Variant selector renders only when the product has more than one variant
8. Add to Cart is a real product form wrapping a styled submit button
9. Benefits grid, social proof, and tab sections each only render when blocks are present
10. Section appears in `templates/product.json` alongside `main-product`

### Live Behavior (when a user interacts)

1. Page loads with first available variant — price, availability, and button state are correct on render
2. If the product is sold out on load, the button is disabled and reads "Sold out"
3. Customer selects a variant → JS handles `optionValueSelectionChange` pub/sub → updates hidden variant ID input, price display, and button state
4. Customer clicks "ADD TO CART" → `product-form` component submits to cart API → shows loading spinner → opens cart drawer
5. **Desktop (≥990px):** Tabs show as a horizontal nav — clicking a tab label activates it and switches the panel (JS-driven on top of `<details>`)
6. **Mobile (<990px):** Same markup renders as native accordions — clicking a summary toggles it; multiple can be open at once

---

## Files

### Modified Files
- `sections/section-custom-product-information.liquid` — live pricing, product title, variant selector, product form, tabs → details/summary markup
- `assets/section-custom-product-information.css` — Recoleta @font-face, variant selector overrides, details/summary tab CSS for desktop
- `assets/custom-product-information.js` — add variant change handler component; update tab component for details/summary
- `templates/product.json` — add CPI section alongside `main-product`

### New Files
None — all work is updates to existing files.

### Theme Components Reused
- `product-form` web component (`assets/product-form.js`) — loaded in section, handles cart submission
- `variant-selects` web component (`assets/global.js`) — already loaded globally, handles variant selection and pub/sub
- `product-variant-options` snippet — renders the radio/pill inputs for each option value
- `loading-spinner` snippet — used inside the submit button for loading state
- `pubsub.js` `subscribe` / `publish` — loaded globally, used for variant change events
- `PUB_SUB_EVENTS.optionValueSelectionChange` from `constants.js` — the event our JS listens to

---

## Build Steps

### Step 1: Recoleta font — add @font-face to CSS

**Do:** Add `@font-face` declarations at the very top of the CSS file for the Recoleta family variants. Keep the existing Google Fonts link for Figtree in the section liquid — it stays as-is (deferred cleanup).

**Files:** `assets/section-custom-product-information.css`

**Details:**
- Add `@font-face` blocks for each Recoleta weight using the Shopify CDN URLs from the scoping doc
- Weights to cover: Thin, Light, Regular, Bold, Black (Alt variants too if needed for the heading)
- The CSS already references `font-family: 'Recoleta', Georgia, serif` — this step makes the name resolve correctly
- Use `font-display: swap` to avoid invisible text during load

**Verify:** Open the product page in a browser. DevTools > Network > Fonts — confirm Recoleta `.otf` files are fetched from Shopify CDN. The section heading and prices should render in Recoleta, not Georgia fallback.

---

### Step 2: Schema cleanup — remove static price fields, remove heading field

**Do:** Remove the three static pricing settings (`original_price`, `sale_price`, `discount_label`) and the `heading` setting from the schema. Also remove the `"Pricing"` header group. These will be replaced by live Liquid data.

**Files:** `sections/section-custom-product-information.liquid` (schema only)

**Details:**
- Delete the `"Pricing"` header setting block and the three settings beneath it: `original_price`, `sale_price`, `discount_label`
- Delete the `"Product details"` header and `heading` setting (title comes from `product.title` now)
- Keep all other settings: `description`, `show_limited_stock`, `limited_stock_text`, `viewers_text`, `benefits_heading`, `button_text`, `social_proof_heading`, padding settings
- No change to the markup yet — that comes in Step 3

**Verify:** Open the section in the theme customizer. The "Pricing" group and "Product title" field should no longer appear in the settings panel. No visual change on the page yet (old Liquid tags for those settings still exist — they'll render blank).

---

### Step 3: Live pricing + product title markup

**Do:** Replace the static Liquid output in the markup with live product data. Update the title, price row, and main image fallback.

**Files:** `sections/section-custom-product-information.liquid` (markup only)

**Details:**

**Title:** Replace `{{ section.settings.heading }}` with `{{ product.title }}`

**Main image:** Keep `section.settings.main_image` as the primary source. Add fallback to `product.featured_image`:
```liquid
{%- if section.settings.main_image != blank -%}
  {# existing image_tag #}
{%- elsif product.featured_image != blank -%}
  {{ product.featured_image | image_url: width: 1000 | image_tag: ... }}
{%- else -%}
  {# existing placeholder #}
{%- endif -%}
```

**Price row:** Replace the existing three-tag static markup with:
```liquid
<div class="cpi__price-row" id="cpi-price-{{ section.id }}">
  {%- assign variant = product.selected_or_first_available_variant -%}
  {%- if variant.compare_at_price > variant.price -%}
    <s class="cpi__price cpi__price--original">{{ variant.compare_at_price | money }}</s>
    <span class="cpi__price cpi__price--sale">{{ variant.price | money }}</span>
    {%- assign discount_pct = variant.compare_at_price | minus: variant.price | times: 100 | divided_by: variant.compare_at_price | round -%}
    <span class="cpi__discount-badge">Save {{ discount_pct }}% OFF</span>
  {%- else -%}
    <span class="cpi__price cpi__price--sale">{{ variant.price | money }}</span>
  {%- endif -%}
</div>
```

**Embed variants JSON** for JS use — add just before the closing `</div>` of `.cpi__info`:
```liquid
<script type="application/json" id="cpi-variants-{{ section.id }}">
  {{ product.variants | json }}
</script>
```

**Verify:** Open a product page that has a compare-at price set in Shopify admin. The price row should show strikethrough + sale price + discount badge. Open a product with no compare-at price — only the sale price should show. Title shows the product's actual name.

---

### Step 4: Variant selector

**Do:** Add a variant selector above the CTA, only when the product has more than one variant.

**Files:** `sections/section-custom-product-information.liquid`

**Details:**

Add this block between the `.cpi__header` and `.cpi__benefits` sections (or just above `.cpi__cta`) — placement: after header/price, before CTA button:

```liquid
{%- unless product.has_only_default_variant -%}
  <variant-selects
    id="variant-selects-{{ section.id }}"
    class="cpi__variant-selects"
    data-section="{{ section.id }}"
    data-product-handle="{{ product.handle }}"
    data-product-title="{{ product.title | escape }}"
    data-product-id="{{ product.id }}"
    data-currency-code="{{ cart.currency.iso_code }}"
    data-selected-price-amount="{{ product.selected_or_first_available_variant.price | money_amount | escape }}"
  >
    {%- for option in product.options_with_values -%}
      <fieldset class="js product-form__input product-form__input--pill cpi__option-group">
        <legend class="form__label cpi__option-label">{{ option.name }}</legend>
        {% render 'product-variant-options',
          product: product,
          option: option,
          block: nil,
          picker_type: 'button'
        %}
      </fieldset>
    {%- endfor -%}

    <script type="application/json" data-selected-variant>
      {{ product.selected_or_first_available_variant | json }}
    </script>
  </variant-selects>
{%- endunless -%}
```

**CSS for variant selector** (Step 4b — add to CSS file):
The `product-variant-options` snippet renders Dawn's pill/radio inputs styled by `base.css`. Override within `.cpi` to match the brand:
```css
/* ——— Variant selector ——— */
.cpi__variant-selects { display: flex; flex-direction: column; gap: 1.2rem; }
.cpi__option-group { border: none; padding: 0; margin: 0; }
.cpi__option-label { font-family: 'Figtree', system-ui, sans-serif; font-size: 1.4rem; font-weight: 700; color: #31331e; margin-bottom: 0.8rem; }
/* Pill buttons already styled by base.css — add overrides as needed after visual testing */
```

**Verify:** Open a product page with multiple variants (e.g. size: S/M/L). The variant options should appear as pill buttons. Single-variant products should show no selector.

---

### Step 5: Product form (real Add to Cart)

**Do:** Replace the static `<button type="button">` with a proper `product-form` web component structure.

**Files:** `sections/section-custom-product-information.liquid`

**Details:**

Load the script at the top of the section (after the existing CSS/JS tags):
```liquid
<script src="{{ 'product-form.js' | asset_url }}" defer="defer"></script>
```

Replace the entire `.cpi__cta` block with:
```liquid
{%- assign product_form_id = 'cpi-form-' | append: section.id -%}
{%- assign current_variant = product.selected_or_first_available_variant -%}

<div class="cpi__cta">
  <product-form class="cpi__product-form" data-section-id="{{ section.id }}">
    <div class="product-form__error-message-wrapper" role="alert" hidden>
      <span class="product-form__error-message"></span>
    </div>
    {%- form 'product', product,
      id: product_form_id,
      class: 'form',
      novalidate: 'novalidate',
      data-type: 'add-to-cart-form'
    -%}
      <input
        type="hidden"
        name="id"
        value="{{ current_variant.id }}"
        class="product-variant-id"
        {% unless current_variant.available %}disabled{% endunless %}
      >
      <button
        type="submit"
        name="add"
        id="cpi-submit-{{ section.id }}"
        class="cpi__btn-cart"
        {% unless current_variant.available %}disabled{% endunless %}
      >
        <span class="cpi__btn-text">
          {%- if current_variant.available -%}
            {{ section.settings.button_text }}
          {%- else -%}
            {{ 'products.product.sold_out' | t }}
          {%- endif -%}
        </span>
        {%- render 'loading-spinner' -%}
      </button>
    {%- endform -%}
  </product-form>
</div>
```

**CSS additions** (Step 5b):
The `loading-spinner` snippet adds a `.loading__spinner` element inside the button. Add to CSS:
```css
.cpi__btn-cart .loading__spinner { display: none; }
.cpi__btn-cart.loading .loading__spinner { display: block; }
.cpi__btn-cart[disabled] { opacity: 0.5; cursor: not-allowed; }
```

**Verify:** Click "Add to Cart" — the button shows a spinner, then the cart drawer opens. On a sold-out product, the button is greyed out and reads "Sold out".

---

### Step 6: JS — Variant change handler

**Do:** Add a new web component in `custom-product-information.js` that listens for variant changes and updates the price display, button state, and hidden variant ID input. Keep the existing `product-info-tabs` component — it will be updated in Step 7.

**Files:** `assets/custom-product-information.js`

**Details:**

Add a second web component `cpi-product` before or after the existing `product-info-tabs` definition:

```js
if (!customElements.get('cpi-product')) {
  customElements.define(
    'cpi-product',
    class CpiProduct extends HTMLElement {
      connectedCallback() {
        this._sectionId = this.dataset.sectionId;
        this._variants = JSON.parse(
          this.querySelector(`#cpi-variants-${this._sectionId}`)?.textContent || '[]'
        );
        this._unsubscribe = subscribe(
          PUB_SUB_EVENTS.optionValueSelectionChange,
          this._onVariantChange.bind(this)
        );
      }

      disconnectedCallback() {
        this._unsubscribe?.();
      }

      _onVariantChange({ data: { event } }) {
        // Only respond to events from within this section
        const selects = this.querySelector(`#variant-selects-${this._sectionId}`);
        if (!selects || !selects.contains(event.target)) return;

        const selectedValues = Array.from(
          selects.querySelectorAll('input:checked, select option[selected]')
        ).map((el) => el.value);

        const variant = this._variants.find((v) =>
          v.options.every((opt, i) => opt === selectedValues[i])
        );

        this._updatePrice(variant);
        this._updateFormInput(variant);
        this._updateButton(variant);
      }

      _updatePrice(variant) {
        const row = this.querySelector(`#cpi-price-${this._sectionId}`);
        if (!row || !variant) return;

        const formatMoney = (cents) =>
          (cents / 100).toLocaleString(undefined, { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' });

        if (variant.compare_at_price > variant.price) {
          const pct = Math.round((variant.compare_at_price - variant.price) * 100 / variant.compare_at_price);
          row.innerHTML = `
            <s class="cpi__price cpi__price--original">${formatMoney(variant.compare_at_price)}</s>
            <span class="cpi__price cpi__price--sale">${formatMoney(variant.price)}</span>
            <span class="cpi__discount-badge">Save ${pct}% OFF</span>
          `;
        } else {
          row.innerHTML = `<span class="cpi__price cpi__price--sale">${formatMoney(variant.price)}</span>`;
        }
      }

      _updateFormInput(variant) {
        const input = this.querySelector('.product-variant-id');
        if (!input || !variant) return;
        input.value = variant.id;
        input.disabled = !variant.available;
      }

      _updateButton(variant) {
        const btn = this.querySelector(`#cpi-submit-${this._sectionId}`);
        const text = btn?.querySelector('.cpi__btn-text');
        if (!btn || !text) return;

        const soldOut = !variant?.available;
        btn.disabled = soldOut;
        text.textContent = soldOut
          ? (window.theme?.strings?.soldOut || 'Sold out')
          : btn.closest('[data-button-text]')?.dataset.buttonText || 'ADD TO CART';
      }
    }
  );
}
```

**Wrap markup:** In the section liquid, wrap `.cpi__info` with `<cpi-product>` tag (replace the existing `<div class="cpi__info">` open/close):
```liquid
<cpi-product class="cpi__info" data-section-id="{{ section.id }}">
  ...
</cpi-product>
```

Add `data-button-text="{{ section.settings.button_text }}"` to the `<cpi-product>` element so JS can read the button label.

**Note on money formatting:** Using `window.Shopify.currency` is the safest approach. If this causes issues in testing (e.g. wrong currency symbol), use the `money_with_currency` Liquid filter on server-render and only update amounts client-side using the same pattern.

**Verify:** On a product page with multiple variants, select a variant with a different price — the price display should update instantly. Select a sold-out variant — button goes grey and reads "Sold out". Select an available variant again — button re-enables.

---

### Step 7: Tabs → details/summary (accordion + desktop tab behaviour)

**Do:** Replace the tab nav + panel structure with `<details>`/`<summary>` elements. Add CSS to render them as tabs on desktop. Update the JS component.

**Files:**
- `sections/section-custom-product-information.liquid`
- `assets/section-custom-product-information.css`
- `assets/custom-product-information.js`

**Details — Markup change:**

Replace the entire `<product-info-tabs class="cpi__tabs">` block with:

```liquid
<div class="cpi__tabs">
  {%- for block in tab_blocks -%}
    <details
      class="cpi__tab-item"
      id="cpi-tab-{{ block.id }}"
      {% if forloop.first %}open{% endif %}
      {{ block.shopify_attributes }}
    >
      <summary
        class="cpi__tab-summary"
        role="tab"
        aria-controls="cpi-panel-{{ block.id }}"
        id="cpi-btn-{{ block.id }}"
      >
        {{- block.settings.label -}}
        <span class="cpi__tab-icon" aria-hidden="true"></span>
      </summary>
      <div
        class="cpi__tab-panel"
        id="cpi-panel-{{ block.id }}"
        role="tabpanel"
        aria-labelledby="cpi-btn-{{ block.id }}"
      >
        {{ block.settings.content }}
      </div>
    </details>
  {%- endfor -%}
</div>
```

**Details — CSS changes:**

Replace the entire `/* ——— Tabs ——— */` block in the CSS with:

```css
/* ——— Tabs / Accordions ——— */

.cpi__tabs {
  display: flex;
  flex-direction: column;
}

/* Mobile: accordion */
.cpi__tab-item {
  border-bottom: 1px solid rgba(49, 51, 30, 0.15);
}

.cpi__tab-item:first-child {
  border-top: 1px solid rgba(49, 51, 30, 0.15);
}

.cpi__tab-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 0;
  font-family: 'Figtree', system-ui, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: rgba(49, 51, 30, 0.5);
  cursor: pointer;
  list-style: none;
  user-select: none;
}

.cpi__tab-summary::-webkit-details-marker { display: none; }

.cpi__tab-icon {
  width: 1rem;
  height: 1rem;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.cpi__tab-item[open] .cpi__tab-icon {
  transform: rotate(-135deg);
}

.cpi__tab-item[open] .cpi__tab-summary {
  color: #31331e;
}

.cpi__tab-panel {
  padding: 1.2rem 0 2rem;
  font-family: 'Figtree', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(49, 51, 30, 0.75);
  line-height: 1.6;
}

.cpi__tab-panel p { margin: 0 0 1.2rem; }
.cpi__tab-panel p:last-child { margin-bottom: 0; }

/* Desktop: override to tabs */
@media screen and (min-width: 990px) {
  .cpi__tabs {
    flex-direction: column; /* keep wrapper column */
  }

  /* Synthesise a tab nav row from all the summaries */
  .cpi__tabs-desktop-nav {
    display: flex;
    border-bottom: 1px solid rgba(49, 51, 30, 0.15);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .cpi__tabs-desktop-nav::-webkit-scrollbar { display: none; }

  /* Hide native details chrome on desktop */
  .cpi__tab-item {
    border: none;
  }
  .cpi__tab-item:first-child {
    border: none;
  }
  .cpi__tab-summary {
    display: none; /* hidden — JS builds the nav */
  }

  /* Panels: only visible one shown */
  .cpi__tab-panel {
    display: none;
    padding: 2rem 0;
  }
  .cpi__tab-panel.is-active {
    display: block;
  }
}
```

**Details — JS changes:**

Replace the `product-info-tabs` component entirely:

```js
if (!customElements.get('product-info-tabs')) {
  customElements.define(
    'product-info-tabs',
    class ProductInfoTabs extends HTMLElement {
      connectedCallback() {
        this._mediaQuery = window.matchMedia('(min-width: 990px)');
        this._onMQChange = this._handleLayout.bind(this);
        this._mediaQuery.addEventListener('change', this._onMQChange);
        this._handleLayout();
      }

      disconnectedCallback() {
        this._mediaQuery.removeEventListener('change', this._onMQChange);
        this._navEl?.remove();
      }

      _handleLayout() {
        if (this._mediaQuery.matches) {
          this._initTabs();
        } else {
          this._destroyTabs();
        }
      }

      _initTabs() {
        if (this._navEl) return; // already initialised

        const items = Array.from(this.querySelectorAll('.cpi__tab-item'));

        // Build synthetic nav row
        this._navEl = document.createElement('div');
        this._navEl.className = 'cpi__tabs-desktop-nav';
        this._navEl.setAttribute('role', 'tablist');

        items.forEach((item, i) => {
          const summary = item.querySelector('.cpi__tab-summary');
          const panel = item.querySelector('.cpi__tab-panel');
          const label = summary?.textContent.trim() || `Tab ${i + 1}`;
          const id = item.id;

          const btn = document.createElement('button');
          btn.className = 'cpi__tabs-btn';
          btn.setAttribute('role', 'tab');
          btn.setAttribute('aria-controls', panel?.id || '');
          btn.setAttribute('id', `cpi-deskbtn-${id}`);
          btn.textContent = label;
          btn.addEventListener('click', () => this._activate(items, i));
          this._navEl.appendChild(btn);
        });

        this.prepend(this._navEl);

        // Activate first
        this._activate(items, 0);
      }

      _activate(items, activeIndex) {
        const navBtns = Array.from(this._navEl?.querySelectorAll('.cpi__tabs-btn') || []);

        items.forEach((item, i) => {
          const panel = item.querySelector('.cpi__tab-panel');
          const isActive = i === activeIndex;
          panel?.classList.toggle('is-active', isActive);
          navBtns[i]?.classList.toggle('is-active', isActive);
          navBtns[i]?.setAttribute('aria-selected', isActive ? 'true' : 'false');
          item.open = isActive; // keep details[open] in sync
        });
      }

      _destroyTabs() {
        if (!this._navEl) return;
        this._navEl.remove();
        this._navEl = null;

        // Reset all panels to show naturally via details[open]
        this.querySelectorAll('.cpi__tab-panel').forEach((p) => p.classList.remove('is-active'));
      }
    }
  );
}
```

**Wrap with component tag in liquid:** Change `<div class="cpi__tabs">` to `<product-info-tabs class="cpi__tabs">` and the closing div to `</product-info-tabs>`.

**Add desktop tab button CSS:**
```css
/* Add alongside desktop tab overrides */
.cpi__tabs-btn {
  flex: 1;
  min-width: max-content;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 1.2rem 1rem;
  font-family: 'Figtree', system-ui, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: rgba(49, 51, 30, 0.5);
  cursor: pointer;
  text-align: center;
  transition: color 0.2s ease;
  margin-bottom: -1px;
  white-space: nowrap;
}
.cpi__tabs-btn.is-active {
  color: #31331e;
  border-bottom-color: #31331e;
}
```

**Verify:**
- Mobile: each tab label has a chevron icon, clicking opens/closes the accordion. First tab is open on load.
- Desktop: a horizontal tab nav row appears. Clicking a tab activates it and switches the panel below. Resize window — tabs flip to accordions at 989px and back to tabs at 990px.

---

### Step 8: Add section to product template

**Do:** Add the CPI section to `templates/product.json` so it renders on all product pages alongside `main-product`.

**Files:** `templates/product.json`

**Details:**

Add a new entry in `"sections"` and append to `"order"`:

```json
"custom-product-information": {
  "type": "section-custom-product-information",
  "settings": {}
}
```

And in `"order"`:
```json
"order": ["main", "custom-product-information", "disclosures", "related-products"]
```

Place it after `"main"` (Dawn's native product section) so the CPI section renders below it — the client can then hide one via the customizer's eye icon.

**Verify:** Open any product page. Both the Dawn `main-product` section and the CPI section should be visible. In the theme customizer, both sections should appear in the left panel under the product template.

---

## Risks & Considerations

- **Variant selector styles** — `product-variant-options` renders Dawn form classes (`product-form__input`, `form__label`). These are styled by `base.css` and will look "Dawn-native" inside the CPI panel. Visual overrides in the CPI CSS (Step 4) should be adjusted during QA if the pill buttons clash with the brand aesthetic.
- **Money formatting in JS** — `toLocaleString` with `currency` style depends on the browser locale. If prices look wrong during QA (wrong symbol, wrong format), switch to reading the Shopify `window.Shopify.formatMoney` helper if the theme exposes it, or parse the server-rendered money string format.
- **Two product forms on one page** — Both `main-product` and CPI will have a `product-form` element. They operate independently (different section IDs). The cart drawer responds to whichever fires — this is expected behaviour.
- **Tab/accordion resize behaviour** — The JS listens to a `matchMedia` change event for the 990px breakpoint. Rapid resizing could cause edge cases. The `_destroyTabs` / `_initTabs` guard (`if (this._navEl) return`) prevents double-init.
- **Gallery thumbnail click (out of scope)** — Clicking thumbnails does not swap the main image. This is a known limitation — flag it to the client if asked. It is explicitly out of scope per the spec.
- **`product.selected_or_first_available_variant`** — If a product has no available variants at all, this will return `null`. The section handles this in the button (Liquid renders disabled state) and the JS checks `variant?.available`.

## Open Questions

- None — all decisions from scoping are resolved.

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-implementation-plan.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
