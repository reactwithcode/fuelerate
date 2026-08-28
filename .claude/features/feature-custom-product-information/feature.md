# [Feature Name]

## Brief

Build a custom product page section, matching this Figma design:
https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-1404&t=sZveig8W1QUFWueR-0 and https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-3207&t=hkRG3yppfvd372zY-0

**1. Hero image + product info split layout**
The section opens with a two-column layout splitting the screen between a large product image on one side and the core product information on the other — title, price, variant selectors, and the add to cart action. This is the primary focal point of the page and sets the visual hierarchy.

**2. "Why you need this" 6-icon grid**
Below the hero, a content block presents six benefit points, each paired with an icon. This grid communicates the product's key selling points at a glance — ideal for conversion-focused pages where customers need quick reasons to trust the product before scrolling further.

**3. Real customer photo row**
A horizontal row of real customer photos (UGC-style) sits below the benefits grid. This acts as social proof — showing the product in real-world use builds credibility and trust more effectively than studio shots alone.

**4. Add to Cart button**
A persistent or prominently placed Add to Cart button ensures the primary action is always reachable. This may be part of the hero layout or repeated below the social proof row, depending on what the Figma design specifies.

**5. Accordion tabs (Description / Who is it for / Shipping / Care)**
A set of collapsible accordion panels below the main content organizes supplementary product information into four labeled tabs. This keeps the page clean while still making detailed information accessible — customers who want to know more can expand what's relevant to them without the page feeling overwhelming.

---

## Scoping Questions

Generated: 2026-08-28
Chosen approach: Complete and adjust the existing `section-custom-product-information` implementation rather than building from scratch. The section already has gallery, benefits grid, social proof, tabs, and schema — the gaps are cart functionality, live pricing, and a few design decisions.

---

### Q1: Should the Add to Cart button connect to a real Shopify product?

The current button is static (`type="button"` with no form or cart logic). For a real store it needs to submit to Shopify's cart. The question is whether this section is meant to work as a live product page or as a presentational/demo section.

My recommendation: Connect it to a real product using the theme's existing `product-form.js` web component, which handles variant selection, cart API, and sold-out states — no need to write that logic from scratch.

- [x] a) Yes — wire up to a real Shopify product with full add-to-cart + variant selection
- [ ] b) No — keep it as a static demo/presentation section (hardcoded content only)

**Notes:**  

---

### Q2: Should pricing come from the live product object or stay as merchant-configurable text fields?

Currently prices are entered as plain text fields in the schema (`$199.00`, `$99.00`). That means they won't update automatically when the product price changes in Shopify admin.

My recommendation: If Q1 is "yes", use `product.price` and `product.compare_at_price` Liquid objects so pricing is always accurate. If Q1 is "no" (demo), text fields are fine.

- [x] a) Live from product — use `product.price` / `product.compare_at_price` Liquid objects
- [ ] b) Keep as text fields — merchant enters prices manually in the customizer

**Notes:**  

---

### Q3: Tabs or accordions on mobile?

The brief says "accordion tabs" and the mobile screenshot shows collapsible panels. The current implementation uses a horizontal tab nav on both desktop and mobile. The Figma may specify different behaviour per breakpoint.

My recommendation: Use tabs on desktop, switch to `<details>`/`<summary>` accordions on mobile — this is the pattern the theme already uses in `collapsible-content.liquid` and it works better for small screens.

- [ ] a) Tabs on both desktop and mobile (current behaviour — keep as is)
- [x] b) Tabs on desktop, accordions on mobile (recommended)
- [ ] c) Accordions only on both breakpoints

**Notes:**  

---

### Q4: How should this section sit on the product page?

The section currently exists as a standalone section that can be added anywhere in the theme customizer. Since you want it on all product pages, it needs to be placed in the product template — but there are two ways to do that.

My recommendation: Add it to the product template JSON alongside (or replacing) the existing `main-product` section. Replacing is cleaner but removes Dawn's default product layout entirely. Adding alongside means two product sections exist at once.

- [ ] a) Replace `main-product` in the product template — CPI becomes the only product section
- [x] b) Add alongside `main-product` — both sections exist, client can toggle via customizer
- [ ] c) Leave it as an addable section — client manually adds it to the template in the customizer

**Notes:**  

---

### Q5: Should the font loading be cleaned up?

The section currently loads `Figtree` from Google Fonts via a `<link>` tag inside the section file. This fires an external font request on every product page load and goes against Shopify's recommended pattern (using the theme font picker via `theme.liquid`). For a demo or assessment this is fine; for production it's worth fixing.

- [x, use this fonts: https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Alt_Light.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Regular.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Alt_SemiBold.otf?v=1787898053, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Black.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Light.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Alt_Bold.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Thin.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Alt_Thin.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Alt_Medium.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Alt_Regular.otf?v=1787898052, https://cdn.shopify.com/s/files/1/0831/6557/7465/files/Recoleta_Bold.otf?v=1787898052] a) Leave it — acceptable for now
- [ ] b) Fix it — move font loading to `theme.liquid` or use Shopify's font picker

**Notes:**  

---

### Recommendations

- **Don't rebuild.** The existing section covers ~80% of the feature. Focus on the gaps above rather than rewriting what already works.
- **Q1 is the load-bearing decision.** Everything else (pricing, variant selectors, template placement) flows from whether this is a live product section or a static one.
- **The cart button is the most visible gap.** Even if everything else stays as-is, a non-functional cart button will be noticed immediately in QA.
- **Watch the font** — Google Fonts adds a DNS lookup + stylesheet fetch on every product page. Small perf cost, but worth noting if the store cares about Core Web Vitals.

