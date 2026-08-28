# QA: Custom Product Information

Feature spec: `.claude/features/feature-custom-product-information/feature.md`
Implementation plan: `.claude/features/feature-custom-product-information/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 1)

Status: Not started — awaiting implementation

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
- [ ] Thumbnail grid renders when gallery image blocks are added

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
- [ ] 3-column grid on desktop, 2-column on mobile

### Social proof

- [ ] Social proof section shows when customer photo blocks are added
- [ ] Section hides completely when no customer photo blocks exist
- [ ] Avatar images show with lime-green ring outline
- [ ] Placeholder SVG shows when no image is uploaded to a block

### Tabs / Accordions — mobile (<990px)

- [ ] Tabs render as accordions (no horizontal tab nav visible)
- [ ] First accordion is open on load
- [ ] Clicking a summary opens that accordion
- [ ] Multiple accordions can be open simultaneously
- [ ] Chevron icon rotates to indicate open/closed state
- [ ] Tab section hides completely when no tab blocks exist

### Tabs — desktop (≥990px)

- [ ] Horizontal tab nav row appears with one button per tab block
- [ ] First tab is active (underlined) on load and its panel is visible
- [ ] Clicking a tab button activates it and shows its panel, deactivating others
- [ ] Inactive tabs are greyed out
- [ ] Tab nav scrolls horizontally if labels overflow (no horizontal page scroll)

### Responsive breakpoint transition

- [ ] Resizing from desktop to mobile (cross 990px threshold) switches from tabs to accordions without JS errors
- [ ] Resizing from mobile to desktop switches back to tabs correctly

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

_Empty — added after each QA round._
