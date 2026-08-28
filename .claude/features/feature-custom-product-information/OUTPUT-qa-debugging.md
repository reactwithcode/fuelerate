# QA: Custom Product Information

Feature spec: `.claude/features/feature-custom-product-information/feature.md`
Implementation plan: `.claude/features/feature-custom-product-information/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 5)

Status: Testing

### Fonts

- [ ] Recoleta loads from Shopify CDN (check DevTools > Network > Fonts — should see `.otf` files)
- [ ] Section heading renders in Recoleta (not Georgia fallback)
- [ ] Prices render in Recoleta
- [ ] Figtree still loads (badges, description, benefit text, tab labels use Figtree)

### Product title & pricing

- [ ] Section title shows the product's actual name (not a hardcoded schema text field)
- [ ] For a product with a compare-at price: strikethrough original price + sale price + discount badge ("Save X% OFF") all show
- [ ] For a product with no compare-at price: only the sale price shows (no strikethrough, no badge)
- [ ] Discount percentage is calculated correctly (e.g. $199 compare-at, $99 sale = 50%)

### Gallery

- [ ] Main image shows the schema image picker image when set
- [ ] When no schema image is set, main image falls back to `product.featured_image`
- [ ] When neither is set, the placeholder SVG shows
- [ ] When no gallery image blocks are added, thumbnail grid shows the remaining product images automatically
- [ ] When gallery image blocks are added, those take priority over product images

### Variant selector

- [ ] Variant selector is hidden on a single-variant product
- [ ] Variant selector shows pill buttons for each option on a multi-variant product
- [ ] Selected variant is visually highlighted on load

### Variant change — live updates

- [ ] Selecting a variant with a different price updates the price display without a page reload
- [ ] Selecting a variant with a compare-at price shows the correct strikethrough + badge
- [ ] Selecting a variant with no compare-at price hides strikethrough and badge
- [ ] Selecting a sold-out variant disables the Add to Cart button and changes label to "Sold out"
- [ ] Re-selecting an available variant re-enables the button and restores the button label

### Add to Cart

- [ ] Clicking "Add to Cart" shows a loading spinner on the button
- [ ] After adding, the cart drawer opens (or cart notification appears if drawer is not available)
- [ ] The correct variant is added to cart (verify in cart drawer)
- [ ] On a sold-out product, the button is disabled on page load (cannot be clicked)
- [ ] Error state: if cart add fails (e.g. disconnected), an error message appears

### Benefits grid

- [ ] Grid shows when benefit blocks are added in the customizer
- [ ] Grid is hidden when no benefit blocks exist
- [ ] Default icons (position 1–6) show when no custom icon is uploaded to a block
- [ ] Custom icon shows when an image is uploaded to a block
- [current section is not mobile-friendly, make it mobile friendly. looks mobile.png and current-mobile.png] 3-column grid on desktop, 2-column on mobile

### Social proof

- [ ] Social proof section shows when customer photo blocks are added
- [ ] Section hides completely when no customer photo blocks exist
- [ ] Avatar images show with lime-green ring outline
- [ ] Placeholder SVG shows when no image is uploaded to a block

### Tabs / Accordions — mobile (<990px)

- [ ] Tabs render as accordions — no desktop tab nav visible on mobile
- [ ] First accordion is open on load
- [ ] Clicking a summary opens that accordion
- [ ] Multiple accordions can be open simultaneously
- [ ] Icon shows as "+" when closed, "−" when open
- [ ] Tab section hides completely when no tab blocks exist

### Tabs — desktop (≥990px)

- [ ] Horizontal tab nav row appears with one button per tab block
- [ ] Active tab shows a dark pill indicator — pill and connecting line are on the same level (no extra line below)
- [ ] Inactive tabs show a small dot indicator on the same connecting line
- [ ] Clicking a tab button activates it (pill) and deactivates others (dots)
- [ ] Active tab label is bold, inactive labels are muted
- [ ] Tab nav scrolls horizontally if labels overflow

### Section padding

- [ ] Section has left/right padding on mobile (1.5rem each side)
- [ ] Section has left/right padding on tablet/desktop (5rem each side) — no longer edge-to-edge

### Responsive breakpoint transition

- [ ] Resizing from desktop to mobile: desktop nav hides, accordion chrome appears
- [ ] Resizing from mobile to desktop: desktop nav appears, accordion chrome hides

### Section in template

- [ ] CPI section appears on the product page below the Dawn main-product section
- [ ] Both sections are visible in the theme customizer left panel under the product template
- [ ] Hiding CPI section via customizer eye icon works (section not rendered)

### Edge cases

- [ ] Product with no available variants: Add to Cart button is disabled and reads "Sold out" on load
- [ ] No benefit blocks: benefits section (including heading) is entirely hidden
- [ ] No customer photo blocks: social proof section and divider are entirely hidden
- [ ] No tab blocks: tabs/accordions section and divider are entirely hidden
- [ ] No schema image set and no product featured image: placeholder SVG shows as main image

### Schema & customizer

- [ ] "Pricing" fields (`original_price`, `sale_price`, `discount_label`) no longer appear in the customizer
- [ ] "Product title" text field no longer appears in the customizer
- [ ] All remaining settings are present: description, limited stock toggle/label, viewers text, benefits heading, button text, social proof heading, section padding
- [ ] Button label ("ADD TO CART") can be changed via the customizer setting
- [ ] Section padding (top/bottom) sliders work and adjust spacing

### Accessibility

- [ ] Variant option inputs are keyboard-navigable (Tab, arrow keys)
- [ ] Add to Cart button is reachable and activatable by keyboard
- [ ] Tab nav on desktop is keyboard-navigable (Tab to reach nav, arrow keys to switch tabs)
- [ ] `role="tab"` and `aria-selected` attributes are present and update correctly on desktop
- [ ] `role="tabpanel"` and `aria-labelledby` are present on panels
- [ ] Summary elements are operable by keyboard on mobile (Enter/Space toggles)
- [ ] Error messages from cart failures are announced to screen readers (`role="alert"`)

---

## Previous Rounds

### Round 1

#### [PASS] Recoleta loads from Shopify CDN
#### [PASS] Section heading renders in Recoleta
#### [PASS] Prices render in Recoleta
#### [PASS] Figtree still loads
#### [PASS] Section title shows product's actual name
#### [PASS] Compare-at price: strikethrough + sale price + discount badge show
#### [PASS] No compare-at: only sale price shows
#### [PASS] Discount percentage calculated correctly

#### [FAIL] Gallery thumbnail grid shows other product images
**User feedback:** "other product images don't show up, show them. looks reference folder"
**Fix:** Added `elsif product.images.size > 1` fallback — when no gallery blocks are configured, the grid automatically renders `product.images` starting from index 1.

#### [PASS] When no schema image set, falls back to product.featured_image
#### [PASS] Placeholder SVG shows when no image exists
#### [PASS] Variant selector hidden on single-variant product
#### [PASS] Variant selector shows pill buttons for multi-variant
#### [PASS] Selected variant highlighted on load
#### [PASS] Variant change updates price live
#### [PASS] Sold-out variant disables button
#### [PASS] Add to Cart works and opens cart drawer
#### [PASS] Benefits grid shows/hides correctly
#### [PASS] Social proof shows/hides correctly

#### [FAIL] Mobile tabs styling doesn't match reference
**User feedback:** "tabs doesn't look like on the reference folder"
**Fix:** Replaced chevron icon with `+`/`−` using CSS pseudo-elements.

#### [PASS] Desktop tab nav appears and functions correctly
#### [PASS] Section appears in product template
#### [PASS] Schema cleaned (pricing fields removed)

---

### Round 2

#### [PASS] Gallery — thumbnail grid now shows product images automatically
#### [PASS] Mobile tabs — +/− icon correct

#### [FAIL] Desktop tabs — styling doesn't match expected-tab.png
**User feedback:** "tabs doesn't like on expected-tab.png on the reference folder"
**Fix:** Replaced plain underline with pill+dot indicator connected by a thin horizontal line.

#### [FAIL] Section padding — section was edge-to-edge
**User feedback:** "give padding/margin left and right to the section, looks current-result.png fix it"
**Fix:** Added `padding-left/right: 1.5rem` mobile, `5rem` at 750px+.

---

### Round 3

#### [FAIL] Mobile tabs — desktop tab nav visible on mobile viewport
**User feedback:** "current tabs doesn't looks on the reference folder"
**Fix:** Replaced `matchMedia` with CSS-controlled visibility. Desktop nav always built in JS but hidden via `display: none` at mobile; shown at ≥990px via `@media`.

---

### Round 4

#### [FAIL] Desktop tab connecting line misaligned — appearing below indicators as a second line
**User feedback:** "there is line between tabs not below tabs. looks newest-current-tabs.png and newest-expected-tabs.png"
**Fix:** The `::before` connecting line was anchored at `bottom: 0` of the nav, but button indicators are at the button's bottom edge which is `1.6rem` higher (the button's `padding-bottom`). Changed `bottom: 0` to `bottom: 1.6rem` so the line runs through the center of the pill and dots, not below them.