## Extended Brief

Generated: 2026-08-28

### Chosen Approach

Complete the existing `section-custom-product-information` implementation rather than rebuilding. The section is ~80% done — gallery, benefits grid, social proof, tabs, and schema are all in place. The work is filling three functional gaps and adjusting two design decisions.

### Requirements

- Display live pricing from the product object (`product.price`, `product.compare_at_price`) — not hardcoded text fields
- Show a discount badge dynamically when a compare-at price exists
- Replace the static Add to Cart button with a real Shopify product form using `product-form.js`
- Add a variant selector so customers can pick options (size, colour, etc.) before adding to cart
- Handle sold-out state on the CTA button (disable + update label)
- On desktop (≥990px): display product details tabs as a horizontal tab nav (current behaviour)
- On mobile (<990px): display the same content as `<details>`/`<summary>` accordions
- Use a single HTML structure that handles both — `<details>` elements overridden to tab behaviour on desktop via CSS
- Load Recoleta font via `@font-face` in the section CSS using the provided Shopify CDN `.otf` URLs
- Add the section to `templates/product.json` alongside `main-product` so it appears on all product pages

### Where It Lives

- Section file: `sections/section-custom-product-information.liquid` (already exists)
- CSS: `assets/section-custom-product-information.css` (already exists)
- JS: `assets/custom-product-information.js` (already exists — `product-info-tabs` component)
- Template: `templates/product.json` — add as a second section alongside `main-product`

### Data Sources

- Product title, description, price, compare-at price, variants: Liquid `product` object
- Gallery images: `gallery_image` schema blocks (image_picker, merchant-managed)
- Benefits: `benefit` schema blocks (icon + text, merchant-managed)
- Customer photos: `customer_photo` schema blocks (image_picker, merchant-managed)
- Tab content: `tab` schema blocks (label + richtext, merchant-managed)
- Badges text (limited stock label, viewers text): section settings (text fields)
- Button text: section setting (text field)
- Social proof heading: section setting (text field)
- Recoleta font files: Shopify CDN `.otf` assets (already uploaded to the store)

### User Interaction

- Variant selector: customer picks options → selected variant updates price display and button state
- Add to Cart: submits product form → triggers theme's cart drawer or notification
- Gallery thumbnails: clicking a thumbnail swaps the main image (if JS behaviour is added; currently static)
- Tabs (desktop): clicking a tab button shows its panel, hides others
- Accordions (mobile): clicking a `<summary>` toggles the `<details>` open/closed; multiple can be open simultaneously

### Customizer Settings

**Should be configurable:**
- Main product image (image_picker)
- Gallery images (blocks)
- Show/hide limited stock badge + label text
- Live viewers text (leave blank to hide)
- Benefits heading text
- Button label text
- Social proof heading text
- Benefit blocks (icon + text)
- Customer photo blocks
- Tab blocks (label + richtext content)
- Section padding (top/bottom range)

**Should NOT be configurable:**
- Brand colours (hardcoded — section has its own design language)
- Font family (Recoleta + Figtree are brand fonts)
- Layout structure (always split two-column on desktop)

### Decisions Made

- **Live product data (Q1, Q2):** Section will use the `product` Liquid object for pricing and the product form for cart. Removes the static price text fields from schema.
- **Tabs + Accordions (Q3):** Single `<details>`/`<summary>` markup. CSS overrides to tab appearance on desktop (≥990px). Accordions on mobile (<990px). Updates the existing `product-info-tabs` web component or replaces it with simpler CSS-driven behaviour.
- **Template placement (Q4):** Added to `templates/product.json` alongside `main-product`. Both sections present; client can hide one via the customizer toggle.
- **Font loading (Q5):** Keep `@font-face` declarations in the section CSS file (not theme.liquid). Use Recoleta font files from Shopify CDN. Figtree stays on Google Fonts.

### Edge Cases to Handle

- Product with no compare-at price: hide discount badge and strikethrough price entirely
- Product with only one variant (default variant): hide variant selector entirely
- Sold-out variant selected: disable Add to Cart button, update label to "Sold out"
- No gallery image blocks added: show Shopify placeholder SVG for thumbnails
- No main image set: show Shopify placeholder SVG
- No customer photo blocks: hide social proof section entirely
- No benefit blocks: hide benefits section entirely
- No tab blocks: hide tab/accordion section entirely
- Long tab labels on mobile: accordion pattern handles this naturally

### Out of Scope

- Quantity input stepper
- Pickup availability widget
- Product reviews / star ratings
- Related products
- Gift card / recipient form
- Image zoom on hover
- 3D model viewer
- Moving Figtree off Google Fonts (deferred)

### Dependencies

- `assets/product-form.js` — theme's existing cart form handler (do not modify)
- `assets/pubsub.js` + `assets/constants.js` — pub/sub system loaded globally
- `snippets/product-variant-picker.liquid` — theme's variant selector snippet (reuse)
- `templates/product.json` — product template to update
- Recoleta `.otf` files already uploaded to Shopify CDN

### Notes

- The existing `product-info-tabs` web component in `custom-product-information.js` may be replaced or extended depending on the final tabs/accordions implementation approach
- Recoleta CDN URLs provided by client (already hosted on their Shopify store assets)
- Pricing schema fields (`original_price`, `sale_price`, `discount_label`) will be removed — replaced by live Liquid output

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
